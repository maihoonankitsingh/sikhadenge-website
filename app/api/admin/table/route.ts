export const revalidate = 0;
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";


type ModelKey =
  | "Lead"
  | "Admission"
  | "Payment"
  | "MasterclassLead"
  | "PhoneOtp"
  | "Blog"
  | "Influencer"
  | "InfluencerSession"
  | "Attendance"
  | "Batch"
  | "Enrollment"
  | "ClassSession";

const ALLOWED: Record<ModelKey, true> = {
  Lead: true,
  Admission: true,
  Payment: true,
  MasterclassLead: true,
  PhoneOtp: true,
  Blog: true,
  Influencer: true,
  InfluencerSession: true,
  Attendance: true,
  Batch: true,
  Enrollment: true,
  ClassSession: true,
};

// For filtering/sorting; keeps queries safe and predictable.
const MODEL_META: Record<ModelKey, { dateField?: string; defaultOrder?: any; searchFields?: string[] }> = {
  Lead: { dateField: "createdAt", defaultOrder: { createdAt: "desc" }, searchFields: ["name", "phone", "source", "status", "utmSource", "utmCampaign"] },
  Admission: { dateField: "createdAt", defaultOrder: { createdAt: "desc" }, searchFields: ["name", "phone", "course"] },
  Payment: { dateField: "createdAt", defaultOrder: { createdAt: "desc" }, searchFields: ["razorpayPaymentId", "razorpayOrderId", "status", "currency"] },
  MasterclassLead: { dateField: "createdAt", defaultOrder: { createdAt: "desc" }, searchFields: ["name", "phone", "email", "source", "page", "utm_source", "utm_campaign", "fbclid", "gclid"] },
  PhoneOtp: { dateField: "createdAt", defaultOrder: { createdAt: "desc" }, searchFields: ["phone"] },
  Blog: { dateField: "publishedAt", defaultOrder: { publishedAt: "desc" }, searchFields: ["slug", "title", "category"] },
  Influencer: { dateField: "createdAt", defaultOrder: { createdAt: "desc" }, searchFields: ["name", "email", "promoCode"] },
  InfluencerSession: { dateField: "createdAt", defaultOrder: { createdAt: "desc" }, searchFields: ["influencerId"] },
  Attendance: { dateField: "markedAt", defaultOrder: { markedAt: "desc" }, searchFields: ["status"] },
  Batch: { defaultOrder: { id: "desc" }, searchFields: ["code"] },
  Enrollment: { dateField: "createdAt", defaultOrder: { createdAt: "desc" }, searchFields: ["status"] },
  ClassSession: { dateField: "sessionDate", defaultOrder: { sessionDate: "desc" }, searchFields: ["title"] },
};

function requireToken(req: Request) {
  const required = (process.env.ADMIN_TOKEN || "").trim();
  if (!required) return null;
  const u = new URL(req.url);
  const got = (u.searchParams.get("token") || "").trim();
  if (!got || got !== required) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  return null;
}

function parseIntSafe(v: string | null, def: number) {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : def;
}

function parseDateRangeIST(from?: string | null, to?: string | null) {
  const f = (from || "").trim();
  const t = (to || "").trim();
  if (!f && !t) return null;

  const start = f ? new Date(`${f}T00:00:00.000+05:30`) : null;
  const end = t ? new Date(`${t}T23:59:59.999+05:30`) : null;

  if (start && isNaN(start.getTime())) return null;
  if (end && isNaN(end.getTime())) return null;

  return { start, end };
}

function buildWhere(model: ModelKey, q: string, range: { start: Date | null; end: Date | null } | null) {
  const meta = MODEL_META[model];
  const where: any = {};

  // Date range filter
  if (range && meta.dateField) {
    where[meta.dateField] = {};
    if (range.start) where[meta.dateField].gte = range.start;
    if (range.end) where[meta.dateField].lte = range.end;
    if (Object.keys(where[meta.dateField]).length === 0) delete where[meta.dateField];
  }

  // Text search (OR across safe fields)
  const qq = q.trim();
  if (qq && meta.searchFields?.length) {
    where.OR = meta.searchFields.map((f) => ({ [f]: { contains: qq, mode: "insensitive" } }));
  }

  return where;
}

