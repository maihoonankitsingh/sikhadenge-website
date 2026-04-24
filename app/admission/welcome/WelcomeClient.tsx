"use client";

import Link from "next/link";

export default function WelcomeClient() {
  return (
    <main className="min-h-[70vh] bg-[#F8FAFC] px-4 pt-16 pb-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-2xl border border-[rgba(15,23,42,0.10)] bg-white p-6 md:p-10 shadow-sm">
          <div className="inline-flex items-center rounded-full bg-[#FFF7E6] px-3 py-1 text-xs font-semibold text-[#0F172A]">
            Admission Completed
          </div>

          <h1 className="mt-4 text-2xl md:text-3xl font-semibold text-[#0F172A]">
            Welcome to Sikhadenge
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            Aapka admission complete ho gaya hai. Class / onboarding details WhatsApp par share ki jayegi.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/"
              className="rounded-xl border border-[rgba(15,23,42,0.10)] bg-white px-4 py-3 text-center text-sm font-semibold text-[#0F172A] hover:bg-slate-50"
            >
              Go to Home
            </Link>
            <Link
              href="/contact-us"
              className="rounded-xl bg-[#2563EB] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#1D4ED8]"
            >
              Support
            </Link>
          </div>

          <p className="mt-6 text-xs text-[#64748B]">
            Terms:{" "}
            <Link className="underline" href="/terms">
              View
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
