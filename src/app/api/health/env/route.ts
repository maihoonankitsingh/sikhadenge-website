import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mask(v?: string) {
  if (!v) return "(empty)";
  if (v.length <= 4) return "***";
  return `set(len=${v.length})`;
}

export async function GET() {
  const DB_HOST = process.env.DB_HOST || "";
  const DB_PORT = process.env.DB_PORT || "";
  const DB_NAME = process.env.DB_NAME || "";
  const DB_USER = process.env.DB_USER || "";
  const DB_PASSWORD = process.env.DB_PASSWORD || "";

  return NextResponse.json({
    ok: true,
    DB_HOST: DB_HOST || "(empty)",
    DB_PORT: DB_PORT || "(empty)",
    DB_NAME: DB_NAME || "(empty)",
    DB_USER: DB_USER || "(empty)",
    DB_PASSWORD: mask(DB_PASSWORD),
    nodeEnv: process.env.NODE_ENV || "(empty)",
  });
}
