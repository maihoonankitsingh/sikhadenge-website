export const revalidate = 0;

import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COURSE_NAME = "AI Expert Program";

const DEFAULT_PAYMENT_RUPEES = 6999;
const MIN_PAYMENT_RUPEES = 1000;
const MAX_PAYMENT_RUPEES = 100000;

function normalizePhone(value: unknown) {
  const digits = String(value || "")
    .replace(/\D/g, "");

  return digits.length > 10
    ? digits.slice(-10)
    : digits;
}

function validEmail(value: string) {
  return (
    !value ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value
    )
  );
}

function parsePaymentAmount(
  value: unknown
) {
  if (value == null || value === "") {
    return DEFAULT_PAYMENT_RUPEES;
  }

  if (typeof value === "number") {
    return Number.isSafeInteger(value)
      ? value
      : Number.NaN;
  }

  const text = String(value).trim();

  if (!/^\d{1,6}$/.test(text)) {
    return Number.NaN;
  }

  return Number(text);
}

export async function POST(req: Request) {
  let createdAdmissionId:
    | string
    | null = null;

  try {
    const contentType =
      req.headers.get("content-type") ||
      "";

    if (
      !contentType.includes(
        "application/json"
      )
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Send JSON with Content-Type: application/json",
        },
        { status: 415 }
      );
    }

    const body = await req.json();

    const name = String(
      body?.name || ""
    ).trim();

    const fatherName = String(
      body?.fatherName || ""
    ).trim();

    const phone = normalizePhone(
      body?.phone ?? body?.whatsapp
    );

    const email = String(
      body?.email || ""
    )
      .trim()
      .toLowerCase();

    const gender = String(
      body?.gender || ""
    ).trim();

    const address1 = String(
      body?.address1 || ""
    ).trim();

    const paymentAmountRupees =
      parsePaymentAmount(
        body?.amountRupees
      );

    if (
      name.length < 2 ||
      name.length > 120
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Enter a valid student name",
        },
        { status: 400 }
      );
    }

    if (
      fatherName.length < 2 ||
      fatherName.length > 120
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Enter a valid father name",
        },
        { status: 400 }
      );
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Enter a valid 10-digit Indian mobile number",
        },
        { status: 400 }
      );
    }

    if (!validEmail(email)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Enter a valid email address",
        },
        { status: 400 }
      );
    }

    if (
      gender &&
      !["Male", "Female", "Other"].includes(
        gender
      )
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Select a valid gender",
        },
        { status: 400 }
      );
    }

    if (address1.length > 500) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Address is too long",
        },
        { status: 400 }
      );
    }

    if (
      !Number.isSafeInteger(
        paymentAmountRupees
      ) ||
      paymentAmountRupees <
        MIN_PAYMENT_RUPEES ||
      paymentAmountRupees >
        MAX_PAYMENT_RUPEES
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Enter a whole payment amount between ₹1,000 and ₹1,00,000",
        },
        { status: 400 }
      );
    }

    const keyId = String(
      process.env.RAZORPAY_KEY_ID ||
        ""
    ).trim();

    const keySecret = String(
      process.env
        .RAZORPAY_KEY_SECRET || ""
    ).trim();

    if (!keyId || !keySecret) {
      console.error(
        "ADMISSION_RAZORPAY_ENV_MISSING"
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "Payment configuration unavailable",
        },
        { status: 503 }
      );
    }

    const admission =
      await prisma.admission.create({
        data: {
          name,
          phone,
          course: COURSE_NAME,
          feeTotal:
            paymentAmountRupees,
          feePaid: 0,
        },
        select: {
          id: true,
        },
      });

    createdAdmissionId =
      admission.id;

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const receipt =
      `adm_${admission.id.slice(
        -16
      )}_${Date.now()
        .toString()
        .slice(-8)}`;

    const order =
      await razorpay.orders.create({
        amount:
          paymentAmountRupees * 100,
        currency: "INR",
        receipt,
        notes: {
          admissionId:
            admission.id,
          name,
          fatherName,
          phone,
          email,
          course: COURSE_NAME,
          defaultPaymentRupees:
            String(
              DEFAULT_PAYMENT_RUPEES
            ),
          selectedPaymentRupees:
            String(
              paymentAmountRupees
            ),
        },
      });

    await prisma.payment.create({
      data: {
        admissionId:
          admission.id,
        razorpayOrderId: order.id,
        event:
          "checkout.order_created",
        status: "created",
        amount:
          paymentAmountRupees,
        currency: "INR",
        receivedAt: new Date(),
        raw: {
          applicant: {
            name,
            fatherName,
            phone,
            email: email || null,
            gender:
              gender || null,
            address1:
              address1 || null,
          },
          paymentRule: {
            defaultPaymentRupees:
              DEFAULT_PAYMENT_RUPEES,
            minimumPaymentRupees:
              MIN_PAYMENT_RUPEES,
            maximumPaymentRupees:
              MAX_PAYMENT_RUPEES,
            selectedPaymentRupees:
              paymentAmountRupees,
          },
          order: {
            id: order.id,
            amount: Number(
              order.amount
            ),
            currency:
              order.currency,
            receipt,
          },
        },
      },
    });

    return NextResponse.json({
      ok: true,
      keyId,
      admissionId: admission.id,
      orderId: order.id,
      amount: Number(order.amount),
      amountRupees:
        paymentAmountRupees,
      currency:
        order.currency || "INR",
      course: COURSE_NAME,
      defaultPaymentRupees:
        DEFAULT_PAYMENT_RUPEES,
      minimumPaymentRupees:
        MIN_PAYMENT_RUPEES,
      maximumPaymentRupees:
        MAX_PAYMENT_RUPEES,
      prefill: {
        name,
        email,
        contact: phone,
      },
    });
  } catch (error) {
    console.error(
      "ADMISSION_API_ERROR",
      error
    );

    if (createdAdmissionId) {
      await prisma.payment
        .deleteMany({
          where: {
            admissionId:
              createdAdmissionId,
          },
        })
        .catch((cleanupError) => {
          console.error(
            "ADMISSION_PAYMENT_CLEANUP_ERROR",
            cleanupError
          );
        });

      await prisma.admission
        .delete({
          where: {
            id: createdAdmissionId,
          },
        })
        .catch((cleanupError) => {
          console.error(
            "ADMISSION_INIT_CLEANUP_ERROR",
            cleanupError
          );
        });
    }

    return NextResponse.json(
      {
        ok: false,
        error:
          "Payment initialization failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
