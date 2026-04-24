import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "sd_dash_auth";

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/auth/dashboard-login", req.url), { status: 302 });

  res.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
