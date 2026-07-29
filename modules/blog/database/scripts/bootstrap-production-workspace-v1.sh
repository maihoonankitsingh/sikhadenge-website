#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

OUT="${1:-/tmp/blog-content-workspace-bootstrap-$(date +%Y%m%d_%H%M%S)}"
APPROVAL="${2:-}"
EXPECTED_APPROVAL='APPROVE BLOG WORKSPACE V1 BOOTSTRAP'
WORKSPACE_ID='blog-workspace-sikhadenge-v1'
WORKSPACE_KEY='sikhadenge-blog'
LOCK='/var/lock/sikhadenge-blog-workspace-v1.lock'
WRAPPER="$OUT/workspace-bootstrap.sql"
LOG="$OUT/psql.log"

fail() {
  printf 'BLOG_WORKSPACE_BOOTSTRAP_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

for command_name in psql flock; do
  command -v "$command_name" >/dev/null || fail "${command_name}_not_found"
done

test -n "${DATABASE_URL:-}" || fail 'DATABASE_URL_missing'
[ "$APPROVAL" = "$EXPECTED_APPROVAL" ] || fail 'explicit_approval_phrase_mismatch'
mkdir -p "$OUT"

exec 9>"$LOCK"
flock -n 9 || fail 'another_blog_workspace_bootstrap_is_running'

PRE_SCHEMA=$(psql "$DATABASE_URL" -X -Atc "SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content');")
PRE_BLOG_TABLES=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='blog_content' AND table_type='BASE TABLE';")
PRE_PUBLIC_TABLES=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")
PRE_PUBLIC_BLOG_OID=$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text,'NULL');")
PRE_WORKSPACES=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM blog_content.workspaces;")

[ "$PRE_SCHEMA" = 't' ] || fail 'blog_content_schema_missing'
[ "$PRE_BLOG_TABLES" = '23' ] || fail 'blog_table_count_mismatch'
[ "$PRE_PUBLIC_BLOG_OID" != 'NULL' ] || fail 'public_blog_table_missing'
[ "$PRE_WORKSPACES" = '0' ] || fail 'workspace_table_not_empty'

cat > "$WRAPPER" <<'SQL'
\set ON_ERROR_STOP on
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';
SET LOCAL idle_in_transaction_session_timeout = '60s';

INSERT INTO blog_content.workspaces (
  id,
  key,
  name,
  locale,
  "defaultCanonicalHost",
  "targetPageCapacity",
  settings,
  "updatedAt"
) VALUES (
  'blog-workspace-sikhadenge-v1',
  'sikhadenge-blog',
  'Sikhadenge Blog Content Platform',
  'en-IN',
  'https://sikhadenge.in',
  500000,
  jsonb_build_object(
    'qualityPolicyKey', 'blog-production-v1',
    'publicationDefault', 'blocked',
    'indexEligibilityDefault', 'BLOCKED',
    'requiresPassedQualityGate', true,
    'requiresEditorialApproval', true,
    'defaultRobotsDirective', 'noindex,follow'
  ),
  now()
);

DO $verify$
DECLARE
  workspace_count integer;
BEGIN
  SELECT count(*) INTO workspace_count
  FROM blog_content.workspaces
  WHERE id = 'blog-workspace-sikhadenge-v1'
    AND key = 'sikhadenge-blog'
    AND name = 'Sikhadenge Blog Content Platform'
    AND locale = 'en-IN'
    AND "defaultCanonicalHost" = 'https://sikhadenge.in'
    AND "targetPageCapacity" = 500000
    AND settings->>'qualityPolicyKey' = 'blog-production-v1'
    AND settings->>'publicationDefault' = 'blocked'
    AND settings->>'indexEligibilityDefault' = 'BLOCKED'
    AND settings->>'requiresPassedQualityGate' = 'true'
    AND settings->>'requiresEditorialApproval' = 'true'
    AND settings->>'defaultRobotsDirective' = 'noindex,follow';

  IF workspace_count <> 1 THEN
    RAISE EXCEPTION 'Canonical Blog workspace verification failed';
  END IF;

  IF (SELECT count(*) FROM blog_content.workspaces) <> 1 THEN
    RAISE EXCEPTION 'Expected exactly one Blog workspace';
  END IF;

  RAISE NOTICE 'BLOG_WORKSPACE_BOOTSTRAP_VERIFIED=YES';
