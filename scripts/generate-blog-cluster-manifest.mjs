import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const BASE_URL = "https://sikhadenge.in";
const BLOGS_PATH = path.join(ROOT, "data", "blogs.json");
const OUTPUT_DIR = path.join(ROOT, "output", "blog-expansion");
const CLUSTERS_PATH = path.join(OUTPUT_DIR, "trending-topic-clusters.json");
const BATCH_JSON_PATH = path.join(OUTPUT_DIR, "trending-topic-priority-batch-1.json");
const BATCH_CSV_PATH = path.join(OUTPUT_DIR, "trending-topic-priority-batch-1.csv");
const SUMMARY_PATH = path.join(OUTPUT_DIR, "trending-topic-summary.txt");

const TREND_FAMILIES = [
  { family: "chatgpt", category: "ChatGPT", keyword: "chatgpt", trend: 10 },
  { family: "gemini", category: "Gemini AI", keyword: "google gemini", trend: 9 },
  { family: "claude", category: "Claude AI", keyword: "claude ai", trend: 8 },
  { family: "perplexity", category: "Perplexity AI", keyword: "perplexity ai", trend: 8 },
  { family: "copilot", category: "AI Coding", keyword: "microsoft copilot", trend: 7 },
  { family: "google-ai-overviews", category: "AI Search", keyword: "google ai overviews", trend: 9 },
  { family: "google-ai-mode", category: "AI Search", keyword: "google ai mode", trend: 9 },
  { family: "ai-agents", category: "AI Automation", keyword: "ai agents", trend: 10 },
  { family: "prompt-engineering", category: "Prompt Engineering", keyword: "prompt engineering", trend: 8 },
  { family: "ai-automation", category: "AI Automation", keyword: "ai automation", trend: 8 },
  { family: "ai-workflows", category: "AI Workflow", keyword: "ai workflows", trend: 8 },
  { family: "ai-tools", category: "AI Tools", keyword: "ai tools", trend: 9 },
  { family: "ai-skills", category: "AI Skills", keyword: "ai skills", trend: 9 },
  { family: "chatgpt-prompts", category: "ChatGPT", keyword: "chatgpt prompts", trend: 9 },
  { family: "ai-search", category: "AI Search", keyword: "ai search", trend: 8 },
  { family: "ai-video-tools", category: "AI Video Editing", keyword: "ai video tools", trend: 7 },
  { family: "ai-tools-for-students", category: "AI Tools", keyword: "ai tools for students", trend: 10 },
  { family: "ai-tools-for-freelancers", category: "AI Tools", keyword: "ai tools for freelancers", trend: 9 },
  { family: "ai-tools-for-creators", category: "AI Tools", keyword: "ai tools for creators", trend: 9 },
  { family: "ai-tools-for-marketing", category: "AI Marketing", keyword: "ai tools for marketing", trend: 8 },
];

const AUDIENCES = [
  "students",
  "beginners",
  "freelancers",
  "creators",
  "marketers",
  "designers",
  "developers",
  "founders",
  "small-business-owners",
  "job-seekers",
  "working-professionals",
  "agencies",
  "coaches",
  "sales-teams",
  "consultants",
];

const INTENTS = [
  "best",
  "top",
  "guide",
  "how-to",
  "tools",
  "prompts",
  "workflow",
  "use-cases",
  "examples",
  "comparison",
  "for-beginners",
  "for-business",
  "for-work",
  "for-content-creation",
  "for-lead-generation",
];

const OUTCOMES = [
  "productivity",
  "content-creation",
  "lead-generation",
  "client-work",
  "career-growth",
  "portfolio-building",
  "earning",
  "automation",
  "seo",
  "aeo",
  "geo",
];

const PLATFORMS = [
  "instagram",
  "youtube",
  "linkedin",
  "google",
  "whatsapp",
  "shopify",
  "notion",
  "canva",
];

const PROBLEMS = [
  "ranking",
  "traffic",
  "lead-generation",
  "content-planning",
  "prompt-writing",
  "research",
  "automation",
  "client-delivery",
  "portfolio-building",
  "productivity",
];

const STAGES = [
  "beginners",
  "advanced",
  "without-coding",
  "without-experience",
  "for-freshers",
];

const CITIES = [
  "delhi",
  "mumbai",
  "bangalore",
  "hyderabad",
  "pune",
  "chennai",
  "kolkata",
  "ahmedabad",
  "jaipur",
  "lucknow",
  "noida",
  "indore",
  "surat",
  "nagpur",
  "chandigarh",
];

