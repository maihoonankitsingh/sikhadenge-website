#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

PLAN="${1:-}"
PLAN_SUMMARY="${2:-}"
OUT="${3:-/tmp/blog-existing-sample-import-smoke-$(date +%Y%m%d_%H%M%S)}"

EXPECTED_PLAN_SHA256='66fa51adf700467f66d8118f0dc979ca2abd24947dceea893d1b4197a6898cca'
EXPECTED_PLAN_BYTES='512082000'
EXPECTED_PLAN_RECORDS='120097'
EXPECTED_WORKSPACE_ID='blog-workspace-sikhadenge-v1'
LOCK='/var/lock/sikhadenge-blog-sample-import-smoke.lock'
SAMPLE_JSON="$OUT/sample-records.json"
SQL_FILE="$OUT/sample-import-rollback.sql"
PSQL_LOG="$OUT/psql.log"

fail() {
  printf 'BLOG_TRANSACTIONAL_SAMPLE_IMPORT_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

for command_name in node psql sha256sum stat flock git; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "${DATABASE_URL:-}" || fail 'DATABASE_URL_missing'
test -n "$PLAN" && test -s "$PLAN" || fail 'plan_missing'
test -n "$PLAN_SUMMARY" && test -s "$PLAN_SUMMARY" || fail 'plan_summary_missing'
mkdir -p "$OUT"

exec 9>"$LOCK"
flock -n 9 || fail 'another_blog_sample_import_smoke_is_running'

ACTUAL_PLAN_SHA256="$(sha256sum "$PLAN" | awk '{print $1}')"
ACTUAL_PLAN_BYTES="$(stat -c '%s' "$PLAN")"
test "$ACTUAL_PLAN_SHA256" = "$EXPECTED_PLAN_SHA256" || fail 'plan_hash_mismatch'
test "$ACTUAL_PLAN_BYTES" = "$EXPECTED_PLAN_BYTES" || fail 'plan_size_mismatch'

node - "$PLAN" "$PLAN_SUMMARY" "$SAMPLE_JSON" "$SQL_FILE" <<'NODE'
const crypto = require('node:crypto');
const fs = require('node:fs');
const readline = require('node:readline');

const [planPath, summaryPath, samplePath, sqlPath] = process.argv.slice(2);
const EXPECTED_RECORDS = 120097;
const EXPECTED_PLAN_SHA256 = '66fa51adf700467f66d8118f0dc979ca2abd24947dceea893d1b4197a6898cca';
const EXPECTED_PLAN_BYTES = 512082000;
const EXPECTED_WORKSPACE_ID = 'blog-workspace-sikhadenge-v1';
const positions = new Set([1, Math.floor(EXPECTED_RECORDS / 2) + 1, EXPECTED_RECORDS]);

function die(message) {
  console.error(message);
  process.exit(1);
}

function sqlText(value) {
  if (value === null || value === undefined) return 'NULL';
  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqlJson(value) {
  return `${sqlText(JSON.stringify(value ?? {}))}::jsonb`;
}

function sqlTextArray(value) {
  const items = Array.isArray(value) ? value : [];
  if (!items.length) return 'ARRAY[]::text[]';
  return `ARRAY[${items.map(sqlText).join(', ')}]::text[]`;
}

function sqlNumber(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value)) die(`${label}_invalid`);
  return String(value);
}

const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
if (
  summary.importPlanVersion !== 1 ||
  summary.source?.sourceRecordCount !== EXPECTED_RECORDS ||
  summary.plannedRows?.pages !== EXPECTED_RECORDS ||
  summary.plannedRows?.pageVersions !== EXPECTED_RECORDS ||
  summary.plannedRows?.contentFingerprints !== EXPECTED_RECORDS ||
  summary.plannedRows?.publications !== 0 ||
  summary.plannedRows?.qualityRuns !== 0 ||
  summary.safetyDefaults?.lifecycleStatus !== 'DISCOVERED' ||
  summary.safetyDefaults?.versionStatus !== 'WRITING' ||
  summary.safetyDefaults?.indexEligibility !== 'BLOCKED' ||
  summary.safetyDefaults?.bulkImportApproved !== false ||
  summary.planArtifact?.sha256 !== EXPECTED_PLAN_SHA256 ||
  summary.planArtifact?.bytes !== EXPECTED_PLAN_BYTES ||
  summary.planArtifact?.records !== EXPECTED_RECORDS
) die('plan_summary_contract_mismatch');

