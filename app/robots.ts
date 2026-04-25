import type { MetadataRoute } from "next";

const BASE = "https://sikhadenge.in";

const SITEMAPS = [
  `${BASE}/sitemap.xml`,
  `${BASE}/sitemap-static.xml`,
  `${BASE}/sitemap-blogs-1.xml`,
  `${BASE}/sitemap-blogs-2.xml`,
  `${BASE}/sitemap-blogs-3.xml`,
  `${BASE}/sitemap-blogs-4.xml`,
  `${BASE}/sitemap-prompts.xml`,
  `${BASE}/sitemap-expert.xml`,
  `${BASE}/sitemap-hindi.xml`,
  `${BASE}/sitemap-compare.xml`,
  `${BASE}/sitemap-tools.xml`,
  `${BASE}/sitemap-families-20.xml`,
  `${BASE}/sitemap-families-30.xml`,
  `${BASE}/sitemap-families.xml`,
  `${BASE}/sitemap-tools-index.xml`,
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
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
    sitemap: SITEMAPS,
    host: BASE,
  };
}
