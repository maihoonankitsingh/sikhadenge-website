import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/influencer/",
          "/dashboard/",
          "/auth/",
          "/checkout/",
          "/payment/",
          "/admission/",
          "/store/",
          "/fees/",
          "/v2-landing",
          "/reels",
        ],
      },
    ],
    sitemap: "https://sikhadenge.in/sitemap.xml",
    host: "https://sikhadenge.in",
  };
}

