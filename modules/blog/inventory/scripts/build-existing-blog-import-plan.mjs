#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const BLOG_DIR = path.join(ROOT, "data", "blogs");
const SOURCE_MANIFEST = path.join(BLOG_DIR, "index.json");

const INVENTORY = path.resolve(process.argv[2] || "");
const INVENTORY_SUMMARY = path.resolve(process.argv[3] || "");
const OUT = path.resolve(
  process.argv[4] ||
    path.join(
      ROOT,
      ".reports",
      `blog-existing-import-plan-${new Date().toISOString().replace(/[:.]/g, "-")}`,
    ),
);

const EXPECTED_INVENTORY_SHA256 =
  "9dd20eadc35a8a95de6ed6c0ca297971e50ae3e249d548233c0b582568caa6ba";
const EXPECTED_INVENTORY_BYTES = 114234689;
const EXPECTED_RECORDS = 120097;
const EXPECTED_SHARDS = 13;
const WORKSPACE_ID = "blog-workspace-sikhadenge-v1";
const PLAN_CONTRACT_VERSION = 1;

const PLAN = path.join(OUT, "import-plan.jsonl");
const SUMMARY = path.join(OUT, "summary.json");
const STATUS = path.join(OUT, "status.txt");
const SAMPLE = path.join(OUT, "sample.json");

function hash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function fileHash(filePath) {
  const digest = crypto.createHash("sha256");
  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  try {
    while (true) {
      const bytes = fs.readSync(fd, buffer, 0, buffer.length, null);
      if (!bytes) break;
      digest.update(buffer.subarray(0, bytes));
    }
  } finally {
    fs.closeSync(fd);
  }
  return digest.digest("hex");
}

function normalize(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function stringOrNull(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function stringArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => item.trim());
}

function faqArray(value) {
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

function deterministicId(kind, slug) {
  return `legacy-${kind}-v1-${hash(`${kind}:${slug}`)}`;
}

function fail(reason, details = {}) {
  fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });
  const text = [
    "BLOG_EXISTING_IMPORT_PLAN_STATUS=FAIL",
    `REASON=${reason}`,
    `REPORT=${OUT}`,
  ].join("\n");
  fs.writeFileSync(STATUS, `${text}\n`, { mode: 0o600 });
  fs.writeFileSync(
    path.join(OUT, "failure.json"),
    `${JSON.stringify({ reason, ...details }, null, 2)}\n`,
    { mode: 0o600 },
  );
  console.error(text);
  process.exit(1);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function wordCount(value) {
  const normalized = normalize(value);
  return normalized ? normalized.split(" ").length : 0;
}

function readingMinutes(readTime, words) {
  const supplied = String(readTime || "").match(/\d+/)?.[0];
  if (supplied) return Math.max(1, Number.parseInt(supplied, 10));
  return Math.max(1, Math.ceil(words / 200));
}

fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });

if (!INVENTORY || !fs.existsSync(INVENTORY)) fail("inventory_missing");
if (!INVENTORY_SUMMARY || !fs.existsSync(INVENTORY_SUMMARY)) {
  fail("inventory_summary_missing");
}
if (!fs.existsSync(SOURCE_MANIFEST)) fail("source_manifest_missing");

const inventoryStat = fs.statSync(INVENTORY);
const inventorySha256 = fileHash(INVENTORY);
if (inventorySha256 !== EXPECTED_INVENTORY_SHA256) {
  fail("inventory_hash_mismatch", {
    expected: EXPECTED_INVENTORY_SHA256,
    actual: inventorySha256,
  });
}
if (inventoryStat.size !== EXPECTED_INVENTORY_BYTES) {
  fail("inventory_size_mismatch", {
    expected: EXPECTED_INVENTORY_BYTES,
    actual: inventoryStat.size,
  });
}

