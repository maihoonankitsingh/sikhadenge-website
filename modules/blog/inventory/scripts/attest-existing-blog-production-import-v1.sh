#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

IMPORT_REPORT="${1:-}"
OUT="${2:-/var/lib/sikhadenge-blog-artifacts/existing-blog-production-import-attestation-v1-$(date +%Y%m%d_%H%M%S)}"

EXPECTED_RECORDS='120097'
EXPECTED_TOTAL_ROWS='360291'
EXPECTED_BATCHES='121'
EXPECTED_WORKSPACE_ID='blog-workspace-sikhadenge-v1'
EXPECTED_WORKSPACE_KEY='sikhadenge-blog'
EXPECTED_PUBLIC_BLOG_OID='20331'
EXPECTED_PUBLIC_TABLES='43'
EXPECTED_MANIFEST_SHA256='5659094b972e2806310cd1a3d72ef19e26f1106df14b6a38b545759fc5d9fe0a'
EXPECTED_PLAN_SHA256='66fa51adf700467f66d8118f0dc979ca2abd24947dceea893d1b4197a6898cca'
STATUS="$OUT/status.txt"
DETAILS="$OUT/attestation.json"

fail() {
  mkdir -p "$OUT"
  chmod 700 "$OUT"
  printf 'BLOG_EXISTING_PRODUCTION_IMPORT_ATTESTATION_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" | tee "$STATUS" >&2
  exit 1
}

for command_name in node psql grep find wc awk tee date stat; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "${DATABASE_URL:-}" || fail 'DATABASE_URL_missing'
test -n "$IMPORT_REPORT" && test -d "$IMPORT_REPORT" || fail 'import_report_missing'
test -s "$IMPORT_REPORT/status.txt" || fail 'import_status_missing'
mkdir -p "$OUT"
chmod 700 "$OUT"

for required in \
  'BLOG_EXISTING_PRODUCTION_IMPORT_STATUS=PASS' \
  'EXPLICIT_APPROVAL_VERIFIED=YES' \
  'BATCH_COUNT=121' \
  'IMPORTED_PAGES=120097' \
  'IMPORTED_PAGE_VERSIONS=120097' \
  'IMPORTED_CONTENT_FINGERPRINTS=120097' \
  'IMPORTED_TOTAL_ROWS=360291' \
  'PUBLICATIONS=0' \
  'QUALITY_RUNS=0' \
  'EDITORIAL_REVIEWS=0' \
  'DEFAULT_LIFECYCLE_STATUS=DISCOVERED' \
  'DEFAULT_VERSION_STATUS=WRITING' \
  'DEFAULT_INDEX_ELIGIBILITY=BLOCKED' \
  'PER_BATCH_TRANSACTION_COMMITTED=YES' \
  'PUBLIC_BLOG_OID_UNCHANGED=YES'; do
  grep -Fqx "$required" "$IMPORT_REPORT/status.txt" || fail "import_status_contract_mismatch:${required}"
done

grep -Fqx "MANIFEST_SHA256=$EXPECTED_MANIFEST_SHA256" "$IMPORT_REPORT/status.txt" || fail 'manifest_hash_evidence_mismatch'
grep -Fqx "SOURCE_PLAN_SHA256=$EXPECTED_PLAN_SHA256" "$IMPORT_REPORT/status.txt" || fail 'plan_hash_evidence_mismatch'

node - "$IMPORT_REPORT" "$EXPECTED_BATCHES" "$EXPECTED_RECORDS" <<'NODE'
const fs = require('node:fs');
const path = require('node:path');
const [report, expectedBatchesRaw, expectedRecordsRaw] = process.argv.slice(2);
const expectedBatches = Number(expectedBatchesRaw);
const expectedRecords = Number(expectedRecordsRaw);
const files = fs.readdirSync(report).filter((name) => /^batch-\d{3}\.pass$/.test(name)).sort();
if (files.length !== expectedBatches) throw new Error('batch_marker_count_mismatch');
let records = 0;
for (let i = 1; i <= expectedBatches; i += 1) {
  const name = `batch-${String(i).padStart(3, '0')}.pass`;
  if (files[i - 1] !== name) throw new Error(`batch_marker_sequence_mismatch:${i}`);
  const fields = fs.readFileSync(path.join(report, name), 'utf8').trim().split('\t');
  if (fields.length !== 8 || fields[0] !== 'PASS' || Number(fields[1]) !== i) {
    throw new Error(`batch_marker_contract_mismatch:${i}`);
  }
  const count = Number(fields[2]);
  if (!Number.isInteger(count) || count <= 0) throw new Error(`batch_marker_record_count_invalid:${i}`);
  if (i < expectedBatches && count !== 1000) throw new Error(`full_batch_record_count_mismatch:${i}`);
  if (i === expectedBatches && count !== 97) throw new Error('final_batch_record_count_mismatch');
  records += count;
}
if (records !== expectedRecords) throw new Error('batch_marker_record_total_mismatch');
NODE

