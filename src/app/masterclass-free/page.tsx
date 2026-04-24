import type { Metadata } from "next";
import LeadForm from "./LeadForm";

export const metadata: Metadata = {
  title: "Free Gen-AI Masterclass | Sikhadenge",
  description:
    "Free Gen-AI Masterclass: Graphic Design + Video Editing. ₹1,999 (cut) → FREE. Reserve your seat.",
};

export default function MasterclassFreePage() {
  return (
    <main className="min-h-screen bg-white text-[#0B1220]">
      {/* Top sticky bar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-semibold tracking-tight">
            Sikhadenge
            <span className="ml-2 text-xs font-medium text-text/50">
              Masterclass
            </span>
          </div>
          <a
            href="#register"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-text bg-[#2563EB] hover:bg-[#1D4ED8] transition"
          >
            Register Free
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        {/* light brand blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#2563EB]/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#F5B301]/12 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Copy */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-text/70">
                Live Online • 90–120 minutes • Q&A included
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Free Gen-AI Masterclass:
                <span className="block">Graphic Design + Video Editing</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-text/70 leading-relaxed">
                Learn how <span className="font-semibold">20+ AI tools</span> +
                <span className="font-semibold"> Adobe workflow</span> helps you build
                real client-level creatives and a clear roadmap for skills.
              </p>

              {/* Price */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-base sm:text-lg font-semibold text-text/60 line-through">
                  ₹1,999
                </span>
                <span className="text-base sm:text-lg font-semibold text-text/60">
                  →
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#2563EB]">
                  FREE
                </span>
                <span className="ml-2 h-[2px] w-10 bg-[#F5B301]" />
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  href="#register"
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold text-text bg-[#2563EB] hover:bg-[#1D4ED8] transition"
                >
                  Register Free Masterclass
                </a>
                <a
                  href="#learn"
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold border border-black/15 bg-white hover:bg-bg/5 transition"
                >
                  View What You’ll Learn
                </a>
              </div>

              {/* Trust strip */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  "Beginner friendly",
                  "Live mentor guidance",
                  "Real examples",
                  "Clear roadmap",
                ].map((t) => (
                  <div
                    key={t}
                    className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-text/70"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div id="register">
              <LeadForm />
            </div>
          </div>

          {/* What you'll learn */}
          <div id="learn" className="mt-14">
            <h3 className="text-2xl font-extrabold tracking-tight">
              What you’ll learn in this masterclass
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "AI-powered graphic design workflow (practical)",
                "Cinematic editing vs normal editing (clear difference)",
                "4-month roadmap: beginner → portfolio-ready",
                "Freelance + job direction (what to do next)",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border border-black/10 bg-white p-5"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20" />
                  <p className="mt-4 text-sm text-text/70 leading-relaxed">{t}</p>
                </div>
              ))}
            </div>

            {/* After masterclass */}
            <div className="mt-10 rounded-3xl border border-black/10 bg-[#F5F9FF] p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h4 className="text-xl font-extrabold">
                    What happens after the masterclass?
                  </h4>
                  <p className="mt-2 text-sm text-text/65">
                    If you want structured learning: 4-Month Live Program covering
                    Ps, Ai, Id, Pr, Ae + 20+ AI tools with portfolio projects.
                  </p>
                </div>
                <a
                  href="#register"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-text bg-[#2563EB] hover:bg-[#1D4ED8] transition"
                >
                  Book Free Seat
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h4 className="text-xl font-extrabold">FAQ</h4>
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                {[
                  ["Beginner friendly?", "Yes. Basics to practical workflow, step-by-step."],
                  ["Laptop required?", "Recommended. You can join masterclass from mobile too."],
                  ["Is it really free?", "Yes. Original value ₹1,999, currently FREE."],
                  ["Timing?", "Timing/slot will be shared after registration on WhatsApp."],
                ].map(([q, a]) => (
                  <div key={q} className="rounded-2xl border border-black/10 bg-white p-5">
                    <div className="font-semibold">{q}</div>
                    <div className="mt-1 text-sm text-text/65">{a}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="mt-12 rounded-3xl border border-black/10 bg-white p-8 text-center">
              <div className="text-2xl font-extrabold">
                Don’t miss this FREE Gen-AI Masterclass
              </div>
              <div className="mt-3 flex items-center justify-center gap-3">
                <span className="text-base font-semibold text-text/60 line-through">
                  ₹1,999
                </span>
                <span className="text-base font-semibold text-text/60">→</span>
                <span className="text-xl font-extrabold text-[#2563EB]">FREE</span>
              </div>
              <a
                href="#register"
                className="mt-6 inline-flex items-center justify-center rounded-2xl px-7 py-3 font-semibold text-text bg-[#2563EB] hover:bg-[#1D4ED8] transition"
              >
                Register Now – It’s Free
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-16 border-t border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-text/60">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>© {new Date().getFullYear()} Sikhadenge</div>
            <div className="text-xs">
              Parent company: ThinkGrow Pvt. Ltd. • Terms • Privacy
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
