import { getStaticUrls } from "../../lib/sitemap-data";

export async function GET() {
  const urls = getStaticUrls();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `<url>
  <loc>${item.url}</loc>
  <changefreq>${item.changeFrequency}</changefreq>
  <priority>${item.priority}</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
