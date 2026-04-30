import type { MetadataRoute } from "next";

const BASE = "https://sikhadenge.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt", "/ai.txt"],
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/auth/",
          "/payment/",
          "/checkout/",
          "/influencer/login",
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
