import { NextRequest, NextResponse } from "next/server";
import {
  DASHBOARD_AUTH_COOKIE,
  DASHBOARD_NEXT_COOKIE,
  sanitizeDashboardNext,
} from "@/lib/dashboard-auth";

export const dynamic = "force-dynamic";

function buildPublicBase(req: NextRequest): string {
  const forwardedProto = (req.headers.get("x-forwarded-proto") || "https")
    .split(",")[0]
    .trim();

  const forwardedHost = (
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    new URL(req.url).host
  )
    .split(",")[0]
    .trim();

  return `${forwardedProto}://${forwardedHost}`;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const user = String(form.get("user") || "").trim();
    const pass = String(form.get("pass") || "").trim();
    const formNext = String(form.get("next") || "").trim();
    const cookieNext = req.cookies.get(DASHBOARD_NEXT_COOKIE)?.value || "";
    const nextTarget = sanitizeDashboardNext(cookieNext || formNext);

    const expectedUser = (process.env.DASHBOARD_AUTH_USER || "").trim();
    const expectedPass = (process.env.DASHBOARD_AUTH_PASS || "").trim();
    const token = (process.env.DASHBOARD_AUTH_TOKEN || "").trim();

    if (!expectedUser || !expectedPass || !token) {
      return NextResponse.json(
        { ok: false, error: "Dashboard auth env vars are missing" },
        { status: 500 },
      );
    }

    const base = buildPublicBase(req);

    if (user !== expectedUser || pass !== expectedPass) {
      const invalidUrl = new URL("/auth/dashboard-login", base);
      invalidUrl.searchParams.set("error", "invalid");
      invalidUrl.searchParams.set("next", nextTarget);
      return NextResponse.redirect(invalidUrl, { status: 302 });
    }

    const res = NextResponse.redirect(new URL(nextTarget, base), { status: 302 });

    res.cookies.set({
      name: DASHBOARD_AUTH_COOKIE,
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    res.cookies.set({
      name: DASHBOARD_NEXT_COOKIE,
      value: "",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (error) {
    console.error("DASHBOARD_LOGIN_ERROR", error);
    return NextResponse.json(
      { ok: false, error: "Login failed" },
      { status: 500 },
    );
  }
}
