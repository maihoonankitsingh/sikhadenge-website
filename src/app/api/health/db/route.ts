import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const missing: string[] = [];
  const DB_HOST = process.env.DB_HOST;
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD ?? "";
  const DB_NAME = process.env.DB_NAME;
  const DB_PORT = process.env.DB_PORT;

  if (!DB_HOST) missing.push("DB_HOST");
  if (!DB_USER) missing.push("DB_USER");
  if (!DB_NAME) missing.push("DB_NAME");

  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: "Missing DB env vars", missing },
      { status: 500 }
    );
  }

  const port = DB_PORT ? Number(DB_PORT) : 3306;

  try {
    const conn = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port,
      connectTimeout: 8000,
    });

    const [rows] = await conn.query("SELECT 1 AS ok");
    await conn.end();

    return NextResponse.json({ ok: true, rows });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
