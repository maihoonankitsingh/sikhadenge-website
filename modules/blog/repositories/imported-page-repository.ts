import "server-only";

import { blogContentDb } from "@/modules/blog/database/client";
import {
  BlogRepositoryInvariantError,
  CANONICAL_BLOG_WORKSPACE_ID,
} from "@/modules/blog/repositories/workspace-repository";

const BLOG_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type ImportedBlogReviewRecord = Readonly<{
  page: Readonly<{
    id: string;
    slug: string;
    canonicalPath: string;
    title: string;
    sourceRecordKey: string;
    locale: string;
    lifecycleStatus: "DISCOVERED";
    indexEligibility: "BLOCKED";
  }>;
  version: Readonly<{
    id: string;
    pageId: string;
    versionNumber: number;
    status: "WRITING";
    origin: "MIGRATED";
    title: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    directAnswer: string;
    introduction: string | null;
    conclusion: string | null;
    authorName: string;
    language: string;
    wordCount: number;
    readingMinutes: number;
    exactHash: string;
    normalizedHash: string;
  }>;
  fingerprint: Readonly<{
    id: string;
    versionId: string;
    scope: "legacy-source-record";
    scopeKey: string | null;
    exactHash: string;
    normalizedHash: string;
    tokenCount: number;
    shingles: number;
  }>;
  safety: Readonly<{
    requiresResearch: true;
    requiresQualityGate: true;
    requiresEditorialApproval: true;
    publicationBlocked: true;
    publicationApproved: false;
    indexEligibilityApproved: false;
    routeEligible: false;
  }>;
}>;

function invariant(
  condition: unknown,
  code: string,
  message: string,
): asserts condition {
  if (!condition) {
    throw new BlogRepositoryInvariantError(code, message);
  }
}

function normalizeReviewSlug(input: string): string {
  invariant(
    typeof input === "string",
    "IMPORTED_PAGE_SLUG_TYPE_INVALID",
    "Imported Blog review slug must be a string.",
  );

  const slug = input.trim().toLowerCase();

  invariant(
    slug.length >= 1 && slug.length <= 240 && BLOG_SLUG_PATTERN.test(slug),
    "IMPORTED_PAGE_SLUG_INVALID",
    "Imported Blog review slug is malformed.",
  );

  return slug;
}

function readRequiredSafetyFlag(
  metadata: unknown,
  key: string,
  code: string,
): true {
  invariant(
    typeof metadata === "object" && metadata !== null && !Array.isArray(metadata),
    "IMPORTED_PAGE_METADATA_INVALID",
    "Imported Blog page metadata must be a JSON object.",
  );

  const value = (metadata as Record<string, unknown>)[key];
  invariant(
    value === true,
    code,
    `Imported Blog page safety flag ${key} must remain true.`,
  );

  return true;
}

