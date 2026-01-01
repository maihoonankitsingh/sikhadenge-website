import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  if (req.method !== "GET") return res.status(405).json({ ok: false });

  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
  const status = typeof req.query.status === "string" ? req.query.status.trim() : "";
  const take = Math.min(100, Math.max(10, parseInt(String(req.query.take || "30"), 10) || 30));
  const skip = Math.max(0, parseInt(String(req.query.skip || "0"), 10) || 0);

  const where: any = {};
  if (status) where.status = status;

  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
      { promoCode: { contains: q, mode: "insensitive" } },
      { influencer: { name: { contains: q, mode: "insensitive" } } },
      { influencer: { promoCode: { contains: q, mode: "insensitive" } } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      select: {
        id: true,
        name: true,
        phone: true,
        source: true,
        status: true,
        promoCode: true,
        createdAt: true,
        influencerId: true,
        influencer: { select: { id: true, name: true, promoCode: true, isActive: true } },
        notes: true,
      },
    }),
    prisma.lead.count({ where }),
  ]);

  return res.json({ ok: true, total, take, skip, items });
}
