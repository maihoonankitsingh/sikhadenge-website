import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { requireInfluencer } from "../../../lib/influencerAuth";

function tryGetCourseFromNotes(notes: string | null): string | null {
  if (!notes) return null;
  try {
    const parsed: unknown = JSON.parse(notes);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const course = (parsed as Record<string, unknown>).course;
    return typeof course === "string" && course.trim() ? course.trim() : null;
  } catch {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const influencer = await requireInfluencer(req, res);
  if (!influencer) return;

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false });
  }

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

  const items = itemsRaw.map((item) => ({
    ...item,
    course: tryGetCourseFromNotes(item.notes),
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
