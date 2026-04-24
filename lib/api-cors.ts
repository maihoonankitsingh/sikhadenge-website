export const AFFILIATE_DASHBOARD_ORIGIN = "https://dashboard.sikhadenge.in";

export function withAffiliateCors(init: ResponseInit = {}): ResponseInit {
  const headers = new Headers(init.headers || {});
  headers.set("Access-Control-Allow-Origin", AFFILIATE_DASHBOARD_ORIGIN);
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Vary", "Origin");
  return { ...init, headers };
}

export function affiliateCorsPreflight(): Response {
  return new Response(null, {
    status: 204,
    headers: withAffiliateCors().headers,
  });
}
