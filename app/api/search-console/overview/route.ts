import { NextResponse } from "next/server";

import {
  getSearchConsoleSiteUrl,
  querySearchAnalytics,
} from "@/lib/search-console";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REPORT_DAYS = 28;
const DATA_DELAY_DAYS = 3;

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getReportDateRange(): {
  startDate: string;
  endDate: string;
} {
  const end = new Date();

  end.setUTCHours(12, 0, 0, 0);
  end.setUTCDate(
    end.getUTCDate() - DATA_DELAY_DAYS
  );

  const start = new Date(end);

  start.setUTCDate(
    start.getUTCDate() - (REPORT_DAYS - 1)
  );

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
}

function round(
  value: number,
  digits = 2
): number {
  const factor = 10 ** digits;

  return Math.round(value * factor) / factor;
}

export async function GET() {
  try {
    const { startDate, endDate } =
      getReportDateRange();

    const response = await querySearchAnalytics({
      startDate,
      endDate,
      type: "web",
      rowLimit: 1,
    });

    const row = response.rows?.[0];

    const clicks = Number(
      row?.clicks || 0
    );

    const impressions = Number(
      row?.impressions || 0
    );

    const ctr = Number(
      row?.ctr || 0
    );

    const averagePosition = Number(
      row?.position || 0
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          siteUrl: getSearchConsoleSiteUrl(),
          dateRange: {
            startDate,
            endDate,
            days: REPORT_DAYS,
            dataDelayDays: DATA_DELAY_DAYS,
          },
          metrics: {
            clicks,
            impressions,
            ctr,
            ctrPercent: round(
              ctr * 100
            ),
            averagePosition: round(
              averagePosition
            ),
          },
          responseAggregationType:
            response.responseAggregationType ||
            null,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "[search-console-overview]",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unknown Search Console error";

    return NextResponse.json(
      {
        success: false,
        error:
          "Search Console reporting request failed",
        detail: message,
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
