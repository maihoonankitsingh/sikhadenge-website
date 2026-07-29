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
  "modules/blog/inventory/releases/0004-existing-blog-import-batch-package-v1.release.json",
);

const PLAN = path.resolve(process.argv[2] || "");
const PLAN_SUMMARY = path.resolve(process.argv[3] || "");
const OUT = path.resolve(
  process.argv[4] ||
    path.join(
      ROOT,
      ".reports",
      `blog-existing-import-batch-package-${new Date().toISOString().replace(/[:.]/g, "-")}`,
    ),
);

const RELEASE_ID = "existing-blog-import-batch-package-v1";
const PARENT_RELEASE_ID = "existing-blog-import-plan-v1";
const WORKSPACE_ID = "blog-workspace-sikhadenge-v1";
const EXPECTED_PLAN_SHA256 =
  "66fa51adf700467f66d8118f0dc979ca2abd24947dceea893d1b4197a6898cca";
const EXPECTED_PLAN_BYTES = 512082000;
const EXPECTED_RECORDS = 120097;
const EXPECTED_TOTAL_ROWS = 360291;
const BATCH_RECORDS = 1000;
const EXPECTED_BATCHES = Math.ceil(EXPECTED_RECORDS / BATCH_RECORDS);

const BATCH_DIR = path.join(OUT, "batches");
const MANIFEST_PATH = path.join(OUT, "manifest.json");
const STATUS_PATH = path.join(OUT, "status.txt");
const DETAILS_PATH = path.join(OUT, "details.json");

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
  const status = [
    "BLOG_IMPORT_BATCH_PACKAGE_STATUS=FAIL",
    `REASON=${reason}`,
    `REPORT=${OUT}`,
  ].join("\n");
  writePrivate(STATUS_PATH, `${status}\n`);
  writePrivate(
    DETAILS_PATH,
    `${JSON.stringify({ releaseId: RELEASE_ID, status: "FAIL", reason, ...details }, null, 2)}\n`,
  );
  console.error(status);
  process.exit(1);
}

function invariant(condition, reason, details = {}) {
  if (!condition) fail(reason, details);
}

invariant(PLAN && fs.existsSync(PLAN), "plan_missing", { plan: PLAN });
invariant(PLAN_SUMMARY && fs.existsSync(PLAN_SUMMARY), "plan_summary_missing", {
  summary: PLAN_SUMMARY,
});
invariant(fs.existsSync(RELEASE_PATH), "release_manifest_missing", { release: RELEASE_PATH });

if (fs.existsSync(OUT)) {
  const entries = fs.readdirSync(OUT);
  invariant(entries.length === 0, "output_directory_not_empty", { out: OUT, entries });
} else {
  fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });
}
fs.chmodSync(OUT, 0o700);
fs.mkdirSync(BATCH_DIR, { recursive: true, mode: 0o700 });
fs.chmodSync(BATCH_DIR, 0o700);

const release = readJson(RELEASE_PATH);
const summary = readJson(PLAN_SUMMARY);
const planStat = fs.statSync(PLAN);
const planSha256 = fileSha256(PLAN);

invariant(release.releaseId === RELEASE_ID, "release_id_mismatch");
invariant(release.status === "prepared-not-approved", "release_status_mismatch");
invariant(release.parentReleaseId === PARENT_RELEASE_ID, "parent_release_id_mismatch");
invariant(release.planArtifact?.sha256 === EXPECTED_PLAN_SHA256, "release_plan_hash_mismatch");
invariant(release.planArtifact?.bytes === EXPECTED_PLAN_BYTES, "release_plan_size_mismatch");
invariant(release.planArtifact?.recordCount === EXPECTED_RECORDS, "release_plan_records_mismatch");
invariant(release.batchContract?.recordsPerBatch === BATCH_RECORDS, "release_batch_size_mismatch");
invariant(release.batchContract?.expectedBatchCount === EXPECTED_BATCHES, "release_batch_count_mismatch");
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
invariant(summary.source?.sourceRecordCount === EXPECTED_RECORDS, "summary_record_count_mismatch");
invariant(summary.plannedRows?.pages === EXPECTED_RECORDS, "summary_pages_mismatch");
invariant(summary.plannedRows?.pageVersions === EXPECTED_RECORDS, "summary_versions_mismatch");
invariant(
  summary.plannedRows?.contentFingerprints === EXPECTED_RECORDS,
  "summary_fingerprints_mismatch",
);
invariant(summary.plannedRows?.total === EXPECTED_TOTAL_ROWS, "summary_total_rows_mismatch");
invariant(summary.plannedRows?.publications === 0, "summary_publications_not_zero");
invariant(summary.plannedRows?.qualityRuns === 0, "summary_quality_runs_not_zero");
invariant(summary.safetyDefaults?.lifecycleStatus === "DISCOVERED", "summary_lifecycle_mismatch");
invariant(summary.safetyDefaults?.versionStatus === "WRITING", "summary_version_status_mismatch");
invariant(summary.safetyDefaults?.indexEligibility === "BLOCKED", "summary_index_status_mismatch");
invariant(summary.safetyDefaults?.bulkImportApproved === false, "summary_import_unexpectedly_approved");
invariant(summary.planArtifact?.sha256 === EXPECTED_PLAN_SHA256, "summary_plan_hash_mismatch");
invariant(summary.planArtifact?.bytes === EXPECTED_PLAN_BYTES, "summary_plan_size_mismatch");
invariant(summary.planArtifact?.records === EXPECTED_RECORDS, "summary_plan_records_mismatch");

