export async function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap><loc>https://sikhadenge.in/sitemap-expert-1.xml</loc></sitemap>
    <sitemap><loc>https://sikhadenge.in/sitemap-expert-2.xml</loc></sitemap>
    <sitemap><loc>https://sikhadenge.in/sitemap-expert-3.xml</loc></sitemap>
    <sitemap><loc>https://sikhadenge.in/sitemap-expert-4.xml</loc></sitemap>
    <sitemap><loc>https://sikhadenge.in/sitemap-expert-5.xml</loc></sitemap>
  </sitemapindex>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
