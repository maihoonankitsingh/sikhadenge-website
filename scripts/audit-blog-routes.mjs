import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const BLOGS_PATH = path.join(ROOT, "data", "blogs.json");
const OUTPUT_DIR = path.join(ROOT, "output", "blog-route-audit");
const BASE_URL = "https://sikhadenge.in/blog";

const STATIC_LEGACY_REDIRECTS = [
  { source: "/blog/chatgpt-vs-gemini", destination: "/blog/gemini-vs-chatgpt", reason: "comparison-order" },
  { source: "/blog/how-to-rank-on-chatgpt", destination: "/blog/how-to-rank-in-chatgpt", reason: "preposition-normalization" },
  { source: "/blog/ai-tools-for-students-in-2026", destination: "/blog/ai-tools-for-students", reason: "yearless-canonical" },
  { source: "/blog/chatgpt-for-students-in-2026", destination: "/blog/chatgpt-for-students", reason: "yearless-canonical" },
  { source: "/blog/top-ai-tools-for-students", destination: "/blog/best-ai-tools-for-students", reason: "top-vs-best" },
  { source: "/blog/top-ai-tools-for-freelancers", destination: "/blog/best-ai-tools-for-freelancers", reason: "top-vs-best" },
  { source: "/blog/top-ai-tools-for-video-editing", destination: "/blog/best-ai-tools-for-video-editing", reason: "top-vs-best" },
];

function readBlogs() {
  return JSON.parse(fs.readFileSync(BLOGS_PATH, "utf8"));
}

function uniqueBySource(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.source)) return false;
    seen.add(item.source);
    return true;
  });
}

function generateAliases(slug) {
  const aliases = [];

  if (slug.startsWith("best-")) {
    aliases.push({ slug: slug.replace(/^best-/, "top-"), reason: "best-to-top" });
  }

  if (slug.startsWith("top-")) {
    aliases.push({ slug: slug.replace(/^top-/, "best-"), reason: "top-to-best" });
  }

  if (slug.includes("-vs-")) {
    const [left, right] = slug.split("-vs-");
    if (left && right) {
      aliases.push({ slug: `${right}-vs-${left}`, reason: "comparison-order" });
    }
  }

  if (slug.endsWith("-in-2026")) {
    aliases.push({ slug: slug.replace(/-in-2026$/, ""), reason: "trim-year" });
  } else if (!slug.match(/-\d{4}$/)) {
    aliases.push({ slug: `${slug}-in-2026`, reason: "append-year" });
  }

  if (slug.includes("-for-students")) {
    aliases.push({ slug: slug.replace("-for-students", "-for-college-students"), reason: "student-audience-variant" });
    aliases.push({ slug: slug.replace("-for-students", "-for-school-students"), reason: "student-audience-variant" });
  }

  if (slug.includes("-for-freelancers")) {
    aliases.push({ slug: slug.replace("-for-freelancers", "-for-beginners"), reason: "audience-variant" });
  }

  if (slug.includes("chatgpt")) {
    aliases.push({ slug: slug.replace("chatgpt", "openai-chatgpt"), reason: "tool-variant" });
  }

  return aliases;
}

function main() {
  const blogs = readBlogs();
  const existing = new Set(blogs.map((blog) => blog.slug));

  const generatedCandidates = blogs.flatMap((blog) =>
    generateAliases(blog.slug)
      .filter((candidate) => candidate.slug && candidate.slug !== blog.slug && !existing.has(candidate.slug))
      .map((candidate) => ({
        source: `/blog/${candidate.slug}`,
        destination: `/blog/${blog.slug}`,
        reason: candidate.reason,
        targetTitle: blog.title,
      })),
  );

  const staticCandidates = STATIC_LEGACY_REDIRECTS.filter(
    (item) => item.destination.startsWith("/blog/") && !existing.has(item.source.replace("/blog/", "")),
  );

  const redirectCandidates = uniqueBySource([...staticCandidates, ...generatedCandidates]).slice(0, 300);

  const summary = [
    `Blogs audited: ${blogs.length}`,
    `Redirect candidates: ${redirectCandidates.length}`,
    "",
    "Top redirect candidates:",
    ...redirectCandidates.slice(0, 40).map((item) => `${item.source} -> ${item.destination} [${item.reason}]`),
  ].join("\n");

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUTPUT_DIR, "route-audit-summary.txt"), summary, "utf8");
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "route-audit.json"),
    JSON.stringify(
      {
        auditedAt: new Date().toISOString(),
        baseUrl: BASE_URL,
        blogCount: blogs.length,
        redirectCandidates,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`Blogs audited: ${blogs.length}`);
  console.log(`Redirect candidates: ${redirectCandidates.length}`);
  console.log(`Output: ${path.join(OUTPUT_DIR, "route-audit-summary.txt")}`);
}

main();
