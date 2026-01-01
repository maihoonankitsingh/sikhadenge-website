import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

// NOTE: yahi auth import use karo jo tum already influencers/leads API me use kar rahe ho.
// Agar tumhare project me `requireAdmin` ka naam different hai, same pattern wala function use kar lena.
import { requireAdmin } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = requireAdmin(req, res);
  if (!session) return;

  try {
    if (req.method === "GET") {
      const take = Math.min(parseInt((req.query.take as string) || "25", 10), 200);
      const skip = Math.max(parseInt((req.query.skip as string) || "0", 10), 0);

      const [items, total] = await Promise.all([
        prisma.admission.findMany({
          orderBy: { createdAt: "desc" },
          take,
          skip,
        }),
        prisma.admission.count(),
      ]);

      return res.json({ ok: true, total, take, skip, items });
    }

    if (req.method === "POST") {
      const { leadId, name, phone, course, feeTotal, feePaid } = req.body || {};

      if (!name || !phone) {
        return res.status(400).json({ ok: false, error: "name and phone required" });
      }

      const created = await prisma.admission.create({
        data: {
          leadId: leadId || null,
          name: String(name),
          phone: String(phone),
          course: course ? String(course) : null,
          feeTotal: feeTotal === undefined || feeTotal === null ? null : Number(feeTotal),
          feePaid: feePaid === undefined || feePaid === null ? 0 : Number(feePaid),
        },
      });

      return res.json({ ok: true, item: created });
    }

    res.setHeader("Allow", "GET,POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || "Server error" });
  }
}

