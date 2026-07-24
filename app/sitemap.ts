import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import generatedPages from "../data/generated-seo.json";
import { skillsData } from "../data/skillsData";

const BASE_URL = "https://sikhadenge.in";
const RELEASE_DATE = new Date("2026-07-24T00:00:00.000Z");

type BlogRecord = {
  slug?: string;
  updatedAt?: string;
  dateModified?: string;
  publishedAt?: string;
  datePublished?: string;
};

type ExpertRecord = {
  slug?: string;
  updatedAt?: string;
  dateModified?: string;
};

function validDate(value?: string): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function contentDate(...values: Array<string | undefined>): Date {
  for (const value of values) {
    const date = validDate(value);
    if (date) return date;
  }
  return RELEASE_DATE;
}

function getBlogRecords(): BlogRecord[] {
  try {
    const filePath = path.join(process.cwd(), "data", "blogs.json");
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as BlogRecord[];
    const seen = new Set<string>();
    return parsed.filter((item) => {
      const slug = typeof item?.slug === "string" ? item.slug.trim() : "";
      if (!slug || seen.has(slug)) return false;
      seen.add(slug);
      item.slug = slug;
      return true;
    });
  } catch (error) {
    console.error("Unable to load blog records for sitemap", error);
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: RELEASE_DATE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/courses`, lastModified: RELEASE_DATE, changeFrequency: "weekly", priority: 0.92 },
    { url: `${BASE_URL}/ai-expert`, lastModified: RELEASE_DATE, changeFrequency: "weekly", priority: 0.92 },
    { url: `${BASE_URL}/blog`, lastModified: RELEASE_DATE, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/about-us`, lastModified: RELEASE_DATE, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE_URL}/contact-us`, lastModified: RELEASE_DATE, changeFrequency: "monthly", priority: 0.72 },
    { url: `${BASE_URL}/reviews`, lastModified: RELEASE_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/companies`, lastModified: RELEASE_DATE, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE_URL}/collab`, lastModified: RELEASE_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/editorial-policy`, lastModified: RELEASE_DATE, changeFrequency: "monthly", priority: 0.55 },
    {
      url: `${BASE_URL}/authors/sikhadenge-editorial-team`,
      lastModified: RELEASE_DATE,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    { url: `${BASE_URL}/terms`, lastModified: RELEASE_DATE, changeFrequency: "yearly", priority: 0.35 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: RELEASE_DATE, changeFrequency: "yearly", priority: 0.35 },
    { url: `${BASE_URL}/refund-policy`, lastModified: RELEASE_DATE, changeFrequency: "yearly", priority: 0.35 },
  ];

  const skillRoutes: MetadataRoute.Sitemap = skillsData.map((skill) => ({
    url: `${BASE_URL}/${skill.slug}`,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getBlogRecords().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: contentDate(post.updatedAt, post.dateModified, post.publishedAt, post.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const expertRoutes: MetadataRoute.Sitemap = (generatedPages as ExpertRecord[])
    .filter((page) => typeof page?.slug === "string" && page.slug.trim().length > 0)
    .map((page) => ({
      url: `${BASE_URL}/expert/${page.slug!.trim()}`,
      lastModified: contentDate(page.updatedAt, page.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.62,
    }));

  return [...staticRoutes, ...skillRoutes, ...blogRoutes, ...expertRoutes];
}
