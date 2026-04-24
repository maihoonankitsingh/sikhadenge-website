const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BLOGS_PATH = path.join(ROOT, "data", "blogs.json");
const ROLLOUT_DIRS = [
  path.join(ROOT, "output", "blog-rollout-10k"),
  path.join(ROOT, "output", "blog-rollout-100k"),
];
const OUTPUT_DIR = path.join(ROOT, "output", "blog-rollout-audit");
const REPORT_PATH = path.join(OUTPUT_DIR, "route-integrity-report.json");
const SUMMARY_PATH = path.join(OUTPUT_DIR, "route-integrity-summary.txt");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function listPhaseFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .filter((name) => name.endsWith(".json") && !name.includes("rollout-plan"))
    .map((name) => path.join(dirPath, name));
}

function countDuplicates(items) {
  const seen = new Map();
  for (const item of items) {
    seen.set(item, (seen.get(item) || 0) + 1);
  }
  return Array.from(seen.entries())
    .filter(([, count]) => count > 1)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

function buildSummary(report) {
  const lines = [
    "Rollout Route Integrity Summary",
    `Generated at: ${report.generatedAt}`,
    `Live blog count: ${report.liveBlogCount}`,
    `Live duplicate slugs: ${report.liveDuplicateSlugs.length}`,
    `Live duplicate titles: ${report.liveDuplicateTitles.length}`,
    `Rollout files checked: ${report.rolloutFiles.length}`,
    `Cross-plan duplicate slugs: ${report.crossPlanDuplicateSlugs.length}`,
    `Already published rollout entries: ${report.alreadyPublishedCount}`,
    `Pending rollout entries: ${report.pendingPublicationCount}`,
    `Active publish gaps: ${report.activePublishGaps.length}`,
    "",
    "Checked files:",
    ...report.rolloutFiles.map((file) => `- ${file.name}: ${file.itemCount} items | ${file.status}`),
    "",
    "Active publish gap samples:",
    ...report.activePublishGaps.slice(0, 20).map((item) => `- ${item.slug} | ${item.source}`),
  ];
  fs.writeFileSync(SUMMARY_PATH, lines.join("\n"));
}

function main() {
  ensureDir(OUTPUT_DIR);

  const blogs = readJson(BLOGS_PATH, []);
  const liveSlugs = blogs.map((blog) => blog.slug).filter(Boolean);
  const liveTitles = blogs.map((blog) => blog.title).filter(Boolean);
  const liveSlugSet = new Set(liveSlugs);

  const rolloutFiles = [];
  const allEntries = [];

  for (const dirPath of ROLLOUT_DIRS) {
    for (const filePath of listPhaseFiles(dirPath)) {
      const payload = readJson(filePath, { items: [] });
      const items = Array.isArray(payload.items) ? payload.items : [];
      const relative = path.relative(ROOT, filePath).replace(/\\/g, "/");
      const publishedCount = items.filter((item) => item?.slug && liveSlugSet.has(item.slug)).length;
      const status = relative.includes("output/blog-rollout-100k/") ? "planned" : (publishedCount === items.length ? "published" : publishedCount === 0 ? "planned" : "partial");
      rolloutFiles.push({ name: relative, itemCount: items.length, status });
      for (const item of items) {
        allEntries.push({ slug: item?.slug, title: item?.title, source: relative, status });
      }
    }
  }

  const crossPlanDuplicateSlugs = countDuplicates(allEntries.map((entry) => entry.slug).filter(Boolean));
  const activeEntries = allEntries.filter((entry) => entry.status === "published" || entry.status === "partial");
  const activePublishGaps = activeEntries.filter((entry) => entry.slug && !liveSlugSet.has(entry.slug));
  const alreadyPublishedCount = allEntries.filter((entry) => entry.slug && liveSlugSet.has(entry.slug)).length;
  const pendingPublicationCount = allEntries.filter((entry) => entry.slug && !liveSlugSet.has(entry.slug)).length;

  const report = {
    generatedAt: new Date().toISOString(),
    liveBlogCount: blogs.length,
    liveDuplicateSlugs: countDuplicates(liveSlugs),
    liveDuplicateTitles: countDuplicates(liveTitles),
    rolloutFiles,
    crossPlanDuplicateSlugs,
    alreadyPublishedCount,
    pendingPublicationCount,
    activePublishGaps,
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  buildSummary(report);

  console.log(`Live blog count: ${report.liveBlogCount}`);
  console.log(`Rollout files checked: ${report.rolloutFiles.length}`);
  console.log(`Cross-plan duplicate slugs: ${report.crossPlanDuplicateSlugs.length}`);
  console.log(`Pending rollout entries: ${report.pendingPublicationCount}`);
  console.log(`Active publish gaps: ${report.activePublishGaps.length}`);
  console.log(`Report: ${REPORT_PATH}`);
}

main();

