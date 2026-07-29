#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
SCHEMA="$ROOT/modules/blog/database/schema.prisma"
GENERATED="$ROOT/modules/blog/database/generated/client"
PACKAGE="${1:-}"
OUT="${2:-/var/lib/sikhadenge-blog-artifacts/blog-runtime-import-parity-v1-$(date +%Y%m%d_%H%M%S)}"
EXPECTED="$OUT/expected-samples.json"
RUNNER="$OUT/runtime-parity.ts"
VALUES="$OUT/runtime-values.txt"
SHIM_NODE_MODULES="$OUT/node_modules"
SERVER_ONLY_SHIM="$SHIM_NODE_MODULES/server-only"
EXPECTED_MANIFEST_SHA256='5659094b972e2806310cd1a3d72ef19e26f1106df14b6a38b545759fc5d9fe0a'
EXPECTED_MANIFEST_BYTES='55691'
EXPECTED_RECORDS='120097'
EXPECTED_PUBLIC_BLOG_OID='20331'

fail() {
  mkdir -p "$OUT"
  printf 'BLOG_RUNTIME_IMPORTED_CONTENT_PARITY_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

for command_name in node npx psql sha256sum git stat; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "${DATABASE_URL:-}" || fail 'DATABASE_URL_missing'
test -n "$PACKAGE" && test -d "$PACKAGE" || fail 'package_missing'
test -s "$PACKAGE/manifest.json" || fail 'manifest_missing'
test -s "$SCHEMA" || fail 'schema_missing'
mkdir -p "$OUT"
chmod 700 "$OUT"

git -C "$ROOT" diff --quiet || fail 'tracked_worktree_changes_present'
git -C "$ROOT" diff --cached --quiet || fail 'staged_worktree_changes_present'

MANIFEST_SHA256="$(sha256sum "$PACKAGE/manifest.json" | awk '{print $1}')"
MANIFEST_BYTES="$(stat -c '%s' "$PACKAGE/manifest.json")"
test "$MANIFEST_SHA256" = "$EXPECTED_MANIFEST_SHA256" || fail 'manifest_hash_mismatch'
test "$MANIFEST_BYTES" = "$EXPECTED_MANIFEST_BYTES" || fail 'manifest_size_mismatch'

node - "$PACKAGE" "$EXPECTED" <<'NODE'
const fs = require('node:fs');
const path = require('node:path');
const [packageDir, outputPath] = process.argv.slice(2);
const manifest = JSON.parse(fs.readFileSync(path.join(packageDir, 'manifest.json'), 'utf8'));
const targets = [0, 60048, 120096];
if (manifest.sourcePlan?.recordCount !== 120097 || manifest.batches?.length !== 121) {
  throw new Error('manifest_record_contract_mismatch');
}
const samples = targets.map((ordinal) => {
  const batch = manifest.batches.find((entry) => ordinal >= entry.firstOrdinal && ordinal <= entry.lastOrdinal);
  if (!batch) throw new Error(`sample_batch_missing:${ordinal}`);
  const file = path.join(packageDir, batch.file);
  const lines = fs.readFileSync(file, 'utf8').trimEnd().split('\n');
  const offset = ordinal - batch.firstOrdinal;
  const record = JSON.parse(lines[offset]);
  return { ordinal, batchIndex: batch.batchIndex, record };
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
npx --no-install prisma generate --schema "$SCHEMA" >"$OUT/prisma-generate.log" 2>&1 || fail 'prisma_generate_failed'
test -s "$GENERATED/index.js" || fail 'generated_index_js_missing'
test -s "$GENERATED/index.d.ts" || fail 'generated_index_dts_missing'

mkdir -p "$SERVER_ONLY_SHIM"
cat > "$SERVER_ONLY_SHIM/package.json" <<'JSON'
{"name":"server-only","version":"0.0.0-blog-runtime-parity-shim","private":true,"main":"index.js"}
JSON
printf '%s\n' '"use strict";' 'module.exports = {};' > "$SERVER_ONLY_SHIM/index.js"
NODE_PATH="$SHIM_NODE_MODULES${NODE_PATH:+:$NODE_PATH}" node -e 'require("server-only")' || fail 'server_only_test_shim_load_failed'

cat > "$RUNNER" <<'TS'
import fs from "node:fs";
import { blogContentDb } from "@/modules/blog/database/client";
import {
  CANONICAL_BLOG_WORKSPACE_ID,
  CANONICAL_BLOG_WORKSPACE_KEY,
  getBlogPlatformBaseline,
} from "@/modules/blog/server";

const expectedPath = process.env.BLOG_RUNTIME_EXPECTED_SAMPLES;
const valuesPath = process.env.BLOG_RUNTIME_VALUES_PATH;
if (!expectedPath || !valuesPath) throw new Error("runtime_paths_missing");
const expected = JSON.parse(fs.readFileSync(expectedPath, "utf8"));
const asNumber = (value: unknown) => Number(typeof value === "bigint" ? value : String(value));

async function main() {
  const baseline = await getBlogPlatformBaseline();
  if (baseline.workspace.id !== CANONICAL_BLOG_WORKSPACE_ID) throw new Error("workspace_id_mismatch");
  if (baseline.workspace.key !== CANONICAL_BLOG_WORKSPACE_KEY) throw new Error("workspace_key_mismatch");
  if (baseline.counts.workspaces !== 1) throw new Error("workspace_count_mismatch");
  if (baseline.counts.pages !== 120097) throw new Error("baseline_page_count_mismatch");
  if (baseline.counts.pageVersions !== 120097) throw new Error("baseline_version_count_mismatch");
  if (baseline.counts.publications !== 0) throw new Error("unexpected_publications_present");
  if (baseline.counts.qualityRuns !== 0) throw new Error("unexpected_quality_runs_present");

  const summaryRows = await blogContentDb.$queryRawUnsafe<any[]>(`
    SELECT
      (SELECT count(*) FROM blog_content.pages) AS "pages",
      (SELECT count(DISTINCT slug) FROM blog_content.pages) AS "uniqueSlugs",
      (SELECT count(DISTINCT "canonicalPath") FROM blog_content.pages) AS "uniqueCanonicalPaths",
      (SELECT count(DISTINCT "sourceRecordKey") FROM blog_content.pages) AS "uniqueSourceRecordKeys",
      (SELECT count(*) FROM blog_content.page_versions) AS "versions",
      (SELECT count(DISTINCT "exactHash") FROM blog_content.page_versions) AS "uniqueVersionExactHashes",
      (SELECT count(*) FROM blog_content.content_fingerprints) AS "fingerprints",
      (SELECT count(DISTINCT "exactHash") FROM blog_content.content_fingerprints) AS "uniqueFingerprintExactHashes",
      (SELECT count(*) FROM blog_content.pages WHERE "workspaceId" <> 'blog-workspace-sikhadenge-v1' OR "lifecycleStatus"::text <> 'DISCOVERED' OR "indexEligibility"::text <> 'BLOCKED') AS "pageViolations",
      (SELECT count(*) FROM blog_content.pages WHERE metadata->>'requiresResearch' <> 'true' OR metadata->>'requiresQualityGate' <> 'true' OR metadata->>'requiresEditorialApproval' <> 'true' OR metadata->>'publicationBlocked' <> 'true') AS "metadataViolations",
      (SELECT count(*) FROM blog_content.page_versions WHERE status::text <> 'WRITING' OR origin::text <> 'MIGRATED' OR "sourceCoverage" <> 0 OR "originalityScore" <> 0 OR "qualityScore" <> 0) AS "versionViolations",
      (SELECT count(*) FROM blog_content.publications) AS "publications",
      (SELECT count(*) FROM blog_content.quality_runs) AS "qualityRuns",
      (SELECT count(*) FROM blog_content.editorial_reviews) AS "editorialReviews"
  `);
  if (summaryRows.length !== 1) throw new Error("summary_row_count_mismatch");
  const summary = Object.fromEntries(Object.entries(summaryRows[0]).map(([key, value]) => [key, asNumber(value)]));
  for (const key of ["pages", "uniqueSlugs", "uniqueCanonicalPaths", "uniqueSourceRecordKeys", "versions", "uniqueVersionExactHashes", "fingerprints", "uniqueFingerprintExactHashes"]) {
    if (summary[key] !== 120097) throw new Error(`summary_${key}_mismatch`);
  }
  for (const key of ["pageViolations", "metadataViolations", "versionViolations", "publications", "qualityRuns", "editorialReviews"]) {
    if (summary[key] !== 0) throw new Error(`summary_${key}_not_zero`);
  }

  const sampleResults: any[] = [];
  for (const sample of expected) {
    const r = sample.record;
    const rows = await blogContentDb.$queryRawUnsafe<any[]>(`
      SELECT
        p.id AS "pageId", p.slug, p."canonicalPath", p.title AS "pageTitle", p."sourceRecordKey",
        p."lifecycleStatus"::text AS "lifecycleStatus", p."indexEligibility"::text AS "indexEligibility",
        v.id AS "versionId", v."pageId" AS "versionPageId", v.title AS "versionTitle",
        v."exactHash" AS "versionExactHash", v."normalizedHash" AS "versionNormalizedHash",
        v.status::text AS "versionStatus", v.origin::text AS "versionOrigin",
        f.id AS "fingerprintId", f."versionId" AS "fingerprintVersionId", f.scope,
        f."scopeKey", f."exactHash" AS "fingerprintExactHash", f."normalizedHash" AS "fingerprintNormalizedHash"
      FROM blog_content.pages p
      JOIN blog_content.page_versions v ON v."pageId" = p.id
      JOIN blog_content.content_fingerprints f ON f."versionId" = v.id
      WHERE p."workspaceId" = 'blog-workspace-sikhadenge-v1' AND p.slug = $1
    `, r.page.slug);
    if (rows.length !== 1) throw new Error(`sample_row_count_mismatch:${sample.ordinal}`);
    const actual = rows[0];
    const expectedPairs: Array<[string, unknown]> = [
      ["pageId", r.page.id], ["slug", r.page.slug], ["canonicalPath", r.page.canonicalPath],
      ["pageTitle", r.page.title], ["sourceRecordKey", r.page.sourceRecordKey],
      ["lifecycleStatus", "DISCOVERED"], ["indexEligibility", "BLOCKED"],
      ["versionId", r.version.id], ["versionPageId", r.version.pageId], ["versionTitle", r.version.title],
      ["versionExactHash", r.version.exactHash], ["versionNormalizedHash", r.version.normalizedHash],
      ["versionStatus", "WRITING"], ["versionOrigin", "MIGRATED"],
      ["fingerprintId", r.fingerprint.id], ["fingerprintVersionId", r.fingerprint.versionId],
      ["scope", "legacy-source-record"], ["scopeKey", r.fingerprint.scopeKey],
      ["fingerprintExactHash", r.fingerprint.exactHash], ["fingerprintNormalizedHash", r.fingerprint.normalizedHash],
    ];
    for (const [key, value] of expectedPairs) {
      if (actual[key] !== value) throw new Error(`sample_${sample.ordinal}_${key}_mismatch`);
    }
    sampleResults.push({ ordinal: sample.ordinal, slug: actual.slug, pageId: actual.pageId, exactHash: actual.versionExactHash });
  }

  fs.writeFileSync(valuesPath, `${JSON.stringify({ summary, samples: sampleResults }, null, 2)}\n`, { mode: 0o600 });
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
  BLOG_RUNTIME_EXPECTED_SAMPLES="$EXPECTED" \
  BLOG_RUNTIME_VALUES_PATH="$VALUES" \
  NODE_PATH="$SHIM_NODE_MODULES${NODE_PATH:+:$NODE_PATH}" \
  NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--conditions=react-server" \
    npx --no-install tsx "$RUNNER"
) >"$OUT/runtime-parity.log" 2>&1
RUNNER_RC=$?
set -e
if test "$RUNNER_RC" -ne 0; then
  tail -n 100 "$OUT/runtime-parity.log" >&2 || true
  fail 'runtime_parity_read_failed'
fi

test -s "$VALUES" || fail 'runtime_values_missing'
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

FIRST_SLUG="$(node -e "const x=require(process.argv[1]); console.log(x.samples[0].slug)" "$VALUES")"
MIDDLE_SLUG="$(node -e "const x=require(process.argv[1]); console.log(x.samples[1].slug)" "$VALUES")"
LAST_SLUG="$(node -e "const x=require(process.argv[1]); console.log(x.samples[2].slug)" "$VALUES")"

cat > "$OUT/status.txt" <<STATUS
BLOG_RUNTIME_IMPORTED_CONTENT_PARITY_STATUS=PASS
MANIFEST_HASH_VERIFIED=YES
ISOLATED_PRISMA_CLIENT_GENERATED=YES
SERVER_ONLY_ENTRYPOINT_LOADED=YES
SERVER_ONLY_TEST_SHIM_USED=YES
CANONICAL_WORKSPACE_RUNTIME_VERIFIED=YES
FULL_IMPORTED_COUNTS_VERIFIED=YES
FULL_UNIQUENESS_CONTRACTS_VERIFIED=YES
FULL_SAFETY_DEFAULTS_VERIFIED=YES
FIRST_MIDDLE_LAST_RUNTIME_PARITY_VERIFIED=YES
FIRST_SLUG=$FIRST_SLUG
MIDDLE_SLUG=$MIDDLE_SLUG
LAST_SLUG=$LAST_SLUG
PAGES=$EXPECTED_RECORDS
PAGE_VERSIONS=$EXPECTED_RECORDS
CONTENT_FINGERPRINTS=$EXPECTED_RECORDS
PUBLICATIONS=0
QUALITY_RUNS=0
EDITORIAL_REVIEWS=0
ROOT_PRISMA_CLIENT_UNCHANGED=YES
PUBLIC_BLOG_OID_UNCHANGED=YES
DATABASE_SIGNATURE_UNCHANGED=YES
DATABASE_READ_PERFORMED=YES
DATABASE_WRITE_PERFORMED=NO
ROUTE_FILES_MODIFIED=NO
PUBLICATION_APPROVED=NO
INDEX_ELIGIBILITY_APPROVED=NO
ROUTE_WIRING_APPROVED=NO
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
