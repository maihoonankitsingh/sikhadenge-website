import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import generatedPages from "../data/generated-seo.json";
import { skillsData } from "../data/skillsData";

const BASE = "https://sikhadenge.in";

type BlogRecord = {
  slug?: string;
};

function getBlogSlugs(): string[] {
  try {
    const filePath = path.join(process.cwd(), "data", "blogs.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as BlogRecord[];
    return parsed
      .map((item) => item.slug)
      .filter((slug): slug is string => typeof slug === "string" && slug.trim().length > 0);
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Static dates — prevents Google thinking every page changes on every build.
  // Update the relevant date when that section's content actually changes.
  const DATE_HOME    = new Date("2025-04-01");
  const DATE_STATIC  = new Date("2025-02-01");
  const DATE_BLOG    = new Date("2025-04-15");
  const DATE_EXPERT  = new Date("2025-01-15");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,              priority: 1.0,  changeFrequency: "weekly",  lastModified: DATE_HOME   },
    { url: `${BASE}/ai-expert`,     priority: 0.92, changeFrequency: "weekly",  lastModified: DATE_HOME   },
    { url: `${BASE}/blog`,          priority: 0.9,  changeFrequency: "weekly",  lastModified: DATE_BLOG   },
    { url: `${BASE}/about-us`,      priority: 0.75, changeFrequency: "monthly", lastModified: DATE_STATIC },
    { url: `${BASE}/reviews`,       priority: 0.72, changeFrequency: "monthly", lastModified: DATE_STATIC },
    { url: `${BASE}/contact`,       priority: 0.72, changeFrequency: "monthly", lastModified: DATE_STATIC },
    { url: `${BASE}/collab`,        priority: 0.6,  changeFrequency: "monthly", lastModified: DATE_STATIC },
    { url: `${BASE}/terms`,         priority: 0.4,  changeFrequency: "yearly",  lastModified: DATE_STATIC },
    { url: `${BASE}/privacy-policy`,priority: 0.4,  changeFrequency: "yearly",  lastModified: DATE_STATIC },
    { url: `${BASE}/refund-policy`, priority: 0.4,  changeFrequency: "yearly",  lastModified: DATE_STATIC },
    // NOTE: /influencer is a private portal — never include in sitemap
  ];

  const skillRoutes: MetadataRoute.Sitemap = skillsData.map((skill) => ({
    url: `${BASE}/${skill.slug}`,
    lastModified: DATE_STATIC,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: DATE_BLOG,
    changeFrequency: "weekly" as const,
    priority: 0.82,
  }));

  const expertRoutes: MetadataRoute.Sitemap = generatedPages.map((page: any) => ({
    url: `${BASE}/expert/${page.slug}`,
    lastModified: DATE_EXPERT,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // career routes excluded — app/career/ pages do not exist yet
  return [...staticRoutes, ...skillRoutes, ...blogRoutes, ...expertRoutes];
}
