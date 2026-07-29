#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
SCHEMA="$ROOT/modules/blog/database/schema.prisma"
GENERATED="$ROOT/modules/blog/database/generated/client"
OUT="${1:-$ROOT/.reports/blog-client-generate-$(date +%Y%m%d_%H%M%S)}"

mkdir -p "$OUT"

fail() {
  printf 'BLOG_CLIENT_GENERATE_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

command -v node >/dev/null || fail "node_not_found"
command -v npx >/dev/null || fail "npx_not_found"
command -v psql >/dev/null || fail "psql_not_found"
test -f "$SCHEMA" || fail "schema_missing"
test -n "${DATABASE_URL:-}" || fail "DATABASE_URL_missing"

git -C "$ROOT" diff --quiet || fail "tracked_worktree_changes_present"
git -C "$ROOT" diff --cached --quiet || fail "staged_worktree_changes_present"

hash_or_missing() {
  local file="$1"
  if test -f "$file"; then
    sha256sum "$file" | awk '{print $1}'
  else
    printf 'MISSING\n'
  fi
}

ROOT_CLIENT_JS="$ROOT/node_modules/.prisma/client/index.js"
ROOT_CLIENT_DTS="$ROOT/node_modules/.prisma/client/index.d.ts"
ROOT_CLIENT_JS_BEFORE="$(hash_or_missing "$ROOT_CLIENT_JS")"
ROOT_CLIENT_DTS_BEFORE="$(hash_or_missing "$ROOT_CLIENT_DTS")"

mkdir -p "$(dirname "$GENERATED")"
find "$GENERATED" -mindepth 1 -maxdepth 1 -exec rm -rf {} + 2>/dev/null || true

npx --no-install prisma generate --schema "$SCHEMA" >"$OUT/prisma-generate.log" 2>&1 \
  || fail "prisma_generate_failed"

test -s "$GENERATED/index.js" || fail "generated_index_js_missing"
test -s "$GENERATED/index.d.ts" || fail "generated_index_dts_missing"
test -s "$GENERATED/package.json" || fail "generated_package_json_missing"

MODEL_COUNT="$(node -e '
const generated = require(process.argv[1]);
const count = generated.Prisma?.dmmf?.datamodel?.models?.length;
if (!Number.isInteger(count)) process.exit(2);
process.stdout.write(String(count));
' "$GENERATED")" || fail "generated_client_load_failed"

test "$MODEL_COUNT" = "23" || fail "generated_model_count_mismatch"

node -e '
const generated = require(process.argv[1]);
const client = new generated.PrismaClient();
client.$disconnect().then(() => process.stdout.write("CLIENT_INSTANTIATION=PASS\n"));
' "$GENERATED" >"$OUT/client-load.txt" 2>&1 \
  || fail "generated_client_instantiation_failed"

ROOT_CLIENT_JS_AFTER="$(hash_or_missing "$ROOT_CLIENT_JS")"
ROOT_CLIENT_DTS_AFTER="$(hash_or_missing "$ROOT_CLIENT_DTS")"

test "$ROOT_CLIENT_JS_BEFORE" = "$ROOT_CLIENT_JS_AFTER" \
  || fail "root_prisma_client_js_changed"
test "$ROOT_CLIENT_DTS_BEFORE" = "$ROOT_CLIENT_DTS_AFTER" \
  || fail "root_prisma_client_dts_changed"

BLOG_SCHEMA_EXISTS="$(psql "$DATABASE_URL" -X -Atc "
SELECT EXISTS (
  SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content'
);
")"

test "$BLOG_SCHEMA_EXISTS" = "f" || fail "database_schema_persisted_unexpectedly"

{
  echo "GIT_HEAD=$(git -C "$ROOT" rev-parse HEAD)"
  echo "SCHEMA_SHA256=$(sha256sum "$SCHEMA" | awk '{print $1}')"
  echo "GENERATED_MODEL_COUNT=$MODEL_COUNT"
  echo "GENERATED_FILE_COUNT=$(find "$GENERATED" -type f | wc -l)"
  echo "ROOT_CLIENT_JS_UNCHANGED=YES"
  echo "ROOT_CLIENT_DTS_UNCHANGED=YES"
  echo "BLOG_SCHEMA_EXISTS=false"
} >"$OUT/summary.txt"

cat >"$OUT/status.txt" <<STATUS
BLOG_CLIENT_GENERATE_STATUS=PASS
ISOLATED_CLIENT_GENERATED=YES
GENERATED_MODEL_COUNT=23
ROOT_PRISMA_CLIENT_UNCHANGED=YES
DATABASE_CHANGED=NO
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
cat "$OUT/summary.txt"
