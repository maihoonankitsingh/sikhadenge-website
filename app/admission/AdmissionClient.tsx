"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import {
  hasAdvertisingConsent,
} from "@/lib/consent";
import {
  readMetaBrowserIdentifiers,
  trackMetaEvent,
} from "@/lib/metaPixel";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CHECKOUT_SCRIPT =
  "https://checkout.razorpay.com/v1/checkout.js";

const MIN_PAYMENT_RUPEES = 1000;
const MAX_PAYMENT_RUPEES = 100000;

function formatRupees(value: number) {
  const amount = Number.isFinite(value)
    ? Math.max(0, Math.floor(value))
    : 0;

  return `₹${new Intl.NumberFormat(
    "en-IN"
  ).format(amount)}`;
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    let settled = false;

    const finish = (result: boolean) => {
      if (settled) return;

      settled = true;
      resolve(result);
    };

    const existing =
      document.querySelector<HTMLScriptElement>(
        `script[src="${CHECKOUT_SCRIPT}"]`
      );

    if (!existing) {
      const script =
        document.createElement("script");

      script.src = CHECKOUT_SCRIPT;
      script.async = true;
      script.onload = () =>
        finish(Boolean(window.Razorpay));
      script.onerror = () => finish(false);

      document.body.appendChild(script);
    }

    const interval = window.setInterval(() => {
      if (window.Razorpay) {
        window.clearInterval(interval);
        finish(true);
      }
    }, 100);

    window.setTimeout(() => {
      window.clearInterval(interval);
      finish(Boolean(window.Razorpay));
    }, 12000);
  });
}

