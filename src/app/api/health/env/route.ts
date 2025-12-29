import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const host = process.env.DB_HOST ?? "";
  const port = process.env.DB_PORT ?? "";
  const name = process.env.DB_NAME ?? "";
  const user = process.env.DB_USER ?? "";
  const pass = process.env.DB_PASSWORD ?? "";

  return NextResponse.json({
    ok: true,
    DB_HOST: host,
    DB_PORT: port,
    DB_NAME: name,
    DB_USER: user,
    DB_PASSWORD: pass ? `set(len=${pass.length})` : "missing",
    nodeEnv: process.env.NODE_ENV ?? "",
  });
}