const selected = [];
let lineNumber = 0;
const reader = readline.createInterface({
  input: fs.createReadStream(planPath, { encoding: 'utf8' }),
  crlfDelay: Infinity,
});

(async () => {
  for await (const line of reader) {
    if (!line) continue;
    lineNumber += 1;
    if (!positions.has(lineNumber)) continue;
    const record = JSON.parse(line);
    selected.push({ lineNumber, record });
  }

  if (lineNumber !== EXPECTED_RECORDS) die('plan_record_count_mismatch');
  if (selected.length !== 3) die('sample_selection_count_mismatch');

  const pageIds = new Set();
  const versionIds = new Set();
  const fingerprintIds = new Set();
  const slugs = new Set();
  const exactHashes = new Set();

  for (const { record } of selected) {
    if (
      record.importPlanVersion !== 1 ||
      record.page?.workspaceId !== EXPECTED_WORKSPACE_ID ||
      record.page?.lifecycleStatus !== 'DISCOVERED' ||
      record.page?.indexEligibility !== 'BLOCKED' ||
      record.version?.status !== 'WRITING' ||
      record.version?.origin !== 'MIGRATED' ||
      record.version?.sourceCoverage !== 0 ||
      record.version?.originalityScore !== 0 ||
      record.version?.qualityScore !== 0 ||
      record.fingerprint?.scope !== 'legacy-source-record' ||
      record.deferred?.publicationRows !== 0 ||
      record.deferred?.qualityRunRows !== 0 ||
      record.deferred?.editorialReviewRows !== 0
    ) die('sample_record_safety_contract_mismatch');

    if (!record.page.id.startsWith('legacy-page-v1-')) die('page_id_prefix_mismatch');
    if (!record.version.id.startsWith('legacy-version-v1-')) die('version_id_prefix_mismatch');
    if (!record.fingerprint.id.startsWith('legacy-fingerprint-v1-')) die('fingerprint_id_prefix_mismatch');
    if (record.version.pageId !== record.page.id) die('version_page_relation_mismatch');
    if (record.fingerprint.versionId !== record.version.id) die('fingerprint_version_relation_mismatch');

    pageIds.add(record.page.id);
    versionIds.add(record.version.id);
    fingerprintIds.add(record.fingerprint.id);
    slugs.add(record.page.slug);
    exactHashes.add(record.version.exactHash);
  }

  if ([pageIds, versionIds, fingerprintIds, slugs, exactHashes].some((set) => set.size !== 3)) {
    die('sample_identity_collision');
  }

  fs.writeFileSync(samplePath, `${JSON.stringify(selected, null, 2)}\n`, { mode: 0o600 });

  const sql = [];
  sql.push('\\set ON_ERROR_STOP on');
  sql.push('BEGIN;');
  sql.push("SET LOCAL lock_timeout = '5s';");
  sql.push("SET LOCAL statement_timeout = '120s';");
  sql.push("SET LOCAL idle_in_transaction_session_timeout = '120s';");
  sql.push("SELECT pg_advisory_xact_lock(hashtextextended('sikhadenge-blog-sample-import-smoke-v1', 0));");

  for (const { record } of selected) {
    const page = record.page;
    const version = record.version;
    const fingerprint = record.fingerprint;

    sql.push(`INSERT INTO blog_content.pages (
      id, "workspaceId", slug, "canonicalPath", title, "primaryKeyword",
      "secondaryKeywords", "uniqueAngle", "userProblem", "expectedOutcome",
      "lifecycleStatus", "indexEligibility", "audienceId", "intentId", locale,
      priority, "sourceRecordKey", metadata
    ) VALUES (
      ${sqlText(page.id)}, ${sqlText(page.workspaceId)}, ${sqlText(page.slug)},
      ${sqlText(page.canonicalPath)}, ${sqlText(page.title)}, ${sqlText(page.primaryKeyword)},
      ${sqlTextArray(page.secondaryKeywords)}, ${sqlText(page.uniqueAngle)},
      ${sqlText(page.userProblem)}, ${sqlText(page.expectedOutcome)},
      ${sqlText(page.lifecycleStatus)}, ${sqlText(page.indexEligibility)},
      ${sqlText(page.audienceId)}, ${sqlText(page.intentId)}, ${sqlText(page.locale)},
      ${sqlNumber(page.priority, 'page_priority')}, ${sqlText(page.sourceRecordKey)},
      ${sqlJson(page.metadata)}
    );`);

    sql.push(`INSERT INTO blog_content.page_versions (
      id, "pageId", "versionNumber", status, origin, title, "metaTitle",
      "metaDescription", h1, "directAnswer", introduction, conclusion,
      "authorName", "reviewerName", language, "wordCount", "readingMinutes",
      "sourceCoverage", "originalityScore", "qualityScore", "exactHash",
      "normalizedHash", "minHash", "simHash", "semanticFingerprint",
      "generatedBy", "generationPromptHash", notes, "createdBy"
    ) VALUES (
      ${sqlText(version.id)}, ${sqlText(version.pageId)}, ${sqlNumber(version.versionNumber, 'version_number')},
      ${sqlText(version.status)}, ${sqlText(version.origin)}, ${sqlText(version.title)},
      ${sqlText(version.metaTitle)}, ${sqlText(version.metaDescription)}, ${sqlText(version.h1)},
      ${sqlText(version.directAnswer)}, ${sqlText(version.introduction)}, ${sqlText(version.conclusion)},
      ${sqlText(version.authorName)}, ${sqlText(version.reviewerName)}, ${sqlText(version.language)},
      ${sqlNumber(version.wordCount, 'word_count')}, ${sqlNumber(version.readingMinutes, 'reading_minutes')},
      ${sqlNumber(version.sourceCoverage, 'source_coverage')},
      ${sqlNumber(version.originalityScore, 'originality_score')},
      ${sqlNumber(version.qualityScore, 'quality_score')}, ${sqlText(version.exactHash)},
      ${sqlText(version.normalizedHash)}, ${sqlText(version.minHash)}, ${version.simHash === null ? 'NULL' : sqlText(version.simHash)},
      ${sqlText(version.semanticFingerprint)}, ${sqlText(version.generatedBy)},
      ${sqlText(version.generationPromptHash)}, ${sqlText(version.notes)}, ${sqlText(version.createdBy)}
    );`);

    sql.push(`INSERT INTO blog_content.content_fingerprints (
      id, "versionId", scope, "scopeKey", "exactHash", "normalizedHash",
      "minHash", "simHash", "tokenCount", shingles, metadata
    ) VALUES (
      ${sqlText(fingerprint.id)}, ${sqlText(fingerprint.versionId)}, ${sqlText(fingerprint.scope)},
      ${sqlText(fingerprint.scopeKey)}, ${sqlText(fingerprint.exactHash)},
      ${sqlText(fingerprint.normalizedHash)}, ${sqlText(fingerprint.minHash)},
      ${fingerprint.simHash === null ? 'NULL' : sqlText(fingerprint.simHash)},
      ${sqlNumber(fingerprint.tokenCount, 'token_count')}, ${sqlNumber(fingerprint.shingles, 'shingles')},
      ${sqlJson(fingerprint.metadata)}
    );`);
  }

  const pageIdList = [...pageIds].map(sqlText).join(', ');
  const versionIdList = [...versionIds].map(sqlText).join(', ');
  const fingerprintIdList = [...fingerprintIds].map(sqlText).join(', ');

  sql.push(`DO $verify$
  BEGIN
    IF (SELECT count(*) FROM blog_content.pages WHERE id IN (${pageIdList})) <> 3 THEN
      RAISE EXCEPTION 'Expected three sample pages inside transaction';
    END IF;
    IF (SELECT count(*) FROM blog_content.page_versions WHERE id IN (${versionIdList})) <> 3 THEN
      RAISE EXCEPTION 'Expected three sample versions inside transaction';
    END IF;
    IF (SELECT count(*) FROM blog_content.content_fingerprints WHERE id IN (${fingerprintIdList})) <> 3 THEN
      RAISE EXCEPTION 'Expected three sample fingerprints inside transaction';
    END IF;
    IF EXISTS (SELECT 1 FROM blog_content.pages WHERE id IN (${pageIdList}) AND ("lifecycleStatus"::text <> 'DISCOVERED' OR "indexEligibility"::text <> 'BLOCKED')) THEN
      RAISE EXCEPTION 'Sample page safety defaults changed';
    END IF;
    IF EXISTS (SELECT 1 FROM blog_content.page_versions WHERE id IN (${versionIdList}) AND (status::text <> 'WRITING' OR "sourceCoverage" <> 0 OR "originalityScore" <> 0 OR "qualityScore" <> 0)) THEN
      RAISE EXCEPTION 'Sample version safety defaults changed';
    END IF;
    IF EXISTS (SELECT 1 FROM blog_content.publications WHERE "pageId" IN (${pageIdList})) THEN
      RAISE EXCEPTION 'Unexpected publication row created';
    END IF;
    RAISE NOTICE 'BLOG_TRANSACTIONAL_SAMPLE_IMPORT_VERIFIED=YES';
  END
  $verify$;`);
  sql.push('ROLLBACK;');

  fs.writeFileSync(sqlPath, `${sql.join('\n\n')}\n`, { mode: 0o600 });
})().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
NODE

