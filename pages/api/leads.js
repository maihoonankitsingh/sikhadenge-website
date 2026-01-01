import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

function normalizePromoCode(value) {
  if (!value || typeof value !== "string") return null;
  const v = value.trim().toUpperCase();
  return v.length ? v : null;
}

function normalizePhone(value) {
  if (!value || typeof value !== "string") return null;
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 10 ? digits : null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const body = req.body || {};

    const fullNameRaw = body.fullName || body.name || "";
    const fullName = typeof fullNameRaw === "string" ? fullNameRaw.trim() : "";

    const phone = normalizePhone(body.phone);
    const sourceRaw = body.source || "website";
    const source = typeof sourceRaw === "string" ? sourceRaw.trim() : "website";

    const promoCode = normalizePromoCode(body.promoCode);
    const page = typeof body.page === "string" ? body.page.trim() : "counselling-modal";

    if (!fullName) {
      return res.status(400).json({ ok: false, error: "fullName is required" });
    }
    if (!phone) {
      return res.status(400).json({ ok: false, error: "valid phone is required" });
    }

    // promoCode -> influencer mapping
    let influencerId = null;
    if (promoCode) {
      const inf = await prisma.influencer.findFirst({
        where: { promoCode, isActive: true },
        select: { id: true },
      });
      influencerId = (inf && inf.id) || null;
    }

    const lead = await prisma.lead.create({
      data: {
        name: fullName,
        phone,
        source,
        status: "new",
        notes: JSON.stringify({ page }),
        promoCode,
        influencerId,
      },
    });

    return res.status(200).json({ ok: true, lead });
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: e && e.message ? String(e.message) : "Server error",
    });
  }
}

