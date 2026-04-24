export const revalidate = 0;
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: 'Send JSON with Content-Type: application/json' },
        { status: 415 }
      );
    }

    const body = await req.json();

    const name = String(body?.name || "").trim();
    const fatherName = String(body?.fatherName || "").trim();
    const whatsappRaw = String((body?.whatsapp ?? body?.phone ?? "")).trim();
    const email = String(body?.email || "").trim();

    if (!name || !fatherName || !whatsappRaw) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // normalize phone: keep last 10 digits
    let phone = whatsappRaw.replace(/\D/g, "");
    if (phone.length > 10) phone = phone.slice(-10);

    const keyId = (process.env.RAZORPAY_KEY_ID || "").trim();
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
    if (!keyId || !keySecret) {
      return NextResponse.json({ ok: false, error: "Razorpay env missing" }, { status: 500 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const amountRaw = Number(body?.amountRupees ?? body?.amountInRupees ?? body?.amount ?? 4999);
    const amountInRupees = Number.isFinite(amountRaw) ? Math.floor(amountRaw) : 4999;

    const MIN = 1;
    const MAX = 200000; // ₹2,00,000
    if (amountInRupees < MIN || amountInRupees > MAX) {
      return NextResponse.json({ ok: false, error: "Invalid amount" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: amountInRupees * 100,
      currency: "INR",
      receipt: `admission_${Date.now()}`,
      notes: { name, fatherName, whatsapp: phone, email },
    });

    // DB: create Admission row (never block checkout if DB fails)
    let admissionId: string | null = null;
    try {
      const admission = await prisma.admission.create({
        data: {
          name,
          phone,
          course: "AI Expert Program",
          feeTotal: amountInRupees,
          feePaid: 0,
        },
        select: { id: true },
      });
      admissionId = admission.id;
    } catch (e) {
      console.error("ADMISSION_DB_SAVE_ERROR", e);
    }

    return NextResponse.json({
      ok: true,
      admissionId,
      orderId: order.id,
      amount: order.amount,
      amountRupees: Number(order.amount || 0) / 100,
      currency: order.currency,
      prefill: { name, email, contact: phone },
    });
  } catch (e: any) {
    const msg =
      (e && (e.message || (typeof e === "string" ? e : ""))) ? (e.message || String(e)) : "Unknown error";
    console.error("ADMISSION_API_ERROR", e);
    return NextResponse.json(
      { ok: false, error: msg, debug: String((e && (e.stack || e)) || "") },
      { status: 500 }
    );
  }
}
