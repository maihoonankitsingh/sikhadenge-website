import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const BLOGS_PATH = path.join(ROOT, "data", "blogs.json");
const BLOG_APP_DIR = path.join(ROOT, "app", "blog");
const OUTPUT_DIR = path.join(ROOT, "output", "blog-audit");
const AUDIT_PATH = path.join(OUTPUT_DIR, "foundation-audit.json");
const SUMMARY_PATH = path.join(OUTPUT_DIR, "foundation-audit-summary.txt");
const MISSING_SLUGS_PATH = path.join(OUTPUT_DIR, "missing-high-intent-slugs.json");

const HIGH_INTENT_SLUGS = [
  "ai-tools-for-students",
  "best-ai-tools-for-students",
  "chatgpt-for-students",
  "google-gemini-for-students",
  "claude-for-students",
  "best-chatgpt-prompts-for-students",
  "ai-tools-for-freelancers",
  "best-ai-tools-for-freelancers",
  "chatgpt-for-freelancers",
  "ai-tools-for-creators",
  "best-ai-tools-for-creators",
  "chatgpt-for-content-creation",
  "gemini-vs-chatgpt",
  "claude-vs-chatgpt",
  "perplexity-vs-chatgpt",
  "copilot-vs-chatgpt",
  "google-ai-overviews-guide",
  "google-ai-mode-guide",
  "ai-agents-for-beginners",
  "best-ai-agents-for-business",
  "chatgpt-prompts-for-marketing",
  "chatgpt-prompts-for-sales",
  "best-ai-tools-for-lead-generation",
  "best-ai-tools-for-seo",
  "best-ai-tools-for-aeo",
  "best-ai-tools-for-geo",
  "how-to-rank-in-chatgpt",
  "how-to-rank-in-google-ai-overviews",
  "how-to-rank-in-google-ai-mode",
  "how-to-get-cited-by-ai-tools",
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return [];
  }
}

function walkStaticBlogRoutes(dir, relative = "") {
  const output = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    const nextRelative = path.join(relative, entry.name);

    if (entry.isDirectory()) {
      output.push(...walkStaticBlogRoutes(absolute, nextRelative));
      continue;
    }

    if (entry.name !== "page.tsx") continue;

    const route = nextRelative
      .replace(/\\page\.tsx$/, "")
      .replace(/\\/g, "/");

    if (!route || route === "[slug]") continue;
    output.push(route);
  }

  return output;
}

function main() {
  ensureDir(OUTPUT_DIR);

  const blogs = readJson(BLOGS_PATH);
  const slugMap = new Map();
  const titleMap = new Map();
  const duplicateSlugs = [];
  const duplicateTitles = [];
  const malformedSlugs = [];

  for (const blog of blogs) {
    const slug = typeof blog?.slug === "string" ? blog.slug.trim() : "";
    const title = typeof blog?.title === "string" ? blog.title.trim() : "";

    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      malformedSlugs.push(slug || "(empty)");
      continue;
    }

    if (slugMap.has(slug)) {
      duplicateSlugs.push(slug);
    } else {
      slugMap.set(slug, title);
    }

    const titleKey = title.toLowerCase();
    if (titleKey) {
      if (titleMap.has(titleKey)) {
        duplicateTitles.push({
          title,
          firstSlug: titleMap.get(titleKey),
          duplicateSlug: slug,
        });
      } else {
        titleMap.set(titleKey, slug);
      }
    }
  }

  const staticRoutes = walkStaticBlogRoutes(BLOG_APP_DIR);
  const nestedRoutes = staticRoutes.filter((route) => route.includes("/"));
  const exactStaticBlogSlugs = new Set(staticRoutes.filter((route) => !route.includes("/")));
  const blogSlugs = new Set(slugMap.keys());

  const missingHighIntentSlugs = HIGH_INTENT_SLUGS.filter(
    (slug) => !blogSlugs.has(slug) && !exactStaticBlogSlugs.has(slug),
  );

  const orphanStaticRoutes = staticRoutes.filter(
    (route) => !route.includes("/") && !blogSlugs.has(route),
  );

  const legacyNestedRoutes = nestedRoutes.map((route) => {
    const leafSlug = route.split("/").pop();
    return {
      route,
      leafSlug,
      hasFlatCanonical: leafSlug ? blogSlugs.has(leafSlug) : false,
    };
  });

  const audit = {
    generatedAt: new Date().toISOString(),
    blogCount: blogs.length,
    uniqueSlugCount: blogSlugs.size,
    duplicateSlugCount: duplicateSlugs.length,
    duplicateTitleCount: duplicateTitles.length,
    malformedSlugCount: malformedSlugs.length,
    staticBlogRouteCount: staticRoutes.length,
    nestedStaticRouteCount: nestedRoutes.length,
    orphanStaticRouteCount: orphanStaticRoutes.length,
    missingHighIntentSlugCount: missingHighIntentSlugs.length,
    duplicateSlugs: duplicateSlugs.slice(0, 100),
    duplicateTitles: duplicateTitles.slice(0, 100),
    malformedSlugs: malformedSlugs.slice(0, 100),
    orphanStaticRoutes,
    legacyNestedRoutes,
    missingHighIntentSlugs,
  };

  fs.writeFileSync(AUDIT_PATH, JSON.stringify(audit, null, 2));
  fs.writeFileSync(
    MISSING_SLUGS_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        count: missingHighIntentSlugs.length,
        items: missingHighIntentSlugs,
      },
      null,
      2,
    ),
  );

  const summary = [
    "Blog Foundation Audit",
    `Generated at: ${audit.generatedAt}`,
    `Blog count: ${audit.blogCount}`,
    `Unique slug count: ${audit.uniqueSlugCount}`,
    `Duplicate slug count: ${audit.duplicateSlugCount}`,
    `Duplicate title count: ${audit.duplicateTitleCount}`,
    `Malformed slug count: ${audit.malformedSlugCount}`,
    `Static blog route count: ${audit.staticBlogRouteCount}`,
    `Nested static route count: ${audit.nestedStaticRouteCount}`,
    `Orphan static route count: ${audit.orphanStaticRouteCount}`,
    `Missing high intent slug count: ${audit.missingHighIntentSlugCount}`,
    "",
    "Top missing high-intent slugs:",
    ...missingHighIntentSlugs.slice(0, 25).map((slug) => `- ${slug}`),
  ];

  fs.writeFileSync(SUMMARY_PATH, summary.join("\n"));

  console.log(`Blog count: ${audit.blogCount}`);
  console.log(`Duplicate slugs: ${audit.duplicateSlugCount}`);
  console.log(`Duplicate titles: ${audit.duplicateTitleCount}`);
  console.log(`Missing high-intent slugs: ${audit.missingHighIntentSlugCount}`);
  console.log(`Audit written to: ${AUDIT_PATH}`);
}

main();
