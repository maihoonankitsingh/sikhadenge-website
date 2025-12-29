import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function requiredEnv(name: string) {
  const v = process.env[name];
  return (v && v.trim()) ? v.trim() : "";
}

export async function GET() {
  const DB_HOST = requiredEnv("DB_HOST");
  const DB_PORT_RAW = requiredEnv("DB_PORT");
  const DB_NAME = requiredEnv("DB_NAME");
  const DB_USER = requiredEnv("DB_USER");
  const DB_PASSWORD = requiredEnv("DB_PASSWORD");

  const missing = ["DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"].filter(
    (k) => !requiredEnv(k)
  );

  // If env missing, do NOT try localhost (prevents "::1" / empty-user attempts)
  if (missing.length) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing required environment variables in runtime.",
        missing,
        hint:
          "Set these in Hostinger -> Node.js app -> Environment variables, then redeploy.",
      },
      { status: 500 }
    );
  }

  const DB_PORT = Number(DB_PORT_RAW);
  if (!Number.isFinite(DB_PORT) || DB_PORT <= 0) {
    return NextResponse.json(
      { ok: false, error: `Invalid DB_PORT: ${DB_PORT_RAW}` },
      { status: 500 }
    );
  }

  let conn: mysql.Connection | null = null;

  try {
    conn = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      connectTimeout: 10_000,
    });

    const [rows] = await conn.query("SELECT 1 AS ok, NOW() AS now");
    return NextResponse.json({ ok: true, result: rows });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  } finally {
    if (conn) {
      try {
        await conn.end();
      } catch {
        // ignore
      }
    }
  }
}
