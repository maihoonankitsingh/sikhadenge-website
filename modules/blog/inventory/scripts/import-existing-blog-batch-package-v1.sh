#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

PACKAGE="${1:-}"
READINESS_REPORT="${2:-}"
OUT="${3:-/var/lib/sikhadenge-blog-artifacts/existing-blog-production-import-v1-$(date +%Y%m%d_%H%M%S)}"
APPROVAL="${4:-}"

EXPECTED_APPROVAL='APPROVE EXISTING BLOG PRODUCTION IMPORT V1'
EXPECTED_MANIFEST_SHA256='5659094b972e2806310cd1a3d72ef19e26f1106df14b6a38b545759fc5d9fe0a'
EXPECTED_MANIFEST_BYTES='55691'
EXPECTED_PLAN_SHA256='66fa51adf700467f66d8118f0dc979ca2abd24947dceea893d1b4197a6898cca'
EXPECTED_PLAN_BYTES='512082000'
EXPECTED_RECORDS='120097'
EXPECTED_BATCHES='121'
EXPECTED_WORKSPACE_ID='blog-workspace-sikhadenge-v1'
EXPECTED_WORKSPACE_KEY='sikhadenge-blog'
EXPECTED_PUBLIC_BLOG_OID='20331'
MAX_READINESS_AGE_SECONDS='21600'
LOCK='/var/lock/sikhadenge-blog-production-import-v1.lock'
MANIFEST="$PACKAGE/manifest.json"
BATCH_DIR="$PACKAGE/batches"
STATUS="$OUT/status.txt"
PROGRESS="$OUT/progress.tsv"
RUN_CONTRACT="$OUT/run-contract.json"
SQL_DIR="$OUT/sql"
LOG_DIR="$OUT/logs"

fail() {
  mkdir -p "$OUT"
  printf 'BLOG_EXISTING_PRODUCTION_IMPORT_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" | tee "$STATUS" >&2
  exit 1
}

for command_name in node psql sha256sum stat flock grep cut date find sort awk tee; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "${DATABASE_URL:-}" || fail 'DATABASE_URL_missing'
test -n "$PACKAGE" && test -d "$PACKAGE" || fail 'package_missing'
test -s "$MANIFEST" || fail 'package_manifest_missing'
test -d "$BATCH_DIR" || fail 'package_batch_directory_missing'
test -n "$READINESS_REPORT" && test -d "$READINESS_REPORT" || fail 'readiness_report_missing'
test -s "$READINESS_REPORT/status.txt" || fail 'readiness_status_missing'
[ "$APPROVAL" = "$EXPECTED_APPROVAL" ] || fail 'explicit_approval_phrase_mismatch'

mkdir -p "$OUT" "$SQL_DIR" "$LOG_DIR"
chmod 700 "$OUT" "$SQL_DIR" "$LOG_DIR"

exec 9>"$LOCK"
flock -n 9 || fail 'another_blog_production_import_is_running'

MANIFEST_SHA256="$(sha256sum "$MANIFEST" | awk '{print $1}')"
MANIFEST_BYTES="$(stat -c '%s' "$MANIFEST")"
[ "$MANIFEST_SHA256" = "$EXPECTED_MANIFEST_SHA256" ] || fail 'package_manifest_hash_mismatch'
[ "$MANIFEST_BYTES" = "$EXPECTED_MANIFEST_BYTES" ] || fail 'package_manifest_size_mismatch'

