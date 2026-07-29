#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
SCHEMA="$ROOT/modules/blog/database/schema.prisma"
GENERATED="$ROOT/modules/blog/database/generated/client"
LOCAL_PRISMA="$ROOT/node_modules/.bin/prisma"
PACKAGE="${1:-}"
OUT="${2:-/var/lib/sikhadenge-blog-artifacts/blog-imported-page-repository-smoke-v1-$(date +%Y%m%d_%H%M%S)}"
EXPECTED="$OUT/expected-samples.json"
RUNNER="$OUT/imported-page-repository-smoke.ts"
VALUES="$OUT/repository-values.json"
SHIM_NODE_MODULES="$OUT/node_modules"
SERVER_ONLY_SHIM="$SHIM_NODE_MODULES/server-only"
EXPECTED_RECORDS='120097'
EXPECTED_PUBLIC_BLOG_OID='20331'

fail() {
  mkdir -p "$OUT"
  printf 'BLOG_IMPORTED_PAGE_REPOSITORY_SMOKE_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

for command_name in node psql sha256sum git stat; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "${DATABASE_URL:-}" || fail 'DATABASE_URL_missing'
test -n "$PACKAGE" && test -d "$PACKAGE" || fail 'package_missing'
test -s "$PACKAGE/manifest.json" || fail 'manifest_missing'
test -s "$SCHEMA" || fail 'schema_missing'
test -x "$LOCAL_PRISMA" || fail 'local_prisma_missing'
mkdir -p "$OUT"
chmod 700 "$OUT"

git -C "$ROOT" diff --quiet || fail 'tracked_worktree_changes_present'
git -C "$ROOT" diff --cached --quiet || fail 'staged_worktree_changes_present'

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
{"name":"server-only","version":"0.0.0-blog-imported-page-repository-smoke","private":true,"main":"index.js"}
JSON
printf '%s\n' '"use strict";' 'module.exports = {};' > "$SERVER_ONLY_SHIM/index.js"
NODE_PATH="$SHIM_NODE_MODULES${NODE_PATH:+:$NODE_PATH}" node -e 'require("server-only")' || fail 'server_only_test_shim_load_failed'

cat > "$RUNNER" <<'TS'
import fs from "node:fs";
import { blogContentDb } from "@/modules/blog/database/client";
import {
  BlogRepositoryInvariantError,
  getImportedBlogRecordBySlugForReview,
} from "@/modules/blog/server";

const expectedPath = process.env.BLOG_IMPORTED_PAGE_EXPECTED_PATH;
const valuesPath = process.env.BLOG_IMPORTED_PAGE_VALUES_PATH;
if (!expectedPath || !valuesPath) throw new Error("repository_smoke_paths_missing");
const expected = JSON.parse(fs.readFileSync(expectedPath, "utf8"));

async function main() {
  const results: Array<Record<string, unknown>> = [];

  for (const sample of expected) {
    const r = sample.record;
    const actual = await getImportedBlogRecordBySlugForReview(r.page.slug);
    if (!actual) throw new Error(`repository_record_missing:${sample.ordinal}`);

    const expectedPairs: Array<[string, unknown, unknown]> = [
      ["page.id", actual.page.id, r.page.id],
      ["page.slug", actual.page.slug, r.page.slug],
      ["page.canonicalPath", actual.page.canonicalPath, r.page.canonicalPath],
      ["page.title", actual.page.title, r.page.title],
      ["page.sourceRecordKey", actual.page.sourceRecordKey, r.page.sourceRecordKey],
      ["version.id", actual.version.id, r.version.id],
      ["version.pageId", actual.version.pageId, r.version.pageId],
      ["version.title", actual.version.title, r.version.title],
      ["version.exactHash", actual.version.exactHash, r.version.exactHash],
      ["version.normalizedHash", actual.version.normalizedHash, r.version.normalizedHash],
      ["fingerprint.id", actual.fingerprint.id, r.fingerprint.id],
      ["fingerprint.versionId", actual.fingerprint.versionId, r.fingerprint.versionId],
      ["fingerprint.exactHash", actual.fingerprint.exactHash, r.fingerprint.exactHash],
      ["fingerprint.normalizedHash", actual.fingerprint.normalizedHash, r.fingerprint.normalizedHash],
    ];

    for (const [label, observed, wanted] of expectedPairs) {
      if (observed !== wanted) throw new Error(`repository_${sample.ordinal}_${label}_mismatch`);
    }

    if (
      actual.page.lifecycleStatus !== "DISCOVERED" ||
      actual.page.indexEligibility !== "BLOCKED" ||
      actual.version.status !== "WRITING" ||
      actual.version.origin !== "MIGRATED" ||
      actual.fingerprint.scope !== "legacy-source-record" ||
      actual.safety.requiresResearch !== true ||
      actual.safety.requiresQualityGate !== true ||
      actual.safety.requiresEditorialApproval !== true ||
      actual.safety.publicationBlocked !== true ||
      actual.safety.publicationApproved !== false ||
      actual.safety.indexEligibilityApproved !== false ||
      actual.safety.routeEligible !== false
    ) {
      throw new Error(`repository_${sample.ordinal}_safety_contract_mismatch`);
    }

    results.push({
      ordinal: sample.ordinal,
      slug: actual.page.slug,
      pageId: actual.page.id,
      versionId: actual.version.id,
      fingerprintId: actual.fingerprint.id,
      routeEligible: actual.safety.routeEligible,
    });
  }

  const missing = await getImportedBlogRecordBySlugForReview(
    "definitely-missing-imported-blog-record-v1",
  );
  if (missing !== null) throw new Error("missing_slug_did_not_return_null");

  let malformedCode = "";
  try {
    await getImportedBlogRecordBySlugForReview("../unsafe slug");
  } catch (error) {
    if (!(error instanceof BlogRepositoryInvariantError)) {
      throw error;
    }
    malformedCode = error.code;
  }
  if (malformedCode !== "IMPORTED_PAGE_SLUG_INVALID") {
    throw new Error("malformed_slug_invariant_not_enforced");
  }

  fs.writeFileSync(
    valuesPath,
    `${JSON.stringify({ results, missingReturnedNull: true, malformedCode }, null, 2)}\n`,
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
  BLOG_IMPORTED_PAGE_EXPECTED_PATH="$EXPECTED" \
  BLOG_IMPORTED_PAGE_VALUES_PATH="$VALUES" \
  NODE_PATH="$SHIM_NODE_MODULES${NODE_PATH:+:$NODE_PATH}" \
  NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--conditions=react-server" \
    "$ROOT/node_modules/.bin/tsx" "$RUNNER"
) >"$OUT/repository-smoke.log" 2>&1
RUNNER_RC=$?
set -e
if test "$RUNNER_RC" -ne 0; then
  tail -n 100 "$OUT/repository-smoke.log" >&2 || true
  fail 'repository_runtime_read_failed'
fi

test -s "$VALUES" || fail 'repository_values_missing'
ROOT_CLIENT_JS_AFTER="$(hash_or_missing "$ROOT_CLIENT_JS")"
ROOT_CLIENT_DTS_AFTER="$(hash_or_missing "$ROOT_CLIENT_DTS")"
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

FIRST_SLUG="$(node -e "const fs=require('node:fs');const x=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));console.log(x.results[0].slug)" "$VALUES")"
MIDDLE_SLUG="$(node -e "const fs=require('node:fs');const x=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));console.log(x.results[1].slug)" "$VALUES")"
LAST_SLUG="$(node -e "const fs=require('node:fs');const x=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));console.log(x.results[2].slug)" "$VALUES")"