const YEARS = ["2026", "2027"];

function readBlogs() {
  try {
    return JSON.parse(fs.readFileSync(BLOGS_PATH, "utf8"));
  } catch {
    return [];
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function toTitleCase(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function scoreCandidate(item) {
  let score = item.trend * 10;

  if (item.intent === "best" || item.intent === "top") score += 18;
  if (item.intent === "guide" || item.intent === "how-to") score += 16;
  if (item.outcome === "seo" || item.outcome === "aeo" || item.outcome === "geo") score += 20;
  if (item.audience === "students" || item.audience === "freelancers" || item.audience === "creators") score += 12;
  if (item.family.includes("chatgpt") || item.family.includes("gemini") || item.family.includes("claude")) score += 14;
  if (item.city) score += 6;
  if (item.platform) score += 5;

  return score;
}

function pushCandidate(store, seen, payload) {
  if (seen.has(payload.slug)) return;
  seen.add(payload.slug);
  store.push({
    ...payload,
    url: `${BASE_URL}/blog/${payload.slug}`,
    title: payload.title || toTitleCase(payload.slug),
    score: scoreCandidate(payload),
  });
}

function generateCandidates(existingSlugSet) {
  const seen = new Set(existingSlugSet);
  const all = [];

  for (const family of TREND_FAMILIES) {
    const familySlug = family.family;

    for (const audience of AUDIENCES) {
      for (const intent of INTENTS) {
        for (const outcome of OUTCOMES) {
          pushCandidate(all, seen, {
            family: family.family,
            category: family.category,
            keyword: family.keyword,
            trend: family.trend,
            audience,
            intent,
            outcome,
            slug: `${intent}-${familySlug}-for-${audience}-${outcome}`,
            title: `${toTitleCase(intent)} ${toTitleCase(familySlug)} for ${toTitleCase(audience)} ${toTitleCase(outcome)}`,
            template: "intent-family-audience-outcome",
          });
        }
      }
    }

    for (const audience of AUDIENCES) {
      for (const city of CITIES) {
        for (const year of YEARS) {
          pushCandidate(all, seen, {
            family: family.family,
            category: family.category,
            keyword: family.keyword,
            trend: family.trend,
            audience,
            city,
            year,
            intent: "guide",
            outcome: "career-growth",
            slug: `${familySlug}-for-${audience}-in-${city}-${year}`,
            title: `${toTitleCase(familySlug)} for ${toTitleCase(audience)} in ${toTitleCase(city)} ${year}`,
            template: "family-audience-city-year",
          });
        }
      }
    }

    for (const platform of PLATFORMS) {
      for (const outcome of OUTCOMES) {
        for (const year of YEARS) {
          pushCandidate(all, seen, {
            family: family.family,
            category: family.category,
            keyword: family.keyword,
            trend: family.trend,
            platform,
            year,
            intent: "workflow",
            outcome,
            slug: `${familySlug}-${platform}-${outcome}-${year}`,
            title: `${toTitleCase(familySlug)} ${toTitleCase(platform)} ${toTitleCase(outcome)} ${year}`,
            template: "family-platform-outcome-year",
          });
        }
      }
    }

    for (const audience of AUDIENCES) {
      for (const problem of PROBLEMS) {
        for (const stage of STAGES) {
          pushCandidate(all, seen, {
            family: family.family,
            category: family.category,
            keyword: family.keyword,
            trend: family.trend,
            audience,
            problem,
            stage,
            intent: "guide",
            outcome: "seo",
            slug: `${familySlug}-for-${audience}-${problem}-${stage}`,
            title: `${toTitleCase(familySlug)} for ${toTitleCase(audience)} ${toTitleCase(problem)} ${toTitleCase(stage)}`,
            template: "family-audience-problem-stage",
          });
        }
      }
    }

    for (const problem of PROBLEMS) {
      for (const city of CITIES) {
        for (const year of YEARS) {
          pushCandidate(all, seen, {
            family: family.family,
            category: family.category,
            keyword: family.keyword,
            trend: family.trend,
            problem,
            city,
            year,
            intent: "guide",
            outcome: "geo",
            slug: `${familySlug}-${problem}-in-${city}-${year}`,
            title: `${toTitleCase(familySlug)} ${toTitleCase(problem)} in ${toTitleCase(city)} ${year}`,
            template: "family-problem-city-year",
          });
        }
      }
    }

    for (const audience of AUDIENCES) {
      for (const platform of PLATFORMS) {
        for (const problem of PROBLEMS) {
          pushCandidate(all, seen, {
            family: family.family,
            category: family.category,
            keyword: family.keyword,
            trend: family.trend,
            audience,
            platform,
            problem,
            intent: "workflow",
            outcome: "lead-generation",
            slug: `${familySlug}-for-${audience}-on-${platform}-for-${problem}`,
            title: `${toTitleCase(familySlug)} for ${toTitleCase(audience)} on ${toTitleCase(platform)} for ${toTitleCase(problem)}`,
            template: "family-audience-platform-problem",
          });
        }
      }
    }

    for (const otherFamily of TREND_FAMILIES) {
      if (otherFamily.family === family.family) continue;
      pushCandidate(all, seen, {
        family: family.family,
        category: family.category,
        keyword: family.keyword,
        trend: family.trend,
        intent: "comparison",
        outcome: "seo",
        comparisonWith: otherFamily.family,
        slug: `${familySlug}-vs-${otherFamily.family}`,
        title: `${toTitleCase(familySlug)} vs ${toTitleCase(otherFamily.family)}`,
        template: "family-vs-family",
      });
    }
  }

  return all.sort((a, b) => b.score - a.score);
}

function writeCsv(filePath, rows) {
  const headers = [
    "slug",
    "title",
    "family",
    "category",
    "keyword",
    "intent",
    "audience",
    "outcome",
    "platform",
    "city",
    "year",
    "score",
    "url",
  ];

  const escape = (value) => {
    const stringValue = value == null ? "" : String(value);
    return `"${stringValue.replace(/"/g, '""')}"`;
  };

  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => escape(row[header])).join(",")),
  ];

  fs.writeFileSync(filePath, lines.join("\n"));
}

