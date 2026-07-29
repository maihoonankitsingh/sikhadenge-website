#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
SCHEMA="$ROOT/modules/blog/database/schema.prisma"
GENERATED="$ROOT/modules/blog/database/generated/client"
OUT="${1:-/tmp/blog-runtime-repository-read-$(date +%Y%m%d_%H%M%S)}"
RUNNER="$OUT/repository-read.ts"
VALUES="$OUT/repository-values.txt"
SHIM_NODE_MODULES="$OUT/node_modules"
SERVER_ONLY_SHIM="$SHIM_NODE_MODULES/server-only"

fail() {
  printf 'BLOG_RUNTIME_REPOSITORY_READ_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
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
BLOG_ROWS_BEFORE="$(psql "$DATABASE_URL" -X -Atc "
SELECT
  (SELECT count(*) FROM blog_content.workspaces) +
  (SELECT count(*) FROM blog_content.topics) +
  (SELECT count(*) FROM blog_content.audiences) +
  (SELECT count(*) FROM blog_content.search_intents) +
  (SELECT count(*) FROM blog_content.sources) +
  (SELECT count(*) FROM blog_content.claims) +
  (SELECT count(*) FROM blog_content.pages) +
  (SELECT count(*) FROM blog_content.page_versions) +
  (SELECT count(*) FROM blog_content.publications) +
  (SELECT count(*) FROM blog_content.quality_runs) +
  (SELECT count(*) FROM blog_content.refresh_jobs);")"

mkdir -p "$(dirname "$GENERATED")"
find "$GENERATED" -mindepth 1 -maxdepth 1 -exec rm -rf {} + 2>/dev/null || true

npx --no-install prisma generate --schema "$SCHEMA" >"$OUT/prisma-generate.log" 2>&1 \
  || fail "prisma_generate_failed"

test -s "$GENERATED/index.js" || fail "generated_index_js_missing"
test -s "$GENERATED/index.d.ts" || fail "generated_index_dts_missing"

# Next.js resolves `server-only` as a framework boundary. This standalone tsx
# smoke runner executes outside Next.js, so provide a private test-only shim in
# the report directory instead of modifying production node_modules.
mkdir -p "$SERVER_ONLY_SHIM"
cat > "$SERVER_ONLY_SHIM/package.json" <<'JSON'
{
  "name": "server-only",
  "version": "0.0.0-blog-smoke-shim",
  "private": true,
  "main": "index.js"
}
JSON
printf '%s\n' '"use strict";' 'module.exports = {};' > "$SERVER_ONLY_SHIM/index.js"

NODE_PATH="$SHIM_NODE_MODULES${NODE_PATH:+:$NODE_PATH}" \
  node -e 'require("server-only")' \
  || fail "server_only_test_shim_load_failed"

cat > "$RUNNER" <<'TS'
import fs from "node:fs";
import { blogContentDb } from "@/modules/blog/database/client";
import {
  CANONICAL_BLOG_WORKSPACE_ID,
  CANONICAL_BLOG_WORKSPACE_KEY,
  getBlogPlatformBaseline,
} from "@/modules/blog/server";

const valuesPath = process.env.BLOG_REPOSITORY_VALUES_PATH;
if (!valuesPath) {
  throw new Error("BLOG_REPOSITORY_VALUES_PATH_missing");
}

async function main() {
  const baseline = await getBlogPlatformBaseline();
  const { workspace, counts } = baseline;

  if (workspace.id !== CANONICAL_BLOG_WORKSPACE_ID) {
    throw new Error("workspace_id_mismatch");
  }
  if (workspace.key !== CANONICAL_BLOG_WORKSPACE_KEY) {
    throw new Error("workspace_key_mismatch");
  }
  if (workspace.targetPageCapacity !== 500000) {
    throw new Error("workspace_capacity_mismatch");
  }
  if (workspace.settings.indexEligibilityDefault !== "BLOCKED") {
    throw new Error("workspace_index_default_mismatch");
  }
  if (workspace.settings.defaultRobotsDirective !== "noindex,follow") {
    throw new Error("workspace_robots_default_mismatch");
  }

  if (counts.workspaces !== 1) throw new Error("workspace_count_mismatch");
  if (counts.topics !== 0) throw new Error("unexpected_topics_present");
  if (counts.audiences !== 0) throw new Error("unexpected_audiences_present");
  if (counts.searchIntents !== 0) throw new Error("unexpected_search_intents_present");
  if (counts.sources !== 0) throw new Error("unexpected_sources_present");
  if (counts.claims !== 0) throw new Error("unexpected_claims_present");
  if (counts.pages !== 0) throw new Error("unexpected_pages_present");
  if (counts.pageVersions !== 0) throw new Error("unexpected_page_versions_present");
  if (counts.publications !== 0) throw new Error("unexpected_publications_present");
  if (counts.qualityRuns !== 0) throw new Error("unexpected_quality_runs_present");
  if (counts.refreshJobs !== 0) throw new Error("unexpected_refresh_jobs_present");

  fs.writeFileSync(
    valuesPath,
    [
      `WORKSPACE_ID=${workspace.id}`,
      `WORKSPACE_KEY=${workspace.key}`,
      `WORKSPACE_COUNT=${counts.workspaces}`,
      `TARGET_PAGE_CAPACITY=${workspace.targetPageCapacity}`,
      `DEFAULT_INDEX_ELIGIBILITY=${workspace.settings.indexEligibilityDefault}`,
      `DEFAULT_ROBOTS_DIRECTIVE=${workspace.settings.defaultRobotsDirective}`,
      `TOPICS=${counts.topics}`,
      `AUDIENCES=${counts.audiences}`,
      `SEARCH_INTENTS=${counts.searchIntents}`,
      `SOURCES=${counts.sources}`,
      `CLAIMS=${counts.claims}`,
      `PAGES=${counts.pages}`,
      `PAGE_VERSIONS=${counts.pageVersions}`,
      `PUBLICATIONS=${counts.publications}`,
      `QUALITY_RUNS=${counts.qualityRuns}`,
      `REFRESH_JOBS=${counts.refreshJobs}`,
    ].join("\n") + "\n",
    { mode: 0o600 },
  );
}

main()
  .then(() => blogContentDb.$disconnect())
  .catch(async (error) => {
    console.error(error instanceof Error ? error.message : String(error));
    await blogContentDb.$disconnect().catch(() => undefined);
    process.exit(1);
  });
TS

set +e
(
  cd "$ROOT"
  BLOG_REPOSITORY_VALUES_PATH="$VALUES" \
  NODE_PATH="$SHIM_NODE_MODULES${NODE_PATH:+:$NODE_PATH}" \
  NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--conditions=react-server" \
    npx --no-install tsx "$RUNNER"
) >"$OUT/repository-read.log" 2>&1
RUNNER_RC=$?
set -e

if [ "$RUNNER_RC" -ne 0 ]; then
  tail -n 80 "$OUT/repository-read.log" >&2 || true
  fail "runtime_repository_read_failed"
fi

test -s "$VALUES" || fail "repository_values_missing"

ROOT_CLIENT_JS_AFTER="$(hash_or_missing "$ROOT_CLIENT_JS")"
ROOT_CLIENT_DTS_AFTER="$(hash_or_missing "$ROOT_CLIENT_DTS")"
PUBLIC_BLOG_OID_AFTER="$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text,'NULL');")"
BLOG_ROWS_AFTER="$(psql "$DATABASE_URL" -X -Atc "
SELECT
  (SELECT count(*) FROM blog_content.workspaces) +
  (SELECT count(*) FROM blog_content.topics) +
  (SELECT count(*) FROM blog_content.audiences) +
  (SELECT count(*) FROM blog_content.search_intents) +
  (SELECT count(*) FROM blog_content.sources) +
  (SELECT count(*) FROM blog_content.claims) +
  (SELECT count(*) FROM blog_content.pages) +
  (SELECT count(*) FROM blog_content.page_versions) +
  (SELECT count(*) FROM blog_content.publications) +
  (SELECT count(*) FROM blog_content.quality_runs) +
  (SELECT count(*) FROM blog_content.refresh_jobs);")"

