#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
SCHEMA="$ROOT/modules/blog/database/schema.prisma"
OUT="${1:-$ROOT/.reports/blog-content-schema-$(date +%Y%m%d_%H%M%S)}"
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

{
  echo "ROOT=$ROOT"
  echo "SCHEMA=$SCHEMA"
  echo "GENERATED_AT=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "GIT_HEAD=$(git -C "$ROOT" rev-parse HEAD)"
  echo "PRISMA_VERSION=$(npx --no-install prisma --version | head -n 1)"
} > "$OUT/context.txt"

npx --no-install prisma format --schema "$SCHEMA" > "$OUT/prisma-format.log" 2>&1
npx --no-install prisma validate --schema "$SCHEMA" > "$OUT/prisma-validate.log" 2>&1

psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1 -Atc "
SELECT 'POSTGRES_VERSION=' || current_setting('server_version');
SELECT 'CREATE_SCHEMA_PRIVILEGE=' || has_database_privilege(current_user,current_database(),'CREATE');
SELECT 'BLOG_SCHEMA_EXISTS=' || EXISTS (
  SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content'
);
SELECT 'PUBLIC_BLOG_TABLE_EXISTS=' || to_regclass('public.\"Blog\"') IS NOT NULL;
" > "$OUT/database-preflight.txt"

if grep -q '^BLOG_SCHEMA_EXISTS=true$' "$OUT/database-preflight.txt"; then
  fail "blog_content_schema_already_exists"
fi

npx --no-install prisma migrate diff \
  --from-empty \
  --to-schema-datamodel "$SCHEMA" \
  --script > "$SQL" 2> "$OUT/prisma-diff.log"

test -s "$SQL" || fail "generated_sql_empty"

if grep -Eiq '(^|[[:space:]])(DROP|TRUNCATE|DELETE[[:space:]]+FROM|UPDATE[[:space:]]+public\.|ALTER[[:space:]]+TABLE[[:space:]]+public\.)' "$SQL"; then
  grep -Ein '(^|[[:space:]])(DROP|TRUNCATE|DELETE[[:space:]]+FROM|UPDATE[[:space:]]+public\.|ALTER[[:space:]]+TABLE[[:space:]]+public\.)' "$SQL" \
    > "$OUT/dangerous-statements.txt" || true
  fail "dangerous_statement_detected"
fi

{
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
REPORT=$OUT
SQL=$SQL
STATUS

cat "$OUT/status.txt"
cat "$OUT/sql-summary.txt"