async function readResponse(response: Response) {
  const data = await response
    .json()
    .catch(() => null);

  if (!response.ok || !data?.ok) {
    throw new Error(
      data?.error ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
}

export default function AdmissionClient() {
  const [loading, setLoading] =
    useState(false);

  const [pageError, setPageError] =
    useState("");

  const [paymentAmount, setPaymentAmount] =
    useState("");

  const paymentAmountNumber =
    Number(paymentAmount);

  const paymentAmountIsValid =
    Number.isInteger(paymentAmountNumber) &&
    paymentAmountNumber >=
      MIN_PAYMENT_RUPEES &&
    paymentAmountNumber <=
      MAX_PAYMENT_RUPEES;

  async function onSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setPageError("");

    try {
      if (!paymentAmountIsValid) {
        throw new Error(
          "Enter a whole payment amount between ₹1,000 and ₹1,00,000"
        );
      }

      const formData = new FormData(
        event.currentTarget
      );

      const payload = {
        name: String(
          formData.get("name") || ""
        ).trim(),

        fatherName: String(
          formData.get("fatherName") || ""
        ).trim(),

        phone: String(
          formData.get("phone") || ""
        ).trim(),

        email: String(
          formData.get("email") || ""
        ).trim(),

        gender: String(
          formData.get("gender") || ""
        ).trim(),

        address1: String(
          formData.get("address1") || ""
        ).trim(),

        amountRupees:
          paymentAmountNumber,
        advertisingConsent:
          hasAdvertisingConsent()
            ? "granted"
            : "denied",
        ...readMetaBrowserIdentifiers(),
      };

      const razorpayLoaded =
        await loadRazorpay();

      if (!razorpayLoaded) {
        throw new Error(
          "Razorpay checkout could not load. Disable blocking extensions and retry."
        );
      }

      const initResponse = await fetch(
        "/api/admission",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data =
        await readResponse(initResponse);

      if (
        !data.keyId ||
        !data.orderId ||
        !data.admissionId ||
        !data.amount
      ) {
        throw new Error(
          "Incomplete payment order response"
        );
      }

      if (
        Number(data.amountRupees) !==
          paymentAmountNumber ||
        Number(data.amount) !==
          paymentAmountNumber * 100
      ) {
        throw new Error(
          "Payment amount response mismatch"
        );
      }

      if (
        data.registrationEventId
      ) {
        trackMetaEvent(
          "CompleteRegistration",
          {
            content_name:
              data.course ||
              "AI Expert Program",
            content_type:
              "product",
            status:
              "registered",
            currency:
              data.currency ||
              "INR",
            value:
              Number(
                data.amountRupees
              ) ||
              paymentAmountNumber,
          },
          String(
            data.registrationEventId
          )
        );
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency:
          data.currency || "INR",
        name: "SikhaDenge",
        description:
          "AI Expert Program Admission",
        order_id: data.orderId,

        prefill: {
          name: payload.name,
          email:
            payload.email || undefined,
          contact: payload.phone,
        },

        notes: {
          admissionId:
            data.admissionId,
          fatherName:
            payload.fatherName,
          selectedAmountRupees:
            String(
              paymentAmountNumber
            ),
        },

        handler: async (
          paymentResponse: any
        ) => {
          setLoading(true);
          setPageError("");

          try {
            const verifyResponse =
              await fetch(
                "/api/admission/verify",
                {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify({
                    ...paymentResponse,
                    advertisingConsent:
                      hasAdvertisingConsent()
                        ? "granted"
                        : "denied",
                    ...readMetaBrowserIdentifiers(),
                  }),
                }
              );

            const verifyData =
              await readResponse(
                verifyResponse
              );

            if (
              verifyData.purchaseEventId
            ) {
              trackMetaEvent(
                "Purchase",
                {
                  content_name:
                    data.course ||
                    "AI Expert Program",
                  content_type:
                    "product",
                  currency:
                    verifyData.currency ||
                    "INR",
                  value:
                    Number(
                      verifyData
                        .amountRupees
                    ) ||
                    paymentAmountNumber,
                  order_id:
                    paymentResponse
                      .razorpay_order_id,
                },
                String(
                  verifyData
                    .purchaseEventId
                )
              );
            }

            window.location.assign(
              `/admission/complete?orderId=${encodeURIComponent(
                paymentResponse
                  .razorpay_order_id
              )}&paymentId=${encodeURIComponent(
                paymentResponse
                  .razorpay_payment_id
              )}`
            );
          } catch (error) {
            setLoading(false);

            setPageError(
              error instanceof Error
                ? error.message
                : "Payment verification failed"
            );
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        theme: {
          color: "#2563EB",
        },
      };

      const checkout =
        new window.Razorpay(options);

      checkout.on(
        "payment.failed",
        (response: any) => {
          setLoading(false);

          setPageError(
            response?.error
              ?.description ||
              "Payment failed. No admission payment was confirmed."
          );
        }
      );

      checkout.open();
    } catch (error) {
      setLoading(false);

      setPageError(
        error instanceof Error
          ? error.message
          : "Payment could not be started"
      );
    }
  }

  const inputClass =
    "mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-[15px] font-medium text-slate-950 outline-none transition duration-200 placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  const labelClass =
    "block text-[13px] font-semibold tracking-[0.01em] text-slate-700";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f7fb] px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-blue-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-72 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <header
          data-admission-security-hero="v7"
          className="relative min-h-[270px] overflow-hidden rounded-[30px] border border-white/10 bg-[#061333] text-white shadow-[0_24px_70px_-38px_rgba(15,23,42,0.85)] sm:min-h-[280px] lg:min-h-[285px]"
        >
          {/* ADMISSION_SINGLE_PNG_HERO_V7 */}

                    <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/admission/admission-hero-background.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[#061333]/35 lg:bg-transparent"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,18,47,0.42)_0%,rgba(5,18,47,0.24)_34%,rgba(5,18,47,0.08)_55%,transparent_76%)]"
            />
          </div>

<div className="relative z-10 grid min-h-[270px] items-center gap-5 px-6 py-6 sm:min-h-[280px] sm:px-8 sm:py-7 lg:min-h-[285px] lg:grid-cols-[minmax(0,1.18fr)_minmax(260px,0.72fr)] lg:px-10 lg:py-7">
            <div className="max-w-[680px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-100 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                Secure admission checkout
              </div>

              <h1 className="mt-3 max-w-[650px] text-3xl font-bold leading-[1.06] tracking-[-0.035em] text-white sm:text-[2.35rem] lg:text-[2.65rem]">
                Complete your admission with confidence.
                <span className="ml-2 text-sky-400 sm:block sm:ml-0 sm:mt-1">
                  Pay securely.
                </span>
              </h1>

              <p className="mt-3 max-w-[620px] text-[13px] leading-5 text-slate-300 sm:text-sm sm:leading-6">
                Add your student details, choose the approved payment
                amount and continue through Razorpay&apos;s protected
                checkout.
              </p>

                            <div
                className="mt-5 grid max-w-2xl grid-cols-3 gap-2.5 sm:gap-3"
                data-admission-hero-steps="premium-v1"
              >
                <div className="relative min-h-[62px] overflow-hidden rounded-[18px] border border-sky-300/70 bg-gradient-to-br from-blue-500/35 via-blue-500/20 to-indigo-500/20 px-3.5 py-3 shadow-[0_16px_34px_-22px_rgba(56,189,248,0.95),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-sky-400/10 sm:min-h-[68px]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute -right-6 -top-8 h-16 w-16 rounded-full bg-sky-400/20 blur-2xl"
                  />

                  <div className="relative">
                    <div className="text-[10px] font-extrabold tracking-[0.09em] text-sky-200">
                      01
                    </div>

                    <div className="mt-1 text-sm font-extrabold tracking-tight text-white">
                      Details
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[62px] overflow-hidden rounded-[18px] border border-blue-200/15 bg-gradient-to-br from-white/10 via-white/[0.07] to-blue-500/10 px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-white/5 sm:min-h-[68px]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />

                  <div className="relative">
                    <div className="text-[10px] font-extrabold tracking-[0.09em] text-blue-200/90">
                      02
                    </div>

                    <div className="mt-1 text-sm font-extrabold tracking-tight text-white">
                      Payment
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[62px] overflow-hidden rounded-[18px] border border-blue-200/15 bg-gradient-to-br from-white/10 via-white/[0.07] to-indigo-500/10 px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-white/5 sm:min-h-[68px]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />

                  <div className="relative">
                    <div className="text-[10px] font-extrabold tracking-[0.09em] text-blue-200/90">
                      03
                    </div>

                    <div className="mt-1 text-sm font-extrabold tracking-tight text-white">
                      KYC
                    </div>
                  </div>
                </div>
              </div>

                            <div
                className="mt-3.5 inline-flex items-center gap-3 rounded-[18px] border border-blue-200/15 bg-gradient-to-r from-white/10 via-blue-400/[0.08] to-white/[0.06] px-3 py-2.5 shadow-[0_14px_34px_-24px_rgba(56,189,248,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl"
                data-admission-trust-badge="premium-v1"
              >
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="absolute inset-1 rounded-full bg-sky-400/50 blur-md"
                  />

                  <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-sky-200/70 bg-gradient-to-br from-sky-300 via-blue-600 to-indigo-900 text-white shadow-[0_9px_20px_-7px_rgba(56,189,248,0.95),inset_0_2px_0_rgba(255,255,255,0.75),inset_0_-7px_13px_rgba(30,27,75,0.58)] ring-1 ring-blue-300/30">
                    <span
                      aria-hidden="true"
                      className="absolute -left-2 -top-3 h-6 w-10 rotate-[-20deg] rounded-full bg-white/40 blur-sm"
                    />

                    <svg
                      aria-hidden="true"
                      className="relative h-5 w-5 drop-shadow-[0_2px_2px_rgba(15,23,42,0.5)]"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 3 5.5 5.8v5.5c0 4.1 2.7 7.8 6.5 9.2 3.8-1.4 6.5-5.1 6.5-9.2V5.8L12 3Z"
                        fill="currentColor"
                        fillOpacity="0.18"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                      />

                      <path
                        d="m8.8 12.1 2.1 2.1 4.5-4.7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.3"
                      />
                    </svg>
                  </span>
                </span>

                <span className="text-sm font-medium text-slate-200">
                  Trusted by{" "}
                  <strong className="font-extrabold text-white">
                    150,000+ learners
                  </strong>
                </span>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="hidden min-h-[220px] lg:block"
            />
          </div>
        </header>

        <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1fr)_400px]">
          <section className="overflow-hidden rounded-[32px] border border-blue-100/80 bg-white shadow-[0_34px_100px_-48px_rgba(15,23,42,0.62)] ring-1 ring-white">
              <div
                className="relative overflow-hidden border-b border-blue-100/80 bg-gradient-to-br from-white via-blue-50/80 to-indigo-50/90 px-6 py-6 sm:px-8 sm:py-7"
                data-admission-student-header="premium-v3"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-blue-300/30 blur-3xl"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-28 left-20 h-48 w-48 rounded-full bg-indigo-300/25 blur-3xl"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white to-transparent"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
                />

                <div className="relative flex items-start gap-5">
                  <div className="relative h-[68px] w-[68px] shrink-0">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-2 -bottom-2 h-5 rounded-full bg-blue-950/30 blur-lg"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 translate-y-1.5 rounded-[23px] bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-950"
                    />

                    <div className="relative flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-[23px] border border-white/70 bg-gradient-to-br from-sky-300 via-blue-600 to-indigo-900 shadow-[0_20px_38px_-12px_rgba(37,99,235,0.95),inset_0_2px_0_rgba(255,255,255,0.8),inset_0_-14px_25px_rgba(30,27,75,0.48)] ring-1 ring-blue-500/30">
                      <span
                        aria-hidden="true"
                        className="absolute -left-5 -top-7 h-16 w-24 rotate-[-22deg] rounded-full bg-white/35 blur-md"
                      />

                      <span
                        aria-hidden="true"
                        className="absolute bottom-2 right-2 h-6 w-6 rounded-full bg-indigo-950/30 blur-sm"
                      />

                      <svg
                        aria-hidden="true"
                        className="relative h-9 w-9 text-white drop-shadow-[0_4px_4px_rgba(15,23,42,0.48)]"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 12.2a4.1 4.1 0 1 0 0-8.2 4.1 4.1 0 0 0 0 8.2Z"
                          fill="currentColor"
                        />

                        <path
                          d="M4.8 20c.55-3.45 3.25-5.55 7.2-5.55s6.65 2.1 7.2 5.55"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2.25"
                        />
                      </svg>

                      <span
                        aria-hidden="true"
                        className="absolute bottom-2 h-1 w-9 rounded-full bg-white/20"
                      />
                    </div>

                    <div className="absolute -bottom-2 -right-2 flex h-8 min-w-8 items-center justify-center rounded-[13px] border-2 border-white bg-gradient-to-br from-amber-300 via-orange-400 to-orange-600 px-1.5 text-[10px] font-black text-slate-950 shadow-[0_9px_18px_-6px_rgba(234,88,12,0.9),inset_0_1px_0_rgba(255,255,255,0.85)]">
                      01
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2.5 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full border border-blue-200/80 bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-blue-700 shadow-sm backdrop-blur">
                        Admission details
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/90 bg-emerald-50/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700 shadow-sm">
                        <svg
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 3 5.5 5.8v5.5c0 4.1 2.7 7.8 6.5 9.2 3.8-1.4 6.5-5.1 6.5-9.2V5.8L12 3Z"
                            fill="currentColor"
                            fillOpacity="0.14"
                            stroke="currentColor"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                          />

                          <path
                            d="m9 12 2 2 4-4"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>

                        Secure verification
                      </span>
                    </div>

                    <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-slate-950 sm:text-2xl">
                      Student information
                    </h2>

                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-600">
                      Enter accurate information for the admission and
                      verification record.
                    </p>
                  </div>

                  <div className="hidden shrink-0 sm:block">
                    <div className="rounded-2xl border border-white/90 bg-white/80 px-3.5 py-2.5 text-right shadow-[0_14px_30px_-19px_rgba(30,64,175,0.75)] backdrop-blur">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                        Application
                      </div>

                      <div className="mt-1 flex items-center justify-end gap-1.5 text-xs font-bold text-blue-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />

                        In progress
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            <form
              className="space-y-7 px-6 py-7 sm:px-8 sm:py-8"
              onSubmit={onSubmit}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <label className={labelClass}>
                  Student full name
                  <span className="ml-1 text-red-500">
                    *
                  </span>

                  <input
                    className={inputClass}
                    name="name"
                    placeholder="Enter full name"
                    autoComplete="name"
                    minLength={2}
                    maxLength={120}
                    required
                  />
                </label>

                <label className={labelClass}>
                  Father&apos;s name
                  <span className="ml-1 text-red-500">
                    *
                  </span>

                  <input
                    className={inputClass}
                    name="fatherName"
                    placeholder="Enter father name"
                    minLength={2}
                    maxLength={120}
                    required
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className={labelClass}>
                  WhatsApp number
                  <span className="ml-1 text-red-500">
                    *
                  </span>

                  <input
                    className={inputClass}
                    name="phone"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="10-digit mobile number"
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    required
                  />
                </label>

                <label className={labelClass}>
                  Email address

                  <input
                    className={inputClass}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    maxLength={160}
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className={labelClass}>
                  Gender

                  <select
                    className={inputClass}
                    name="gender"
                    defaultValue=""
                  >
                    <option value="">
                      Select gender
                    </option>
                    <option value="Male">
                      Male
                    </option>
                    <option value="Female">
                      Female
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </label>

                <label className={labelClass}>
                  Selected program

                  <input
                    className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-600`}
                    value="AI Expert Program"
                    readOnly
                  />
                </label>
              </div>

              <label className={labelClass}>
                Current address

                {/* ADMISSION_ADDRESS_SINGLE_LINE_V2 */}
<input
                  className={inputClass}
                    type="text"
                  name="address1"
                  placeholder="House, street, city and state"
                  maxLength={500}
                />
              </label>

              <div className="rounded-[26px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 sm:p-6">
                {/* PAYMENT_CARD_SPACING_LITERAL_V3 */}
                <div className="relative">
                  <div className="pr-0 sm:pr-36">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                      Editable payment amount
                    </div>

                    <h3 className="mt-2 text-lg font-bold text-slate-950">
                      Enter the amount you want to pay
                    </h3>

                    {/* PAYMENT_RANGE_DESCRIPTION_REMOVED_V2 */}
                  </div>

                  {/* ADMISSION_FLEXIBLE_PAYMENT_UI_V1 */}
                  <div className="mt-4 w-fit rounded-2xl border border-white bg-white px-4 py-3 shadow-sm sm:absolute sm:right-0 sm:top-0 sm:mt-0">
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-600">
                      Flexible
                    </div>

                    <div className="mt-1 whitespace-nowrap text-sm font-bold text-slate-950">
                      Full / installment
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className={labelClass}>
                    Payment amount

                    <div className="relative mt-2">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex w-14 items-center justify-center border-r border-slate-200 text-lg font-bold text-slate-500">
                        ₹
                      </span>

                      <input
                        className={`h-14 w-full rounded-2xl border bg-white pl-17 pr-4 text-xl font-bold text-slate-950 outline-none transition focus:ring-4 ${
                          paymentAmount === "" ||
                          paymentAmountIsValid
                            ? "border-blue-200 focus:border-blue-500 focus:ring-blue-100"
                            : "border-red-300 focus:border-red-500 focus:ring-red-100"
                        }`}
                        style={{
                          paddingLeft: "4.25rem",
                        }}
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter amount"
                        value={paymentAmount}
                        onChange={(event) => {
                          const digits =
                            event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 6);

                          setPaymentAmount(
                            digits
                          );

                          setPageError("");
                        }}
                        aria-invalid={
                          paymentAmount !== "" &&
                          !paymentAmountIsValid
                        }
                        required
                      />
                    </div>
                  </label>

                    {/* PAYMENT_PRESET_BUTTONS_REMOVED_V1 */}

                  {paymentAmount !== "" &&
                  !paymentAmountIsValid ? (
                    <p className="mt-3 text-xs font-semibold text-red-600">
                      Enter a whole amount from ₹1,000 to ₹1,00,000.
                    </p>
                  ) : null}
                </div>
              </div>

              {pageError ? (
                <div
                  role="alert"
                  aria-live="polite"
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-semibold leading-6 text-red-700"
                >
                  {pageError}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={
                  loading ||
                  !paymentAmountIsValid
                }
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 text-sm font-bold text-white shadow-[0_18px_38px_-18px_rgba(37,99,235,0.9)] transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Preparing secure checkout..."
                  : paymentAmountIsValid
                    ? `Pay ${formatRupees(
                        paymentAmountNumber
                      )} securely`
                    : "Enter payment amount"}

                {!loading ? (
                  <span className="text-lg transition group-hover:translate-x-1">
                    →
                  </span>
                ) : null}
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                By continuing, you agree to the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-slate-700 underline underline-offset-2"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-slate-700 underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </section>

          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <div className="overflow-hidden rounded-[30px] bg-slate-950 text-white shadow-[0_28px_80px_-38px_rgba(15,23,42,0.9)]">
              <div className="bg-gradient-to-br from-blue-600/35 to-transparent p-6 sm:p-7">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-300">
                  Payment summary
                </div>

                <h2 className="mt-3 text-2xl font-bold tracking-tight">
                  AI Expert Program
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Live guided learning with protected payment and
                  admission verification.
                </p>

                <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400">
                      Duration
                    </span>
                    <span className="font-semibold">
                      8 weeks
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400">
                      Mode
                    </span>
                    <span className="font-semibold">
                      Live online
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400">
                      Payment option
                    </span>
                    <span className="font-semibold">
                      Full or installment
                    </span>
                  </div>
                </div>

                <div className="my-6 h-px bg-white/10" />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium text-slate-400">
                      Amount payable now
                    </div>

                    <div className="mt-1 text-xs font-semibold text-emerald-300">
                      Editable and server validated
                    </div>
                  </div>

                  <div className="text-right text-3xl font-bold tracking-tight">
                    {paymentAmountIsValid
                      ? formatRupees(
                          paymentAmountNumber
                        )
                      : "—"}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_22px_65px_-44px_rgba(15,23,42,0.6)]">
              <h3 className="text-base font-bold text-slate-950">
                Payment protection
              </h3>

              <div className="mt-5 space-y-4">
                {[
                  "Selected amount is validated again on the server.",
                  "Payment amount and status are checked directly with Razorpay.",
                  "Payment, order and admission IDs must match.",
                  "KYC files remain outside the public website folder.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-black text-emerald-700">
                      ✓
                    </div>

                    <p className="text-sm leading-6 text-slate-600">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-blue-100 bg-blue-50 p-5">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">
                Accepted range
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Payment amount can be entered from ₹1,000 up to
                ₹1,00,000 in whole rupees.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
