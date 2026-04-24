import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Building2,
  FileText,
  Funnel,
  Lightbulb,
  LineChart,
  Megaphone,
  MessageSquareText,
  Search,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Founders | Sikhadenge",
  description:
    "Explore the best AI skills for founders across communication, marketing, lead support, content systems, research, and execution workflows. A practical guide for founders, small teams, and business operators.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-founders",
  },
  openGraph: {
    title: "Best AI Skills for Founders | Sikhadenge",
    description:
      "A practical guide to the best AI skills for founders across communication, marketing, lead support, research, and execution workflows.",
    url: "https://sikhadenge.in/ai-skills-for-founders",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Founders | Sikhadenge",
    description:
      "A practical guide to the best AI skills for founders across communication, marketing, lead support, research, and execution workflows.",
  },
};

const quickInfo = [
  {
    title: "Founder leverage",
    desc: "AI skills help founders move faster across communication, strategy support, content, and digital execution.",
  },
  {
    title: "Operational clarity",
    desc: "The right AI skills support founder decision-making, internal workflows, messaging, and repeated business tasks.",
  },
  {
    title: "Practical value",
    desc: "Useful founder AI skills solve execution bottlenecks instead of creating random outputs with no business use.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Founders handle many roles",
    desc: "Early-stage founders often manage marketing, team communication, leads, content, planning, and execution at the same time.",
  },
  {
    icon: Workflow,
    title: "Manual execution slows momentum",
    desc: "Without systems, repeated business tasks consume attention and reduce the speed of business progress.",
  },
  {
    icon: Bot,
    title: "AI can support founder workflows",
    desc: "Practical AI skills help founders improve communication, research, offer clarity, content systems, and execution support.",
  },
  {
    icon: Briefcase,
    title: "Founder skill now includes digital adaptability",
    desc: "Modern founders benefit when they can use AI to strengthen systems, messaging, workflows, and output efficiency.",
  },
];

const skillCategories = [
  {
    icon: MessageSquareText,
    title: "Communication Skills",
    desc: "Founders should learn how AI supports replies, internal communication, customer messaging, FAQs, team instructions, and structured explanations.",
  },
  {
    icon: Megaphone,
    title: "Marketing Support Skills",
    desc: "Useful founder skills include offer writing, campaign messaging, promotional support, content directions, and social communication execution.",
  },
  {
    icon: Funnel,
    title: "Lead & Funnel Skills",
    desc: "A practical AI skill is learning how to support CTA language, landing section thinking, lead messaging, and conversion-supporting communication.",
  },
  {
    icon: Search,
    title: "Research & Strategy Skills",
    desc: "Founders benefit when they can use AI for market exploration, competitor observation, offer refinement, and direction clarity.",
  },
  {
    icon: FileText,
    title: "Content & Documentation Skills",
    desc: "Useful skills include drafting SOPs, summaries, docs, proposals, briefs, and structured content for operational or external use.",
  },
  {
    icon: Workflow,
    title: "Workflow & Execution Skills",
    desc: "Founders should learn how AI fits into repeatable systems like plan, draft, review, follow-up, improve, and execute workflows.",
  },
];

const useCases = [
  {
    icon: Building2,
    title: "Solo Founders",
    desc: "Solo founders can use AI skills to support communication, content, offers, lead handling, and daily execution speed.",
  },
  {
    icon: Users,
    title: "Small Teams",
    desc: "Founders managing small teams can use AI skills to improve direction clarity, task systems, and workflow consistency.",
  },
  {
    icon: Target,
    title: "Growth-Focused Operators",
    desc: "Execution-focused founders can use AI skills to support campaigns, lead systems, content, and business communication workflows.",
  },
  {
    icon: LineChart,
    title: "Business Builders",
    desc: "Founders building service, education, creator, or digital businesses can use AI to strengthen repeatable business systems.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect founder execution with practical digital capability.",
  },
  {
    href: "/ai-skills-for-small-business",
    title: "AI Skills for Small Business",
    desc: "See which AI skills help small teams improve communication, marketing, workflows, and practical execution.",
  },
  {
    href: "/corporate-training",
    title: "Corporate Training",
    desc: "Explore how structured AI capability building can support teams, operators, and business execution systems.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Review the wider AI skill categories that matter for founders and practical business growth.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how founder-focused AI skills fit into a broader AI Expert capability model.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how practical AI-first execution is taught.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for founders?",
    a: "Useful AI skills for founders include communication support, marketing support, lead and funnel thinking, research support, documentation, and workflow execution skills.",
  },
  {
    q: "Can AI skills help founders save time?",
    a: "Yes. AI skills can reduce repetitive effort in messaging, content, summaries, documentation, research, and internal execution workflows.",
  },
  {
    q: "Do founders need coding to use AI skills?",
    a: "No. Many practical AI skills for founders do not require coding. A strong starting point is communication, marketing, research, and workflow support.",
  },
  {
    q: "Are AI tools and AI skills the same for founders?",
    a: "No. AI tools are the platforms or software. AI skills are the practical abilities to use those tools effectively for real business tasks and better execution systems.",
  },
  {
    q: "Can founders use AI even with a very small team?",
    a: "Yes. Founders with small teams can use AI skills to improve speed, content flow, messaging, task clarity, and repeatable business operations.",
  },
  {
    q: "What is the biggest mistake founders make with AI?",
    a: "A common mistake is using AI randomly without connecting it to real business workflows such as lead handling, team direction, content systems, or execution processes.",
  },
  {
    q: "Can AI skills help with marketing, communication, and business operations?",
    a: "Yes. AI skills can support offer communication, follow-ups, content systems, internal documentation, FAQs, and repeated operational tasks.",
  },
  {
    q: "Where should founders start learning AI properly?",
    a: "A structured learning path is the best starting point. Begin with communication, content, lead support, research, and workflow use cases instead of random tool exploration.",
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

export default function AiSkillsForFoundersPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Founder AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for founders
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Founders do not need advanced AI theory to get value. They need practical AI skills that improve
              communication, research, content, lead support, documentation, and execution workflows. A strong
              founder path starts with useful AI skills that reduce operational friction and strengthen day-to-day
              business execution.
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
            title="Why AI skills matter for founders"
            desc="Founders often need to handle growth, communication, marketing, and operational decisions at the same time. Practical AI skills help make that execution more structured and more efficient."
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
            title="Main AI skill categories for founders"
            desc="A strong founder AI path should focus on practical skill areas that improve communication, clarity, marketing support, and execution workflows."
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
            title="Who can benefit from founder-focused AI skills"
            desc="Founder-focused AI skills are useful across multiple business roles when the learning path stays practical and execution-driven."
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
            desc="These pages connect founder-focused AI learning with the broader Sikhadenge topic cluster around skills, business execution, and AI-first digital capability."
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
            desc="These are the common questions people ask before starting AI skills as a founder."
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
