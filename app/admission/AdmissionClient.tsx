"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);

    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function AdmissionClient() {
  const [loading, setLoading] = useState(false);
  const [amountRupees, setAmountRupees] = useState<number>(4999);

  const key = useMemo(() => {
    return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const payload = {
        name: String(form.get("name") || "").trim(),
        fatherName: String(form.get("fatherName") || "").trim(),
        phone: String(form.get("phone") || "").trim(),
        email: String(form.get("email") || "").trim(),
        gender: String(form.get("gender") || "").trim(),
        course: String(form.get("course") || "").trim(),
        address1: String(form.get("address1") || "").trim(),
    
          amountRupees: Number(form.get("amountRupees") || 4999),
  };

      const rzOk = await loadRazorpay();
      if (!rzOk) throw new Error("Razorpay SDK load failed");
      if (!key) throw new Error("NEXT_PUBLIC_RAZORPAY_KEY_ID missing");

      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();


        // FREE flow: skip Razorpay + skip verify
        if (data?.free) {
          window.location.href = "/admission/complete?free=1";
          return;
        }

      const options = {
        key,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "Sikhadenge",
        description: "Course Admission",
        order_id: data.orderId,
        prefill: {
          name: payload.name,
          email: payload.email || undefined,
          contact: payload.phone,
        },
        notes: {
          fatherName: payload.fatherName,
          gender: payload.gender,
          course: payload.course,
          address1: payload.address1,
        },
        handler: async (resp: any) => {
          const vr = await fetch("/api/admission/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...resp, admissionId: data?.admissionId || null, amountRupees: data?.amountRupees ?? payload.amountRupees, currency: data?.currency || "INR", form: payload }),
          });
          if (vr.ok) {
window.location.href = `/admission/complete?orderId=${resp.razorpay_order_id}&paymentId=${resp.razorpay_payment_id}&admissionId=${encodeURIComponent(String(data?.admissionId || ""))}`;
          } else {
            alert("Payment done but verification failed. Please WhatsApp support.");
          }
        },
        modal: { ondismiss: () => {} },
        theme: { color: "#2563EB" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment start nahi hua. Please WhatsApp support.");
    } finally {
      setLoading(false);
    }
  }

  const INPUT = "w-full rounded-lg border border-[rgba(15,23,42,0.10)] bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#64748B] outline-none focus:border-[#2563EB]/60 focus:ring-2 focus:ring-[#2563EB]/20";
  const LABEL = "block text-xs font-medium text-[#0F172A] mb-1";
  const CARD = "rounded-2xl border border-[rgba(15,23,42,0.10)] bg-[#FFF7E6] shadow-[0_12px_36px_rgba(2,6,23,0.08)]";

  return (
    <main className="min-h-[70vh] bg-[#F8FAFC] px-4 pt-10 pb-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-4">
          <h1 className="text-3xl font-semibold text-[#0F172A]">Admission</h1>
          <p className="mt-1 text-sm text-[#64748B]">Fill details → Confirm → Pay → Seat locked</p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_420px]">
          {/* LEFT: FORM */}
          <div className={`${CARD} p-4 md:p-5`}>
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-[#0F172A]">Student details</h2>
              <p className="mt-1 text-sm text-[#64748B]">
                Details submit karte hi payment window open ho jayega.
              </p>
            </div>

            <form className="space-y-3" onSubmit={onSubmit}>
              <div>
                <label className={LABEL}>Name *</label>
                <input required placeholder="Full name" className={INPUT} name="name" />
              </div>

              <div>
                <label className={LABEL}>Father Name *</label>
                <input required placeholder="Father name" className={INPUT} name="fatherName" />
              </div>

              <div>
                <label className={LABEL}>WhatsApp Number *</label>
                <input required inputMode="numeric" placeholder="10 digit number" className={INPUT} name="phone" />
              </div>

              <div>
                <label className={LABEL}>Email (optional)</label>
                <input type="email" placeholder="email@example.com" className={INPUT} name="email" />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
</div>

              <div>
                <label className={LABEL}>Gender (optional)</label>
                <select name="gender" className={INPUT} defaultValue="">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className={LABEL}>Program</label>
                <select name="course" className={INPUT} defaultValue="AI Expert Program">
                  <option value="AI Expert Program">AI Expert Program</option>
                </select>
                <p className="mt-2 text-xs text-[#64748B]">
                  Tools: Ps, Ai, Id, Pr, Ae + AI tools (projects + certificate).
                </p>
              </div>

                <div>
                  <label className={LABEL}>Pay Amount (₹)</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={1}
                    name="amountRupees"
                    defaultValue={4999}
                    className={INPUT}
                    placeholder="e.g., 4999"
                  />
                  <p className="mt-1 text-xs text-[#64748B]">Enter amount in INR (minimum ₹1).</p>
                </div>
<button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-[#2563EB] px-4 py-3 font-semibold text-white shadow-[0_14px_40px_rgba(37,99,235,0.22)] hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Proceed to payment"}
              </button>

              <p className="text-xs text-[#64748B]">
                By continuing you agree to our{" "}
                <Link className="underline" href="/terms">
                  Terms
                </Link>
                .
              </p>
            </form>
          </div>

          {/* RIGHT: ORDER SUMMARY (sticky) */}
          <aside className="lg:sticky lg:top-28">
            <div className={`${CARD} p-6`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-[#0F172A]">Your order</h3>
                  <p className="mt-1 text-sm text-[#64748B]">Admission checkout summary</p>
                </div>
                <span className="rounded-full bg-[#F5B301]/20 px-3 py-1 text-xs font-semibold text-[#0F172A] border border-[rgba(15,23,42,0.10)]">
                  Limited seats
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#334155]">Program</span>
                  <span className="text-[#0F172A] font-medium">AI Expert Program</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#334155]">Duration</span>
                  <span className="text-[#0F172A] font-medium">8 weeks</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#334155]">Mode</span>
                  <span className="text-[#0F172A] font-medium">Live online</span>
                </div>
              </div>

              <div className="my-5 h-px bg-[rgba(15,23,42,0.10)]" />

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#334155]">Fee</span>
                  <span className="text-[#0F172A] font-semibold">Shown in payment</span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Exact amount Razorpay payment window me show hoga. Payment ke baad seat confirm hoti hai.
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-[rgba(15,23,42,0.10)] bg-white p-4">
                <p className="text-sm font-semibold text-[#0F172A]">Need help?</p>
                <p className="mt-1 text-xs text-[#64748B]">Payment issue / verification — support team se connect karein.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
