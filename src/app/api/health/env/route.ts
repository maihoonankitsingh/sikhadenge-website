import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json({
    ok: true,
    DB_HOST: process.env.DB_HOST ? "(set)" : "(empty)",
    DB_PORT: process.env.DB_PORT ? "(set)" : "(empty)",
    DB_NAME: process.env.DB_NAME ? "(set)" : "(empty)",
    DB_USER: process.env.DB_USER ? "(set)" : "(empty)",
    DB_PASSWORD: process.env.DB_PASSWORD ? `(set,len=${process.env.DB_PASSWORD.length})` : "(empty)",
    NODE_ENV: process.env.NODE_ENV ?? "(empty)",
  });
}
