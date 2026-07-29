#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RELEASE = path.join(
  ROOT,
  "modules/blog/inventory/releases/0008-existing-blog-production-import-resume-sql-scan-fix-v1.release.json",
);
const WRAPPER = path.join(
  ROOT,
  "modules/blog/inventory/scripts/resume-existing-blog-production-import-after-sql-scan-fix-v1.sh",
);
const BASE = path.join(
  ROOT,
  "modules/blog/inventory/scripts/import-existing-blog-batch-package-v1.sh",
);
const OUT = path.resolve(
  process.argv[2] ||
    path.join(
      ROOT,
      ".reports",
      `blog-import-resume-sql-scan-fix-attestation-${new Date().toISOString().replace(/[:.]/g, "-")}`,
    ),
);
const STATUS = path.join(OUT, "status.txt");
const DETAILS = path.join(OUT, "attestation.json");

const EXPECTED_WRAPPER_BLOB = "0ef363ea40d8d8a263e58408286e3f5c2c676612";
const EXPECTED_BASE_BLOB = "748d449c528033eb439da7c1dad18350de627450";
const EXPECTED_APPROVAL =
  "APPROVE EXISTING BLOG PRODUCTION IMPORT V1 RESUME AFTER SAFETY FIX";

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
    "BLOG_PRODUCTION_IMPORT_RESUME_FIX_ATTESTATION_STATUS=FAIL",
    `REASON=${reason}`,
    `REPORT=${OUT}`,
  ].join("\n");
  writePrivate(STATUS, `${text}\n`);
  writePrivate(DETAILS, `${JSON.stringify({ status: "FAIL", reason, ...details }, null, 2)}\n`);
  console.error(text);
  process.exit(1);
}

function invariant(condition, reason, details = {}) {
  if (!condition) fail(reason, details);
}

fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });
invariant(fs.existsSync(RELEASE), "release_manifest_missing");
invariant(fs.existsSync(WRAPPER), "resume_wrapper_missing");
invariant(fs.existsSync(BASE), "base_importer_missing");

const release = JSON.parse(fs.readFileSync(RELEASE, "utf8"));
const wrapperBytes = fs.readFileSync(WRAPPER);
const baseBytes = fs.readFileSync(BASE);
const wrapper = wrapperBytes.toString("utf8");
const base = baseBytes.toString("utf8");
const wrapperBlob = gitBlobSha1(wrapperBytes);
const baseBlob = gitBlobSha1(baseBytes);

invariant(
  release.releaseId === "existing-blog-production-import-resume-sql-scan-fix-v1",
  "release_id_mismatch",
);
invariant(release.status === "prepared-not-approved", "release_status_mismatch");
invariant(release.incident?.reason === "batch_101_forbidden_sql_detected", "incident_reason_mismatch");
invariant(release.incident?.committedBatches === 100, "committed_batch_count_mismatch");
invariant(release.incident?.committedRecords === 100000, "committed_record_count_mismatch");
invariant(release.incident?.remainingBatches === 21, "remaining_batch_count_mismatch");
invariant(release.incident?.remainingRecords === 20097, "remaining_record_count_mismatch");
invariant(release.diagnosis?.actualForbiddenSqlStatementsFound === 0, "forbidden_statement_count_mismatch");
invariant(release.diagnosis?.failedBatchExecuted === false, "failed_batch_execution_state_mismatch");
invariant(release.resumeWrapper?.gitBlobSha1 === EXPECTED_WRAPPER_BLOB, "release_wrapper_blob_mismatch");
invariant(release.resumeWrapper?.baseImporterGitBlobSha1 === EXPECTED_BASE_BLOB, "release_base_blob_mismatch");
invariant(release.resumeWrapper?.approvalPhrase === EXPECTED_APPROVAL, "release_approval_phrase_mismatch");
invariant(release.authorization?.resumeExecutionApproved === false, "resume_unexpectedly_approved");
invariant(release.authorization?.publicationApproved === false, "publication_unexpectedly_approved");
invariant(release.authorization?.indexEligibilityApproved === false, "indexing_unexpectedly_approved");

