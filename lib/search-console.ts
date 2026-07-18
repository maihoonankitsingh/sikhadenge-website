import { JWT } from "google-auth-library";

const SEARCH_CONSOLE_SCOPE =
  "https://www.googleapis.com/auth/webmasters.readonly";

const SEARCH_ANALYTICS_BASE_URL =
  "https://www.googleapis.com/webmasters/v3/sites";

export type SearchAnalyticsRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

export type SearchAnalyticsResponse = {
  rows?: SearchAnalyticsRow[];
  responseAggregationType?: string;
};

export type SearchAnalyticsRequest = {
  startDate: string;
  endDate: string;
  dimensions?: Array<
    "date" | "query" | "page" | "country" | "device" | "searchAppearance"
  >;
  rowLimit?: number;
  startRow?: number;
  type?:
    | "web"
    | "image"
    | "video"
    | "news"
    | "discover"
    | "googleNews";
};

function requireEnvironmentValue(
  name: string
): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

function getPrivateKey(): string {
  return requireEnvironmentValue(
    "GA4_PRIVATE_KEY"
  )
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n");
}

function createSearchConsoleAuth(): JWT {
  return new JWT({
    email: requireEnvironmentValue(
      "GA4_CLIENT_EMAIL"
    ),
    key: getPrivateKey(),
    scopes: [SEARCH_CONSOLE_SCOPE],
  });
}

export function getSearchConsoleSiteUrl(): string {
  return requireEnvironmentValue(
    "SEARCH_CONSOLE_SITE_URL"
  );
}

export async function querySearchAnalytics(
  request: SearchAnalyticsRequest
): Promise<SearchAnalyticsResponse> {
  const auth = createSearchConsoleAuth();
  const siteUrl = getSearchConsoleSiteUrl();

  const endpoint =
    `${SEARCH_ANALYTICS_BASE_URL}/` +
    `${encodeURIComponent(siteUrl)}/` +
    "searchAnalytics/query";

  const response =
    await auth.request<SearchAnalyticsResponse>({
      url: endpoint,
      method: "POST",
      data: request,
    });

  return response.data;
}
