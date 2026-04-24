import Link from "next/link";
import type { ReactNode } from "react";
import { getMasterclassSettings } from "@/lib/masterclass-settings";

export const revalidate = 0;

export const metadata = {
  title: "Disclaimer — Sikhadenge",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
        {children}
      </div>
    </section>
  );
}

export default async function DisclaimerPage() {
  const masterclassSettings = await getMasterclassSettings();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl bg-[#0B1220] px-6 py-8 text-white shadow-[0_24px_60px_rgba(11,18,32,0.28)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
            Sikhadenge
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Disclaimer
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Please read this disclaimer carefully before using our website,
            joining any class, community, session, webinar, or training
            experience.
          </p>
        </div>

        <div className="grid gap-5">
          <Section title="General Information">
            <p>
              Sikhadenge provides educational content, live sessions, recorded
              material, workshops, and training for learning purposes only.
            </p>
            <p>
              We make reasonable efforts to keep all information accurate and
              updated, but we do not guarantee that every page, statement,
              schedule, tool reference, or training asset will always remain
              fully error-free or current.
            </p>
          </Section>

          <Section title="No Guaranteed Results">
            <p>
              Student outcomes depend on multiple factors including effort,
              consistency, skill level, practice quality, communication,
              execution, and market conditions.
            </p>
            <p>
              We do not guarantee jobs, freelancing income, client acquisition,
              revenue, or any fixed career outcome.
            </p>
          </Section>

          <Section title="Third-Party Platforms">
            <p>
              Some journeys may redirect to external platforms such as WhatsApp,
              Zoom, Razorpay, payment gateways, CRM tools, or third-party
              services.
            </p>
            <p>
              We are not responsible for downtime, policy restrictions, service
              errors, account limitations, or technical issues caused by those
              external providers.
            </p>
          </Section>

          <Section title="Community and Communication">
            <p>
              Important updates may be shared through the official WhatsApp
              community and related communication channels.
            </p>
            <p>
              Official community link:{" "}
              <a
                className="underline break-all"
                href={masterclassSettings.communityLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {masterclassSettings.communityLink}
              </a>
            </p>
          </Section>

          <Section title="Contact">
            <p>
              For support or clarification, use the official website channels
              only.
            </p>
            <p>
              You may also return to the{" "}
              <Link className="underline" href="/">
                homepage
              </Link>
              .
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
