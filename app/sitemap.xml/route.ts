export async function GET() {
  const now = new Date().toISOString();
  const baseUrl = "https://sikhadenge.in";

  const sitemaps = [
    `${baseUrl}/sitemap-static.xml`,
    `${baseUrl}/sitemap-prompts.xml`,
    `${baseUrl}/sitemap-compare.xml`,
    `${baseUrl}/sitemap-expert.xml`,
    `${baseUrl}/sitemap-hindi.xml`,
    `${baseUrl}/sitemap-blogs-1.xml`,
    `${baseUrl}/sitemap-blogs-2.xml`,
    `${baseUrl}/sitemap-tools.xml`,
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (url) => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
