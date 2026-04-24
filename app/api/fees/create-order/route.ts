import { NextRequest, NextResponse } from "next/server";
import { collectionPrisma } from "@/lib/collection-db";
import { getRazorpayInstance } from "@/lib/razorpay";

const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "Sikhadenge";
const MIN_AMOUNT_RUPEES = Number(process.env.COLLECTION_MIN_AMOUNT || "1");
const MAX_AMOUNT_RUPEES = Number(process.env.COLLECTION_MAX_AMOUNT || "200000");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const studentName = String(body?.studentName || "").trim();
    const phoneNumber = String(body?.phoneNumber || "").trim();
    const batchNumber = String(body?.batchNumber || "").trim().toUpperCase();
    const requestedAmount = Number(body?.amount);

    if (studentName.length < 2) {
      return NextResponse.json({ error: "Valid name is required." }, { status: 400 });
    }

    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      return NextResponse.json(
        { error: "Valid 10-digit phone number is required." },
        { status: 400 }
      );
    }

    if (!batchNumber) {
      return NextResponse.json({ error: "Batch number is required." }, { status: 400 });
    }

    if (!Number.isFinite(requestedAmount) || requestedAmount < MIN_AMOUNT_RUPEES) {
      return NextResponse.json(
        { error: `Amount must be at least ₹${MIN_AMOUNT_RUPEES}.` },
        { status: 400 }
      );
    }

    if (requestedAmount > MAX_AMOUNT_RUPEES) {
      return NextResponse.json(
        { error: `Amount cannot exceed ₹${MAX_AMOUNT_RUPEES}.` },
        { status: 400 }
      );
    }

    const amountInPaise = Math.round(requestedAmount * 100);
    const razorpay = getRazorpayInstance();

    const pendingCollection = await collectionPrisma.installmentCollection.create({
      data: {
        studentName,
        phoneNumber,
        batchNumber,
        amount: amountInPaise,
        currency: "INR",
        status: "PENDING",
      },
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: pendingCollection.id,
      notes: {
        collectionId: pendingCollection.id,
        studentName,
        phoneNumber,
        batchNumber,
        requestedAmount: String(requestedAmount),
      },
    });

    await collectionPrisma.installmentCollection.update({
      where: { id: pendingCollection.id },
      data: {
        razorpayOrderId: order.id,
      },
    });

    return NextResponse.json({
      success: true,
      collectionId: pendingCollection.id,
      orderId: order.id,
      amount: amountInPaise,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
      brandName: BRAND_NAME,
    });
  } catch (error) {
    console.error("CREATE_ORDER_ERROR", error);
    return NextResponse.json({ error: "Failed to create payment order." }, { status: 500 });
  }
}
