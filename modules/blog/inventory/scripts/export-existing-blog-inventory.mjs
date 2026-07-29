#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const BLOG_DIR = path.join(ROOT, "data", "blogs");
const MANIFEST_PATH = path.join(BLOG_DIR, "index.json");
const SLUG_INDEX_PATH = path.join(BLOG_DIR, "slug-index.json");
const EXPECTED_TOTAL = 120097;
const EXPECTED_SHARDS = 13;
const OUT = path.resolve(
  process.argv[2] ||
    path.join(ROOT, ".reports", `blog-existing-inventory-${Date.now()}`),
);

const paths = {
  inventory: path.join(OUT, "inventory.jsonl"),
  summary: path.join(OUT, "summary.json"),
  status: path.join(OUT, "status.txt"),
  shards: path.join(OUT, "source-shards.tsv"),
  duplicateTitles: path.join(OUT, "duplicate-title-hashes.jsonl"),
  duplicateContent: path.join(OUT, "duplicate-content-hashes.jsonl"),
};

function hash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function fileHash(filePath) {
  return hash(fs.readFileSync(filePath));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function stringOrNull(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function stringArray(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())
    : [];
}

function faqArray(value) {
  return Array.isArray(value)
    ? value
        .filter(
          (item) =>
            item &&
            typeof item === "object" &&
            typeof item.q === "string" &&
            item.q.trim() &&
            typeof item.a === "string" &&
            item.a.trim(),
        )
        .map((item) => ({ q: item.q.trim(), a: item.a.trim() }))
    : [];
}

function normalize(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function addGroup(map, digest, slug) {
  const group = map.get(digest) || { count: 0, sampleSlugs: [] };
  group.count += 1;
  if (group.sampleSlugs.length < 20) group.sampleSlugs.push(slug);
  map.set(digest, group);
}

function duplicateGroups(map) {
  return [...map.entries()]
    .filter(([, group]) => group.count > 1)
    .map(([digest, group]) => ({ sha256: digest, ...group }))
    .sort((left, right) => right.count - left.count || left.sha256.localeCompare(right.sha256));
}

function writeJsonl(filePath, rows) {
  const fd = fs.openSync(filePath, "w", 0o600);
  try {
    for (const row of rows) fs.writeSync(fd, `${JSON.stringify(row)}\n`);
  } finally {
    fs.closeSync(fd);
  }
}

function fail(reason, details = {}) {
  fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });
  const text = [
    "BLOG_EXISTING_INVENTORY_EXPORT_STATUS=FAIL",
    `REASON=${reason}`,
    `REPORT=${OUT}`,
  ].join("\n");
  fs.writeFileSync(paths.status, `${text}\n`, { mode: 0o600 });
  fs.writeFileSync(
    path.join(OUT, "failure.json"),
    `${JSON.stringify({ reason, ...details }, null, 2)}\n`,
    { mode: 0o600 },
  );
  console.error(text);
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });

if (!fs.existsSync(MANIFEST_PATH)) fail("manifest_missing");
if (!fs.existsSync(SLUG_INDEX_PATH)) fail("slug_index_missing");

const manifest = readJson(MANIFEST_PATH);
const slugIndexPayload = readJson(SLUG_INDEX_PATH);
const slugIndex = slugIndexPayload?.slugs;

if (!Array.isArray(manifest?.shards)) fail("manifest_invalid");
if (manifest.total !== EXPECTED_TOTAL) {
  fail("manifest_total_mismatch", { expected: EXPECTED_TOTAL, actual: manifest.total });
}
if (manifest.shards.length !== EXPECTED_SHARDS) {
  fail("manifest_shard_count_mismatch", {
    expected: EXPECTED_SHARDS,
    actual: manifest.shards.length,
  });
}
if (!slugIndex || typeof slugIndex !== "object" || Array.isArray(slugIndex)) {
  fail("slug_index_invalid");
}

const records = [];
const slugLocations = new Map();
const duplicateSlugs = new Set();
const invalidSlugs = [];
const missingTitles = [];
const shardRows = ["shard\tstart\tend\tdeclared_count\tactual_count\tsha256"];
let expectedStart = 0;

