import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { once } from "node:events";

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "data", "generated", "blog-quality");
const SUMMARY_PATH = path.join(OUTPUT_DIR, "inventory-classification-summary.json");
const NDJSON_PATH = path.join(OUTPUT_DIR, "inventory-classification.ndjson");
const CSV_PATH = path.join(OUTPUT_DIR, "inventory-classification.csv");

const { readBlogs } = await import("./lib/blog-data.cjs");

function parseArgs(argv) {
  const args = { gsc: null, limit: null };

  for (const arg of argv) {
    if (arg.startsWith("--gsc=")) {
      args.gsc = arg.slice("--gsc=".length).trim() || null;
    } else if (arg.startsWith("--limit=")) {
      const value = Number(arg.slice("--limit=".length));
      if (Number.isFinite(value) && value > 0) args.limit = Math.floor(value);
    }
  }

  return args;
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function digest(value) {
  const normalized = normalizeText(value);
  if (!normalized) return "";
  return crypto.createHash("sha1").update(normalized).digest("hex");
}

function wordCount(value) {
  const normalized = normalizeText(value);
  return normalized ? normalized.split(" ").length : 0;
}

function arrayStrings(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string" && item.trim())
    : [];
}

function faqItems(value) {
  return Array.isArray(value)
    ? value.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          typeof item.q === "string" &&
          item.q.trim() &&
          typeof item.a === "string" &&
          item.a.trim(),
      )
    : [];
}

function getTextStats(blog) {
  const summaryPoints = arrayStrings(blog?.summaryPoints);
  const practicalSteps = arrayStrings(blog?.practicalSteps);
  const mistakes = arrayStrings(blog?.mistakes);
  const faqs = faqItems(blog?.faqs);

  const totalWords = [
    blog?.title,
    blog?.excerpt,
    blog?.intro,
    ...summaryPoints,
    ...practicalSteps,
    ...mistakes,
    ...faqs.flatMap((faq) => [faq.q, faq.a]),
  ].reduce((total, value) => total + wordCount(value), 0);

  return {
    summaryPoints,
    practicalSteps,
    mistakes,
    faqs,
    totalWords,
  };
}

function increment(map, key) {
  if (!key) return;
  map.set(key, (map.get(key) || 0) + 1);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell.replace(/\r$/, ""));
    rows.push(row);
  }

  return rows;
}

function normalizeHeader(value) {
  return normalizeText(value).replace(/\s+/g, "_");
}