grep -qx 'BLOG_PRODUCTION_IMPORT_READINESS_STATUS=PASS' "$READINESS_REPORT/status.txt" || fail 'base_readiness_not_pass'
grep -qx 'BLOG_PRODUCTION_IMPORT_READINESS_V2_STATUS=PASS' "$READINESS_REPORT/status.txt" || fail 'readiness_v2_not_pass'
grep -qx 'PLAN_HASH_VERIFIED=YES' "$READINESS_REPORT/status.txt" || fail 'readiness_plan_hash_not_verified'
grep -qx 'BATCH_REHEARSAL_VERIFIED=YES' "$READINESS_REPORT/status.txt" || fail 'readiness_batch_rehearsal_not_verified'
grep -qx 'DATABASE_BACKUP_VERIFIED=YES' "$READINESS_REPORT/status.txt" || fail 'readiness_backup_not_verified'
grep -qx 'DATABASE_WRITE_PERFORMED=NO' "$READINESS_REPORT/status.txt" || fail 'readiness_unexpected_database_write'
grep -qx 'BULK_IMPORT_APPROVED=NO' "$READINESS_REPORT/status.txt" || fail 'readiness_contract_changed'

READINESS_MTIME="$(stat -c '%Y' "$READINESS_REPORT/status.txt")"
NOW_EPOCH="$(date +%s)"
READINESS_AGE_SECONDS="$((NOW_EPOCH - READINESS_MTIME))"
[ "$READINESS_AGE_SECONDS" -ge 0 ] || fail 'readiness_timestamp_in_future'
[ "$READINESS_AGE_SECONDS" -le "$MAX_READINESS_AGE_SECONDS" ] || fail 'readiness_report_older_than_6h'

node - "$MANIFEST" "$BATCH_DIR" "$EXPECTED_MANIFEST_SHA256" <<'NODE'
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const [manifestPath, batchDir] = process.argv.slice(2);
const expectedPlanSha = '66fa51adf700467f66d8118f0dc979ca2abd24947dceea893d1b4197a6898cca';
const expectedPlanBytes = 512082000;
const expectedRecords = 120097;
const expectedBatches = 121;
const expectedManifestSha = process.argv[4];
const manifestBytes = fs.readFileSync(manifestPath);
const manifestSha = crypto.createHash('sha256').update(manifestBytes).digest('hex');
if (manifestSha !== expectedManifestSha) throw new Error('manifest_hash_mismatch');
const manifest = JSON.parse(manifestBytes.toString('utf8'));
if (
  manifest.releaseId !== 'existing-blog-import-batch-package-v1' ||
  manifest.packageContractVersion !== 1 ||
  manifest.sourcePlan?.sha256 !== expectedPlanSha ||
  manifest.sourcePlan?.bytes !== expectedPlanBytes ||
  manifest.sourcePlan?.recordCount !== expectedRecords ||
  manifest.batchContract?.batchCount !== expectedBatches ||
  manifest.batchContract?.recordsPerBatch !== 1000 ||
  manifest.batchContract?.finalBatchRecords !== 97 ||
  manifest.recombination?.exactSourcePlanMatch !== true ||
  manifest.authorization?.bulkImportApproved !== false ||
  manifest.authorization?.productionWriteApproved !== false ||
  manifest.safetyDefaults?.lifecycleStatus !== 'DISCOVERED' ||
  manifest.safetyDefaults?.versionStatus !== 'WRITING' ||
  manifest.safetyDefaults?.indexEligibility !== 'BLOCKED' ||
  manifest.safetyDefaults?.publications !== 0 ||
  !Array.isArray(manifest.batches) ||
  manifest.batches.length !== expectedBatches
) throw new Error('manifest_contract_mismatch');
const expectedFiles = new Set(manifest.batches.map((b) => path.basename(b.file)));
const actualFiles = fs.readdirSync(batchDir).filter((name) => /^batch-\d{3}\.jsonl$/.test(name));
if (actualFiles.length !== expectedFiles.size || actualFiles.some((name) => !expectedFiles.has(name))) {
  throw new Error('batch_fileset_mismatch');
}
let expectedOrdinal = 0;
for (const [i, batch] of manifest.batches.entries()) {
  if (
    batch.batchIndex !== i + 1 ||
    batch.firstOrdinal !== expectedOrdinal ||
    batch.lastOrdinal !== batch.firstOrdinal + batch.recordCount - 1 ||
    batch.plannedRows !== batch.recordCount * 3 ||
    (i < expectedBatches - 1 && batch.recordCount !== 1000) ||
    (i === expectedBatches - 1 && batch.recordCount !== 97)
  ) throw new Error(`batch_manifest_contract_mismatch:${i + 1}`);
  const file = path.join(batchDir, path.basename(batch.file));
  const bytes = fs.readFileSync(file);
  const sha = crypto.createHash('sha256').update(bytes).digest('hex');
  if (bytes.length !== batch.bytes || sha !== batch.sha256) {
    throw new Error(`batch_artifact_mismatch:${i + 1}`);
  }
  expectedOrdinal = batch.lastOrdinal + 1;
}
if (expectedOrdinal !== expectedRecords) throw new Error('batch_ordinal_total_mismatch');
NODE

