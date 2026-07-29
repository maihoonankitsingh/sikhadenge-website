#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RELEASE_PATH = path.join(
  ROOT,
  "modules/blog/inventory/releases/0001-existing-blog-inventory-v2.release.json",
);

const inventoryPath = process.argv[2] ? path.resolve(process.argv[2]) : "";
const summaryPath = process.argv[3] ? path.resolve(process.argv[3]) : "";
const out = path.resolve(
  process.argv[4] ||
    path.join(
      ROOT,
      ".reports",
      `blog-existing-inventory-attestation-${new Date().toISOString().replace(/[:.]/g, "-")}`,
    ),
);
const statusPath = path.join(out, "status.txt");

function writeStatus(lines) {
  fs.mkdirSync(out, { recursive: true, mode: 0o700 });
  fs.writeFileSync(statusPath, `${lines.join("\n")}\n`, { mode: 0o600 });
}

function fail(reason, details = {}) {
  const lines = [
    "BLOG_EXISTING_INVENTORY_ATTESTATION_STATUS=FAIL",
    `REASON=${reason}`,
    `REPORT=${out}`,
  ];
  writeStatus(lines);
  fs.writeFileSync(
    path.join(out, "failure.json"),
    `${JSON.stringify({ reason, ...details }, null, 2)}\n`,
    { mode: 0o600 },
  );
  console.error(lines.join("\n"));
  process.exit(1);
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${label}_invalid_json`, {
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

function requireEqual(actual, expected, reason) {
  if (actual !== expected) fail(reason, { expected, actual });
}

function isSha256(value) {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

async function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  const stream = fs.createReadStream(filePath);
  for await (const chunk of stream) hash.update(chunk);
  return hash.digest("hex");
}

if (!inventoryPath) fail("inventory_path_missing");
if (!summaryPath) fail("summary_path_missing");
if (!fs.existsSync(RELEASE_PATH)) fail("release_manifest_missing");
if (!fs.existsSync(inventoryPath)) fail("inventory_artifact_missing");
if (!fs.existsSync(summaryPath)) fail("summary_artifact_missing");

fs.mkdirSync(out, { recursive: true, mode: 0o700 });

const release = readJson(RELEASE_PATH, "release_manifest");
const summary = readJson(summaryPath, "summary");

requireEqual(release.releaseId, "existing-blog-inventory-v2", "release_id_mismatch");
requireEqual(release.status, "exported-read-only", "release_status_mismatch");
requireEqual(release.contractVersion, 2, "release_contract_version_mismatch");
requireEqual(release.workspaceId, "blog-workspace-sikhadenge-v1", "release_workspace_mismatch");
requireEqual(release.safety?.bulkImportApproved, false, "bulk_import_must_remain_unapproved");

const actualBytes = fs.statSync(inventoryPath).size;
const actualSha256 = await sha256File(inventoryPath);
requireEqual(actualBytes, release.artifact.bytes, "inventory_size_mismatch");
requireEqual(actualSha256, release.artifact.sha256, "inventory_hash_mismatch");

requireEqual(summary.contractVersion, release.contractVersion, "summary_contract_version_mismatch");
requireEqual(summary.source?.manifestTotal, release.source.manifestTotal, "summary_manifest_total_mismatch");
requireEqual(summary.source?.shardCount, release.source.shardCount, "summary_shard_count_mismatch");
requireEqual(
  summary.source?.slugIndexEntryCount,
  release.source.slugIndexEntryCount,
  "summary_slug_index_count_mismatch",
);
requireEqual(summary.inventory?.rawRecordCount, release.artifact.recordCount, "summary_record_count_mismatch");
requireEqual(
  summary.inventory?.uniqueSlugCount,
  release.artifact.uniqueSlugCount,
  "summary_unique_slug_count_mismatch",
);
requireEqual(summary.inventory?.duplicateSlugCount, 0, "summary_duplicate_slug_count_mismatch");
requireEqual(summary.inventory?.invalidSlugCount, 0, "summary_invalid_slug_count_mismatch");
requireEqual(summary.inventory?.missingTitleCount, 0, "summary_missing_title_count_mismatch");
requireEqual(summary.inventory?.slugIndexMismatchCount, 0, "summary_slug_index_mismatch");
requireEqual(summary.inventory?.sha256, release.artifact.sha256, "summary_inventory_hash_mismatch");
requireEqual(summary.inventory?.bytes, release.artifact.bytes, "summary_inventory_size_mismatch");

for (const [key, expected] of Object.entries(release.coverage)) {
  requireEqual(summary.coverage?.[key], expected, `summary_coverage_${key}_mismatch`);
}

requireEqual(
  summary.exactDuplicateSignals?.titleGroups,
  release.exactDuplicateSignals.titleGroups,
  "summary_duplicate_title_groups_mismatch",
);
requireEqual(
  summary.exactDuplicateSignals?.contentGroups,
  release.exactDuplicateSignals.contentGroups,
  "summary_duplicate_content_groups_mismatch",
);
requireEqual(
  summary.exactDuplicateSignals?.contentFingerprintExcludesSlug,
  true,
  "summary_content_fingerprint_contract_mismatch",
);
requireEqual(summary.safety?.databaseReadPerformed, false, "summary_database_read_flag_mismatch");
requireEqual(summary.safety?.databaseWritePerformed, false, "summary_database_write_flag_mismatch");
requireEqual(summary.safety?.productionFilesModified, false, "summary_production_write_flag_mismatch");

const slugSet = new Set();
const collator = new Intl.Collator("en");
let previousSlug = null;
let recordCount = 0;
let firstSlug = null;
let lastSlug = null;

const input = fs.createReadStream(inventoryPath, { encoding: "utf8" });
const lines = readline.createInterface({ input, crlfDelay: Infinity });

for await (const line of lines) {
  if (!line) fail("blank_inventory_line", { lineNumber: recordCount + 1 });

  let record;
  try {
    record = JSON.parse(line);
  } catch (error) {
    fail("inventory_line_invalid_json", {
      lineNumber: recordCount + 1,
      message: error instanceof Error ? error.message : String(error),
    });
  }

  recordCount += 1;
  requireEqual(record.inventoryVersion, 2, "record_contract_version_mismatch");
  requireEqual(record.workspaceId, release.workspaceId, "record_workspace_mismatch");
  requireEqual(record.sourceType, "legacy-json-shard", "record_source_type_mismatch");

  const slug = record.slug;
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail("record_slug_invalid", { lineNumber: recordCount, slug });
  }
  if (slugSet.has(slug)) fail("record_duplicate_slug", { lineNumber: recordCount, slug });
  if (previousSlug !== null && collator.compare(previousSlug, slug) >= 0) {
    fail("inventory_slug_order_invalid", {
      lineNumber: recordCount,
      previousSlug,
      slug,
    });
  }

  requireEqual(record.canonicalPath, `/blog/${slug}`, "record_canonical_path_mismatch");
  requireEqual(
    record.canonicalUrl,
    `https://sikhadenge.in/blog/${slug}`,
    "record_canonical_url_mismatch",
  );

  if (typeof record.title !== "string" || !record.title.trim()) {
    fail("record_title_missing", { lineNumber: recordCount, slug });
  }
  if (!/^blogs-\d{3}\.json$/.test(record.sourceShard || "")) {
    fail("record_source_shard_invalid", { lineNumber: recordCount, slug, sourceShard: record.sourceShard });
  }
  if (!Number.isInteger(record.sourceShardOrdinal) || record.sourceShardOrdinal < 0) {
    fail("record_source_shard_ordinal_invalid", { lineNumber: recordCount, slug });
  }
  if (!Number.isInteger(record.sourceShardIndex) || record.sourceShardIndex < 0) {
    fail("record_source_shard_index_invalid", { lineNumber: recordCount, slug });
  }
  if (!Number.isInteger(record.sourceOrdinal) || record.sourceOrdinal < 0) {
    fail("record_source_ordinal_invalid", { lineNumber: recordCount, slug });
  }

  const fingerprints = record.fingerprints || {};
  if (!isSha256(fingerprints.titleSha256)) fail("record_title_hash_invalid", { lineNumber: recordCount, slug });
  if (!isSha256(fingerprints.normalizedBodySha256)) {
    fail("record_normalized_body_hash_invalid", { lineNumber: recordCount, slug });
  }
  if (!isSha256(fingerprints.contentPayloadSha256)) {
    fail("record_content_payload_hash_invalid", { lineNumber: recordCount, slug });
  }

  slugSet.add(slug);
  if (firstSlug === null) firstSlug = slug;
  lastSlug = slug;
  previousSlug = slug;
}

