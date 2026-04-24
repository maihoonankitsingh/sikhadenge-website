export async function GET() {
  const now = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap><loc>https://sikhadenge.in/sitemap-expert-1.xml</loc><lastmod>${now}</lastmod></sitemap>
    <sitemap><loc>https://sikhadenge.in/sitemap-expert-2.xml</loc><lastmod>${now}</lastmod></sitemap>
    <sitemap><loc>https://sikhadenge.in/sitemap-expert-3.xml</loc><lastmod>${now}</lastmod></sitemap>
    <sitemap><loc>https://sikhadenge.in/sitemap-expert-4.xml</loc><lastmod>${now}</lastmod></sitemap>
    <sitemap><loc>https://sikhadenge.in/sitemap-expert-5.xml</loc><lastmod>${now}</lastmod></sitemap>
  </sitemapindex>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
