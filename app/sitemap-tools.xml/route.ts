import { getToolUrls } from "../../lib/sitemap-data";

const BASE_URL = "https://sikhadenge.in";
const CHUNK_SIZE = 50000;

function latestIso() {
  const urls = getToolUrls();
  const times = urls
    .map((item) => new Date(item.lastModified).getTime())
    .filter((time) => Number.isFinite(time));

  const latest = times.length ? Math.max(...times) : Date.now();
  return new Date(latest).toISOString();
}

export async function GET() {
  const urls = getToolUrls();
  const chunks = Math.max(1, Math.ceil(urls.length / CHUNK_SIZE));
  const lastmod = latestIso();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: chunks }, (_, index) => {
  const part = index + 1;
  return `  <sitemap>
    <loc>${BASE_URL}/sitemap-tools-${part}.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;
}).join("\n")}
</sitemapindex>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
