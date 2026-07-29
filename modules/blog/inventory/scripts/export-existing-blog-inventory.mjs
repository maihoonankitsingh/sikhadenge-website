#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const BLOG_DIR = path.join(ROOT, "data", "blogs");
const MANIFEST_PATH = path.join(BLOG_DIR, "index.json");
const SLUG_INDEX_PATH = path.join(BLOG_DIR, "slug-index.json");
const EXPECTED_TOTAL = 120097;
const EXPECTED_SHARDS = 13;
const BASE_URL = "https://sikhadenge.in/blog";
const OUT = path.resolve(
  process.argv[2] ||
    path.join(ROOT, ".reports", `blog-existing-inventory-${new Date().toISOString().replace(/[:.]/g, "-")}`),
);

const INVENTORY_PATH = path.join(OUT, "inventory.jsonl");
const SUMMARY_PATH = path.join(OUT, "summary.json");
const STATUS_PATH = path.join(OUT, "status.txt");
const SHARDS_PATH = path.join(OUT, "source-shards.tsv");
const DUPLICATE_TITLES_PATH = path.join(OUT, "duplicate-title-hashes.jsonl");
const DUPLICATE_PAYLOADS_PATH = path.join(OUT, "duplicate-payload-hashes.jsonl");

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function fileSha256(filePath) {
  const hash = crypto.createHash("sha256");
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  const fd = fs.openSync(filePath, "r");
  try {
    let bytesRead = 0;
    do {
      bytesRead = fs.readSync(fd, buffer, 0, buffer.length, null);
      if (bytesRead > 0) hash.update(buffer.subarray(0, bytesRead));
    } while (bytesRead > 0);
  } finally {
    fs.closeSync(fd);
  }
  return hash.digest("hex");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function cleanString(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function cleanStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => item.trim());
}

function cleanFaqs(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.q === "string" &&
        item.q.trim() &&
        typeof item.a === "string" &&
        item.a.trim(),
    )
    .map((item) => ({ q: item.q.trim(), a: item.a.trim() }));
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function incrementHashGroup(map, hash, slug) {
  const current = map.get(hash);
  if (current) {
    current.count += 1;
    if (current.sampleSlugs.length < 20) current.sampleSlugs.push(slug);
    return;
  }
  map.set(hash, { count: 1, sampleSlugs: [slug] });
}

function writeHashGroups(filePath, groups) {
  const fd = fs.openSync(filePath, "w", 0o600);
  try {
    for (const group of groups) {
      fs.writeSync(fd, `${JSON.stringify(group)}\n`);
    }
  } finally {
    fs.closeSync(fd);
  }
}

function fail(reason, details = {}) {
  fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });
  const status = [
    "BLOG_EXISTING_INVENTORY_EXPORT_STATUS=FAIL",
    `REASON=${reason}`,
    `REPORT=${OUT}`,
  ].join("\n");
  fs.writeFileSync(STATUS_PATH, `${status}\n`, { mode: 0o600 });
  fs.writeFileSync(
    path.join(OUT, "failure.json"),
    `${JSON.stringify({ reason, ...details }, null, 2)}\n`,
    { mode: 0o600 },
  );
  console.error(status);
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });

if (!fs.existsSync(MANIFEST_PATH)) fail("manifest_missing");
if (!fs.existsSync(SLUG_INDEX_PATH)) fail("slug_index_missing");

const manifest = readJson(MANIFEST_PATH);
const slugIndexPayload = readJson(SLUG_INDEX_PATH);

if (!manifest || !Array.isArray(manifest.shards)) fail("manifest_shards_invalid");
if (manifest.total !== EXPECTED_TOTAL) {
  fail("manifest_total_mismatch", { expected: EXPECTED_TOTAL, actual: manifest.total });
}
if (manifest.shards.length !== EXPECTED_SHARDS) {
  fail("manifest_shard_count_mismatch", {
    expected: EXPECTED_SHARDS,
    actual: manifest.shards.length,
  });
}
if (!slugIndexPayload || typeof slugIndexPayload.slugs !== "object" || slugIndexPayload.slugs === null) {
  fail("slug_index_payload_invalid");
}

