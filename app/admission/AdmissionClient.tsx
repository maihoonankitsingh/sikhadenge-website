"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CHECKOUT_SCRIPT =
  "https://checkout.razorpay.com/v1/checkout.js";

const DEFAULT_PAYMENT_RUPEES = 6999;
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
    useState(
      String(DEFAULT_PAYMENT_RUPEES)
    );

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
                  body: JSON.stringify(
                    paymentResponse
                  ),
                }
              );

            await readResponse(
              verifyResponse
            );

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

              <div className="mt-4 grid max-w-[520px] grid-cols-3 gap-2">
                {[
                  ["01", "Details"],
                  ["02", "Payment"],
                  ["03", "KYC"],
                ].map(([number, title], index) => (
                  <div
                    key={number}
                    className={`rounded-xl border px-3 py-2 ${
                      index === 0
                        ? "border-sky-400/45 bg-blue-600/25"
                        : "border-white/10 bg-white/[0.06]"
                    }`}
                  >
                    <div className="text-[9px] font-semibold text-blue-300">
                      {number}
                    </div>

                    <div className="mt-0.5 text-[11px] font-semibold text-white sm:text-xs">
                      {title}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-slate-200 backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 font-semibold text-sky-300">
                  ✓
                </span>

                <span>
                  Trusted by{" "}
                  <strong className="font-semibold text-white">
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
          <section className="overflow-hidden rounded-[30px] border border-white bg-white/95 shadow-[0_26px_80px_-48px_rgba(15,23,42,0.6)] backdrop-blur">
            <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-base font-bold text-blue-700">
                  01
                </div>

                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-950">
                    Student information
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Enter accurate information for the admission and
                    verification record.
                  </p>
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

                <textarea
                  className="mt-2 min-h-28 w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] font-medium text-slate-950 outline-none transition placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  name="address1"
                  placeholder="House, street, city and state"
                  maxLength={500}
                />
              </label>

              <div className="rounded-[26px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                      Editable payment amount
                    </div>

                    <h3 className="mt-2 text-lg font-bold text-slate-950">
                      Enter the amount you want to pay
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                      The default amount is ₹6,999. You can edit it
                      between ₹1,000 and ₹1,00,000.
                    </p>
                  </div>

                  <div className="shrink-0 rounded-2xl border border-white bg-white px-4 py-3 shadow-sm">
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      Default
                    </div>

                    <div className="mt-1 text-lg font-bold text-slate-950">
                      ₹6,999
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <label className={labelClass}>
                    Payment amount

                    <div className="relative mt-2">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex w-14 items-center justify-center border-r border-slate-200 text-lg font-bold text-slate-500">
                        ₹
                      </span>

                      <input
                        className={`h-14 w-full rounded-2xl border bg-white pl-17 pr-4 text-xl font-bold text-slate-950 outline-none transition focus:ring-4 ${
                          paymentAmountIsValid
                            ? "border-blue-200 focus:border-blue-500 focus:ring-blue-100"
                            : "border-red-300 focus:border-red-500 focus:ring-red-100"
                        }`}
                        style={{
                          paddingLeft: "4.25rem",
                        }}
                        type="text"
                        inputMode="numeric"
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
                          !paymentAmountIsValid
                        }
                        required
                      />
                    </div>
                  </label>

                    {/* PAYMENT_PRESET_BUTTONS_REMOVED_V1 */}

                  <p
                    className={`mt-3 text-xs font-semibold ${
                      paymentAmountIsValid
                        ? "text-slate-500"
                        : "text-red-600"
                    }`}
                  >
                    {paymentAmountIsValid
                      ? "The server and Razorpay will verify this exact amount."
                      : "Enter a whole amount from ₹1,000 to ₹1,00,000."}
                  </p>
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
                  : `Pay ${formatRupees(
                      paymentAmountNumber
                    )} securely`}

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
                      Default amount
                    </span>
                    <span className="font-semibold">
                      ₹6,999
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
                    {formatRupees(
                      paymentAmountNumber
                    )}
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
