import Link from "next/link";

export const dynamic = "force-dynamic";

const highlights = [
  {
    title: "Live AI Masterclass",
    desc: "Learn practical AI workflows, prompt usage, and execution systems in a live step-by-step session.",
  },
  {
    title: "Beginner Friendly",
    desc: "Anyone from student to freelancer to working professional can attend and apply the concepts.",
  },
  {
    title: "Practical Use Cases",
    desc: "Understand how AI can help in content, research, business work, reporting, and faster execution.",
  },
  {
    title: "Implementation Focus",
    desc: "This is not only theory. The session is designed to help you apply AI tools in real work.",
  },
];

const audience = [
  "Students who want future-ready AI skills",
  "Freelancers who want faster delivery and better output",
  "Working professionals who want to save time with AI",
  "Business owners who want practical automation direction",
];

const outcomes = [
  "How to use AI tools in day-to-day work",
  "How better prompting changes output quality",
  "How to reduce manual work with structured workflows",
  "How to start using AI for real implementation after the session",
];

const faqs = [
  {
    q: "Who can attend this masterclass?",
    a: "Anyone can attend. This session is designed for students, freelancers, working professionals, and business owners.",
  },
  {
    q: "Do I need advanced technical knowledge?",
    a: "No. The session is beginner friendly and explained in a practical way.",
  },
  {
    q: "Will I get workshop details after payment?",
    a: "Yes. Important workshop details are shared on your email and WhatsApp number after successful payment.",
  },
  {
    q: "Is this a live session?",
    a: "Yes. This is a live workshop-style session focused on practical understanding and implementation.",
  },
];

export default function MetaAdsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-2 text-sm font-semibold text-[#2563EB]">
              Sikhadenge AI Masterclass
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Master Gen-AI, Graphic Design & Edit Videos with AI Editing with Practical Live Learning
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Join a practical live masterclass designed to help you understand how AI tools can be used for real work, execution, and faster results.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/checkout/ai-prompt-starter-pack"
                className="inline-flex items-center justify-center rounded-2xl bg-[#2563EB] px-7 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(37,99,235,0.28)] transition hover:bg-[#1D4ED8]"
              >
                Register Now
              </Link>

              <Link
                href="/checkout/ai-prompt-starter-pack"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-7 py-4 text-base font-bold text-slate-900 transition hover:bg-slate-50"
              >
                Secure Your Seat
              </Link>
            </div>

            <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Entry Price
                </p>
                <p className="mt-2 text-3xl font-black text-[#2563EB]">
                  ₹9 <span className="text-lg font-bold text-slate-500">+ GST</span>
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Session Type
                </p>
                <p className="mt-2 text-2xl font-black text-slate-900">
                  Live Masterclass
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Best For
                </p>
                <p className="mt-2 text-2xl font-black text-slate-900">
                  Students, Freelancers, Professionals
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF6FF] text-lg font-bold text-[#2563EB]">
                SG
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
              Who This Is For
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A practical session for people who want real AI skill direction
            </h2>
            <div className="mt-8 space-y-4">
              {audience.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    ✓
                  </div>
                  <p className="text-base leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
              What You Will Learn
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Clear outcomes focused on implementation
            </h2>
            <div className="mt-8 space-y-4">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#EFF6FF] text-sm font-bold text-[#2563EB]">
                    →
                  </div>
                  <p className="text-base leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-[#0B1220] p-8 text-white shadow-[0_24px_80px_rgba(2,6,23,0.18)] sm:p-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F5B301]">
              Limited Entry Offer
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              Register your seat now and enter the live masterclass funnel
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              Secure your entry now. After registration, you will move into the live checkout and welcome flow where payment, confirmation, and WhatsApp community joining happen in sequence.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/checkout/ai-prompt-starter-pack"
                className="inline-flex items-center justify-center rounded-2xl bg-[#2563EB] px-7 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(37,99,235,0.28)] transition hover:bg-[#1D4ED8]"
              >
                Continue to Checkout
              </Link>

              <Link
                href="/checkout/welcome"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-bold text-white transition hover:bg-white/10"
              >
                View Welcome Flow
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Common questions before registration
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-[24px] border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-lg font-bold text-slate-900">{item.q}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/checkout/ai-prompt-starter-pack"
              className="inline-flex items-center justify-center rounded-2xl bg-[#2563EB] px-7 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(37,99,235,0.28)] transition hover:bg-[#1D4ED8]"
            >
              Register for the Masterclass
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
