export const revalidate = 0;
import crypto from "crypto";
import { rateLimit } from "@/lib/rateLimit";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function requireAdmin(req: Request) {
  const key = req.headers.get("x-admin-key") || "";
  const expect = (process.env.LMS_ADMIN_KEY || "").trim();
  if (!expect || key !== expect) {
    return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }
  return null;
}

export async function POST(req: Request) {
  const rl = rateLimit(req, { limit: 30, windowMs: 60_000 });
  if (rl) return rl;

  const auth = requireAdmin(req);
  if (auth) return auth;

  const body = (await req.json().catch(() => null)) as any;

  const sessionId = (body?.sessionId || "").trim();
  const enrollmentId = (body?.enrollmentId || "").trim();
  const studentId = (body?.studentId || "").trim(); // optional
  const status = (body?.status || "").trim().toLowerCase(); // present/absent

  if (!sessionId || !enrollmentId || !["present", "absent"].includes(status)) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "sessionId, enrollmentId required; status=present|absent",
      }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const row = await prisma.attendance.upsert({
    where: {
      sessionId_enrollmentId: { sessionId, enrollmentId },
    },
    update: {
      status,
      markedAt: new Date(),
    },
    create: {
      id: crypto.randomUUID(),
      sessionId,
      enrollmentId,
      status,
      markedAt: new Date(),
    },
    select: {
      id: true,
      sessionId: true,
      enrollmentId: true,
      status: true,
      markedAt: true,
    },
  });

  return new Response(JSON.stringify({ ok: true, attendance: row }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