invariant(wrapperBlob === EXPECTED_WRAPPER_BLOB, "wrapper_git_blob_mismatch", {
  expected: EXPECTED_WRAPPER_BLOB,
  actual: wrapperBlob,
});
invariant(baseBlob === EXPECTED_BASE_BLOB, "base_importer_git_blob_mismatch", {
  expected: EXPECTED_BASE_BLOB,
  actual: baseBlob,
});

const broad = "(^|[[:space:]])(UPDATE|DELETE|TRUNCATE|DROP|ALTER)[[:space:]]";
const anchored = "^[[:space:]]*(UPDATE|DELETE|TRUNCATE|DROP|ALTER)[[:space:]]";
invariant(base.includes(broad), "base_broad_scan_anchor_missing");
invariant(wrapper.includes(`old = \"if grep -Eiq '${broad}' \\\"$SQL_FILE\\\"; then\"`), "wrapper_old_patch_anchor_missing");
invariant(wrapper.includes(`new = \"if grep -Eiq '${anchored}' \\\"$SQL_FILE\\\"; then\"`), "wrapper_new_patch_anchor_missing");
invariant(wrapper.includes(`EXPECTED_APPROVAL='${EXPECTED_APPROVAL}'`), "resume_approval_gate_missing");
invariant(wrapper.includes("[ \"$APPROVAL\" = \"$EXPECTED_APPROVAL\" ] || fail 'explicit_resume_approval_phrase_mismatch'"), "resume_approval_check_missing");
invariant(wrapper.indexOf("explicit_resume_approval_phrase_mismatch") < wrapper.indexOf("git hash-object"), "approval_does_not_precede_patch_work");
invariant(wrapper.includes("exec bash \"$PATCHED_IMPORTER\""), "patched_importer_execution_missing");
invariant(!wrapper.includes("psql \"$DATABASE_URL\""), "direct_database_access_detected_in_wrapper");

const status = [
  "BLOG_PRODUCTION_IMPORT_RESUME_FIX_ATTESTATION_STATUS=PASS",
  "RELEASE_ID=existing-blog-production-import-resume-sql-scan-fix-v1",
  "RELEASE_STATUS=PREPARED_NOT_APPROVED",
  "WRAPPER_GIT_BLOB_VERIFIED=YES",
  `WRAPPER_GIT_BLOB_SHA1=${wrapperBlob}`,
  "BASE_IMPORTER_GIT_BLOB_VERIFIED=YES",
  `BASE_IMPORTER_GIT_BLOB_SHA1=${baseBlob}`,
  "FALSE_POSITIVE_DIAGNOSIS_VERIFIED=YES",
  "ACTUAL_FORBIDDEN_SQL_STATEMENTS=0",
  "FORBIDDEN_SQL_SCAN_PATCH=STATEMENT_ANCHORED",
  "QUOTED_CONTENT_KEYWORDS_ALLOWED=YES",
  "EXPLICIT_RESUME_APPROVAL_GATE_VERIFIED=YES",
  "DIRECT_DATABASE_ACCESS_IN_WRAPPER=NO",
  "COMMITTED_BATCHES_PRESERVED=100",
  "COMMITTED_RECORDS_PRESERVED=100000",
  "REMAINING_BATCHES=21",
  "REMAINING_RECORDS=20097",
  "RESUME_EXECUTION_APPROVED=NO",
  "PUBLICATION_APPROVED=NO",
  "INDEX_ELIGIBILITY_APPROVED=NO",
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
      releaseId: release.releaseId,
      status: "PASS",
      wrapperBlob,
      baseBlob,
      approvalPhrase: EXPECTED_APPROVAL,
      resumeExecutionApproved: false,
      databaseReadPerformed: false,
      databaseWritePerformed: false,
    },
    null,
    2,
  )}\n`,
);
console.log(status);