function writeSummary(filePath, payload) {
  const lines = [
    "Trending Blog Cluster Summary",
    `Generated at: ${new Date().toISOString()}`,
    `Existing blog count: ${payload.existingCount}`,
    `New candidate count: ${payload.totalCandidates}`,
    `Priority batch size: ${payload.priorityBatchCount}`,
    "",
    "Top families by candidate count:",
    ...payload.familyCounts.map((item) => `- ${item.family}: ${item.count}`),
    "",
    "Top missing priority slugs:",
    ...payload.topPriority.map((item) => `- ${item.slug} | ${item.score} | ${item.title}`),
  ];

  fs.writeFileSync(filePath, lines.join("\n"));
}

function main() {
  ensureDir(OUTPUT_DIR);

  const blogs = readBlogs();
  const existingSlugSet = new Set(
    blogs
      .map((item) => item?.slug)
      .filter((slug) => typeof slug === "string" && slug.trim().length > 0),
  );

  const candidates = generateCandidates(existingSlugSet);
  const priorityBatch = candidates.slice(0, 5000);

  const familyMap = new Map();
  for (const candidate of candidates) {
    familyMap.set(candidate.family, (familyMap.get(candidate.family) || 0) + 1);
  }

  const familyCounts = Array.from(familyMap.entries())
    .map(([family, count]) => ({ family, count }))
    .sort((a, b) => b.count - a.count);

  fs.writeFileSync(
    CLUSTERS_PATH,
    JSON.stringify(
      {
        version: 1,
        generatedAt: new Date().toISOString(),
        existingCount: existingSlugSet.size,
        totalCandidates: candidates.length,
        familyCounts,
        candidates,
      },
      null,
      2,
    ),
  );

  fs.writeFileSync(
    BATCH_JSON_PATH,
    JSON.stringify(
      {
        version: 1,
        generatedAt: new Date().toISOString(),
        batch: "priority-batch-1",
        count: priorityBatch.length,
        items: priorityBatch,
      },
      null,
      2,
    ),
  );

  writeCsv(BATCH_CSV_PATH, priorityBatch);
  writeSummary(SUMMARY_PATH, {
    existingCount: existingSlugSet.size,
    totalCandidates: candidates.length,
    priorityBatchCount: priorityBatch.length,
    familyCounts: familyCounts.slice(0, 12),
    topPriority: priorityBatch.slice(0, 25),
  });

  console.log(`Existing blog count: ${existingSlugSet.size}`);
  console.log(`Generated new candidate slugs: ${candidates.length}`);
  console.log(`Priority batch size: ${priorityBatch.length}`);
  console.log(`Cluster manifest: ${CLUSTERS_PATH}`);
  console.log(`Priority batch JSON: ${BATCH_JSON_PATH}`);
  console.log(`Priority batch CSV: ${BATCH_CSV_PATH}`);
}

main();
