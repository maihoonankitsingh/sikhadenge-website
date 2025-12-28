import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: 3306,
    });

    const [rows] = await connection.query("SELECT 1 AS ok");
    await connection.end();

    return NextResponse.json({
      ok: true,
      db: process.env.DB_NAME,
      result: rows,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || "DB connection failed",
      },
      { status: 500 }
    );
  }
}
