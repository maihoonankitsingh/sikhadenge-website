import { NextResponse } from "next/server";

import { getCurrentDashboardUser } from "../../../lib/auth/session";
import {
  listInboxConversations,
  type InboxConversationScope,
} from "../../../lib/inbox/conversation-repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const user = await getCurrentDashboardUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const url = new URL(request.url);

  const requestedScope =
    url.searchParams
      .get("scope")
      ?.trim()
      .toUpperCase();

  const scope: InboxConversationScope =
    requestedScope === "RECENT"
      ? "RECENT"
      : requestedScope === "HISTORY"
        ? "HISTORY"
        : "ALL";

  const rawLimit =
    url.searchParams.get("limit");

  let limit: number | null = 50;

  if (
    rawLimit?.trim().toLowerCase() === "all"
  ) {
    limit = null;
  } else if (rawLimit != null) {
    const requestedLimit =
      Number(rawLimit);

    limit =
      Number.isFinite(requestedLimit)
        ? requestedLimit
        : 50;
  }

  const conversations =
    await listInboxConversations(
      limit,
      scope,
    );

  return NextResponse.json(
    {
      conversations,
      scope,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
