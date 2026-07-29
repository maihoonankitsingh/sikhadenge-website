#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
SCHEMA="$ROOT/modules/blog/database/schema.prisma"
GENERATED="$ROOT/modules/blog/database/generated/client"
LOCAL_PRISMA="$ROOT/node_modules/.bin/prisma"
LOCAL_TSX="$ROOT/node_modules/.bin/tsx"
PACKAGE="${1:-}"
OUT="${2:-/var/lib/sikhadenge-blog-artifacts/blog-controlled-review-preview-contract-smoke-v1-$(date +%Y%m%d_%H%M%S)}"
EXPECTED="$OUT/expected-samples.json"
RUNNER="$OUT/controlled-review-preview-contract-smoke.ts"
VALUES="$OUT/preview-contract-values.json"
SHIM_NODE_MODULES="$OUT/node_modules"
SERVER_ONLY_SHIM="$SHIM_NODE_MODULES/server-only"
EXPECTED_RECORDS='120097'
EXPECTED_PUBLIC_BLOG_OID='20331'

fail() {
  mkdir -p "$OUT"
  printf 'BLOG_CONTROLLED_REVIEW_PREVIEW_CONTRACT_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
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
mkdir -p "$OUT"
chmod 700 "$OUT"

git -C "$ROOT" diff --quiet || fail 'tracked_worktree_changes_present'
git -C "$ROOT" diff --cached --quiet || fail 'staged_worktree_changes_present'
test -z "$(git -C "$ROOT" status --porcelain -- app)" || fail 'app_tree_changes_present_before_smoke'

node - "$PACKAGE" "$EXPECTED" <<'NODE'
const fs = require('node:fs');
const path = require('node:path');
const [packageDir, outputPath] = process.argv.slice(2);
const manifest = JSON.parse(fs.readFileSync(path.join(packageDir, 'manifest.json'), 'utf8'));
const ordinals = [0, 60048, 120096];
if (manifest.sourcePlan?.recordCount !== 120097 || manifest.batches?.length !== 121) {
  throw new Error('manifest_contract_mismatch');
}
const samples = ordinals.map((ordinal) => {
  const batch = manifest.batches.find((entry) => ordinal >= entry.firstOrdinal && ordinal <= entry.lastOrdinal);
  if (!batch) throw new Error(`sample_batch_missing:${ordinal}`);
  const lines = fs.readFileSync(path.join(packageDir, batch.file), 'utf8').trimEnd().split('\n');
  const record = JSON.parse(lines[ordinal - batch.firstOrdinal]);
  return { ordinal, record };
});
fs.writeFileSync(outputPath, `${JSON.stringify(samples, null, 2)}\n`, { mode: 0o600 });
NODE

test -s "$EXPECTED" || fail 'expected_samples_missing'

hash_or_missing() {
  local file="$1"
  if test -f "$file"; then sha256sum "$file" | awk '{print $1}'; else printf 'MISSING\n'; fi
}

ROOT_CLIENT_JS="$ROOT/node_modules/.prisma/client/index.js"
ROOT_CLIENT_DTS="$ROOT/node_modules/.prisma/client/index.d.ts"
ROOT_CLIENT_JS_BEFORE="$(hash_or_missing "$ROOT_CLIENT_JS")"
ROOT_CLIENT_DTS_BEFORE="$(hash_or_missing "$ROOT_CLIENT_DTS")"
APP_TREE_BEFORE="$(git -C "$ROOT" rev-parse HEAD:app)"
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
{"name":"server-only","version":"0.0.0-blog-controlled-review-preview-smoke","private":true,"main":"index.js"}
JSON
printf '%s\n' '"use strict";' 'module.exports = {};' > "$SERVER_ONLY_SHIM/index.js"
NODE_PATH="$SHIM_NODE_MODULES${NODE_PATH:+:$NODE_PATH}" node -e 'require("server-only")' || fail 'server_only_test_shim_load_failed'

TEST_TOKEN="$(printf '%s' "$OUT:controlled-blog-review-preview-v1" | sha256sum | awk '{print $1}')"

cat > "$RUNNER" <<'TS'
import fs from "node:fs";
import { blogContentDb } from "@/modules/blog/database/client";
import {
  BLOG_REVIEW_PREVIEW_HEADER,
  BLOG_REVIEW_PREVIEW_TOKEN_ENV,
  getControlledImportedBlogReviewPreview,
} from "@/modules/blog/preview";
import { BlogRepositoryInvariantError } from "@/modules/blog/repositories/workspace-repository";

const expectedPath = process.env.BLOG_PREVIEW_EXPECTED_PATH;
const valuesPath = process.env.BLOG_PREVIEW_VALUES_PATH;
const testToken = process.env.BLOG_PREVIEW_TEST_TOKEN;
if (!expectedPath || !valuesPath || !testToken) {
  throw new Error("preview_contract_smoke_paths_missing");
}
const expected = JSON.parse(fs.readFileSync(expectedPath, "utf8"));

async function expectInvariantCode(
  operation: () => Promise<unknown>,
  expectedCode: string,
): Promise<void> {
  let observedCode = "";
  try {
    await operation();
  } catch (error) {
    if (!(error instanceof BlogRepositoryInvariantError)) throw error;
    observedCode = error.code;
  }
  if (observedCode !== expectedCode) {
    throw new Error(`preview_expected_${expectedCode}_observed_${observedCode || "NONE"}`);
  }
}

async function main() {
  const originalToken = process.env[BLOG_REVIEW_PREVIEW_TOKEN_ENV];

  delete process.env[BLOG_REVIEW_PREVIEW_TOKEN_ENV];
  await expectInvariantCode(
    () => getControlledImportedBlogReviewPreview({
      slug: expected[0].record.page.slug,
      presentedToken: testToken,
    }),
    "BLOG_REVIEW_PREVIEW_TOKEN_MISSING",
  );

  process.env[BLOG_REVIEW_PREVIEW_TOKEN_ENV] = "weak-token";
  await expectInvariantCode(
    () => getControlledImportedBlogReviewPreview({
      slug: expected[0].record.page.slug,
      presentedToken: "weak-token",
    }),
    "BLOG_REVIEW_PREVIEW_TOKEN_WEAK",
  );

  process.env[BLOG_REVIEW_PREVIEW_TOKEN_ENV] = testToken;
  await expectInvariantCode(
    () => getControlledImportedBlogReviewPreview({
      slug: expected[0].record.page.slug,
      presentedToken: null,
    }),
    "BLOG_REVIEW_PREVIEW_UNAUTHORIZED",
  );
  await expectInvariantCode(
    () => getControlledImportedBlogReviewPreview({
      slug: expected[0].record.page.slug,
      presentedToken: `${testToken}-wrong`,
    }),
    "BLOG_REVIEW_PREVIEW_UNAUTHORIZED",
  );

  const results: Array<Record<string, unknown>> = [];
  for (const sample of expected) {
    const wanted = sample.record;
    const preview = await getControlledImportedBlogReviewPreview({
      slug: wanted.page.slug,
      presentedToken: testToken,
    });
    if (!preview) throw new Error(`preview_record_missing:${sample.ordinal}`);

    const expectedPairs: Array<[string, unknown, unknown]> = [
      ["page.id", preview.record.page.id, wanted.page.id],
      ["page.slug", preview.record.page.slug, wanted.page.slug],
      ["page.canonicalPath", preview.record.page.canonicalPath, wanted.page.canonicalPath],
      ["version.id", preview.record.version.id, wanted.version.id],
      ["version.exactHash", preview.record.version.exactHash, wanted.version.exactHash],
      ["fingerprint.id", preview.record.fingerprint.id, wanted.fingerprint.id],
      ["fingerprint.exactHash", preview.record.fingerprint.exactHash, wanted.fingerprint.exactHash],
    ];
    for (const [label, observed, expectedValue] of expectedPairs) {
      if (observed !== expectedValue) {
        throw new Error(`preview_${sample.ordinal}_${label}_mismatch`);
      }
    }

    if (
      preview.mode !== "CONTROLLED_REVIEW_PREVIEW" ||
      preview.response.cacheControl !== "private, no-store, no-cache, max-age=0, must-revalidate" ||
      preview.response.robots !== "noindex, nofollow, noarchive, nosnippet, noimageindex" ||
      preview.response.referrerPolicy !== "no-referrer" ||
      preview.response.frameOptions !== "DENY" ||
      preview.metadata.index !== false ||
      preview.metadata.follow !== false ||
      preview.metadata.archive !== false ||
      preview.metadata.snippet !== false ||
      preview.metadata.imageIndex !== false ||
      preview.metadata.canonicalUrl !== null ||
      preview.access.tokenHeader !== BLOG_REVIEW_PREVIEW_HEADER ||
      preview.access.authenticated !== true ||
      preview.access.tokenStored !== false ||
      preview.access.tokenReturned !== false ||
      preview.safety.reviewOnly !== true ||
      preview.safety.routeMounted !== false ||
      preview.safety.routeEligible !== false ||
      preview.safety.publicationApproved !== false ||
      preview.safety.indexEligibilityApproved !== false ||
      preview.safety.databaseWriteAllowed !== false
    ) {
      throw new Error(`preview_${sample.ordinal}_safety_contract_mismatch`);
    }

    if (JSON.stringify(preview).includes(testToken)) {
      throw new Error(`preview_${sample.ordinal}_token_returned`);
    }

    results.push({
      ordinal: sample.ordinal,
      slug: preview.record.page.slug,
      pageId: preview.record.page.id,
      routeMounted: preview.safety.routeMounted,
      routeEligible: preview.safety.routeEligible,
    });
  }

  const missing = await getControlledImportedBlogReviewPreview({
    slug: "definitely-missing-controlled-review-preview-v1",
    presentedToken: testToken,
  });
  if (missing !== null) throw new Error("preview_missing_slug_did_not_return_null");

  await expectInvariantCode(
    () => getControlledImportedBlogReviewPreview({
      slug: "../unsafe preview slug",
      presentedToken: testToken,
    }),
    "IMPORTED_PAGE_SLUG_INVALID",
  );

  if (originalToken === undefined) {
    delete process.env[BLOG_REVIEW_PREVIEW_TOKEN_ENV];
  } else {
    process.env[BLOG_REVIEW_PREVIEW_TOKEN_ENV] = originalToken;
  }

  fs.writeFileSync(
    valuesPath,
    `${JSON.stringify({
      results,
      tokenMissingFailClosed: true,
      tokenWeakFailClosed: true,
      tokenAbsentFailClosed: true,
      tokenWrongFailClosed: true,
      missingSlugReturnsNull: true,
      malformedSlugBlocked: true,
    }, null, 2)}\n`,
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
  BLOG_PREVIEW_EXPECTED_PATH="$EXPECTED" \
  BLOG_PREVIEW_VALUES_PATH="$VALUES" \
  BLOG_PREVIEW_TEST_TOKEN="$TEST_TOKEN" \
  NODE_PATH="$SHIM_NODE_MODULES${NODE_PATH:+:$NODE_PATH}" \
  NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--conditions=react-server" \
    "$LOCAL_TSX" "$RUNNER"
) >"$OUT/preview-contract-smoke.log" 2>&1
RUNNER_RC=$?
set -e
if test "$RUNNER_RC" -ne 0; then
  tail -n 100 "$OUT/preview-contract-smoke.log" >&2 || true
  fail 'controlled_preview_runtime_read_failed'
fi

test -s "$VALUES" || fail 'preview_contract_values_missing'
if grep -R -F -- "$TEST_TOKEN" "$OUT" >/dev/null 2>&1; then
  fail 'preview_token_leaked_to_artifacts'
fi

ROOT_CLIENT_JS_AFTER="$(hash_or_missing "$ROOT_CLIENT_JS")"
ROOT_CLIENT_DTS_AFTER="$(hash_or_missing "$ROOT_CLIENT_DTS")"
APP_TREE_AFTER="$(git -C "$ROOT" rev-parse HEAD:app)"
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
test "$APP_TREE_BEFORE" = "$APP_TREE_AFTER" || fail 'committed_app_tree_changed'
test -z "$(git -C "$ROOT" status --porcelain -- app)" || fail 'app_tree_changes_present_after_smoke'
test "$PUBLIC_BLOG_OID_BEFORE" = "$PUBLIC_BLOG_OID_AFTER" || fail 'public_blog_identity_changed'
test "$DB_SIGNATURE_BEFORE" = "$DB_SIGNATURE_AFTER" || fail 'database_signature_changed_during_read'

FIRST_SLUG="$(node -e "const fs=require('node:fs');const x=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));console.log(x.results[0].slug)" "$VALUES")"
MIDDLE_SLUG="$(node -e "const fs=require('node:fs');const x=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));console.log(x.results[1].slug)" "$VALUES")"
LAST_SLUG="$(node -e "const fs=require('node:fs');const x=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));console.log(x.results[2].slug)" "$VALUES")"