test "$ROOT_CLIENT_JS_BEFORE" = "$ROOT_CLIENT_JS_AFTER" || fail "root_prisma_client_js_changed"
test "$ROOT_CLIENT_DTS_BEFORE" = "$ROOT_CLIENT_DTS_AFTER" || fail "root_prisma_client_dts_changed"
test "$PUBLIC_BLOG_OID_BEFORE" != "NULL" || fail "public_blog_table_missing"
test "$PUBLIC_BLOG_OID_BEFORE" = "$PUBLIC_BLOG_OID_AFTER" || fail "public_blog_identity_changed"
test "$BLOG_ROWS_BEFORE" = "$BLOG_ROWS_AFTER" || fail "blog_row_count_changed_during_read"

cat > "$OUT/status.txt" <<STATUS
BLOG_RUNTIME_REPOSITORY_READ_STATUS=PASS
SERVER_ONLY_ENTRYPOINT_LOADED=YES
SERVER_ONLY_TEST_SHIM_USED=YES
CONTROLLED_REPOSITORY_READ=YES
CANONICAL_WORKSPACE_INVARIANTS_VERIFIED=YES
ZERO_CONTENT_BASELINE_VERIFIED=YES
ISOLATED_CLIENT_GENERATED=YES
ROOT_PRISMA_CLIENT_UNCHANGED=YES
PUBLIC_BLOG_OID_UNCHANGED=YES
BLOG_ROW_COUNT_BEFORE=$BLOG_ROWS_BEFORE
BLOG_ROW_COUNT_AFTER=$BLOG_ROWS_AFTER
DATABASE_PERSISTENT_WRITE_PERFORMED=NO
SCHEMA_SHA256=$(sha256sum "$SCHEMA" | awk '{print $1}')
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
cat "$VALUES"
