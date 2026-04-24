import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function cleanPhone(phone: string | null | undefined) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  if (digits.length > 10) return digits.slice(-10);
  return digits;
}

function isValidIndianMobile(phone: string) {
  return /^[6-9]\d{9}$/.test(phone);
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
  const start = new Date("2026-03-25T00:00:00.000+05:30");
  const end   = new Date("2026-03-26T00:00:00.000+05:30");

  const rows = await prisma.masterclassZoomJoin.findMany({
    where: {
      createdAt: { gte: start, lt: end }
    },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      leadName: true,
      leadPhone: true,
      leadEmail: true,
      createdAt: true
    }
  });

  console.log(`ZOOMJOIN_ROWS=${rows.length}`);

  const map = new Map<string, {
    name: string;
    phone: string;
    email: string;
    createdAt: string;
  }>();

  for (const row of rows) {
    const phone = cleanPhone(row.leadPhone);
    if (!isValidIndianMobile(phone)) continue;

    if (!map.has(phone)) {
      map.set(phone, {
        name: row.leadName || "Unknown",
        phone,
        email: normEmail(row.leadEmail),
        createdAt: row.createdAt.toISOString(),
      });
    }
  }

  const finalRows = Array.from(map.values()).sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt)
  );

  console.log(`DEDUPED_VALID_TOTAL=${finalRows.length}`);

  let ok = 0;
  let fail = 0;

  for (const row of finalRows) {
    try {
      const out = await pushToNeodove({
        name: row.name,
        mobile: row.phone,
        email: row.email,
        detail1: "source=masterclass_zoomjoin",
        detail2: "page=/masterclass",
      });
      ok++;
      console.log(`PUSH_OK phone=${row.phone} resp=${String(out).slice(0,120)}`);
    } catch (err) {
      fail++;
      console.error(`PUSH_FAIL phone=${row.phone} err=${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log(`DONE ok=${ok} fail=${fail} total=${finalRows.length}`);
}

main()
  .catch((e) => {
    console.error("SCRIPT_FATAL", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
