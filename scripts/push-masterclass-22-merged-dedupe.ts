import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function cleanPhone(phone: string | null | undefined) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length > 10) return digits.slice(-10);
  return digits;
}

function normEmail(email: string | null | undefined) {
  return String(email || "").trim().toLowerCase();
}

async function pushToNeodove(payload: any) {
  const endpoint =
    process.env.NEODOVE_MASTERCLASS_ENDPOINT ||
    process.env.NEODOVE_MASTERCLASS_FORM_ENDPOINT ||
    process.env.NEODOVE_ENDPOINT ||
    "";

  if (!endpoint) throw new Error("Missing Neodove endpoint env");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
  return text;
}

async function main() {
  const start = new Date("2026-03-22T00:00:00.000+05:30");
  const end   = new Date("2026-03-23T00:00:00.000+05:30");

  const leads = await prisma.masterclassLead.findMany({
    where: {
      createdAt: { gte: start, lt: end },
      page: "/masterclass",
    },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      source: true,
      page: true,
      createdAt: true,
    },
  });

  const zoomRows = await prisma.masterclassZoomJoin.findMany({
    where: {
      createdAt: { gte: start, lt: end },
    },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      leadName: true,
      leadPhone: true,
      leadEmail: true,
      createdAt: true,
      status: true,
      redirectTo: true,
    },
  });

  console.log(`LEADS=${leads.length}`);
  console.log(`ZOOMROWS=${zoomRows.length}`);

  const map = new Map<string, {
    name: string;
    phone: string;
    email: string;
    detail1: string;
    detail2: string;
    firstSeenAt: string;
    sourceType: string;
  }>();

  for (const row of leads) {
    const phone = cleanPhone(row.phone);
    if (!phone || phone.length < 10) continue;
    if (!map.has(phone)) {
      map.set(phone, {
        name: row.name || "Unknown",
        phone,
        email: normEmail(row.email),
        detail1: `source=${row.source ?? "website"}`,
        detail2: `page=${row.page ?? "/masterclass"}`,
        firstSeenAt: row.createdAt.toISOString(),
        sourceType: "lead",
      });
    }
  }

  for (const row of zoomRows) {
    const phone = cleanPhone(row.leadPhone);
    if (!phone || phone.length < 10) continue;

    if (!map.has(phone)) {
      map.set(phone, {
        name: row.leadName || "Unknown",
        phone,
        email: normEmail(row.leadEmail),
        detail1: "source=zoom_join",
        detail2: "page=/masterclass",
        firstSeenAt: row.createdAt.toISOString(),
        sourceType: "zoomjoin",
      });
    }
  }

  const merged = Array.from(map.values()).sort((a, b) => a.firstSeenAt.localeCompare(b.firstSeenAt));

  console.log(`DEDUPED_TOTAL=${merged.length}`);

  let ok = 0;
  let fail = 0;
  let skip = 0;

  for (const row of merged) {
    if (!row.phone || row.phone.length < 10) {
      skip++;
      continue;
    }

    const payload = {
      name: row.name,
      mobile: row.phone,
      email: row.email,
      detail1: row.detail1,
      detail2: row.detail2,
    };

    try {
      const out = await pushToNeodove(payload);
      ok++;
      console.log(`PUSH_OK phone=${row.phone} sourceType=${row.sourceType} resp=${String(out).slice(0, 120)}`);
    } catch (err) {
      fail++;
      console.error(`PUSH_FAIL phone=${row.phone} sourceType=${row.sourceType} err=${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log(`DONE ok=${ok} fail=${fail} skip=${skip} total=${merged.length}`);
}

main()
  .catch((e) => {
    console.error("SCRIPT_FATAL", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