read -r WORKSPACE_COUNT CANONICAL_WORKSPACE_COUNT PUBLIC_BLOG_OID PUBLICATIONS QUALITY_RUNS REVIEWS PAGE_VIOLATIONS VERSION_VIOLATIONS <<<"$(
  psql "$DATABASE_URL" -X -At -F' ' -c "
    SELECT
      (SELECT count(*) FROM blog_content.workspaces),
      (SELECT count(*) FROM blog_content.workspaces WHERE id='${EXPECTED_WORKSPACE_ID}' AND key='${EXPECTED_WORKSPACE_KEY}'),
      COALESCE(to_regclass('public.\"Blog\"')::oid::text,'NULL'),
      (SELECT count(*) FROM blog_content.publications),
      (SELECT count(*) FROM blog_content.quality_runs),
      (SELECT count(*) FROM blog_content.editorial_reviews),
      (SELECT count(*) FROM blog_content.pages WHERE id !~ '^legacy-page-v1-' OR \"workspaceId\" <> '${EXPECTED_WORKSPACE_ID}' OR \"lifecycleStatus\"::text <> 'DISCOVERED' OR \"indexEligibility\"::text <> 'BLOCKED'),
      (SELECT count(*) FROM blog_content.page_versions WHERE id !~ '^legacy-version-v1-' OR status::text <> 'WRITING' OR origin::text <> 'MIGRATED' OR \"sourceCoverage\" <> 0 OR \"originalityScore\" <> 0 OR \"qualityScore\" <> 0);
  "
)"

[ "$WORKSPACE_COUNT" = '1' ] || fail 'workspace_count_mismatch'
[ "$CANONICAL_WORKSPACE_COUNT" = '1' ] || fail 'canonical_workspace_missing'
[ "$PUBLIC_BLOG_OID" = "$EXPECTED_PUBLIC_BLOG_OID" ] || fail 'public_blog_identity_changed'
[ "$PUBLICATIONS" = '0' ] || fail 'publications_not_empty'
[ "$QUALITY_RUNS" = '0' ] || fail 'quality_runs_not_empty'
[ "$REVIEWS" = '0' ] || fail 'editorial_reviews_not_empty'
[ "$PAGE_VIOLATIONS" = '0' ] || fail 'existing_page_contract_violation'
[ "$VERSION_VIOLATIONS" = '0' ] || fail 'existing_version_contract_violation'

if [ -s "$RUN_CONTRACT" ]; then
  node - "$RUN_CONTRACT" "$MANIFEST_SHA256" "$READINESS_REPORT" <<'NODE'
const fs = require('node:fs');
const [file, manifestSha, readiness] = process.argv.slice(2);
const state = JSON.parse(fs.readFileSync(file, 'utf8'));
if (
  state.releaseId !== 'existing-blog-production-import-v1' ||
  state.manifestSha256 !== manifestSha ||
  state.readinessReport !== readiness ||
  state.approvalPhrase !== 'APPROVE EXISTING BLOG PRODUCTION IMPORT V1'
) throw new Error('run_contract_mismatch');
NODE
else
  node - "$RUN_CONTRACT" "$MANIFEST_SHA256" "$READINESS_REPORT" <<'NODE'
const fs = require('node:fs');
const [file, manifestSha, readiness] = process.argv.slice(2);
const state = {
  releaseId: 'existing-blog-production-import-v1',
  manifestSha256: manifestSha,
  readinessReport: readiness,
  approvalPhrase: 'APPROVE EXISTING BLOG PRODUCTION IMPORT V1',
  batchRecords: 1000,
  batchCount: 121,
  targetRecords: 120097,
  rowKindsPerRecord: 3,
  safetyDefaults: {
    lifecycleStatus: 'DISCOVERED',
    versionStatus: 'WRITING',
    indexEligibility: 'BLOCKED',
    publications: 0,
  },
  startedAt: new Date().toISOString(),
};
fs.writeFileSync(file, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 });
NODE
fi

