import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await connection.query("SELECT 1");
    await connection.end();

    return NextResponse.json({
      ok: true,
      message: "Database connected successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message,
        env: {
          host: process.env.DB_HOST ? "OK" : "MISSING",
          user: process.env.DB_USER ? "OK" : "MISSING",
          password: process.env.DB_PASSWORD ? "OK" : "MISSING",
          db: process.env.DB_NAME ? "OK" : "MISSING",
        },
      },
      { status: 500 }
    );
  }
}
