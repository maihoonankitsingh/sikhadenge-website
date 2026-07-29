#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

SQL="${1:-}"
BACKUP="${2:-}"
OUT="${3:-/tmp/blog-content-post-apply-attestation-$(date +%Y%m%d_%H%M%S)}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
MANIFEST="$ROOT/modules/blog/database/releases/0001-blog-content-foundation.release.json"
SCHEMA="$ROOT/modules/blog/database/schema.prisma"
GUARDS="$ROOT/modules/blog/database/sql/0001_post_schema_guards.sql"
INDEX_LIST="$OUT/expected-indexes.txt"
DB_REPORT="$OUT/database-values.txt"

fail() {
  printf 'BLOG_POST_APPLY_ATTESTATION_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

for command_name in psql pg_restore sha256sum jq git; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "${DATABASE_URL:-}" || fail "DATABASE_URL_missing"
test -s "$SQL" || fail "migration_sql_missing"
test -s "$BACKUP" || fail "verified_backup_missing"
test -s "$MANIFEST" || fail "release_manifest_missing"
test -s "$SCHEMA" || fail "schema_missing"
test -s "$GUARDS" || fail "guard_sql_missing"
mkdir -p "$OUT"

jq -e '.releaseId == "blog-content-foundation-v1"' "$MANIFEST" >/dev/null
jq -e '.status == "applied-to-production"' "$MANIFEST" >/dev/null
jq -e '.productionApply.status == "PASS"' "$MANIFEST" >/dev/null
jq -e '.productionApply.transactionCommitted == true' "$MANIFEST" >/dev/null

EXPECTED_SCHEMA_SHA=$(jq -r '.schema.sha256' "$MANIFEST")
EXPECTED_SQL_SHA=$(jq -r '.migration.sha256' "$MANIFEST")
EXPECTED_GUARD_BLOB=$(jq -r '.guards.gitBlobSha1' "$MANIFEST")
EXPECTED_BACKUP_SHA=$(jq -r '.productionReadiness.backupSha256' "$MANIFEST")
EXPECTED_BACKUP_BYTES=$(jq -r '.productionReadiness.backupBytes' "$MANIFEST")
EXPECTED_RESTORE_ENTRIES=$(jq -r '.productionReadiness.restoreEntryCount' "$MANIFEST")
EXPECTED_PUBLIC_TABLES=$(jq -r '.productionApply.publicTableCountAfter' "$MANIFEST")

[ "$(sha256sum "$SCHEMA" | awk '{print $1}')" = "$EXPECTED_SCHEMA_SHA" ] || fail "schema_hash_mismatch"
[ "$(sha256sum "$SQL" | awk '{print $1}')" = "$EXPECTED_SQL_SHA" ] || fail "migration_hash_mismatch"
[ "$(git -C "$ROOT" hash-object "$GUARDS")" = "$EXPECTED_GUARD_BLOB" ] || fail "guard_blob_mismatch"
[ "$(sha256sum "$BACKUP" | awk '{print $1}')" = "$EXPECTED_BACKUP_SHA" ] || fail "backup_hash_mismatch"
[ "$(wc -c < "$BACKUP")" = "$EXPECTED_BACKUP_BYTES" ] || fail "backup_size_mismatch"

pg_restore --list "$BACKUP" > "$OUT/backup.restore-list.txt"
RESTORE_ENTRIES=$(grep -cE '^[0-9]+;' "$OUT/backup.restore-list.txt" || true)
[ "$RESTORE_ENTRIES" = "$EXPECTED_RESTORE_ENTRIES" ] || fail "backup_restore_entry_count_mismatch"

sed -nE 's/^CREATE (UNIQUE )?INDEX "([^"]+)".*/\2/p' "$SQL" > "$INDEX_LIST"
sed -nE 's/^CREATE (UNIQUE )?INDEX ([A-Za-z0-9_]+).*/\2/p' "$GUARDS" >> "$INDEX_LIST"
sort -u -o "$INDEX_LIST" "$INDEX_LIST"
[ "$(wc -l < "$INDEX_LIST")" -eq 69 ] || fail "expected_named_index_count_mismatch"

psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1 -At -F= \
  -v index_file="$INDEX_LIST" \
  -c "CREATE TEMP TABLE expected_blog_indexes(name text PRIMARY KEY);" \
  -c "\\copy expected_blog_indexes(name) FROM :'index_file'" \
  -c "
WITH values AS (
  SELECT 'BLOG_SCHEMA_EXISTS' AS key, EXISTS (
    SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content'
  )::text AS value
  UNION ALL SELECT 'BLOG_TABLES', count(*)::text
    FROM information_schema.tables
    WHERE table_schema='blog_content' AND table_type='BASE TABLE'
  UNION ALL SELECT 'BLOG_ENUM_TYPES', count(*)::text
    FROM pg_type t JOIN pg_namespace n ON n.oid=t.typnamespace
    WHERE n.nspname='blog_content' AND t.typtype='e'
  UNION ALL SELECT 'BLOG_FOREIGN_KEYS', count(*)::text
    FROM pg_constraint c JOIN pg_namespace n ON n.oid=c.connamespace
    WHERE n.nspname='blog_content' AND c.contype='f'
  UNION ALL SELECT 'BLOG_GUARD_CONSTRAINTS', count(*)::text
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
      )
  UNION ALL SELECT 'BLOG_GUARD_TRIGGERS', count(*)::text
    FROM pg_trigger
    WHERE tgname='publications_enforce_gate' AND NOT tgisinternal
  UNION ALL SELECT 'MISSING_EXPECTED_INDEXES', count(*)::text
    FROM expected_blog_indexes e
    WHERE NOT EXISTS (
      SELECT 1
      FROM pg_class c
      JOIN pg_namespace n ON n.oid=c.relnamespace
      WHERE n.nspname='blog_content'
        AND c.relkind='i'
        AND c.relname=e.name
    )
  UNION ALL SELECT 'INVALID_BLOG_INDEXES', count(*)::text
    FROM pg_index i
    JOIN pg_class c ON c.oid=i.indexrelid
    JOIN pg_namespace n ON n.oid=c.relnamespace
    WHERE n.nspname='blog_content' AND NOT i.indisvalid
  UNION ALL SELECT 'EXTERNAL_BLOG_FOREIGN_KEYS', count(*)::text
    FROM pg_constraint c
    JOIN pg_class source_table ON source_table.oid=c.conrelid
    JOIN pg_namespace source_schema ON source_schema.oid=source_table.relnamespace
    JOIN pg_class target_table ON target_table.oid=c.confrelid
    JOIN pg_namespace target_schema ON target_schema.oid=target_table.relnamespace
    WHERE c.contype='f'
      AND source_schema.nspname='blog_content'
      AND target_schema.nspname<>'blog_content'
  UNION ALL SELECT 'PUBLIC_TABLE_COUNT', count(*)::text
    FROM information_schema.tables
    WHERE table_schema='public' AND table_type='BASE TABLE'
  UNION ALL SELECT 'PUBLIC_BLOG_TABLE_EXISTS', (
    to_regclass('public.\"Blog\"') IS NOT NULL
  )::text
  UNION ALL SELECT 'PUBLIC_BLOG_OID', COALESCE(
    to_regclass('public.\"Blog\"')::oid::text, 'NULL'
  )
  UNION ALL SELECT 'PG_TRGM_INSTALLED', EXISTS (
    SELECT 1 FROM pg_extension WHERE extname='pg_trgm'
  )::text
  UNION ALL SELECT 'PUBLICATION_GATE_FUNCTION_EXISTS', (
    to_regprocedure('blog_content.enforce_publication_gate()') IS NOT NULL
  )::text
)
SELECT key, value FROM values ORDER BY key;
" > "$DB_REPORT"

