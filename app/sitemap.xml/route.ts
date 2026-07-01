const BASE_URL = "https://sikhadenge.in";

const SITEMAPS = [
  "sitemap-static.xml",
  "sitemap-blogs-1.xml",
  "sitemap-blogs-2.xml",
  "sitemap-blogs-3.xml",
  "sitemap-blogs-4c.xml",
  "sitemap-blogs-4d.xml",
  "sitemap-blogs-4e.xml",
  "sitemap-blogs-5.xml",
  "sitemap-skills-1.xml",
  "sitemap-skills-2.xml",
  "sitemap-skills-3.xml",
  "sitemap-expert.xml",
  "sitemap-prompts.xml",
  "sitemap-compare.xml",
  "sitemap-hindi.xml",
  "sitemap-tools.xml",
  "sitemap-learn.xml",
];

export async function GET() {
  const lastmod = new Date().toISOString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAPS.map((name) => `  <sitemap>
    <loc>${BASE_URL}/${name}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`).join("\n")}
</sitemapindex>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
