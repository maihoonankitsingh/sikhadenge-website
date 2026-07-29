#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
SCHEMA="$ROOT/modules/blog/database/schema.prisma"
GENERATED="$ROOT/modules/blog/database/generated/client"
LOCAL_PRISMA="$ROOT/node_modules/.bin/prisma"
LOCAL_TSX="$ROOT/node_modules/.bin/tsx"
ROUTE="$ROOT/app/api/internal/blog-review-preview/[slug]/route.ts"
APPROVAL="$ROOT/modules/blog/inventory/releases/0012-controlled-blog-review-preview-route-mount-approval-v1.release.json"
PACKAGE="${1:-}"
OUT="${2:-/var/lib/sikhadenge-blog-artifacts/blog-controlled-review-preview-route-smoke-v1-$(date +%Y%m%d_%H%M%S)}"
RUNNER="$OUT/route-smoke.ts"
VALUES="$OUT/route-smoke-values.json"
SHIM_NODE_MODULES="$OUT/node_modules"
SERVER_ONLY_SHIM="$SHIM_NODE_MODULES/server-only"
EXPECTED_ROUTE_BLOB='f7131d88117b11e7585bcfa2ee7ed21067cf0d77'
EXPECTED_LIVE_BLOG_ROUTE_BLOB='e88506577386c5612215a0e5eebe29037bf76eed'
EXPECTED_PUBLIC_BLOG_OID='20331'

fail() {
  mkdir -p "$OUT"
  printf 'BLOG_CONTROLLED_REVIEW_PREVIEW_ROUTE_SMOKE_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

for command_name in node psql sha256sum git grep; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "${DATABASE_URL:-}" || fail 'DATABASE_URL_missing'
test -n "$PACKAGE" && test -d "$PACKAGE" || fail 'package_missing'
test -s "$PACKAGE/manifest.json" || fail 'manifest_missing'
test -s "$SCHEMA" || fail 'schema_missing'
test -x "$LOCAL_PRISMA" || fail 'local_prisma_missing'
test -x "$LOCAL_TSX" || fail 'local_tsx_missing'
test -s "$ROUTE" || fail 'route_missing'
test -s "$APPROVAL" || fail 'approval_manifest_missing'
mkdir -p "$OUT"
chmod 700 "$OUT"

git -C "$ROOT" diff --quiet || fail 'tracked_worktree_changes_present'
git -C "$ROOT" diff --cached --quiet || fail 'staged_worktree_changes_present'

test "$(git -C "$ROOT" hash-object "$ROUTE")" = "$EXPECTED_ROUTE_BLOB" || fail 'route_blob_mismatch'
test "$(git -C "$ROOT" rev-parse 'HEAD:app/blog/[slug]/page.tsx')" = "$EXPECTED_LIVE_BLOG_ROUTE_BLOB" || fail 'live_blog_route_blob_changed'

node - "$APPROVAL" <<'NODE'
const fs = require('node:fs');
const release = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
if (
  release.releaseId !== 'controlled-blog-review-preview-route-mount-approval-v1' ||
  release.status !== 'explicitly-approved-not-deployed' ||
  release.approvalPhrase !== 'APPROVE CONTROLLED BLOG REVIEW PREVIEW ROUTE MOUNT V1' ||
  release.approvedScope?.route !== '/api/internal/blog-review-preview/[slug]' ||
  release.approvedScope?.method !== 'GET' ||
  release.requiredSafety?.databaseWriteAllowed !== false ||
  release.requiredSafety?.liveBlogRouteModified !== false ||
  release.requiredSafety?.productionDeploymentApproved !== false
) throw new Error('approval_manifest_contract_mismatch');
NODE

if grep -Eq 'export[[:space:]]+(async[[:space:]]+)?function[[:space:]]+(POST|PUT|PATCH|DELETE|HEAD|OPTIONS)' "$ROUTE"; then
  fail 'non_get_handler_exported'
fi
if grep -Eq '\.(create|createMany|update|updateMany|upsert|delete|deleteMany|executeRaw|executeRawUnsafe)\(' "$ROUTE"; then
  fail 'database_write_primitive_detected'
fi
if grep -Eq 'console\.(log|info|warn|error|debug)' "$ROUTE"; then
  fail 'route_logging_detected'
fi

action_hash_or_missing() {
  local file="$1"
  if test -f "$file"; then sha256sum "$file" | awk '{print $1}'; else printf 'MISSING\n'; fi
}

ROOT_CLIENT_JS="$ROOT/node_modules/.prisma/client/index.js"
ROOT_CLIENT_DTS="$ROOT/node_modules/.prisma/client/index.d.ts"
ROOT_CLIENT_JS_BEFORE="$(action_hash_or_missing "$ROOT_CLIENT_JS")"
ROOT_CLIENT_DTS_BEFORE="$(action_hash_or_missing "$ROOT_CLIENT_DTS")"
PUBLIC_BLOG_OID_BEFORE="$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text,'NULL');")"
DB_SIGNATURE_BEFORE="$(psql "$DATABASE_URL" -X -At -F'|' -c "SELECT
  (SELECT count(*) FROM blog_content.workspaces),
  (SELECT count(*) FROM blog_content.pages),
  (SELECT count(*) FROM blog_content.page_versions),
  (SELECT count(*) FROM blog_content.content_fingerprints),
  (SELECT count(*) FROM blog_content.publications),
  (SELECT count(*) FROM blog_content.quality_runs),
  (SELECT count(*) FROM blog_content.editorial_reviews);")"