DB_RESULT="$(psql "$DATABASE_URL" -X -qAt -F'|' <<SQL
BEGIN TRANSACTION READ ONLY;
SET LOCAL statement_timeout = '300s';
SELECT
  (SELECT count(*) FROM blog_content.workspaces),
  (SELECT count(*) FROM blog_content.workspaces WHERE id='${EXPECTED_WORKSPACE_ID}' AND key='${EXPECTED_WORKSPACE_KEY}'),
  (SELECT count(*) FROM blog_content.pages),
  (SELECT count(DISTINCT slug) FROM blog_content.pages),
  (SELECT count(DISTINCT "canonicalPath") FROM blog_content.pages),
  (SELECT count(DISTINCT "sourceRecordKey") FROM blog_content.pages),
  (SELECT count(*) FROM blog_content.pages WHERE "workspaceId"='${EXPECTED_WORKSPACE_ID}' AND "lifecycleStatus"::text='DISCOVERED' AND "indexEligibility"::text='BLOCKED'),
  (SELECT count(*) FROM blog_content.pages WHERE metadata->>'requiresResearch'='true' AND metadata->>'requiresQualityGate'='true' AND metadata->>'requiresEditorialApproval'='true' AND metadata->>'publicationBlocked'='true'),
  (SELECT count(*) FROM blog_content.page_versions),
  (SELECT count(DISTINCT "pageId") FROM blog_content.page_versions),
  (SELECT count(DISTINCT "exactHash") FROM blog_content.page_versions),
  (SELECT count(*) FROM blog_content.page_versions WHERE status::text='WRITING' AND origin::text='MIGRATED' AND "sourceCoverage"=0 AND "originalityScore"=0 AND "qualityScore"=0),
  (SELECT count(*) FROM blog_content.content_fingerprints),
  (SELECT count(DISTINCT "versionId") FROM blog_content.content_fingerprints),
  (SELECT count(DISTINCT "scopeKey") FROM blog_content.content_fingerprints),
  (SELECT count(*) FROM blog_content.content_fingerprints WHERE scope='legacy-source-record'),
  (SELECT count(*) FROM blog_content.publications),
  (SELECT count(*) FROM blog_content.quality_runs),
  (SELECT count(*) FROM blog_content.editorial_reviews),
  (SELECT count(*) FROM blog_content.page_versions v LEFT JOIN blog_content.pages p ON p.id=v."pageId" WHERE p.id IS NULL),
  (SELECT count(*) FROM blog_content.content_fingerprints f LEFT JOIN blog_content.page_versions v ON v.id=f."versionId" WHERE v.id IS NULL),
  COALESCE(to_regclass('public."Blog"')::oid::text,'NULL'),
  (SELECT count(*) FROM pg_tables WHERE schemaname='public'),
  pg_database_size(current_database());
COMMIT;
SQL
)"

IFS='|' read -r \
  WORKSPACES CANONICAL_WORKSPACES \
  PAGES UNIQUE_SLUGS UNIQUE_PATHS UNIQUE_SOURCE_KEYS SAFE_PAGES SAFE_METADATA \
  VERSIONS UNIQUE_VERSION_PAGES UNIQUE_EXACT_HASHES SAFE_VERSIONS \
  FINGERPRINTS UNIQUE_FINGERPRINT_VERSIONS UNIQUE_SCOPE_KEYS SAFE_FINGERPRINTS \
  PUBLICATIONS QUALITY_RUNS REVIEWS ORPHAN_VERSIONS ORPHAN_FINGERPRINTS \
  PUBLIC_BLOG_OID PUBLIC_TABLES DATABASE_BYTES <<<"$DB_RESULT"

for value_name in PAGES UNIQUE_SLUGS UNIQUE_PATHS UNIQUE_SOURCE_KEYS SAFE_PAGES SAFE_METADATA VERSIONS UNIQUE_VERSION_PAGES UNIQUE_EXACT_HASHES SAFE_VERSIONS FINGERPRINTS UNIQUE_FINGERPRINT_VERSIONS UNIQUE_SCOPE_KEYS SAFE_FINGERPRINTS; do
  value="${!value_name}"
  [ "$value" = "$EXPECTED_RECORDS" ] || fail "${value_name}_mismatch:${value}"