for (const [shardOrdinal, shard] of manifest.shards.entries()) {
  if (!shard || typeof shard.file !== "string") {
    fail("manifest_shard_invalid", { shardOrdinal });
  }

  const shardPath = path.join(BLOG_DIR, shard.file);
  if (!fs.existsSync(shardPath)) fail("shard_missing", { shard: shard.file });
  if (shard.start !== expectedStart) {
    fail("shard_range_not_contiguous", {
      shard: shard.file,
      expectedStart,
      actualStart: shard.start,
    });
  }

  const items = readJson(shardPath);
  if (!Array.isArray(items)) fail("shard_not_array", { shard: shard.file });
  if (items.length !== shard.count || shard.end - shard.start !== shard.count) {
    fail("shard_count_mismatch", {
      shard: shard.file,
      declared: shard.count,
      actual: items.length,
    });
  }

  shardRows.push(
    [shard.file, shard.start, shard.end, shard.count, items.length, fileHash(shardPath)].join("\t"),
  );

  for (const [sourceShardIndex, raw] of items.entries()) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      fail("record_invalid", { shard: shard.file, sourceShardIndex });
    }

    const slug = stringOrNull(raw.slug);
    const title = stringOrNull(raw.title);

    if (!slug) invalidSlugs.push({ shard: shard.file, sourceShardIndex, reason: "missing" });
    if (!title) missingTitles.push({ shard: shard.file, sourceShardIndex, slug });
    if (!slug || !title) continue;

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      invalidSlugs.push({ shard: shard.file, sourceShardIndex, slug, reason: "format" });
    }

    if (slugLocations.has(slug)) duplicateSlugs.add(slug);
    else slugLocations.set(slug, { shard: shard.file, sourceShardIndex });

    const content = {
      title,
      excerpt: stringOrNull(raw.excerpt),
      category: stringOrNull(raw.category),
      readTime: stringOrNull(raw.readTime),
      intro: stringOrNull(raw.intro),
      summaryPoints: stringArray(raw.summaryPoints),
      practicalSteps: stringArray(raw.practicalSteps),
      mistakes: stringArray(raw.mistakes),
      faqs: faqArray(raw.faqs),
    };

    const normalizedBody = normalize(
      [
        content.title,
        content.excerpt,
        content.intro,
        ...content.summaryPoints,
        ...content.practicalSteps,
        ...content.mistakes,
        ...content.faqs.flatMap((faq) => [faq.q, faq.a]),
      ]
        .filter(Boolean)
        .join("\n"),
    );

    records.push({
      inventoryVersion: 2,
      workspaceId: "blog-workspace-sikhadenge-v1",
      sourceType: "legacy-json-shard",
      sourceShard: shard.file,
      sourceShardOrdinal: shardOrdinal,
      sourceShardIndex,
      sourceOrdinal: shard.start + sourceShardIndex,
      slug,
      canonicalPath: `/blog/${slug}`,
      canonicalUrl: `https://sikhadenge.in/blog/${slug}`,
      title: content.title,
      category: content.category,
      readTime: content.readTime,
      fieldCoverage: {
        excerpt: content.excerpt !== null,
        intro: content.intro !== null,
        summaryPointCount: content.summaryPoints.length,
        practicalStepCount: content.practicalSteps.length,
        mistakeCount: content.mistakes.length,
        faqCount: content.faqs.length,
      },
      fingerprints: {
        titleSha256: hash(normalize(content.title)),
        normalizedBodySha256: hash(normalizedBody),
        contentPayloadSha256: hash(JSON.stringify(content)),
      },
    });
  }

  expectedStart = shard.end;
}

if (expectedStart !== EXPECTED_TOTAL) {
  fail("manifest_terminal_end_mismatch", { expected: EXPECTED_TOTAL, actual: expectedStart });
}
if (records.length !== EXPECTED_TOTAL) {
  fail("record_count_mismatch", { expected: EXPECTED_TOTAL, actual: records.length });
}
if (duplicateSlugs.size) {
  fail("duplicate_slugs", { count: duplicateSlugs.size, sample: [...duplicateSlugs].slice(0, 100) });
}
if (invalidSlugs.length) fail("invalid_slugs", { count: invalidSlugs.length, sample: invalidSlugs.slice(0, 100) });
if (missingTitles.length) fail("missing_titles", { count: missingTitles.length, sample: missingTitles.slice(0, 100) });

const slugIndexEntries = Object.entries(slugIndex);
if (slugIndexEntries.length !== EXPECTED_TOTAL) {
  fail("slug_index_count_mismatch", { expected: EXPECTED_TOTAL, actual: slugIndexEntries.length });
}

const mismatch = records.find((record) => slugIndex[record.slug] !== record.sourceShard);
if (mismatch) {
  fail("slug_index_source_mismatch", {
    slug: mismatch.slug,
    expectedShard: mismatch.sourceShard,
    actualShard: slugIndex[mismatch.slug] || null,
  });
}

records.sort((left, right) => left.slug.localeCompare(right.slug, "en"));

const titleMap = new Map();
const contentMap = new Map();
const coverage = {
  withExcerpt: 0,
  withIntro: 0,
  withSummaryPoints: 0,
  withPracticalSteps: 0,
  withMistakes: 0,
  withFaqs: 0,
};

