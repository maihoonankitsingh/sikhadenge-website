export const revalidate = 0;

import crypto from "crypto";
import Razorpay from "razorpay";
import {
  NextRequest,
  NextResponse,
} from "next/server";
import {
  prisma,
} from "@/lib/prisma";
import {
  sendMetaConversionEvent,
} from "@/lib/metaConversions";
import {
  createAdmissionCompletionToken,
} from "@/lib/admission-token";

export const runtime = "nodejs";
export const dynamic =
  "force-dynamic";

function asString(
  value: unknown
) {
  return typeof value === "string"
    ? value.trim()
    : value == null
      ? ""
      : String(value).trim();
}

function verifySignature(
  secret: string,
  orderId: string,
  paymentId: string,
  signature: string
) {
  const expected = crypto
    .createHmac(
      "sha256",
      secret
    )
    .update(
      `${orderId}|${paymentId}`
    )
    .digest("hex");

  try {
    const expectedBuffer =
      Buffer.from(
        expected,
        "hex"
      );

    const receivedBuffer =
      Buffer.from(
        signature,
        "hex"
      );

    return (
      expectedBuffer.length ===
        receivedBuffer.length &&
      crypto.timingSafeEqual(
        expectedBuffer,
        receivedBuffer
      )
    );
  } catch {
    return false;
  }
}

function jsonSafe(
  value: unknown
) {
  return JSON.parse(
    JSON.stringify(value)
  );
}

function applicantFromRaw(
  raw: unknown
) {
  let current:
    any = raw;

  for (
    let depth = 0;
    depth < 5;
    depth += 1
  ) {
    if (
      !current ||
      typeof current !== "object" ||
      Array.isArray(current)
    ) {
      break;
    }

    if (
      current.applicant &&
      typeof current.applicant ===
        "object"
    ) {
      return {
        name:
          asString(
            current.applicant.name
          ),
        email:
          asString(
            current.applicant.email
          ),
        phone:
          asString(
            current.applicant.phone
          ),
      };
    }

    current =
      current.previous;
  }

  return {
    name: "",
    email: "",
    phone: "",
  };
}

function successResponse(args: {
  admissionId: string;
  purchaseEventId: string;
  amountRupees: number;
  currency: string;
}) {
  const token =
    createAdmissionCompletionToken(
      args.admissionId
    );

  const response =
    NextResponse.json({
      ok: true,
      admissionId:
        args.admissionId,
      next:
        "/admission/complete",
      purchaseEventId:
        args.purchaseEventId,
      amountRupees:
        args.amountRupees,
      currency:
        args.currency,
    });

  response.cookies.set(
    "sd_admission_complete",
    token,
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge:
        2 * 60 * 60,
    }
  );

  return response;
}

type PurchaseRecord = {
  admissionId: string;
  paymentId: string;
  orderId: string;
  amountRupees: number;
  currency: string;
  raw: unknown;
  admissionName: string;
  admissionPhone: string;
};

async function dispatchPurchase(
  req: NextRequest,
  advertisingConsent: string,
  fbp: string | undefined,
  fbc: string | undefined,
  record: PurchaseRecord
) {
  const eventId =
    `sd_admission_purchase_${record.paymentId}`;

  const applicant =
    applicantFromRaw(
      record.raw
    );

  const name =
    applicant.name ||
    record.admissionName;

  const phone =
    applicant.phone ||
    record.admissionPhone;

  await sendMetaConversionEvent({
    req,
    eventName:
      "Purchase",
    eventId,
    advertisingConsent,
    eventSourceUrl:
      "https://sikhadenge.in/admission",
    user: {
      email:
        applicant.email,
      phone,
      firstName:
        name.split(/\s+/)[0],
      lastName:
        name
          .split(/\s+/)
          .slice(1)
          .join(" "),
      fbp,
      fbc,
    },
    customData: {
      content_name:
        "AI Expert Program",
      content_type:
        "product",
      currency:
        record.currency,
      value:
        record.amountRupees,
      order_id:
        record.orderId,
      payment_id:
        record.paymentId,
      admission_id:
        record.admissionId,
    },
  });

  return eventId;
}

