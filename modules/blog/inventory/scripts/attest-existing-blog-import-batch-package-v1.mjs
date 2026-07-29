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
  "modules/blog/inventory/releases/0005-existing-blog-import-batch-artifact-v1.release.json",
);

const PACKAGE_DIR = path.resolve(process.argv[2] || "");
const OUT = path.resolve(
  process.argv[3] ||
    path.join(
      ROOT,
      ".reports",
      `blog-existing-import-batch-attestation-${new Date().toISOString().replace(/[:.]/g, "-")}`,
    ),
);

const MANIFEST_PATH = path.join(PACKAGE_DIR, "manifest.json");
const BATCH_DIR = path.join(PACKAGE_DIR, "batches");
const STATUS_PATH = path.join(OUT, "status.txt");
const DETAILS_PATH = path.join(OUT, "attestation.json");

const RELEASE_ID = "existing-blog-import-batch-artifact-v1";
const PACKAGE_RELEASE_ID = "existing-blog-import-batch-package-v1";
const WORKSPACE_ID = "blog-workspace-sikhadenge-v1";
const EXPECTED_PLAN_SHA256 =
  "66fa51adf700467f66d8118f0dc979ca2abd24947dceea893d1b4197a6898cca";
const EXPECTED_PLAN_BYTES = 512082000;
const EXPECTED_MANIFEST_SHA256 =
  "5659094b972e2806310cd1a3d72ef19e26f1106df14b6a38b545759fc5d9fe0a";
const EXPECTED_MANIFEST_BYTES = 55691;
const EXPECTED_RECORDS = 120097;
const EXPECTED_TOTAL_ROWS = 360291;
const EXPECTED_BATCH_RECORDS = 1000;
const EXPECTED_BATCH_COUNT = 121;
const EXPECTED_FINAL_BATCH_RECORDS = 97;
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

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function deterministicId(kind, slug) {
  return `legacy-${kind}-v1-${sha256(`${kind}:${slug}`)}`;
}

function writePrivate(filePath, content) {
  fs.writeFileSync(filePath, content, { mode: 0o600 });
  fs.chmodSync(filePath, 0o600);
}

function fail(reason, details = {}) {
  fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });
  const text = [
    "BLOG_IMPORT_BATCH_PACKAGE_ATTESTATION_STATUS=FAIL",
    `REASON=${reason}`,
    `REPORT=${OUT}`,
  ].join("\n");
  writePrivate(STATUS_PATH, `${text}\n`);
  writePrivate(
    DETAILS_PATH,
    `${JSON.stringify({ releaseId: RELEASE_ID, status: "FAIL", reason, ...details }, null, 2)}\n`,
  );
  console.error(text);
  process.exit(1);
}

function invariant(condition, reason, details = {}) {
  if (!condition) fail(reason, details);
}

fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });
fs.chmodSync(OUT, 0o700);

invariant(PACKAGE_DIR && fs.existsSync(PACKAGE_DIR), "package_directory_missing", {
  packageDirectory: PACKAGE_DIR,
});
invariant(fs.existsSync(MANIFEST_PATH), "package_manifest_missing", { manifest: MANIFEST_PATH });
invariant(fs.existsSync(BATCH_DIR), "package_batch_directory_missing", { batches: BATCH_DIR });
invariant(fs.existsSync(RELEASE_PATH), "release_contract_missing", { release: RELEASE_PATH });

const release = readJson(RELEASE_PATH);
const manifest = readJson(MANIFEST_PATH);
const manifestStat = fs.statSync(MANIFEST_PATH);
const manifestSha256 = fileSha256(MANIFEST_PATH);

invariant(release.releaseId === RELEASE_ID, "release_id_mismatch");
invariant(release.status === "validated-artifact-not-approved", "release_status_mismatch");
invariant(release.parentReleaseId === PACKAGE_RELEASE_ID, "release_parent_mismatch");
invariant(release.packageManifest?.sha256 === EXPECTED_MANIFEST_SHA256, "release_manifest_hash_mismatch");
invariant(release.packageManifest?.bytes === EXPECTED_MANIFEST_BYTES, "release_manifest_size_mismatch");
invariant(release.authorization?.bulkImportApproved === false, "release_bulk_import_unexpectedly_approved");
invariant(release.authorization?.productionWriteApproved === false, "release_write_unexpectedly_approved");
invariant(release.authorization?.publicationApproved === false, "release_publication_unexpectedly_approved");
invariant(release.authorization?.indexEligibilityApproved === false, "release_indexing_unexpectedly_approved");

