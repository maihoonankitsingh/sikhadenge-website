export const BLOG_PLATFORM_SCHEMA_VERSION = 1 as const;

export const BLOG_WORKFLOW_STATES = [
  "DISCOVERED",
  "RESEARCHING",
  "EVIDENCE_READY",
  "WRITING",
  "QUALITY_REVIEW",
  "EDITORIAL_REVIEW",
  "READY",
  "PUBLISHED",
  "STALE",
  "RETIRED",
] as const;

export type BlogWorkflowState = (typeof BLOG_WORKFLOW_STATES)[number];

export const BLOG_PUBLICATION_STATES = [
  "DRAFT",
  "PUBLISHED_NOINDEX",
  "PUBLISHED_INDEXABLE",
  "UNPUBLISHED",
  "ARCHIVED",
] as const;

export type BlogPublicationState =
  (typeof BLOG_PUBLICATION_STATES)[number];

export const BLOG_QUALITY_CHECK_CODES = [
  "PRIMARY_INTENT_UNIQUE",
  "CANONICAL_UNIQUE",
  "TITLE_EXACT_DUPLICATE",
  "TITLE_NEAR_DUPLICATE",
  "ANSWER_EXACT_DUPLICATE",
  "BODY_EXACT_DUPLICATE",
  "BODY_NEAR_DUPLICATE",
  "FAQ_REPETITION",
  "TEMPLATE_RATIO",
  "MINIMUM_SUBSTANTIVE_CONTENT",
  "CLAIM_EVIDENCE_COVERAGE",
  "PRIMARY_SOURCE_COVERAGE",
  "SOURCE_FRESHNESS",
  "CONFLICTING_EVIDENCE",
  "UNSUPPORTED_CLAIMS",
  "INTENT_SATISFACTION",
  "INTERNAL_LINK_RELEVANCE",
  "SCHEMA_VISIBLE_CONTENT_MATCH",
  "BROKEN_LINKS",
  "UNSAFE_OR_UNSUPPORTED_PROMISES",
  "ACCESSIBILITY",
] as const;

export type BlogQualityCheckCode =
  (typeof BLOG_QUALITY_CHECK_CODES)[number];

/**
 * Versioned default policy for the first platform release.
 *
 * These values are publication gates, not ranking promises. They must be
 * calibrated against the imported Blog corpus before production activation.
 */
export const BLOG_DEFAULT_QUALITY_POLICY = {
  version: "2026-07-foundation-v1",
  minimumSubstantiveWordCount: 800,
  minimumVerifiedClaims: 3,
  minimumPrimarySources: 1,
  minimumEvidenceCoverageRatio: 0.9,
  maximumUnsupportedClaims: 0,
  maximumBrokenLinks: 0,
  maximumNormalisedTitleSimilarity: 0.92,
  maximumNormalisedAnswerSimilarity: 0.86,
  maximumNormalisedBodySimilarity: 0.82,
  maximumFaqSimilarity: 0.88,
  maximumRepeatedTemplateRatio: 0.45,
  requireUniquePrimaryIntent: true,
  requireSelfCanonical: true,
  requireMaterialLastModifiedChange: true,
  requireEditorialApprovalForIndexing: true,
  allowGeneratedTextAsEvidence: false,
  autoPublish: false,
  autoIndex: false,
} as const;

export type BlogQualityPolicy = typeof BLOG_DEFAULT_QUALITY_POLICY;

export function isIndexEligibleState(
  state: BlogPublicationState,
): boolean {
  return state === "PUBLISHED_INDEXABLE";
}
