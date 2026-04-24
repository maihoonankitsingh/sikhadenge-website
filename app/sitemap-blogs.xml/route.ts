import fs from "fs";
import path from "path";

function getBlogs() {
  try {
    const filePath = path.join(process.cwd(), "data", "blogs.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function GET() {
  const blogs = getBlogs();
  const now = new Date().toISOString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogs
  .filter((b: any) => b?.slug)
  .map(
    (b: any) => `<url>
  <loc>https://sikhadenge.in/blog/${b.slug}</loc>
  <lastmod>${now}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.76</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