export async function POST(
  req: NextRequest
) {
  try {
    const body =
      await req.json();

    const orderId =
      asString(
        body?.razorpay_order_id
      );

    const paymentId =
      asString(
        body?.razorpay_payment_id
      );

    const signature =
      asString(
        body?.razorpay_signature
      );

    const advertisingConsent =
      asString(
        body?.advertisingConsent
      );

    const fbp =
      asString(body?.fbp) ||
      undefined;

    const fbc =
      asString(body?.fbc) ||
      undefined;

    if (
      !orderId ||
      !paymentId ||
      !signature
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Missing payment verification fields",
        },
        {
          status: 400,
        }
      );
    }

    const keyId =
      String(
        process.env
          .RAZORPAY_KEY_ID ||
        ""
      ).trim();

    const keySecret =
      String(
        process.env
          .RAZORPAY_KEY_SECRET ||
        ""
      ).trim();

    if (
      !keyId ||
      !keySecret
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Payment configuration unavailable",
        },
        {
          status: 503,
        }
      );
    }

    if (
      !verifySignature(
        keySecret,
        orderId,
        paymentId,
        signature
      )
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Invalid payment signature",
        },
        {
          status: 400,
        }
      );
    }

    const existingPayment =
      await prisma.payment
        .findUnique({
          where: {
            razorpayPaymentId:
              paymentId,
          },
          select: {
            admissionId: true,
            razorpayPaymentId:
              true,
            razorpayOrderId:
              true,
            status: true,
            amount: true,
            currency: true,
            raw: true,
            admission: {
              select: {
                name: true,
                phone: true,
              },
            },
          },
        });

    if (
      existingPayment?.status ===
        "captured" &&
      existingPayment
        .admissionId &&
      existingPayment
        .razorpayPaymentId &&
      existingPayment
        .razorpayOrderId &&
      existingPayment.amount != null
    ) {
      if (
        existingPayment
          .razorpayOrderId !==
        orderId
      ) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Payment order mismatch",
          },
          {
            status: 409,
          }
        );
      }

      const purchaseEventId =
        await dispatchPurchase(
          req,
          advertisingConsent,
          fbp,
          fbc,
          {
            admissionId:
              existingPayment
                .admissionId,
            paymentId:
              existingPayment
                .razorpayPaymentId,
            orderId:
              existingPayment
                .razorpayOrderId,
            amountRupees:
              existingPayment.amount,
            currency:
              existingPayment.currency ||
              "INR",
            raw:
              existingPayment.raw,
            admissionName:
              existingPayment.admission
                ?.name || "",
            admissionPhone:
              existingPayment.admission
                ?.phone || "",
          }
        );

      return successResponse({
        admissionId:
          existingPayment
            .admissionId,
        purchaseEventId,
        amountRupees:
          existingPayment.amount,
        currency:
          existingPayment.currency ||
          "INR",
      });
    }

    const pendingPayment =
      await prisma.payment
        .findFirst({
          where: {
            razorpayOrderId:
              orderId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

    if (
      !pendingPayment ||
      !pendingPayment.admissionId ||
      pendingPayment.amount == null
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Payment order is not linked to an admission",
        },
        {
          status: 404,
        }
      );
    }

    const admission =
      await prisma.admission
        .findUnique({
          where: {
            id:
              pendingPayment
                .admissionId,
          },
          select: {
            id: true,
            name: true,
            phone: true,
            feeTotal: true,
            feePaid: true,
          },
        });

    if (
      !admission ||
      admission.feeTotal !==
        pendingPayment.amount
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Admission fee record mismatch",
        },
        {
          status: 409,
        }
      );
    }

    const razorpay =
      new Razorpay({
        key_id:
          keyId,
        key_secret:
          keySecret,
      });

    const gatewayPayment: any =
      await razorpay.payments
        .fetch(paymentId);

    const gatewayOrderId =
      asString(
        gatewayPayment
          ?.order_id
      );

    const gatewayCurrency =
      asString(
        gatewayPayment
          ?.currency
      ).toUpperCase();

    const gatewayStatus =
      asString(
        gatewayPayment
          ?.status
      ).toLowerCase();

    const gatewayAmountPaise =
      Number(
        gatewayPayment
          ?.amount
      );

    if (
      gatewayOrderId !==
      orderId
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Payment order mismatch",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Number.isFinite(
        gatewayAmountPaise
      ) ||
      gatewayAmountPaise !==
        pendingPayment.amount * 100
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Payment amount mismatch",
        },
        {
          status: 400,
        }
      );
    }

    if (
      gatewayCurrency !==
      "INR"
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Payment currency mismatch",
        },
        {
          status: 400,
        }
      );
    }

    if (
      gatewayStatus !==
      "captured"
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            `Payment is not captured yet (${gatewayStatus || "unknown"})`,
        },
        {
          status: 409,
        }
      );
    }

    try {
      await prisma.$transaction([
        prisma.payment.update({
          where: {
            id:
              pendingPayment.id,
          },
          data: {
            razorpayPaymentId:
              paymentId,
            razorpaySignature:
              signature,
            event:
              "checkout.verified",
            status:
              "captured",
            amount:
              pendingPayment.amount,
            currency:
              "INR",
            receivedAt:
              new Date(),
            raw:
              jsonSafe({
                callback: {
                  razorpay_order_id:
                    orderId,
                  razorpay_payment_id:
                    paymentId,
                  razorpay_signature:
                    signature,
                },
                gatewayPayment,
                previous:
                  pendingPayment.raw,
              }),
          },
        }),

        prisma.admission.update({
          where: {
            id:
              admission.id,
          },
          data: {
            feePaid:
              pendingPayment.amount,
          },
        }),
      ]);
    } catch (
      transactionError: any
    ) {
      if (
        transactionError?.code ===
        "P2002"
      ) {
        const duplicate =
          await prisma.payment
            .findUnique({
              where: {
                razorpayPaymentId:
                  paymentId,
              },
              select: {
                admissionId: true,
                razorpayPaymentId:
                  true,
                razorpayOrderId:
                  true,
                status: true,
                amount: true,
                currency: true,
                raw: true,
                admission: {
                  select: {
                    name: true,
                    phone: true,
                  },
                },
              },
            });

        if (
          duplicate?.status ===
            "captured" &&
          duplicate.admissionId &&
          duplicate
            .razorpayPaymentId &&
          duplicate
            .razorpayOrderId &&
          duplicate.amount != null
        ) {
          const purchaseEventId =
            await dispatchPurchase(
              req,
              advertisingConsent,
              fbp,
              fbc,
              {
                admissionId:
                  duplicate
                    .admissionId,
                paymentId:
                  duplicate
                    .razorpayPaymentId,
                orderId:
                  duplicate
                    .razorpayOrderId,
                amountRupees:
                  duplicate.amount,
                currency:
                  duplicate.currency ||
                  "INR",
                raw:
                  duplicate.raw,
                admissionName:
                  duplicate.admission
                    ?.name || "",
                admissionPhone:
                  duplicate.admission
                    ?.phone || "",
              }
            );

          return successResponse({
            admissionId:
              duplicate
                .admissionId,
            purchaseEventId,
            amountRupees:
              duplicate.amount,
            currency:
              duplicate.currency ||
              "INR",
          });
        }
      }

      throw transactionError;
    }

    const purchaseEventId =
      await dispatchPurchase(
        req,
        advertisingConsent,
        fbp,
        fbc,
        {
          admissionId:
            admission.id,
          paymentId,
          orderId,
          amountRupees:
            pendingPayment.amount,
          currency:
            "INR",
          raw:
            pendingPayment.raw,
          admissionName:
            admission.name,
          admissionPhone:
            admission.phone,
        }
      );

    return successResponse({
      admissionId:
        admission.id,
      purchaseEventId,
      amountRupees:
        pendingPayment.amount,
      currency:
        "INR",
    });
  } catch (error) {
    console.error(
      "ADMISSION_VERIFY_ERROR",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "Payment verification failed. Contact support with payment ID.",
      },
      {
        status: 500,
      }
    );
  }
}
