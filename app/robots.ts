import type { MetadataRoute } from "next";

const PRIVATE_ROUTES = [
  "/admin/",
  "/api/",
  "/influencer/",
  "/v2-landing",
  "/reels",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_ROUTES,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: PRIVATE_ROUTES,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: PRIVATE_ROUTES,
      },
    ],
    sitemap: "https://sikhadenge.in/sitemap.xml",
    host: "https://sikhadenge.in",
  };
}
