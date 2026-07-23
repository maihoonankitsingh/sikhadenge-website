import { DashboardRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentDashboardUser } from "../../../lib/auth/session";
import { listPendingLearningSuggestions } from "../../../lib/learning/learning-repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REVIEW_ROLES = new Set<DashboardRole>([
  DashboardRole.ADMIN,
  DashboardRole.MANAGER,
]);

export async function GET(request: Request) {
  const user = await getCurrentDashboardUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!REVIEW_ROLES.has(user.role)) {
    return NextResponse.json({ error: "Insufficient permission." }, { status: 403 });
  }

  const url = new URL(request.url);
  const requestedLimit = Number(url.searchParams.get("limit") ?? "50");
  const limit = Number.isFinite(requestedLimit) ? requestedLimit : 50;
  const suggestions = await listPendingLearningSuggestions(limit);

  return NextResponse.json(
    { suggestions },
    { headers: { "Cache-Control": "no-store" } },
  );
}
