import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SafeEnv = {
  host?: string;
  port?: number;
  user?: string;
  database?: string;
};

function pickEnv(): {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
} {
  const host = process.env.DB_HOST || process.env.MYSQL_HOST;
  const portRaw = process.env.DB_PORT || process.env.MYSQL_PORT;
  const port = portRaw ? Number(portRaw) : 3306;

  const user = process.env.DB_USER || process.env.MYSQL_USER;
  const password = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD;
  const database = process.env.DB_NAME || process.env.MYSQL_DATABASE;

  return { host, port, user, password, database };
}

export async function GET() {
  const { host, port, user, password, database } = pickEnv();

  const missing: string[] = [];
  if (!host) missing.push("DB_HOST");
  if (!user) missing.push("DB_USER");
  if (!password) missing.push("DB_PASSWORD");
  if (!database) missing.push("DB_NAME");
  if (!port || Number.isNaN(port)) missing.push("DB_PORT");

  const safeEnv: SafeEnv = {
    host,
    port,
    user,
    database,
  };

  // If env is missing, do NOT try to connect (prevents ::1 / empty user / no password).
  if (missing.length) {
    return NextResponse.json(
      {
        ok: false,
        error: `Missing env: ${missing.join(", ")}`,
        env_seen: {
          DB_HOST: Boolean(process.env.DB_HOST),
          DB_PORT: Boolean(process.env.DB_PORT),
          DB_NAME: Boolean(process.env.DB_NAME),
          DB_USER: Boolean(process.env.DB_USER),
          DB_PASSWORD: Boolean(process.env.DB_PASSWORD),
        },
        using: safeEnv,
      },
      { status: 500 }
    );
  }

  try {
    const conn = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      connectTimeout: 8000,
    });

    const [rows] = await conn.query("SELECT 1 AS ok");
    await conn.end();

    return NextResponse.json(
      {
        ok: true,
        using: safeEnv,
        result: rows,
      },
      { status: 200 }
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      {
        ok: false,
        error: msg,
        using: safeEnv,
        hint:
          "If you see host as ::1 or user empty, then env vars are not being read in deployment runtime. Re-check Hostinger Deployment → Environment Variables and Redeploy.",
      },
      { status: 500 }
    );
  }
}
