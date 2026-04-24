import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Building2,
  ClipboardList,
  FileText,
  Lightbulb,
  ListChecks,
  MessageSquareText,
  Settings2,
  Sparkles,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Operations Teams | Sikhadenge",
  description:
    "Explore the best AI skills for operations teams across process support, coordination, reporting, SOPs, communication, and workflow execution. A practical guide for coordinators, operations teams, and business execution roles.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-operations-teams",
  },
  openGraph: {
    title: "Best AI Skills for Operations Teams | Sikhadenge",
    description:
      "A practical guide to the best AI skills for operations teams across process support, coordination, reporting, SOPs, communication, and workflow execution.",
    url: "https://sikhadenge.in/ai-skills-for-operations-teams",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Operations Teams | Sikhadenge",
    description:
      "A practical guide to the best AI skills for operations teams across process support, coordination, reporting, SOPs, communication, and workflow execution.",
  },
};

const quickInfo = [
  {
    title: "Operations relevance",
    desc: "Modern operations teams benefit when they can use AI across coordination, reporting, communication, and process support.",
  },
  {
    title: "System support",
    desc: "The right AI skills help operations teams reduce repetitive work and improve execution consistency.",
  },
  {
    title: "Practical value",
    desc: "Useful operations AI skills improve clarity, speed, and process quality more than random automation without structure.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Operations teams manage repeated tasks",
    desc: "Operations work often includes coordination, updates, follow-ups, reporting, documentation, and process tracking across multiple moving parts.",
  },
  {
    icon: Workflow,
    title: "Manual systems create inefficiency",
    desc: "Without structured support, repetitive admin work consumes time and reduces focus on execution quality and process improvement.",
  },
  {
    icon: Bot,
    title: "AI can support process-driven work",
    desc: "Practical AI skills help operations teams improve communication, SOP drafts, summaries, checklists, and workflow organization.",
  },
  {
    icon: Briefcase,
    title: "Execution quality depends on systems",
    desc: "Operations teams perform better when task handling, coordination, and process clarity become more repeatable and structured.",
  },
];

