#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RELEASE_PATH = path.join(
  ROOT,
  "modules/blog/inventory/releases/0006-existing-blog-production-importer-v1.release.json",
);
const IMPORTER_PATH = path.join(
  ROOT,
  "modules/blog/inventory/scripts/import-existing-blog-batch-package-v1.sh",
);
const OUT = path.resolve(
  process.argv[2] ||
    path.join(
      ROOT,
      ".reports",
      `blog-production-importer-v1-attestation-${new Date().toISOString().replace(/[:.]/g, "-")}`,
    ),
);
const STATUS = path.join(OUT, "status.txt");
const DETAILS = path.join(OUT, "attestation.json");

const EXPECTED_RELEASE_ID = "existing-blog-production-importer-v1";
const EXPECTED_IMPORTER_BLOB = "748d449c528033eb439da7c1dad18350de627450";
const EXPECTED_APPROVAL = "APPROVE EXISTING BLOG PRODUCTION IMPORT V1";
const EXPECTED_MANIFEST_SHA256 =
  "5659094b972e2806310cd1a3d72ef19e26f1106df14b6a38b545759fc5d9fe0a";
const EXPECTED_PLAN_SHA256 =
  "66fa51adf700467f66d8118f0dc979ca2abd24947dceea893d1b4197a6898cca";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function gitBlobSha1(bytes) {
  const header = Buffer.from(`blob ${bytes.length}\0`, "utf8");
  return crypto.createHash("sha1").update(header).update(bytes).digest("hex");
}

function writePrivate(filePath, content) {
  fs.writeFileSync(filePath, content, { mode: 0o600 });
  fs.chmodSync(filePath, 0o600);
}

function fail(reason, details = {}) {
  fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });
  const text = [
    "BLOG_PRODUCTION_IMPORTER_ATTESTATION_STATUS=FAIL",
    `REASON=${reason}`,
    `REPORT=${OUT}`,
  ].join("\n");
  writePrivate(STATUS, `${text}\n`);
  writePrivate(
    DETAILS,
    `${JSON.stringify({ releaseId: EXPECTED_RELEASE_ID, status: "FAIL", reason, ...details }, null, 2)}\n`,
  );
  console.error(text);
  process.exit(1);
}

function invariant(condition, reason, details = {}) {
  if (!condition) fail(reason, details);
}

fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });
invariant(fs.existsSync(RELEASE_PATH), "release_manifest_missing");
invariant(fs.existsSync(IMPORTER_PATH), "importer_source_missing");

const release = readJson(RELEASE_PATH);
const importerBytes = fs.readFileSync(IMPORTER_PATH);
const importer = importerBytes.toString("utf8");
const importerBlob = gitBlobSha1(importerBytes);

invariant(release.releaseId === EXPECTED_RELEASE_ID, "release_id_mismatch");
invariant(release.status === "prepared-not-approved", "release_status_mismatch");
invariant(release.parentReleaseId === "existing-blog-import-batch-artifact-v1", "parent_release_mismatch");
invariant(release.sourcePlan?.sha256 === EXPECTED_PLAN_SHA256, "release_plan_hash_mismatch");
invariant(release.sourcePlan?.bytes === 512082000, "release_plan_size_mismatch");
invariant(release.sourcePlan?.recordCount === 120097, "release_record_count_mismatch");
invariant(release.sourcePlan?.plannedRows === 360291, "release_row_count_mismatch");
invariant(
  release.batchPackage?.manifestSha256 === EXPECTED_MANIFEST_SHA256,
  "release_manifest_hash_mismatch",
);
invariant(release.batchPackage?.manifestBytes === 55691, "release_manifest_size_mismatch");
invariant(release.batchPackage?.batchCount === 121, "release_batch_count_mismatch");
invariant(release.batchPackage?.recordsPerFullBatch === 1000, "release_batch_size_mismatch");
invariant(release.batchPackage?.finalBatchRecords === 97, "release_final_batch_mismatch");
invariant(release.importer?.path.endsWith("import-existing-blog-batch-package-v1.sh"), "release_importer_path_mismatch");
invariant(release.importer?.gitBlobSha1 === EXPECTED_IMPORTER_BLOB, "release_importer_blob_mismatch");
invariant(release.importer?.approvalPhrase === EXPECTED_APPROVAL, "release_approval_phrase_mismatch");
invariant(release.importer?.perBatchTransaction === true, "release_batch_transaction_disabled");
invariant(release.importer?.idempotentResume === true, "release_resume_disabled");
invariant(release.importer?.exactPostInsertVerification === true, "release_post_verification_disabled");
invariant(importerBlob === EXPECTED_IMPORTER_BLOB, "importer_git_blob_mismatch", {
  expected: EXPECTED_IMPORTER_BLOB,
  actual: importerBlob,
});

