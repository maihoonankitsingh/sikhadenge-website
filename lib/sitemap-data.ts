import fs from "fs";
import path from "path";
import { skillsData } from "../data/skillsData";

export type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

const baseUrl = "https://sikhadenge.in";

function getRecords(fileName: string) {
  try {
    const filePath = path.join(process.cwd(), "data", fileName);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return [];
  }
}

function getSlugs(fileName: string) {
  return getRecords(fileName)
    .map((record: any) => record?.slug)
    .filter(Boolean);
}

function makeUrls(
  slugs: string[],
  prefix: string,
  priority: number,
  changeFrequency: SitemapEntry["changeFrequency"] = "weekly"
): SitemapEntry[] {
  const now = new Date();
  return slugs.map((slug) => ({
    url: `${baseUrl}${prefix}${slug}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

function uniqueUrls(entries: SitemapEntry[]): SitemapEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}

export function getStaticUrls(): SitemapEntry[] {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about-us",
    "/contact-us",
    "/ai-expert",
    "/ai-skills",
    "/courses",
    "/experts",
    "/gen-ai-masterclass",
    "/gen-ai-masterclass/register-one-step",
    "/blog",
    "/site-map",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.9,
  }));

  const rootSkillUrls = skillsData.map((skill: any) => ({
    url: `${baseUrl}/${skill.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return uniqueUrls([...staticRoutes, ...rootSkillUrls]);
}

export function getPromptUrls(): SitemapEntry[] {
  return makeUrls(getSlugs("generated-prompts.json"), "/prompts/", 0.8);
}

export function getCompareUrls(): SitemapEntry[] {
  return makeUrls(getSlugs("generated-vs.json"), "/compare/", 0.8);
}

export function getExpertUrls(): SitemapEntry[] {
  return makeUrls(getSlugs("generated-seo-merged.json"), "/expert/", 0.7);
}


export function getExpertUrlsChunk(chunkIndex: number, chunkSize: number = 5000): SitemapEntry[] {
  const all = makeUrls(getSlugs("generated-seo-merged.json"), "/expert/", 0.7);
  const start = chunkIndex * chunkSize;
  const end = start + chunkSize;
  return all.slice(start, end);
}

export function getHindiUrls(): SitemapEntry[] {
  return makeUrls(getSlugs("generated-hindi.json"), "/hindi/", 0.75);
}

export function getBlogUrls(): SitemapEntry[] {
  return makeUrls(getSlugs("blogs.json"), "/blog/", 0.76);
}

export function getToolUrls(): SitemapEntry[] {
  const fileName = "generated-mini-tools.json";
  const filePath = path.join(process.cwd(), "data", fileName);

  let lastModified = new Date("2026-07-10T00:00:00.000Z");

  try {
    lastModified = fs.statSync(filePath).mtime;
  } catch {
    // Keep a stable fallback if filesystem metadata is unavailable.
  }

  const freeTools = getSlugs(fileName).map((slug: string) => ({
    url: `${baseUrl}/free-tools/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return uniqueUrls(freeTools);
}
