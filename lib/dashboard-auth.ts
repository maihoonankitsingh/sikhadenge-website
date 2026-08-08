export const DASHBOARD_AUTH_COOKIE = "sd_dash_auth";
export const DASHBOARD_NEXT_COOKIE = "sd_dash_next";

export function getDashboardAuthToken() {
  return (process.env.DASHBOARD_AUTH_TOKEN || "").trim();
}

export function isDashboardAuthValueValid(value?: string | null) {
  const expected = getDashboardAuthToken();
  const received = String(value || "").trim();
  return Boolean(expected && received && received === expected);
}

export function sanitizeDashboardNext(value?: string | null) {
  const raw = String(value || "").trim();

  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) {
    return "/dashboard";
  }

  try {
    const parsed = new URL(raw, "https://sikhadenge.in");
    const pathname = parsed.pathname;
    const allowed =
      pathname === "/dashboard" ||
      pathname.startsWith("/dashboard/") ||
      pathname === "/admin" ||
      pathname.startsWith("/admin/");

    if (!allowed) return "/dashboard";
    return `${pathname}${parsed.search}`;
  } catch {
    return "/dashboard";
  }
}
