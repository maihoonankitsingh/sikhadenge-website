import { DashboardRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentDashboardUser } from "../../../../lib/auth/session";
import {
  dispatchDueMasterclassFollowUps,
  ensureMasterclassTemplates,
  getMasterclassFlowOverview,
  saveMasterclassFlowConfig,
  submitMasterclassTemplates,
  syncMasterclassTemplates,
} from "../../../../lib/automation/masterclass-registration-flow";
import { dispatchQueuedOutboundBatch } from "../../../../lib/outbound/outbound-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_ROLES = new Set<DashboardRole>([
  DashboardRole.ADMIN,
  DashboardRole.MANAGER,
]);

async function authorizedUser() {
  const user = await getCurrentDashboardUser();
  if (!user) {
    return {
      response: NextResponse.json({ error: "Unauthorized." }, { status: 401 }),
      user: null,
    };
  }
  if (!ALLOWED_ROLES.has(user.role)) {
    return {
      response: NextResponse.json(
        { error: "Insufficient permission." },
        { status: 403 },
      ),
      user: null,
    };
  }
  return { response: null, user };
}

export async function GET() {
  const auth = await authorizedUser();
  if (auth.response) return auth.response;
  return NextResponse.json(await getMasterclassFlowOverview(), {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function PATCH(request: Request) {
  const auth = await authorizedUser();
  if (auth.response || !auth.user) return auth.response;

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    await saveMasterclassFlowConfig({
      enabled: payload.enabled,
      classTime: payload.classTime,
      classDate: payload.classDate,
      classDay: payload.classDay,
      communityLink: payload.communityLink,
      delayMinutes: payload.delayMinutes,
      actorId: auth.user.id,
    });
    return NextResponse.json(await getMasterclassFlowOverview(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Masterclass flow configuration could not be saved.",
      },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  const auth = await authorizedUser();
  if (auth.response || !auth.user) return auth.response;

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const action =
      typeof payload.action === "string"
        ? payload.action.trim().toLowerCase()
        : "";

    let result: unknown;
    if (action === "prepare_templates") {
      result = await ensureMasterclassTemplates(auth.user.id);
    } else if (action === "submit_templates") {
      result = await submitMasterclassTemplates(auth.user.id);
    } else if (action === "sync_templates") {
      result = await syncMasterclassTemplates(auth.user.id);
    } else if (action === "dispatch_due") {
      const reminders = await dispatchDueMasterclassFollowUps({
        actorId: auth.user.id,
        limit: 100,
      });
      const outbound = await dispatchQueuedOutboundBatch(50);
      result = { reminders, outbound };
    } else {
      return NextResponse.json(
        { error: "Unsupported masterclass automation action." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { result, overview: await getMasterclassFlowOverview() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Masterclass automation action failed.",
      },
      { status: 400 },
    );
  }
}
