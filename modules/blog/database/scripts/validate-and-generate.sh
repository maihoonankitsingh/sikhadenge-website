#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
SCHEMA="$ROOT/modules/blog/database/schema.prisma"
OUT="${1:-$ROOT/.reports/blog-content-schema-$(date +%Y%m%d_%H%M%S)}"
WORK_SCHEMA="$OUT/schema.formatted.prisma"
SQL="$OUT/0001_blog_content_foundation.sql"

mkdir -p "$OUT"

fail() {
  printf 'BLOG_CONTENT_SCHEMA_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

command -v node >/dev/null || fail "node_not_found"
command -v npx >/dev/null || fail "npx_not_found"
command -v psql >/dev/null || fail "psql_not_found"
test -f "$SCHEMA" || fail "schema_missing"
test -n "${DATABASE_URL:-}" || fail "DATABASE_URL_missing"

cp "$SCHEMA" "$WORK_SCHEMA"

{
  echo "ROOT=$ROOT"
  echo "SOURCE_SCHEMA=$SCHEMA"
  echo "WORK_SCHEMA=$WORK_SCHEMA"
  echo "GENERATED_AT=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "GIT_HEAD=$(git -C "$ROOT" rev-parse HEAD)"
  echo "PRISMA_VERSION=$(npx --no-install prisma --version | head -n 1)"
} > "$OUT/context.txt"

npx --no-install prisma format --schema "$WORK_SCHEMA" > "$OUT/prisma-format.log" 2>&1
npx --no-install prisma validate --schema "$WORK_SCHEMA" > "$OUT/prisma-validate.log" 2>&1

psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1 -Atc "
SELECT 'POSTGRES_VERSION=' || current_setting('server_version');
SELECT 'CREATE_SCHEMA_PRIVILEGE=' || (has_database_privilege(current_user,current_database(),'CREATE'))::text;
SELECT 'BLOG_SCHEMA_EXISTS=' || (EXISTS (
  SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content'
))::text;
SELECT 'PUBLIC_BLOG_TABLE_EXISTS=' || (to_regclass('public.\"Blog\"') IS NOT NULL)::text;
" > "$OUT/database-preflight.txt"

if grep -q '^BLOG_SCHEMA_EXISTS=true$' "$OUT/database-preflight.txt"; then
  fail "blog_content_schema_already_exists"
fi

if ! grep -q '^PUBLIC_BLOG_TABLE_EXISTS=true$' "$OUT/database-preflight.txt"; then
  fail "public_blog_table_missing"
fi

if ! npx --no-install prisma migrate diff \
  --from-empty \
  --to-schema-datamodel "$WORK_SCHEMA" \
  --script > "$SQL" 2> "$OUT/prisma-diff.log"; then
  : > "$SQL"
  npx --no-install prisma migrate diff \
    --from-empty \
    --to-schema "$WORK_SCHEMA" \
    --script > "$SQL" 2>> "$OUT/prisma-diff.log" \
    || fail "prisma_migrate_diff_failed"
fi

test -s "$SQL" || fail "generated_sql_empty"

if grep -Eiq '(^|[[:space:]])(DROP|TRUNCATE|DELETE[[:space:]]+FROM|UPDATE[[:space:]]+public\.|ALTER[[:space:]]+TABLE[[:space:]]+public\.)' "$SQL"; then
  grep -Ein '(^|[[:space:]])(DROP|TRUNCATE|DELETE[[:space:]]+FROM|UPDATE[[:space:]]+public\.|ALTER[[:space:]]+TABLE[[:space:]]+public\.)' "$SQL" \
    > "$OUT/dangerous-statements.txt" || true
  fail "dangerous_statement_detected"
fi

{
  echo "SOURCE_SCHEMA_SHA256=$(sha256sum "$SCHEMA" | awk '{print $1}')"
  echo "FORMATTED_SCHEMA_SHA256=$(sha256sum "$WORK_SCHEMA" | awk '{print $1}')"
  echo "SQL_LINES=$(wc -l < "$SQL")"
  echo "SQL_BYTES=$(wc -c < "$SQL")"
  echo "CREATE_TABLE_COUNT=$(grep -cE '^CREATE TABLE ' "$SQL" || true)"
  echo "CREATE_TYPE_COUNT=$(grep -cE '^CREATE TYPE ' "$SQL" || true)"
  echo "CREATE_INDEX_COUNT=$(grep -cE '^CREATE (UNIQUE )?INDEX ' "$SQL" || true)"
  echo "SQL_SHA256=$(sha256sum "$SQL" | awk '{print $1}')"
} > "$OUT/sql-summary.txt"

cat > "$OUT/status.txt" <<STATUS
BLOG_CONTENT_SCHEMA_STATUS=PASS
MIGRATION_GENERATED=YES
MIGRATION_APPLIED=NO
PRODUCTION_DATABASE_CHANGED=NO
SOURCE_WORKTREE_MODIFIED=NO
REPORT=$OUT
SQL=$SQL
STATUS

cat "$OUT/status.txt"
cat "$OUT/sql-summary.txt"
