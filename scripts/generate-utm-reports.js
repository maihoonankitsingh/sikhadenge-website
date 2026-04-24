const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function safeParse(s){ try { return JSON.parse(s||"{}"); } catch { return {}; } }
function esc(v){
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s;
}

(async () => {
  const since = new Date(Date.now() - 30*24*60*60*1000);

  const leads = await prisma.lead.findMany({
    where: { createdAt: { gte: since } },
    select: { createdAt: true, notes: true },
  });

  const byCampaign = new Map();
  const byAd = new Map();

  for (const l of leads) {
    const n = safeParse(l.notes);
    const t = n.tracking || {};

    const camp = t.utm_campaign || "";
    const campId = t.utm_campaign_id || "";

    const ad = t.utm_ad || "";
    const adId = t.utm_ad_id || "";

    const adset = t.utm_adset || "";
    const adsetId = t.utm_adset_id || "";

    if (camp || campId) {
      const k = `${camp}||${campId}`;
      byCampaign.set(k, (byCampaign.get(k) || 0) + 1);
    }

    if (ad || adId) {
      const k = `${ad}||${adId}||${adset}||${adsetId}||${camp}||${campId}`;
      byAd.set(k, (byAd.get(k) || 0) + 1);
    }
  }

  const campRows = [...byCampaign.entries()]
    .map(([k,count]) => {
      const [campaign, campaign_id] = k.split("||");
      return { campaign, campaign_id, count };
    })
    .sort((a,b)=>b.count-a.count);

  const adRows = [...byAd.entries()]
    .map(([k,count]) => {
      const [ad, ad_id, adset, adset_id, campaign, campaign_id] = k.split("||");
      return { ad, ad_id, adset, adset_id, campaign, campaign_id, count };
    })
    .sort((a,b)=>b.count-a.count);

  fs.writeFileSync(
    "campaign_report.csv",
    "campaign,campaign_id,count\n" +
      campRows.map(r => [esc(r.campaign), esc(r.campaign_id), r.count].join(",")).join("\n") +
      "\n",
    "utf-8"
  );

  fs.writeFileSync(
    "ad_report.csv",
    "ad,ad_id,adset,adset_id,campaign,campaign_id,count\n" +
      adRows.map(r => [esc(r.ad), esc(r.ad_id), esc(r.adset), esc(r.adset_id), esc(r.campaign), esc(r.campaign_id), r.count].join(",")).join("\n") +
      "\n",
    "utf-8"
  );

  console.log("OK: Updated campaign_report.csv and ad_report.csv (last 30 days)");
  await prisma.$disconnect();
})().catch(async (e) => {
  console.error("ERROR:", e);
  try { await prisma.$disconnect(); } catch {}
  process.exit(1);
});