test -s "$SAMPLE_JSON" || fail 'sample_json_missing'
test -s "$SQL_FILE" || fail 'rollback_sql_missing'
grep -qx 'ROLLBACK;' "$SQL_FILE" || fail 'mandatory_rollback_missing'
if grep -Eq '^[[:space:]]*COMMIT;' "$SQL_FILE"; then
  fail 'commit_statement_forbidden'
fi

PRE_WORKSPACES="$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM blog_content.workspaces;")"
PRE_PAGES="$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM blog_content.pages;")"
PRE_VERSIONS="$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM blog_content.page_versions;")"
PRE_FINGERPRINTS="$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM blog_content.content_fingerprints;")"
PRE_PUBLICATIONS="$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM blog_content.publications;")"
PRE_PUBLIC_TABLES="$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")"
PRE_PUBLIC_BLOG_OID="$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text,'NULL');")"

test "$PRE_WORKSPACES" = '1' || fail 'workspace_count_mismatch'
test "$PRE_PAGES" = '0' || fail 'pages_not_empty_before_smoke'
test "$PRE_VERSIONS" = '0' || fail 'page_versions_not_empty_before_smoke'
test "$PRE_FINGERPRINTS" = '0' || fail 'content_fingerprints_not_empty_before_smoke'
test "$PRE_PUBLICATIONS" = '0' || fail 'publications_not_empty_before_smoke'
test "$PRE_PUBLIC_BLOG_OID" != 'NULL' || fail 'public_blog_table_missing'

