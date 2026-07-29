#!/usr/bin/env bash
set -Eeuo pipefail

SQL="${1:-}"
OUT="${2:-$(dirname "${SQL:-.}")/transactional-smoke-test}"

fail() {
  printf 'BLOG_MIGRATION_SMOKE_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

command -v psql >/dev/null || fail "psql_not_found"
test -n "${DATABASE_URL:-}" || fail "DATABASE_URL_missing"
test -n "$SQL" || fail "sql_path_missing"
test -s "$SQL" || fail "sql_file_missing_or_empty"

mkdir -p "$OUT"
WRAPPER="$OUT/transactional-wrapper.sql"
INDEX_LIST="$OUT/expected-indexes.txt"
LOG="$OUT/psql.log"

sed -nE 's/^CREATE (UNIQUE )?INDEX "([^"]+)".*/\2/p' "$SQL" > "$INDEX_LIST"
EXPECTED_INDEXES=$(wc -l < "$INDEX_LIST")
[ "$EXPECTED_INDEXES" -eq 53 ] || fail "expected_index_count_mismatch"

BEFORE_SCHEMA=$(psql "$DATABASE_URL" -X -Atc "SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content');")
BEFORE_PUBLIC_TABLES=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")
BEFORE_PUBLIC_BLOG_OID=$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text, 'NULL');")

[ "$BEFORE_SCHEMA" = "f" ] || fail "blog_content_schema_already_exists"
[ "$BEFORE_PUBLIC_BLOG_OID" != "NULL" ] || fail "public_blog_table_missing"

{
  echo '\set ON_ERROR_STOP on'
  echo 'BEGIN;'
  echo "SET LOCAL lock_timeout = '5s';"
  echo "SET LOCAL statement_timeout = '120s';"
  echo "SET LOCAL idle_in_transaction_session_timeout = '120s';"
  cat "$SQL"
  echo 'CREATE TEMP TABLE expected_blog_indexes(name text PRIMARY KEY);'
  printf "\\copy expected_blog_indexes(name) FROM '%s'\n" "$INDEX_LIST"
  cat <<'PSQL'
DO $audit$
DECLARE
  table_count integer;
  enum_count integer;
  fk_count integer;
  missing_index_count integer;
  invalid_index_count integer;
  public_reference_count integer;
BEGIN
  SELECT count(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'blog_content'
    AND table_type = 'BASE TABLE';

  SELECT count(*) INTO enum_count
  FROM pg_type t
  JOIN pg_namespace n ON n.oid = t.typnamespace
  WHERE n.nspname = 'blog_content'
    AND t.typtype = 'e';

  SELECT count(*) INTO fk_count
  FROM pg_constraint c
  JOIN pg_namespace n ON n.oid = c.connamespace
  WHERE n.nspname = 'blog_content'
    AND c.contype = 'f';

  SELECT count(*) INTO missing_index_count
  FROM expected_blog_indexes e
  LEFT JOIN pg_class c
    ON c.relname = e.name
   AND c.relkind = 'i'
  LEFT JOIN pg_namespace n
    ON n.oid = c.relnamespace
   AND n.nspname = 'blog_content'
  WHERE n.oid IS NULL;

  SELECT count(*) INTO invalid_index_count
  FROM pg_index i
  JOIN pg_class c ON c.oid = i.indexrelid
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'blog_content'
    AND NOT i.indisvalid;

  SELECT count(*) INTO public_reference_count
  FROM pg_constraint c
  JOIN pg_class source_table ON source_table.oid = c.conrelid
  JOIN pg_namespace source_schema ON source_schema.oid = source_table.relnamespace
  JOIN pg_class target_table ON target_table.oid = c.confrelid
  JOIN pg_namespace target_schema ON target_schema.oid = target_table.relnamespace
  WHERE c.contype = 'f'
    AND source_schema.nspname = 'blog_content'
    AND target_schema.nspname <> 'blog_content';

  IF table_count <> 23 THEN
    RAISE EXCEPTION 'expected 23 Blog tables, found %', table_count;
  END IF;

  IF enum_count <> 16 THEN
    RAISE EXCEPTION 'expected 16 Blog enum types, found %', enum_count;
  END IF;

  IF fk_count <> 33 THEN
    RAISE EXCEPTION 'expected 33 Blog foreign keys, found %', fk_count;
  END IF;

  IF missing_index_count <> 0 THEN
    RAISE EXCEPTION 'missing % expected Blog indexes', missing_index_count;
  END IF;

  IF invalid_index_count <> 0 THEN
    RAISE EXCEPTION 'found % invalid Blog indexes', invalid_index_count;
  END IF;

  IF public_reference_count <> 0 THEN
    RAISE EXCEPTION 'found % foreign keys outside blog_content', public_reference_count;
  END IF;

  RAISE NOTICE 'BLOG_TRANSACTION_TABLES=%', table_count;
  RAISE NOTICE 'BLOG_TRANSACTION_ENUMS=%', enum_count;
  RAISE NOTICE 'BLOG_TRANSACTION_FOREIGN_KEYS=%', fk_count;
  RAISE NOTICE 'BLOG_TRANSACTION_EXPECTED_INDEXES=53';
END
$audit$;
ROLLBACK;
PSQL
} > "$WRAPPER"

if ! psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1 -f "$WRAPPER" > "$LOG" 2>&1; then
  tail -n 80 "$LOG" >&2 || true
  fail "transactional_sql_execution_failed"
fi

AFTER_SCHEMA=$(psql "$DATABASE_URL" -X -Atc "SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content');")
AFTER_PUBLIC_TABLES=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")
AFTER_PUBLIC_BLOG_OID=$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text, 'NULL');")

[ "$AFTER_SCHEMA" = "f" ] || fail "rollback_failed_blog_schema_persisted"
[ "$AFTER_PUBLIC_TABLES" = "$BEFORE_PUBLIC_TABLES" ] || fail "public_table_count_changed"
[ "$AFTER_PUBLIC_BLOG_OID" = "$BEFORE_PUBLIC_BLOG_OID" ] || fail "public_blog_identity_changed"

grep -E 'NOTICE:  BLOG_TRANSACTION_|^ROLLBACK$' "$LOG" > "$OUT/verification.txt" || true

cat > "$OUT/status.txt" <<STATUS
BLOG_MIGRATION_SMOKE_STATUS=PASS
TRANSACTION_EXECUTED=YES
TRANSACTION_ROLLED_BACK=YES
BLOG_SCHEMA_PERSISTED=NO
PUBLIC_TABLE_COUNT_BEFORE=$BEFORE_PUBLIC_TABLES
PUBLIC_TABLE_COUNT_AFTER=$AFTER_PUBLIC_TABLES
PUBLIC_BLOG_OID_UNCHANGED=YES
EXPECTED_TABLES=23
EXPECTED_TYPES=16
EXPECTED_INDEXES=53
EXPECTED_FOREIGN_KEYS=33
DATABASE_PERSISTENT_CHANGE=NO
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
cat "$OUT/verification.txt"
