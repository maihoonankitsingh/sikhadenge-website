import { NextResponse } from "next/server";
import { getAnalyticsClient, getPropertyName, secondsToReadable } from "@/lib/ga4";

export async function GET() {
  try {
    const client = getAnalyticsClient();
    const property = getPropertyName();

    const [report] = await client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [
        { name: "screenPageViews" },
        { name: "activeUsers" },
        { name: "averageSessionDuration" },
        { name: "engagedSessions" }
      ],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 20,
    });

    const rows = (report.rows || []).map((row) => {
      const durationSec = Number(row.metricValues?.[2]?.value || 0);
      return {
        pagePath: row.dimensionValues?.[0]?.value || "/",
        views: Number(row.metricValues?.[0]?.value || 0),
        users: Number(row.metricValues?.[1]?.value || 0),
        avgDurationSec: durationSec,
        avgDurationText: secondsToReadable(durationSec),
        engagedSessions: Number(row.metricValues?.[3]?.value || 0),
      };
    });

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load top pages" },
      { status: 500 }
    );
  }
}
