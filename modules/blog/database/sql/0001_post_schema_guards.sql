-- REVIEW-ONLY SQL. Do not execute directly on production.
-- Apply only after the generated Prisma migration has passed schema validation,
-- migration review, backup verification and staging tests.

BEGIN;

CREATE EXTENSION IF NOT EXISTS pg_trgm;

ALTER TABLE blog_content.pages
  ADD CONSTRAINT pages_quality_score_range
  CHECK ("currentQualityScore" IS NULL OR "currentQualityScore" BETWEEN 0 AND 100),
  ADD CONSTRAINT pages_unique_score_range
  CHECK ("currentUniqueScore" IS NULL OR "currentUniqueScore" BETWEEN 0 AND 100),
  ADD CONSTRAINT pages_index_lifecycle_guard
  CHECK (
    "indexEligibility"::text NOT IN ('ELIGIBLE', 'INDEXED')
    OR "lifecycleStatus"::text IN ('READY', 'PUBLISHED')
  );

ALTER TABLE blog_content.page_versions
  ADD CONSTRAINT page_versions_source_coverage_range
  CHECK ("sourceCoverage" BETWEEN 0 AND 1),
  ADD CONSTRAINT page_versions_template_ratio_range
  CHECK ("templateRatio" BETWEEN 0 AND 1),
  ADD CONSTRAINT page_versions_uniqueness_score_range
  CHECK ("uniquenessScore" IS NULL OR "uniquenessScore" BETWEEN 0 AND 100),
  ADD CONSTRAINT page_versions_quality_score_range
  CHECK ("qualityScore" IS NULL OR "qualityScore" BETWEEN 0 AND 100),
  ADD CONSTRAINT page_versions_positive_word_count
  CHECK ("wordCount" >= 0 AND "factualClaimCount" >= 0);

ALTER TABLE blog_content.similarity_matches
  ADD CONSTRAINT similarity_matches_score_range
  CHECK (score BETWEEN 0 AND 1),
  ADD CONSTRAINT similarity_matches_distinct_versions
  CHECK ("leftVersionId" <> "rightVersionId");

ALTER TABLE blog_content.quality_runs
  ADD CONSTRAINT quality_runs_score_range
  CHECK ("overallScore" IS NULL OR "overallScore" BETWEEN 0 AND 100);

ALTER TABLE blog_content.quality_checks
  ADD CONSTRAINT quality_checks_score_range
  CHECK (score IS NULL OR score BETWEEN 0 AND 100),
  ADD CONSTRAINT quality_checks_threshold_range
  CHECK (threshold IS NULL OR threshold BETWEEN 0 AND 100);

ALTER TABLE blog_content.refresh_jobs
  ADD CONSTRAINT refresh_jobs_single_target
  CHECK (num_nonnulls("pageId", "sourceId") = 1),
  ADD CONSTRAINT refresh_jobs_attempts_nonnegative
  CHECK (attempts >= 0);

ALTER TABLE blog_content.claims
  ADD CONSTRAINT claims_verified_fields_guard
  CHECK (
    status::text <> 'VERIFIED'
    OR ("verifiedAt" IS NOT NULL AND "verifiedBy" IS NOT NULL)
  ),
  ADD CONSTRAINT claims_validity_window
  CHECK ("validUntil" IS NULL OR "validFrom" IS NULL OR "validUntil" >= "validFrom");

CREATE UNIQUE INDEX publications_one_live_version_per_page
  ON blog_content.publications ("pageId")
  WHERE status::text = 'PUBLISHED';

CREATE INDEX page_versions_title_trgm_idx
  ON blog_content.page_versions USING gin (title gin_trgm_ops);

CREATE INDEX page_versions_h1_trgm_idx
  ON blog_content.page_versions USING gin (h1 gin_trgm_ops);

CREATE INDEX page_versions_direct_answer_trgm_idx
  ON blog_content.page_versions USING gin ("directAnswer" gin_trgm_ops);

CREATE INDEX sections_heading_trgm_idx
  ON blog_content.sections USING gin (heading gin_trgm_ops)
  WHERE heading IS NOT NULL;

CREATE INDEX faqs_question_trgm_idx
  ON blog_content.faqs USING gin (question gin_trgm_ops);

CREATE OR REPLACE FUNCTION blog_content.enforce_publication_gate()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  version_page_id uuid;
  page_index_status text;
BEGIN
  SELECT "pageId"
    INTO version_page_id
  FROM blog_content.page_versions
  WHERE id = NEW."versionId";

  IF version_page_id IS NULL OR version_page_id <> NEW."pageId" THEN
    RAISE EXCEPTION 'Publication version does not belong to the selected page';
  END IF;

  IF NEW.status::text = 'PUBLISHED' THEN
    SELECT "indexEligibility"::text
      INTO page_index_status
    FROM blog_content.pages
    WHERE id = NEW."pageId";

    IF page_index_status NOT IN ('ELIGIBLE', 'INDEXED') THEN
      RAISE EXCEPTION 'Page is not eligible for indexable publication';
    END IF;

    IF NEW."indexEligibility"::text NOT IN ('ELIGIBLE', 'INDEXED') THEN
      RAISE EXCEPTION 'Publication is not index eligible';
    END IF;

    IF NOT EXISTS (
      SELECT 1
      FROM blog_content.quality_runs
      WHERE "versionId" = NEW."versionId"
        AND status::text = 'PASSED'
        AND "gatePassed" = true
    ) THEN
      RAISE EXCEPTION 'A passed quality gate is required before publication';
    END IF;

    IF NOT EXISTS (
      SELECT 1
      FROM blog_content.editorial_reviews
      WHERE "versionId" = NEW."versionId"
        AND status::text = 'APPROVED'
    ) THEN
      RAISE EXCEPTION 'Editorial approval is required before publication';
    END IF;

    IF NEW."publishedAt" IS NULL THEN
      NEW."publishedAt" := now();
    END IF;
  END IF;

  IF NEW."sitemapIncluded" = true AND (
    NEW.status::text <> 'PUBLISHED'
    OR NEW."indexEligibility"::text NOT IN ('ELIGIBLE', 'INDEXED')
  ) THEN
    RAISE EXCEPTION 'Only published, index-eligible pages may enter the sitemap';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER publications_enforce_gate
BEFORE INSERT OR UPDATE ON blog_content.publications
FOR EACH ROW
EXECUTE FUNCTION blog_content.enforce_publication_gate();

COMMIT;
