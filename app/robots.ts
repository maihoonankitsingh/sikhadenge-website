import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api", "/api/", "/influencer/login"],
      },
    ],
    sitemap: [
      "https://sikhadenge.in/sitemap.xml",
      "https://sikhadenge.in/sitemap-blog.xml",
      "https://sikhadenge.in/sitemap-blogs.xml",
      "https://sikhadenge.in/sitemap-blogs-1.xml",
      "https://sikhadenge.in/sitemap-blogs-2.xml",
      "https://sikhadenge.in/sitemap-static.xml",
      "https://sikhadenge.in/sitemap-expert.xml",
      "https://sikhadenge.in/sitemap-compare.xml",
      "https://sikhadenge.in/sitemap-tools.xml",
      "https://sikhadenge.in/sitemap-prompts.xml",
      "https://sikhadenge.in/sitemap-hindi.xml",
    ],
    host: "https://sikhadenge.in",
  };
}

