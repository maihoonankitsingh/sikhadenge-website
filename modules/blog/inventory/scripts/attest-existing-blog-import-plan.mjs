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
  "modules/blog/inventory/releases/0003-existing-blog-import-plan-v1.release.json",
);

const PLAN = path.resolve(process.argv[2] || "");
const SUMMARY = path.resolve(process.argv[3] || "");
const OUT = path.resolve(
  process.argv[4] ||
    path.join(
      ROOT,
      ".reports",
      `blog-existing-import-plan-attestation-${new Date().toISOString().replace(/[:.]/g, "-")}`,
    ),
);

const STATUS = path.join(OUT, "status.txt");
const DETAILS = path.join(OUT, "attestation.json");
const RELEASE_ID = "existing-blog-import-plan-v1";
const WORKSPACE_ID = "blog-workspace-sikhadenge-v1";
const EXPECTED_PLAN_SHA256 =
  "66fa51adf700467f66d8118f0dc979ca2abd24947dceea893d1b4197a6898cca";
const EXPECTED_PLAN_BYTES = 512082000;
const EXPECTED_INVENTORY_SHA256 =
  "9dd20eadc35a8a95de6ed6c0ca297971e50ae3e249d548233c0b582568caa6ba";
const EXPECTED_RECORDS = 120097;
const EXPECTED_TOTAL_ROWS = 360291;
const HASH_PATTERN = /^[a-f0-9]{64}$/;

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function fileSha256(filePath) {
  const digest = crypto.createHash("sha256");
  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  try {
    while (true) {
      const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, null);
      if (!bytesRead) break;
      digest.update(buffer.subarray(0, bytesRead));
    }
  } finally {
    fs.closeSync(fd);
  }
  return digest.digest("hex");
}

function deterministicId(kind, slug) {
  return `legacy-${kind}-v1-${sha256(`${kind}:${slug}`)}`;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function fail(reason, details = {}) {
  fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });
  const text = [
    "BLOG_EXISTING_IMPORT_PLAN_ATTESTATION_STATUS=FAIL",
    `REASON=${reason}`,
    `REPORT=${OUT}`,
  ].join("\n");
  fs.writeFileSync(STATUS, `${text}\n`, { mode: 0o600 });
  fs.writeFileSync(
    DETAILS,
    `${JSON.stringify({ releaseId: RELEASE_ID, status: "FAIL", reason, ...details }, null, 2)}\n`,
    { mode: 0o600 },
  );
  console.error(text);
  process.exit(1);
}

function invariant(condition, reason, details = {}) {
  if (!condition) fail(reason, details);
}

fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });

invariant(PLAN && fs.existsSync(PLAN), "plan_artifact_missing", { plan: PLAN });
invariant(SUMMARY && fs.existsSync(SUMMARY), "plan_summary_missing", { summary: SUMMARY });
invariant(fs.existsSync(RELEASE_PATH), "release_manifest_missing", { release: RELEASE_PATH });

const release = readJson(RELEASE_PATH);
const summary = readJson(SUMMARY);
const planStat = fs.statSync(PLAN);
const planSha256 = fileSha256(PLAN);

invariant(release.releaseId === RELEASE_ID, "release_id_mismatch");
invariant(release.status === "validated-dry-run", "release_status_mismatch");
invariant(release.planArtifact?.contractVersion === 1, "release_plan_contract_mismatch");
invariant(release.planArtifact?.sha256 === EXPECTED_PLAN_SHA256, "release_plan_hash_mismatch");
invariant(release.planArtifact?.bytes === EXPECTED_PLAN_BYTES, "release_plan_size_mismatch");
invariant(release.planArtifact?.recordCount === EXPECTED_RECORDS, "release_record_count_mismatch");
invariant(release.sourceInventory?.sha256 === EXPECTED_INVENTORY_SHA256, "release_inventory_hash_mismatch");
invariant(release.authorization?.bulkImportApproved === false, "bulk_import_unexpectedly_approved");
invariant(release.authorization?.productionWriteApproved === false, "production_write_unexpectedly_approved");
invariant(release.authorization?.publicationApproved === false, "publication_unexpectedly_approved");
invariant(release.authorization?.indexEligibilityApproved === false, "indexing_unexpectedly_approved");

invariant(planSha256 === EXPECTED_PLAN_SHA256, "plan_hash_mismatch", {
  expected: EXPECTED_PLAN_SHA256,
  actual: planSha256,
});
invariant(planStat.size === EXPECTED_PLAN_BYTES, "plan_size_mismatch", {
  expected: EXPECTED_PLAN_BYTES,
  actual: planStat.size,
});