// Central switch: avoids any "dynamic prisma[model]" which is risky.
async function runQuery(model: ModelKey, where: any, take: number, skip: number) {
  const orderBy = MODEL_META[model].defaultOrder || undefined;

  switch (model) {
    case "Lead": {
      const [total, rows] = await Promise.all([
        prisma.lead.count({ where }),
        prisma.lead.findMany({ where, orderBy, take, skip }),
      ]);
      return { total, rows };
    }
    case "Admission": {
      const [total, rows] = await Promise.all([
        prisma.admission.count({ where }),
        prisma.admission.findMany({ where, orderBy, take, skip }),
      ]);
      return { total, rows };
    }
    case "Payment": {
      const [total, rows] = await Promise.all([
        prisma.payment.count({ where }),
        prisma.payment.findMany({ where, orderBy, take, skip }),
      ]);
      return { total, rows };
    }
    case "MasterclassLead": {
      const [total, rows] = await Promise.all([
        prisma.masterclassLead.count({ where }),
        prisma.masterclassLead.findMany({ where, orderBy, take, skip }),
      ]);
      return { total, rows };
    }
    case "PhoneOtp": {
      const [total, rows] = await Promise.all([
        prisma.phoneOtp.count({ where }),
        prisma.phoneOtp.findMany({ where, orderBy, take, skip }),
      ]);
      return { total, rows };
    }
    case "Blog": {
      const [total, rows] = await Promise.all([
        prisma.blog.count({ where }),
        prisma.blog.findMany({ where, orderBy, take, skip }),
      ]);
      return { total, rows };
    }
    case "Influencer": {
      const [total, rows] = await Promise.all([
        prisma.influencer.count({ where }),
        prisma.influencer.findMany({ where, orderBy, take, skip }),
      ]);
      return { total, rows };
    }
    case "InfluencerSession": {
      const [total, rows] = await Promise.all([
        prisma.influencerSession.count({ where }),
        prisma.influencerSession.findMany({ where, orderBy, take, skip }),
      ]);
      return { total, rows };
    }
    case "Attendance": {
      const [total, rows] = await Promise.all([
        prisma.attendance.count({ where }),
        prisma.attendance.findMany({ where, orderBy, take, skip }),
      ]);
      return { total, rows };
    }
    case "Batch": {
      const [total, rows] = await Promise.all([
        prisma.batch.count({ where }),
        prisma.batch.findMany({ where, orderBy, take, skip }),
      ]);
      return { total, rows };
    }
    case "Enrollment": {
      const [total, rows] = await Promise.all([
        prisma.enrollment.count({ where }),
        prisma.enrollment.findMany({ where, orderBy, take, skip }),
      ]);
      return { total, rows };
    }
    case "ClassSession": {
      const [total, rows] = await Promise.all([
        prisma.classSession.count({ where }),
        prisma.classSession.findMany({ where, orderBy, take, skip }),
      ]);
      return { total, rows };
    }
    default:
      return { total: 0, rows: [] };
  }
}

export async function GET(req: Request) {
  // Token guard (if ADMIN_TOKEN set)
  const guard = requireToken(req);
  if (guard) return guard;

  try {
    const u = new URL(req.url);
    const model = (u.searchParams.get("model") || "").trim() as ModelKey;
    if (!model || !ALLOWED[model]) {
      return NextResponse.json({ ok: false, error: "invalid_model" }, { status: 400 });
    }

    const q = (u.searchParams.get("q") || "").trim();
    const from = u.searchParams.get("from");
    const to = u.searchParams.get("to");
    const take = Math.min(parseIntSafe(u.searchParams.get("take"), 50), 200);
    const skip = parseIntSafe(u.searchParams.get("skip"), 0);

    const range = parseDateRangeIST(from, to);
    const where = buildWhere(model, q, range);

    const { total, rows } = await runQuery(model, where, take, skip);

    return NextResponse.json(
      {
        ok: true,
        model,
        q,
        from: from || null,
        to: to || null,
        take,
        skip,
        total,
        rows,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("admin/table error:", e);
    // Safe-mode: never break the site
    return NextResponse.json({ ok: false, error: "server_error", total: 0, rows: [] }, { status: 200 });
  }
}
