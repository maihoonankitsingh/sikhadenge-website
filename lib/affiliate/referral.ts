export function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.APP_URL ||
    "https://sikhadenge.in"
  ).replace(/\/+$/, "");
}

export function buildAffiliateReferralLink(code: string, path = "/") {
  const base = getBaseUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}?ref=${encodeURIComponent(code)}`;
}