const inventorySummary = readJson(INVENTORY_SUMMARY);
if (
  inventorySummary.contractVersion !== 2 ||
  inventorySummary.inventory?.rawRecordCount !== EXPECTED_RECORDS ||
  inventorySummary.inventory?.uniqueSlugCount !== EXPECTED_RECORDS ||
  inventorySummary.inventory?.sha256 !== EXPECTED_INVENTORY_SHA256 ||
  inventorySummary.inventory?.bytes !== EXPECTED_INVENTORY_BYTES ||
  inventorySummary.exactDuplicateSignals?.contentFingerprintExcludesSlug !== true
) {
  fail("inventory_summary_contract_mismatch");
}

const sourceManifest = readJson(SOURCE_MANIFEST);
if (
  sourceManifest.total !== EXPECTED_RECORDS ||
  !Array.isArray(sourceManifest.shards) ||
  sourceManifest.shards.length !== EXPECTED_SHARDS
) {
  fail("source_manifest_contract_mismatch");
}

const inventoryBySlug = new Map();
let inventoryLines = 0;
let previousSlug = null;
const inventoryReader = readline.createInterface({
  input: fs.createReadStream(INVENTORY, { encoding: "utf8" }),
  crlfDelay: Infinity,
});

for await (const line of inventoryReader) {
  if (!line) continue;
  inventoryLines += 1;
  let record;
  try {
    record = JSON.parse(line);
  } catch {
    fail("inventory_jsonl_invalid", { line: inventoryLines });
  }

  if (
    record.inventoryVersion !== 2 ||
    record.workspaceId !== WORKSPACE_ID ||
    typeof record.slug !== "string" ||
    !record.slug ||
    typeof record.sourceShard !== "string" ||
    !Number.isInteger(record.sourceShardIndex) ||
    typeof record.title !== "string" ||
    !record.title ||
    typeof record.fingerprints?.titleSha256 !== "string" ||
    typeof record.fingerprints?.normalizedBodySha256 !== "string" ||
    typeof record.fingerprints?.contentPayloadSha256 !== "string"
  ) {
    fail("inventory_record_contract_mismatch", {
      line: inventoryLines,
      slug: record?.slug || null,
    });
  }

  if (previousSlug !== null && previousSlug.localeCompare(record.slug, "en") >= 0) {
    fail("inventory_slug_order_invalid", { previousSlug, currentSlug: record.slug });
  }
  previousSlug = record.slug;

  if (inventoryBySlug.has(record.slug)) {
    fail("inventory_duplicate_slug", { slug: record.slug });
  }
  inventoryBySlug.set(record.slug, record);
}

if (inventoryLines !== EXPECTED_RECORDS || inventoryBySlug.size !== EXPECTED_RECORDS) {
  fail("inventory_record_count_mismatch", {
    expected: EXPECTED_RECORDS,
    lines: inventoryLines,
    unique: inventoryBySlug.size,
  });
}

const pageIds = new Set();
const versionIds = new Set();
const fingerprintIds = new Set();
const seenSourceRecords = new Set();
const planHasher = crypto.createHash("sha256");
const planFd = fs.openSync(PLAN, "w", 0o600);
const samples = [];
let plannedPages = 0;
let plannedVersions = 0;
let plannedFingerprints = 0;
let sourceFaqs = 0;
let sourceStructuredSections = 0;
let expectedStart = 0;

