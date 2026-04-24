import { NextResponse } from "next/server";
import { getAnalyticsClient, getPropertyName, secondsToReadable } from "@/lib/ga4";

export async function GET() {
  try {
    const client = getAnalyticsClient();
    const property = getPropertyName();

    const [today] = await client.runReport({
      property,
      dateRanges: [{ startDate: "today", endDate: "today" }],
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
        { name: "engagedSessions" },
        { name: "newUsers" }
      ],
    });

    const [yesterday] = await client.runReport({
      property,
      dateRanges: [{ startDate: "yesterday", endDate: "yesterday" }],
      metrics: [{ name: "activeUsers" }],
    });

    const [last7] = await client.runReport({
      property,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" }
      ],
    });

    const [month] = await client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
        { name: "engagedSessions" },
        { name: "newUsers" }
      ],
    });

    const todayRow = today.rows?.[0];
    const yesterdayRow = yesterday.rows?.[0];
    const last7Row = last7.rows?.[0];
    const monthRow = month.rows?.[0];

    return NextResponse.json({
      success: true,
      data: {
        todayVisitors: Number(todayRow?.metricValues?.[0]?.value || 0),
        todayViews: Number(todayRow?.metricValues?.[1]?.value || 0),
        todayAvgDurationSec: Number(todayRow?.metricValues?.[2]?.value || 0),
        todayAvgDurationText: secondsToReadable(Number(todayRow?.metricValues?.[2]?.value || 0)),
        todayEngagedSessions: Number(todayRow?.metricValues?.[3]?.value || 0),
        todayNewUsers: Number(todayRow?.metricValues?.[4]?.value || 0),

        yesterdayVisitors: Number(yesterdayRow?.metricValues?.[0]?.value || 0),

        last7Visitors: Number(last7Row?.metricValues?.[0]?.value || 0),
        last7Views: Number(last7Row?.metricValues?.[1]?.value || 0),

        monthVisitors: Number(monthRow?.metricValues?.[0]?.value || 0),
        monthViews: Number(monthRow?.metricValues?.[1]?.value || 0),
        monthAvgDurationSec: Number(monthRow?.metricValues?.[2]?.value || 0),
        monthAvgDurationText: secondsToReadable(Number(monthRow?.metricValues?.[2]?.value || 0)),
        monthEngagedSessions: Number(monthRow?.metricValues?.[3]?.value || 0),
        monthNewUsers: Number(monthRow?.metricValues?.[4]?.value || 0),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load analytics overview" },
      { status: 500 }
    );
  }
}
