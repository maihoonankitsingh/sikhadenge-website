import type { MetadataRoute } from "next";

const BASE = "https://sikhadenge.space";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/", 
    "/about-us",
    "/blog",
    "/contact",
    "/collab",
    "/reviews",
    "/terms",
    "/privacy-policy",
    "/refund-policy",
    "/influencer",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
