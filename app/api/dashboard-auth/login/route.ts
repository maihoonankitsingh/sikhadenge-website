import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "sd_dash_auth";

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

    const expectedUser = (process.env.DASHBOARD_AUTH_USER || "").trim();
    const expectedPass = (process.env.DASHBOARD_AUTH_PASS || "").trim();
    const token = (process.env.DASHBOARD_AUTH_TOKEN || "").trim();

    if (!expectedUser || !expectedPass || !token) {
      return NextResponse.json(
        { ok: false, error: "Dashboard auth env vars are missing" },
        { status: 500 }
      );
    }

    const base = buildPublicBase(req);

    if (user !== expectedUser || pass !== expectedPass) {
      return NextResponse.redirect(
        new URL("/auth/dashboard-login?error=invalid", base),
        { status: 302 }
      );
    }

    const res = NextResponse.redirect(
      new URL("/", base),
      { status: 302 }
    );

    res.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return res;
  } catch (error) {
    console.error("DASHBOARD_LOGIN_ERROR", error);
    return NextResponse.json(
      { ok: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
