// src/app/api/health/db/route.ts

import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;
  const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

  try {
    if (!host || !user || !password || !database) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing DB env vars",
          env: {
            host: host ? "OK" : "MISSING",
            user: user ? "OK" : "MISSING",
            password: password ? "OK" : "MISSING",
            db: database ? "OK" : "MISSING",
            port: process.env.DB_PORT ? "OK" : "DEFAULT(3306)",
          },
        },
        { status: 500 }
      );
    }

    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
      port,
    });

    await connection.ping();
    await connection.end();

    return NextResponse.json({
      ok: true,
      message: "DB connected",
      host,
      database,
      user,
      port,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
        env: {
          host: process.env.DB_HOST ? "OK" : "MISSING",
          user: process.env.DB_USER ? "OK" : "MISSING",
          password: process.env.DB_PASSWORD ? "OK" : "MISSING",
          db: process.env.DB_NAME ? "OK" : "MISSING",
          port: process.env.DB_PORT ? "OK" : "DEFAULT(3306)",
        },
      },
      { status: 500 }
    );
  }
}
