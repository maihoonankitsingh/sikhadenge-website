// src/app/contact/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacts | Sikhadenge",
  description: "Contact Sikhadenge for counselling and admissions support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs uppercase tracking-widest text-white/50">
          Contacts
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
          Talk to the team
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
          Counselling, course details, batch timing, fees, and eligibility.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm font-semibold">Quick Info</div>
            <div className="mt-3 space-y-2 text-sm text-white/70">
              <div>WhatsApp: +91 XXXXXXXXXX</div>
              <div>Email: support@sikhadenge.com</div>
              <div>Hours: 10 AM – 7 PM</div>
            </div>
          </div>

          <form className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm font-semibold">Send a message</div>

            <div className="mt-4 grid gap-3">
              <input
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                placeholder="Full name"
              />
              <input
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                placeholder="Phone (WhatsApp)"
              />
              <input
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                placeholder="Email (optional)"
              />
              <textarea
                className="min-h-[120px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                placeholder="Message"
              />
              <button
                type="button"
                className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
              >
                Submit
              </button>

              <p className="text-xs text-white/45">
                (Form abhi UI-only hai. Backend later connect karenge.)
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