function numberValue(value) {
  const parsed = Number(String(value ?? "").replace(/[,\s%]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function slugFromGscPage(value) {
  if (!value) return null;

  let pathname = String(value).trim();
  try {
    pathname = new URL(pathname).pathname;
  } catch {
    pathname = pathname.split(/[?#]/)[0];
  }

  const match = pathname.match(/^\/blog\/([^/]+)\/?$/i);
  return match ? decodeURIComponent(match[1]) : null;
}

function loadGscEvidence(filePath) {
  const evidence = new Map();
  if (!filePath) return evidence;

  const absolute = path.resolve(ROOT, filePath);
  if (!fs.existsSync(absolute)) {
    throw new Error(`GSC file not found: ${absolute}`);
  }

  const rows = parseCsv(fs.readFileSync(absolute, "utf8"));
  if (rows.length < 2) return evidence;

  const headers = rows[0].map(normalizeHeader);
  const pageIndex = headers.findIndex((header) =>
    ["page", "url", "top_pages", "landing_page"].includes(header),
  );
  const clicksIndex = headers.findIndex((header) => header === "clicks");
  const impressionsIndex = headers.findIndex((header) => header === "impressions");
  const positionIndex = headers.findIndex((header) =>
    ["position", "average_position", "avg_position"].includes(header),
  );

  if (pageIndex < 0) {
    throw new Error(
      `GSC CSV must include a page/url column. Found: ${headers.join(", ")}`,
    );
  }

  for (const row of rows.slice(1)) {
    const slug = slugFromGscPage(row[pageIndex]);
    if (!slug) continue;

    const current = evidence.get(slug) || {
      clicks: 0,
      impressions: 0,
      weightedPositionTotal: 0,
      positionWeight: 0,
    };

    const clicks = clicksIndex >= 0 ? numberValue(row[clicksIndex]) : 0;
    const impressions =
      impressionsIndex >= 0 ? numberValue(row[impressionsIndex]) : 0;
    const position = positionIndex >= 0 ? numberValue(row[positionIndex]) : 0;
    const weight = Math.max(impressions, 1);

    current.clicks += clicks;
    current.impressions += impressions;
    if (position > 0) {
      current.weightedPositionTotal += position * weight;
      current.positionWeight += weight;
    }

    evidence.set(slug, current);
  }

  return new Map(
    Array.from(evidence.entries()).map(([slug, value]) => [
      slug,
      {
        clicks: value.clicks,
        impressions: value.impressions,
        averagePosition:
          value.positionWeight > 0
            ? value.weightedPositionTotal / value.positionWeight
            : null,
      },
    ]),
  );
}

function scoreBlog(blog, stats, frequencies) {
  const reasons = [];
  let score = 0;

  const slug = typeof blog?.slug === "string" ? blog.slug.trim() : "";
  const title = typeof blog?.title === "string" ? blog.title.trim() : "";
  const excerpt = typeof blog?.excerpt === "string" ? blog.excerpt.trim() : "";
  const intro = typeof blog?.intro === "string" ? blog.intro.trim() : "";

  const malformedSlug = !slug || !/^[a-z0-9-]+$/.test(slug);
  const missingTitle = !title;

  if (title.length >= 30 && title.length <= 75) score += 12;
  else if (title.length >= 15) score += 7;
  else reasons.push("weak_title_depth");

  if (excerpt.length >= 80 && excerpt.length <= 240) score += 12;
  else if (excerpt.length >= 40) score += 7;
  else reasons.push("weak_excerpt_depth");

  const introWords = wordCount(intro);
  if (introWords >= 80) score += 16;
  else if (introWords >= 40) score += 10;
  else reasons.push("weak_intro_depth");

  if (stats.summaryPoints.length >= 3) score += 12;
  else reasons.push("missing_summary_depth");

  if (stats.practicalSteps.length >= 4) score += 16;
  else if (stats.practicalSteps.length >= 2) score += 8;
  else reasons.push("missing_practical_steps");

  if (stats.mistakes.length >= 4) score += 10;
  else if (stats.mistakes.length >= 2) score += 5;
  else reasons.push("missing_mistake_coverage");

  if (stats.faqs.length >= 4) score += 12;
  else if (stats.faqs.length >= 2) score += 6;
  else reasons.push("missing_faq_depth");

  if (typeof blog?.category === "string" && blog.category.trim()) score += 5;
  if (typeof blog?.readTime === "string" && blog.readTime.trim()) score += 5;

  if (stats.totalWords < 250) {
    score -= 25;
    reasons.push("very_thin_content");
  } else if (stats.totalWords < 500) {
    score -= 10;
    reasons.push("thin_content");
  }

  const titlePeers = frequencies.title.get(digest(title)) || 0;
  const introPeers = frequencies.intro.get(digest(intro)) || 0;
  const excerptPeers = frequencies.excerpt.get(digest(excerpt)) || 0;
  const faqSignature = stats.faqs.map((faq) => faq.q).join(" | ");
  const faqPeers = frequencies.faq.get(digest(faqSignature)) || 0;

  if (titlePeers > 1) {
    score -= 30;
    reasons.push("duplicate_title");
  }

  if (intro && introPeers >= 10) {
    score -= 20;
    reasons.push("high_intro_template_repetition");
  } else if (intro && introPeers >= 3) {
    score -= 10;
    reasons.push("intro_template_repetition");
  }

  if (excerpt && excerptPeers >= 10) {
    score -= 12;
    reasons.push("high_excerpt_template_repetition");
  } else if (excerpt && excerptPeers >= 3) {
    score -= 6;
    reasons.push("excerpt_template_repetition");
  }

  if (stats.faqs.length && faqPeers >= 20) {
    score -= 12;
    reasons.push("faq_template_repetition");
  }

  if (malformedSlug) reasons.push("malformed_slug");
  if (missingTitle) reasons.push("missing_title");

  return {
    score: Math.max(0, Math.min(100, score)),
    reasons,
    malformedSlug,
    missingTitle,
    titlePeers,
    introPeers,
    excerptPeers,
    faqPeers,
  };
}

function proposedAction(quality, gsc) {
  const strongTraffic = gsc.clicks >= 5 || gsc.impressions >= 100;
  const someTraffic = gsc.clicks > 0 || gsc.impressions >= 20;
  const repeatedTemplate =
    quality.titlePeers > 1 ||
    quality.introPeers >= 10 ||
    quality.excerptPeers >= 10 ||
    quality.faqPeers >= 20;

  if (quality.malformedSlug || quality.missingTitle) {
    return { action: "DELETE", confidence: "high" };
  }

  if (quality.titlePeers > 1 || (repeatedTemplate && quality.score < 55)) {
    return { action: "MERGE", confidence: strongTraffic ? "medium" : "high" };
  }

  if (strongTraffic) {
    return quality.score >= 60
      ? { action: "KEEP", confidence: "high" }
      : { action: "IMPROVE", confidence: "high" };
  }

  if (someTraffic) {
    return quality.score >= 75
      ? { action: "KEEP", confidence: "medium" }
      : { action: "IMPROVE", confidence: "high" };
  }

  if (quality.score >= 85 && !repeatedTemplate) {
    return { action: "KEEP", confidence: "medium" };
  }

  if (quality.score >= 60) {
    return { action: "IMPROVE", confidence: "medium" };
  }

  return { action: "NOINDEX", confidence: "low" };
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

const args = parseArgs(process.argv.slice(2));
const allBlogs = readBlogs();
const blogs = args.limit ? allBlogs.slice(0, args.limit) : allBlogs;
const gscEvidence = loadGscEvidence(args.gsc);

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const frequencies = {
  title: new Map(),
  intro: new Map(),
  excerpt: new Map(),
  faq: new Map(),
};

const prepared = blogs.map((blog) => {
  const stats = getTextStats(blog);
  const titleHash = digest(blog?.title);
  const introHash = digest(blog?.intro);
  const excerptHash = digest(blog?.excerpt);
  const faqHash = digest(stats.faqs.map((faq) => faq.q).join(" | "));

  increment(frequencies.title, titleHash);
  increment(frequencies.intro, introHash);
  increment(frequencies.excerpt, excerptHash);
  increment(frequencies.faq, faqHash);

  return { blog, stats };
});

const actionCounts = {
  KEEP: 0,
  IMPROVE: 0,
  MERGE: 0,
  NOINDEX: 0,
  DELETE: 0,
};
const scoreBands = {
  "0-39": 0,
  "40-59": 0,
  "60-79": 0,
  "80-100": 0,
};
const samples = {
  KEEP: [],
  IMPROVE: [],
  MERGE: [],
  NOINDEX: [],
  DELETE: [],
};

const ndjsonStream = fs.createWriteStream(NDJSON_PATH, { encoding: "utf8" });
const csvStream = fs.createWriteStream(CSV_PATH, { encoding: "utf8" });

csvStream.write(
  [
    "slug",
    "title",
    "quality_score",
    "proposed_action",
    "confidence",
    "clicks",
    "impressions",
    "average_position",
    "total_words",
    "title_peers",
    "intro_peers",
    "excerpt_peers",
    "faq_template_peers",
    "reasons",
  ]
    .map(csvCell)
    .join(",") + "\n",
);

let gscCovered = 0;
let totalClicks = 0;
let totalImpressions = 0;

for (const { blog, stats } of prepared) {
  const slug = typeof blog?.slug === "string" ? blog.slug.trim() : "";
  const gsc = gscEvidence.get(slug) || {
    clicks: 0,
    impressions: 0,
    averagePosition: null,
  };

  if (gscEvidence.has(slug)) gscCovered += 1;
  totalClicks += gsc.clicks;
  totalImpressions += gsc.impressions;

  const quality = scoreBlog(blog, stats, frequencies);
  const decision = proposedAction(quality, gsc);
  actionCounts[decision.action] += 1;

  if (quality.score < 40) scoreBands["0-39"] += 1;
  else if (quality.score < 60) scoreBands["40-59"] += 1;
  else if (quality.score < 80) scoreBands["60-79"] += 1;
  else scoreBands["80-100"] += 1;

  const record = {
    slug,
    title: blog?.title || "",
    qualityScore: quality.score,
    proposedAction: decision.action,
    confidence: decision.confidence,
    requiresHumanReview: true,
    gsc,
    totalWords: stats.totalWords,
    duplicateSignals: {
      titlePeers: quality.titlePeers,
      introPeers: quality.introPeers,
      excerptPeers: quality.excerptPeers,
      faqTemplatePeers: quality.faqPeers,
    },
    reasons: quality.reasons,
  };

  ndjsonStream.write(`${JSON.stringify(record)}\n`);
  csvStream.write(
    [
      slug,
      blog?.title || "",
      quality.score,
      decision.action,
      decision.confidence,
      gsc.clicks,
      gsc.impressions,
      gsc.averagePosition == null ? "" : gsc.averagePosition.toFixed(2),
      stats.totalWords,
      quality.titlePeers,
      quality.introPeers,
      quality.excerptPeers,
      quality.faqPeers,
      quality.reasons.join("|"),
    ]
      .map(csvCell)
      .join(",") + "\n",
  );

  if (samples[decision.action].length < 25) {
    samples[decision.action].push({
      slug,
      title: blog?.title || "",
      score: quality.score,
      reasons: quality.reasons,
      gsc,
    });
  }
}

ndjsonStream.end();
csvStream.end();
await Promise.all([once(ndjsonStream, "finish"), once(csvStream, "finish")]);

const summary = {
  generatedAt: new Date().toISOString(),
  sourceInventoryCount: allBlogs.length,
  auditedCount: blogs.length,
  limitedRun: Boolean(args.limit),
  gscEvidenceFile: args.gsc,
  gscCoveredPages: gscCovered,
  gscTotalClicks: totalClicks,
  gscTotalImpressions: totalImpressions,
  actionCounts,
  scoreBands,
  samples,
  policy: {
    mode: "audit-only",
    automaticIndexabilityChanges: false,
    automaticRedirects: false,
    automaticDeletes: false,
    note:
      "Every proposed action is a review candidate. Merge/noindex/delete decisions require GSC, canonical, backlink and editorial evidence before production application.",
  },
  outputs: {
    ndjson: path.relative(ROOT, NDJSON_PATH),
    csv: path.relative(ROOT, CSV_PATH),
  },
};

fs.writeFileSync(SUMMARY_PATH, JSON.stringify(summary, null, 2));

console.log("BLOG INVENTORY CLASSIFICATION: COMPLETE");
console.log(`Audited pages: ${blogs.length}`);
console.log(`GSC-covered pages: ${gscCovered}`);
console.log(`KEEP: ${actionCounts.KEEP}`);
console.log(`IMPROVE: ${actionCounts.IMPROVE}`);
console.log(`MERGE: ${actionCounts.MERGE}`);
console.log(`NOINDEX: ${actionCounts.NOINDEX}`);
console.log(`DELETE: ${actionCounts.DELETE}`);
console.log(`Summary: ${SUMMARY_PATH}`);
console.log("No indexability, redirect, deletion, or production changes were applied.");