const inventoryFd = fs.openSync(paths.inventory, "w", 0o600);
const inventoryHasher = crypto.createHash("sha256");
try {
  for (const record of records) {
    const line = `${JSON.stringify(record)}\n`;
    fs.writeSync(inventoryFd, line);
    inventoryHasher.update(line);

    addGroup(titleMap, record.fingerprints.titleSha256, record.slug);
    addGroup(contentMap, record.fingerprints.contentPayloadSha256, record.slug);

    if (record.fieldCoverage.excerpt) coverage.withExcerpt += 1;
    if (record.fieldCoverage.intro) coverage.withIntro += 1;
    if (record.fieldCoverage.summaryPointCount) coverage.withSummaryPoints += 1;
    if (record.fieldCoverage.practicalStepCount) coverage.withPracticalSteps += 1;
    if (record.fieldCoverage.mistakeCount) coverage.withMistakes += 1;
    if (record.fieldCoverage.faqCount) coverage.withFaqs += 1;
  }
} finally {
  fs.closeSync(inventoryFd);
}

const titleDuplicates = duplicateGroups(titleMap);
const contentDuplicates = duplicateGroups(contentMap);
writeJsonl(paths.duplicateTitles, titleDuplicates);
writeJsonl(paths.duplicateContent, contentDuplicates);
fs.writeFileSync(paths.shards, `${shardRows.join("\n")}\n`, { mode: 0o600 });

const summary = {
  contractVersion: 2,
  source: {
    manifestTotal: manifest.total,
    shardCount: manifest.shards.length,
    manifestSha256: fileHash(MANIFEST_PATH),
    slugIndexEntryCount: slugIndexEntries.length,
    slugIndexSha256: fileHash(SLUG_INDEX_PATH),
  },
  inventory: {
    rawRecordCount: records.length,
    uniqueSlugCount: slugLocations.size,
    duplicateSlugCount: 0,
    invalidSlugCount: 0,
    missingTitleCount: 0,
    slugIndexMismatchCount: 0,
    sha256: inventoryHasher.digest("hex"),
    bytes: fs.statSync(paths.inventory).size,
  },
  coverage,
  exactDuplicateSignals: {
    titleGroups: titleDuplicates.length,
    titleRecords: titleDuplicates.reduce((sum, group) => sum + group.count, 0),
    contentGroups: contentDuplicates.length,
    contentRecords: contentDuplicates.reduce((sum, group) => sum + group.count, 0),
    contentFingerprintExcludesSlug: true,
    note: "Duplicate fingerprints are review signals. This exporter does not assert content uniqueness or index eligibility.",
  },
  safety: {
    databaseReadPerformed: false,
    databaseWritePerformed: false,
    productionFilesModified: false,
  },
};

fs.writeFileSync(paths.summary, `${JSON.stringify(summary, null, 2)}\n`, { mode: 0o600 });

const status = [
  "BLOG_EXISTING_INVENTORY_EXPORT_STATUS=PASS",
  "INVENTORY_CONTRACT_VERSION=2",
  `SOURCE_MANIFEST_TOTAL=${summary.source.manifestTotal}`,
  `SOURCE_SHARD_COUNT=${summary.source.shardCount}`,
  `RAW_RECORD_COUNT=${summary.inventory.rawRecordCount}`,
  `UNIQUE_SLUG_COUNT=${summary.inventory.uniqueSlugCount}`,
  "DUPLICATE_SLUG_COUNT=0",
  "INVALID_SLUG_COUNT=0",
  "MISSING_TITLE_COUNT=0",
  `SLUG_INDEX_ENTRY_COUNT=${summary.source.slugIndexEntryCount}`,
  "SLUG_INDEX_MATCH=YES",
  `WITH_EXCERPT=${coverage.withExcerpt}`,
  `WITH_INTRO=${coverage.withIntro}`,
  `WITH_SUMMARY_POINTS=${coverage.withSummaryPoints}`,
  `WITH_PRACTICAL_STEPS=${coverage.withPracticalSteps}`,
  `WITH_MISTAKES=${coverage.withMistakes}`,
  `WITH_FAQS=${coverage.withFaqs}`,
  `EXACT_DUPLICATE_TITLE_GROUPS=${summary.exactDuplicateSignals.titleGroups}`,
  `EXACT_DUPLICATE_CONTENT_GROUPS=${summary.exactDuplicateSignals.contentGroups}`,
  "CONTENT_FINGERPRINT_EXCLUDES_SLUG=YES",
  `INVENTORY_SHA256=${summary.inventory.sha256}`,
  `INVENTORY_BYTES=${summary.inventory.bytes}`,
  "DATABASE_READ_PERFORMED=NO",
  "DATABASE_WRITE_PERFORMED=NO",
  "PRODUCTION_FILES_MODIFIED=NO",
  `INVENTORY_JSONL=${paths.inventory}`,
  `SUMMARY=${paths.summary}`,
  `REPORT=${OUT}`,
].join("\n");

fs.writeFileSync(paths.status, `${status}\n`, { mode: 0o600 });
console.log(status);