const reader = readline.createInterface({
  input: fs.createReadStream(PLAN, { encoding: "utf8" }),
  crlfDelay: Infinity,
});

const packageHasher = crypto.createHash("sha256");
const batches = [];
let totalBytes = 0;
let totalRecords = 0;
let current = null;

function openBatch(batchIndex, firstOrdinal, firstSlug) {
  const fileName = `batch-${String(batchIndex).padStart(3, "0")}.jsonl`;
  const filePath = path.join(BATCH_DIR, fileName);
  return {
    batchIndex,
    fileName,
    filePath,
    fd: fs.openSync(filePath, "w", 0o600),
    hasher: crypto.createHash("sha256"),
    records: 0,
    bytes: 0,
    firstOrdinal,
    lastOrdinal: firstOrdinal,
    firstSlug,
    lastSlug: firstSlug,
  };
}

function closeBatch(batch) {
  fs.closeSync(batch.fd);
  fs.chmodSync(batch.filePath, 0o600);
  const digest = batch.hasher.digest("hex");
  const stat = fs.statSync(batch.filePath);
  invariant(stat.size === batch.bytes, "batch_size_tracking_mismatch", {
    batchIndex: batch.batchIndex,
    tracked: batch.bytes,
    actual: stat.size,
  });
  batches.push({
    batchIndex: batch.batchIndex,
    file: `batches/${batch.fileName}`,
    firstOrdinal: batch.firstOrdinal,
    lastOrdinal: batch.lastOrdinal,
    firstSlug: batch.firstSlug,
    lastSlug: batch.lastSlug,
    recordCount: batch.records,
    plannedRows: batch.records * 3,
    bytes: batch.bytes,
    sha256: digest,
  });
}

for await (const line of reader) {
  if (!line) continue;
  const ordinal = totalRecords;
  let record;
  try {
    record = JSON.parse(line);
  } catch {
    fail("plan_jsonl_invalid", { ordinal });
  }

  const slug = record?.page?.slug;
  invariant(record?.importPlanVersion === 1, "record_contract_mismatch", { ordinal, slug });
  invariant(typeof slug === "string" && slug.length > 0, "record_slug_missing", { ordinal });
  invariant(record?.source?.sourceOrdinal === ordinal, "record_source_ordinal_mismatch", {
    ordinal,
    actual: record?.source?.sourceOrdinal,
    slug,
  });
  invariant(record?.page?.workspaceId === WORKSPACE_ID, "record_workspace_mismatch", {
    ordinal,
    slug,
  });
  invariant(record?.page?.id === deterministicId("page", slug), "record_page_id_mismatch", {
    ordinal,
    slug,
  });
  invariant(
    record?.version?.id === deterministicId("version", slug),
    "record_version_id_mismatch",
    { ordinal, slug },
  );
  invariant(
    record?.fingerprint?.id === deterministicId("fingerprint", slug),
    "record_fingerprint_id_mismatch",
    { ordinal, slug },
  );
  invariant(record?.version?.pageId === record?.page?.id, "record_version_page_mismatch", {
    ordinal,
    slug,
  });
  invariant(
    record?.fingerprint?.versionId === record?.version?.id,
    "record_fingerprint_version_mismatch",
    { ordinal, slug },
  );
  invariant(record?.page?.lifecycleStatus === "DISCOVERED", "record_lifecycle_not_blocked", {
    ordinal,
    slug,
  });
  invariant(record?.page?.indexEligibility === "BLOCKED", "record_index_not_blocked", {
    ordinal,
    slug,
  });
  invariant(record?.version?.status === "WRITING", "record_version_not_writing", {
    ordinal,
    slug,
  });
  invariant(record?.deferred?.publicationRows === 0, "record_publication_intent_detected", {
    ordinal,
    slug,
  });

  const batchIndex = Math.floor(ordinal / BATCH_RECORDS) + 1;
  if (current === null) {
    current = openBatch(batchIndex, ordinal, slug);
  } else if (current.batchIndex !== batchIndex) {
    closeBatch(current);
    current = openBatch(batchIndex, ordinal, slug);
  }

  const serialized = `${line}\n`;
  const bytes = Buffer.byteLength(serialized);
  fs.writeSync(current.fd, serialized);
  current.hasher.update(serialized);
  packageHasher.update(serialized);
  current.records += 1;
  current.bytes += bytes;
  current.lastOrdinal = ordinal;
  current.lastSlug = slug;
  totalRecords += 1;
  totalBytes += bytes;
}

