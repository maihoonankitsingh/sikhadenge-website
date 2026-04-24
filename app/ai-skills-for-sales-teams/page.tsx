import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  ClipboardList,
  FileText,
  Funnel,
  Headphones,
  Lightbulb,
  Megaphone,
  MessageSquareText,
  PhoneCall,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Sales Teams | Sikhadenge",
  description:
    "Explore the best AI skills for sales teams across lead communication, follow-up systems, objection handling, call support, CRM workflows, and practical execution. A useful guide for counselors, sales teams, and business operators.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-sales-teams",
  },
  openGraph: {
    title: "Best AI Skills for Sales Teams | Sikhadenge",
    description:
      "A practical guide to the best AI skills for sales teams across lead communication, follow-up systems, objection handling, and workflow execution.",
    url: "https://sikhadenge.in/ai-skills-for-sales-teams",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Sales Teams | Sikhadenge",
    description:
      "A practical guide to the best AI skills for sales teams across lead communication, follow-up systems, objection handling, and workflow execution.",
  },
};

const quickInfo = [
  {
    title: "Sales relevance",
    desc: "Modern sales teams benefit when they can use AI across lead communication, follow-up flow, and message structuring.",
  },
  {
    title: "Execution support",
    desc: "The right AI skills help teams move faster in replies, call preparation, objection handling, and CRM-related tasks.",
  },
  {
    title: "Practical value",
    desc: "Useful sales AI skills improve consistency, speed, and lead handling quality more than random automation alone.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Sales teams handle repeated communication",
    desc: "Sales work often includes repeated replies, follow-ups, pitch explanations, call preparation, and lead qualification tasks.",
  },
  {
    icon: Workflow,
    title: "Manual follow-up creates inconsistency",
    desc: "Without systems, replies become uneven, lead handling slows down, and follow-up quality varies across team members.",
  },
  {
    icon: Bot,
    title: "AI can support structured sales work",
    desc: "Practical AI skills help with scripts, communication drafts, objection support, lead notes, and workflow organization.",
  },
  {
    icon: Briefcase,
    title: "Sales quality depends on execution",
    desc: "Sales teams perform better when messaging, follow-up systems, and communication clarity become more consistent.",
  },
];

const skillCategories = [
  {
    icon: MessageSquareText,
    title: "Lead Communication Skills",
    desc: "Sales teams should learn how AI supports first replies, WhatsApp drafts, neutral message structuring, and consistent lead communication.",
  },
  {
    icon: PhoneCall,
    title: "Call Support Skills",
    desc: "Useful skills include call prep support, talking points, summary support, explanation drafts, and structured follow-up after calls.",
  },
  {
    icon: Lightbulb,
    title: "Objection Handling Skills",
    desc: "A practical AI skill is learning how to create better responses for doubts, hesitation, pricing questions, and delayed decision cases.",
  },
  {
    icon: Funnel,
    title: "Lead Qualification Skills",
    desc: "Sales operators benefit when they can use AI to support qualification logic, lead notes, category thinking, and structured follow-up prioritization.",
  },
  {
    icon: ClipboardList,
    title: "CRM & Note Skills",
    desc: "Strong sales skills include using AI to summarize conversations, structure notes, log observations, and improve CRM discipline.",
  },
  {
    icon: Workflow,
    title: "Workflow & Sales System Skills",
    desc: "Teams should learn how AI fits into repeatable systems like reply, qualify, call, note, follow-up, and conversion workflows.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Sales Teams",
    desc: "Sales teams can use AI skills to improve reply quality, speed, and follow-up structure across leads.",
  },
  {
    icon: Headphones,
    title: "Counselors",
    desc: "Counselors can use AI skills for clearer explanations, parent communication, doubt support, and structured lead handling.",
  },
  {
    icon: Target,
    title: "Closers",
    desc: "Closers can use AI skills to improve objection handling, summary support, and clearer conversation preparation.",
  },
  {
    icon: Megaphone,
    title: "Business Operators",
    desc: "Operators managing lead systems can use AI skills to strengthen communication workflows and execution consistency.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect sales work with practical digital execution.",
  },
  {
    href: "/ai-skills-for-small-business",
    title: "AI Skills for Small Business",
    desc: "See which AI skills help small teams improve communication, workflows, and business execution quality.",
  },
  {
    href: "/ai-skills-for-founders",
    title: "AI Skills for Founders",
    desc: "Review founder-focused AI skills that support communication, lead systems, and operational clarity.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Understand the wider AI skill categories that matter for practical team execution and growth systems.",
  },
  {
    href: "/corporate-training",
    title: "Corporate Training",
    desc: "Explore how structured AI capability building can support communication, workflows, and team execution.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how practical AI-first execution is taught.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for sales teams?",
    a: "Useful AI skills for sales teams include lead communication support, call prep support, objection handling support, qualification logic, note structuring, and repeatable follow-up workflow skills.",
  },
  {
    q: "Can AI skills help sales teams follow up better?",
    a: "Yes. AI skills can improve follow-up clarity, message consistency, lead notes, objection responses, and communication structure across the sales process.",
  },
  {
    q: "Do sales teams need coding to learn AI skills?",
    a: "No. Many practical AI skills for sales teams do not require coding. A strong starting point is communication, follow-up systems, call support, and note organization.",
  },
  {
    q: "Are AI tools and AI skills the same for sales work?",
    a: "No. AI tools are the platforms or software. AI skills are the practical abilities to use those tools effectively for real lead handling and sales execution.",
  },
  {
    q: "Can counselors and closers use AI skills in daily work?",
    a: "Yes. Counselors and closers can use AI skills for better replies, structured explanations, objection support, and follow-up communication workflows.",
  },
  {
    q: "What is the biggest mistake sales teams make with AI?",
    a: "A common mistake is using generic replies without adapting them to the lead stage, user intent, objection type, or communication context.",
  },
  {
    q: "Can AI skills help with WhatsApp, calls, and CRM notes?",
    a: "Yes. AI can support message drafts, call summaries, objection responses, follow-up ideas, and cleaner CRM note organization.",
  },
  {
    q: "Where should sales teams start learning AI properly?",
    a: "A structured learning path is the best starting point. Begin with lead communication, follow-up messaging, objection support, and repeatable sales workflows instead of random tool exploration.",
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

export default function AiSkillsForSalesTeamsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Sales Team AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for sales teams
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Sales teams do not need random AI automation to improve performance. They need practical AI skills
              that strengthen lead communication, follow-up systems, objection handling, call support, CRM notes,
              and repeatable sales execution. A strong sales path starts with useful skills that improve clarity,
              consistency, and team-level execution quality.
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
            title="Why AI skills matter for sales teams"
            desc="Sales performance often depends on consistent communication, fast follow-up, and structured lead handling. Practical AI skills help teams improve execution quality without losing process clarity."
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
            title="Main AI skill categories for sales teams"
            desc="A strong sales-team AI path should focus on practical skill areas that improve communication, structure, follow-up systems, and conversion execution."
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
            title="Who can benefit from sales-focused AI skills"
            desc="Sales-focused AI skills are useful across multiple team roles when the learning path stays practical and execution-driven."
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
            desc="These pages connect sales-focused AI learning with the broader Sikhadenge topic cluster around skills, communication, team execution, and AI-first digital capability."
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
            desc="These are the common questions people ask before starting AI skills for sales-team execution."
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