export async function getImportedBlogRecordBySlugForReview(
  input: string,
): Promise<ImportedBlogReviewRecord | null> {
  const slug = normalizeReviewSlug(input);

  const page = await blogContentDb.blogContentPage.findUnique({
    where: {
      workspaceId_slug: {
        workspaceId: CANONICAL_BLOG_WORKSPACE_ID,
        slug,
      },
    },
    select: {
      id: true,
      workspaceId: true,
      slug: true,
      canonicalPath: true,
      title: true,
      sourceRecordKey: true,
      locale: true,
      lifecycleStatus: true,
      indexEligibility: true,
      publishedVersionId: true,
      firstPublishedAt: true,
      lastPublishedAt: true,
      metadata: true,
      _count: {
        select: {
          publications: true,
        },
      },
      versions: {
        orderBy: {
          versionNumber: "desc",
        },
        take: 2,
        select: {
          id: true,
          pageId: true,
          versionNumber: true,
          status: true,
          origin: true,
          title: true,
          metaTitle: true,
          metaDescription: true,
          h1: true,
          directAnswer: true,
          introduction: true,
          conclusion: true,
          authorName: true,
          language: true,
          wordCount: true,
          readingMinutes: true,
          sourceCoverage: true,
          originalityScore: true,
          qualityScore: true,
          exactHash: true,
          normalizedHash: true,
          _count: {
            select: {
              qualityRuns: true,
              reviews: true,
              publications: true,
            },
          },
          fingerprints: {
            where: {
              scope: "legacy-source-record",
            },
            orderBy: {
              createdAt: "asc",
            },
            take: 2,
            select: {
              id: true,
              versionId: true,
              scope: true,
              scopeKey: true,
              exactHash: true,
              normalizedHash: true,
              tokenCount: true,
              shingles: true,
            },
          },
        },
      },
    },
  });

  if (page === null) {
    return null;
  }

  invariant(
    page.workspaceId === CANONICAL_BLOG_WORKSPACE_ID,
    "IMPORTED_PAGE_WORKSPACE_MISMATCH",
    "Imported Blog page belongs to an unexpected workspace.",
  );
  invariant(
    page.slug === slug,
    "IMPORTED_PAGE_SLUG_MISMATCH",
    "Imported Blog page slug does not match the requested slug.",
  );
  invariant(
    page.sourceRecordKey !== null && page.sourceRecordKey.length > 0,
    "IMPORTED_PAGE_SOURCE_KEY_MISSING",
    "Imported Blog page source record key is missing.",
  );
  invariant(
    page.lifecycleStatus === "DISCOVERED",
    "IMPORTED_PAGE_LIFECYCLE_UNSAFE",
    "Imported Blog review page must remain DISCOVERED.",
  );
  invariant(
    page.indexEligibility === "BLOCKED",
    "IMPORTED_PAGE_INDEX_UNSAFE",
    "Imported Blog review page must remain BLOCKED from indexing.",
  );
  invariant(
    page.publishedVersionId === null &&
      page.firstPublishedAt === null &&
      page.lastPublishedAt === null &&
      page._count.publications === 0,
    "IMPORTED_PAGE_PUBLICATION_PRESENT",
    "Imported Blog review page must not have publication state.",
  );
  invariant(
    page.versions.length === 1,
    "IMPORTED_PAGE_VERSION_COUNT_MISMATCH",
    `Expected exactly one imported version for ${slug}, found ${page.versions.length}.`,
  );

  const version = page.versions[0];
  invariant(
    version.pageId === page.id && version.versionNumber === 1,
    "IMPORTED_PAGE_VERSION_IDENTITY_MISMATCH",
    "Imported Blog version identity is invalid.",
  );
  invariant(
    version.status === "WRITING" && version.origin === "MIGRATED",
    "IMPORTED_PAGE_VERSION_STATE_UNSAFE",
    "Imported Blog review version must remain WRITING and MIGRATED.",
  );
  invariant(
    version.sourceCoverage === 0 &&
      version.originalityScore === 0 &&
      version.qualityScore === 0,
    "IMPORTED_PAGE_VERSION_SCORE_UNSAFE",
    "Imported Blog review version quality scores must remain zero.",
  );
  invariant(
    version._count.qualityRuns === 0 &&
      version._count.reviews === 0 &&
      version._count.publications === 0,
    "IMPORTED_PAGE_VERSION_GATES_PRESENT",
    "Imported Blog review version must not have quality, editorial, or publication records.",
  );
  invariant(
    version.fingerprints.length === 1,
    "IMPORTED_PAGE_FINGERPRINT_COUNT_MISMATCH",
    `Expected exactly one imported fingerprint for ${slug}, found ${version.fingerprints.length}.`,
  );

  const fingerprint = version.fingerprints[0];
  invariant(
    fingerprint.versionId === version.id &&
      fingerprint.scope === "legacy-source-record" &&
      fingerprint.exactHash === version.exactHash &&
      fingerprint.normalizedHash === version.normalizedHash,
    "IMPORTED_PAGE_FINGERPRINT_MISMATCH",
    "Imported Blog fingerprint does not match its version.",
  );

  const requiresResearch = readRequiredSafetyFlag(
    page.metadata,
    "requiresResearch",
    "IMPORTED_PAGE_RESEARCH_GATE_DISABLED",
  );
  const requiresQualityGate = readRequiredSafetyFlag(
    page.metadata,
    "requiresQualityGate",
    "IMPORTED_PAGE_QUALITY_GATE_DISABLED",
  );
  const requiresEditorialApproval = readRequiredSafetyFlag(
    page.metadata,
    "requiresEditorialApproval",
    "IMPORTED_PAGE_EDITORIAL_GATE_DISABLED",
  );
  const publicationBlocked = readRequiredSafetyFlag(
    page.metadata,
    "publicationBlocked",
    "IMPORTED_PAGE_PUBLICATION_BLOCK_DISABLED",
  );

  return {
    page: {
      id: page.id,
      slug: page.slug,
      canonicalPath: page.canonicalPath,
      title: page.title,
      sourceRecordKey: page.sourceRecordKey,
      locale: page.locale,
      lifecycleStatus: "DISCOVERED",
      indexEligibility: "BLOCKED",
    },
    version: {
      id: version.id,
      pageId: version.pageId,
      versionNumber: version.versionNumber,
      status: "WRITING",
      origin: "MIGRATED",
      title: version.title,
      metaTitle: version.metaTitle,
      metaDescription: version.metaDescription,
      h1: version.h1,
      directAnswer: version.directAnswer,
      introduction: version.introduction,
      conclusion: version.conclusion,
      authorName: version.authorName,
      language: version.language,
      wordCount: version.wordCount,
      readingMinutes: version.readingMinutes,
      exactHash: version.exactHash,
      normalizedHash: version.normalizedHash,
    },
    fingerprint: {
      id: fingerprint.id,
      versionId: fingerprint.versionId,
      scope: "legacy-source-record",
      scopeKey: fingerprint.scopeKey,
      exactHash: fingerprint.exactHash,
      normalizedHash: fingerprint.normalizedHash,
      tokenCount: fingerprint.tokenCount,
      shingles: fingerprint.shingles,
    },
    safety: {
      requiresResearch,
      requiresQualityGate,
      requiresEditorialApproval,
      publicationBlocked,
      publicationApproved: false,
      indexEligibilityApproved: false,
      routeEligible: false,
    },
  };
}