test "$PUBLIC_BLOG_OID_BEFORE" = "$EXPECTED_PUBLIC_BLOG_OID" || fail 'public_blog_identity_changed_before_read'

mkdir -p "$(dirname "$GENERATED")"
find "$GENERATED" -mindepth 1 -maxdepth 1 -exec rm -rf {} + 2>/dev/null || true
(
  cd "$ROOT"
  "$LOCAL_PRISMA" generate --schema "$SCHEMA"
) >"$OUT/prisma-generate.log" 2>&1 || fail 'prisma_generate_failed'
test -s "$GENERATED/index.js" || fail 'generated_index_js_missing'
test -s "$GENERATED/index.d.ts" || fail 'generated_index_dts_missing'

mkdir -p "$SERVER_ONLY_SHIM"
cat > "$SERVER_ONLY_SHIM/package.json" <<'JSON'
{"name":"server-only","version":"0.0.0-blog-preview-route-smoke","private":true,"main":"index.js"}
JSON
printf '%s\n' '"use strict";' 'module.exports = {};' > "$SERVER_ONLY_SHIM/index.js"

FIRST_SLUG="$(node - "$PACKAGE" <<'NODE'
const fs = require('node:fs');
const path = require('node:path');
const packageDir = process.argv[2];
const manifest = JSON.parse(fs.readFileSync(path.join(packageDir, 'manifest.json'), 'utf8'));
const first = manifest.batches[0];
const line = fs.readFileSync(path.join(packageDir, first.file), 'utf8').split('\n').find(Boolean);
console.log(JSON.parse(line).page.slug);
NODE
)"

TEST_TOKEN="$(printf '%s' "$OUT:controlled-blog-review-preview-route-v1" | sha256sum | awk '{print $1}')"

cat > "$RUNNER" <<'TS'
import fs from "node:fs";
import { NextRequest } from "next/server";
import * as routeModule from "@/app/api/internal/blog-review-preview/[slug]/route";
import { BLOG_REVIEW_PREVIEW_HEADER, BLOG_REVIEW_PREVIEW_TOKEN_ENV } from "@/modules/blog/preview";
import { blogContentDb } from "@/modules/blog/database/client";

const slug = process.env.BLOG_ROUTE_SMOKE_SLUG;
const token = process.env.BLOG_ROUTE_SMOKE_TOKEN;
const valuesPath = process.env.BLOG_ROUTE_SMOKE_VALUES;
if (!slug || !token || !valuesPath) throw new Error("route_smoke_environment_missing");

