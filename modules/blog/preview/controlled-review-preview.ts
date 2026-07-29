import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";

import {
  getImportedBlogRecordBySlugForReview,
  type ImportedBlogReviewRecord,
} from "@/modules/blog/repositories/imported-page-repository";
import { BlogRepositoryInvariantError } from "@/modules/blog/repositories/workspace-repository";

export const BLOG_REVIEW_PREVIEW_TOKEN_ENV =
  "BLOG_REVIEW_PREVIEW_TOKEN" as const;
export const BLOG_REVIEW_PREVIEW_HEADER =
  "x-sikhadenge-blog-review-token" as const;

const MINIMUM_PREVIEW_TOKEN_BYTES = 32;
const MAXIMUM_PREVIEW_TOKEN_BYTES = 512;

const CONTROLLED_PREVIEW_RESPONSE = Object.freeze({
  cacheControl: "private, no-store, no-cache, max-age=0, must-revalidate" as const,
  robots: "noindex, nofollow, noarchive, nosnippet, noimageindex" as const,
  referrerPolicy: "no-referrer" as const,
  frameOptions: "DENY" as const,
});

const CONTROLLED_PREVIEW_METADATA = Object.freeze({
  index: false as const,
  follow: false as const,
  archive: false as const,
  snippet: false as const,
  imageIndex: false as const,
  canonicalUrl: null,
});

export type ControlledImportedBlogReviewPreview = Readonly<{
  mode: "CONTROLLED_REVIEW_PREVIEW";
  record: ImportedBlogReviewRecord;
  response: typeof CONTROLLED_PREVIEW_RESPONSE;
  metadata: typeof CONTROLLED_PREVIEW_METADATA;
  access: Readonly<{
    tokenHeader: typeof BLOG_REVIEW_PREVIEW_HEADER;
    authenticated: true;
    tokenStored: false;
    tokenReturned: false;
  }>;
  safety: Readonly<{
    reviewOnly: true;
    routeMounted: false;
    routeEligible: false;
    publicationApproved: false;
    indexEligibilityApproved: false;
    databaseWriteAllowed: false;
  }>;
}>;

export type ControlledBlogReviewPreviewRequest = Readonly<{
  slug: string;
  presentedToken?: string | null;
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

function digestToken(value: string): Buffer {
  return createHash("sha256").update(value, "utf8").digest();
}

function assertControlledPreviewAccess(
  presentedToken: string | null | undefined,
): void {
  const configuredToken = process.env[BLOG_REVIEW_PREVIEW_TOKEN_ENV];

  invariant(
    typeof configuredToken === "string" && configuredToken.length > 0,
    "BLOG_REVIEW_PREVIEW_TOKEN_MISSING",
    "Controlled Blog review preview is disabled because its token is not configured.",
  );

  const configuredBytes = Buffer.byteLength(configuredToken, "utf8");
  invariant(
    configuredBytes >= MINIMUM_PREVIEW_TOKEN_BYTES &&
      configuredBytes <= MAXIMUM_PREVIEW_TOKEN_BYTES,
    "BLOG_REVIEW_PREVIEW_TOKEN_WEAK",
    "Controlled Blog review preview token does not meet the required length contract.",
  );

  invariant(
    typeof presentedToken === "string" && presentedToken.length > 0,
    "BLOG_REVIEW_PREVIEW_UNAUTHORIZED",
    "Controlled Blog review preview access was denied.",
  );

  const presentedBytes = Buffer.byteLength(presentedToken, "utf8");
  invariant(
    presentedBytes <= MAXIMUM_PREVIEW_TOKEN_BYTES,
    "BLOG_REVIEW_PREVIEW_UNAUTHORIZED",
    "Controlled Blog review preview access was denied.",
  );

  const authenticated = timingSafeEqual(
    digestToken(configuredToken),
    digestToken(presentedToken),
  );

  invariant(
    authenticated,
    "BLOG_REVIEW_PREVIEW_UNAUTHORIZED",
    "Controlled Blog review preview access was denied.",
  );
}

export async function getControlledImportedBlogReviewPreview(
  request: ControlledBlogReviewPreviewRequest,
): Promise<ControlledImportedBlogReviewPreview | null> {
  assertControlledPreviewAccess(request.presentedToken);

  const record = await getImportedBlogRecordBySlugForReview(request.slug);
  if (record === null) {
    return null;
  }

  invariant(
    record.page.lifecycleStatus === "DISCOVERED" &&
      record.version.status === "WRITING" &&
      record.page.indexEligibility === "BLOCKED" &&
      record.safety.publicationApproved === false &&
      record.safety.indexEligibilityApproved === false &&
      record.safety.routeEligible === false,
    "BLOG_REVIEW_PREVIEW_RECORD_UNSAFE",
    "Controlled Blog review preview record does not satisfy the review-only safety contract.",
  );

  return {
    mode: "CONTROLLED_REVIEW_PREVIEW",
    record,
    response: CONTROLLED_PREVIEW_RESPONSE,
    metadata: CONTROLLED_PREVIEW_METADATA,
    access: {
      tokenHeader: BLOG_REVIEW_PREVIEW_HEADER,
      authenticated: true,
      tokenStored: false,
      tokenReturned: false,
    },
    safety: {
      reviewOnly: true,
      routeMounted: false,
      routeEligible: false,
      publicationApproved: false,
      indexEligibilityApproved: false,
      databaseWriteAllowed: false,
    },
  };
}