eval "$(sed 's/[^A-Za-z0-9_=.-]/_/g' "$DB_REPORT")"

[ "$BLOG_SCHEMA_EXISTS" = "true" ] || fail "blog_content_schema_missing"
[ "$BLOG_TABLES" = "23" ] || fail "blog_table_count_mismatch"
[ "$BLOG_ENUM_TYPES" = "16" ] || fail "blog_enum_count_mismatch"
[ "$BLOG_FOREIGN_KEYS" = "33" ] || fail "blog_foreign_key_count_mismatch"
[ "$BLOG_GUARD_CONSTRAINTS" = "17" ] || fail "guard_constraint_count_mismatch"
[ "$BLOG_GUARD_TRIGGERS" = "1" ] || fail "guard_trigger_count_mismatch"
[ "$MISSING_EXPECTED_INDEXES" = "0" ] || fail "expected_indexes_missing"
[ "$INVALID_BLOG_INDEXES" = "0" ] || fail "invalid_blog_indexes_found"
[ "$EXTERNAL_BLOG_FOREIGN_KEYS" = "0" ] || fail "foreign_key_outside_blog_content"
[ "$PUBLIC_TABLE_COUNT" = "$EXPECTED_PUBLIC_TABLES" ] || fail "public_table_count_drift"
[ "$PUBLIC_BLOG_TABLE_EXISTS" = "true" ] || fail "public_blog_table_missing"
[ "$PUBLIC_BLOG_OID" != "NULL" ] || fail "public_blog_oid_missing"
[ "$PG_TRGM_INSTALLED" = "true" ] || fail "pg_trgm_missing"
[ "$PUBLICATION_GATE_FUNCTION_EXISTS" = "true" ] || fail "publication_gate_function_missing"

cat > "$OUT/status.txt" <<STATUS
BLOG_POST_APPLY_ATTESTATION_STATUS=PASS
RELEASE_ID=blog-content-foundation-v1
RELEASE_STATUS=applied-to-production
LIVE_SCHEMA_VERIFIED=YES
BLOG_SCHEMA_EXISTS=YES
BLOG_TABLES=23
BLOG_ENUM_TYPES=16
BLOG_EXPECTED_NAMED_INDEXES=69
BLOG_MISSING_EXPECTED_INDEXES=0
BLOG_INVALID_INDEXES=0
BLOG_FOREIGN_KEYS=33
BLOG_EXTERNAL_FOREIGN_KEYS=0
BLOG_GUARD_CONSTRAINTS=17
BLOG_GUARD_TRIGGER=1
PUBLIC_TABLE_COUNT=$PUBLIC_TABLE_COUNT
PUBLIC_BLOG_TABLE_EXISTS=YES
PUBLIC_BLOG_OID=$PUBLIC_BLOG_OID
PG_TRGM_INSTALLED=YES
PUBLICATION_GATE_FUNCTION_EXISTS=YES
SCHEMA_HASH_VERIFIED=YES
MIGRATION_HASH_VERIFIED=YES
GUARD_BLOB_VERIFIED=YES
BACKUP_HASH_VERIFIED=YES
BACKUP_RESTORE_LIST_VERIFIED=YES
DATABASE_WRITE_PERFORMED=NO
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