invariant(summary.importPlanVersion === 1, "summary_contract_version_mismatch");
invariant(summary.source?.inventorySha256 === EXPECTED_INVENTORY_SHA256, "summary_inventory_hash_mismatch");
invariant(summary.source?.sourceRecordCount === EXPECTED_RECORDS, "summary_source_count_mismatch");
invariant(summary.source?.sourceShardCount === 13, "summary_shard_count_mismatch");
invariant(summary.plannedRows?.pages === EXPECTED_RECORDS, "summary_page_count_mismatch");
invariant(summary.plannedRows?.pageVersions === EXPECTED_RECORDS, "summary_version_count_mismatch");
invariant(summary.plannedRows?.contentFingerprints === EXPECTED_RECORDS, "summary_fingerprint_count_mismatch");
invariant(summary.plannedRows?.total === EXPECTED_TOTAL_ROWS, "summary_total_rows_mismatch");
invariant(summary.plannedRows?.publications === 0, "summary_publications_not_zero");
invariant(summary.plannedRows?.qualityRuns === 0, "summary_quality_runs_not_zero");
invariant(summary.plannedRows?.editorialReviews === 0, "summary_reviews_not_zero");
invariant(summary.safetyDefaults?.lifecycleStatus === "DISCOVERED", "summary_lifecycle_default_mismatch");
invariant(summary.safetyDefaults?.versionStatus === "WRITING", "summary_version_default_mismatch");
invariant(summary.safetyDefaults?.indexEligibility === "BLOCKED", "summary_index_default_mismatch");
invariant(summary.safetyDefaults?.publicationRows === 0, "summary_publication_default_mismatch");
invariant(summary.safetyDefaults?.sourceCoverage === 0, "summary_source_coverage_mismatch");
invariant(summary.safetyDefaults?.originalityScore === 0, "summary_originality_score_mismatch");
invariant(summary.safetyDefaults?.qualityScore === 0, "summary_quality_score_mismatch");
invariant(summary.safetyDefaults?.requiresResearch === true, "summary_research_gate_disabled");
invariant(summary.safetyDefaults?.requiresQualityGate === true, "summary_quality_gate_disabled");
invariant(summary.safetyDefaults?.requiresEditorialApproval === true, "summary_editorial_gate_disabled");
invariant(summary.safetyDefaults?.bulkImportApproved === false, "summary_bulk_import_unexpectedly_approved");
invariant(summary.deterministicIdentity?.collisions === 0, "summary_identity_collisions_present");
invariant(summary.planArtifact?.sha256 === EXPECTED_PLAN_SHA256, "summary_plan_hash_mismatch");
invariant(summary.planArtifact?.bytes === EXPECTED_PLAN_BYTES, "summary_plan_size_mismatch");
invariant(summary.planArtifact?.records === EXPECTED_RECORDS, "summary_plan_records_mismatch");
invariant(summary.safety?.databaseReadPerformed === false, "summary_database_read_detected");
invariant(summary.safety?.databaseWritePerformed === false, "summary_database_write_detected");
invariant(summary.safety?.productionFilesModified === false, "summary_production_modification_detected");

const slugs = new Set();
const pageIds = new Set();
const versionIds = new Set();
const fingerprintIds = new Set();
const sourceRecordKeys = new Set();
const exactHashes = new Set();
let lineCount = 0;
let firstSlug = null;
let lastSlug = null;

const reader = readline.createInterface({
  input: fs.createReadStream(PLAN, { encoding: "utf8" }),
  crlfDelay: Infinity,
});

