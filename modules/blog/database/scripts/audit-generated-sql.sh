#!/usr/bin/env bash
set -Eeuo pipefail

SQL="${1:-}"
OUT="${2:-$(dirname "${SQL:-.}")/sql-isolation-audit}"
EXPECTED_TABLES="${BLOG_EXPECTED_TABLES:-23}"
EXPECTED_TYPES="${BLOG_EXPECTED_TYPES:-16}"
EXPECTED_INDEXES="${BLOG_EXPECTED_INDEXES:-63}"

fail() {
  printf 'BLOG_SQL_ISOLATION_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

test -n "$SQL" || fail "sql_path_missing"
test -s "$SQL" || fail "sql_file_missing_or_empty"
mkdir -p "$OUT"

TOTAL_TABLES=$(grep -cE '^CREATE TABLE ' "$SQL" || true)
BLOG_TABLES=$(grep -cE '^CREATE TABLE "blog_content"\.' "$SQL" || true)
TOTAL_TYPES=$(grep -cE '^CREATE TYPE ' "$SQL" || true)
BLOG_TYPES=$(grep -cE '^CREATE TYPE "blog_content"\.' "$SQL" || true)
TOTAL_INDEXES=$(grep -cE '^CREATE (UNIQUE )?INDEX ' "$SQL" || true)
BLOG_INDEXES=$(grep -cE '^CREATE (UNIQUE )?INDEX .* ON "blog_content"\.' "$SQL" || true)
TOTAL_REFERENCES=$(grep -cE 'REFERENCES ' "$SQL" || true)
BLOG_REFERENCES=$(grep -cE 'REFERENCES "blog_content"\.' "$SQL" || true)

{
  echo "SQL=$SQL"
  echo "SQL_SHA256=$(sha256sum "$SQL" | awk '{print $1}')"
  echo "SQL_LINES=$(wc -l < "$SQL")"
  echo "SQL_BYTES=$(wc -c < "$SQL")"
  echo "TOTAL_TABLES=$TOTAL_TABLES"
  echo "BLOG_TABLES=$BLOG_TABLES"
  echo "TOTAL_TYPES=$TOTAL_TYPES"
  echo "BLOG_TYPES=$BLOG_TYPES"
  echo "TOTAL_INDEXES=$TOTAL_INDEXES"
  echo "BLOG_INDEXES=$BLOG_INDEXES"
  echo "TOTAL_REFERENCES=$TOTAL_REFERENCES"
  echo "BLOG_REFERENCES=$BLOG_REFERENCES"
} > "$OUT/summary.txt"

if ! grep -qE '^CREATE SCHEMA( IF NOT EXISTS)? "blog_content";' "$SQL"; then
  fail "blog_content_schema_creation_missing"
fi

if [ "$TOTAL_TABLES" -ne "$EXPECTED_TABLES" ] || [ "$BLOG_TABLES" -ne "$TOTAL_TABLES" ]; then
  grep -nE '^CREATE TABLE ' "$SQL" > "$OUT/create-table-lines.txt" || true
  fail "table_scope_or_count_mismatch"
fi

if [ "$TOTAL_TYPES" -ne "$EXPECTED_TYPES" ] || [ "$BLOG_TYPES" -ne "$TOTAL_TYPES" ]; then
  grep -nE '^CREATE TYPE ' "$SQL" > "$OUT/create-type-lines.txt" || true
  fail "type_scope_or_count_mismatch"
fi

if [ "$TOTAL_INDEXES" -ne "$EXPECTED_INDEXES" ] || [ "$BLOG_INDEXES" -ne "$TOTAL_INDEXES" ]; then
  grep -nE '^CREATE (UNIQUE )?INDEX ' "$SQL" > "$OUT/create-index-lines.txt" || true
  fail "index_scope_or_count_mismatch"
fi

if [ "$TOTAL_REFERENCES" -ne "$BLOG_REFERENCES" ]; then
  grep -nE 'REFERENCES ' "$SQL" > "$OUT/reference-lines.txt" || true
  fail "foreign_key_outside_blog_content"
fi

# Match destructive or public-schema mutation statements only at the start of a
# SQL statement. This intentionally does not match referential actions such as
# "ON UPDATE CASCADE" or "ON DELETE CASCADE" inside safe foreign keys.
DANGEROUS_PATTERN='^[[:space:]]*(DROP([[:space:]]|$)|TRUNCATE([[:space:]]|$)|DELETE[[:space:]]+FROM([[:space:]]|$)|UPDATE[[:space:]]+|ALTER[[:space:]]+TABLE[[:space:]]+"?public"?\.|CREATE[[:space:]]+TABLE[[:space:]]+"?public"?\.)'

if grep -Einq "$DANGEROUS_PATTERN" "$SQL"; then
  grep -Ein "$DANGEROUS_PATTERN" "$SQL" > "$OUT/dangerous-statements.txt" || true
  fail "dangerous_or_public_mutation_detected"
else
  rm -f "$OUT/dangerous-statements.txt"
fi

if grep -En '"public"\.|(^|[^A-Za-z0-9_])public\.' "$SQL" > "$OUT/public-schema-references.txt"; then
  fail "public_schema_reference_detected"
else
  rm -f "$OUT/public-schema-references.txt"
fi

cat > "$OUT/status.txt" <<STATUS
BLOG_SQL_ISOLATION_STATUS=PASS
BLOG_SCHEMA_ONLY=YES
PUBLIC_SCHEMA_REFERENCES=0
DANGEROUS_STATEMENTS=0
EXPECTED_TABLES=$EXPECTED_TABLES
EXPECTED_TYPES=$EXPECTED_TYPES
EXPECTED_INDEXES=$EXPECTED_INDEXES
MIGRATION_APPLIED=NO
DATABASE_CHANGED=NO
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
cat "$OUT/summary.txt"
