import type { MetadataRoute } from "next";
import generatedPages from "../data/generated-seo.json";
import { skillsData } from "../data/skillsData";
import { getBlogSlugs } from "@/lib/blogs";

const BASE = "https://sikhadenge.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/about-us`, priority: 0.75, changeFrequency: "monthly" },
    { url: `${BASE}/blog`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/contact-us`, priority: 0.72, changeFrequency: "monthly" },
    { url: `${BASE}/collab`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/reviews`, priority: 0.72, changeFrequency: "monthly" },
    { url: `${BASE}/terms`, priority: 0.4, changeFrequency: "yearly" },
    { url: `${BASE}/privacy-policy`, priority: 0.4, changeFrequency: "yearly" },
    { url: `${BASE}/refund-policy`, priority: 0.4, changeFrequency: "yearly" },
    { url: `${BASE}/influencer`, priority: 0.45, changeFrequency: "monthly" },
    { url: `${BASE}/ai-expert`, priority: 0.92, changeFrequency: "weekly" },
    { url: `${BASE}/store`, priority: 0.72, changeFrequency: "weekly" },
    { url: `${BASE}/gen-ai-masterclass`, priority: 0.86, changeFrequency: "weekly" },
  ].map((route) => ({
    ...route,
    changeFrequency: route.changeFrequency as
      | "weekly"
      | "monthly"
      | "yearly",
    lastModified: now,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.82,
  }));

  const expertRoutes: MetadataRoute.Sitemap = generatedPages.map((page: any) => ({
    url: `${BASE}/expert/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const careerRoutes: MetadataRoute.Sitemap = skillsData.map((skill) => ({
    url: `${BASE}/career/${skill.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...careerRoutes, ...expertRoutes];
}