const forbiddenHandlers = ["POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];
for (const method of forbiddenHandlers) {
  if (method in routeModule) throw new Error(`unexpected_${method}_handler_exported`);
}
if (typeof routeModule.GET !== "function") throw new Error("GET_handler_missing");

const expectedHeaders: Record<string, string> = {
  "cache-control": "private, no-store, no-cache, max-age=0, must-revalidate",
  "x-robots-tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
  "referrer-policy": "no-referrer",
  "x-frame-options": "DENY",
  "x-content-type-options": "nosniff",
  "cross-origin-resource-policy": "same-origin",
  "vary": BLOG_REVIEW_PREVIEW_HEADER,
};

async function invoke(targetSlug: string, presentedToken?: string) {
  const headers = new Headers();
  if (presentedToken !== undefined) headers.set(BLOG_REVIEW_PREVIEW_HEADER, presentedToken);
  const request = new NextRequest(`https://sikhadenge.in/api/internal/blog-review-preview/${encodeURIComponent(targetSlug)}`, { headers });
  const response = await routeModule.GET(request, { params: { slug: targetSlug } });
  for (const [name, value] of Object.entries(expectedHeaders)) {
    if (response.headers.get(name) !== value) throw new Error(`header_${name}_mismatch_${response.status}`);
  }
  const text = await response.text();
  if (text.includes(token)) throw new Error(`token_returned_in_body_${response.status}`);
  return { response, body: JSON.parse(text) };
}

async function main() {
  const originalToken = process.env[BLOG_REVIEW_PREVIEW_TOKEN_ENV];

  delete process.env[BLOG_REVIEW_PREVIEW_TOKEN_ENV];
  const missingConfig = await invoke(slug, token);
  if (missingConfig.response.status !== 503 || missingConfig.body.error !== "PREVIEW_UNAVAILABLE") {
    throw new Error("missing_configuration_not_fail_closed");
  }

  process.env[BLOG_REVIEW_PREVIEW_TOKEN_ENV] = "weak-token";
  const weakConfig = await invoke(slug, "weak-token");
  if (weakConfig.response.status !== 503 || weakConfig.body.error !== "PREVIEW_UNAVAILABLE") {
    throw new Error("weak_configuration_not_fail_closed");
  }

  process.env[BLOG_REVIEW_PREVIEW_TOKEN_ENV] = token;

  const absentToken = await invoke(slug);
  if (absentToken.response.status !== 404 || absentToken.body.error !== "NOT_FOUND") {
    throw new Error("absent_token_not_hidden");
  }

  const wrongToken = await invoke(slug, `${token}-wrong`);
  if (wrongToken.response.status !== 404 || wrongToken.body.error !== "NOT_FOUND") {
    throw new Error("wrong_token_not_hidden");
  }

  const valid = await invoke(slug, token);
  if (
    valid.response.status !== 200 ||
    valid.body.ok !== true ||
    valid.body.mode !== "CONTROLLED_REVIEW_PREVIEW" ||
    valid.body.record?.page?.slug !== slug ||
    valid.body.metadata?.index !== false ||
    valid.body.metadata?.follow !== false ||
    valid.body.metadata?.canonicalUrl !== null ||
    valid.body.access?.authenticated !== true ||
    valid.body.access?.tokenStored !== false ||
    valid.body.access?.tokenReturned !== false ||
    valid.body.routeSafety?.reviewOnly !== true ||
    valid.body.routeSafety?.routeMounted !== true ||
    valid.body.routeSafety?.routeEligible !== false ||
    valid.body.routeSafety?.publicationApproved !== false ||
    valid.body.routeSafety?.indexEligibilityApproved !== false ||
    valid.body.routeSafety?.databaseWriteAllowed !== false ||
    valid.body.routeSafety?.liveBlogRouteModified !== false
  ) throw new Error("valid_route_response_contract_mismatch");

  const missingSlug = await invoke("definitely-missing-preview-route-record-v1", token);
  if (missingSlug.response.status !== 404 || missingSlug.body.error !== "NOT_FOUND") {
    throw new Error("missing_slug_response_mismatch");
  }

  const malformedSlug = await invoke("../unsafe preview slug", token);
  if (malformedSlug.response.status !== 400 || malformedSlug.body.error !== "INVALID_SLUG") {
    throw new Error("malformed_slug_response_mismatch");
  }

  if (originalToken === undefined) delete process.env[BLOG_REVIEW_PREVIEW_TOKEN_ENV];
  else process.env[BLOG_REVIEW_PREVIEW_TOKEN_ENV] = originalToken;

  fs.writeFileSync(valuesPath, `${JSON.stringify({
    slug,
    statuses: {
      missingConfiguration: missingConfig.response.status,
      weakConfiguration: weakConfig.response.status,
      absentToken: absentToken.response.status,
      wrongToken: wrongToken.response.status,
      valid: valid.response.status,
      missingSlug: missingSlug.response.status,
      malformedSlug: malformedSlug.response.status,
    },
    routeMounted: true,
    routeEligible: false,
    publicationApproved: false,
    indexingApproved: false,
    databaseWriteAllowed: false,
  }, null, 2)}\n`, { mode: 0o600 });
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
  BLOG_ROUTE_SMOKE_SLUG="$FIRST_SLUG" \
  BLOG_ROUTE_SMOKE_TOKEN="$TEST_TOKEN" \
  BLOG_ROUTE_SMOKE_VALUES="$VALUES" \
  NODE_PATH="$SHIM_NODE_MODULES${NODE_PATH:+:$NODE_PATH}" \
  NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--conditions=react-server" \
    "$LOCAL_TSX" "$RUNNER"
) >"$OUT/route-smoke.log" 2>&1
RUNNER_RC=$?
set -e
if test "$RUNNER_RC" -ne 0; then
  tail -n 100 "$OUT/route-smoke.log" >&2 || true
  fail 'route_runtime_smoke_failed'
fi

test -s "$VALUES" || fail 'route_smoke_values_missing'
if grep -R -F -- "$TEST_TOKEN" "$OUT" >/dev/null 2>&1; then
  fail 'preview_token_leaked_to_artifacts'
fi

ROOT_CLIENT_JS_AFTER="$(action_hash_or_missing "$ROOT_CLIENT_JS")"
ROOT_CLIENT_DTS_AFTER="$(action_hash_or_missing "$ROOT_CLIENT_DTS")"
PUBLIC_BLOG_OID_AFTER="$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text,'NULL');")"
DB_SIGNATURE_AFTER="$(psql "$DATABASE_URL" -X -At -F'|' -c "SELECT
  (SELECT count(*) FROM blog_content.workspaces),
  (SELECT count(*) FROM blog_content.pages),
  (SELECT count(*) FROM blog_content.page_versions),
  (SELECT count(*) FROM blog_content.content_fingerprints),
  (SELECT count(*) FROM blog_content.publications),
  (SELECT count(*) FROM blog_content.quality_runs),
  (SELECT count(*) FROM blog_content.editorial_reviews);")"

