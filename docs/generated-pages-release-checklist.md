# Generated pages release checklist

## Pre-deploy

1. Confirm the deployment source contains the current production `data/blogs.json` and `data/generated-seo.json` datasets.
2. Run `npm ci`.
3. Run `npm run audit:generated`.
4. Run `npm run build`.
5. Review the generated route list for `/blog/[slug]`, `/expert/[slug]`, and root skill pages.
6. Confirm the sitemap URL estimate remains below 50,000 URLs. Split into a sitemap index before the limit is exceeded.
7. Confirm no unrelated server-only production changes will be overwritten by the GitHub deployment.

## Deploy

1. Back up the current production source and `.next` directory.
2. Deploy the reviewed commit or merged pull request.
3. Build a fresh `.next` directory; do not reuse a stale build from another commit.
4. Restart the production process only after a successful build.
5. Preserve production environment variables and mounted/generated content datasets.

## Post-deploy

1. Run `npm run verify:live-seo`.
2. Confirm `/contact` permanently redirects to `/contact-us`.
3. Confirm valid sample blog, expert, and skill URLs return 200.
4. Confirm unknown generated slugs return genuine 404 responses.
5. Confirm `robots.txt`, `sitemap.xml`, and `llms.txt` return 200.
6. Confirm sitemap entries are canonical 200 URLs and exclude redirects, private routes, and nonexistent pages.
7. Validate rendered canonical tags and JSON-LD on representative pages.
8. Test mobile layout, FAQ keyboard behavior, internal links, forms, and calls to action.
9. Submit or resubmit the sitemap in Google Search Console and Bing Webmaster Tools after the production response is verified.
10. Inspect indexing and crawl reports over time; do not treat submission as an indexing guarantee.

## Rollback conditions

Rollback if the production build fails, valid route families return 404/500, private routes become indexable, canonical URLs point to the wrong route, the production content datasets disappear, or the current server design/source is overwritten unexpectedly.
