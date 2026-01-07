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
    sitemap: "https://sikhadenge.space/sitemap.xml",
    host: "https://sikhadenge.space",
  };
}
