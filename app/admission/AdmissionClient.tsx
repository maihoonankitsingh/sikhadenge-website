"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CHECKOUT_SCRIPT =
  "https://checkout.razorpay.com/v1/checkout.js";

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

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CHECKOUT_SCRIPT}"]`
    );

    if (!existing) {
      const script = document.createElement("script");
      script.src = CHECKOUT_SCRIPT;
      script.async = true;
      script.onload = () => finish(Boolean(window.Razorpay));
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

async function readResponse(res: Response) {
  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.ok) {
    throw new Error(
      data?.error || `Request failed with status ${res.status}`
    );
  }

  return data;
}

export default function AdmissionClient() {
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setPageError("");

    try {
      const formData = new FormData(event.currentTarget);

      const payload = {
        name: String(formData.get("name") || "").trim(),
        fatherName: String(formData.get("fatherName") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        gender: String(formData.get("gender") || "").trim(),
        address1: String(formData.get("address1") || "").trim(),
      };

      const razorpayLoaded = await loadRazorpay();

      if (!razorpayLoaded) {
        throw new Error(
          "Razorpay checkout could not load. Disable blocking extensions and retry."
        );
      }

      const initResponse = await fetch("/api/admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await readResponse(initResponse);

      if (
        !data.keyId ||
        !data.orderId ||
        !data.admissionId ||
        !data.amount
      ) {
        throw new Error("Incomplete payment order response");
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "SikhaDenge",
        description: "AI Expert Program Admission",
        order_id: data.orderId,
        prefill: {
          name: payload.name,
          email: payload.email || undefined,
          contact: payload.phone,
        },
        notes: {
          admissionId: data.admissionId,
          fatherName: payload.fatherName,
        },
        handler: async (paymentResponse: any) => {
          setLoading(true);
          setPageError("");

          try {
            const verifyResponse = await fetch(
              "/api/admission/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentResponse),
              }
            );

            await readResponse(verifyResponse);

            window.location.assign(
              `/admission/complete?orderId=${encodeURIComponent(
                paymentResponse.razorpay_order_id
              )}&paymentId=${encodeURIComponent(
                paymentResponse.razorpay_payment_id
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

      const checkout = new window.Razorpay(options);

      checkout.on("payment.failed", (response: any) => {
        setLoading(false);
        setPageError(
          response?.error?.description ||
            "Payment failed. No admission fee was confirmed."
        );
      });

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
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
            Secure admission checkout
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Confirm your admission
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Complete your student details, pay the fixed program fee and
            submit documents through the protected admission flow.
          </p>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {[
            ["01", "Student details"],
            ["02", "Secure payment"],
            ["03", "Document verification"],
          ].map(([number, title]) => (
            <div
              key={number}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
            >
              <div className="text-xs font-bold text-blue-600">
                {number}
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {title}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_390px]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Student information
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Enter the information that should appear in the
                admission record.
              </p>
            </div>

            <form className="mt-7 space-y-5" onSubmit={onSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="text-sm font-medium text-slate-800">
                  Student name <span className="text-red-500">*</span>
                  <input
                    className={inputClass}
                    name="name"
                    placeholder="Full name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="text-sm font-medium text-slate-800">
                  Father name <span className="text-red-500">*</span>
                  <input
                    className={inputClass}
                    name="fatherName"
                    placeholder="Father name"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="text-sm font-medium text-slate-800">
                  WhatsApp number <span className="text-red-500">*</span>
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

                <label className="text-sm font-medium text-slate-800">
                  Email address
                  <input
                    className={inputClass}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="email@example.com"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="text-sm font-medium text-slate-800">
                  Gender
                  <select
                    className={inputClass}
                    name="gender"
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label className="text-sm font-medium text-slate-800">
                  Program
                  <input
                    className={`${inputClass} bg-slate-50`}
                    value="AI Expert Program"
                    readOnly
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-800">
                Address
                <textarea
                  className={`${inputClass} min-h-24 resize-y`}
                  name="address1"
                  placeholder="Current address"
                />
              </label>

              {pageError ? (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                >
                  {pageError}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Preparing secure payment..."
                  : "Pay ₹4,999 securely"}
              </button>

              <p className="text-xs leading-5 text-slate-500">
                By continuing, you agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium underline"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </section>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
                Order summary
              </div>

              <h2 className="mt-3 text-2xl font-bold">
                AI Expert Program
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Duration</span>
                  <span className="font-semibold">8 weeks</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Mode</span>
                  <span className="font-semibold">Live online</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Program fee</span>
                  <span className="font-semibold">₹4,999</span>
                </div>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <div className="flex items-end justify-between">
                <span className="text-sm text-slate-400">
                  Amount payable
                </span>
                <span className="text-3xl font-bold">₹4,999</span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-950">
                Payment protection
              </h3>

              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <p>Fee is fixed securely on the server.</p>
                <p>Payment amount and status are verified with Razorpay.</p>
                <p>Documents are stored outside the public website folder.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