set +e
psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1 -f "$SQL_FILE" >"$PSQL_LOG" 2>&1
PSQL_RC=$?
set -e

POST_WORKSPACES="$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM blog_content.workspaces;")"
POST_PAGES="$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM blog_content.pages;")"
POST_VERSIONS="$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM blog_content.page_versions;")"
POST_FINGERPRINTS="$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM blog_content.content_fingerprints;")"
POST_PUBLICATIONS="$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM blog_content.publications;")"
POST_PUBLIC_TABLES="$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")"
POST_PUBLIC_BLOG_OID="$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text,'NULL');")"

if [ "$PSQL_RC" -ne 0 ]; then
  tail -n 100 "$PSQL_LOG" >&2 || true
  test "$POST_PAGES" = "$PRE_PAGES" || fail 'pages_persisted_after_failed_transaction'
  test "$POST_VERSIONS" = "$PRE_VERSIONS" || fail 'versions_persisted_after_failed_transaction'
  test "$POST_FINGERPRINTS" = "$PRE_FINGERPRINTS" || fail 'fingerprints_persisted_after_failed_transaction'
  fail 'sample_import_transaction_failed_and_rolled_back'
fi

grep -q 'NOTICE:  BLOG_TRANSACTIONAL_SAMPLE_IMPORT_VERIFIED=YES' "$PSQL_LOG" || fail 'in_transaction_verification_notice_missing'
grep -qx 'ROLLBACK' "$PSQL_LOG" || fail 'rollback_not_confirmed_by_psql'