invariant(
  JSON.stringify(release.allowedDatabaseWrites) ===
    JSON.stringify({
      schemas: ["blog_content"],
      tables: ["pages", "page_versions", "content_fingerprints"],
      operations: ["INSERT"],
      rowKindsPerRecord: 3,
    }),
  "allowed_write_contract_mismatch",
);
invariant(
  JSON.stringify(release.forbiddenDatabaseWrites?.operations) ===
    JSON.stringify(["UPDATE", "DELETE", "TRUNCATE", "DROP", "ALTER"]),
  "forbidden_operation_contract_mismatch",
);
invariant(release.safetyDefaults?.workspaceId === "blog-workspace-sikhadenge-v1", "workspace_default_mismatch");
invariant(release.safetyDefaults?.lifecycleStatus === "DISCOVERED", "lifecycle_default_mismatch");
invariant(release.safetyDefaults?.versionStatus === "WRITING", "version_default_mismatch");
invariant(release.safetyDefaults?.versionOrigin === "MIGRATED", "version_origin_mismatch");
invariant(release.safetyDefaults?.indexEligibility === "BLOCKED", "index_default_mismatch");
invariant(release.safetyDefaults?.sourceCoverage === 0, "source_coverage_default_mismatch");
invariant(release.safetyDefaults?.originalityScore === 0, "originality_default_mismatch");
invariant(release.safetyDefaults?.qualityScore === 0, "quality_default_mismatch");
invariant(release.safetyDefaults?.publications === 0, "publication_default_mismatch");
invariant(release.safetyDefaults?.qualityRuns === 0, "quality_run_default_mismatch");
invariant(release.safetyDefaults?.editorialReviews === 0, "review_default_mismatch");
invariant(release.authorization?.bulkImportApproved === false, "bulk_import_unexpectedly_approved");
invariant(release.authorization?.productionWriteApproved === false, "production_write_unexpectedly_approved");
invariant(release.authorization?.executionApproved === false, "execution_unexpectedly_approved");
invariant(release.authorization?.publicationApproved === false, "publication_unexpectedly_approved");
invariant(release.authorization?.indexEligibilityApproved === false, "indexing_unexpectedly_approved");

const requiredFragments = [
  "set -Eeuo pipefail",
  `EXPECTED_APPROVAL='${EXPECTED_APPROVAL}'`,
  '[ "$APPROVAL" = "$EXPECTED_APPROVAL" ] || fail \'explicit_approval_phrase_mismatch\'',
  `EXPECTED_MANIFEST_SHA256='${EXPECTED_MANIFEST_SHA256}'`,
  `EXPECTED_PLAN_SHA256='${EXPECTED_PLAN_SHA256}'`,
  "flock -n 9 || fail 'another_blog_production_import_is_running'",
  "readiness_report_older_than_6h",
  "DATABASE_BACKUP_VERIFIED=YES",
  "BLOG_PRODUCTION_IMPORT_READINESS_V2_STATUS=PASS",
  "ON CONFLICT (id) DO NOTHING",
  "BEGIN;",
  "COMMIT;",
  "BLOG_PRODUCTION_IMPORT_BATCH_VERIFIED=",
  "Batch page verification failed",
  "Batch version verification failed",
  "Batch fingerprint verification failed",
  "Unexpected publication row detected",
  "DEFAULT_LIFECYCLE_STATUS=DISCOVERED",
  "DEFAULT_VERSION_STATUS=WRITING",
  "DEFAULT_INDEX_ELIGIBILITY=BLOCKED",
  "RESUMABLE_IDEMPOTENT_BATCHES=YES",
  "PUBLIC_BLOG_OID_UNCHANGED=YES",
];
for (const fragment of requiredFragments) {
  invariant(importer.includes(fragment), "required_importer_fragment_missing", { fragment });
}

const approvalGuardIndex = importer.indexOf('[ "$APPROVAL" = "$EXPECTED_APPROVAL" ]');
const firstDatabaseReadIndex = importer.indexOf("read -r WORKSPACE_COUNT");
const batchExecutionIndex = importer.indexOf('psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1 -f "$SQL_FILE"');
invariant(approvalGuardIndex >= 0, "approval_guard_missing");
invariant(firstDatabaseReadIndex > approvalGuardIndex, "database_access_precedes_approval_guard");
invariant(batchExecutionIndex > approvalGuardIndex, "batch_execution_precedes_approval_guard");

