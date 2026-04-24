import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();
const ENDPOINT = process.env.NEODOVE_MASTERCLASS_ENDPOINT || "";
const DRY_RUN = String(process.env.DRY_RUN || "") === "1";
const LIMIT = Number(process.env.LIMIT || "0"); // 0 = no limit
const SLEEP_MS = Number(process.env.SLEEP_MS || "200"); // rate limit
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS || "2500");
const LOG = process.env.LOG || "neodove_backfill_masterclasslead.log";

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function postWithTimeout(url, payload) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });
    const text = await res.text().catch(() => "");
    return { ok: res.ok, status: res.status, text };
  } finally {
    clearTimeout(t);
  }
}

function normPhone(p) {
  let s = String(p || "").replace(/\D/g, "");
  if (s.length > 10) s = s.slice(-10);
  return s;
}

async function main() {
  if (!ENDPOINT) {
    console.error("ERROR: NEODOVE_MASTERCLASS_ENDPOINT is missing");
    process.exit(1);
  }

  const rows = await prisma.masterclassLead.findMany({
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    select: {
      name: true,
      email: true,
      phone: true,
      source: true,
      page: true,
      createdAt: true,
      updatedAt: true,
      utm_source: true,
      utm_medium: true,
      utm_campaign: true,
      utm_content: true,
      utm_term: true,
      utm_id: true,
      utm_campaign_id: true,
      utm_adset_id: true,
      utm_ad_id: true,
      fbclid: true,
      gclid: true,
      msclkid: true,
      landing_url: true,
      referrer: true,
    },
  });

  // Deduplicate by phone (keep latest)
  const seen = new Set();
  const unique = [];
  for (const r of rows) {
    const ph = normPhone(r.phone);
    if (!ph) continue;
    if (seen.has(ph)) continue;
    seen.add(ph);
    unique.push({ ...r, phone: ph });
  }

  const list = LIMIT > 0 ? unique.slice(0, LIMIT) : unique;
  fs.appendFileSync(LOG, `\n=== RUN ${new Date().toISOString()} rows=${rows.length} unique=${unique.length} send=${list.length} dry=${DRY_RUN} ===\n`);

  let ok = 0, fail = 0;

  for (let i = 0; i < list.length; i++) {
    const r = list[i];

    const payload = {
      name: r.name || "",
      mobile: r.phone,
      email: r.email || "",
      detail1: `source=${r.source ?? ""} page=${r.page ?? ""}`,
      detail2: `utm_source=${r.utm_source ?? ""} utm_medium=${r.utm_medium ?? ""} utm_campaign=${r.utm_campaign ?? ""}`,
    };

    if (DRY_RUN) {
      console.log(`[DRY] ${i+1}/${list.length} phone=${r.phone} name=${(r.name||"").slice(0,40)}`);
      ok++;
      continue;
    }

    try {
      const res = await postWithTimeout(ENDPOINT, payload);
      if (res.ok) {
        ok++;
        console.log(`[OK] ${i+1}/${list.length} phone=${r.phone}`);
        fs.appendFileSync(LOG, `[OK] i=${i+1} phone=${r.phone}\n`);
      } else {
        fail++;
        console.log(`[FAIL] ${i+1}/${list.length} phone=${r.phone} status=${res.status}`);
        fs.appendFileSync(LOG, `[FAIL] i=${i+1} phone=${r.phone} status=${res.status} body=${res.text.slice(0,300)}\n`);
      }
    } catch (e) {
      fail++;
      console.log(`[ERR] ${i+1}/${list.length} phone=${r.phone} ${e?.message || e}`);
      fs.appendFileSync(LOG, `[ERR] i=${i+1} phone=${r.phone} err=${e?.message || e}\n`);
    }

    await sleep(SLEEP_MS);
  }

  console.log(`DONE ok=${ok} fail=${fail} total=${list.length} log=${LOG}`);
  fs.appendFileSync(LOG, `DONE ok=${ok} fail=${fail} total=${list.length}\n`);
}

main()
  .catch((e) => { console.error("FATAL:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
