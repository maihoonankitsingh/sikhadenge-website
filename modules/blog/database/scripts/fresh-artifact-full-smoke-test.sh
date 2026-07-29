#!/usr/bin/env bash
set -Eeuo pipefail

OUT="${1:-/tmp/blog-content-fresh-artifact-$(date +%Y%m%d_%H%M%S)}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
SCRIPTS="$ROOT/modules/blog/database/scripts"
GUARDS="$ROOT/modules/blog/database/sql/0001_post_schema_guards.sql"
SCHEMA="$ROOT/modules/blog/database/schema.prisma"
SCHEMA_REPORT="$OUT/01-schema"
ISOLATION_REPORT="$OUT/02-isolation"
MIGRATION_REPORT="$OUT/03-migration-smoke"
GUARD_REPORT="$OUT/04-guard-smoke"
SQL="$SCHEMA_REPORT/0001_blog_content_foundation.sql"

fail() {
  printf 'BLOG_FRESH_ARTIFACT_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

command -v psql >/dev/null || fail "psql_not_found"
command -v sha256sum >/dev/null || fail "sha256sum_not_found"
test -n "${DATABASE_URL:-}" || fail "DATABASE_URL_missing"
test -s "$SCHEMA" || fail "schema_missing"
test -s "$GUARDS" || fail "guard_sql_missing"
mkdir -p "$OUT"

BLOG_SCHEMA_BEFORE=$(psql "$DATABASE_URL" -X -Atc "SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content');")
PUBLIC_TABLE_COUNT_BEFORE=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")
PUBLIC_BLOG_OID_BEFORE=$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text, 'NULL');")

[ "$BLOG_SCHEMA_BEFORE" = "f" ] || fail "blog_content_schema_already_exists"

bash "$SCRIPTS/validate-and-generate.sh" "$SCHEMA_REPORT"
test -s "$SQL" || fail "fresh_migration_sql_missing"

SOURCE_SCHEMA_SHA=$(sha256sum "$SCHEMA" | awk '{print $1}')
REPORTED_SCHEMA_SHA=$(awk -F= '$1=="SOURCE_SCHEMA_SHA256" {print $2}' "$SCHEMA_REPORT/sql-summary.txt")
[ -n "$REPORTED_SCHEMA_SHA" ] || fail "reported_schema_hash_missing"
[ "$SOURCE_SCHEMA_SHA" = "$REPORTED_SCHEMA_SHA" ] || fail "schema_hash_drift_detected"

bash "$SCRIPTS/audit-generated-sql.sh" "$SQL" "$ISOLATION_REPORT"
bash "$SCRIPTS/transactional-smoke-test.sh" "$SQL" "$MIGRATION_REPORT"
bash "$SCRIPTS/transactional-guard-smoke-test.sh" "$SQL" "$GUARDS" "$GUARD_REPORT"

BLOG_SCHEMA_AFTER=$(psql "$DATABASE_URL" -X -Atc "SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content');")
PUBLIC_TABLE_COUNT_AFTER=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")
PUBLIC_BLOG_OID_AFTER=$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text, 'NULL');")

[ "$BLOG_SCHEMA_AFTER" = "f" ] || fail "blog_content_schema_persisted"
[ "$PUBLIC_TABLE_COUNT_BEFORE" = "$PUBLIC_TABLE_COUNT_AFTER" ] || fail "public_table_count_changed"
[ "$PUBLIC_BLOG_OID_BEFORE" = "$PUBLIC_BLOG_OID_AFTER" ] || fail "public_blog_oid_changed"

grep -q '^BLOG_CONTENT_SCHEMA_STATUS=PASS$' "$SCHEMA_REPORT/status.txt" || fail "schema_stage_not_passed"
grep -q '^BLOG_SQL_ISOLATION_STATUS=PASS$' "$ISOLATION_REPORT/status.txt" || fail "isolation_stage_not_passed"
grep -q '^BLOG_MIGRATION_SMOKE_STATUS=PASS$' "$MIGRATION_REPORT/status.txt" || fail "migration_stage_not_passed"
grep -q '^BLOG_GUARD_SMOKE_STATUS=PASS$' "$GUARD_REPORT/status.txt" || fail "guard_stage_not_passed"

cat > "$OUT/status.txt" <<STATUS
BLOG_FRESH_ARTIFACT_STATUS=PASS
CURRENT_SCHEMA_USED=YES
SCHEMA_HASH_MATCHED=YES
MIGRATION_REGENERATED=YES
SQL_ISOLATION_PASSED=YES
TRANSACTIONAL_MIGRATION_PASSED=YES
QUALITY_GUARDS_PASSED=YES
ALL_TRANSACTIONS_ROLLED_BACK=YES
BLOG_SCHEMA_PERSISTED=NO
PUBLIC_TABLE_COUNT_BEFORE=$PUBLIC_TABLE_COUNT_BEFORE
PUBLIC_TABLE_COUNT_AFTER=$PUBLIC_TABLE_COUNT_AFTER
PUBLIC_BLOG_OID_UNCHANGED=YES
DATABASE_PERSISTENT_CHANGE=NO
SOURCE_SCHEMA_SHA256=$SOURCE_SCHEMA_SHA
MIGRATION_SQL_SHA256=$(sha256sum "$SQL" | awk '{print $1}')
REPORT=$OUT
SQL=$SQL
STATUS

cat "$OUT/status.txt"
