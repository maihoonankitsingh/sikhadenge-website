#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

SQL="${1:-}"
BACKUP="${2:-}"
OUT="${3:-/tmp/blog-content-production-apply-$(date +%Y%m%d_%H%M%S)}"
APPROVAL="${4:-}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
MANIFEST="$ROOT/modules/blog/database/releases/0001-blog-content-foundation.release.json"
SCHEMA="$ROOT/modules/blog/database/schema.prisma"
GUARDS="$ROOT/modules/blog/database/sql/0001_post_schema_guards.sql"
AUDIT="$ROOT/modules/blog/database/scripts/audit-generated-sql.sh"
EXPECTED_APPROVAL='APPROVE BLOG CONTENT FOUNDATION V1 PRODUCTION APPLY'
WRAPPER="$OUT/production-apply-wrapper.sql"
LOG="$OUT/psql.log"
INDEX_LIST="$OUT/expected-indexes.txt"
LOCK="/var/lock/sikhadenge-blog-content-foundation-v1.lock"

fail() {
  printf 'BLOG_PRODUCTION_APPLY_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

for command_name in psql pg_restore sha256sum jq git flock; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "${DATABASE_URL:-}" || fail "DATABASE_URL_missing"
test -s "$SQL" || fail "migration_sql_missing"
test -s "$BACKUP" || fail "verified_backup_missing"
test -s "$MANIFEST" || fail "release_manifest_missing"
test -s "$SCHEMA" || fail "schema_missing"
test -s "$GUARDS" || fail "guard_sql_missing"
test -s "$AUDIT" || fail "isolation_audit_missing"
[ "$APPROVAL" = "$EXPECTED_APPROVAL" ] || fail "explicit_approval_phrase_mismatch"
mkdir -p "$OUT"

exec 9>"$LOCK"
flock -n 9 || fail "another_blog_foundation_apply_is_running"

jq -e '.releaseId == "blog-content-foundation-v1"' "$MANIFEST" >/dev/null 
jq -e '.status == "approved-for-production-apply"' "$MANIFEST" >/dev/null 
jq -e '.authorization.productionApplyApproved == true' "$MANIFEST" >/dev/null 
jq -e --arg phrase "$EXPECTED_APPROVAL" '.authorization.approvalStatement == $phrase' "$MANIFEST" >/dev/null

EXPECTED_SCHEMA_SHA=$(jq -r '.schema.sha256' "$MANIFEST")
EXPECTED_SQL_SHA=$(jq -r '.migration.sha256' "$MANIFEST")
EXPECTED_GUARD_BLOB=$(jq -r '.guards.gitBlobSha1' "$MANIFEST")
EXPECTED_BACKUP_SHA=$(jq -r '.productionReadiness.backupSha256' "$MANIFEST")
EXPECTED_BACKUP_BYTES=$(jq -r '.productionReadiness.backupBytes' "$MANIFEST")
EXPECTED_RESTORE_ENTRIES=$(jq -r '.productionReadiness.restoreEntryCount' "$MANIFEST")
EXPECTED_PUBLIC_TABLES=$(jq -r '.productionReadiness.publicTableCount' "$MANIFEST")

[ "$(sha256sum "$SCHEMA" | awk '{print $1}')" = "$EXPECTED_SCHEMA_SHA" ] || fail "schema_hash_mismatch"
[ "$(sha256sum "$SQL" | awk '{print $1}')" = "$EXPECTED_SQL_SHA" ] || fail "migration_hash_mismatch"
[ "$(git -C "$ROOT" hash-object "$GUARDS")" = "$EXPECTED_GUARD_BLOB" ] || fail "guard_blob_mismatch"
[ "$(sha256sum "$BACKUP" | awk '{print $1}')" = "$EXPECTED_BACKUP_SHA" ] || fail "backup_hash_mismatch"
[ "$(wc -c < "$BACKUP")" = "$EXPECTED_BACKUP_BYTES" ] || fail "backup_size_mismatch"

pg_restore --list "$BACKUP" > "$OUT/backup.restore-list.txt"
RESTORE_ENTRIES=$(grep -cE '^[0-9]+;' "$OUT/backup.restore-list.txt" || true)
[ "$RESTORE_ENTRIES" = "$EXPECTED_RESTORE_ENTRIES" ] || fail "backup_restore_entry_count_mismatch"

bash "$AUDIT" "$SQL" "$OUT/isolation-audit" >/dev/null

PRE_SCHEMA=$(psql "$DATABASE_URL" -X -Atc "SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content');")
PRE_PUBLIC_TABLES=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")
PRE_PUBLIC_BLOG_OID=$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text, 'NULL');")

[ "$PRE_SCHEMA" = "f" ] || fail "blog_content_schema_already_exists"
[ "$PRE_PUBLIC_TABLES" = "$EXPECTED_PUBLIC_TABLES" ] || fail "public_table_count_drift"
[ "$PRE_PUBLIC_BLOG_OID" != "NULL" ] || fail "public_blog_table_missing"

