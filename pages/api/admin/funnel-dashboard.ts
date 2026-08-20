import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth";

type Group = { funnel: string; offerMode: string; views: number; uniqueVisitors: Set<string>; ctaClicks: number; leads: number; checkoutStarts: number; purchases: number; revenue: number; };
function emptyGroup(funnel: string, offerMode: string): Group { return { funnel, offerMode, views: 0, uniqueVisitors: new Set<string>(), ctaClicks: 0, leads: 0, checkoutStarts: 0, purchases: 0, revenue: 0 }; }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res); if (!admin) return;
  if (req.method !== "GET") { res.setHeader("Allow", "GET"); return res.status(405).json({ ok: false, error: "Method not allowed" }); }
  const days = Math.min(90, Math.max(1, Number.parseInt(String(req.query.days || "30"), 10) || 30));
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  try {
    const events = await prisma.funnelEvent.findMany({ where: { createdAt: { gte: since } }, orderBy: { createdAt: "asc" }, select: { eventName: true, visitorId: true, funnel: true, offerMode: true, eventValue: true, createdAt: true }, take: 50000 });
    const groups = new Map<string, Group>(); const overallVisitors = new Set<string>(); let overallViews = 0; let overallLeads = 0; let overallPurchases = 0; let overallRevenue = 0;
    for (const event of events) {
      const funnel = event.funnel || "unknown"; const offerMode = event.offerMode || "unknown"; const key = `${funnel}:${offerMode}`; const group = groups.get(key) || emptyGroup(funnel, offerMode);
      if (event.visitorId) { group.uniqueVisitors.add(event.visitorId); overallVisitors.add(event.visitorId); }
      switch (event.eventName) {
        case "view_masterclass_offer": group.views += 1; overallViews += 1; break;
        case "masterclass_cta_click": group.ctaClicks += 1; break;
        case "generate_lead": group.leads += 1; overallLeads += 1; break;
        case "begin_checkout": group.checkoutStarts += 1; break;
        case "purchase": case "workshop_purchase": case "close_convert_lead": group.purchases += 1; overallPurchases += 1; group.revenue += event.eventValue || 0; overallRevenue += event.eventValue || 0; break;
        default: break;
      }
      groups.set(key, group);
    }
    const rows = Array.from(groups.values()).map((group) => ({ funnel: group.funnel, offerMode: group.offerMode, views: group.views, uniqueVisitors: group.uniqueVisitors.size, ctaClicks: group.ctaClicks, leads: group.leads, leadConversionRate: group.views > 0 ? Number(((group.leads / group.views) * 100).toFixed(2)) : 0, checkoutStarts: group.checkoutStarts, purchases: group.purchases, revenue: group.revenue })).sort((a, b) => `${a.funnel}:${a.offerMode}`.localeCompare(`${b.funnel}:${b.offerMode}`));
    return res.status(200).json({ ok: true, rangeDays: days, since: since.toISOString(), summary: { views: overallViews, uniqueVisitors: overallVisitors.size, leads: overallLeads, purchases: overallPurchases, revenue: overallRevenue }, rows, note: "This dashboard uses first-party funnel events. Meta ad spend, CAC and ROAS require a verified Meta Ads data source and are intentionally not estimated here." });
  } catch (error) { console.error("Funnel dashboard failed:", error); return res.status(500).json({ ok: false, error: "Unable to load funnel dashboard" }); }
}