try {
  for (const [sourceShardOrdinal, shard] of sourceManifest.shards.entries()) {
    if (
      !shard ||
      typeof shard.file !== "string" ||
      shard.start !== expectedStart ||
      shard.end - shard.start !== shard.count
    ) {
      fail("source_shard_manifest_invalid", { sourceShardOrdinal, shard });
    }

    const shardPath = path.join(BLOG_DIR, shard.file);
    if (!fs.existsSync(shardPath)) fail("source_shard_missing", { shard: shard.file });
    const sourceItems = readJson(shardPath);
    if (!Array.isArray(sourceItems) || sourceItems.length !== shard.count) {
      fail("source_shard_count_mismatch", {
        shard: shard.file,
        declared: shard.count,
        actual: Array.isArray(sourceItems) ? sourceItems.length : null,
      });
    }

    for (const [sourceShardIndex, raw] of sourceItems.entries()) {
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
        fail("source_record_invalid", { shard: shard.file, sourceShardIndex });
      }

      const slug = stringOrNull(raw.slug);
      const title = stringOrNull(raw.title);
      const excerpt = stringOrNull(raw.excerpt);
      const intro = stringOrNull(raw.intro);
      const category = stringOrNull(raw.category);
      const readTime = stringOrNull(raw.readTime);
      const summaryPoints = stringArray(raw.summaryPoints);
      const practicalSteps = stringArray(raw.practicalSteps);
      const mistakes = stringArray(raw.mistakes);
      const faqs = faqArray(raw.faqs);

      if (!slug || !title || !excerpt || !intro) {
        fail("required_legacy_content_missing", {
          shard: shard.file,
          sourceShardIndex,
          slug,
          titlePresent: Boolean(title),
          excerptPresent: Boolean(excerpt),
          introPresent: Boolean(intro),
        });
      }

      const inventoryRecord = inventoryBySlug.get(slug);
      if (!inventoryRecord) fail("source_slug_missing_from_inventory", { slug });
      if (
        inventoryRecord.sourceShard !== shard.file ||
        inventoryRecord.sourceShardIndex !== sourceShardIndex ||
        inventoryRecord.title !== title
      ) {
        fail("source_inventory_provenance_mismatch", {
          slug,
          shard: shard.file,
          sourceShardIndex,
        });
      }

      const content = {
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
      const normalizedBody = normalize(
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
      const titleSha256 = hash(normalize(title));
      const normalizedBodySha256 = hash(normalizedBody);
      const contentPayloadSha256 = hash(JSON.stringify(content));

      if (
        inventoryRecord.fingerprints.titleSha256 !== titleSha256 ||
        inventoryRecord.fingerprints.normalizedBodySha256 !== normalizedBodySha256 ||
        inventoryRecord.fingerprints.contentPayloadSha256 !== contentPayloadSha256
      ) {
        fail("source_inventory_fingerprint_mismatch", { slug });
      }

      const pageId = deterministicId("page", slug);
      const versionId = deterministicId("version", slug);
      const fingerprintId = deterministicId("fingerprint", slug);
      if (pageIds.has(pageId) || versionIds.has(versionId) || fingerprintIds.has(fingerprintId)) {
        fail("deterministic_id_collision", { slug });
      }
      pageIds.add(pageId);
      versionIds.add(versionId);
      fingerprintIds.add(fingerprintId);

      const sourceRecordKey = `legacy-json-shard:${shard.file}:${sourceShardIndex}`;
      if (seenSourceRecords.has(sourceRecordKey)) {
        fail("source_record_key_collision", { sourceRecordKey });
      }
      seenSourceRecords.add(sourceRecordKey);

      const combinedText = [
        title,
        excerpt,
        intro,
        ...summaryPoints,
        ...practicalSteps,
        ...mistakes,
        ...faqs.flatMap((faq) => [faq.q, faq.a]),
      ].join("\n");
      const words = wordCount(combinedText);
      const tokens = normalizedBody ? normalizedBody.split(" ").length : 0;

      const planRecord = {
        importPlanVersion: PLAN_CONTRACT_VERSION,
        source: {
          inventorySha256,
          sourceShard: shard.file,
          sourceShardOrdinal,
          sourceShardIndex,
          sourceOrdinal: shard.start + sourceShardIndex,
          sourceRecordKey,
        },
        page: {
          id: pageId,
          workspaceId: WORKSPACE_ID,
          slug,
          canonicalPath: `/blog/${slug}`,
          title,
          primaryKeyword: null,
          secondaryKeywords: [],
          uniqueAngle: "UNVERIFIED_LEGACY_IMPORT",
          userProblem: "UNVERIFIED_LEGACY_IMPORT",
          expectedOutcome: "UNVERIFIED_LEGACY_IMPORT",
          lifecycleStatus: "DISCOVERED",
          indexEligibility: "BLOCKED",
          audienceId: null,
          intentId: null,
          locale: "en-IN",
          priority: 0,
          sourceRecordKey,
          metadata: {
            importPlanVersion: PLAN_CONTRACT_VERSION,
            inventoryContractVersion: 2,
            inventorySha256,
            legacyCategory: category,
            legacyReadTime: readTime,
            sourceShard: shard.file,
            sourceShardIndex,
            sourceOrdinal: shard.start + sourceShardIndex,
            requiresResearch: true,
            requiresQualityGate: true,
            requiresEditorialApproval: true,
            publicationBlocked: true,
          },
        },
        version: {
          id: versionId,
          pageId,
          versionNumber: 1,
          status: "WRITING",
          origin: "MIGRATED",
          title,
          metaTitle: title,
          metaDescription: excerpt,
          h1: title,
          directAnswer: intro,
          introduction: intro,
          conclusion: null,
          authorName: "Legacy source attribution pending",
          reviewerName: null,
          language: "en-IN",
          wordCount: words,
          readingMinutes: readingMinutes(readTime, words),
          sourceCoverage: 0,
          originalityScore: 0,
          qualityScore: 0,
          exactHash: contentPayloadSha256,
          normalizedHash: normalizedBodySha256,
          minHash: null,
          simHash: null,
          semanticFingerprint: null,
          generatedBy: null,
          generationPromptHash: null,
          notes:
            "Legacy baseline only. This version is unverified, unapproved, unpublished, and not index eligible.",
          createdBy: "existing-blog-inventory-v2",
        },
        fingerprint: {
          id: fingerprintId,
          versionId,
          scope: "legacy-source-record",
          scopeKey: slug,
          exactHash: contentPayloadSha256,
          normalizedHash: normalizedBodySha256,
          minHash: null,
          simHash: null,
          tokenCount: tokens,
          shingles: Math.max(0, tokens - 4),
          metadata: {
            titleSha256,
            inventorySha256,
            contentFingerprintExcludesSlug: true,
          },
        },
        deferred: {
          sectionRows: summaryPoints.length + practicalSteps.length + mistakes.length + 2,
          faqRows: faqs.length,
          publicationRows: 0,
          qualityRunRows: 0,
          editorialReviewRows: 0,
          reason:
            "Structured sections, FAQs, evidence, quality runs, reviews, and publications require separate validated phases.",
        },
      };

      const line = `${JSON.stringify(planRecord)}\n`;
      fs.writeSync(planFd, line);
      planHasher.update(line);
      plannedPages += 1;
      plannedVersions += 1;
      plannedFingerprints += 1;
      sourceFaqs += faqs.length;
      sourceStructuredSections += summaryPoints.length + practicalSteps.length + mistakes.length + 2;
      if (samples.length < 3) samples.push(planRecord);
    }

    expectedStart = shard.end;
  }
} finally {
  fs.closeSync(planFd);
}

if (
  expectedStart !== EXPECTED_RECORDS ||
  plannedPages !== EXPECTED_RECORDS ||
  plannedVersions !== EXPECTED_RECORDS ||
  plannedFingerprints !== EXPECTED_RECORDS ||
  seenSourceRecords.size !== EXPECTED_RECORDS
) {
  fail("planned_count_mismatch", {
    expectedStart,
    plannedPages,
    plannedVersions,
    plannedFingerprints,
    sourceRecordKeys: seenSourceRecords.size,
  });
}

const planSha256 = planHasher.digest("hex");
const planBytes = fs.statSync(PLAN).size;
const summary = {
  importPlanVersion: PLAN_CONTRACT_VERSION,
  source: {
    inventoryContractVersion: 2,
    inventorySha256,
    inventoryBytes: inventoryStat.size,
    sourceRecordCount: EXPECTED_RECORDS,
    sourceShardCount: EXPECTED_SHARDS,
  },
  plannedRows: {
    pages: plannedPages,
    pageVersions: plannedVersions,
    contentFingerprints: plannedFingerprints,
    total: plannedPages + plannedVersions + plannedFingerprints,
    topics: 0,
    audiences: 0,
    searchIntents: 0,
    sources: 0,
    claims: 0,
    sections: 0,
    faqs: 0,
    qualityRuns: 0,
    editorialReviews: 0,
    publications: 0,
  },
  sourceStructureDeferred: {
    potentialSectionRows: sourceStructuredSections,
    potentialFaqRows: sourceFaqs,
  },
  safetyDefaults: {
    lifecycleStatus: "DISCOVERED",
    versionStatus: "WRITING",
    indexEligibility: "BLOCKED",
    publicationRows: 0,
    sourceCoverage: 0,
    originalityScore: 0,
    qualityScore: 0,
    requiresResearch: true,
    requiresQualityGate: true,
    requiresEditorialApproval: true,
    bulkImportApproved: false,
  },
  deterministicIdentity: {
    algorithm: "sha256",
    pageIdPrefix: "legacy-page-v1-",
    versionIdPrefix: "legacy-version-v1-",
    fingerprintIdPrefix: "legacy-fingerprint-v1-",
    collisions: 0,
  },
  planArtifact: {
    sha256: planSha256,
    bytes: planBytes,
    records: plannedPages,
  },
  safety: {
    databaseReadPerformed: false,
    databaseWritePerformed: false,
    productionFilesModified: false,
  },
};

fs.writeFileSync(SUMMARY, `${JSON.stringify(summary, null, 2)}\n`, { mode: 0o600 });
fs.writeFileSync(SAMPLE, `${JSON.stringify(samples, null, 2)}\n`, { mode: 0o600 });

const status = [
  "BLOG_EXISTING_IMPORT_PLAN_STATUS=PASS",
  `IMPORT_PLAN_VERSION=${PLAN_CONTRACT_VERSION}`,
  "SOURCE_INVENTORY_ATTESTED=YES",
  `SOURCE_INVENTORY_SHA256=${inventorySha256}`,
  `SOURCE_RECORD_COUNT=${EXPECTED_RECORDS}`,
  `SOURCE_SHARD_COUNT=${EXPECTED_SHARDS}`,
  `PLANNED_PAGES=${plannedPages}`,
  `PLANNED_PAGE_VERSIONS=${plannedVersions}`,
  `PLANNED_CONTENT_FINGERPRINTS=${plannedFingerprints}`,
  `PLANNED_TOTAL_ROWS=${plannedPages + plannedVersions + plannedFingerprints}`,
  "PLANNED_PUBLICATIONS=0",
  "PLANNED_QUALITY_RUNS=0",
  "DEFAULT_LIFECYCLE_STATUS=DISCOVERED",
  "DEFAULT_VERSION_STATUS=WRITING",
  "DEFAULT_INDEX_ELIGIBILITY=BLOCKED",
  "DEFAULT_SOURCE_COVERAGE=0",
  "DEFAULT_ORIGINALITY_SCORE=0",
  "DEFAULT_QUALITY_SCORE=0",
  "DETERMINISTIC_ID_COLLISIONS=0",
  "REQUIRES_RESEARCH=YES",
  "REQUIRES_QUALITY_GATE=YES",
  "REQUIRES_EDITORIAL_APPROVAL=YES",
  "BULK_IMPORT_APPROVED=NO",
  `PLAN_SHA256=${planSha256}`,
  `PLAN_BYTES=${planBytes}`,
  "DATABASE_READ_PERFORMED=NO",
  "DATABASE_WRITE_PERFORMED=NO",
  "PRODUCTION_FILES_MODIFIED=NO",
  `PLAN_JSONL=${PLAN}`,
  `SUMMARY=${SUMMARY}`,
  `REPORT=${OUT}`,
].join("\n");

fs.writeFileSync(STATUS, `${status}\n`, { mode: 0o600 });
console.log(status);
