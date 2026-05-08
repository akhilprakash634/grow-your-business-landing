export async function onRequestGet({ request, env, params }) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /WhatsApp|TelegramBot|facebookexternalhit|Twitterbot|LinkedInBot|Pinterest|Slackbot|vkShare|Googlebot|Bingbot/i.test(userAgent);

  const { slug } = params;

  if (isBot && slug) {
    try {
      // Fetch product data directly from Sanity REST API from the Edge
      const query = `*[_type == "product" && slug.current == "${slug}"][0]{title, headline, description, "imageUrl": imageUrl.asset->url}`;
      const sanityUrl = `https://5n8h847y.api.sanity.io/v2024-05-08/data/query/production?query=${encodeURIComponent(query)}`;
      
      const response = await fetch(sanityUrl);
      const data = await response.json();
      const product = data.result;

      if (product) {
        const title = product.title || 'Grow Your Business';
        const description = product.headline || product.description || 'Check out this product!';
        const imageUrl = product.imageUrl || 'https://growyourbusiness.today/logo.png';
        const url = `https://growyourbusiness.today/product/${slug}`;

        const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            
            <meta name="title" content="${title}">
            <meta name="description" content="${description}">

            <meta property="og:type" content="product">
            <meta property="og:url" content="${url}">
            <meta property="og:title" content="${title}">
            <meta property="og:description" content="${description}">
            <meta property="og:image" content="${imageUrl}">
            <meta property="og:site_name" content="Grow Your Business">

            <meta property="twitter:card" content="summary_large_image">
            <meta property="twitter:url" content="${url}">
            <meta property="twitter:title" content="${title}">
            <meta property="twitter:description" content="${description}">
            <meta property="twitter:image" content="${imageUrl}">
          </head>
          <body>
            <p>Redirecting...</p>
            <script>window.location.replace('/product/${slug}');</script>
          </body>
          </html>
        `;

        return new Response(html, {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            'Cache-Control': 'public, max-age=3600', // Cache on edge for an hour
          },
        });
      }
    } catch (err) {
      // Fallback to normal behavior on error
      console.error('Error fetching Sanity OG data:', err);
    }
  }

  // If not a bot, or if fetching failed, let Cloudflare serve the normal React SPA
  return env.ASSETS.fetch(request);
}
