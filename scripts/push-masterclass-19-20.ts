import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function cleanPhone(phone: string) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length > 10) return digits.slice(-10);
  return digits;
}

async function pushToNeodove(payload: any) {
  const endpoint =
    process.env.NEODOVE_MASTERCLASS_ENDPOINT ||
    process.env.NEODOVE_MASTERCLASS_FORM_ENDPOINT ||
    process.env.NEODOVE_ENDPOINT ||
    "";

  if (!endpoint) {
    throw new Error("Missing Neodove endpoint env");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return text;
}

async function main() {
  const start = new Date("2026-03-19T00:00:00.000+05:30");
  const end = new Date("2026-03-21T00:00:00.000+05:30");

  const rows = await prisma.masterclassLead.findMany({
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

  console.log(`FOUND=${rows.length}`);

  let ok = 0;
  let fail = 0;
  let skip = 0;

  for (const row of rows) {
    const phone = cleanPhone(row.phone || "");

    if (!phone || phone.length < 10) {
      console.log(`SKIP_INVALID_PHONE id=${row.id} raw=${row.phone || ""}`);
      skip++;
      continue;
    }

    const payload = {
      name: row.name || "Unknown",
      mobile: phone,
      email: row.email || "",
      detail1: `source=${row.source ?? "website"}`,
      detail2: `page=${row.page ?? "/masterclass"}`,
    };

    try {
      const out = await pushToNeodove(payload);
      ok++;
      console.log(
        `PUSH_OK id=${row.id} phone=${phone} createdAt=${row.createdAt.toISOString()} resp=${String(out).slice(0, 200)}`
      );
    } catch (err) {
      fail++;
      console.error(
        `PUSH_FAIL id=${row.id} phone=${phone} createdAt=${row.createdAt.toISOString()} err=${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  console.log(`DONE ok=${ok} fail=${fail} skip=${skip} total=${rows.length}`);
}

main()
  .catch((e) => {
    console.error("SCRIPT_FATAL", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