invariant(manifestSha256 === EXPECTED_MANIFEST_SHA256, "manifest_hash_mismatch", {
  expected: EXPECTED_MANIFEST_SHA256,
  actual: manifestSha256,
});
invariant(manifestStat.size === EXPECTED_MANIFEST_BYTES, "manifest_size_mismatch", {
  expected: EXPECTED_MANIFEST_BYTES,
  actual: manifestStat.size,
});

invariant(manifest.releaseId === PACKAGE_RELEASE_ID, "manifest_release_id_mismatch");
invariant(manifest.parentReleaseId === "existing-blog-import-plan-v1", "manifest_parent_release_mismatch");
invariant(manifest.packageContractVersion === 1, "manifest_contract_version_mismatch");
invariant(manifest.sourcePlan?.sha256 === EXPECTED_PLAN_SHA256, "manifest_plan_hash_mismatch");
invariant(manifest.sourcePlan?.bytes === EXPECTED_PLAN_BYTES, "manifest_plan_size_mismatch");
invariant(manifest.sourcePlan?.recordCount === EXPECTED_RECORDS, "manifest_record_count_mismatch");
invariant(manifest.sourcePlan?.plannedRows === EXPECTED_TOTAL_ROWS, "manifest_total_rows_mismatch");
invariant(manifest.batchContract?.recordsPerBatch === EXPECTED_BATCH_RECORDS, "manifest_batch_size_mismatch");
invariant(manifest.batchContract?.batchCount === EXPECTED_BATCH_COUNT, "manifest_batch_count_mismatch");
invariant(manifest.batchContract?.fullBatchCount === EXPECTED_BATCH_COUNT - 1, "manifest_full_batch_count_mismatch");
invariant(
  manifest.batchContract?.finalBatchRecords === EXPECTED_FINAL_BATCH_RECORDS,
  "manifest_final_batch_records_mismatch",
);
invariant(manifest.batchContract?.rowKindsPerRecord === 3, "manifest_row_kinds_mismatch");
invariant(manifest.recombination?.sha256 === EXPECTED_PLAN_SHA256, "manifest_recombined_hash_mismatch");
invariant(manifest.recombination?.bytes === EXPECTED_PLAN_BYTES, "manifest_recombined_size_mismatch");
invariant(manifest.recombination?.exactSourcePlanMatch === true, "manifest_exact_match_not_verified");
invariant(manifest.safetyDefaults?.lifecycleStatus === "DISCOVERED", "manifest_lifecycle_default_mismatch");
invariant(manifest.safetyDefaults?.versionStatus === "WRITING", "manifest_version_default_mismatch");
invariant(manifest.safetyDefaults?.indexEligibility === "BLOCKED", "manifest_index_default_mismatch");
invariant(manifest.safetyDefaults?.publications === 0, "manifest_publications_not_zero");
invariant(manifest.safetyDefaults?.qualityRuns === 0, "manifest_quality_runs_not_zero");
invariant(manifest.safetyDefaults?.editorialReviews === 0, "manifest_reviews_not_zero");
invariant(manifest.authorization?.bulkImportApproved === false, "manifest_bulk_import_unexpectedly_approved");
invariant(manifest.authorization?.productionWriteApproved === false, "manifest_write_unexpectedly_approved");
invariant(manifest.authorization?.publicationApproved === false, "manifest_publication_unexpectedly_approved");
invariant(manifest.authorization?.indexEligibilityApproved === false, "manifest_indexing_unexpectedly_approved");
invariant(manifest.safety?.databaseReadPerformed === false, "manifest_database_read_detected");
invariant(manifest.safety?.databaseWritePerformed === false, "manifest_database_write_detected");
invariant(manifest.safety?.productionFilesModified === false, "manifest_production_modification_detected");
invariant(Array.isArray(manifest.batches), "manifest_batches_missing");
invariant(manifest.batches.length === EXPECTED_BATCH_COUNT, "manifest_batch_entries_mismatch");

