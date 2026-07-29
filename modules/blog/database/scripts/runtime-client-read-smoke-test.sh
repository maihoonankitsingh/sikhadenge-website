#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
SCHEMA="$ROOT/modules/blog/database/schema.prisma"
GENERATED="$ROOT/modules/blog/database/generated/client"
OUT="${1:-/tmp/blog-runtime-client-read-$(date +%Y%m%d_%H%M%S)}"
VALUES="$OUT/runtime-values.txt"

fail() {
  printf 'BLOG_RUNTIME_CLIENT_READ_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

for command_name in node npx psql sha256sum git; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "${DATABASE_URL:-}" || fail "DATABASE_URL_missing"
test -s "$SCHEMA" || fail "schema_missing"
mkdir -p "$OUT"

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
PUBLIC_BLOG_OID_BEFORE="$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text,'NULL');")"

mkdir -p "$(dirname "$GENERATED")"
find "$GENERATED" -mindepth 1 -maxdepth 1 -exec rm -rf {} + 2>/dev/null || true

npx --no-install prisma generate --schema "$SCHEMA" >"$OUT/prisma-generate.log" 2>&1 \
  || fail "prisma_generate_failed"

test -s "$GENERATED/index.js" || fail "generated_index_js_missing"
test -s "$GENERATED/index.d.ts" || fail "generated_index_dts_missing"

MODEL_COUNT="$(node -e '
const generated = require(process.argv[1]);
const count = generated.Prisma?.dmmf?.datamodel?.models?.length;
if (!Number.isInteger(count)) process.exit(2);
process.stdout.write(String(count));
' "$GENERATED")" || fail "generated_client_load_failed"

test "$MODEL_COUNT" = "23" || fail "generated_model_count_mismatch"

node - "$GENERATED" "$VALUES" <<'NODE' || exit 21
const fs = require("node:fs");
const generatedPath = process.argv[2];
const valuesPath = process.argv[3];
const { PrismaClient } = require(generatedPath);
const client = new PrismaClient({ log: ["error"] });

async function main() {
  const workspace = await client.blogContentWorkspace.findUnique({
    where: { id: "blog-workspace-sikhadenge-v1" },
    select: {
      id: true,
      key: true,
      name: true,
      locale: true,
      defaultCanonicalHost: true,
      targetPageCapacity: true,
      settings: true,
    },
  });

  if (!workspace) throw new Error("canonical_workspace_missing");
  if (workspace.key !== "sikhadenge-blog") throw new Error("workspace_key_mismatch");
  if (workspace.locale !== "en-IN") throw new Error("workspace_locale_mismatch");
  if (workspace.defaultCanonicalHost !== "https://sikhadenge.in") throw new Error("canonical_host_mismatch");
  if (workspace.targetPageCapacity !== 500000) throw new Error("page_capacity_mismatch");

  const settings = workspace.settings || {};
  if (settings.indexEligibilityDefault !== "BLOCKED") throw new Error("default_index_gate_mismatch");
  if (settings.defaultRobotsDirective !== "noindex,follow") throw new Error("default_robots_mismatch");
  if (settings.requiresPassedQualityGate !== true) throw new Error("quality_gate_setting_mismatch");
  if (settings.requiresEditorialApproval !== true) throw new Error("editorial_gate_setting_mismatch");

  const [workspaceCount, pageCount, topicCount, sourceCount, publicationCount] = await Promise.all([
    client.blogContentWorkspace.count(),
    client.blogContentPage.count(),
    client.blogContentTopic.count(),
    client.blogContentSource.count(),
    client.blogContentPublication.count(),
  ]);

  if (workspaceCount !== 1) throw new Error("workspace_count_mismatch");
  if (pageCount !== 0) throw new Error("unexpected_pages_present");
  if (topicCount !== 0) throw new Error("unexpected_topics_present");
  if (sourceCount !== 0) throw new Error("unexpected_sources_present");
  if (publicationCount !== 0) throw new Error("unexpected_publications_present");

  fs.writeFileSync(valuesPath, [
    `WORKSPACE_ID=${workspace.id}`,
    `WORKSPACE_KEY=${workspace.key}`,
    `WORKSPACE_COUNT=${workspaceCount}`,
    `TARGET_PAGE_CAPACITY=${workspace.targetPageCapacity}`,
    `DEFAULT_INDEX_ELIGIBILITY=${settings.indexEligibilityDefault}`,
    `DEFAULT_ROBOTS_DIRECTIVE=${settings.defaultRobotsDirective}`,
    `PAGES=${pageCount}`,
    `TOPICS=${topicCount}`,
    `SOURCES=${sourceCount}`,
    `PUBLICATIONS=${publicationCount}`,
  ].join("\n") + "\n", { mode: 0o600 });
}

main()
  .then(() => client.$disconnect())
  .catch(async (error) => {
    console.error(error instanceof Error ? error.message : String(error));
    await client.$disconnect().catch(() => undefined);
    process.exit(1);
  });
NODE

NODE_RC=$?
test "$NODE_RC" = "0" || fail "runtime_client_read_failed"
test -s "$VALUES" || fail "runtime_values_missing"

ROOT_CLIENT_JS_AFTER="$(hash_or_missing "$ROOT_CLIENT_JS")"
ROOT_CLIENT_DTS_AFTER="$(hash_or_missing "$ROOT_CLIENT_DTS")"
PUBLIC_BLOG_OID_AFTER="$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text,'NULL');")"

test "$ROOT_CLIENT_JS_BEFORE" = "$ROOT_CLIENT_JS_AFTER" || fail "root_prisma_client_js_changed"
test "$ROOT_CLIENT_DTS_BEFORE" = "$ROOT_CLIENT_DTS_AFTER" || fail "root_prisma_client_dts_changed"
test "$PUBLIC_BLOG_OID_BEFORE" != "NULL" || fail "public_blog_table_missing"
test "$PUBLIC_BLOG_OID_BEFORE" = "$PUBLIC_BLOG_OID_AFTER" || fail "public_blog_identity_changed"

cat >"$OUT/status.txt" <<STATUS
BLOG_RUNTIME_CLIENT_READ_STATUS=PASS
ISOLATED_CLIENT_GENERATED=YES
GENERATED_MODEL_COUNT=23
CANONICAL_WORKSPACE_READ=YES
ZERO_CONTENT_BASELINE_VERIFIED=YES
ROOT_PRISMA_CLIENT_UNCHANGED=YES
PUBLIC_BLOG_OID_UNCHANGED=YES
DATABASE_PERSISTENT_WRITE_PERFORMED=NO
SCHEMA_SHA256=$(sha256sum "$SCHEMA" | awk '{print $1}')
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
cat "$VALUES"
