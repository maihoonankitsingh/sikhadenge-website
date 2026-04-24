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

function isUuid(v: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
}

export async function POST(req: Request) {
  const rl = rateLimit(req, { limit: 30, windowMs: 60_000 });
  if (rl) return rl;

  const auth = requireAdmin(req);
  if (auth) return auth;

  const body = (await req.json().catch(() => null)) as any;
  const admissionId = (body?.admissionId || "").trim();
  const batchId = (body?.batchId || "").trim();

  if (!admissionId || !batchId) {
    return new Response(JSON.stringify({ ok: false, error: "admissionId and batchId required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // Prevent FK spam: validate format early
  if (!isUuid(admissionId)) {
    return new Response(JSON.stringify({ ok: false, error: "admissionId must be a UUID" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // Ensure parent rows exist before upsert (avoid P2003)
  const [admission, batch] = await Promise.all([
    prisma.admission.findUnique({ where: { id: admissionId }, select: { id: true } }),
    prisma.batch.findUnique({ where: { id: batchId }, select: { id: true } }),
  ]);

  if (!admission) {
    return new Response(JSON.stringify({ ok: false, error: "Admission not found", admissionId }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }
  if (!batch) {
    return new Response(JSON.stringify({ ok: false, error: "Batch not found", batchId }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const row = await prisma.enrollment.upsert({
      where: { admissionId_batchId: { admissionId, batchId } },
      update: { status: "active" },
      create: {
        id: crypto.randomUUID(),
        admissionId,
        batchId,
        status: "active",
        enrolledAt: new Date(),
        createdAt: new Date(),
      },
      select: { id: true, admissionId: true, batchId: true, status: true, enrolledAt: true, createdAt: true },
    });

    return new Response(JSON.stringify({ ok: true, enrollment: row }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e: any) {
    // If something still slips through, return clean error (no PM2 spam)
    const msg = String(e?.message || "");
    if (e?.code === "P2003" || msg.includes("Foreign key constraint")) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid admissionId or batchId" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    throw e;
  }
}
