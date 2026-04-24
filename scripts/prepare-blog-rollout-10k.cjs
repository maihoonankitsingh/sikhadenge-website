const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = process.cwd();
const BLOGS_PATH = path.join(ROOT, "data", "blogs.json");
const MANIFEST_SCRIPT = path.join(ROOT, "scripts", "generate-blog-cluster-manifest.mjs");
const MANIFEST_PATH = path.join(ROOT, "output", "blog-expansion", "trending-topic-clusters.json");
const OUTPUT_DIR = path.join(ROOT, "output", "blog-rollout-10k");
const PLAN_PATH = path.join(OUTPUT_DIR, "rollout-plan.json");
const SUMMARY_PATH = path.join(OUTPUT_DIR, "rollout-summary.txt");
const PHASE1_PATH = path.join(OUTPUT_DIR, "phase-1-top-2000.json");
const PHASE2_PATH = path.join(OUTPUT_DIR, "phase-2-next-3000.json");
const PHASE3_PATH = path.join(OUTPUT_DIR, "phase-3-next-5000.json");
const CSV_PATH = path.join(OUTPUT_DIR, "phase-1-top-2000.csv");

const PHASES = [
  { key: "phase-1", label: "Top 2000", take: 2000, familyCap: 280, focus: "Highest-intent pages for SEO/AEO/GEO and commercial discovery" },
  { key: "phase-2", label: "Next 3000", take: 3000, familyCap: 420, focus: "Audience and platform depth for broader topical coverage" },
  { key: "phase-3", label: "Next 5000", take: 5000, familyCap: 700, focus: "Long-tail geographic and workflow expansion" },
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function writeCsv(filePath, rows) {
  const headers = ["slug", "title", "family", "category", "intent", "audience", "outcome", "platform", "city", "year", "score"];
  const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => escape(row[header])).join(",")),
  ];
  fs.writeFileSync(filePath, lines.join("\n"));
}