test "$ROOT_CLIENT_JS_BEFORE" = "$ROOT_CLIENT_JS_AFTER" || fail 'root_prisma_client_js_changed'
test "$ROOT_CLIENT_DTS_BEFORE" = "$ROOT_CLIENT_DTS_AFTER" || fail 'root_prisma_client_dts_changed'
test "$PUBLIC_BLOG_OID_BEFORE" = "$PUBLIC_BLOG_OID_AFTER" || fail 'public_blog_identity_changed'
test "$DB_SIGNATURE_BEFORE" = "$DB_SIGNATURE_AFTER" || fail 'database_signature_changed_during_read'
test "$(git -C "$ROOT" rev-parse 'HEAD:app/blog/[slug]/page.tsx')" = "$EXPECTED_LIVE_BLOG_ROUTE_BLOB" || fail 'live_blog_route_blob_changed_after_smoke'

cat > "$OUT/status.txt" <<STATUS
BLOG_CONTROLLED_REVIEW_PREVIEW_ROUTE_SMOKE_STATUS=PASS
EXPLICIT_APPROVAL_VERIFIED=YES
ROUTE_PATH=/api/internal/blog-review-preview/[slug]
GET_HANDLER_MOUNTED=YES
NON_GET_HANDLERS_EXPORTED=NO
TOKEN_CONFIGURATION_MISSING_FAIL_CLOSED=YES
TOKEN_CONFIGURATION_WEAK_FAIL_CLOSED=YES
TOKEN_ABSENT_HIDDEN_AS_NOT_FOUND=YES
TOKEN_WRONG_HIDDEN_AS_NOT_FOUND=YES
TOKEN_LEAKED_TO_ARTIFACTS=NO
VALID_AUTHENTICATED_READ_STATUS=200
MISSING_SLUG_STATUS=404
MALFORMED_SLUG_STATUS=400
NOINDEX_NOFOLLOW_NOARCHIVE=YES
CACHE_CONTROL_PRIVATE_NO_STORE=YES
CANONICAL_EXPOSED=NO
ROUTE_MOUNTED=YES
ROUTE_ELIGIBLE=NO
PUBLICATION_APPROVED=NO
INDEX_ELIGIBILITY_APPROVED=NO
DATABASE_WRITE_ALLOWED=NO
LIVE_BLOG_ROUTE_MODIFIED=NO
ROOT_PRISMA_CLIENT_UNCHANGED=YES
PUBLIC_BLOG_OID_UNCHANGED=YES
DATABASE_SIGNATURE_UNCHANGED=YES
DATABASE_READ_PERFORMED=YES
DATABASE_WRITE_PERFORMED=NO
PRODUCTION_DEPLOYMENT_PERFORMED=NO
SAMPLE_SLUG=$FIRST_SLUG
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