END
$verify$;

COMMIT;
SQL

if ! psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1 -f "$WRAPPER" > "$LOG" 2>&1; then
  tail -n 80 "$LOG" >&2 || true
  fail 'workspace_bootstrap_transaction_failed'
fi

POST_WORKSPACES=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM blog_content.workspaces;")
POST_MATCH=$(psql "$DATABASE_URL" -X -Atc "
SELECT count(*)
FROM blog_content.workspaces
WHERE id='$WORKSPACE_ID'
  AND key='$WORKSPACE_KEY'
  AND \"targetPageCapacity\"=500000
  AND \"defaultCanonicalHost\"='https://sikhadenge.in';
")
POST_PUBLIC_TABLES=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")
POST_PUBLIC_BLOG_OID=$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text,'NULL');")
POST_OTHER_ROWS=$(psql "$DATABASE_URL" -X -Atc "
SELECT
  (SELECT count(*) FROM blog_content.audiences) +
  (SELECT count(*) FROM blog_content.audit_events) +
  (SELECT count(*) FROM blog_content.claim_evidence) +
  (SELECT count(*) FROM blog_content.claims) +
  (SELECT count(*) FROM blog_content.content_fingerprints) +
  (SELECT count(*) FROM blog_content.editorial_reviews) +
  (SELECT count(*) FROM blog_content.faqs) +
  (SELECT count(*) FROM blog_content.page_topics) +
  (SELECT count(*) FROM blog_content.page_versions) +
  (SELECT count(*) FROM blog_content.pages) +
  (SELECT count(*) FROM blog_content.publications) +
  (SELECT count(*) FROM blog_content.quality_checks) +
  (SELECT count(*) FROM blog_content.quality_runs) +
  (SELECT count(*) FROM blog_content.refresh_jobs) +
  (SELECT count(*) FROM blog_content.search_intents) +
  (SELECT count(*) FROM blog_content.section_claims) +
  (SELECT count(*) FROM blog_content.sections) +
  (SELECT count(*) FROM blog_content.similarity_matches) +
  (SELECT count(*) FROM blog_content.source_snapshots) +
  (SELECT count(*) FROM blog_content.sources) +
  (SELECT count(*) FROM blog_content.topic_edges) +
  (SELECT count(*) FROM blog_content.topics);
")

[ "$POST_WORKSPACES" = '1' ] || fail 'post_bootstrap_workspace_count_mismatch'
[ "$POST_MATCH" = '1' ] || fail 'canonical_workspace_missing_after_commit'
[ "$POST_OTHER_ROWS" = '0' ] || fail 'unexpected_non_workspace_rows_created'
[ "$POST_PUBLIC_TABLES" = "$PRE_PUBLIC_TABLES" ] || fail 'public_table_count_changed'
[ "$POST_PUBLIC_BLOG_OID" = "$PRE_PUBLIC_BLOG_OID" ] || fail 'public_blog_identity_changed'

grep -E 'NOTICE:  BLOG_WORKSPACE_BOOTSTRAP_VERIFIED=YES|^COMMIT$' "$LOG" > "$OUT/verification.txt" || true

cat > "$OUT/status.txt" <<STATUS
BLOG_WORKSPACE_BOOTSTRAP_STATUS=PASS
TRANSACTION_COMMITTED=YES
WORKSPACE_ID=$WORKSPACE_ID
WORKSPACE_KEY=$WORKSPACE_KEY
WORKSPACE_COUNT=1
TARGET_PAGE_CAPACITY=500000
DEFAULT_CANONICAL_HOST=https://sikhadenge.in
DEFAULT_INDEX_ELIGIBILITY=BLOCKED
DEFAULT_ROBOTS_DIRECTIVE=noindex,follow
REQUIRES_PASSED_QUALITY_GATE=YES
REQUIRES_EDITORIAL_APPROVAL=YES
OTHER_BLOG_ROWS_CREATED=0
PUBLIC_TABLE_COUNT_BEFORE=$PRE_PUBLIC_TABLES
PUBLIC_TABLE_COUNT_AFTER=$POST_PUBLIC_TABLES
PUBLIC_BLOG_OID_UNCHANGED=YES
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
cat "$OUT/verification.txt"