const expectedFiles = manifest.batches.map((batch) => path.basename(batch.file));
const actualFiles = fs.readdirSync(BATCH_DIR).sort();
invariant(
  JSON.stringify(actualFiles) === JSON.stringify([...expectedFiles].sort()),
  "batch_directory_entries_mismatch",
  { expectedCount: expectedFiles.length, actualCount: actualFiles.length },
);

const packageHasher = crypto.createHash("sha256");
const slugs = new Set();
const sourceRecordKeys = new Set();
const exactHashes = new Set();
let expectedOrdinal = 0;
let totalRecords = 0;
let totalBytes = 0;
let firstSlug = null;
let lastSlug = null;

for (let offset = 0; offset < manifest.batches.length; offset += 1) {
  const batch = manifest.batches[offset];
  const expectedBatchIndex = offset + 1;
  const expectedFileName = `batch-${String(expectedBatchIndex).padStart(3, "0")}.jsonl`;
  const expectedRecordCount =
    expectedBatchIndex === EXPECTED_BATCH_COUNT ? EXPECTED_FINAL_BATCH_RECORDS : EXPECTED_BATCH_RECORDS;

  invariant(batch.batchIndex === expectedBatchIndex, "batch_index_mismatch", { expectedBatchIndex });
  invariant(batch.file === `batches/${expectedFileName}`, "batch_file_name_mismatch", {
    expectedBatchIndex,
    actual: batch.file,
  });
  invariant(batch.firstOrdinal === expectedOrdinal, "batch_first_ordinal_mismatch", {
    expectedBatchIndex,
    expected: expectedOrdinal,
    actual: batch.firstOrdinal,
  });
  invariant(batch.recordCount === expectedRecordCount, "batch_record_count_manifest_mismatch", {
    expectedBatchIndex,
    expected: expectedRecordCount,
    actual: batch.recordCount,
  });
  invariant(batch.lastOrdinal === expectedOrdinal + expectedRecordCount - 1, "batch_last_ordinal_mismatch", {
    expectedBatchIndex,
  });
  invariant(batch.plannedRows === expectedRecordCount * 3, "batch_planned_rows_mismatch", {
    expectedBatchIndex,
  });
  invariant(Number.isInteger(batch.bytes) && batch.bytes > 0, "batch_bytes_invalid", { expectedBatchIndex });
  invariant(HASH_PATTERN.test(batch.sha256), "batch_hash_invalid", { expectedBatchIndex });

  const batchPath = path.join(PACKAGE_DIR, batch.file);
  invariant(batchPath.startsWith(`${BATCH_DIR}${path.sep}`), "batch_path_escape_detected", {
    expectedBatchIndex,
  });
  invariant(fs.existsSync(batchPath), "batch_file_missing", { expectedBatchIndex, batchPath });
  invariant(fs.statSync(batchPath).size === batch.bytes, "batch_file_size_mismatch", {
    expectedBatchIndex,
    expected: batch.bytes,
    actual: fs.statSync(batchPath).size,
  });

  const batchHasher = crypto.createHash("sha256");
  const reader = readline.createInterface({
    input: fs.createReadStream(batchPath, { encoding: "utf8" }),
    crlfDelay: Infinity,
  });

  let batchRecords = 0;
  let batchBytes = 0;
  let observedFirstSlug = null;
  let observedLastSlug = null;

  for await (const line of reader) {
    if (!line) continue;
    let record;
    try {
      record = JSON.parse(line);
    } catch {
      fail("batch_jsonl_invalid", { expectedBatchIndex, batchLine: batchRecords + 1 });
    }

    const slug = record?.page?.slug;
    const ordinal = expectedOrdinal + batchRecords;
    invariant(record?.importPlanVersion === 1, "batch_record_contract_mismatch", { ordinal, slug });
    invariant(typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug), "batch_slug_invalid", {
      ordinal,
      slug,
    });
    invariant(record?.source?.sourceOrdinal === ordinal, "batch_source_ordinal_mismatch", {
      ordinal,
      actual: record?.source?.sourceOrdinal,
      slug,
    });
    invariant(!slugs.has(slug), "batch_duplicate_slug", { ordinal, slug });
    slugs.add(slug);

    const sourceKey = record?.source?.sourceRecordKey;
    invariant(typeof sourceKey === "string" && sourceKey.length > 0, "batch_source_key_missing", {
      ordinal,
      slug,
    });
    invariant(!sourceRecordKeys.has(sourceKey), "batch_source_key_collision", { ordinal, slug });
    sourceRecordKeys.add(sourceKey);

    invariant(record?.page?.workspaceId === WORKSPACE_ID, "batch_workspace_mismatch", { ordinal, slug });
    invariant(record?.page?.id === deterministicId("page", slug), "batch_page_id_mismatch", { ordinal, slug });
    invariant(record?.version?.id === deterministicId("version", slug), "batch_version_id_mismatch", {
      ordinal,
      slug,
    });
    invariant(
      record?.fingerprint?.id === deterministicId("fingerprint", slug),
      "batch_fingerprint_id_mismatch",
      { ordinal, slug },
    );
    invariant(record?.version?.pageId === record?.page?.id, "batch_version_page_relation_mismatch", {
      ordinal,
      slug,
    });
    invariant(
      record?.fingerprint?.versionId === record?.version?.id,
      "batch_fingerprint_version_relation_mismatch",
      { ordinal, slug },
    );
    invariant(record?.page?.lifecycleStatus === "DISCOVERED", "batch_lifecycle_not_blocked", {
      ordinal,
      slug,
    });
    invariant(record?.page?.indexEligibility === "BLOCKED", "batch_indexing_not_blocked", {
      ordinal,
      slug,
    });
    invariant(record?.version?.status === "WRITING", "batch_version_not_writing", { ordinal, slug });
    invariant(record?.version?.sourceCoverage === 0, "batch_source_coverage_not_zero", { ordinal, slug });
    invariant(record?.version?.originalityScore === 0, "batch_originality_not_zero", { ordinal, slug });
    invariant(record?.version?.qualityScore === 0, "batch_quality_not_zero", { ordinal, slug });
    invariant(record?.deferred?.publicationRows === 0, "batch_publication_intent_detected", {
      ordinal,
      slug,
    });
    invariant(record?.deferred?.qualityRunRows === 0, "batch_quality_run_intent_detected", {
      ordinal,
      slug,
    });
    invariant(record?.deferred?.editorialReviewRows === 0, "batch_review_intent_detected", {
      ordinal,
      slug,
    });

    const exactHash = record?.version?.exactHash;
    invariant(HASH_PATTERN.test(exactHash), "batch_exact_hash_invalid", { ordinal, slug });
    invariant(!exactHashes.has(exactHash), "batch_exact_hash_duplicate", { ordinal, slug });
    exactHashes.add(exactHash);

    if (observedFirstSlug === null) observedFirstSlug = slug;
    observedLastSlug = slug;
    if (firstSlug === null) firstSlug = slug;
    lastSlug = slug;

    const serialized = `${line}\n`;
    const bytes = Buffer.byteLength(serialized);
    batchHasher.update(serialized);
    packageHasher.update(serialized);
    batchBytes += bytes;
    totalBytes += bytes;
    batchRecords += 1;
    totalRecords += 1;
  }

  invariant(batchRecords === expectedRecordCount, "batch_record_count_actual_mismatch", {
    expectedBatchIndex,
    expected: expectedRecordCount,
    actual: batchRecords,
  });
  invariant(batchBytes === batch.bytes, "batch_byte_count_actual_mismatch", {
    expectedBatchIndex,
    expected: batch.bytes,
    actual: batchBytes,
  });
  invariant(batchHasher.digest("hex") === batch.sha256, "batch_sha256_mismatch", {
    expectedBatchIndex,
  });
  invariant(observedFirstSlug === batch.firstSlug, "batch_first_slug_mismatch", {
    expectedBatchIndex,
  });
  invariant(observedLastSlug === batch.lastSlug, "batch_last_slug_mismatch", {
    expectedBatchIndex,
  });

  expectedOrdinal += batchRecords;
}

