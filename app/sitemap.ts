import type { MetadataRoute } from "next";
import generatedPages from "../data/generated-seo.json";

const BASE = "https://sikhadenge.space";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes jo pehle se the
  const staticRoutes = [
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
    "/ai-expert"
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  // Dynamic programmatic SEO routes (4,600+ pages)
  const dynamicRoutes = generatedPages.map((page: any) => ({
    url: `${BASE}/expert/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
