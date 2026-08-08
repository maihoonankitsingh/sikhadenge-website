import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

function cleanPhone(input: string) {
  return String(input || "").replace(/\D/g, "").slice(-10);
}

function getBaseUrl(req: Request) {
  const forwardedProto = req.headers.get("x-forwarded-proto");
  const forwardedHost = req.headers.get("x-forwarded-host");
  const host = forwardedHost || req.headers.get("host");

  if (host) {
    return `${forwardedProto || "https"}://${host}`;
  }

  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const slug = String(body?.slug || "").trim();
    const bumpSlug = String(body?.bumpSlug || "").trim();
    const includeBump = Boolean(body?.includeBump);

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const phone = cleanPhone(body?.phone || "");
    const age = String(body?.age || "").trim() || null;
    const source = String(body?.source || "store_checkout").trim();

    const utmSource = String(body?.utmSource || "").trim() || null;
    const utmMedium = String(body?.utmMedium || "").trim() || null;
    const utmCampaign = String(body?.utmCampaign || "").trim() || null;
    const utmContent = String(body?.utmContent || "").trim() || null;
    const utmTerm = String(body?.utmTerm || "").trim() || null;
    const utmId = String(body?.utmId || "").trim() || null;
    const gclid = String(body?.gclid || "").trim() || null;
    const fbclid = String(body?.fbclid || "").trim() || null;
    const msclkid = String(body?.msclkid || "").trim() || null;
    const utmCampaignId = String(body?.utmCampaignId || "").trim() || null;
    const utmAdsetId = String(body?.utmAdsetId || "").trim() || null;
    const utmAdId = String(body?.utmAdId || "").trim() || null;
    const landingPage = String(body?.landingPage || "").trim() || null;
    const referrer = String(body?.referrer || "").trim() || null;

    if (!slug) {
      return NextResponse.json({ success: false, error: "Missing product slug" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
    }

    if (phone.length !== 10) {
      return NextResponse.json({ success: false, error: "Valid 10-digit phone is required" }, { status: 400 });
    }

    const product = await prisma.storeProduct.findUnique({
      where: { slug },
    });

    if (!product || product.status !== "ACTIVE") {
      return NextResponse.json({ success: false, error: "Main product not available" }, { status: 404 });
    }

    let bumpProduct = null;
    if (includeBump && bumpSlug) {
      bumpProduct = await prisma.storeProduct.findUnique({
        where: { slug: bumpSlug },
      });

      if (!bumpProduct || bumpProduct.status !== "ACTIVE") {
        return NextResponse.json({ success: false, error: "Bump product not available" }, { status: 404 });
      }
    }

    const keyId = process.env.RAZORPAY_KEY_ID || "";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { success: false, error: "Razorpay keys are not configured" },
        { status: 500 }
      );
    }

    const baseAmount = Number(product.price || 0);
    const bumpAmount = bumpProduct ? Number(bumpProduct.price || 0) : 0;
    const subtotal = baseAmount + bumpAmount;
    const gstAmount = Number((subtotal * 0.18).toFixed(2));
    const totalAmount = Number((subtotal + gstAmount).toFixed(2));

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const shortSlug = String(product.slug || "item")
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 10)
      .toLowerCase();

    const ts = Date.now().toString().slice(-10);
    const rand = crypto.randomBytes(2).toString("hex");
    const receipt = `st_${shortSlug}_${ts}_${rand}`;

    console.log("STORE_CREATE_ORDER_INPUT", JSON.stringify({
      slug,
      bumpSlug,
      includeBump,
      name,
      email,
      phone,
      source,
      subtotal,
      gstAmount,
      totalAmount
    }));

    const order = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt,
      notes: {
        module: "store",
        productId: product.id,
        slug: product.slug,
        title: product.title,
        bumpProductId: bumpProduct?.id || "",
        bumpSlug: bumpProduct?.slug || "",
        age: age || "",
        utmId: utmId || "",
        gclid: gclid || "",
        fbclid: fbclid || "",
        msclkid: msclkid || "",
        utmCampaignId: utmCampaignId || "",
        utmAdsetId: utmAdsetId || "",
        utmAdId: utmAdId || "",
      },
    });

    const storeOrder = await prisma.storeOrder.create({
      data: {
        productId: product.id,
        bumpProductId: bumpProduct?.id || null,
        name,
        email: email || null,
        phone,
        amount: Math.round(totalAmount),
        baseAmount,
        bumpAmount: bumpProduct ? bumpAmount : 0,
        gstAmount,
        currency: "INR",
        paymentProvider: "razorpay",
        paymentOrderId: order.id,
        paymentStatus: "CREATED",
        pricingMeta: {
          subtotal,
          gstRate: 0.18,
          gstAmount,
          totalAmount,
          includeBump,
          age,
          utmId,
          gclid,
          fbclid,
          msclkid,
          utmCampaignId,
          utmAdsetId,
          utmAdId,
          landingPage,
          referrer,
        },
        source,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        referrer,
        age,
        gclid,
        fbclid,
        utmCampaignId,
        utmAdsetId,
        utmAdId,
        landingPage,
      },
    });

    console.log("STORE_CREATE_ORDER_OK", JSON.stringify({
      storeOrderId: storeOrder.id,
      paymentOrderId: order.id,
      amount: order.amount,
      productSlug: product.slug,
      bumpSlug: bumpProduct?.slug || null
    }));

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: keyId,
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: product.price,
      },
      bumpProduct: bumpProduct
        ? {
            id: bumpProduct.id,
            title: bumpProduct.title,
            slug: bumpProduct.slug,
            price: bumpProduct.price,
          }
        : null,
      pricing: {
        baseAmount,
        bumpAmount,
        subtotal,
        gstAmount,
        totalAmount,
      },
      storeOrderId: storeOrder.id,
      prefill: {
        name,
        email: email || "",
        contact: phone,
      },
      meta: {
        source,
      },
      successUrl: `${getBaseUrl(req)}/payment-success?storeOrderId=${storeOrder.id}`,
    });
  } catch (error: any) {
    console.error("STORE_CREATE_ORDER_ERROR", error?.message || error);
    return NextResponse.json(
      { success: false, error: "Unable to create store order" },
      { status: 500 }
    );
  }
}