if (current !== null) closeBatch(current);

const packageSha256 = packageHasher.digest("hex");
invariant(totalRecords === EXPECTED_RECORDS, "package_record_count_mismatch", {
  expected: EXPECTED_RECORDS,
  actual: totalRecords,
});
invariant(totalBytes === EXPECTED_PLAN_BYTES, "package_total_bytes_mismatch", {
  expected: EXPECTED_PLAN_BYTES,
  actual: totalBytes,
});
invariant(packageSha256 === EXPECTED_PLAN_SHA256, "package_recombined_hash_mismatch", {
  expected: EXPECTED_PLAN_SHA256,
  actual: packageSha256,
});
invariant(batches.length === EXPECTED_BATCHES, "package_batch_count_mismatch", {
  expected: EXPECTED_BATCHES,
  actual: batches.length,
});
invariant(batches.slice(0, -1).every((batch) => batch.recordCount === BATCH_RECORDS), "full_batch_size_mismatch");
invariant(
  batches.at(-1)?.recordCount === EXPECTED_RECORDS % BATCH_RECORDS,
  "final_batch_size_mismatch",
  { expected: EXPECTED_RECORDS % BATCH_RECORDS, actual: batches.at(-1)?.recordCount },
);

const manifest = {
  releaseId: RELEASE_ID,
  parentReleaseId: PARENT_RELEASE_ID,
  packageContractVersion: 1,
  createdAt: new Date().toISOString(),
  sourcePlan: {
    sha256: planSha256,
    bytes: planStat.size,
    recordCount: EXPECTED_RECORDS,
    plannedRows: EXPECTED_TOTAL_ROWS,
  },
  batchContract: {
    recordsPerBatch: BATCH_RECORDS,
    batchCount: batches.length,
    fullBatchCount: batches.length - 1,
    finalBatchRecords: batches.at(-1).recordCount,
    rowKindsPerRecord: 3,
  },
  recombination: {
    sha256: packageSha256,
    bytes: totalBytes,
    exactSourcePlanMatch: true,
  },
  safetyDefaults: {
    lifecycleStatus: "DISCOVERED",
    versionStatus: "WRITING",
    indexEligibility: "BLOCKED",
    publications: 0,
    qualityRuns: 0,
    editorialReviews: 0,
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
  batches,
};

const manifestText = `${JSON.stringify(manifest, null, 2)}\n`;
writePrivate(MANIFEST_PATH, manifestText);
const manifestSha256 = sha256(manifestText);
const manifestBytes = Buffer.byteLength(manifestText);

const status = [
  "BLOG_IMPORT_BATCH_PACKAGE_STATUS=PASS",
  `RELEASE_ID=${RELEASE_ID}`,
  "PACKAGE_CONTRACT_VERSION=1",
  "SOURCE_PLAN_HASH_VERIFIED=YES",
  "SOURCE_PLAN_SIZE_VERIFIED=YES",
  `SOURCE_RECORD_COUNT=${EXPECTED_RECORDS}`,
  `SOURCE_TOTAL_ROWS=${EXPECTED_TOTAL_ROWS}`,
  `BATCH_RECORDS=${BATCH_RECORDS}`,
  `BATCH_COUNT=${batches.length}`,
  `FULL_BATCH_COUNT=${batches.length - 1}`,
  `FINAL_BATCH_RECORDS=${batches.at(-1).recordCount}`,
  `PACKAGE_RECOMBINED_SHA256=${packageSha256}`,
  `PACKAGE_RECOMBINED_BYTES=${totalBytes}`,
  "PACKAGE_EXACT_SOURCE_PLAN_MATCH=YES",
  `MANIFEST_SHA256=${manifestSha256}`,
  `MANIFEST_BYTES=${manifestBytes}`,
  "DEFAULT_LIFECYCLE_STATUS=DISCOVERED",
  "DEFAULT_VERSION_STATUS=WRITING",
  "DEFAULT_INDEX_ELIGIBILITY=BLOCKED",
  "PLANNED_PUBLICATIONS=0",
  "PLANNED_QUALITY_RUNS=0",
  "PLANNED_EDITORIAL_REVIEWS=0",
  "BULK_IMPORT_APPROVED=NO",
  "PRODUCTION_WRITE_APPROVED=NO",
  "DATABASE_READ_PERFORMED=NO",
  "DATABASE_WRITE_PERFORMED=NO",
  "PRODUCTION_FILES_MODIFIED=NO",
  `MANIFEST=${MANIFEST_PATH}`,
  `BATCH_DIRECTORY=${BATCH_DIR}`,
  `REPORT=${OUT}`,
].join("\n");

writePrivate(STATUS_PATH, `${status}\n`);
writePrivate(
  DETAILS_PATH,
  `${JSON.stringify(
    {
      releaseId: RELEASE_ID,
      status: "PASS",
      manifestSha256,
      manifestBytes,
      batchCount: batches.length,
      totalRecords,
      totalBytes,
      packageSha256,
    },
    null,
    2,
  )}\n`,
);

console.log(status);