requireEqual(recordCount, release.artifact.recordCount, "inventory_record_count_mismatch");
requireEqual(slugSet.size, release.artifact.uniqueSlugCount, "inventory_unique_slug_count_mismatch");

const status = [
  "BLOG_EXISTING_INVENTORY_ATTESTATION_STATUS=PASS",
  `RELEASE_ID=${release.releaseId}`,
  `INVENTORY_CONTRACT_VERSION=${release.contractVersion}`,
  "ARTIFACT_HASH_VERIFIED=YES",
  "ARTIFACT_SIZE_VERIFIED=YES",
  "SUMMARY_CONTRACT_VERIFIED=YES",
  "JSONL_RECORD_CONTRACT_VERIFIED=YES",
  "SLUG_ORDER_VERIFIED=YES",
  "UNIQUE_SLUGS_VERIFIED=YES",
  `RECORD_COUNT=${recordCount}`,
  `UNIQUE_SLUG_COUNT=${slugSet.size}`,
  `SOURCE_SHARD_COUNT=${release.source.shardCount}`,
  `EXACT_DUPLICATE_TITLE_GROUPS=${release.exactDuplicateSignals.titleGroups}`,
  `EXACT_DUPLICATE_CONTENT_GROUPS=${release.exactDuplicateSignals.contentGroups}`,
  "CONTENT_FINGERPRINT_EXCLUDES_SLUG=YES",
  `INVENTORY_SHA256=${actualSha256}`,
  `INVENTORY_BYTES=${actualBytes}`,
  `FIRST_SLUG=${firstSlug}`,
  `LAST_SLUG=${lastSlug}`,
  "BULK_IMPORT_APPROVED=NO",
  "DATABASE_READ_PERFORMED=NO",
  "DATABASE_WRITE_PERFORMED=NO",
  "PRODUCTION_FILES_MODIFIED=NO",
  `REPORT=${out}`,
];

writeStatus(status);
console.log(status.join("\n"));
