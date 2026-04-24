const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = process.cwd();
const BLOGS_PATH = path.join(ROOT, "data", "blogs.json");
const MANIFEST_SCRIPT = path.join(ROOT, "scripts", "generate-blog-cluster-manifest.mjs");
const MANIFEST_PATH = path.join(ROOT, "output", "blog-expansion", "trending-topic-clusters.json");
const OUTPUT_DIR = path.join(ROOT, "output", "blog-rollout-100k");
const PLAN_PATH = path.join(OUTPUT_DIR, "rollout-plan-100k.json");
const SUMMARY_PATH = path.join(OUTPUT_DIR, "rollout-summary-100k.txt");

const PHASES = [
  { key: "phase-1", label: "Top 5000", take: 5000, familyCap: 700, focus: "Highest-intent pages for SEO, AEO, GEO, and recommendation systems" },
  { key: "phase-2", label: "Next 10000", take: 10000, familyCap: 1400, focus: "Audience and platform depth for broader non-brand discovery" },
  { key: "phase-3", label: "Next 15000", take: 15000, familyCap: 2200, focus: "Problem-solution and workflow expansion for long-tail coverage" },
  { key: "phase-4", label: "Next 20000", take: 20000, familyCap: 2800, focus: "Regional, city, and commercial-intent coverage at scale" },
  { key: "phase-5", label: "Next 25000", take: 25000, familyCap: 3600, focus: "Entity breadth and comparison-style discovery expansion" },
  { key: "phase-6", label: "Next 25000", take: 25000, familyCap: 3600, focus: "Deep long-tail reserve rollout with crawl-budget balancing" },
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
      families: countBy(items, "family").slice(0, 15),
      intents: countBy(items, "intent").slice(0, 15),
      outcomes: countBy(items, "outcome").slice(0, 15),
      audiences: countBy(items, "audience").slice(0, 15),
    };
  });
}

function writeSummary(filePath, payload) {
  const lines = [
    "100k Blog Rollout Summary",
    `Generated at: ${payload.generatedAt}`,
    `Existing live blogs: ${payload.existingBlogs}`,
    `Available rollout candidates: ${payload.totalCandidates}`,
    `Recommended rollout size: ${payload.recommendedRollout}`,
    "",
    "Rollout order:",
    ...payload.phases.map((phase) => `- ${phase.label}: ${phase.count} pages | ${phase.focus} | sitemap files ${phase.sitemapFilesNeeded} | family cap ${phase.familyCap}`),
    "",
    "Top families in 100k:",
    ...payload.topFamilies.map((item) => `- ${item.name}: ${item.count}`),
    "",
    "Top intents in 100k:",
    ...payload.topIntents.map((item) => `- ${item.name}: ${item.count}`),
    "",
    "Top outcomes in 100k:",
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
  const candidates = (manifest.candidates || []).map((item) => ({ ...item, title: formatTitle(item.title) })).slice(0, 100000);
  const phases = buildPhaseEntries(candidates);
  const rolloutItems = phases.flatMap((phase) => phase.items);

  const plan = {
    version: 1,
    generatedAt: new Date().toISOString(),
    existingBlogs: blogs.length,
    totalCandidates: manifest.candidates?.length || 0,
    recommendedRollout: rolloutItems.length,
    strategy: {
      publishOrder: PHASES.map((phase) => phase.key),
      why: "Quality-first high-scale rollout that keeps crawlability, AEO/GEO coverage, and no-404 discipline stronger than raw page count expansion.",
      sitemapBatchSize: 1000,
      internalLinkRule: "Link every new page to family hubs, /blog, audience siblings, and same-intent neighbors after each phase.",
      balancingRule: "Apply family caps per phase so one family does not dominate crawl budget or recommendation signals.",
      no404Rule: "Only publish pages that exist in data/blogs.json and validate slug integrity after each phase before deployment.",
    },
    phases: phases.map(({ items, ...phase }) => phase),
  };

  writeJson(PLAN_PATH, plan);

  for (const phase of phases) {
    const safeName = phase.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    writeJson(path.join(OUTPUT_DIR, `${safeName}.json`), {
      version: 1,
      generatedAt: plan.generatedAt,
      phase: phase.label,
      count: phase.count,
      familyCap: phase.familyCap,
      sitemapFilesNeeded: phase.sitemapFilesNeeded,
      items: phase.items,
    });
  }

  writeSummary(SUMMARY_PATH, {
    generatedAt: plan.generatedAt,
    existingBlogs: blogs.length,
    totalCandidates: manifest.candidates?.length || 0,
    recommendedRollout: rolloutItems.length,
    phases,
    topFamilies: countBy(rolloutItems, "family").slice(0, 15),
    topIntents: countBy(rolloutItems, "intent").slice(0, 15),
    topOutcomes: countBy(rolloutItems, "outcome").slice(0, 15),
    phase1Top: phases[0].items.slice(0, 30),
  });

  console.log(`Existing live blogs: ${blogs.length}`);
  console.log(`Available candidates: ${manifest.candidates?.length || 0}`);
  console.log(`Prepared rollout phases: ${phases.map((phase) => `${phase.label}=${phase.count}`).join(", ")}`);
  console.log(`Rollout plan: ${PLAN_PATH}`);
  console.log(`Rollout summary: ${SUMMARY_PATH}`);
}

main();