sed -nE 's/^CREATE (UNIQUE )?INDEX "([^"]+)".*/\2/p' "$SQL" > "$INDEX_LIST"
sed -nE 's/^CREATE (UNIQUE )?INDEX ([A-Za-z0-9_]+).*/\2/p' "$GUARDS" >> "$INDEX_LIST"
sort -u -o "$INDEX_LIST" "$INDEX_LIST"
[ "$(wc -l < "$INDEX_LIST")" -eq 69 ] || fail "expected_combined_index_count_mismatch"

{
  echo '\set ON_ERROR_STOP on'
  echo 'BEGIN;'
  echo "SET LOCAL lock_timeout = '5s';"
  echo "SET LOCAL statement_timeout = '180s';"
  echo "SET LOCAL idle_in_transaction_session_timeout = '180s';"
  cat "$SQL"
  sed -E '/^[[:space:]]*BEGIN;[[:space:]]*$/d; /^[[:space:]]*COMMIT;[[:space:]]*$/d' "$GUARDS"
  echo 'CREATE TEMP TABLE expected_blog_indexes(name text PRIMARY KEY);'
  printf "\\copy expected_blog_indexes(name) FROM '%s'\n" "$INDEX_LIST"
  cat <<SQLVERIFY
DO \$verify\$
DECLARE
  table_count integer;
  enum_count integer;
  foreign_key_count integer;
  missing_index_count integer;
  invalid_index_count integer;
  guard_constraint_count integer;
  guard_trigger_count integer;
  external_fk_count integer;
  public_table_count integer;
  public_blog_oid oid;
BEGIN
  SELECT count(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema='blog_content' AND table_type='BASE TABLE';

  SELECT count(*) INTO enum_count
  FROM pg_type t
  JOIN pg_namespace n ON n.oid=t.typnamespace
  WHERE n.nspname='blog_content' AND t.typtype='e';

  SELECT count(*) INTO foreign_key_count
  FROM pg_constraint c
  JOIN pg_namespace n ON n.oid=c.connamespace
  WHERE n.nspname='blog_content' AND c.contype='f';

  SELECT count(*) INTO missing_index_count
  FROM expected_blog_indexes e
  LEFT JOIN pg_class c ON c.relname=e.name AND c.relkind='i'
  LEFT JOIN pg_namespace n ON n.oid=c.relnamespace AND n.nspname='blog_content'
  WHERE n.oid IS NULL;

  SELECT count(*) INTO invalid_index_count
  FROM pg_index i
  JOIN pg_class c ON c.oid=i.indexrelid
  JOIN pg_namespace n ON n.oid=c.relnamespace
  WHERE n.nspname='blog_content' AND NOT i.indisvalid;

  SELECT count(*) INTO guard_constraint_count
  FROM pg_constraint
  WHERE connamespace='blog_content'::regnamespace
    AND conname IN (
      'pages_index_lifecycle_guard',
      'page_versions_source_coverage_range',
      'page_versions_originality_score_range',
      'page_versions_quality_score_range',
      'page_versions_nonnegative_counts',
      'similarity_matches_score_range',
      'similarity_matches_threshold_range',
      'similarity_matches_distinct_versions',
      'quality_runs_score_range',
      'quality_runs_nonnegative_counts',
      'quality_checks_score_range',
      'quality_checks_threshold_range',
      'refresh_jobs_single_target',
      'refresh_jobs_attempts_nonnegative',
      'claims_confidence_range',
      'claims_verified_fields_guard',
      'claims_validity_window'
    );

  SELECT count(*) INTO guard_trigger_count
  FROM pg_trigger
  WHERE tgname='publications_enforce_gate' AND NOT tgisinternal;

  SELECT count(*) INTO external_fk_count
  FROM pg_constraint c
  JOIN pg_class source_table ON source_table.oid=c.conrelid
  JOIN pg_namespace source_schema ON source_schema.oid=source_table.relnamespace
  JOIN pg_class target_table ON target_table.oid=c.confrelid
  JOIN pg_namespace target_schema ON target_schema.oid=target_table.relnamespace
  WHERE c.contype='f'
    AND source_schema.nspname='blog_content'
    AND target_schema.nspname<>'blog_content';

  SELECT count(*) INTO public_table_count
  FROM information_schema.tables
  WHERE table_schema='public' AND table_type='BASE TABLE';

  SELECT to_regclass('public."Blog"')::oid INTO public_blog_oid;

  IF table_count <> 23 THEN RAISE EXCEPTION 'Expected 23 Blog tables, found %', table_count; END IF;
  IF enum_count <> 16 THEN RAISE EXCEPTION 'Expected 16 Blog enum types, found %', enum_count; END IF;
  IF foreign_key_count <> 33 THEN RAISE EXCEPTION 'Expected 33 Blog foreign keys, found %', foreign_key_count; END IF;
  IF missing_index_count <> 0 THEN RAISE EXCEPTION 'Missing % expected Blog indexes', missing_index_count; END IF;
  IF invalid_index_count <> 0 THEN RAISE EXCEPTION 'Found % invalid Blog indexes', invalid_index_count; END IF;
  IF guard_constraint_count <> 17 THEN RAISE EXCEPTION 'Expected 17 guard constraints, found %', guard_constraint_count; END IF;
  IF guard_trigger_count <> 1 THEN RAISE EXCEPTION 'Expected one publication guard trigger, found %', guard_trigger_count; END IF;
  IF external_fk_count <> 0 THEN RAISE EXCEPTION 'Found % Blog foreign keys outside blog_content', external_fk_count; END IF;
  IF public_table_count <> ${PRE_PUBLIC_TABLES} THEN RAISE EXCEPTION 'Public table count changed from ${PRE_PUBLIC_TABLES} to %', public_table_count; END IF;
  IF public_blog_oid IS NULL OR public_blog_oid::text <> '${PRE_PUBLIC_BLOG_OID}' THEN RAISE EXCEPTION 'public.Blog identity changed'; END IF;
  IF to_regprocedure('blog_content.enforce_publication_gate()') IS NULL THEN RAISE EXCEPTION 'Publication gate function missing'; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname='pg_trgm') THEN RAISE EXCEPTION 'pg_trgm extension missing'; END IF;

  RAISE NOTICE 'BLOG_APPLY_TABLES=%', table_count;
  RAISE NOTICE 'BLOG_APPLY_ENUMS=%', enum_count;
  RAISE NOTICE 'BLOG_APPLY_FOREIGN_KEYS=%', foreign_key_count;
  RAISE NOTICE 'BLOG_APPLY_EXPECTED_INDEXES=69';
  RAISE NOTICE 'BLOG_APPLY_GUARD_CONSTRAINTS=%', guard_constraint_count;
  RAISE NOTICE 'BLOG_APPLY_GUARD_TRIGGERS=%', guard_trigger_count;
END
\$verify\$;
COMMIT;
SQLVERIFY
} > "$WRAPPER"

if ! psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1 -f "$WRAPPER" > "$LOG" 2>&1; then
  tail -n 120 "$LOG" >&2 || true
  ROLLBACK_SCHEMA=$(psql "$DATABASE_URL" -X -Atc "SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content');" || true)
  [ "$ROLLBACK_SCHEMA" = "f" ] || fail "apply_failed_and_schema_state_requires_manual_review"
  fail "production_transaction_failed_and_rolled_back"
fi

POST_SCHEMA=$(psql "$DATABASE_URL" -X -Atc "SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content');")
POST_TABLES=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='blog_content' AND table_type='BASE TABLE';")
POST_ENUMS=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM pg_type t JOIN pg_namespace n ON n.oid=t.typnamespace WHERE n.nspname='blog_content' AND t.typtype='e';")
POST_FOREIGN_KEYS=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM pg_constraint c JOIN pg_namespace n ON n.oid=c.connamespace WHERE n.nspname='blog_content' AND c.contype='f';")
POST_GUARD_TRIGGER=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM pg_trigger WHERE tgname='publications_enforce_gate' AND NOT tgisinternal;")
POST_PUBLIC_TABLES=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")
POST_PUBLIC_BLOG_OID=$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text, 'NULL');")

[ "$POST_SCHEMA" = "t" ] || fail "blog_content_schema_missing_after_commit"
[ "$POST_TABLES" = "23" ] || fail "postapply_table_count_mismatch"
[ "$POST_ENUMS" = "16" ] || fail "postapply_enum_count_mismatch"
[ "$POST_FOREIGN_KEYS" = "33" ] || fail "postapply_foreign_key_count_mismatch"
[ "$POST_GUARD_TRIGGER" = "1" ] || fail "postapply_guard_trigger_missing"
[ "$POST_PUBLIC_TABLES" = "$PRE_PUBLIC_TABLES" ] || fail "public_table_count_changed_after_commit"
[ "$POST_PUBLIC_BLOG_OID" = "$PRE_PUBLIC_BLOG_OID" ] || fail "public_blog_identity_changed_after_commit"

grep -E 'NOTICE:  BLOG_APPLY_|^COMMIT$' "$LOG" > "$OUT/verification.txt" || true

cat > "$OUT/status.txt" <<STATUS
BLOG_PRODUCTION_APPLY_STATUS=PASS
RELEASE_ID=blog-content-foundation-v1
TRANSACTION_COMMITTED=YES
BLOG_SCHEMA_EXISTS=YES
BLOG_TABLES=23
BLOG_ENUM_TYPES=16
BLOG_BASE_INDEXES=63
BLOG_GUARD_INDEXES=6
BLOG_EXPECTED_INDEXES=69
BLOG_FOREIGN_KEYS=33
BLOG_GUARD_CONSTRAINTS=17
BLOG_GUARD_TRIGGER=1
PUBLIC_TABLE_COUNT_BEFORE=$PRE_PUBLIC_TABLES
PUBLIC_TABLE_COUNT_AFTER=$POST_PUBLIC_TABLES
PUBLIC_BLOG_OID_UNCHANGED=YES
BACKUP_HASH_VERIFIED=YES
MIGRATION_HASH_VERIFIED=YES
SCHEMA_HASH_VERIFIED=YES
GUARD_BLOB_VERIFIED=YES
REPORT=$OUT
BACKUP=$BACKUP
STATUS

cat "$OUT/status.txt"
cat "$OUT/verification.txt"
