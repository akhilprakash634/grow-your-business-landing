export async function onRequestGet(context) {
  try {
    const { env } = context;
    let currentCount = 6; // Default fallback

    try {
      if (env.STORE_DATA) {
        const storedCount = await env.STORE_DATA.get('sales_count');
        if (storedCount) {
          currentCount = parseInt(storedCount, 10);
        }
      }
    } catch (kvError) {
      console.error('KV Store Error:', kvError);
    }

    return new Response(JSON.stringify({ count: currentCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Sales Count Error:', error);
    // Even on error, return a fallback count so UI doesn't break
    return new Response(JSON.stringify({ count: 6 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
