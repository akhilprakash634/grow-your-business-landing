# Search Engine Setup Guide (GSC & Bing)

Follow these steps to ensure your site is correctly indexed and monitored.

## 1. Google Search Console (GSC) Setup
1.  Go to [Google Search Console](https://search.google.com/search-console/).
2.  **Add Property**: Enter `https://growyourbusiness.today/`.
3.  **Verification**: 
    - Use the **HTML Tag** method. Copy the `<meta>` tag provided by Google.
    - Paste it into the `<head>` section of your `index.html`.
4.  **Submit Sitemap**:
    - Go to **Sitemaps** in the sidebar.
    - Enter `sitemap.xml` and click **Submit**.
5.  **Check for Issues**: Monitor the **Indexing** and **Core Web Vitals** sections weekly.

## 2. Bing Webmaster Tools Setup
1.  Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/).
2.  **Import from GSC**: You can sign in with your Google account and import your property directly from GSC. This is the fastest way.
3.  **Manual Setup**: If not importing, add your URL and verify using the same HTML tag method.
4.  **Submit Sitemap**: Ensure `sitemap.xml` is submitted here as well.

## 3. URL Inspection
- If you have new pages (like `/blog/ai-growth-kerala`), use the **URL Inspection** tool in GSC to "Request Indexing" manually. This forces Google to crawl the new page immediately.

## 4. Robots.txt Validation
- Use the [Google Robots.txt Tester](https://www.google.com/webmasters/tools/robots-testing-tool) to ensure your updated `robots.txt` is being parsed correctly.