touch "$PROGRESS"
chmod 600 "$PROGRESS"

node - "$MANIFEST" <<'NODE' > "$OUT/batches.tsv"
const fs = require('node:fs');
const m = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
for (const b of m.batches) {
  process.stdout.write([
    b.batchIndex,
    b.file,
    b.recordCount,
    b.bytes,
    b.sha256,
    b.firstOrdinal,
    b.lastOrdinal,
    b.firstSlug,
    b.lastSlug,
  ].join('\t') + '\n');
}
NODE

while IFS=$'\t' read -r BATCH_INDEX BATCH_FILE BATCH_RECORDS BATCH_BYTES BATCH_SHA FIRST_ORDINAL LAST_ORDINAL FIRST_SLUG LAST_SLUG; do
  BATCH_PATH="$PACKAGE/$BATCH_FILE"
  BATCH_NAME="$(printf '%03d' "$BATCH_INDEX")"
  SQL_FILE="$SQL_DIR/batch-$BATCH_NAME.sql"
  LOG_FILE="$LOG_DIR/batch-$BATCH_NAME.log"
  MARKER="$OUT/batch-$BATCH_NAME.pass"

  test -s "$BATCH_PATH" || fail "batch_${BATCH_NAME}_missing"
  [ "$(stat -c '%s' "$BATCH_PATH")" = "$BATCH_BYTES" ] || fail "batch_${BATCH_NAME}_size_mismatch"
  [ "$(sha256sum "$BATCH_PATH" | awk '{print $1}')" = "$BATCH_SHA" ] || fail "batch_${BATCH_NAME}_hash_mismatch"

  node - "$BATCH_PATH" "$SQL_FILE" "$BATCH_INDEX" "$BATCH_RECORDS" <<'NODE'
