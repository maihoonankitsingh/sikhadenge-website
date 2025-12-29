import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mustEnv(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env: ${key}`);
  return v;
}

export async function GET() {
  try {
    // Read env INSIDE handler (runtime)
    const host = mustEnv("DB_HOST");
    const database = mustEnv("DB_NAME");
    const user = mustEnv("DB_USER");
    const password = mustEnv("DB_PASSWORD");
    const port = Number(process.env.DB_PORT ?? "3306");

    const conn = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      connectTimeout: 10000,
    });

    const [pingRows] = await conn.query<Array<{ ok: number }>>(
      "SELECT 1 as ok"
    );
    const [verRows] = await conn.query<Array<{ version: string }>>(
      "SELECT VERSION() as version"
    );

    await conn.end();

    return NextResponse.json({
      ok: true,
      ping: pingRows?.[0]?.ok ?? 1,
      version: verRows?.[0]?.version ?? null,
      using: {
        host,
        port,
        database,
        user,
        password: `set(len=${password.length})`,
      },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
