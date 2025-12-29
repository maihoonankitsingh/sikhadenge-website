import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const runtime = "nodejs"; // IMPORTANT: ensure Node runtime (env vars available)

type DbEnv = {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
};

function getDbEnv(): DbEnv {
  const host = process.env.DB_HOST?.trim() || "";
  const portStr = process.env.DB_PORT?.trim() || "3306";
  const name = process.env.DB_NAME?.trim() || "";
  const user = process.env.DB_USER?.trim() || "";
  const password = process.env.DB_PASSWORD ?? ""; // keep as-is (can contain special chars)

  const port = Number(portStr);

  const missing: string[] = [];
  if (!host) missing.push("DB_HOST");
  if (!portStr || Number.isNaN(port)) missing.push("DB_PORT");
  if (!name) missing.push("DB_NAME");
  if (!user) missing.push("DB_USER");
  if (!password) missing.push("DB_PASSWORD");

  if (missing.length) {
    // This is the exact reason your current error is happening.
    throw new Error(`Missing env: ${missing.join(", ")}`);
  }

  return { host, port, name, user, password };
}

export async function GET() {
  try {
    const db = getDbEnv();

    const conn = await mysql.createConnection({
      host: db.host,
      port: db.port,
      user: db.user,
      password: db.password,
      database: db.name,
      // optional hardening:
      ssl: "Amazon RDS", // harmless on most hosts; if it causes issue, remove this line
    });

    const [rows] = await conn.query("SELECT 1 AS ok");
    await conn.end();

    return NextResponse.json({
      ok: true,
      dbHost: db.host,
      dbName: db.name,
      result: rows,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
