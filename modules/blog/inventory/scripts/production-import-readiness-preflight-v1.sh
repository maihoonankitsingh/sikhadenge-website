#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

PLAN="${1:-}"
PLAN_SUMMARY="${2:-}"
BATCH_REPORT="${3:-}"
OUT="${4:-/tmp/blog-production-import-readiness-$(date +%Y%m%d_%H%M%S)}"

EXPECTED_PLAN_SHA256='66fa51adf700467f66d8118f0dc979ca2abd24947dceea893d1b4197a6898cca'
EXPECTED_PLAN_BYTES='512082000'
EXPECTED_PLAN_RECORDS='120097'
EXPECTED_WORKSPACE_ID='blog-workspace-sikhadenge-v1'
EXPECTED_WORKSPACE_KEY='sikhadenge-blog'
EXPECTED_BATCH_RECORDS='1000'
MIN_FREE_BYTES='5368709120'
MAX_BACKUP_AGE_SECONDS='86400'
LOCK='/var/lock/sikhadenge-blog-production-import-readiness.lock'
STATUS="$OUT/status.txt"
DETAILS="$OUT/details.txt"

fail() {
  mkdir -p "$OUT"
  printf 'BLOG_PRODUCTION_IMPORT_READINESS_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" | tee "$STATUS" >&2
  exit 1
}

for command_name in psql pg_restore sha256sum stat find sort head df awk date flock node; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "${DATABASE_URL:-}" || fail 'DATABASE_URL_missing'
test -n "$PLAN" && test -s "$PLAN" || fail 'plan_missing'
test -n "$PLAN_SUMMARY" && test -s "$PLAN_SUMMARY" || fail 'plan_summary_missing'
test -n "$BATCH_REPORT" && test -d "$BATCH_REPORT" || fail 'batch_report_missing'
test -s "$BATCH_REPORT/status.txt" || fail 'batch_status_missing'
mkdir -p "$OUT"

exec 9>"$LOCK"
flock -n 9 || fail 'another_blog_import_readiness_check_is_running'

PLAN_SHA256="$(sha256sum "$PLAN" | awk '{print $1}')"
PLAN_BYTES="$(stat -c '%s' "$PLAN")"
test "$PLAN_SHA256" = "$EXPECTED_PLAN_SHA256" || fail 'plan_hash_mismatch'
test "$PLAN_BYTES" = "$EXPECTED_PLAN_BYTES" || fail 'plan_size_mismatch'

node - "$PLAN_SUMMARY" <<'NODE' || exit 41
const fs = require('node:fs');
const p = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const ok =
  p.importPlanVersion === 1 &&
  p.source?.sourceRecordCount === 120097 &&
  p.plannedRows?.pages === 120097 &&
  p.plannedRows?.pageVersions === 120097 &&
  p.plannedRows?.contentFingerprints === 120097 &&
  p.plannedRows?.total === 360291 &&
  p.plannedRows?.publications === 0 &&
  p.plannedRows?.qualityRuns === 0 &&
  p.safetyDefaults?.lifecycleStatus === 'DISCOVERED' &&
  p.safetyDefaults?.versionStatus === 'WRITING' &&
  p.safetyDefaults?.indexEligibility === 'BLOCKED' &&
  p.safetyDefaults?.bulkImportApproved === false &&
  p.planArtifact?.sha256 === '66fa51adf700467f66d8118f0dc979ca2abd24947dceea893d1b4197a6898cca' &&
  p.planArtifact?.bytes === 512082000 &&
  p.planArtifact?.records === 120097;
if (!ok) process.exit(1);
NODE
[ "$?" -eq 0 ] || fail 'plan_summary_contract_mismatch'