function countBy(items, key) {
  const map = new Map();
  for (const item of items) {
    const value = item[key];
    if (!value) continue;
    map.set(value, (map.get(value) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function formatTitle(value) {
  return String(value || "")
    .replace(/\bChatgpt\b/g, "ChatGPT")
    .replace(/\bGoogle Ai\b/g, "Google AI")
    .replace(/\bAi\b/g, "AI")
    .replace(/\bSeo\b/g, "SEO")
    .replace(/\bAeo\b/g, "AEO")
    .replace(/\bGeo\b/g, "GEO");
}

function selectDiversified(candidates, take, familyCap, consumedSlugs) {
  const picked = [];
  const overflow = [];
  const familyCounts = new Map();

  for (const candidate of candidates) {
    if (picked.length >= take) break;
    if (consumedSlugs.has(candidate.slug)) continue;

    const family = candidate.family || "misc";
    const nextCount = (familyCounts.get(family) || 0) + 1;

    if (nextCount <= familyCap) {
      picked.push(candidate);
      consumedSlugs.add(candidate.slug);
      familyCounts.set(family, nextCount);
    } else {
      overflow.push(candidate);
    }
  }

  for (const candidate of overflow) {
    if (picked.length >= take) break;
    if (consumedSlugs.has(candidate.slug)) continue;
    picked.push(candidate);
    consumedSlugs.add(candidate.slug);
    const family = candidate.family || "misc";
    familyCounts.set(family, (familyCounts.get(family) || 0) + 1);
  }

  return picked;
}

function buildPhaseEntries(candidates) {
  const consumedSlugs = new Set();

  return PHASES.map((phase) => {
    const items = selectDiversified(candidates, phase.take, phase.familyCap, consumedSlugs);
    return {
      ...phase,
      count: items.length,
      items,
      sitemapFilesNeeded: Math.ceil(items.length / 1000),
      families: countBy(items, "family").slice(0, 12),
      intents: countBy(items, "intent").slice(0, 10),
      outcomes: countBy(items, "outcome").slice(0, 10),
      audiences: countBy(items, "audience").slice(0, 10),
    };
  });
}

function writeSummary(filePath, payload) {
  const lines = [
    "10k Blog Rollout Summary",
    `Generated at: ${payload.generatedAt}`,
    `Existing live blogs: ${payload.existingBlogs}`,
    `Available rollout candidates: ${payload.totalCandidates}`,
    `Recommended rollout size: ${payload.recommendedRollout}`,
    "",
    "Rollout order:",
    ...payload.phases.map((phase) => `- ${phase.label}: ${phase.count} pages | ${phase.focus} | sitemap files ${phase.sitemapFilesNeeded} | family cap ${phase.familyCap}`),
    "",
    "Top families in first 10k:",
    ...payload.topFamilies.map((item) => `- ${item.name}: ${item.count}`),
    "",
    "Top intents in first 10k:",
    ...payload.topIntents.map((item) => `- ${item.name}: ${item.count}`),
    "",
    "Top outcomes in first 10k:",
    ...payload.topOutcomes.map((item) => `- ${item.name}: ${item.count}`),
    "",
    "Top phase-1 priority slugs:",
    ...payload.phase1Top.map((item) => `- ${item.slug} | ${item.score} | ${formatTitle(item.title)}`),
  ];
  fs.writeFileSync(filePath, lines.join("\n"));
}

function ensureManifest() {
  if (fs.existsSync(MANIFEST_PATH)) return;
  execFileSync(process.execPath, [MANIFEST_SCRIPT], { cwd: ROOT, stdio: "inherit" });
}

function main() {
  ensureDir(OUTPUT_DIR);
  ensureManifest();

  const blogs = readJson(BLOGS_PATH);
  const manifest = readJson(MANIFEST_PATH);
  const candidates = (manifest.candidates || []).map((item) => ({ ...item, title: formatTitle(item.title) })).slice(0, 10000);
  const phases = buildPhaseEntries(candidates);
  const rolloutItems = phases.flatMap((phase) => phase.items);

  const plan = {
    version: 2,
    generatedAt: new Date().toISOString(),
    existingBlogs: blogs.length,
    totalCandidates: manifest.candidates?.length || 0,
    recommendedRollout: rolloutItems.length,
    strategy: {
      publishOrder: ["phase-1", "phase-2", "phase-3"],
      why: "Quality-first rollout that strengthens crawlability, AEO/GEO coverage, and internal-link authority before larger-scale expansion.",
      sitemapBatchSize: 1000,
      internalLinkRule: "Link new pages to family hubs, /blog, and adjacent audience-intent siblings within the same rollout phase.",
      balancingRule: "Apply family caps per phase so one trend family does not dominate the crawl budget.",
    },
    phases: phases.map(({ items, ...phase }) => phase),
  };

  writeJson(PLAN_PATH, plan);
  writeJson(PHASE1_PATH, { version: 2, generatedAt: plan.generatedAt, phase: phases[0].label, count: phases[0].count, familyCap: phases[0].familyCap, items: phases[0].items });
  writeJson(PHASE2_PATH, { version: 2, generatedAt: plan.generatedAt, phase: phases[1].label, count: phases[1].count, familyCap: phases[1].familyCap, items: phases[1].items });
  writeJson(PHASE3_PATH, { version: 2, generatedAt: plan.generatedAt, phase: phases[2].label, count: phases[2].count, familyCap: phases[2].familyCap, items: phases[2].items });
  writeCsv(CSV_PATH, phases[0].items);

  writeSummary(SUMMARY_PATH, {
    generatedAt: plan.generatedAt,
    existingBlogs: blogs.length,
    totalCandidates: manifest.candidates?.length || 0,
    recommendedRollout: rolloutItems.length,
    phases,
    topFamilies: countBy(rolloutItems, "family").slice(0, 12),
    topIntents: countBy(rolloutItems, "intent").slice(0, 10),
    topOutcomes: countBy(rolloutItems, "outcome").slice(0, 10),
    phase1Top: phases[0].items.slice(0, 25),
  });

  console.log(`Existing live blogs: ${blogs.length}`);
  console.log(`Available candidates: ${manifest.candidates?.length || 0}`);
  console.log(`Prepared rollout phases: ${phases.map((phase) => `${phase.label}=${phase.count}`).join(", ")}`);
  console.log(`Rollout plan: ${PLAN_PATH}`);
  console.log(`Rollout summary: ${SUMMARY_PATH}`);
}

main();
