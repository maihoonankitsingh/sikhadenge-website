"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/analytics";
import {
  hasAdvertisingConsent,
  hasAnalyticsConsent,
} from "@/lib/consent";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  BadgeCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Workflow,
  Files,
  Mail,
  MessageCircle,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type Props = {
  product: {
    slug: string;
    title: string;
    category: string | null;
    shortDescription: string | null;
    price: number;
    compareAtPrice: number | null;
  };
};

type CreateOrderResponse = {
  success: boolean;
  key?: string;
  orderId?: string;
  amount?: number;
  currency?: string;
  storeOrderId?: string;
  successUrl?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  pricing?: {
    baseAmount?: number;
    bumpAmount?: number;
    subtotal?: number;
    gstAmount?: number;
    totalAmount?: number;
  };
  error?: string;
};

type VerifyPaymentResponse = {
  success: boolean;
  storeOrderId?: string;
  paymentStatus?: string;
  redirectUrl?: string;
  error?: string;
};

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);

    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function formatMoney(value: number) {
  return `₹${value.toFixed(2)}`;
}

async function verifyPaymentWithRetry(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) {
  let lastError = "Payment verification failed.";

  for (let i = 0; i < 2; i++) {
    try {
      const verifyRes = await fetch("/api/store/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const verifyData = (await verifyRes.json()) as VerifyPaymentResponse;

      if (verifyRes.ok && verifyData?.success) {
        return verifyData;
      }

      lastError = verifyData?.error || lastError;
    } catch (err: any) {
      lastError = err?.message || lastError;
    }

    await new Promise((r) => setTimeout(r, 800));
  }

  throw new Error(lastError);
}

type StoredCheckoutAttribution = Record<string, unknown>;

function readCheckoutTouch(
  key: string
): StoredCheckoutAttribution {
  try {
    const raw = window.localStorage.getItem(key);

    if (!raw) return {};

    const parsed = JSON.parse(raw);

    return parsed && typeof parsed === "object"
      ? (parsed as StoredCheckoutAttribution)
      : {};
  } catch {
    return {};
  }
}

function checkoutTouchString(
  value: StoredCheckoutAttribution,
  key: string
) {
  const candidate = value[key];

  return typeof candidate === "string"
    ? candidate.trim()
    : "";
}

function buildCheckoutAttribution() {
  const analyticsAllowed = hasAnalyticsConsent();
  const advertisingAllowed = hasAdvertisingConsent();

  const url = new URL(window.location.href);
  const safeUrl = new URL(url.toString());

  if (!advertisingAllowed) {
    safeUrl.searchParams.delete("fbclid");
    safeUrl.searchParams.delete("gclid");
    safeUrl.searchParams.delete("msclkid");
  }

  const firstTouch = analyticsAllowed
    ? readCheckoutTouch("sd_first_touch")
    : {};

  const lastTouch = analyticsAllowed
    ? readCheckoutTouch("sd_last_touch")
    : {};

  const pick = (
    params: string[],
    storedKey: string
  ) => {
    for (const key of params) {
      const current = url.searchParams.get(key)?.trim();

      if (current) return current;
    }

    return (
      checkoutTouchString(lastTouch, storedKey) ||
      checkoutTouchString(firstTouch, storedKey) ||
      ""
    );
  };

  return {
    utmSource: analyticsAllowed
      ? pick(["utm_source"], "utm_source")
      : "",

    utmMedium: analyticsAllowed
      ? pick(["utm_medium"], "utm_medium")
      : "",

    utmCampaign: analyticsAllowed
      ? pick(["utm_campaign"], "utm_campaign")
      : "",

    utmContent: analyticsAllowed
      ? pick(["utm_content"], "utm_content")
      : "",

    utmTerm: analyticsAllowed
      ? pick(["utm_term"], "utm_term")
      : "",

    utmId: analyticsAllowed
      ? pick(["utm_id"], "utm_id")
      : "",

    utmCampaignId: analyticsAllowed
      ? pick(
          ["utm_campaign_id", "campaign_id"],
          "utm_campaign_id"
        )
      : "",

    utmAdsetId: analyticsAllowed
      ? pick(
          ["utm_adset_id", "adset_id"],
          "utm_adset_id"
        )
      : "",

    utmAdId: analyticsAllowed
      ? pick(
          ["utm_ad_id", "ad_id"],
          "utm_ad_id"
        )
      : "",

    fbclid: advertisingAllowed
      ? pick(["fbclid"], "fbclid")
      : "",

    gclid: advertisingAllowed
      ? pick(["gclid"], "gclid")
      : "",

    msclkid: advertisingAllowed
      ? pick(["msclkid"], "msclkid")
      : "",

    landingPage: analyticsAllowed
      ? (
          checkoutTouchString(firstTouch, "landing_url") ||
          checkoutTouchString(lastTouch, "landing_url") ||
          safeUrl.toString()
        )
      : "",

    referrer: analyticsAllowed
      ? (
          checkoutTouchString(firstTouch, "referrer") ||
          checkoutTouchString(lastTouch, "referrer") ||
          document.referrer ||
          ""
        )
      : "",
  };
}

export default function CheckoutClient({ product }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [includeBump, setIncludeBump] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(214);

  const viewedRef = useRef(false);
  const checkoutRef = useRef(false);
  const addPaymentRef = useRef(false);
  const purchaseRef = useRef(false);

  const bumpSlug = "masterclass-upgrade-toolkit";
  const bumpPrice = 187;
  const bumpCompareAt = 7497;

  const baseAmount = useMemo(() => Number(product.price || 0), [product.price]);
  const bumpAmount = useMemo(() => (includeBump ? bumpPrice : 0), [includeBump]);
  const subtotal = useMemo(() => baseAmount + bumpAmount, [baseAmount, bumpAmount]);
  const gstAmount = useMemo(() => Number((subtotal * 0.18).toFixed(2)), [subtotal]);
  const total = useMemo(() => Number((subtotal + gstAmount).toFixed(2)), [subtotal, gstAmount]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timerText = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
    const secs = (secondsLeft % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }, [secondsLeft]);

  useEffect(() => {
    if (viewedRef.current) return;
    viewedRef.current = true;

      trackMetaEvent("ViewContent", {
        content_name: product.title,
        content_ids: [product.slug],
        content_type: "product",
        value: total,
        currency: "INR",
      });

      trackGoogleEvent("view_item", {
        currency: "INR",
        value: total,
        items: [
          {
            item_name: product.title,
            item_id: product.slug,
            price: baseAmount,
            quantity: 1,
          },
        ],
      });
  }, [product.title, product.slug, baseAmount, total]);

  useEffect(() => {
    if (step !== 2) return;
    if (checkoutRef.current) return;
    checkoutRef.current = true;

    trackMetaEvent("InitiateCheckout", {
      content_name: product.title,
      content_ids: [product.slug],
      content_type: "product",
      value: total,
      currency: "INR",
    });

    trackGoogleEvent("begin_checkout", {
      currency: "INR",
      value: total,
      items: [
        {
          item_name: product.title,
          item_id: product.slug,
          price: baseAmount,
          quantity: 1,
        },
        ...(includeBump
          ? [
              {
                item_name: "Masterclass Upgrade Toolkit",
                item_id: bumpSlug,
                price: bumpPrice,
                quantity: 1,
              },
            ]
          : []),
      ],
    });
  }, [step, product.title, product.slug, total, baseAmount, includeBump]);

  function validateStepOne() {
    const cleanPhone = phone.replace(/\D/g, "").slice(-10);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return false;
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return false;
    }
    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit WhatsApp number.");
      return false;
    }

    setError("");
    return true;
  }

  async function handlePay() {
    try {
      setError("");

      const cleanPhone = phone.replace(/\D/g, "").slice(-10);

      if (!validateStepOne()) {
        setStep(1);
        return;
      }

      if (!addPaymentRef.current) {
        addPaymentRef.current = true;

        trackMetaEvent("AddPaymentInfo", {
          content_name: product.title,
          content_ids: [product.slug],
          content_type: "product",
          value: total,
          currency: "INR",
        });

        trackGoogleEvent("add_payment_info", {
          currency: "INR",
          value: total,
          items: [
            {
              item_name: product.title,
              item_id: product.slug,
              price: baseAmount,
              quantity: 1,
            },
            ...(includeBump
              ? [
                  {
                    item_name: "Masterclass Upgrade Toolkit",
                    item_id: bumpSlug,
                    price: bumpPrice,
                    quantity: 1,
                  },
                ]
              : []),
          ],
        });
      }

      setLoading(true);

      const scriptOk = await loadRazorpayScript();
      if (!scriptOk) {
        setError("Razorpay checkout could not be loaded.");
        setLoading(false);
        return;
      }

      const attribution = buildCheckoutAttribution();

      const payload = {
        slug: product.slug,
        bumpSlug,
        includeBump,
        name: name.trim(),
        email: email.trim(),
        phone: cleanPhone,
        age,
        source: "store_checkout",
        ...attribution,
      };

      const res = await fetch("/api/store/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as CreateOrderResponse;

      if (!res.ok || !data.success || !data.orderId || !data.key || !data.amount || !data.currency) {
        setError(data?.error || "Unable to start payment.");
        setLoading(false);
        return;
      }

      const rz = new window.Razorpay({
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Sikhadenge",
        description: includeBump
          ? `${product.title} + Masterclass Upgrade Toolkit`
          : product.title,
        order_id: data.orderId,
        prefill: data.prefill || {
          name: name.trim(),
          email: email.trim(),
          contact: cleanPhone,
        },
        notes: {
          module: "store",
          slug: product.slug,
          bumpSlug: includeBump ? bumpSlug : "",
          age: age || "",
          includeBump: includeBump ? "true" : "false",
        },
        theme: {
          color: "#3267E3",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
          escape: false,
          backdropclose: false,
        },
        handler: async function (response: any) {
          try {
            console.log("RAZORPAY_HANDLER_HIT", {
              includeBump,
              orderId: response?.razorpay_order_id,
              paymentId: response?.razorpay_payment_id,
            });

            const verifyData = await verifyPaymentWithRetry({
              razorpay_order_id: response?.razorpay_order_id || "",
              razorpay_payment_id: response?.razorpay_payment_id || "",
              razorpay_signature: response?.razorpay_signature || "",
            });

            const transactionId =
              verifyData?.storeOrderId ||
              response?.razorpay_payment_id ||
              response?.razorpay_order_id ||
              "";

            if (!transactionId) {
              throw new Error("Verified payment is missing a transaction identifier.");
            }

            if (purchaseRef.current) return;
            purchaseRef.current = true;

            const purchaseEventId = `store_purchase_${transactionId}`;

            trackMetaEvent("Purchase", {
              content_name: includeBump
                ? `${product.title} + Masterclass Upgrade Toolkit`
                : product.title,
              content_ids: includeBump
                ? [product.slug, bumpSlug]
                : [product.slug],
              content_type: "product",
              value: total,
              currency: "INR",
            }, purchaseEventId);

            trackGoogleEvent("purchase", {
              transaction_id: transactionId,
              currency: "INR",
              value: total,
              items: [
                {
                  item_name: product.title,
                  item_id: product.slug,
                  price: baseAmount,
                  quantity: 1,
                },
                ...(includeBump
                  ? [
                      {
                        item_name: "Masterclass Upgrade Toolkit",
                        item_id: bumpSlug,
                        price: bumpPrice,
                        quantity: 1,
                      },
                    ]
                  : []),
              ],
            });

            const redirectUrl = verifyData?.storeOrderId
              ? `/checkout/welcome?storeOrderId=${verifyData.storeOrderId}`
              : "/checkout/welcome";

            window.location.href = redirectUrl;
          } catch (err: any) {
            console.error("RAZORPAY_HANDLER_VERIFY_FAIL", err?.message || err);
            setError(err?.message || "Payment verification failed.");
            setLoading(false);
          }
        },
      });

      rz.open();
      setLoading(false);
    } catch (err: any) {
      setError(err?.message || "Unable to start payment.");
      setLoading(false);
    }
  }

  const trustItems = [
    {
      title: "Your Data is Safe With Us",
      desc: "Protected process for your registration details.",
      Icon: ShieldCheck,
      iconBox: "bg-emerald-50 border-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "We Protect Your Privacy",
      desc: "Your personal details stay secure and controlled.",
      Icon: Lock,
      iconBox: "bg-blue-50 border-blue-100",
      iconColor: "text-[#3267E3]",
    },
    {
      title: "Secure Payment Process",
      desc: "Trusted online payment collection with verification.",
      Icon: CreditCard,
      iconBox: "bg-violet-50 border-violet-100",
      iconColor: "text-violet-600",
    },
    {
      title: "Registration Confirmation",
      desc: "After payment, your seat gets confirmed instantly.",
      Icon: BadgeCheck,
      iconBox: "bg-amber-50 border-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  const bonusItems = [
    {
      badge: "Bonus 1",
      title: "50+ easy to implement productivity hacks",
      value: "₹ 5,000",
    },
    {
      badge: "Bonus 2",
      title: "800+ premium customizable PPT templates",
      value: "₹ 3,000",
    },
    {
      badge: "Bonus 3",
      title: "Ebook on time management",
      value: "₹ 2,500",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <div className="bg-[#0B1220] px-4 py-3 text-center text-[12px] font-bold uppercase tracking-wide text-[#F5B301] sm:text-[13px]">
        Congrats! You are just one step away from mastering AI tools
      </div>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[15px] font-semibold text-slate-700 sm:text-[1rem]">
            Anyone from any field can attend this workshop.
          </p>

          <h1
            className="mx-auto mt-3 max-w-4xl font-bold tracking-tight text-slate-900"
            style={{ fontSize: "clamp(2rem, 5.2vw, 3.4rem)", lineHeight: "1.05" }}
          >
            {product.slug === "ai-prompt-starter-pack" ? (
              <>Book your masterclass in just <span className="text-red-600">₹9</span></>
            ) : (
              <>
                Simply Pay{" "}
                <span className="text-red-500 line-through">
                  {product.compareAtPrice ? `₹${product.compareAtPrice}` : "₹99"}
                </span>{" "}
                <span className="whitespace-nowrap text-[#3267E3]">₹{product.price}</span>{" "}
                <span className="whitespace-nowrap text-red-600">+ GST</span>{" "}
                <span>and Get Started</span>
              </>
            )}
          </h1>

          <p className="mt-4 text-base font-semibold text-slate-800 sm:text-[1.1rem]">
            Time is running out. Reserve your seat now!
          </p>

          <div className="mt-4 inline-flex items-center justify-center rounded-2xl bg-[#65C33B] px-5 py-3 text-xl font-black tracking-wider text-white shadow-sm sm:text-2xl">
            {timerText}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[460px]">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(2,6,23,0.08)]">
            <div className="bg-[#0B1220] px-6 py-7 text-center text-white">
              <div className="mx-auto inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 shadow-sm">
                <img
                  src="/brand/sikhadenge-header-safe-320.png?v=headersafe2-20260728"
                  alt="Sikhadenge"
                  className="block h-10 w-auto object-contain"
                />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                Sikhadenge Workshop Checkout
              </p>
            </div>

            <div className="px-5 py-6 sm:px-6">
              {step === 1 ? (
                <>
                  <div className="mb-5 text-center">
                    <h2 className="text-[1.3rem] font-bold text-slate-900">Register Your Seat</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Fill your details below to continue to the final payment step.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-900">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none placeholder:text-slate-400 transition focus:border-[#3267E3] focus:shadow-[0_0_0_4px_rgba(50,103,227,0.08)]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-900">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none placeholder:text-slate-400 transition focus:border-[#3267E3] focus:shadow-[0_0_0_4px_rgba(50,103,227,0.08)]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-900">
                        Mobile Number (WhatsApp Number) <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center overflow-hidden rounded-2xl border border-slate-300 bg-white transition focus-within:border-[#3267E3] focus-within:shadow-[0_0_0_4px_rgba(50,103,227,0.08)]">
                        <div className="border-r border-slate-200 px-4 py-3.5 text-sm font-semibold text-slate-700">
                          +91
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your WhatsApp number"
                          className="w-full px-4 py-3.5 text-sm outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>


                    <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      You will get updates on your WhatsApp and email.
                    </div>

                    {error ? (
                      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {error}
                      </div>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => {
                        if (validateStepOne()) setStep(2);
                      }}
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-[#3267E3] px-5 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(50,103,227,0.28)] transition hover:bg-[#2457D6] active:bg-[#1D4ED8]"
                    >
                      Next
                    </button>

                    <p className="text-center text-xs leading-5 text-slate-500">
                      By proceeding, you agree to our Terms, Privacy & Refund Policy.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
                    >
                      ← Back
                    </button>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-500">Final Step</p>
                      <p className="text-lg font-bold text-slate-900">Order Summary</p>
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-[#0B1220] p-5 text-white shadow-[0_16px_40px_rgba(11,18,32,0.18)]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                          Workshop Access
                        </p>
                        <h3 className="mt-2 text-lg font-bold">{product.title}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black">₹{product.price}</p>
                        <p className="text-xs text-slate-400">Base Price</p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Workshop Seat</span>
                        <span>{formatMoney(baseAmount)}</span>
                      </div>

                      {includeBump ? (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Upgrade Toolkit</span>
                          <span>{formatMoney(bumpAmount)}</span>
                        </div>
                      ) : null}

                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">GST @ 18%</span>
                        <span>{formatMoney(gstAmount)}</span>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-bold">
                        <span>Total Payable</span>
                        <span>{formatMoney(total)}</span>
                      </div>
                      <p className="text-xs text-slate-400">Inclusive of GST</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIncludeBump((v) => !v)}
                    className={`mt-5 w-full rounded-[24px] border p-5 text-left transition ${
                      includeBump
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border ${
                          includeBump
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-300 bg-white text-transparent"
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#0B1220] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#F5B301]">
                            Recommended Upgrade
                          </span>
                          <span className="text-sm font-semibold text-slate-500 line-through">
                            ₹{bumpCompareAt}
                          </span>
                          <span className="text-lg font-black text-[#3267E3]">₹{bumpPrice}</span>
                        </div>

                        <p className="mt-3 text-sm leading-7 text-slate-700">
                          84% of learners choose this upgrade to get faster implementation results after the masterclass.
                        </p>

                        <h3 className="mt-3 text-[1.02rem] font-bold leading-7 text-slate-900">
                          What You’ll Get Inside
                        </h3>

                        <div className="mt-4 space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                              <Sparkles className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold leading-7 text-slate-900">
                                50+ Automate Work with AI for Daily Tasks
                              </p>
                              <p className="text-sm leading-7 text-slate-600">
                                Ready practical systems to save time in content, research, business work, and execution.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                              <Zap className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold leading-7 text-slate-900">
                                999+ Premium Prompts & Power Hacks
                              </p>
                              <p className="text-sm leading-7 text-slate-600">
                                Better prompts for ChatGPT and AI tools so you can work faster with stronger quality output.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                              <Workflow className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold leading-7 text-slate-900">
                                n8n Beginner-to-Practical Guide
                              </p>
                              <p className="text-sm leading-7 text-slate-600">
                                Learn how to start building useful automations step by step after the workshop.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                              <Files className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold leading-7 text-slate-900">
                                Masterclass Recording Access
                              </p>
                              <p className="text-sm leading-7 text-slate-600">
                                Aapko is masterclass ki full recording bhi milegi, taaki aap baad me bhi properly revise kar sako.
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 text-sm font-semibold leading-7 text-slate-900">
                          You won’t see this special upgrade again after leaving this page.
                        </p>

                        <p className="mt-3 text-sm font-semibold text-emerald-700">
                          This will be delivered after the masterclass.
                        </p>
                      </div>
                    </div>
                  </button>

                  <div className="mt-5 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                    <p className="text-sm font-semibold text-slate-900">Confirmation Details</p>

                    <div className="mt-4 space-y-4">
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                            <Mail className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="break-all text-[0.98rem] font-medium text-slate-900">
                              {email}
                            </p>
                            <p className="mt-2 text-[0.9rem] leading-6 text-slate-500">
                              Once your payment is successful, you'll get confirmation on the above email id.
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-start gap-3">
                          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <MessageCircle className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[0.98rem] font-medium text-slate-900">
                              +91 {phone.replace(/\D/g, "").slice(-10)}
                            </p>
                            <p className="mt-2 text-[0.9rem] leading-6 text-slate-500">
                              All important details regarding the workshop will be sent to you on this WhatsApp number.
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
                          <div className="text-sm text-slate-600">
                            <span className="font-medium text-slate-900">Name:</span> {name}
                            <span className="mx-2 text-slate-300">•</span>
                            <span className="font-medium text-slate-900">Age:</span> {age}
                          </div>

                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-sm font-semibold text-slate-900 underline underline-offset-4"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {error ? (
                    <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                      </div>
                  ) : null}

                  <div className="mt-5 space-y-3">
                    <button
                      type="button"
                      onClick={handlePay}
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-[#3267E3] px-5 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(50,103,227,0.28)] transition hover:bg-[#2457D6] active:bg-[#1D4ED8] disabled:opacity-70"
                    >
                      {loading ? "Please wait..." : `Pay ${formatMoney(total)}`}
                    </button>

                    <p className="text-center text-xs leading-5 text-slate-500">
                      Secure payment checkout. After successful payment, your registration will be confirmed.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <h2
            className="mx-auto max-w-4xl text-center font-bold tracking-tight text-slate-900"
            style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)", lineHeight: "1.15" }}
          >
            Also, register before the deadline to unlock bonuses worth ₹10,500!
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {bonusItems.map((item) => (
              <div
                key={item.badge}
                className="flex flex-col rounded-[24px] border border-slate-200 bg-white px-6 py-6 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
              >
                <div className="flex justify-center">
                  <div className="inline-flex rounded-2xl bg-[#0B1220] px-5 py-2.5 text-[0.98rem] font-bold text-[#00FF85] shadow-sm">
                    {item.badge}
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-center py-8">
                  <p className="max-w-[250px] text-[1rem] leading-8 text-slate-700">
                    {item.title}
                  </p>
                </div>

                <div>
                  <p className="text-[1.55rem] font-black leading-none text-red-600">
                    Value: {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-7 max-w-4xl text-center text-[1rem] leading-8 text-slate-700 sm:text-[1.1rem]">
            By the end of this workshop, you will also get a completion certificate by Sikhadenge.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.Icon;

            return (
              <div
                key={item.title}
                className="flex flex-col items-center rounded-[22px] border border-slate-200 bg-white px-5 py-6 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
              >
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-[20px] border ${item.iconBox} shadow-sm`}
                >
                  <Icon className={`h-6 w-6 ${item.iconColor}`} strokeWidth={2.1} />
                </div>

                <div className="mt-4">
                  <h3 className="mx-auto max-w-[220px] text-[0.95rem] font-bold leading-7 text-slate-900">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-3">
                  <p className="mx-auto max-w-[220px] text-[0.92rem] leading-7 text-slate-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