grep -qx 'BLOG_TRANSACTIONAL_SAMPLE_IMPORT_STATUS=PASS' "$BATCH_REPORT/status.txt" || fail 'batch_rehearsal_not_passed'
grep -qx 'SAMPLE_RECORDS=1000' "$BATCH_REPORT/status.txt" || fail 'batch_record_count_mismatch'
grep -qx 'SAMPLE_TOTAL_ROWS_INSERTED_BEFORE_ROLLBACK=3000' "$BATCH_REPORT/status.txt" || fail 'batch_total_rows_mismatch'
grep -qx 'TRANSACTION_ROLLED_BACK=YES' "$BATCH_REPORT/status.txt" || fail 'batch_rollback_not_verified'
grep -qx 'DATABASE_PERSISTENT_WRITE_PERFORMED=NO' "$BATCH_REPORT/status.txt" || fail 'batch_persistent_write_detected'
BATCH_ELAPSED_MS="$(grep '^BATCH_ELAPSED_MS=' "$BATCH_REPORT/status.txt" | tail -n1 | cut -d= -f2 || true)"
case "$BATCH_ELAPSED_MS" in ''|*[!0-9]*) fail 'batch_elapsed_ms_invalid' ;; esac

read -r WORKSPACE_COUNT CANONICAL_WORKSPACE_COUNT PAGES VERSIONS FINGERPRINTS PUBLICATIONS QUALITY_RUNS REVIEWS <<<"$(
  psql "$DATABASE_URL" -X -At -F' ' -c "
    SELECT
      (SELECT count(*) FROM blog_content.workspaces),
      (SELECT count(*) FROM blog_content.workspaces WHERE id='${EXPECTED_WORKSPACE_ID}' AND key='${EXPECTED_WORKSPACE_KEY}'),
      (SELECT count(*) FROM blog_content.pages),
      (SELECT count(*) FROM blog_content.page_versions),
      (SELECT count(*) FROM blog_content.content_fingerprints),
      (SELECT count(*) FROM blog_content.publications),
      (SELECT count(*) FROM blog_content.quality_runs),
      (SELECT count(*) FROM blog_content.editorial_reviews);
  "
)"

test "$WORKSPACE_COUNT" = '1' || fail 'workspace_count_mismatch'
test "$CANONICAL_WORKSPACE_COUNT" = '1' || fail 'canonical_workspace_missing'
test "$PAGES" = '0' || fail 'pages_not_empty'
test "$VERSIONS" = '0' || fail 'page_versions_not_empty'
test "$FINGERPRINTS" = '0' || fail 'content_fingerprints_not_empty'
test "$PUBLICATIONS" = '0' || fail 'publications_not_empty'
test "$QUALITY_RUNS" = '0' || fail 'quality_runs_not_empty'
test "$REVIEWS" = '0' || fail 'editorial_reviews_not_empty'

PUBLIC_BLOG_OID="$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text,'NULL');")"
test "$PUBLIC_BLOG_OID" != 'NULL' || fail 'public_blog_table_missing'
PUBLIC_TABLE_COUNT="$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")"
DATABASE_SIZE_BYTES="$(psql "$DATABASE_URL" -X -Atc 'SELECT pg_database_size(current_database());')"
PG_DATA_DIRECTORY="$(psql "$DATABASE_URL" -X -Atc 'SHOW data_directory;')"
test -d "$PG_DATA_DIRECTORY" || fail 'postgres_data_directory_missing'

PLAN_FS_FREE_BYTES="$(df -PB1 "$(dirname "$PLAN")" | awk 'NR==2 {print $4}')"
PG_FS_FREE_BYTES="$(df -PB1 "$PG_DATA_DIRECTORY" | awk 'NR==2 {print $4}')"
case "$PLAN_FS_FREE_BYTES:$PG_FS_FREE_BYTES" in *[!0-9:]*|'') fail 'filesystem_free_space_invalid' ;; esac
[ "$PLAN_FS_FREE_BYTES" -ge "$MIN_FREE_BYTES" ] || fail 'artifact_filesystem_free_space_below_5gb'
[ "$PG_FS_FREE_BYTES" -ge "$MIN_FREE_BYTES" ] || fail 'postgres_filesystem_free_space_below_5gb'

