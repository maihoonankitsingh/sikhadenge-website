export const dynamic = "force-dynamic";
export const revalidate = 0;
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  DASHBOARD_AUTH_COOKIE,
  isDashboardAuthValueValid,
} from "@/lib/dashboard-auth";

const prisma = new PrismaClient();

function bad(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

function isAuthed(req: NextRequest) {
  const value = req.cookies.get(DASHBOARD_AUTH_COOKIE)?.value || "";
  return isDashboardAuthValueValid(value);
}

function modelAccessor(model: string) {
  return model.charAt(0).toLowerCase() + model.slice(1);
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthed(req)) return bad(401, "unauthorized");

    const endpoint = process.env.ADMIN_PUSH_URL || "";
    if (!endpoint) return bad(400, "ADMIN_PUSH_URL_missing");

    const body: any = await req.json().catch(() => ({}));
    const model = String(body?.model || "");
    const where = body?.where && typeof body.where === "object" ? body.where : {};
    const take = Math.max(1, Math.min(Number(body?.take || 200), 2000));

    const allowed = new Set([
      "MasterclassLead",
      "Lead",
      "Admission",
      "Payment",
      "PhoneOtp",
      "Blog",
      "Influencer",
      "InfluencerSession",
      "Enrollment",
      "ClassSession",
      "Attendance",
      "Batch",
    ]);
    if (!allowed.has(model)) return bad(400, "model_not_allowed");

    const accessor = modelAccessor(model);

    // @ts-ignore - dynamic prisma access constrained by the allowlist above.
    let rows = await prisma[accessor].findMany({
      where,
      take,
      orderBy: { createdAt: "desc" },
    }).catch(async () => {
      // @ts-ignore - fallback for models without createdAt.
      return prisma[accessor].findMany({ where, take });
    });

    if (!Array.isArray(rows)) rows = [];

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: "sikhadenge_admin_dashboard",
        model,
        where,
        count: rows.length,
        rows,
        pushedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    const text = await res.text().catch(() => "");
    if (!res.ok) return bad(502, `webhook_not_ok:${res.status}:${text.slice(0, 200)}`);

    return NextResponse.json({ ok: true, pushed: rows.length }, { status: 200 });
  } catch (e: any) {
    console.error("admin push error:", e?.message || e);
    return NextResponse.json(
      { ok: false, error: "server_error", detail: String(e?.message || e), where: "api/admin/push" },
      { status: 500 },
    );
  }
}
