import fs from "fs";
import path from "path";

import {
  isBlogRedirectSource,
} from "./blog-redirects";

export type BlogFaq = { q: string; a: string };

export type BlogItem = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  intro?: string;
  summaryPoints?: string[];
  practicalSteps?: string[];
  mistakes?: string[];
  faqs?: BlogFaq[];
};

type BlogShard = { file: string; count?: number };

type BlogManifest = {
  shards?: BlogShard[];
};

type BlogSlugIndex = {
  slugs?: Record<string, string>;
};

let cachedBlogs: BlogItem[] | null = null;
let cachedBlogBySlug: Map<string, BlogItem> | null = null;
let cachedSlugIndex: Record<string, string> | null = null;
const cachedShards = new Map<string, BlogItem[]>();

function getBlogsFilePath() {
  return path.join(process.cwd(), "data", "blogs.json");
}

function getBlogsIndexPath() {
  return path.join(process.cwd(), "data", "blogs", "index.json");
}

function getBlogsSlugIndexPath() {
  return path.join(process.cwd(), "data", "blogs", "slug-index.json");
}

function getBlogsShardPath(file: string) {
  return path.join(process.cwd(), "data", "blogs", file);
}

function readJsonFile(filePath: string, fallback: unknown) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function readRawBlogs(): unknown[] {
  const manifest = readJsonFile(getBlogsIndexPath(), null) as BlogManifest | null;

  if (manifest && Array.isArray(manifest.shards)) {
    return manifest.shards.flatMap((shard) => {
      if (!shard?.file) return [];
      const items = readJsonFile(getBlogsShardPath(shard.file), []);
      return Array.isArray(items) ? items : [];
    });
  }

  const fallback = readJsonFile(getBlogsFilePath(), []);
  return Array.isArray(fallback) ? fallback : [];
}

function sanitizeBlogs(input: unknown): BlogItem[] {
  if (!Array.isArray(input)) {
    return [];
  }

  const seen = new Set<string>();
  const cleaned: BlogItem[] = [];

  for (const item of input) {
    if (!item || typeof item !== "object") continue;

    const blog = item as Partial<BlogItem>;
    const slug = typeof blog.slug === "string" ? blog.slug.trim() : "";
    const title = typeof blog.title === "string" ? blog.title.trim() : "";

    if (!slug || !title || seen.has(slug)) continue;
    seen.add(slug);

    cleaned.push({
      slug,
      title,
      excerpt: typeof blog.excerpt === "string" ? blog.excerpt.trim() : undefined,
      category: typeof blog.category === "string" ? blog.category.trim() : undefined,
      readTime: typeof blog.readTime === "string" ? blog.readTime.trim() : undefined,
      intro: typeof blog.intro === "string" ? blog.intro.trim() : undefined,
      summaryPoints: Array.isArray(blog.summaryPoints)
        ? blog.summaryPoints.filter((point): point is string => typeof point === "string" && point.trim().length > 0)
        : undefined,
      practicalSteps: Array.isArray(blog.practicalSteps)
        ? blog.practicalSteps.filter((step): step is string => typeof step === "string" && step.trim().length > 0)
        : undefined,
      mistakes: Array.isArray(blog.mistakes)
        ? blog.mistakes.filter((mistake): mistake is string => typeof mistake === "string" && mistake.trim().length > 0)
        : undefined,
      faqs: Array.isArray(blog.faqs)
        ? blog.faqs.filter(
            (faq): faq is BlogFaq =>
              !!faq &&
              typeof faq === "object" &&
              typeof faq.q === "string" &&
              faq.q.trim().length > 0 &&
              typeof faq.a === "string" &&
              faq.a.trim().length > 0,
          )
        : undefined,
    });
  }

  return cleaned;
}

function readSlugIndex() {
  if (cachedSlugIndex) {
    return cachedSlugIndex;
  }

  const payload = readJsonFile(getBlogsSlugIndexPath(), null) as BlogSlugIndex | null;
  cachedSlugIndex = payload && payload.slugs && typeof payload.slugs === "object" ? payload.slugs : {};
  return cachedSlugIndex;
}

function readShardBlogs(file: string) {
  if (cachedShards.has(file)) {
    return cachedShards.get(file) || [];
  }

  const items = readJsonFile(getBlogsShardPath(file), []);
  const blogs = sanitizeBlogs(Array.isArray(items) ? items : []);
  cachedShards.set(file, blogs);
  return blogs;
}

export function getBlogs(forceRefresh = false): BlogItem[] {
  if (!forceRefresh && cachedBlogs) {
    return cachedBlogs;
  }

  if (forceRefresh) {
    cachedShards.clear();
    cachedSlugIndex = null;
  }

  cachedBlogs = sanitizeBlogs(
    readRawBlogs(),
  ).filter(
    (item) =>
      !isBlogRedirectSource(item.slug),
  );

  cachedBlogBySlug = new Map(
    cachedBlogs.map(
      (item) => [item.slug, item],
    ),
  );
  return cachedBlogs;
}

export function getBlogBySlug(slug: string) {
  if (cachedBlogBySlug?.has(slug)) {
    return cachedBlogBySlug.get(slug);
  }

  const shardFile = readSlugIndex()[slug];
  if (shardFile) {
    const found = readShardBlogs(shardFile).find((item) => item.slug === slug);
    if (found) {
      if (!cachedBlogBySlug) cachedBlogBySlug = new Map();
      cachedBlogBySlug.set(slug, found);
    }
    return found;
  }

  return getBlogs().find((item) => item.slug === slug);
}

export function getBlogCandidatesForSlug(slug: string) {
  const shardFile = readSlugIndex()[slug];
  if (!shardFile) {
    return getBlogs().slice(0, 1000);
  }

  return readShardBlogs(
    shardFile,
  ).filter(
    (item) =>
      !isBlogRedirectSource(item.slug),
  );
}

export function getBlogSlugs() {
  return getBlogs().map((item) => item.slug);
}
