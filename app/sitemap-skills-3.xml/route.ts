import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BASE = "https://sikhadenge.in";
const DATE = "2025-06-01";

export const dynamic = "force-static";
export const revalidate = 86400;

let _cache: any[] | null = null;
function getEntries(): any[] {
  if (_cache) return _cache;
  try {
    const fp = path.join(process.cwd(), "data/generated-seo-merged.json");
    _cache = JSON.parse(fs.readFileSync(fp, "utf8"));
    return _cache!;
  } catch { return []; }
}

export function GET() {
  const all = getEntries();
  const entries = all.slice(66666, 100000);
  const urls = entries
    .map((e: any) => `  <url>\n    <loc>${BASE}/${e.slug}</loc>\n    <lastmod>${DATE}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
}
