import { DashboardRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentDashboardUser } from "../../../../lib/auth/session";
import { prisma } from "../../../../lib/db/prisma";
import { verifyMetaProviderReadOnly } from "../../../../lib/integrations/read-only-verifier";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set<DashboardRole>([DashboardRole.ADMIN, DashboardRole.MANAGER]);

export async function POST(request: Request) {
  const user = await getCurrentDashboardUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!ALLOWED.has(user.role)) {
    return NextResponse.json({ error: "Insufficient permission." }, { status: 403 });
  }

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const result = await verifyMetaProviderReadOnly(payload.provider);

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: "INTEGRATION_READ_ONLY_VERIFIED",
        entityType: "IntegrationProvider",
        entityId: result.provider,
        after: {
          verified: result.verified,
          checkedAt: result.checkedAt,
          statusCode: result.statusCode,
          accountReference: result.accountReference,
          externalWriteSent: false,
        },
      },
    });

    return NextResponse.json(result, {
      status: result.verified ? 200 : 424,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Integration verification failed." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }
}