const skillCategories = [
  {
    icon: ClipboardList,
    title: "Process Support Skills",
    desc: "Operations teams should learn how AI supports process summaries, task breakdowns, checklist creation, and execution clarity.",
  },
  {
    icon: FileText,
    title: "Documentation Skills",
    desc: "Useful skills include creating SOP drafts, internal docs, summaries, instructions, updates, and operational note structures.",
  },
  {
    icon: MessageSquareText,
    title: "Coordination Communication Skills",
    desc: "A practical AI skill is learning how to support internal communication, neutral updates, reminders, escalations, and team coordination messages.",
  },
  {
    icon: ListChecks,
    title: "Tracking & Follow-Up Skills",
    desc: "Teams benefit when they can use AI for follow-up logic, status tracking formats, task summaries, and structured update workflows.",
  },
  {
    icon: Settings2,
    title: "Workflow Improvement Skills",
    desc: "Strong operations skills include identifying repeated tasks, organizing steps, reducing friction, and improving process repeatability.",
  },
  {
    icon: Workflow,
    title: "Execution System Skills",
    desc: "Operations teams should learn how AI fits into repeatable systems like assign, track, update, review, document, and improve workflows.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Operations Teams",
    desc: "Operations teams can use AI skills to improve process clarity, communication, and execution speed across daily tasks.",
  },
  {
    icon: Building2,
    title: "Coordinators",
    desc: "Coordinators can use AI skills for updates, follow-ups, summaries, documentation, and smoother cross-team communication.",
  },
  {
    icon: Wrench,
    title: "Execution Operators",
    desc: "Execution-focused operators can use AI skills to improve task flow, note quality, and operational consistency.",
  },
  {
    icon: Briefcase,
    title: "Support Teams",
    desc: "Support and internal process teams can use AI skills to handle repeated work more clearly and more efficiently.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect operations work with practical digital execution.",
  },
  {
    href: "/ai-skills-for-small-business",
    title: "AI Skills for Small Business",
    desc: "See which AI skills help smaller teams improve operations, communication, and workflow quality.",
  },
  {
    href: "/ai-skills-for-founders",
    title: "AI Skills for Founders",
    desc: "Review founder-focused AI skills that support business systems, communication, and execution structure.",
  },
  {
    href: "/corporate-training",
    title: "Corporate Training",
    desc: "Explore how structured AI capability building can support team workflows, operations, and execution processes.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Understand the wider AI skill categories that matter for practical team execution and business systems.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how practical AI-first execution systems are taught.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for operations teams?",
    a: "Useful AI skills for operations teams include process support, documentation, coordination communication, tracking support, workflow improvement, and repeatable execution system skills.",
  },
  {
    q: "Can AI skills help operations teams work faster?",
    a: "Yes. AI skills can reduce repetitive effort in summaries, SOP drafts, updates, checklists, and follow-up structures, which improves execution speed.",
  },
  {
    q: "Do operations teams need coding to learn AI skills?",
    a: "No. Many practical AI skills for operations teams do not require coding. A strong starting point is communication, documentation, process support, and workflow organization.",
  },
  {
    q: "Are AI tools and AI skills the same for operations work?",
    a: "No. AI tools are the software or platforms. AI skills are the practical abilities to use those tools effectively for real process execution and team workflows.",
  },
  {
    q: "Can coordinators and support teams use AI skills in daily work?",
    a: "Yes. Coordinators and support teams can use AI skills for summaries, updates, reminders, notes, documentation, and smoother operational communication.",
  },
  {
    q: "What is the biggest mistake operations teams make with AI?",
    a: "A common mistake is using AI outputs without connecting them to actual process logic, team context, status tracking, or execution priorities.",
  },
  {
    q: "Can AI skills help with SOPs, tracking, and internal communication?",
    a: "Yes. AI can support SOP drafts, status updates, task checklists, internal notes, reminders, and other repeatable process-driven communication work.",
  },
  {
    q: "Where should operations teams start learning AI properly?",
    a: "A structured learning path is the best starting point. Begin with process support, documentation, coordination, and repeatable workflow systems instead of random tool exploration.",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-5 py-3 text-[15px] font-semibold leading-none text-[#245EEA] shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
      {children}
    </div>
  );
}

function SectionTitle({
  pill,
  title,
  desc,
}: {
  pill: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-4xl">
      <Pill>{pill}</Pill>
      <h2 className="mt-7 text-[38px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#071533] md:text-[56px]">
        {title}
      </h2>
      {desc ? (
        <p className="mt-5 max-w-4xl text-[18px] leading-[1.7] text-[#47607F] md:text-[19px]">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

export default function AiSkillsForOperationsTeamsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Operations AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for operations teams
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Operations teams do not need random AI use to improve performance. They need practical AI skills
              that support coordination, reporting, SOPs, documentation, follow-ups, and repeatable execution
              systems. A strong operations path starts with useful AI skills that reduce friction and strengthen
              day-to-day process quality.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-skills"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {quickInfo.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#D8E5F4] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
              >
                <h3 className="text-[22px] font-semibold leading-[1.25] text-[#071533]">{item.title}</h3>
                <p className="mt-4 text-[17px] leading-[1.75] text-[#47607F]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Why this matters"
            title="Why AI skills matter for operations teams"
            desc="Operations work depends on clarity, consistency, and repeatable process handling. Practical AI skills help teams reduce repetitive effort while improving coordination and execution quality."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {whyItMatters.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="grid grid-cols-[92px_1fr] gap-5 rounded-[30px]">
                  <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[24px] border border-[#CFE0F6] bg-[#EAF2FE] shadow-[0_10px_24px_rgba(37,99,235,0.06)]">
                    <Icon className="h-8 w-8 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <div className="pt-2">
                    <h3 className="text-[20px] font-semibold leading-[1.3] text-[#071533]">{item.title}</h3>
                    <p className="mt-4 max-w-[620px] text-[17px] leading-[1.85] text-[#47607F]">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Core skill categories"
            title="Main AI skill categories for operations teams"
            desc="A strong operations-team AI path should focus on practical skill areas that improve documentation, coordination, process support, and workflow execution."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {skillCategories.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[34px] border border-[#0E3A83] bg-[linear-gradient(180deg,#022A67_0%,#011B46_100%)] p-7 shadow-[0_18px_38px_rgba(1,27,70,0.22)]"
                >
                  <div className="flex h-[98px] w-[98px] items-center justify-center rounded-[28px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.07)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Icon className="h-8 w-8 text-white" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-10 text-[20px] font-semibold leading-[1.35] text-white">{item.title}</h3>
                  <p className="mt-4 text-[17px] leading-[1.8] text-[#C9D7F0]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Use cases"
            title="Who can benefit from operations-focused AI skills"
            desc="Operations-focused AI skills are useful across multiple team roles when the learning path stays practical and execution-driven."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {useCases.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[30px] border border-[#D8E5F4] bg-white p-7 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-[82px] w-[82px] items-center justify-center rounded-[24px] border border-[#CFE0F6] bg-[#EAF2FE]">
                    <Icon className="h-7 w-7 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-7 text-[20px] font-semibold leading-[1.35] text-[#071533]">{item.title}</h3>
                  <p className="mt-4 text-[17px] leading-[1.82] text-[#47607F]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Related learning paths"
            title="Explore connected AI learning pages"
            desc="These pages connect operations-focused AI learning with the broader Sikhadenge topic cluster around skills, systems, and AI-first business execution."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPaths.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[30px] border border-[#D8E5F4] bg-[#FBFDFF] p-7 shadow-[0_10px_28px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:border-[#BFD4F3] hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[20px] font-semibold leading-[1.35] text-[#071533]">{item.title}</h3>
                    <p className="mt-4 text-[16px] leading-[1.78] text-[#47607F]">{item.desc}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-[#2563EB] transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="FAQs"
            title="Frequently asked questions"
            desc="These are the common questions people ask before starting AI skills for operations-team execution."
          />

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-[28px] border border-[#D8E5F4] bg-white px-6 py-5 shadow-[0_6px_18px_rgba(15,23,42,0.03)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-semibold leading-[1.5] text-[#071533] marker:content-none">
                  <span>{item.q}</span>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-[#D8E5F4] bg-[#F9FBFF] text-[#2563EB] transition group-open:rotate-180">
                    <ArrowRight className="h-4 w-4 rotate-90" />
                  </span>
                </summary>
                <p className="pt-4 pr-2 text-[16px] leading-[1.85] text-[#47607F]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
    </main>
  );
}
