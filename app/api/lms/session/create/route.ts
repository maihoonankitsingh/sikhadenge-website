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
  const batchId = (body?.batchId || "").trim();
  const title = (body?.title || "").trim() || "Class";
  const startsAt = body?.startsAt ? new Date(body.startsAt) : null;
  const endsAt = body?.endsAt ? new Date(body.endsAt) : null;

  if (!batchId || !startsAt || isNaN(startsAt.getTime())) {
    return new Response(
      JSON.stringify({ ok: false, error: "batchId and valid startsAt required (ISO)" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }
  if (endsAt && isNaN(endsAt.getTime())) {
    return new Response(JSON.stringify({ ok: false, error: "endsAt invalid" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // sessionDate = IST date derived from startsAt
  const sessionDate = new Date(startsAt.getTime() + 5.5 * 60 * 60 * 1000);
  sessionDate.setUTCHours(0, 0, 0, 0);

  try {
    const row = await prisma.classSession.create({
      data: {
        id: crypto.randomUUID(),
        batchId,
        title,
        startTime: startsAt,
        endTime: endsAt || null,
        sessionDate,
      },
      select: {
        id: true,
        batchId: true,
        title: true,
        sessionDate: true,
        startTime: true,
        endTime: true,
        createdAt: true,
      },
    });

    return new Response(JSON.stringify({ ok: true, session: row }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e: any) {
    // If duplicate (batchId, sessionDate, title), return existing instead of 500
    if (e?.code === "P2002") {
      const existing = await prisma.classSession.findFirst({
        where: { batchId, sessionDate, title },
        select: {
          id: true,
          batchId: true,
          title: true,
          sessionDate: true,
          startTime: true,
          endTime: true,
          createdAt: true,
        },
      });
      return new Response(JSON.stringify({ ok: true, session: existing, deduped: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw e;
  }
}