done

[ "$WORKSPACES" = '1' ] || fail "workspace_count_mismatch:${WORKSPACES}"
[ "$CANONICAL_WORKSPACES" = '1' ] || fail 'canonical_workspace_missing'
[ "$PUBLICATIONS" = '0' ] || fail "publication_count_not_zero:${PUBLICATIONS}"
[ "$QUALITY_RUNS" = '0' ] || fail "quality_run_count_not_zero:${QUALITY_RUNS}"
[ "$REVIEWS" = '0' ] || fail "editorial_review_count_not_zero:${REVIEWS}"
[ "$ORPHAN_VERSIONS" = '0' ] || fail "orphan_version_count_not_zero:${ORPHAN_VERSIONS}"
[ "$ORPHAN_FINGERPRINTS" = '0' ] || fail "orphan_fingerprint_count_not_zero:${ORPHAN_FINGERPRINTS}"
[ "$PUBLIC_BLOG_OID" = "$EXPECTED_PUBLIC_BLOG_OID" ] || fail "public_blog_oid_changed:${PUBLIC_BLOG_OID}"
[ "$PUBLIC_TABLES" = "$EXPECTED_PUBLIC_TABLES" ] || fail "public_table_count_changed:${PUBLIC_TABLES}"

cat > "$STATUS" <<STATUS
BLOG_EXISTING_PRODUCTION_IMPORT_ATTESTATION_STATUS=PASS
RELEASE_ID=existing-blog-production-import-v1
IMPORT_REPORT_VERIFIED=YES
BATCH_MARKERS_VERIFIED=YES
BATCH_COUNT=$EXPECTED_BATCHES
RECORD_COUNT=$EXPECTED_RECORDS
IMPORTED_PAGES=$PAGES
IMPORTED_PAGE_VERSIONS=$VERSIONS
IMPORTED_CONTENT_FINGERPRINTS=$FINGERPRINTS
IMPORTED_TOTAL_ROWS=$EXPECTED_TOTAL_ROWS
UNIQUE_SLUGS_VERIFIED=YES
UNIQUE_CANONICAL_PATHS_VERIFIED=YES
UNIQUE_SOURCE_RECORD_KEYS_VERIFIED=YES
UNIQUE_EXACT_CONTENT_HASHES_VERIFIED=YES
ONE_VERSION_PER_PAGE_VERIFIED=YES
ONE_FINGERPRINT_PER_VERSION_VERIFIED=YES
FOREIGN_KEY_RELATIONS_VERIFIED=YES
SAFETY_METADATA_VERIFIED=YES
DEFAULT_LIFECYCLE_STATUS=DISCOVERED
DEFAULT_VERSION_STATUS=WRITING
DEFAULT_INDEX_ELIGIBILITY=BLOCKED
PUBLICATIONS=$PUBLICATIONS
QUALITY_RUNS=$QUALITY_RUNS
EDITORIAL_REVIEWS=$REVIEWS
PUBLIC_BLOG_OID=$PUBLIC_BLOG_OID
PUBLIC_BLOG_OID_UNCHANGED=YES
PUBLIC_TABLE_COUNT=$PUBLIC_TABLES
PUBLIC_TABLE_COUNT_UNCHANGED=YES
DATABASE_BYTES=$DATABASE_BYTES
DATABASE_READ_PERFORMED=YES
DATABASE_WRITE_PERFORMED=NO
PRODUCTION_FILES_MODIFIED=NO
REPORT=$OUT
STATUS

node - "$DETAILS" "$IMPORT_REPORT" "$DATABASE_BYTES" <<'NODE'
const fs = require('node:fs');
const [file, importReport, databaseBytes] = process.argv.slice(2);
const details = {
  releaseId: 'existing-blog-production-import-v1',
  status: 'PASS',
  importReport,
  records: 120097,
  totalRows: 360291,
  publications: 0,
  qualityRuns: 0,
  editorialReviews: 0,
  lifecycleStatus: 'DISCOVERED',
  versionStatus: 'WRITING',
  indexEligibility: 'BLOCKED',
  publicBlogOid: 20331,
  publicTableCount: 43,
  databaseBytes: Number(databaseBytes),
  databaseReadPerformed: true,
  databaseWritePerformed: false,
};
fs.writeFileSync(file, `${JSON.stringify(details, null, 2)}\n`, { mode: 0o600 });
NODE

chmod 600 "$STATUS" "$DETAILS"
cat "$STATUS"
