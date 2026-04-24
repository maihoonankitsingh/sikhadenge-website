import { NextResponse } from "next/server";
import { getAnalyticsClient, getPropertyName } from "@/lib/ga4";

export async function GET() {
  try {
    const client = getAnalyticsClient();
    const property = getPropertyName();

    const [report] = await client.runRealtimeReport({
      property,
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" }
      ],
      dimensions: [{ name: "unifiedScreenName" }],
      limit: 10,
    });

    const rows = (report.rows || []).map((row) => ({
      page: row.dimensionValues?.[0]?.value || "(not set)",
      activeUsers: Number(row.metricValues?.[0]?.value || 0),
      views: Number(row.metricValues?.[1]?.value || 0),
    }));

    const totalActiveUsers = rows.reduce((sum, item) => sum + item.activeUsers, 0);

    return NextResponse.json({
      success: true,
      data: {
        totalActiveUsers,
        pages: rows,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load realtime analytics" },
      { status: 500 }
    );
  }
}
