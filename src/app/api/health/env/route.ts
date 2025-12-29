import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function mask(v?: string) {
  if (!v) return null;
  if (v.length <= 2) return "*".repeat(v.length);
  return v[0] + "*".repeat(Math.min(10, v.length - 2)) + v[v.length - 1];
}

export async function GET() {
  const cfg = {
    DB_HOST: process.env.DB_HOST ?? null,
    DB_PORT: process.env.DB_PORT ?? null,
    DB_NAME: process.env.DB_NAME ?? null,
    DB_USER: process.env.DB_USER ?? null,
    DB_PASSWORD: mask(process.env.DB_PASSWORD),
    // extra debug: is env coming at all
    NODE_ENV: process.env.NODE_ENV ?? null,
  };

  const missing = Object.entries(cfg)
    .filter(([k, v]) => (k !== "DB_PASSWORD" && (v === null || v === "")))
    .map(([k]) => k);

  return NextResponse.json({
    ok: missing.length === 0,
    missing,
    cfg,
    note: "If DB_USER/DB_PASSWORD null => Hostinger env vars not applied to runtime. Click 'Save and redeploy'. Ensure keys have no spaces.",
  });
}
route.ts