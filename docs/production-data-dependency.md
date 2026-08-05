# Production content data dependency

The GitHub repository does not currently contain `data/blogs.json`, while the application reads that file at runtime to render and sitemap blog articles. The production server may have a generated or mounted copy that is not tracked in GitHub.

Before merging or deploying this branch:

1. Identify the authoritative production source for `data/blogs.json`.
2. Back up the current production file and record its article count and checksum.
3. Ensure the deployment process preserves or regenerates the file before `next build`.
4. Run `npm run audit:generated` on the production source tree.
5. Compare the blog count with the current sitemap and known Search Console URLs.
6. Do not deploy from a GitHub checkout that silently removes the production dataset.

The same verification should be applied to `data/generated-seo.json` and any server-generated assets or route data that differ from the GitHub branch.
