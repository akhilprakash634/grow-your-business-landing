# Cloudflare SEO & Bot Configuration Guide

If you are using Cloudflare, follow these steps to ensure crawlers are not blocked (fixing 403 Forbidden).

### 1. Bot Fight Mode
- Go to **Security** -> **Bots**.
- If "Bot Fight Mode" is ON, it may challenge bots. 
- **Recommendation**: Ensure it's configured to allow "Verified Bots".

### 2. Firewall / WAF Rules
Create a WAF rule to explicitly allow AI and Search crawlers:
- **Field**: User Agent
- **Operator**: contains
- **Value**: `Googlebot` OR `Bingbot` OR `GPTBot` OR `ClaudeBot` OR `PerplexityBot`
- **Action**: Skip (WAF Components: All)

### 3. Page Rules (Redirects)
Ensure HTTPS is enforced:
- **URL**: `http://*growyourbusiness.today/*`
- **Setting**: Always Use HTTPS

### 4. Cache Level
- Set Cache Level to "Standard" or "Ignore Query String" to ensure the latest SEO metadata is served.

### 5. Crawler Hints
- Go to **Caching** -> **Configuration**.
- Enable **Crawler Hints**. This helps search engines find new content faster.
