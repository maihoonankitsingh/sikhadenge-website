import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPartnerPublicConfig } from "../../../lib/b2b-intake-config";
import EnrollmentForm from "./EnrollmentForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partner Student Enrollment",
  description: "Authorized partner student enrollment for SikhaDenge training programs.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function PartnerEnrollmentPage({ params }: { params: Promise<{ partner: string }> }) {
  const { partner } = await params;
  if (!/^[a-z0-9-]{2,80}$/.test(partner)) notFound();

  const config = getPartnerPublicConfig(partner);
  if (!config) notFound();

  return (
    <main className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.10),transparent_34%)]" />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <section className="pt-2 lg:sticky lg:top-28">
          <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
            SikhaDenge Partner Program
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Student enrollment for <span className="text-blue-400">{config.displayName}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Submit learner details for <strong className="font-semibold text-white">{config.programLabel}</strong>. The partner, program and funding configuration are fixed on the server and cannot be changed from this form.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-semibold text-white">Server-side partner mapping</p>
              <p className="mt-1 leading-6 text-slate-400">Organization, program, batch and service credentials are resolved only on the SikhaDenge server.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-semibold text-white">Duplicate-safe enrollment</p>
              <p className="mt-1 leading-6 text-slate-400">Retries use an idempotency key, while the B2B OS also checks existing learner and enrollment records.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-semibold text-white">Minimum necessary data</p>
              <p className="mt-1 leading-6 text-slate-400">Only training, institution and contact fields needed for program operations are collected here.</p>
            </div>
          </div>
        </section>

        <EnrollmentForm
          partner={config.slug}
          partnerName={config.displayName}
          programLabel={config.programLabel}
          noticeVersion={config.noticeVersion}
        />
      </div>
    </main>
  );
}
