"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, Sparkles, X } from "lucide-react";

const POPUP_KEY = "sikhadenge-blog-lead-popup-v7";
const MASTERCLASS_URL =
  "https://sikhadenge.in/gen-ai-masterclass/register-one-step";

export function BlogLeadPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alreadySeen = false;

    try {
      alreadySeen = window.sessionStorage.getItem(POPUP_KEY) === "seen";
    } catch {
      alreadySeen = false;
    }

    if (alreadySeen) return;

    const timer = window.setTimeout(() => setOpen(true), 4500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function closePopup() {
    try {
      window.sessionStorage.setItem(POPUP_KEY, "seen");
    } catch {
      // The popup can still close when storage is unavailable.
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) closePopup();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-lead-popup-title"
        className="relative grid max-h-[92vh] w-full max-w-[980px] overflow-y-auto rounded-t-[30px] bg-white shadow-[0_35px_120px_rgba(2,8,23,0.45)] sm:max-h-[86vh] sm:grid-cols-[0.9fr_1.1fr] sm:overflow-hidden sm:rounded-[34px]"
      >
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close registration invitation"
          className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative overflow-hidden bg-[#071b43] px-6 py-9 text-white sm:px-9 sm:py-12">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/35 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-100">
              <Sparkles className="h-4 w-4" /> Free practical session
            </div>
            <h2
              id="blog-lead-popup-title"
              className="mt-6 max-w-md text-[34px] font-black leading-[1.05] tracking-[-0.04em] sm:text-[42px]"
            >
              Turn your AI learning into a clear execution plan.
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 text-blue-100">
              Join Sikhadenge&apos;s free Gen AI Masterclass to understand useful workflows,
              portfolio thinking and the next practical step for your chosen career path.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "A beginner-friendly path without forced technical complexity",
                "Practical workflow and portfolio guidance",
                "One-step registration with no popup form to complete",
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 text-sm leading-6 text-blue-50">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#f5b301]" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-9 sm:px-10 sm:py-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">
            Continue from reading to action
          </p>
          <h3 className="mt-4 text-[30px] font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-[38px]">
            Reserve your free masterclass seat
          </h3>
          <p className="mt-4 text-base leading-8 text-slate-600">
            The registration page collects the required details securely. This invitation
            appears only once per browsing session after you have had time to begin reading.
          </p>

          <Link
            href={MASTERCLASS_URL}
            onClick={closePopup}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f5b301] px-6 py-4 text-sm font-extrabold text-slate-950 transition hover:bg-[#ffd04a]"
          >
            Register for Free Masterclass <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={closePopup}
            className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Continue reading this guide
          </button>
          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            No fabricated outcomes or earnings claims. Review the programme details before
            registering.
          </p>
        </div>
      </section>
    </div>
  );
}