cat > "$OUT/status.txt" <<STATUS
BLOG_IMPORTED_PAGE_REPOSITORY_SMOKE_STATUS=PASS
REVIEW_ONLY_REPOSITORY_ENTRYPOINT_LOADED=YES
FIRST_MIDDLE_LAST_PACKAGE_PARITY_VERIFIED=YES
MISSING_SLUG_RETURNS_NULL=YES
MALFORMED_SLUG_INVARIANT_VERIFIED=YES
MALFORMED_SLUG_ERROR_CODE=IMPORTED_PAGE_SLUG_INVALID
FIRST_SLUG=$FIRST_SLUG
MIDDLE_SLUG=$MIDDLE_SLUG
LAST_SLUG=$LAST_SLUG
EXPECTED_RECORDS=$EXPECTED_RECORDS
LIFECYCLE_STATUS=DISCOVERED
VERSION_STATUS=WRITING
INDEX_ELIGIBILITY=BLOCKED
PUBLICATION_APPROVED=NO
INDEX_ELIGIBILITY_APPROVED=NO
ROUTE_ELIGIBLE=NO
ROUTE_FILES_MODIFIED=NO
ROOT_PRISMA_CLIENT_UNCHANGED=YES
PUBLIC_BLOG_OID_UNCHANGED=YES
DATABASE_SIGNATURE_UNCHANGED=YES
DATABASE_READ_PERFORMED=YES
DATABASE_WRITE_PERFORMED=NO
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