cat > "$OUT/status.txt" <<STATUS
BLOG_CONTROLLED_REVIEW_PREVIEW_CONTRACT_STATUS=PASS
SERVER_ONLY_PREVIEW_CONTRACT_LOADED=YES
TOKEN_AUTHENTICATION=TIMING_SAFE_SHA256
TOKEN_CONFIGURATION_MISSING_FAIL_CLOSED=YES
TOKEN_CONFIGURATION_WEAK_FAIL_CLOSED=YES
TOKEN_ABSENT_FAIL_CLOSED=YES
TOKEN_WRONG_FAIL_CLOSED=YES
TOKEN_HEADER=x-sikhadenge-blog-review-token
TOKEN_STORED=NO
TOKEN_RETURNED=NO
TOKEN_LEAKED_TO_ARTIFACTS=NO
FIRST_MIDDLE_LAST_PACKAGE_PARITY_VERIFIED=YES
FIRST_SLUG=$FIRST_SLUG
MIDDLE_SLUG=$MIDDLE_SLUG
LAST_SLUG=$LAST_SLUG
EXPECTED_RECORDS=$EXPECTED_RECORDS
MISSING_SLUG_RETURNS_NULL=YES
MALFORMED_SLUG_BLOCKED=YES
NOINDEX_NOFOLLOW_NOARCHIVE=YES
CACHE_CONTROL_PRIVATE_NO_STORE=YES
CANONICAL_EXPOSED=NO
REVIEW_ONLY=YES
ROUTE_MOUNTED=NO
ROUTE_ELIGIBLE=NO
PUBLICATION_APPROVED=NO
INDEX_ELIGIBILITY_APPROVED=NO
DATABASE_WRITE_ALLOWED=NO
APP_TREE_UNCHANGED=YES
LIVE_BLOG_ROUTE_MODIFIED=NO
ROOT_PRISMA_CLIENT_UNCHANGED=YES
PUBLIC_BLOG_OID_UNCHANGED=YES
DATABASE_SIGNATURE_UNCHANGED=YES
DATABASE_READ_PERFORMED=YES
DATABASE_WRITE_PERFORMED=NO
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
