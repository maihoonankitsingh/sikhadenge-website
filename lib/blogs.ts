import fs from "fs";
import path from "path";

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

let cachedBlogs: BlogItem[] | null = null;

function getBlogsFilePath() {
  return path.join(process.cwd(), "data", "blogs.json");
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

export function getBlogs(forceRefresh = false): BlogItem[] {
  if (!forceRefresh && cachedBlogs) {
    return cachedBlogs;
  }

  try {
    const raw = fs.readFileSync(getBlogsFilePath(), "utf8");
    cachedBlogs = sanitizeBlogs(JSON.parse(raw));
  } catch {
    cachedBlogs = [];
  }

  return cachedBlogs;
}

export function getBlogBySlug(slug: string) {
  return getBlogs().find((item) => item.slug === slug);
}

export function getBlogSlugs() {
  return getBlogs().map((item) => item.slug);
}
