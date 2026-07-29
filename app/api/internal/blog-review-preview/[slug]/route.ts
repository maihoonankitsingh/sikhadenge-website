import { NextResponse, type NextRequest } from "next/server";

import {
  BLOG_REVIEW_PREVIEW_HEADER,
  getControlledImportedBlogReviewPreview,
} from "@/modules/blog/preview";
import { BlogRepositoryInvariantError } from "@/modules/blog/repositories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const PRIVATE_NO_STORE =
  "private, no-store, no-cache, max-age=0, must-revalidate";
const ROBOTS_BLOCK =
  "noindex, nofollow, noarchive, nosnippet, noimageindex";

function controlledPreviewHeaders(): HeadersInit {
  return {
    "Cache-Control": PRIVATE_NO_STORE,
    Pragma: "no-cache",
    Expires: "0",
    "CDN-Cache-Control": "no-store",
    "Cloudflare-CDN-Cache-Control": "no-store",
    "Surrogate-Control": "no-store",
    "X-Robots-Tag": ROBOTS_BLOCK,
    "Referrer-Policy": "no-referrer",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
    Vary: BLOG_REVIEW_PREVIEW_HEADER,
  };
}

function jsonResponse(
  body: Readonly<Record<string, unknown>>,
  status: number,
): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: controlledPreviewHeaders(),
  });
}

function invariantResponse(error: BlogRepositoryInvariantError): NextResponse {
  switch (error.code) {
    case "BLOG_REVIEW_PREVIEW_TOKEN_MISSING":
    case "BLOG_REVIEW_PREVIEW_TOKEN_WEAK":
      return jsonResponse(
        { ok: false, error: "PREVIEW_UNAVAILABLE" },
        503,
      );
    case "BLOG_REVIEW_PREVIEW_UNAUTHORIZED":
      return jsonResponse({ ok: false, error: "NOT_FOUND" }, 404);
    case "IMPORTED_PAGE_SLUG_INVALID":
      return jsonResponse({ ok: false, error: "INVALID_SLUG" }, 400);
    default:
      return jsonResponse(
        { ok: false, error: "PREVIEW_UNAVAILABLE" },
        503,
      );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
): Promise<NextResponse> {
  try {
    const preview = await getControlledImportedBlogReviewPreview({
      slug: params.slug,
      presentedToken: request.headers.get(BLOG_REVIEW_PREVIEW_HEADER),
    });

    if (preview === null) {
      return jsonResponse({ ok: false, error: "NOT_FOUND" }, 404);
    }

    return jsonResponse(
      {
        ok: true,
        mode: preview.mode,
        record: preview.record,
        metadata: preview.metadata,
        access: preview.access,
        routeSafety: {
          reviewOnly: true,
          routeMounted: true,
          routeEligible: false,
          publicationApproved: false,
          indexEligibilityApproved: false,
          databaseWriteAllowed: false,
          liveBlogRouteModified: false,
        },
      },
      200,
    );
  } catch (error) {
    if (error instanceof BlogRepositoryInvariantError) {
      return invariantResponse(error);
    }

    return jsonResponse(
      { ok: false, error: "PREVIEW_UNAVAILABLE" },
      503,
    );
  }
}
