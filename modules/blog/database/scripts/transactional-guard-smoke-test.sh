#!/usr/bin/env bash
set -Eeuo pipefail

MIGRATION_SQL="${1:-}"
GUARD_SQL="${2:-}"
OUT="${3:-/tmp/blog-content-guard-smoke-$(date +%Y%m%d_%H%M%S)}"

fail() {
  printf 'BLOG_GUARD_SMOKE_STATUS=FAIL\nREASON=%s\nREPORT=%s\n' "$1" "$OUT" >&2
  exit 1
}

command -v psql >/dev/null || fail "psql_not_found"
test -n "${DATABASE_URL:-}" || fail "DATABASE_URL_missing"
test -s "$MIGRATION_SQL" || fail "migration_sql_missing"
test -s "$GUARD_SQL" || fail "guard_sql_missing"
mkdir -p "$OUT"

WRAPPER="$OUT/transactional-guard-wrapper.sql"
LOG="$OUT/psql.log"

PUBLIC_TABLE_COUNT_BEFORE=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")
PUBLIC_BLOG_OID_BEFORE=$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text, 'NULL');")
BLOG_SCHEMA_BEFORE=$(psql "$DATABASE_URL" -X -Atc "SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content');")
PG_TRGM_BEFORE=$(psql "$DATABASE_URL" -X -Atc "SELECT EXISTS (SELECT 1 FROM pg_extension WHERE extname='pg_trgm');")

[ "$BLOG_SCHEMA_BEFORE" = "f" ] || fail "blog_content_schema_already_exists"