for await (const line of reader) {
  if (!line) continue;
  lineCount += 1;

  let record;
  try {
    record = JSON.parse(line);
  } catch {
    fail("plan_jsonl_invalid", { line: lineCount });
  }

  const slug = record?.page?.slug;
  invariant(record?.importPlanVersion === 1, "record_contract_version_mismatch", { line: lineCount, slug });
  invariant(typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug), "record_slug_invalid", {
    line: lineCount,
    slug,
  });
  invariant(!slugs.has(slug), "record_duplicate_slug", { line: lineCount, slug });
  slugs.add(slug);
  if (firstSlug === null) firstSlug = slug;
  lastSlug = slug;

  const source = record.source;
  const page = record.page;
  const version = record.version;
  const fingerprint = record.fingerprint;
  const deferred = record.deferred;

  invariant(source?.inventorySha256 === EXPECTED_INVENTORY_SHA256, "record_inventory_hash_mismatch", {
    line: lineCount,
    slug,
  });
  invariant(Number.isInteger(source?.sourceShardOrdinal), "record_shard_ordinal_invalid", { line: lineCount, slug });
  invariant(Number.isInteger(source?.sourceShardIndex), "record_shard_index_invalid", { line: lineCount, slug });
  invariant(source?.sourceOrdinal === lineCount - 1, "record_source_ordinal_mismatch", {
    line: lineCount,
    slug,
    expected: lineCount - 1,
    actual: source?.sourceOrdinal,
  });
  invariant(
    source?.sourceRecordKey === `legacy-json-shard:${source?.sourceShard}:${source?.sourceShardIndex}`,
    "record_source_key_mismatch",
    { line: lineCount, slug },
  );
  invariant(!sourceRecordKeys.has(source.sourceRecordKey), "record_source_key_collision", {
    line: lineCount,
    slug,
  });
  sourceRecordKeys.add(source.sourceRecordKey);

  const expectedPageId = deterministicId("page", slug);
  const expectedVersionId = deterministicId("version", slug);
  const expectedFingerprintId = deterministicId("fingerprint", slug);

  invariant(page?.id === expectedPageId, "record_page_id_mismatch", { line: lineCount, slug });
  invariant(version?.id === expectedVersionId, "record_version_id_mismatch", { line: lineCount, slug });
  invariant(fingerprint?.id === expectedFingerprintId, "record_fingerprint_id_mismatch", {
    line: lineCount,
    slug,
  });
  invariant(!pageIds.has(page.id), "record_page_id_collision", { line: lineCount, slug });
  invariant(!versionIds.has(version.id), "record_version_id_collision", { line: lineCount, slug });
  invariant(!fingerprintIds.has(fingerprint.id), "record_fingerprint_id_collision", { line: lineCount, slug });
  pageIds.add(page.id);
  versionIds.add(version.id);
  fingerprintIds.add(fingerprint.id);

  invariant(page.workspaceId === WORKSPACE_ID, "record_workspace_mismatch", { line: lineCount, slug });
  invariant(page.canonicalPath === `/blog/${slug}`, "record_canonical_path_mismatch", { line: lineCount, slug });
  invariant(typeof page.title === "string" && page.title.length > 0, "record_title_missing", { line: lineCount, slug });
  invariant(page.uniqueAngle === "UNVERIFIED_LEGACY_IMPORT", "record_unique_angle_not_blocked", {
    line: lineCount,
    slug,
  });
  invariant(page.userProblem === "UNVERIFIED_LEGACY_IMPORT", "record_user_problem_not_blocked", {
    line: lineCount,
    slug,
  });
  invariant(page.expectedOutcome === "UNVERIFIED_LEGACY_IMPORT", "record_outcome_not_blocked", {
    line: lineCount,
    slug,
  });
  invariant(page.lifecycleStatus === "DISCOVERED", "record_lifecycle_default_mismatch", { line: lineCount, slug });
  invariant(page.indexEligibility === "BLOCKED", "record_index_default_mismatch", { line: lineCount, slug });
  invariant(page.sourceRecordKey === source.sourceRecordKey, "record_page_source_key_mismatch", {
    line: lineCount,
    slug,
  });
  invariant(page.metadata?.requiresResearch === true, "record_research_gate_disabled", { line: lineCount, slug });
  invariant(page.metadata?.requiresQualityGate === true, "record_quality_gate_disabled", { line: lineCount, slug });
  invariant(page.metadata?.requiresEditorialApproval === true, "record_editorial_gate_disabled", {
    line: lineCount,
    slug,
  });
  invariant(page.metadata?.publicationBlocked === true, "record_publication_not_blocked", { line: lineCount, slug });

  invariant(version.pageId === page.id, "record_version_page_mismatch", { line: lineCount, slug });
  invariant(version.versionNumber === 1, "record_version_number_mismatch", { line: lineCount, slug });
  invariant(version.status === "WRITING", "record_version_status_mismatch", { line: lineCount, slug });
  invariant(version.origin === "MIGRATED", "record_version_origin_mismatch", { line: lineCount, slug });
  invariant(version.sourceCoverage === 0, "record_source_coverage_not_zero", { line: lineCount, slug });
  invariant(version.originalityScore === 0, "record_originality_score_not_zero", { line: lineCount, slug });
  invariant(version.qualityScore === 0, "record_quality_score_not_zero", { line: lineCount, slug });
  invariant(HASH_PATTERN.test(version.exactHash), "record_exact_hash_invalid", { line: lineCount, slug });
  invariant(HASH_PATTERN.test(version.normalizedHash), "record_normalized_hash_invalid", { line: lineCount, slug });
  invariant(!exactHashes.has(version.exactHash), "record_exact_content_hash_duplicate", { line: lineCount, slug });
  exactHashes.add(version.exactHash);

  invariant(fingerprint.versionId === version.id, "record_fingerprint_version_mismatch", { line: lineCount, slug });
  invariant(fingerprint.scope === "legacy-source-record", "record_fingerprint_scope_mismatch", {
    line: lineCount,
    slug,
  });
  invariant(fingerprint.scopeKey === slug, "record_fingerprint_scope_key_mismatch", { line: lineCount, slug });
  invariant(fingerprint.exactHash === version.exactHash, "record_fingerprint_exact_hash_mismatch", {
    line: lineCount,
    slug,
  });
  invariant(fingerprint.normalizedHash === version.normalizedHash, "record_fingerprint_normalized_hash_mismatch", {
    line: lineCount,
    slug,
  });
  invariant(fingerprint.metadata?.inventorySha256 === EXPECTED_INVENTORY_SHA256, "record_fingerprint_inventory_mismatch", {
    line: lineCount,
    slug,
  });
  invariant(fingerprint.metadata?.contentFingerprintExcludesSlug === true, "record_slug_in_content_fingerprint", {
    line: lineCount,
    slug,
  });

  invariant(deferred?.publicationRows === 0, "record_publication_rows_not_zero", { line: lineCount, slug });
  invariant(deferred?.qualityRunRows === 0, "record_quality_rows_not_zero", { line: lineCount, slug });
  invariant(deferred?.editorialReviewRows === 0, "record_review_rows_not_zero", { line: lineCount, slug });
}

