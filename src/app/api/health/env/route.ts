import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const host = process.env.DB_HOST ?? "";
  const port = process.env.DB_PORT ?? "";
  const name = process.env.DB_NAME ?? "";
  const user = process.env.DB_USER ?? "";
  const pass = process.env.DB_PASSWORD ?? "";

  return NextResponse.json({
    ok: true,
    DB_HOST: host || "(empty)",
    DB_PORT: port || "(empty)",
    DB_NAME: name || "(empty)",
    DB_USER: user || "(empty)",
    DB_PASSWORD: pass ? `set(len=${pass.length})` : "(empty)",
    nodeEnv: process.env.NODE_ENV ?? "(empty)",
  });
}