const fs = require('node:fs');
const readline = require('node:readline');
const [batchPath, sqlPath, batchIndexRaw, expectedRecordsRaw] = process.argv.slice(2);
const batchIndex = Number(batchIndexRaw);
const expectedRecords = Number(expectedRecordsRaw);
function die(reason) { throw new Error(reason); }
function sqlText(value) {
  if (value === null || value === undefined) return 'NULL';
  return `'${String(value).replaceAll("'", "''")}'`;
}
function sqlJson(value) { return `${sqlText(JSON.stringify(value ?? {}))}::jsonb`; }
function sqlTextArray(value) {
  const items = Array.isArray(value) ? value : [];
  return items.length ? `ARRAY[${items.map(sqlText).join(', ')}]::text[]` : 'ARRAY[]::text[]';
}
function sqlNumber(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value)) die(`${label}_invalid`);
  return String(value);
}
const records = [];
const reader = readline.createInterface({ input: fs.createReadStream(batchPath, { encoding: 'utf8' }), crlfDelay: Infinity });
(async () => {
  for await (const line of reader) {
    if (!line) continue;
    const r = JSON.parse(line);
    if (
      r.importPlanVersion !== 1 ||
      r.page?.workspaceId !== 'blog-workspace-sikhadenge-v1' ||
      r.page?.lifecycleStatus !== 'DISCOVERED' ||
      r.page?.indexEligibility !== 'BLOCKED' ||
      r.version?.status !== 'WRITING' ||
      r.version?.origin !== 'MIGRATED' ||
      r.version?.sourceCoverage !== 0 ||
      r.version?.originalityScore !== 0 ||
      r.version?.qualityScore !== 0 ||
      r.fingerprint?.scope !== 'legacy-source-record' ||
      r.deferred?.publicationRows !== 0 ||
      r.deferred?.qualityRunRows !== 0 ||
      r.deferred?.editorialReviewRows !== 0
    ) die('batch_record_safety_contract_mismatch');
    if (r.version.pageId !== r.page.id || r.fingerprint.versionId !== r.version.id) die('batch_relation_mismatch');
    records.push(r);
  }
  if (records.length !== expectedRecords) die('batch_record_count_mismatch');
  const pageIds = new Set(records.map((r) => r.page.id));
  const versionIds = new Set(records.map((r) => r.version.id));
  const fingerprintIds = new Set(records.map((r) => r.fingerprint.id));
  const slugs = new Set(records.map((r) => r.page.slug));
  if ([pageIds, versionIds, fingerprintIds, slugs].some((s) => s.size !== expectedRecords)) die('batch_identity_collision');

  const sql = ['\\set ON_ERROR_STOP on', 'BEGIN;', "SET LOCAL lock_timeout = '10s';", "SET LOCAL statement_timeout = '300s';", "SET LOCAL idle_in_transaction_session_timeout = '300s';", "SELECT pg_advisory_xact_lock(hashtextextended('sikhadenge-blog-production-import-v1', 0));"];
  for (const r of records) {
    const p = r.page, v = r.version, f = r.fingerprint;
    sql.push(`INSERT INTO blog_content.pages (
      id, "workspaceId", slug, "canonicalPath", title, "primaryKeyword", "secondaryKeywords",
      "uniqueAngle", "userProblem", "expectedOutcome", "lifecycleStatus", "indexEligibility",
      "audienceId", "intentId", locale, priority, "sourceRecordKey", metadata, "createdAt", "updatedAt"
    ) VALUES (
      ${sqlText(p.id)}, ${sqlText(p.workspaceId)}, ${sqlText(p.slug)}, ${sqlText(p.canonicalPath)},
      ${sqlText(p.title)}, ${sqlText(p.primaryKeyword)}, ${sqlTextArray(p.secondaryKeywords)},
      ${sqlText(p.uniqueAngle)}, ${sqlText(p.userProblem)}, ${sqlText(p.expectedOutcome)},
      ${sqlText(p.lifecycleStatus)}, ${sqlText(p.indexEligibility)}, ${sqlText(p.audienceId)},
      ${sqlText(p.intentId)}, ${sqlText(p.locale)}, ${sqlNumber(p.priority, 'page_priority')},
      ${sqlText(p.sourceRecordKey)}, ${sqlJson(p.metadata)}, now(), now()
    ) ON CONFLICT (id) DO NOTHING;`);
    sql.push(`INSERT INTO blog_content.page_versions (
      id, "pageId", "versionNumber", status, origin, title, "metaTitle", "metaDescription", h1,
      "directAnswer", introduction, conclusion, "authorName", "reviewerName", language,
      "wordCount", "readingMinutes", "sourceCoverage", "originalityScore", "qualityScore",
      "exactHash", "normalizedHash", "minHash", "simHash", "semanticFingerprint",
      "generatedBy", "generationPromptHash", notes, "createdBy", "createdAt", "updatedAt"
    ) VALUES (
      ${sqlText(v.id)}, ${sqlText(v.pageId)}, ${sqlNumber(v.versionNumber, 'version_number')},
      ${sqlText(v.status)}, ${sqlText(v.origin)}, ${sqlText(v.title)}, ${sqlText(v.metaTitle)},
      ${sqlText(v.metaDescription)}, ${sqlText(v.h1)}, ${sqlText(v.directAnswer)},
      ${sqlText(v.introduction)}, ${sqlText(v.conclusion)}, ${sqlText(v.authorName)},
      ${sqlText(v.reviewerName)}, ${sqlText(v.language)}, ${sqlNumber(v.wordCount, 'word_count')},
      ${sqlNumber(v.readingMinutes, 'reading_minutes')}, ${sqlNumber(v.sourceCoverage, 'source_coverage')},
      ${sqlNumber(v.originalityScore, 'originality_score')}, ${sqlNumber(v.qualityScore, 'quality_score')},
      ${sqlText(v.exactHash)}, ${sqlText(v.normalizedHash)}, ${sqlText(v.minHash)},
      ${v.simHash === null ? 'NULL' : sqlText(v.simHash)}, ${sqlText(v.semanticFingerprint)},
      ${sqlText(v.generatedBy)}, ${sqlText(v.generationPromptHash)}, ${sqlText(v.notes)},
      ${sqlText(v.createdBy)}, now(), now()
    ) ON CONFLICT (id) DO NOTHING;`);
    sql.push(`INSERT INTO blog_content.content_fingerprints (
      id, "versionId", scope, "scopeKey", "exactHash", "normalizedHash", "minHash", "simHash",
      "tokenCount", shingles, metadata, "createdAt"
    ) VALUES (
      ${sqlText(f.id)}, ${sqlText(f.versionId)}, ${sqlText(f.scope)}, ${sqlText(f.scopeKey)},
      ${sqlText(f.exactHash)}, ${sqlText(f.normalizedHash)}, ${sqlText(f.minHash)},
      ${f.simHash === null ? 'NULL' : sqlText(f.simHash)}, ${sqlNumber(f.tokenCount, 'token_count')},
      ${sqlNumber(f.shingles, 'shingles')}, ${sqlJson(f.metadata)}, now()
    ) ON CONFLICT (id) DO NOTHING;`);
  }
  const pageExpected = records.map((r) => `(${sqlText(r.page.id)},${sqlText(r.page.slug)},${sqlText(r.page.canonicalPath)},${sqlText(r.page.title)},${sqlText(r.page.sourceRecordKey)})`).join(',\n');
  const versionExpected = records.map((r) => `(${sqlText(r.version.id)},${sqlText(r.version.pageId)},${sqlText(r.version.title)},${sqlText(r.version.exactHash)},${sqlText(r.version.normalizedHash)})`).join(',\n');
  const fingerprintExpected = records.map((r) => `(${sqlText(r.fingerprint.id)},${sqlText(r.fingerprint.versionId)},${sqlText(r.fingerprint.scopeKey)},${sqlText(r.fingerprint.exactHash)},${sqlText(r.fingerprint.normalizedHash)},${sqlNumber(r.fingerprint.tokenCount, 'token_count')},${sqlNumber(r.fingerprint.shingles, 'shingles')})`).join(',\n');
  const pageIdsSql = [...pageIds].map(sqlText).join(',');
  sql.push(`DO $verify$
  DECLARE matched integer;
  BEGIN
    SELECT count(*) INTO matched
    FROM (VALUES ${pageExpected}) AS e(id,slug,canonical_path,title,source_record_key)
    JOIN blog_content.pages p ON p.id=e.id AND p.slug=e.slug AND p."canonicalPath"=e.canonical_path
      AND p.title=e.title AND p."sourceRecordKey"=e.source_record_key
      AND p."workspaceId"='blog-workspace-sikhadenge-v1'
      AND p."lifecycleStatus"::text='DISCOVERED' AND p."indexEligibility"::text='BLOCKED'
      AND p.metadata->>'requiresResearch'='true' AND p.metadata->>'requiresQualityGate'='true'
      AND p.metadata->>'requiresEditorialApproval'='true' AND p.metadata->>'publicationBlocked'='true';
    IF matched <> ${expectedRecords} THEN RAISE EXCEPTION 'Batch page verification failed'; END IF;

    SELECT count(*) INTO matched
    FROM (VALUES ${versionExpected}) AS e(id,page_id,title,exact_hash,normalized_hash)
    JOIN blog_content.page_versions v ON v.id=e.id AND v."pageId"=e.page_id AND v.title=e.title
      AND v."exactHash"=e.exact_hash AND v."normalizedHash"=e.normalized_hash
      AND v.status::text='WRITING' AND v.origin::text='MIGRATED'
      AND v."sourceCoverage"=0 AND v."originalityScore"=0 AND v."qualityScore"=0;
    IF matched <> ${expectedRecords} THEN RAISE EXCEPTION 'Batch version verification failed'; END IF;

    SELECT count(*) INTO matched
    FROM (VALUES ${fingerprintExpected}) AS e(id,version_id,scope_key,exact_hash,normalized_hash,token_count,shingles)
    JOIN blog_content.content_fingerprints f ON f.id=e.id AND f."versionId"=e.version_id
      AND f."scopeKey"=e.scope_key AND f.scope='legacy-source-record'
      AND f."exactHash"=e.exact_hash AND f."normalizedHash"=e.normalized_hash
      AND f."tokenCount"=e.token_count AND f.shingles=e.shingles;
    IF matched <> ${expectedRecords} THEN RAISE EXCEPTION 'Batch fingerprint verification failed'; END IF;

    IF EXISTS (SELECT 1 FROM blog_content.publications WHERE "pageId" IN (${pageIdsSql})) THEN
      RAISE EXCEPTION 'Unexpected publication row detected';
    END IF;
    RAISE NOTICE 'BLOG_PRODUCTION_IMPORT_BATCH_VERIFIED=${batchIndex}';
  END
  $verify$;`);
  sql.push('COMMIT;');
  fs.writeFileSync(sqlPath, `${sql.join('\n\n')}\n`, { mode: 0o600 });
})().catch((error) => { console.error(error instanceof Error ? error.message : String(error)); process.exit(1); });
NODE

  test -s "$SQL_FILE" || fail "batch_${BATCH_NAME}_sql_missing"
  grep -qx 'COMMIT;' "$SQL_FILE" || fail "batch_${BATCH_NAME}_commit_missing"
  if grep -Eiq '(^|[[:space:]])(UPDATE|DELETE|TRUNCATE|DROP|ALTER)[[:space:]]' "$SQL_FILE"; then
    fail "batch_${BATCH_NAME}_forbidden_sql_detected"
  fi
  if grep -Eiq 'INSERT[[:space:]]+INTO[[:space:]]+blog_content\.publications' "$SQL_FILE"; then
    fail "batch_${BATCH_NAME}_publication_insert_detected"
  fi

  set +e
  psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1 -f "$SQL_FILE" >"$LOG_FILE" 2>&1
  PSQL_RC=$?
  set -e
  if [ "$PSQL_RC" -ne 0 ]; then
    tail -n 100 "$LOG_FILE" >&2 || true
    fail "batch_${BATCH_NAME}_transaction_failed"
  fi
  grep -q "NOTICE:  BLOG_PRODUCTION_IMPORT_BATCH_VERIFIED=${BATCH_INDEX}" "$LOG_FILE" || fail "batch_${BATCH_NAME}_verification_notice_missing"
  grep -qx 'COMMIT' "$LOG_FILE" || fail "batch_${BATCH_NAME}_commit_not_confirmed"

  printf 'PASS\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$BATCH_INDEX" "$BATCH_RECORDS" "$BATCH_SHA" "$FIRST_ORDINAL" "$LAST_ORDINAL" "$FIRST_SLUG" "$LAST_SLUG" > "$MARKER"
  chmod 600 "$MARKER"
  printf '%s\t%s\t%s\t%s\t%s\n' "$(date --iso-8601=seconds)" "$BATCH_INDEX" "$BATCH_RECORDS" "$BATCH_SHA" 'PASS' >> "$PROGRESS"
  rm -f "$SQL_FILE"
