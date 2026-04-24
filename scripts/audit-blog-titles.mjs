import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const BLOGS_PATH = path.join(ROOT, "data", "blogs.json");
const OUTPUT_DIR = path.join(ROOT, "output", "blog-title-audit");
const SUMMARY_PATH = path.join(OUTPUT_DIR, "title-audit-summary.txt");
const JSON_PATH = path.join(OUTPUT_DIR, "title-audit.json");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readBlogs() {
  try {
    return JSON.parse(fs.readFileSync(BLOGS_PATH, "utf8"));
  } catch {
    return [];
  }
}

function isWeakTitle(title) {
  if (!title) return true;
  if (title.length < 35 || title.length > 68) return true;
  if (/^step by step tutorial for /i.test(title)) return true;
  if (/^essential skills for /i.test(title)) return true;
  if (/^business ideas using /i.test(title)) return true;
  if (/^portfolio building for /i.test(title)) return true;
  if (/^interview questions for /i.test(title)) return true;
  if (/^workflow automation with /i.test(title)) return true;
  if (/^salary guide for /i.test(title)) return true;
  if ((title.match(/\bfor\b/gi) || []).length >= 3) return true;
  return false;
}

function main() {
  ensureDir(OUTPUT_DIR);
  const blogs = readBlogs();

  const weakTitles = blogs
    .filter((blog) => isWeakTitle((blog.title || "").trim()))
    .map((blog) => ({
      slug: blog.slug,
      title: blog.title,
      category: blog.category,
      length: (blog.title || "").trim().length,
    }));

  const stats = {
    generatedAt: new Date().toISOString(),
    totalBlogs: blogs.length,
    weakTitleCount: weakTitles.length,
    tooShortCount: blogs.filter((blog) => (blog.title || "").trim().length < 35).length,
    tooLongCount: blogs.filter((blog) => (blog.title || "").trim().length > 68).length,
    genericPatternCount: blogs.filter((blog) => {
      const title = (blog.title || "").trim();
      return (
        /^step by step tutorial for /i.test(title) ||
        /^essential skills for /i.test(title) ||
        /^business ideas using /i.test(title) ||
        /^portfolio building for /i.test(title) ||
        /^interview questions for /i.test(title) ||
        /^workflow automation with /i.test(title) ||
        /^salary guide for /i.test(title)
      );
    }).length,
    samples: weakTitles.slice(0, 250),
  };

  fs.writeFileSync(JSON_PATH, JSON.stringify(stats, null, 2));
  fs.writeFileSync(
    SUMMARY_PATH,
    [
      "Blog Title Audit",
      `Generated at: ${stats.generatedAt}`,
      `Total blogs: ${stats.totalBlogs}`,
      `Weak titles: ${stats.weakTitleCount}`,
      `Too short: ${stats.tooShortCount}`,
      `Too long: ${stats.tooLongCount}`,
      `Generic patterns: ${stats.genericPatternCount}`,
      "",
      "Sample weak titles:",
      ...stats.samples.slice(0, 40).map((item) => `- ${item.title} | ${item.slug}`),
    ].join("\n"),
  );

  console.log(`Total blogs: ${stats.totalBlogs}`);
  console.log(`Weak titles: ${stats.weakTitleCount}`);
  console.log(`Too short: ${stats.tooShortCount}`);
  console.log(`Too long: ${stats.tooLongCount}`);
  console.log(`Generic patterns: ${stats.genericPatternCount}`);
  console.log(`Output: ${SUMMARY_PATH}`);
}

main();
