export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone } = body;

    console.log("Received phone number:", phone);

    if (!phone) {
      return NextResponse.json(
        { ok: false, error: "missing_fields" },
        { status: 400 }
      );
    }

    const zoomLink =
      "https://us06web.zoom.us/j/82275881843?pwd=BIjK59kzyHliHEwKd2XY1wfwIrHQxy.1";

    console.log("Returning Zoom link:", zoomLink);

    if (!zoomLink) {
      return NextResponse.json(
        { ok: false, error: "missing_zoom_url" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, zoomLink });
  } catch (e: any) {
    console.error("Error handling Zoom link request:", e);

    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