const recombinedSha256 = packageHasher.digest("hex");
invariant(totalRecords === EXPECTED_RECORDS, "package_total_records_mismatch", {
  expected: EXPECTED_RECORDS,
  actual: totalRecords,
});
invariant(expectedOrdinal === EXPECTED_RECORDS, "package_ordinal_coverage_mismatch", {
  expected: EXPECTED_RECORDS,
  actual: expectedOrdinal,
});
invariant(totalBytes === EXPECTED_PLAN_BYTES, "package_total_bytes_mismatch", {
  expected: EXPECTED_PLAN_BYTES,
  actual: totalBytes,
});
invariant(recombinedSha256 === EXPECTED_PLAN_SHA256, "package_recombined_hash_mismatch", {
  expected: EXPECTED_PLAN_SHA256,
  actual: recombinedSha256,
});
invariant(slugs.size === EXPECTED_RECORDS, "package_unique_slug_count_mismatch");
invariant(sourceRecordKeys.size === EXPECTED_RECORDS, "package_unique_source_key_count_mismatch");
invariant(exactHashes.size === EXPECTED_RECORDS, "package_unique_exact_hash_count_mismatch");

const status = [
  "BLOG_IMPORT_BATCH_PACKAGE_ATTESTATION_STATUS=PASS",
  `RELEASE_ID=${RELEASE_ID}`,
  "PACKAGE_CONTRACT_VERSION=1",
  "RELEASE_CONTRACT_VERIFIED=YES",
  "MANIFEST_HASH_VERIFIED=YES",
  "MANIFEST_SIZE_VERIFIED=YES",
  "BATCH_DIRECTORY_EXACT_FILESET_VERIFIED=YES",
  "ALL_BATCH_HASHES_VERIFIED=YES",
  "ALL_BATCH_SIZES_VERIFIED=YES",
  "BATCH_ORDINAL_CONTINUITY_VERIFIED=YES",
  "BATCH_SLUG_BOUNDARIES_VERIFIED=YES",
  "DETERMINISTIC_IDS_VERIFIED=YES",
  "UNIQUE_SLUGS_VERIFIED=YES",
  "UNIQUE_SOURCE_RECORD_KEYS_VERIFIED=YES",
  "UNIQUE_EXACT_CONTENT_HASHES_VERIFIED=YES",
  "BLOCKED_LIFECYCLE_DEFAULTS_VERIFIED=YES",
  "ZERO_PUBLICATION_INTENT_VERIFIED=YES",
  `BATCH_COUNT=${EXPECTED_BATCH_COUNT}`,
  `FULL_BATCH_COUNT=${EXPECTED_BATCH_COUNT - 1}`,
  `FINAL_BATCH_RECORDS=${EXPECTED_FINAL_BATCH_RECORDS}`,
  `RECORD_COUNT=${totalRecords}`,
  `PLANNED_TOTAL_ROWS=${EXPECTED_TOTAL_ROWS}`,
  `RECOMBINED_SHA256=${recombinedSha256}`,
  `RECOMBINED_BYTES=${totalBytes}`,
  `MANIFEST_SHA256=${manifestSha256}`,
  `MANIFEST_BYTES=${manifestStat.size}`,
  `FIRST_SLUG=${firstSlug}`,
  `LAST_SLUG=${lastSlug}`,
  "BULK_IMPORT_APPROVED=NO",
  "PRODUCTION_WRITE_APPROVED=NO",
  "DATABASE_READ_PERFORMED=NO",
  "DATABASE_WRITE_PERFORMED=NO",
  "PRODUCTION_FILES_MODIFIED=NO",
  `REPORT=${OUT}`,
].join("\n");

writePrivate(STATUS_PATH, `${status}\n`);
writePrivate(
  DETAILS_PATH,
  `${JSON.stringify(
    {
      releaseId: RELEASE_ID,
      status: "PASS",
      packageDirectory: PACKAGE_DIR,
      manifestSha256,
      manifestBytes: manifestStat.size,
      batchCount: EXPECTED_BATCH_COUNT,
      totalRecords,
      totalBytes,
      recombinedSha256,
      firstSlug,
      lastSlug,
      authorization: {
        bulkImportApproved: false,
        productionWriteApproved: false,
      },
      safety: {
        databaseReadPerformed: false,
        databaseWritePerformed: false,
        productionFilesModified: false,
      },
    },
    null,
    2,
  )}\n`,
);

console.log(status);
