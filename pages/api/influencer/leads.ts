import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { requireInfluencer } from "../../../lib/influencerAuth";

function tryGetCourseFromNotes(notes: string | null): string | null {
  if (!notes) return null;
  try {
    const j = JSON.parse(notes);
    const c = j?.course;
    return typeof c === "string" && c.trim() ? c.trim() : null;
  } catch {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const influencer = await requireInfluencer(req, res);
  if (!influencer) return;

  if (req.method !== "GET") return res.status(405).json({ ok: false });

  const take = Math.min(100, Math.max(10, parseInt(String(req.query.take || "30"), 10) || 30));
  const skip = Math.max(0, parseInt(String(req.query.skip || "0"), 10) || 0);

  const where = { influencerId: influencer.id };

  const [itemsRaw, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      select: {
        id: true,
        name: true,
        phone: true,
        status: true,
        createdAt: true,
        notes: true,
        promoCode: true,
        source: true,
      },
    }),
    prisma.lead.count({ where }),
  ]);

  const items = itemsRaw.map((it) => ({
    ...it,
    course: tryGetCourseFromNotes(it.notes),
  }));

  return res.json({
    ok: true,
    influencer: { id: influencer.id, name: influencer.name, promoCode: influencer.promoCode },
    total,
    take,
    skip,
    items,
  });
}
