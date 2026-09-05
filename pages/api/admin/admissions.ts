import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth";

function parseBoundedInt(value: unknown, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function parseOptionalNonNegativeInt(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 0) return null;
  return parsed;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = requireAdmin(req, res);
  if (!session) return;

  try {
    if (req.method === "GET") {
      const take = parseBoundedInt(req.query.take, 25, 1, 200);
      const skip = parseBoundedInt(req.query.skip, 0, 0, Number.MAX_SAFE_INTEGER);

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

      const safeName = typeof name === "string" ? name.trim() : "";
      const safePhone = typeof phone === "string" ? phone.trim() : "";
      if (!safeName || !safePhone) {
        return res.status(400).json({ ok: false, error: "name and phone required" });
      }

      const parsedFeeTotal = parseOptionalNonNegativeInt(feeTotal);
      const parsedFeePaid =
        feePaid === undefined || feePaid === null || feePaid === ""
          ? 0
          : parseOptionalNonNegativeInt(feePaid);

      if (feeTotal !== undefined && feeTotal !== null && feeTotal !== "" && parsedFeeTotal === null) {
        return res.status(400).json({ ok: false, error: "feeTotal must be a non-negative integer" });
      }
      if (parsedFeePaid === null) {
        return res.status(400).json({ ok: false, error: "feePaid must be a non-negative integer" });
      }

      const created = await prisma.admission.create({
        data: {
          leadId: typeof leadId === "string" && leadId.trim() ? leadId.trim() : null,
          name: safeName,
          phone: safePhone,
          course: typeof course === "string" && course.trim() ? course.trim() : null,
          feeTotal: parsedFeeTotal,
          feePaid: parsedFeePaid,
        },
      });

      return res.json({ ok: true, item: created });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (error: unknown) {
    console.error("Admin admissions API failed:", error);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}
