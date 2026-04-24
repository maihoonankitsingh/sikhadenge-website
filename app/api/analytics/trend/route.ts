import { NextResponse } from "next/server";
import { getAnalyticsClient, getPropertyName } from "@/lib/ga4";

export async function GET() {
  try {
    const client = getAnalyticsClient();
    const property = getPropertyName();

    const [report] = await client.runReport({
      property,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" }
      ],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    });

    const rows = (report.rows || []).map((row) => ({
      date: row.dimensionValues?.[0]?.value || "",
      visitors: Number(row.metricValues?.[0]?.value || 0),
      views: Number(row.metricValues?.[1]?.value || 0),
    }));

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load trend data" },
      { status: 500 }
    );
  }
}