done < "$OUT/batches.tsv"

read -r FINAL_PAGES FINAL_VERSIONS FINAL_FINGERPRINTS FINAL_PUBLICATIONS FINAL_QUALITY_RUNS FINAL_REVIEWS FINAL_BLOCKED FINAL_WRITING <<<"$(
  psql "$DATABASE_URL" -X -At -F' ' -c "
    SELECT
      (SELECT count(*) FROM blog_content.pages),
      (SELECT count(*) FROM blog_content.page_versions),
      (SELECT count(*) FROM blog_content.content_fingerprints),
      (SELECT count(*) FROM blog_content.publications),
      (SELECT count(*) FROM blog_content.quality_runs),
      (SELECT count(*) FROM blog_content.editorial_reviews),
      (SELECT count(*) FROM blog_content.pages WHERE \"workspaceId\"='${EXPECTED_WORKSPACE_ID}' AND \"lifecycleStatus\"::text='DISCOVERED' AND \"indexEligibility\"::text='BLOCKED'),
      (SELECT count(*) FROM blog_content.page_versions WHERE status::text='WRITING' AND origin::text='MIGRATED' AND \"sourceCoverage\"=0 AND \"originalityScore\"=0 AND \"qualityScore\"=0);
  "
)"

[ "$FINAL_PAGES" = "$EXPECTED_RECORDS" ] || fail 'final_page_count_mismatch'
[ "$FINAL_VERSIONS" = "$EXPECTED_RECORDS" ] || fail 'final_version_count_mismatch'
[ "$FINAL_FINGERPRINTS" = "$EXPECTED_RECORDS" ] || fail 'final_fingerprint_count_mismatch'
[ "$FINAL_BLOCKED" = "$EXPECTED_RECORDS" ] || fail 'final_blocked_page_count_mismatch'
[ "$FINAL_WRITING" = "$EXPECTED_RECORDS" ] || fail 'final_writing_version_count_mismatch'
[ "$FINAL_PUBLICATIONS" = '0' ] || fail 'final_publication_count_not_zero'
[ "$FINAL_QUALITY_RUNS" = '0' ] || fail 'final_quality_run_count_not_zero'
[ "$FINAL_REVIEWS" = '0' ] || fail 'final_editorial_review_count_not_zero'
[ "$(find "$OUT" -maxdepth 1 -type f -name 'batch-*.pass' | wc -l | awk '{print $1}')" = "$EXPECTED_BATCHES" ] || fail 'batch_marker_count_mismatch'

cat > "$STATUS" <<STATUS
BLOG_EXISTING_PRODUCTION_IMPORT_STATUS=PASS
RELEASE_ID=existing-blog-production-import-v1
EXPLICIT_APPROVAL_VERIFIED=YES
MANIFEST_HASH_VERIFIED=YES
MANIFEST_SHA256=$MANIFEST_SHA256
SOURCE_PLAN_SHA256=$EXPECTED_PLAN_SHA256
SOURCE_PLAN_BYTES=$EXPECTED_PLAN_BYTES
BATCH_COUNT=$EXPECTED_BATCHES
BATCH_RECORDS=1000
FINAL_BATCH_RECORDS=97
IMPORTED_PAGES=$FINAL_PAGES
IMPORTED_PAGE_VERSIONS=$FINAL_VERSIONS
IMPORTED_CONTENT_FINGERPRINTS=$FINAL_FINGERPRINTS
IMPORTED_TOTAL_ROWS=$((FINAL_PAGES + FINAL_VERSIONS + FINAL_FINGERPRINTS))
PUBLICATIONS=$FINAL_PUBLICATIONS
QUALITY_RUNS=$FINAL_QUALITY_RUNS
EDITORIAL_REVIEWS=$FINAL_REVIEWS
DEFAULT_LIFECYCLE_STATUS=DISCOVERED
DEFAULT_VERSION_STATUS=WRITING
DEFAULT_INDEX_ELIGIBILITY=BLOCKED
RESUMABLE_IDEMPOTENT_BATCHES=YES
PER_BATCH_TRANSACTION_COMMITTED=YES
PUBLIC_BLOG_OID=$PUBLIC_BLOG_OID
PUBLIC_BLOG_OID_UNCHANGED=YES
REPORT=$OUT
STATUS

cat "$STATUS"
