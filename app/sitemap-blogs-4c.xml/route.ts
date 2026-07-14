import { getBlogs } from "@/lib/blogs";

export async function GET() {
  const blogs = getBlogs().slice(87500, 100000);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogs
  .filter((b) => b?.slug)
  .map(
    (b) => `<url>
  <loc>https://sikhadenge.in/blog/${b.slug}</loc>
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