test "$POST_WORKSPACES" = "$PRE_WORKSPACES" || fail 'workspace_count_changed'
test "$POST_PAGES" = "$PRE_PAGES" || fail 'page_count_changed_after_rollback'
test "$POST_VERSIONS" = "$PRE_VERSIONS" || fail 'version_count_changed_after_rollback'
test "$POST_FINGERPRINTS" = "$PRE_FINGERPRINTS" || fail 'fingerprint_count_changed_after_rollback'
test "$POST_PUBLICATIONS" = "$PRE_PUBLICATIONS" || fail 'publication_count_changed_after_rollback'
test "$POST_PUBLIC_TABLES" = "$PRE_PUBLIC_TABLES" || fail 'public_table_count_changed'
test "$POST_PUBLIC_BLOG_OID" = "$PRE_PUBLIC_BLOG_OID" || fail 'public_blog_identity_changed'

FIRST_SLUG="$(node -e "const x=require(process.argv[1]); process.stdout.write(x[0].record.page.slug)" "$SAMPLE_JSON")"
MIDDLE_SLUG="$(node -e "const x=require(process.argv[1]); process.stdout.write(x[1].record.page.slug)" "$SAMPLE_JSON")"
LAST_SLUG="$(node -e "const x=require(process.argv[1]); process.stdout.write(x[2].record.page.slug)" "$SAMPLE_JSON")"

cat >"$OUT/status.txt" <<STATUS
BLOG_TRANSACTIONAL_SAMPLE_IMPORT_STATUS=PASS
PLAN_HASH_VERIFIED=YES
PLAN_SIZE_VERIFIED=YES
SAMPLE_SELECTION=FIRST_MIDDLE_LAST
SAMPLE_RECORDS=3
SAMPLE_PAGES_INSERTED_BEFORE_ROLLBACK=3
SAMPLE_PAGE_VERSIONS_INSERTED_BEFORE_ROLLBACK=3
SAMPLE_CONTENT_FINGERPRINTS_INSERTED_BEFORE_ROLLBACK=3
SAMPLE_TOTAL_ROWS_INSERTED_BEFORE_ROLLBACK=9
SCHEMA_CONSTRAINTS_VERIFIED=YES
FOREIGN_KEYS_VERIFIED=YES
BLOCKED_LIFECYCLE_DEFAULTS_VERIFIED=YES
ZERO_PUBLICATION_INTENT_VERIFIED=YES
TRANSACTION_ROLLED_BACK=YES
WORKSPACE_COUNT_BEFORE=$PRE_WORKSPACES
WORKSPACE_COUNT_AFTER=$POST_WORKSPACES
PAGES_BEFORE=$PRE_PAGES
PAGES_AFTER=$POST_PAGES
PAGE_VERSIONS_BEFORE=$PRE_VERSIONS
PAGE_VERSIONS_AFTER=$POST_VERSIONS
CONTENT_FINGERPRINTS_BEFORE=$PRE_FINGERPRINTS
CONTENT_FINGERPRINTS_AFTER=$POST_FINGERPRINTS
PUBLICATIONS_BEFORE=$PRE_PUBLICATIONS
PUBLICATIONS_AFTER=$POST_PUBLICATIONS
PUBLIC_BLOG_OID_UNCHANGED=YES
DATABASE_PERSISTENT_WRITE_PERFORMED=NO
BULK_IMPORT_APPROVED=NO
PRODUCTION_WRITE_APPROVED=NO
FIRST_SAMPLE_SLUG=$FIRST_SLUG
MIDDLE_SAMPLE_SLUG=$MIDDLE_SLUG
LAST_SAMPLE_SLUG=$LAST_SLUG
PLAN_SHA256=$ACTUAL_PLAN_SHA256
PLAN_BYTES=$ACTUAL_PLAN_BYTES
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
grep -E 'NOTICE:  BLOG_TRANSACTIONAL_SAMPLE_IMPORT_VERIFIED=YES|^ROLLBACK$' "$PSQL_LOG" || true
