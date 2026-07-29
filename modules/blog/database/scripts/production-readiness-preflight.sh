#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

SQL="${1:-}"
OUT="${2:-/tmp/blog-content-production-readiness-$(date +%Y%m%d_%H%M%S)}"
EXPECTED_SCHEMA_SHA="9f38d7c4b529e20f127b909a8e7a4444621586547251be5bf9dd4e89d7c91cbb"
EXPECTED_SQL_SHA="037a8dc6b087b8cfc6b53c48d127519c42fe4f7934411c239bef2741d4368df0"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
SCHEMA="$ROOT/modules/blog/database/schema.prisma"
AUDIT_SCRIPT="$ROOT/modules/blog/database/scripts/audit-generated-sql.sh"
BACKUP="$OUT/preapply-database.dump"
RESTORE_LIST="$OUT/preapply-database.restore-list.txt"

fail() {
  printf 'BLOG_PRODUCTION_READINESS_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

for command_name in psql pg_dump pg_restore sha256sum df; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "${DATABASE_URL:-}" || fail "DATABASE_URL_missing"
test -s "$SQL" || fail "migration_sql_missing"
test -s "$SCHEMA" || fail "schema_missing"
test -x "$AUDIT_SCRIPT" || fail "isolation_audit_not_executable"
mkdir -p "$OUT"

SCHEMA_SHA=$(sha256sum "$SCHEMA" | awk '{print $1}')
SQL_SHA=$(sha256sum "$SQL" | awk '{print $1}')
[ "$SCHEMA_SHA" = "$EXPECTED_SCHEMA_SHA" ] || fail "schema_hash_mismatch"
[ "$SQL_SHA" = "$EXPECTED_SQL_SHA" ] || fail "migration_sql_hash_mismatch"

bash "$AUDIT_SCRIPT" "$SQL" "$OUT/isolation-audit" >/dev/null

eval "$(psql "$DATABASE_URL" -X -At -F= -c "
SELECT 'DB_NAME', current_database()
UNION ALL SELECT 'POSTGRES_VERSION', current_setting('server_version')
UNION ALL SELECT 'BLOG_SCHEMA_EXISTS', EXISTS (
  SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content'
)::text
UNION ALL SELECT 'PUBLIC_BLOG_TABLE_EXISTS', (
  to_regclass('public.\"Blog\"') IS NOT NULL
)::text
UNION ALL SELECT 'CREATE_SCHEMA_PRIVILEGE', has_database_privilege(
  current_user, current_database(), 'CREATE'
)::text
UNION ALL SELECT 'PG_TRGM_AVAILABLE', EXISTS (
  SELECT 1 FROM pg_available_extensions WHERE name='pg_trgm'
)::text
UNION ALL SELECT 'PUBLIC_TABLE_COUNT', count(*)::text
  FROM information_schema.tables
  WHERE table_schema='public' AND table_type='BASE TABLE'
UNION ALL SELECT 'PUBLIC_BLOG_OID', COALESCE(
  to_regclass('public.\"Blog\"')::oid::text, 'NULL'
)
UNION ALL SELECT 'DATABASE_SIZE_BYTES', pg_database_size(current_database())::text;
" | sed 's/[^A-Za-z0-9_=.-]/_/g')"

[ "$BLOG_SCHEMA_EXISTS" = "false" ] || fail "blog_content_schema_already_exists"
[ "$PUBLIC_BLOG_TABLE_EXISTS" = "true" ] || fail "public_blog_table_missing"
[ "$CREATE_SCHEMA_PRIVILEGE" = "true" ] || fail "create_schema_privilege_missing"
[ "$PG_TRGM_AVAILABLE" = "true" ] || fail "pg_trgm_unavailable"

AVAILABLE_KB=$(df -Pk "$OUT" | awk 'NR==2 {print $4}')
[ "${AVAILABLE_KB:-0}" -ge 262144 ] || fail "insufficient_backup_disk_space"

pg_dump "$DATABASE_URL" \
  --format=custom \
  --no-owner \
  --no-acl \
  --file="$BACKUP"

test -s "$BACKUP" || fail "database_backup_empty"
pg_restore --list "$BACKUP" > "$RESTORE_LIST"
test -s "$RESTORE_LIST" || fail "database_backup_restore_list_empty"

BACKUP_SHA=$(sha256sum "$BACKUP" | awk '{print $1}')
BACKUP_BYTES=$(wc -c < "$BACKUP")
RESTORE_ENTRY_COUNT=$(grep -cE '^[0-9]+;' "$RESTORE_LIST" || true)
[ "$RESTORE_ENTRY_COUNT" -gt 0 ] || fail "database_backup_has_no_restore_entries"

BLOG_SCHEMA_AFTER=$(psql "$DATABASE_URL" -X -Atc "SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content');")
PUBLIC_TABLE_COUNT_AFTER=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")
PUBLIC_BLOG_OID_AFTER=$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text, 'NULL');")

[ "$BLOG_SCHEMA_AFTER" = "f" ] || fail "blog_content_schema_changed_during_preflight"
[ "$PUBLIC_TABLE_COUNT_AFTER" = "$PUBLIC_TABLE_COUNT" ] || fail "public_table_count_changed_during_preflight"
[ "$PUBLIC_BLOG_OID_AFTER" = "$PUBLIC_BLOG_OID" ] || fail "public_blog_identity_changed_during_preflight"

cat > "$OUT/status.txt" <<STATUS
BLOG_PRODUCTION_READINESS_STATUS=PASS
SCHEMA_HASH_VERIFIED=YES
MIGRATION_HASH_VERIFIED=YES
SQL_ISOLATION_PASSED=YES
DATABASE_BACKUP_CREATED=YES
DATABASE_BACKUP_VERIFIED=YES
BACKUP_SHA256=$BACKUP_SHA
BACKUP_BYTES=$BACKUP_BYTES
RESTORE_ENTRY_COUNT=$RESTORE_ENTRY_COUNT
BLOG_SCHEMA_EXISTS=NO
PUBLIC_BLOG_TABLE_EXISTS=YES
PUBLIC_BLOG_OID_UNCHANGED=YES
PUBLIC_TABLE_COUNT_BEFORE=$PUBLIC_TABLE_COUNT
PUBLIC_TABLE_COUNT_AFTER=$PUBLIC_TABLE_COUNT_AFTER
CREATE_SCHEMA_PRIVILEGE=YES
PG_TRGM_AVAILABLE=YES
MIGRATION_APPLIED=NO
DATABASE_CHANGED=NO
SCHEMA_SHA256=$SCHEMA_SHA
MIGRATION_SQL_SHA256=$SQL_SHA
BACKUP=$BACKUP
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