invariant(lineCount === EXPECTED_RECORDS, "plan_record_count_mismatch", {
  expected: EXPECTED_RECORDS,
  actual: lineCount,
});
invariant(slugs.size === EXPECTED_RECORDS, "plan_unique_slug_count_mismatch", { actual: slugs.size });
invariant(pageIds.size === EXPECTED_RECORDS, "plan_unique_page_id_count_mismatch", { actual: pageIds.size });
invariant(versionIds.size === EXPECTED_RECORDS, "plan_unique_version_id_count_mismatch", { actual: versionIds.size });
invariant(fingerprintIds.size === EXPECTED_RECORDS, "plan_unique_fingerprint_id_count_mismatch", {
  actual: fingerprintIds.size,
});
invariant(sourceRecordKeys.size === EXPECTED_RECORDS, "plan_unique_source_key_count_mismatch", {
  actual: sourceRecordKeys.size,
});
invariant(exactHashes.size === EXPECTED_RECORDS, "plan_unique_exact_hash_count_mismatch", {
  actual: exactHashes.size,
});

const attestation = {
  releaseId: RELEASE_ID,
  status: "PASS",
  plan: {
    contractVersion: 1,
    sha256: planSha256,
    bytes: planStat.size,
    recordCount: lineCount,
    firstSlug,
    lastSlug,
  },
  verified: {
    releaseManifest: true,
    summaryContract: true,
    jsonlRecordContract: true,
    deterministicIdentity: true,
    uniqueSlugs: true,
    uniqueSourceRecordKeys: true,
    uniqueExactContentHashes: true,
    blockedLifecycleDefaults: true,
    zeroPublicationIntent: true,
  },
  authorization: {
    bulkImportApproved: false,
    productionWriteApproved: false,
    publicationApproved: false,
    indexEligibilityApproved: false,
  },
  safety: {
    databaseReadPerformed: false,
    databaseWritePerformed: false,
    productionFilesModified: false,
  },
};

fs.writeFileSync(DETAILS, `${JSON.stringify(attestation, null, 2)}\n`, { mode: 0o600 });

const text = [
  "BLOG_EXISTING_IMPORT_PLAN_ATTESTATION_STATUS=PASS",
  `RELEASE_ID=${RELEASE_ID}`,
  "IMPORT_PLAN_VERSION=1",
  "RELEASE_MANIFEST_VERIFIED=YES",
  "PLAN_HASH_VERIFIED=YES",
  "PLAN_SIZE_VERIFIED=YES",
  "SUMMARY_CONTRACT_VERIFIED=YES",
  "JSONL_RECORD_CONTRACT_VERIFIED=YES",
  "DETERMINISTIC_IDS_VERIFIED=YES",
  "UNIQUE_SLUGS_VERIFIED=YES",
  "UNIQUE_SOURCE_RECORD_KEYS_VERIFIED=YES",
  "UNIQUE_EXACT_CONTENT_HASHES_VERIFIED=YES",
  "BLOCKED_LIFECYCLE_DEFAULTS_VERIFIED=YES",
  "ZERO_PUBLICATION_INTENT_VERIFIED=YES",
  `RECORD_COUNT=${lineCount}`,
  `PLANNED_TOTAL_ROWS=${EXPECTED_TOTAL_ROWS}`,
  `PLAN_SHA256=${planSha256}`,
  `PLAN_BYTES=${planStat.size}`,
  `FIRST_SLUG=${firstSlug}`,
  `LAST_SLUG=${lastSlug}`,
  "BULK_IMPORT_APPROVED=NO",
  "PRODUCTION_WRITE_APPROVED=NO",
  "DATABASE_READ_PERFORMED=NO",
  "DATABASE_WRITE_PERFORMED=NO",
  "PRODUCTION_FILES_MODIFIED=NO",
  `REPORT=${OUT}`,
].join("\n");

fs.writeFileSync(STATUS, `${text}\n`, { mode: 0o600 });
console.log(text);
