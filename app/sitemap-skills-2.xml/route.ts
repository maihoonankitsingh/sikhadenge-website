import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BASE = "https://sikhadenge.in";
const DATA_FILE = path.join(
  process.cwd(),
  "data/generated-seo-merged.json"
);
const FALLBACK_LASTMOD = "2026-04-27T10:07:33.964Z";
const EXCLUDED_SLUGS = new Set([
  "ai-expert",
  "ai-skills",
]);

export const dynamic = "force-static";
export const revalidate = 86400;

let _cache: any[] | null = null;

function getEntries(): any[] {
  if (_cache) return _cache;

  try {
    const parsed = JSON.parse(
      fs.readFileSync(DATA_FILE, "utf8")
    );

    _cache = Array.isArray(parsed)
      ? parsed.filter((entry: any) => {
          const slug = String(
            entry?.slug || ""
          ).trim();

          return (
            slug.length > 0
            && !EXCLUDED_SLUGS.has(slug)
          );
        })
      : [];

    return _cache;
  } catch {
    return [];
  }
}

function getSourceLastModified(): string {
  try {
    return fs
      .statSync(DATA_FILE)
      .mtime
      .toISOString();
  } catch {
    return FALLBACK_LASTMOD;
  }
}

export function GET() {
  const all = getEntries();
  const entries = all.slice(33333, 66666);
  const lastmod = getSourceLastModified();

  const urls = entries
    .map(
      (entry: any) =>
        `  <url>\n`
        + `    <loc>${BASE}/${entry.slug}</loc>\n`
        + `    <lastmod>${lastmod}</lastmod>\n`
        + `    <changefreq>monthly</changefreq>\n`
        + `    <priority>0.6</priority>\n`
        + `  </url>`
    )
    .join("\n");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n`
    + `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
    + `${urls}\n`
    + `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
