"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

function pick(qs: URLSearchParams, key: string) {
  const v = (qs.get(key) || "").trim();
  return v || "";
}

export default function CompleteClient() {
  const [loading, setLoading] = useState(false);
  const qs = useMemo(() => new URLSearchParams(typeof window !== "undefined" ? window.location.search : ""), []);
  const orderId = pick(qs, "orderId");
  const paymentId = pick(qs, "paymentId");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);

      // UI-only for now: no API save. We just simulate success redirect.
      // Wired: store Aadhaar(last4) + document URLs in DB via /api/admission/complete
      try {
        const formEl = document.querySelector("form") as HTMLFormElement | null;
        const fd = formEl ? new FormData(formEl) : new FormData();


// admissionId: read from URL (?admissionId=... OR ?id=...)
const sp = new URLSearchParams(window.location.search);
const aid = (sp.get("admissionId") || sp.get("id") || "").trim();
if (aid) fd.set("admissionId", aid);

// Map existing form field names -> API expected field names
fd.set("aadhaar", String(fd.get("aadharNumber") || ""));
fd.set("highestQualification", String(fd.get("qualification") || ""));
fd.set("aadhaarFront", fd.get("aadharFront") as any);
fd.set("aadhaarBack", fd.get("aadharBack") as any);
fd.set("qualificationDoc", fd.get("qualificationCert") as any);

        const admissionId = String(fd.get("admissionId") || "").trim();
        if (!admissionId) return alert("admissionId missing (cannot save documents)");

        const res = await fetch("/api/admission/complete", { method: "POST", body: fd });
        const j = await res.json().catch(() => ({}));
        if (!res.ok || !j?.ok) return alert(j?.error || "Upload failed");
      } catch (e: any) {
        return alert(e?.message || "Upload failed");
      }

      const payload = {
        orderId,
        paymentId,
        aadharNumber: String(form.get("aadharNumber") || "").trim(),
        qualification: String(form.get("qualification") || "").trim(),
      };

      // basic validation
      if (!payload.aadharNumber || payload.aadharNumber.length < 8) {
        alert("Aadhaar number required");
        return;
      }
      if (!payload.qualification) {
        alert("Highest qualification required");
        return;
      }

      // ensure files selected
      const af = form.get("aadharFront");
      const ab = form.get("aadharBack");
      const qc = form.get("qualificationCert");
      if (!(af instanceof File) || !af.name) return alert("Aadhaar front required");
      if (!(ab instanceof File) || !ab.name) return alert("Aadhaar back required");
      if (!(qc instanceof File) || !qc.name) return alert("Qualification certificate required");

      // redirect to welcome (UI)
      window.location.href = "/admission/welcome";
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] bg-[#F8FAFC] px-4 pt-16 pb-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#0F172A]">Complete Your Admission</h1>
          <p className="mt-2 text-sm text-[#64748B]">
            Payment done. Ab documents + details submit karke admission complete karein.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Form */}
          <div className="lg:col-span-7 rounded-2xl border border-[rgba(15,23,42,0.10)] bg-white p-6 md:p-8 shadow-sm">
            <form className="space-y-5" onSubmit={onSubmit}>
              <input type="hidden" name="admissionId" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">Aadhaar Number *</label>
                  <input
                    required
                    inputMode="numeric"
                    name="aadharNumber"
                    placeholder="12-digit Aadhaar"
                    className="w-full rounded-xl border border-[rgba(15,23,42,0.10)] bg-white px-4 py-3 text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">Highest Qualification *</label>
                  <select
                    required
                    name="qualification"
                    defaultValue=""
                    className="w-full rounded-xl border border-[rgba(15,23,42,0.10)] bg-white px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="10th">10th</option>
                    <option value="12th">12th</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Post Graduation">Post Graduation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">Aadhaar Front Image *</label>
                <input
                  required
                  type="file"
                  accept="image/*,application/pdf"
                  name="aadharFront"
                  className="block w-full text-sm text-[#334155]"
                />
                <p className="mt-1 text-xs text-[#64748B]">JPG/PNG/PDF. Clear photo upload karein.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">Aadhaar Back Image *</label>
                <input
                  required
                  type="file"
                  accept="image/*,application/pdf"
                  name="aadharBack"
                  className="block w-full text-sm text-[#334155]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">Qualification Certificate / Marksheet *</label>
                <input
                  required
                  type="file"
                  accept="image/*,application/pdf"
                  name="qualificationCert"
                  className="block w-full text-sm text-[#334155]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#2563EB] px-4 py-3 font-semibold text-white shadow-[0_14px_40px_rgba(37,99,235,0.18)] hover:bg-[#1D4ED8] disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Submit & Complete Admission"}
              </button>

              <p className="text-xs text-[#64748B]">
                By submitting you agree to our{" "}
                <Link className="underline" href="/terms">
                  Terms
                </Link>
                .
              </p>
            </form>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-[rgba(15,23,42,0.10)] bg-[#FFF7E6] p-6 shadow-sm">
              <div className="text-sm font-semibold text-[#0F172A]">Payment Confirmed</div>
              <div className="mt-2 text-sm text-[#334155]">
                <div className="flex items-center justify-between">
                  <span>Order ID</span>
                  <span className="font-mono text-xs">{orderId || "-"}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span>Payment ID</span>
                  <span className="font-mono text-xs">{paymentId || "-"}</span>
                </div>
              </div>
              <div className="mt-4 text-xs text-[#64748B]">
                Next: documents submit → admission complete → welcome screen.
              </div>
            </div>

            <div className="rounded-2xl border border-[rgba(15,23,42,0.10)] bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-[#0F172A]">Need help?</div>
              <p className="mt-2 text-sm text-[#64748B]">
                Agar upload me issue ho, support team se WhatsApp par connect karein.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
