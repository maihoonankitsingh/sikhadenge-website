import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    DB_HOST: process.env.DB_HOST ?? null,
    DB_PORT: process.env.DB_PORT ?? null,
    DB_NAME: process.env.DB_NAME ?? null,
    DB_USER: process.env.DB_USER ?? null,
    DB_PASSWORD: process.env.DB_PASSWORD
      ? `set(len=${process.env.DB_PASSWORD.length})`
      : null,
    nodeEnv: process.env.NODE_ENV ?? null,
  });
}
