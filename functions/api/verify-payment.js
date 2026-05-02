export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(JSON.stringify({ error: 'Missing required payment details' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const keySecret = env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return new Response(JSON.stringify({ error: 'Razorpay credentials not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify signature using Web Crypto API
    const encoder = new TextEncoder();
    const keyData = encoder.encode(keySecret);
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const dataBytes = encoder.encode(razorpay_order_id + '|' + razorpay_payment_id);
    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, dataBytes);
    
    // Convert ArrayBuffer to Hex String
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const generatedSignature = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (generatedSignature === razorpay_signature) {
      // Payment Verified - Increment KV Store
      let currentCount = 6; // Default starting point
      
      try {
        if (env.STORE_DATA) {
          const storedCount = await env.STORE_DATA.get('sales_count');
          if (storedCount) {
            currentCount = parseInt(storedCount, 10);
          }
          await env.STORE_DATA.put('sales_count', (currentCount + 1).toString());
        } else {
          console.warn('STORE_DATA KV namespace is not bound. Cannot persist sales count.');
        }
      } catch (kvError) {
        console.error('KV Store Error:', kvError);
      }

      return new Response(JSON.stringify({ status: 'success', message: 'Payment verified successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ status: 'failure', message: 'Invalid signature' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Verify Payment Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