const slugIndex = slugIndexPayload.slugs;
const sourceRecords = [];
const duplicateSlugs = new Set();
const seenSlugs = new Map();
const invalidSlugs = [];
const missingTitles = [];
const shardRows = ["shard\tstart\tend\tdeclared_count\tactual_count\tsha256"];
let expectedStart = 0;

for (const [shardOrdinal, shard] of manifest.shards.entries()) {
  if (!shard || typeof shard.file !== "string" || !shard.file) {
    fail("manifest_shard_entry_invalid", { shardOrdinal });
  }

  const shardPath = path.join(BLOG_DIR, shard.file);
  if (!fs.existsSync(shardPath)) fail("shard_missing", { shard: shard.file });

  if (shard.start !== expectedStart) {
    fail("shard_start_not_contiguous", {
      shard: shard.file,
      expectedStart,
      actualStart: shard.start,
    });
  }

  const items = readJson(shardPath);
  if (!Array.isArray(items)) fail("shard_payload_not_array", { shard: shard.file });
  if (items.length !== shard.count || shard.end - shard.start !== shard.count) {
    fail("shard_count_mismatch", {
      shard: shard.file,
      declaredCount: shard.count,
      actualCount: items.length,
      start: shard.start,
      end: shard.end,
    });
  }

  shardRows.push(
    [shard.file, shard.start, shard.end, shard.count, items.length, fileSha256(shardPath)].join("\t"),
  );

  for (const [shardIndex, raw] of items.entries()) {
    const sourceOrdinal = shard.start + shardIndex;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      fail("blog_record_invalid", { shard: shard.file, shardIndex, sourceOrdinal });
    }

    const slug = cleanString(raw.slug);
    const title = cleanString(raw.title);

    if (!slug) invalidSlugs.push({ shard: shard.file, shardIndex, reason: "missing_slug" });
    if (!title) missingTitles.push({ shard: shard.file, shardIndex, slug });
    if (!slug || !title) continue;

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      invalidSlugs.push({ shard: shard.file, shardIndex, slug, reason: "invalid_slug_format" });
    }

    const firstLocation = seenSlugs.get(slug);
    if (firstLocation) duplicateSlugs.add(slug);
    else seenSlugs.set(slug, { shard: shard.file, shardIndex, sourceOrdinal });

    const excerpt = cleanString(raw.excerpt);
    const category = cleanString(raw.category);
    const readTime = cleanString(raw.readTime);
    const intro = cleanString(raw.intro);
    const summaryPoints = cleanStringArray(raw.summaryPoints);
    const practicalSteps = cleanStringArray(raw.practicalSteps);
    const mistakes = cleanStringArray(raw.mistakes);
    const faqs = cleanFaqs(raw.faqs);

    const canonicalPayload = {
      slug,
      title,
      excerpt,
      category,
      readTime,
      intro,
      summaryPoints,
      practicalSteps,
      mistakes,
      faqs,
    };

    const normalizedBody = normalizeText(
      [
        title,
        excerpt,
        intro,
        ...summaryPoints,
        ...practicalSteps,
        ...mistakes,
        ...faqs.flatMap((faq) => [faq.q, faq.a]),
      ]
        .filter(Boolean)
        .join("\n"),
    );

    sourceRecords.push({
      inventoryVersion: 1,
      workspaceId: "blog-workspace-sikhadenge-v1",
      sourceType: "legacy-json-shard",
      sourceShard: shard.file,
      sourceShardOrdinal: shardOrdinal,
      sourceShardIndex: shardIndex,
      sourceOrdinal,
      slug,
      canonicalPath: `/blog/${slug}`,
      canonicalUrl: `${BASE_URL}/${slug}`,
      title,
      category,
      readTime,
      fieldCoverage: {
        excerpt: excerpt !== null,
        intro: intro !== null,
        summaryPointCount: summaryPoints.length,
        practicalStepCount: practicalSteps.length,
        mistakeCount: mistakes.length,
        faqCount: faqs.length,
      },
      fingerprints: {
        titleSha256: sha256(normalizeText(title)),
        normalizedBodySha256: sha256(normalizedBody),
        sourcePayloadSha256: sha256(JSON.stringify(canonicalPayload)),
      },
    });
  }

  expectedStart = shard.end;
}

