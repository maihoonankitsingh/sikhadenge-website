import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EnvKey = "DB_HOST" | "DB_PORT" | "DB_NAME" | "DB_USER" | "DB_PASSWORD";

function getEnv(key: EnvKey): string | undefined {
  const v = process.env[key];
  return v && v.trim().length > 0 ? v.trim() : undefined;
}

export async function GET() {
  const DB_HOST = getEnv("DB_HOST");
  const DB_PORT = getEnv("DB_PORT") || "3306";
  const DB_NAME = getEnv("DB_NAME");
  const DB_USER = getEnv("DB_USER");
  const DB_PASSWORD = getEnv("DB_PASSWORD");

  const missing: EnvKey[] = [];
  if (!DB_HOST) missing.push("DB_HOST");
  if (!DB_NAME) missing.push("DB_NAME");
  if (!DB_USER) missing.push("DB_USER");
  if (!DB_PASSWORD) missing.push("DB_PASSWORD");

  // If env missing, return which keys are missing (so you can verify Hostinger env vars)
  if (missing.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing environment variables",
        missing,
        seen: {
          DB_HOST: Boolean(DB_HOST),
          DB_PORT: Boolean(DB_PORT),
          DB_NAME: Boolean(DB_NAME),
          DB_USER: Boolean(DB_USER),
          DB_PASSWORD: Boolean(DB_PASSWORD),
        },
      },
      { status: 500 }
    );
  }

  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER!,
      password: DB_PASSWORD!,
      database: DB_NAME!,
      ssl: { rejectUnauthorized: false }, // Hostinger remote MySQL often needs SSL
    });

    const [rows] = await connection.query("SELECT 1 AS ok");
    await connection.end();

    return NextResponse.json({ ok: true, db: DB_HOST, test: rows });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        ok: false,
        error: message,
        hint:
          "If you see user '' or host ::1, your DB_* env vars are not being read by the runtime.",
      },
      { status: 500 }
    );
  }
}
