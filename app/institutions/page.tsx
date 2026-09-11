import Link from "next/link";
import type { Metadata } from "next";
import {
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Layers3,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Institutional Training & Partnerships | SikhaDenge",
  description:
    "Institutional training partnerships by SikhaDenge for colleges, universities and organizations with structured delivery, learner records, attendance, assessments and verifiable certificates.",
  alternates: { canonical: "https://sikhadenge.in/institutions" },
};

const capabilities = [
  {
    icon: Layers3,
    title: "Structured programs",
    text: "Partner-specific programs, batches, schedules and delivery records mapped to the institution.",
  },
  {
    icon: UsersRound,
    title: "Learner lifecycle",
    text: "Admission, enrollment, attendance, assessment, certificate and outcome records in one operating flow.",
  },
  {
    icon: BarChart3,
    title: "Delivery visibility",
    text: "Operational reporting for batches, sessions, learner progress and partner-level performance.",
  },
  {
    icon: FileCheck2,
    title: "Agreement & document control",
    text: "Versioned proposals, agreements, program documents and partner-visible records with controlled access.",
  },
  {
    icon: BadgeCheck,
    title: "Assessment & certification",
    text: "Eligibility rules can combine attendance and assessment outcomes before certificate issuance.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access",
    text: "Internal teams and authorized partner users see only the information appropriate to their role and organization.",
  },
];

const workflow = [
  "Institution onboarding & scope finalization",
  "Program, batch and schedule setup",
  "Student enrollment or controlled bulk intake",
  "Session delivery and attendance tracking",
  "Practical assessment and project evaluation",
  "Certificate eligibility, issuance and verification",
  "Outcome reporting, placement support and renewal planning",
];

const domains = [
  "AutoCAD Civil",
  "AutoCAD Mechanical",
  "Technical Drawing",
  "AI & Digital Productivity",
  "Industry-oriented short-term training",
  "Custom institutional programs",
];

export default function InstitutionsPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="relative overflow-hidden border-b border-white/10 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,.22),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,.12),transparent_34%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-cyan-200">
              <Building2 className="h-4 w-4" /> INSTITUTIONAL PARTNERSHIPS
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Practical training programs built for colleges and organizations.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              SikhaDenge works with institutions to plan, deliver and document industry-oriented training with structured batches, learner records, attendance, assessments and verifiable completion credentials.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact-us" className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500">
                Discuss an institutional program
              </Link>
              <a href="#operating-model" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
                See delivery model
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Partner master", "One institutional record across deals, contracts and delivery"],
              ["Unified learners", "One learner identity across admissions and programs"],
              ["Evidence-led delivery", "Sessions, attendance, assessments and certificates"],
              ["Controlled access", "Internal and partner roles with organization boundaries"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                <div className="text-sm font-bold text-white">{title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-400">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.2em] text-blue-300">OPERATING CAPABILITIES</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">More than a training calendar.</h2>
            <p className="mt-4 text-slate-400">The operating model is designed so institutional delivery can remain traceable from the first discussion through learner outcomes.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-[#0d1a2b] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                  <item.icon className="h-5 w-5 text-blue-300" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="operating-model" className="border-y border-white/10 bg-[#0a1626] py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-cyan-300">DELIVERY WORKFLOW</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">From agreement to measurable learner outcomes.</h2>
            <div className="mt-8 space-y-4">
              {workflow.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-extrabold">{String(index + 1).padStart(2, "0")}</div>
                  <div className="pt-1 text-sm font-semibold text-slate-100">{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#101e31] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-7 w-7 text-blue-300" />
              <h3 className="text-2xl font-extrabold">Program areas</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">Programs can be configured around the institution's academic calendar, learner level and agreed delivery scope.</p>
            <div className="mt-6 space-y-3">
              {domains.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" /> {item}
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-2xl border border-amber-300/15 bg-amber-300/5 p-4 text-xs leading-5 text-amber-100/80">
              Completion credentials issued by SikhaDenge or a partner institution are separate from any third-party vendor certification unless a specific official certification pathway is expressly stated.
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="rounded-3xl border border-blue-400/20 bg-[linear-gradient(135deg,rgba(37,99,235,.20),rgba(6,182,212,.08))] p-7 sm:p-10">
            <div className="max-w-3xl">
              <p className="text-xs font-bold tracking-[0.2em] text-blue-200">FOR COLLEGES, UNIVERSITIES & ORGANIZATIONS</p>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Need a custom institutional training plan?</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">Share the learner profile, preferred skill area, duration and delivery format. The final scope, commercials and responsibilities are documented before activation.</p>
              <Link href="/contact-us" className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-slate-100">
                Start a partnership discussion
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
