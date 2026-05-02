export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { amount, currency = 'INR', receipt = 'receipt_' + Date.now() } = body;

    if (!amount || amount < 100) {
      return new Response(JSON.stringify({ error: 'Amount must be at least 100 paise (₹1)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const keyId = env.RAZORPAY_KEY_ID;
    const keySecret = env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return new Response(JSON.stringify({ error: 'Razorpay credentials not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const authHeader = 'Basic ' + btoa(`${keyId}:${keySecret}`);

    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        amount: parseInt(amount),
        currency,
        receipt
      })
    });

    const data = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      console.error('Razorpay Error:', data);
      return new Response(JSON.stringify({ error: 'Failed to create order', details: data }), {
        status: razorpayResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Create Order Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