const generatedWritePatterns = [
  /sql\.push\(`UPDATE\s/i,
  /sql\.push\(`DELETE\s/i,
  /sql\.push\(`TRUNCATE\s/i,
  /sql\.push\(`DROP\s/i,
  /sql\.push\(`ALTER\s/i,
  /sql\.push\(`INSERT\s+INTO\s+blog_content\.publications/i,
  /sql\.push\(`INSERT\s+INTO\s+blog_content\.quality_runs/i,
  /sql\.push\(`INSERT\s+INTO\s+blog_content\.editorial_reviews/i,
  /sql\.push\(`INSERT\s+INTO\s+public\./i,
];
for (const pattern of generatedWritePatterns) {
  invariant(!pattern.test(importer), "forbidden_generated_sql_detected", { pattern: String(pattern) });
}

const allowedInsertTargets = [
  "INSERT INTO blog_content.pages",
  "INSERT INTO blog_content.page_versions",
  "INSERT INTO blog_content.content_fingerprints",
];
for (const target of allowedInsertTargets) {
  invariant(importer.includes(target), "allowed_insert_target_missing", { target });
}

invariant(
  (importer.match(/INSERT INTO blog_content\.pages/g) || []).length === 1,
  "page_insert_generator_count_mismatch",
);
invariant(
  (importer.match(/INSERT INTO blog_content\.page_versions/g) || []).length === 1,
  "version_insert_generator_count_mismatch",
);
invariant(
  (importer.match(/INSERT INTO blog_content\.content_fingerprints/g) || []).length === 1,
  "fingerprint_insert_generator_count_mismatch",
);
invariant(!importer.includes("INSERT INTO public."), "public_schema_insert_detected");
invariant(!importer.includes("indexEligibility='ELIGIBLE'"), "eligible_indexing_assignment_detected");
invariant(!importer.includes("indexEligibility='INDEXED'"), "indexed_assignment_detected");
invariant(!importer.includes("status='PUBLISHED'"), "published_status_assignment_detected");

const status = [
  "BLOG_PRODUCTION_IMPORTER_ATTESTATION_STATUS=PASS",
  `RELEASE_ID=${EXPECTED_RELEASE_ID}`,
  "RELEASE_STATUS=PREPARED_NOT_APPROVED",
  "IMPORTER_GIT_BLOB_VERIFIED=YES",
  `IMPORTER_GIT_BLOB_SHA1=${importerBlob}`,
  "EXPLICIT_APPROVAL_GATE_VERIFIED=YES",
  "APPROVAL_PRECEDES_DATABASE_ACCESS=YES",
  "FRESH_READINESS_GATE_VERIFIED=YES",
  "DATABASE_BACKUP_GATE_VERIFIED=YES",
  "GLOBAL_IMPORT_LOCK_VERIFIED=YES",
  "PER_BATCH_TRANSACTION_VERIFIED=YES",
  "IDEMPOTENT_RESUME_VERIFIED=YES",
  "EXACT_POST_INSERT_VERIFICATION_VERIFIED=YES",
  "ALLOWED_INSERT_TARGETS_VERIFIED=YES",
  "FORBIDDEN_SQL_GENERATION_ABSENT=YES",
  "PUBLIC_SCHEMA_WRITES_ABSENT=YES",
  "PUBLICATION_WRITES_ABSENT=YES",
  "QUALITY_RUN_WRITES_ABSENT=YES",
  "EDITORIAL_REVIEW_WRITES_ABSENT=YES",
  "INDEXING_ENABLEMENT_ABSENT=YES",
  "DEFAULT_LIFECYCLE_STATUS=DISCOVERED",
  "DEFAULT_VERSION_STATUS=WRITING",
  "DEFAULT_INDEX_ELIGIBILITY=BLOCKED",
  "BATCH_COUNT=121",
  "TARGET_RECORDS=120097",
  "TARGET_TOTAL_ROWS=360291",
  "BULK_IMPORT_APPROVED=NO",
  "PRODUCTION_WRITE_APPROVED=NO",
  "EXECUTION_APPROVED=NO",
  "DATABASE_READ_PERFORMED=NO",
  "DATABASE_WRITE_PERFORMED=NO",
  "PRODUCTION_FILES_MODIFIED=NO",
  `REPORT=${OUT}`,
].join("\n");

writePrivate(STATUS, `${status}\n`);
writePrivate(
  DETAILS,
  `${JSON.stringify(
    {
      releaseId: EXPECTED_RELEASE_ID,
      status: "PASS",
      importerBlob,
      importerBytes: importerBytes.length,
      approvalPhrase: EXPECTED_APPROVAL,
      executionApproved: false,
      databaseReadPerformed: false,
      databaseWritePerformed: false,
    },
    null,
    2,
  )}\n`,
);
console.log(status);