{
  echo 'BEGIN;'
  cat "$MIGRATION_SQL"
  sed -E '/^[[:space:]]*BEGIN;[[:space:]]*$/d; /^[[:space:]]*COMMIT;[[:space:]]*$/d' "$GUARD_SQL"
  cat <<'SQL'

DO $$
DECLARE
  guard_constraint_count integer;
  guard_index_count integer;
  guard_trigger_count integer;
BEGIN
  SELECT count(*) INTO guard_constraint_count
  FROM pg_constraint
  WHERE connamespace = 'blog_content'::regnamespace
    AND conname IN (
      'pages_index_lifecycle_guard',
      'page_versions_source_coverage_range',
      'page_versions_originality_score_range',
      'page_versions_quality_score_range',
      'page_versions_nonnegative_counts',
      'similarity_matches_score_range',
      'similarity_matches_threshold_range',
      'similarity_matches_distinct_versions',
      'quality_runs_score_range',
      'quality_runs_nonnegative_counts',
      'quality_checks_score_range',
      'quality_checks_threshold_range',
      'refresh_jobs_single_target',
      'refresh_jobs_attempts_nonnegative',
      'claims_confidence_range',
      'claims_verified_fields_guard',
      'claims_validity_window'
    );

  SELECT count(*) INTO guard_index_count
  FROM pg_indexes
  WHERE schemaname = 'blog_content'
    AND indexname IN (
      'publications_one_live_version_per_page',
      'page_versions_title_trgm_idx',
      'page_versions_h1_trgm_idx',
      'page_versions_direct_answer_trgm_idx',
      'sections_heading_trgm_idx',
      'faqs_question_trgm_idx'
    );

  SELECT count(*) INTO guard_trigger_count
  FROM pg_trigger
  WHERE tgname = 'publications_enforce_gate'
    AND NOT tgisinternal;

  IF guard_constraint_count <> 17 THEN
    RAISE EXCEPTION 'Expected 17 Blog guard constraints, found %', guard_constraint_count;
  END IF;

  IF guard_index_count <> 6 THEN
    RAISE EXCEPTION 'Expected 6 Blog guard indexes, found %', guard_index_count;
  END IF;

  IF guard_trigger_count <> 1 THEN
    RAISE EXCEPTION 'Expected publication guard trigger, found %', guard_trigger_count;
  END IF;

  IF to_regprocedure('blog_content.enforce_publication_gate()') IS NULL THEN
    RAISE EXCEPTION 'Publication guard function is missing';
  END IF;

  RAISE NOTICE 'BLOG_GUARD_CONSTRAINTS=%', guard_constraint_count;
  RAISE NOTICE 'BLOG_GUARD_INDEXES=%', guard_index_count;
  RAISE NOTICE 'BLOG_GUARD_TRIGGERS=%', guard_trigger_count;
END;
$$;

INSERT INTO blog_content.workspaces (
  id, key, name, "updatedAt"
) VALUES (
  'guard-workspace', 'guard-smoke', 'Guard smoke workspace', now()
);

INSERT INTO blog_content.pages (
  id, "workspaceId", slug, "canonicalPath", title,
  "uniqueAngle", "userProblem", "expectedOutcome",
  "lifecycleStatus", "indexEligibility", "updatedAt"
) VALUES (
  'guard-page', 'guard-workspace', 'guard-smoke-page', '/blog/guard-smoke-page',
  'Guard smoke page', 'A unique guard smoke angle',
  'Validate publication protections', 'Prove unsafe publication is blocked',
  'READY', 'ELIGIBLE', now()
);

INSERT INTO blog_content.page_versions (
  id, "pageId", "versionNumber", status, origin, title,
  "metaTitle", "metaDescription", h1, "directAnswer",
  "authorName", "wordCount", "readingMinutes", "sourceCoverage",
  "originalityScore", "qualityScore", "exactHash", "normalizedHash",
  "createdBy", "updatedAt"
) VALUES (
  'guard-version', 'guard-page', 1, 'READY', 'HUMAN', 'Guard smoke page',
  'Guard smoke meta title', 'Guard smoke meta description', 'Guard smoke H1',
  'This answer exists only to validate the Blog publication gate.',
  'Sikhadenge Editorial Team', 1200, 8, 0.90, 95, 92,
  'guard-exact-hash', 'guard-normalized-hash', 'guard-smoke', now()
);

DO $$
DECLARE
  blocked boolean := false;
BEGIN
  BEGIN
    INSERT INTO blog_content.publications (
      id, "pageId", "versionId", status, "canonicalUrl",
      indexable, "sitemapEligible", "robotsDirective", "updatedAt"
    ) VALUES (
      'guard-publication-no-quality', 'guard-page', 'guard-version', 'PUBLISHED',
      'https://sikhadenge.in/blog/guard-smoke-page', true, true, 'index,follow', now()
    );
  EXCEPTION WHEN OTHERS THEN
    IF position('passed quality gate' in SQLERRM) > 0 THEN
      blocked := true;
    ELSE
      RAISE;
    END IF;
  END;

  IF NOT blocked THEN
    RAISE EXCEPTION 'Publication without passed quality gate was not blocked';
  END IF;

  RAISE NOTICE 'BLOG_GUARD_BLOCKED_NO_QUALITY=YES';
END;
$$;

INSERT INTO blog_content.quality_runs (
  id, "versionId", status, "policyKey", "policyHash",
  score, blockers, warnings, "completedAt"
) VALUES (
  'guard-quality-run', 'guard-version', 'PASSED',
  'blog-production-v1', 'guard-policy-hash', 92, 0, 0, now()
);

DO $$
DECLARE
  blocked boolean := false;
BEGIN
  BEGIN
    INSERT INTO blog_content.publications (
      id, "pageId", "versionId", status, "canonicalUrl",
      indexable, "sitemapEligible", "robotsDirective", "updatedAt"
    ) VALUES (
      'guard-publication-no-review', 'guard-page', 'guard-version', 'PUBLISHED',
      'https://sikhadenge.in/blog/guard-smoke-page', true, true, 'index,follow', now()
    );
  EXCEPTION WHEN OTHERS THEN
    IF position('Editorial approval' in SQLERRM) > 0 THEN
      blocked := true;
    ELSE
      RAISE;
    END IF;
  END;

  IF NOT blocked THEN
    RAISE EXCEPTION 'Publication without editorial approval was not blocked';
  END IF;

  RAISE NOTICE 'BLOG_GUARD_BLOCKED_NO_REVIEW=YES';
END;
$$;

INSERT INTO blog_content.editorial_reviews (
  id, "versionId", "reviewerId", "reviewerName",
  decision, "reviewedAt", "updatedAt"
) VALUES (
  'guard-review', 'guard-version', 'guard-reviewer',
  'Guard Reviewer', 'APPROVED', now(), now()
);

INSERT INTO blog_content.publications (
  id, "pageId", "versionId", status, "canonicalUrl",
  indexable, "sitemapEligible", "robotsDirective", "updatedAt"
) VALUES (
  'guard-publication', 'guard-page', 'guard-version', 'PUBLISHED',
  'https://sikhadenge.in/blog/guard-smoke-page', true, true, 'index,follow', now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM blog_content.publications
    WHERE id = 'guard-publication'
      AND status::text = 'PUBLISHED'
      AND indexable = true
      AND "sitemapEligible" = true
      AND "publishedAt" IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'Approved publication did not pass the guard';
  END IF;

  RAISE NOTICE 'BLOG_GUARD_APPROVED_PUBLICATION=YES';
END;
$$;

DO $$
DECLARE
  blocked boolean := false;
BEGIN
  BEGIN
    UPDATE blog_content.publications
    SET "robotsDirective" = 'noindex,follow', "updatedAt" = now()
    WHERE id = 'guard-publication';
  EXCEPTION WHEN OTHERS THEN
    IF position('noindex' in SQLERRM) > 0 THEN
      blocked := true;
    ELSE
      RAISE;
    END IF;
  END;

  IF NOT blocked THEN
    RAISE EXCEPTION 'Indexable publication accepted a noindex directive';
  END IF;

  RAISE NOTICE 'BLOG_GUARD_BLOCKED_NOINDEX_CONFLICT=YES';
END;
$$;

DO $$
DECLARE
  blocked boolean := false;
BEGIN
  BEGIN
    INSERT INTO blog_content.claims (
      id, "workspaceId", "stableKey", statement, "normalizedHash",
      status, confidence, "updatedAt"
    ) VALUES (
      'guard-invalid-claim', 'guard-workspace', 'guard-invalid-claim',
      'This invalid verified claim intentionally lacks verification metadata.',
      'guard-invalid-claim-hash', 'VERIFIED', 0.90, now()
    );
  EXCEPTION WHEN check_violation THEN
    blocked := true;
  END;

  IF NOT blocked THEN
    RAISE EXCEPTION 'Verified claim without verifier metadata was not blocked';
  END IF;

  RAISE NOTICE 'BLOG_GUARD_BLOCKED_UNVERIFIED_CLAIM=YES';
END;
$$;

ROLLBACK;
SQL
} > "$WRAPPER"

[ "$(head -n 1 "$WRAPPER")" = "BEGIN;" ] || fail "wrapper_first_line_invalid"
grep -q '^ROLLBACK;$' "$WRAPPER" || fail "wrapper_rollback_missing"

if ! psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1 -f "$WRAPPER" > "$LOG" 2>&1; then
  tail -n 120 "$LOG" >&2 || true
  fail "transactional_guard_execution_failed"
fi

PUBLIC_TABLE_COUNT_AFTER=$(psql "$DATABASE_URL" -X -Atc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")
PUBLIC_BLOG_OID_AFTER=$(psql "$DATABASE_URL" -X -Atc "SELECT COALESCE(to_regclass('public.\"Blog\"')::oid::text, 'NULL');")
BLOG_SCHEMA_AFTER=$(psql "$DATABASE_URL" -X -Atc "SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name='blog_content');")
PG_TRGM_AFTER=$(psql "$DATABASE_URL" -X -Atc "SELECT EXISTS (SELECT 1 FROM pg_extension WHERE extname='pg_trgm');")

[ "$BLOG_SCHEMA_AFTER" = "f" ] || fail "blog_content_schema_persisted"
[ "$PUBLIC_TABLE_COUNT_BEFORE" = "$PUBLIC_TABLE_COUNT_AFTER" ] || fail "public_table_count_changed"
[ "$PUBLIC_BLOG_OID_BEFORE" = "$PUBLIC_BLOG_OID_AFTER" ] || fail "public_blog_oid_changed"
[ "$PG_TRGM_BEFORE" = "$PG_TRGM_AFTER" ] || fail "pg_trgm_extension_state_changed"

grep -q 'BLOG_GUARD_BLOCKED_NO_QUALITY=YES' "$LOG" || fail "no_quality_gate_assertion_missing"
grep -q 'BLOG_GUARD_BLOCKED_NO_REVIEW=YES' "$LOG" || fail "no_review_assertion_missing"
grep -q 'BLOG_GUARD_APPROVED_PUBLICATION=YES' "$LOG" || fail "approved_publication_assertion_missing"
grep -q 'BLOG_GUARD_BLOCKED_NOINDEX_CONFLICT=YES' "$LOG" || fail "noindex_conflict_assertion_missing"
grep -q 'BLOG_GUARD_BLOCKED_UNVERIFIED_CLAIM=YES' "$LOG" || fail "verified_claim_assertion_missing"
grep -q '^ROLLBACK$' "$LOG" || fail "rollback_confirmation_missing"

cat > "$OUT/status.txt" <<STATUS
BLOG_GUARD_SMOKE_STATUS=PASS
GUARD_SCHEMA_ALIGNED=YES
GUARD_CONSTRAINTS=17
GUARD_INDEXES=6
GUARD_TRIGGER=1
BLOCKED_WITHOUT_QUALITY=YES
BLOCKED_WITHOUT_EDITORIAL_REVIEW=YES
BLOCKED_NOINDEX_CONFLICT=YES
BLOCKED_UNVERIFIED_CLAIM=YES
APPROVED_PUBLICATION_ALLOWED=YES
TRANSACTION_ROLLED_BACK=YES
BLOG_SCHEMA_PERSISTED=NO
PUBLIC_TABLE_COUNT_BEFORE=$PUBLIC_TABLE_COUNT_BEFORE
PUBLIC_TABLE_COUNT_AFTER=$PUBLIC_TABLE_COUNT_AFTER
PUBLIC_BLOG_OID_UNCHANGED=YES
PG_TRGM_STATE_UNCHANGED=YES
DATABASE_PERSISTENT_CHANGE=NO
REPORT=$OUT
STATUS

cat "$OUT/status.txt"
tail -n 40 "$LOG"
