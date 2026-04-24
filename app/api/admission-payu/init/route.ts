export const revalidate = 0;
import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sha512(v: string) {
  return crypto.createHash("sha512").update(v).digest("hex").toLowerCase();
}

function clean(s: any) {
  return String(s ?? "").trim();
}

function onlyDigits(s: string) {
  return s.replace(/\D/g, "");
}

function formatAmount(n: number) {
  return n.toFixed(2);
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Send JSON with Content-Type: application/json" },
        { status: 415 }
      );
    }

    const body = await req.json();

    const name = clean(body?.name);
    const fatherName = clean(body?.fatherName);
    const phoneRaw = clean(body?.phone ?? body?.whatsapp);
    const email = clean(body?.email).toLowerCase();
    const gender = clean(body?.gender);
    const course = clean(body?.course) || "AI Expert Program";
    const address1 = clean(body?.address1);

    if (!name || !fatherName || !phoneRaw || !email) {
      return NextResponse.json(
        { ok: false, error: "name, fatherName, phone, email required" },
        { status: 400 }
      );
    }

    let phone = onlyDigits(phoneRaw);
    if (phone.length > 10) phone = phone.slice(-10);
    if (phone.length !== 10) {
      return NextResponse.json({ ok: false, error: "Valid 10-digit phone required" }, { status: 400 });
    }

    const amountRaw = Number(body?.amountRupees ?? body?.amount ?? 4999);
    const amountNum = Number.isFinite(amountRaw) ? Math.floor(amountRaw) : 4999;
    if (amountNum < 1 || amountNum > 200000) {
      return NextResponse.json({ ok: false, error: "Invalid amount" }, { status: 400 });
    }
    const amount = formatAmount(amountNum);

    const key = clean(process.env.PAYU_KEY);
    const salt = clean(process.env.PAYU_SALT);
    const baseUrl = clean(process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL);
    const payuBase = clean(process.env.PAYU_BASE_URL || "https://secure.payu.in");

    if (!key || !salt) {
      return NextResponse.json({ ok: false, error: "PAYU_KEY / PAYU_SALT missing" }, { status: 500 });
    }
    if (!baseUrl) {
      return NextResponse.json({ ok: false, error: "NEXT_PUBLIC_APP_URL or APP_URL missing" }, { status: 500 });
    }

    const txnid = `sdpayu_${Date.now()}`;
    const productinfo = "Course Admission";

    let admissionId: string | null = null;
    try {
      const admission = await prisma.admission.create({
        data: {
          name,
          phone,
          course,
          feeTotal: amountNum,
          feePaid: 0,
        },
        select: { id: true },
      });
      admissionId = admission.id;
    } catch (e) {
      console.error("PAYU_ADMISSION_DB_SAVE_ERROR", e);
    }

    const udf1 = admissionId || "";
    const udf2 = fatherName;
    const udf3 = gender;
    const udf4 = course;
    const udf5 = address1;

    const hashString =
      `${key}|${txnid}|${amount}|${productinfo}|${name}|${email}|` +
      `${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;

    const hash = sha512(hashString);

    const surl = `${baseUrl}/api/admission-payu/response`;
    const furl = `${baseUrl}/api/admission-payu/response`;

    return NextResponse.json({
      ok: true,
      payuBase,
      form: {
        key,
        txnid,
        amount,
        productinfo,
        firstname: name,
        email,
        phone,
        surl,
        furl,
        hash,
        udf1,
        udf2,
        udf3,
        udf4,
        udf5
      },
      admissionId
    });
  } catch (e: any) {
    console.error("PAYU_INIT_API_ERROR", e);
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