if (expectedStart !== EXPECTED_TOTAL) {
  fail("manifest_terminal_end_mismatch", { expected: EXPECTED_TOTAL, actual: expectedStart });
}
if (sourceRecords.length !== EXPECTED_TOTAL) {
  fail("raw_record_count_mismatch", { expected: EXPECTED_TOTAL, actual: sourceRecords.length });
}
if (duplicateSlugs.size > 0) {
  fail("duplicate_slugs_detected", {
    duplicateSlugCount: duplicateSlugs.size,
    sample: [...duplicateSlugs].sort().slice(0, 100),
  });
}
if (invalidSlugs.length > 0) {
  fail("invalid_slugs_detected", { invalidSlugCount: invalidSlugs.length, sample: invalidSlugs.slice(0, 100) });
}
if (missingTitles.length > 0) {
  fail("missing_titles_detected", {
    missingTitleCount: missingTitles.length,
    sample: missingTitles.slice(0, 100),
  });
}

const slugIndexEntries = Object.entries(slugIndex);
if (slugIndexEntries.length !== EXPECTED_TOTAL) {
  fail("slug_index_count_mismatch", { expected: EXPECTED_TOTAL, actual: slugIndexEntries.length });
}

const slugIndexMismatches = [];
for (const record of sourceRecords) {
  if (slugIndex[record.slug] !== record.sourceShard) {
    slugIndexMismatches.push({
      slug: record.slug,
      expectedShard: record.sourceShard,
      indexedShard: slugIndex[record.slug] || null,
    });
    if (slugIndexMismatches.length >= 100) break;
  }
}
if (slugIndexMismatches.length > 0) {
  fail("slug_index_source_mismatch", { sample: slugIndexMismatches });
}

sourceRecords.sort((left, right) => left.slug.localeCompare(right.slug, "en"));

const titleGroups = new Map();
const payloadGroups = new Map();
const coverage = {
  withExcerpt: 0,
  withIntro: 0,
  withSummaryPoints: 0,
  withPracticalSteps: 0,
  withMistakes: 0,
  withFaqs: 0,
};

const inventoryHash = crypto.createHash("sha256");
const inventoryFd = fs.openSync(INVENTORY_PATH, "w", 0o600);
try {
  for (const record of sourceRecords) {
    const line = `${JSON.stringify(record)}\n`;
    fs.writeSync(inventoryFd, line);
    inventoryHash.update(line);

    incrementHashGroup(titleGroups, record.fingerprints.titleSha256, record.slug);
    incrementHashGroup(payloadGroups, record.fingerprints.sourcePayloadSha256, record.slug);

    if (record.fieldCoverage.excerpt) coverage.withExcerpt += 1;
    if (record.fieldCoverage.intro) coverage.withIntro += 1;
    if (record.fieldCoverage.summaryPointCount > 0) coverage.withSummaryPoints += 1;
    if (record.fieldCoverage.practicalStepCount > 0) coverage.withPracticalSteps += 1;
    if (record.fieldCoverage.mistakeCount > 0) coverage.withMistakes += 1;
    if (record.fieldCoverage.faqCount > 0) coverage.withFaqs += 1;
  }
} finally {
  fs.closeSync(inventoryFd);
}

const duplicateTitleGroups = [...titleGroups.entries()]
  .filter(([, group]) => group.count > 1)
  .map(([hash, group]) => ({ hash, ...group }))
  .sort((left, right) => right.count - left.count || left.hash.localeCompare(right.hash));

const duplicatePayloadGroups = [...payloadGroups.entries()]
  .filter(([, group]) => group.count > 1)
  .map(([hash, group]) => ({ hash, ...group }))
  .sort((left, right) => right.count - left.count || left.hash.localeCompare(right.hash));

writeHashGroups(DUPLICATE_TITLES_PATH, duplicateTitleGroups);
writeHashGroups(DUPLICATE_PAYLOADS_PATH, duplicatePayloadGroups);
fs.writeFileSync(SHARDS_PATH, `${shardRows.join("\n")}\n`, { mode: 0o600 });

