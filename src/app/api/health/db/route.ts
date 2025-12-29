import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function GET() {
  try {
    const host = requiredEnv("DB_HOST");
    const user = requiredEnv("DB_USER");
    const password = requiredEnv("DB_PASSWORD");
    const database = requiredEnv("DB_NAME");
    const portStr = requiredEnv("DB_PORT");
    const port = Number(portStr);

    if (!Number.isFinite(port)) throw new Error(`Invalid DB_PORT: ${portStr}`);

    const conn = await mysql.createConnection({
      host,
      user,
      password,
      database,
      port,
      connectTimeout: 8000,
    });

    const [rows] = await conn.query("SELECT 1 AS ok");
    await conn.end();

    return NextResponse.json({ ok: true, rows });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";

    return NextResponse.json(
      {
        ok: false,
        error: msg,
        debugEnv: {
          DB_HOST: process.env.DB_HOST ?? null,
          DB_PORT: process.env.DB_PORT ?? null,
          DB_NAME: process.env.DB_NAME ?? null,
          DB_USER: process.env.DB_USER ?? null,
          DB_PASSWORD: process.env.DB_PASSWORD
            ? `set(len=${process.env.DB_PASSWORD.length})`
            : null,
          NODE_ENV: process.env.NODE_ENV ?? null,
        },
      },
      { status: 500 }
    );
  }
}
