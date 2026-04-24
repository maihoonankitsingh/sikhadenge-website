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
  Megaphone,
  MessageSquareText,
  Search,
  Sparkles,
  Target,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Small Business | Sikhadenge",
  description:
    "Explore the best AI skills for small businesses across marketing, customer communication, content, operations, workflows, and digital execution. A practical guide for founders, operators, and small teams.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-small-business",
  },
  openGraph: {
    title: "Best AI Skills for Small Business | Sikhadenge",
    description:
      "A practical guide to the best AI skills for small businesses across marketing, communication, content, workflows, and digital execution.",
    url: "https://sikhadenge.in/ai-skills-for-small-business",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Small Business | Sikhadenge",
    description:
      "A practical guide to the best AI skills for small businesses across marketing, communication, content, workflows, and digital execution.",
  },
};

const quickInfo = [
  {
    title: "Business efficiency",
    desc: "AI skills help small businesses improve output speed, reduce repetitive work, and organize digital tasks better.",
  },
  {
    title: "Better execution",
    desc: "The right AI skills support marketing, communication, content, and internal workflow consistency.",
  },
  {
    title: "Practical value",
    desc: "Useful AI skills for small businesses are the ones that solve real execution problems, not just create experiments.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Small teams handle many tasks",
    desc: "Small businesses often manage content, leads, communication, marketing, and operations with limited people and time.",
  },
  {
    icon: Workflow,
    title: "Manual processes slow growth",
    desc: "Without systems, repeated business tasks consume too much time and reduce the speed of execution.",
  },
  {
    icon: Bot,
    title: "AI can support multiple functions",
    desc: "AI skills can help with content creation, messaging, lead handling, workflow support, and internal task organization.",
  },
  {
    icon: Briefcase,
    title: "Execution quality matters",
    desc: "Small businesses grow faster when they improve day-to-day execution instead of depending only on more manpower.",
  },
];

const skillCategories = [
  {
    icon: MessageSquareText,
    title: "Customer Communication Skills",
    desc: "Small businesses should learn how AI supports replies, FAQs, follow-ups, first-contact communication, and structured customer messaging.",
  },
  {
    icon: Megaphone,
    title: "Marketing Support Skills",
    desc: "Useful skills include ad messaging, offer writing, campaign idea support, social promotion content, and digital communication execution.",
  },
  {
    icon: FileText,
    title: "Content Support Skills",
    desc: "Businesses benefit when they can use AI for captions, posts, WhatsApp drafts, script outlines, service explanations, and branded communication.",
  },
  {
    icon: Funnel,
    title: "Lead & Funnel Skills",
    desc: "A practical AI skill is learning how to support landing sections, CTA messaging, lead flows, and basic conversion communication.",
  },
  {
    icon: Search,
    title: "Research & Idea Skills",
    desc: "Useful small-business skills include market understanding, competitor observation, service angle exploration, and content idea discovery.",
  },
  {
    icon: Workflow,
    title: "Workflow & Operations Skills",
    desc: "Small teams should learn how AI fits into repeatable tasks like planning, reviewing, following up, documenting, and internal process support.",
  },
];

const useCases = [
  {
    icon: Building2,
    title: "Founders",
    desc: "Founders can use AI skills to support marketing, messaging, decision clarity, content flow, and day-to-day digital execution.",
  },
  {
    icon: Users,
    title: "Small Teams",
    desc: "Small teams can use AI skills to improve communication, content consistency, lead support, and recurring workflow efficiency.",
  },
  {
    icon: Target,
    title: "Service Businesses",
    desc: "Service businesses can use AI to improve first-contact messaging, client communication, content support, and offer explanation.",
  },
  {
    icon: Wrench,
    title: "Execution Operators",
    desc: "Operators handling leads, content, pages, or coordination can use AI skills to make systems smoother and faster.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect small-business execution with practical digital work.",
  },
  {
    href: "/ai-tools-for-marketing",
    title: "AI Tools for Marketing",
    desc: "See which AI tools help businesses with messaging, campaign support, content, and growth execution.",
  },
  {
    href: "/corporate-training",
    title: "Corporate Training",
    desc: "Explore how structured AI capability building can support business teams and operational execution.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Review the wider AI skill categories that matter for practical business growth and digital capability.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how small-business AI skills fit into a broader AI Expert capability system.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how practical AI-first business execution is taught.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for small businesses?",
    a: "Useful AI skills for small businesses include customer communication support, marketing support, content creation, lead flow support, research, and workflow organization.",
  },
  {
    q: "Can AI skills help small teams work faster?",
    a: "Yes. AI skills can reduce repetitive work, improve consistency, support content and messaging, and help small teams execute digital tasks more efficiently.",
  },
  {
    q: "Do small businesses need coding to use AI skills?",
    a: "No. Many practical AI skills for small businesses do not require coding. A strong starting point is content, communication, lead support, and workflow improvement.",
  },
  {
    q: "Are AI tools and AI skills the same for businesses?",
    a: "No. AI tools are the platforms or software. AI skills are the practical abilities to use those tools effectively for real business tasks and structured execution.",
  },
  {
    q: "Can founders use AI skills even without a big team?",
    a: "Yes. Founders can use AI skills to improve communication, content systems, lead handling, marketing execution, and internal task support even with a small team.",
  },
  {
    q: "What is the biggest mistake small businesses make with AI?",
    a: "A common mistake is using AI randomly without connecting it to real business workflows like lead handling, content systems, customer support, or execution processes.",
  },
  {
    q: "Can AI skills help with leads, marketing, and communication?",
    a: "Yes. AI skills can support follow-ups, messaging, ad communication, content flow, CTA writing, and basic lead-handling communication systems.",
  },
  {
    q: "Where should small businesses start learning AI properly?",
    a: "A structured learning path is the best starting point. Begin with communication, content, marketing, and workflow use cases instead of random tool exploration.",
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

export default function AiSkillsForSmallBusinessPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Small Business AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for small business
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Small businesses do not need advanced AI complexity to get value. They need practical AI skills
              that improve communication, content, lead support, marketing execution, and internal workflows.
              A strong small-business AI path starts with useful skills that reduce repetitive work and improve
              day-to-day execution quality.
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
            title="Why AI skills matter for small businesses"
            desc="Small businesses often need to do more with fewer people. Practical AI skills help founders and teams improve speed, structure, and digital execution without adding unnecessary complexity."
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
            title="Main AI skill categories for small businesses"
            desc="A strong small-business AI path should focus on practical skills that improve communication, marketing, operations, and execution speed."
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
            title="Who can benefit from small-business AI skills"
            desc="Small-business-focused AI skills are useful across multiple business roles when the learning path stays practical and execution-driven."
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
            desc="These pages connect small-business AI learning with the broader Sikhadenge topic cluster around skills, tools, marketing, and AI-first digital capability."
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
            desc="These are the common questions people ask before starting AI skills for small-business execution."
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