BACKUP="$(find /root /var/lib/sikhadenge-blog-artifacts -type f -name 'preapply-database.dump' -printf '%T@ %p\n' 2>/dev/null | sort -nr | head -n1 | cut -d' ' -f2- || true)"
test -n "$BACKUP" && test -s "$BACKUP" || fail 'verified_database_backup_missing'
pg_restore -l "$BACKUP" >/dev/null 2>&1 || fail 'database_backup_restore_list_invalid'
BACKUP_BYTES="$(stat -c '%s' "$BACKUP")"
BACKUP_MTIME="$(stat -c '%Y' "$BACKUP")"
NOW_EPOCH="$(date +%s)"
BACKUP_AGE_SECONDS="$((NOW_EPOCH - BACKUP_MTIME))"
[ "$BACKUP_AGE_SECONDS" -ge 0 ] || fail 'database_backup_timestamp_in_future'
[ "$BACKUP_AGE_SECONDS" -le "$MAX_BACKUP_AGE_SECONDS" ] || fail 'database_backup_older_than_24h'
BACKUP_SHA256="$(sha256sum "$BACKUP" | awk '{print $1}')"

BATCH_COUNT="$(( (EXPECTED_PLAN_RECORDS + EXPECTED_BATCH_RECORDS - 1) / EXPECTED_BATCH_RECORDS ))"
ESTIMATED_REHEARSAL_MS="$(( BATCH_COUNT * BATCH_ELAPSED_MS ))"

cat >"$DETAILS" <<DETAILS
plan=$PLAN
plan_summary=$PLAN_SUMMARY
batch_report=$BATCH_REPORT
backup=$BACKUP
postgres_data_directory=$PG_DATA_DIRECTORY
DETAILS

cat >"$STATUS" <<STATUS
BLOG_PRODUCTION_IMPORT_READINESS_STATUS=PASS
PLAN_HASH_VERIFIED=YES
PLAN_SIZE_VERIFIED=YES
PLAN_SUMMARY_VERIFIED=YES
BATCH_REHEARSAL_VERIFIED=YES
BATCH_REHEARSAL_RECORDS=$EXPECTED_BATCH_RECORDS
BATCH_REHEARSAL_TOTAL_ROWS=3000
BATCH_REHEARSAL_ELAPSED_MS=$BATCH_ELAPSED_MS
TARGET_RECORDS=$EXPECTED_PLAN_RECORDS
TARGET_TOTAL_ROWS=360291
RECOMMENDED_BATCH_RECORDS=$EXPECTED_BATCH_RECORDS
PROJECTED_BATCH_COUNT=$BATCH_COUNT
BENCHMARK_EXTRAPOLATION_MS=$ESTIMATED_REHEARSAL_MS
WORKSPACE_COUNT=$WORKSPACE_COUNT
CANONICAL_WORKSPACE_VERIFIED=YES
PAGES=$PAGES
PAGE_VERSIONS=$VERSIONS
CONTENT_FINGERPRINTS=$FINGERPRINTS
PUBLICATIONS=$PUBLICATIONS
QUALITY_RUNS=$QUALITY_RUNS
EDITORIAL_REVIEWS=$REVIEWS
TARGET_TABLES_EMPTY=YES
PUBLIC_BLOG_OID=$PUBLIC_BLOG_OID
PUBLIC_TABLE_COUNT=$PUBLIC_TABLE_COUNT
DATABASE_SIZE_BYTES=$DATABASE_SIZE_BYTES
PLAN_FILESYSTEM_FREE_BYTES=$PLAN_FS_FREE_BYTES
POSTGRES_FILESYSTEM_FREE_BYTES=$PG_FS_FREE_BYTES
MINIMUM_FREE_BYTES_REQUIRED=$MIN_FREE_BYTES
DISK_CAPACITY_VERIFIED=YES
DATABASE_BACKUP_VERIFIED=YES
DATABASE_BACKUP=$BACKUP
DATABASE_BACKUP_SHA256=$BACKUP_SHA256
DATABASE_BACKUP_BYTES=$BACKUP_BYTES
DATABASE_BACKUP_AGE_SECONDS=$BACKUP_AGE_SECONDS
BULK_IMPORT_APPROVED=NO
PRODUCTION_WRITE_APPROVED=NO
DATABASE_WRITE_PERFORMED=NO
PRODUCTION_FILES_MODIFIED=NO
PLAN_SHA256=$PLAN_SHA256
PLAN_BYTES=$PLAN_BYTES
REPORT=$OUT
STATUS

cat "$STATUS"