const summary = {
  contractVersion: 1,
  source: {
    manifestPath: path.relative(ROOT, MANIFEST_PATH),
    manifestSha256: fileSha256(MANIFEST_PATH),
    slugIndexPath: path.relative(ROOT, SLUG_INDEX_PATH),
    slugIndexSha256: fileSha256(SLUG_INDEX_PATH),
    manifestTotal: manifest.total,
    shardCount: manifest.shards.length,
  },
  inventory: {
    rawRecordCount: sourceRecords.length,
    uniqueSlugCount: seenSlugs.size,
    duplicateSlugCount: duplicateSlugs.size,
    invalidSlugCount: invalidSlugs.length,
    missingTitleCount: missingTitles.length,
    slugIndexEntryCount: slugIndexEntries.length,
    slugIndexMismatchCount: 0,
    inventorySha256: inventoryHash.digest("hex"),
    inventoryBytes: fs.statSync(INVENTORY_PATH).size,
  },
  coverage,
  exactDuplicateSignals: {
    titleGroups: duplicateTitleGroups.length,
    titleRecords: duplicateTitleGroups.reduce((total, group) => total + group.count, 0),
    sourcePayloadGroups: duplicatePayloadGroups.length,
    sourcePayloadRecords: duplicatePayloadGroups.reduce((total, group) => total + group.count, 0),
    note: "Duplicate fingerprints are review signals; this export does not assert content uniqueness or index eligibility.",
  },
  safety: {
    databaseReadPerformed: false,
    databaseWritePerformed: false,
    productionFilesModified: false,
  },
};

fs.writeFileSync(SUMMARY_PATH, `${JSON.stringify(summary, null, 2)}\n`, { mode: 0o600 });

const status = [
  "BLOG_EXISTING_INVENTORY_EXPORT_STATUS=PASS",
  `SOURCE_MANIFEST_TOTAL=${summary.source.manifestTotal}`,
  `SOURCE_SHARD_COUNT=${summary.source.shardCount}`,
  `RAW_RECORD_COUNT=${summary.inventory.rawRecordCount}`,
  `UNIQUE_SLUG_COUNT=${summary.inventory.uniqueSlugCount}`,
  `DUPLICATE_SLUG_COUNT=${summary.inventory.duplicateSlugCount}`,
  `INVALID_SLUG_COUNT=${summary.inventory.invalidSlugCount}`,
  `MISSING_TITLE_COUNT=${summary.inventory.missingTitleCount}`,
  `SLUG_INDEX_ENTRY_COUNT=${summary.inventory.slugIndexEntryCount}`,
  "SLUG_INDEX_MATCH=YES",
  `WITH_EXCERPT=${coverage.withExcerpt}`,
  `WITH_INTRO=${coverage.withIntro}`,
  `WITH_SUMMARY_POINTS=${coverage.withSummaryPoints}`,
  `WITH_PRACTICAL_STEPS=${coverage.withPracticalSteps}`,
  `WITH_MISTAKES=${coverage.withMistakes}`,
  `WITH_FAQS=${coverage.withFaqs}`,
  `EXACT_DUPLICATE_TITLE_GROUPS=${summary.exactDuplicateSignals.titleGroups}`,
  `EXACT_DUPLICATE_PAYLOAD_GROUPS=${summary.exactDuplicateSignals.sourcePayloadGroups}`,
  `INVENTORY_SHA256=${summary.inventory.inventorySha256}`,
  `INVENTORY_BYTES=${summary.inventory.inventoryBytes}`,
  "DATABASE_READ_PERFORMED=NO",
  "DATABASE_WRITE_PERFORMED=NO",
  "PRODUCTION_FILES_MODIFIED=NO",
  `INVENTORY_JSONL=${INVENTORY_PATH}`,
  `SUMMARY=${SUMMARY_PATH}`,
  `REPORT=${OUT}`,
].join("\n");

fs.writeFileSync(STATUS_PATH, `${status}\n`, { mode: 0o600 });
console.log(status);
