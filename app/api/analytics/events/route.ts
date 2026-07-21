import {
  createDefaultAnalyticsCollectionDependencies,
  handleAnalyticsEventRequest,
} from "../../../../lib/sikhadenge-analytics/server-collection";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(
  request: Request,
): Promise<Response> {
  return handleAnalyticsEventRequest(
    request,
    createDefaultAnalyticsCollectionDependencies(),
  );
}

export async function GET():
Promise<Response> {
  return new Response(
    "Method Not Allowed",
    {
      status: 405,
      headers: {
        "cache-control": "no-store",
        allow: "POST, OPTIONS",
      },
    },
  );
}

export async function OPTIONS():
Promise<Response> {
  return new Response(
    null,
    {
      status: 204,
      headers: {
        "cache-control": "no-store",
        allow: "POST, OPTIONS",
      },
    },
  );
}
