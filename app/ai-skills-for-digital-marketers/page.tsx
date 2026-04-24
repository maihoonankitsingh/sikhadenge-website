import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Briefcase,
  FileText,
  Funnel,
  Lightbulb,
  LineChart,
  Megaphone,
  MousePointerClick,
  Search,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Digital Marketers | Sikhadenge",
  description:
    "Explore the best AI skills for digital marketers across copywriting, campaign planning, audience research, content systems, funnels, and workflow execution. A practical guide for marketers, freelancers, founders, and digital teams.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-digital-marketers",
  },
  openGraph: {
    title: "Best AI Skills for Digital Marketers | Sikhadenge",
    description:
      "A practical guide to the best AI skills for digital marketers across copywriting, campaigns, audience research, funnels, and workflow execution.",
    url: "https://sikhadenge.in/ai-skills-for-digital-marketers",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Digital Marketers | Sikhadenge",
    description:
      "A practical guide to the best AI skills for digital marketers across copywriting, campaigns, audience research, funnels, and workflow execution.",
  },
};

const quickInfo = [
  {
    title: "Campaign relevance",
    desc: "Modern marketers benefit when they can use AI across messaging, content, research, funnels, and execution support.",
  },
  {
    title: "Execution support",
    desc: "The right AI skills help marketers move faster across copy, planning, creative support, and repeatable workflows.",
  },
  {
    title: "Practical advantage",
    desc: "Useful AI skills improve marketing clarity and output quality more than random tool usage without strategy.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Marketing now needs more output",
    desc: "Digital marketing requires more content, more copies, more creatives, and more testing support across channels than before.",
  },
  {
    icon: Workflow,
    title: "Manual execution slows growth",
    desc: "Without structured systems, campaign ideation, content planning, offer writing, and funnel support become repetitive and hard to scale.",
  },
  {
    icon: Bot,
    title: "AI can strengthen execution",
    desc: "AI skills help marketers improve writing, planning, audience thinking, campaign support, and better execution consistency.",
  },
  {
    icon: Briefcase,
    title: "Marketers need practical adaptability",
    desc: "Freelancers, in-house marketers, founders, and small teams benefit when they can apply AI to real work instead of just knowing tool names.",
  },
];

const skillCategories = [
  {
    icon: FileText,
    title: "Copywriting Support Skills",
    desc: "Digital marketers should learn how AI supports headlines, ad copy, hooks, captions, CTAs, offers, and structured marketing messaging.",
  },
  {
    icon: Lightbulb,
    title: "Campaign Ideation Skills",
    desc: "Useful skills include ad angle generation, campaign theme exploration, offer direction, messaging options, and creative concept planning.",
  },
  {
    icon: Search,
    title: "Audience Research Skills",
    desc: "Strong marketer skills include using AI for understanding intent, identifying content themes, exploring market gaps, and comparing positioning ideas.",
  },
  {
    icon: Funnel,
    title: "Funnel & Page Thinking Skills",
    desc: "Marketers benefit when they can use AI to support landing page sections, CTA structure, offer framing, and conversion-supporting communication.",
  },
  {
    icon: Megaphone,
    title: "Content System Skills",
    desc: "A practical AI skill is learning how to create structured content workflows for posts, campaigns, promotion, and audience nurturing.",
  },
  {
    icon: Workflow,
    title: "Workflow & Productivity Skills",
    desc: "Digital marketers should learn how AI fits into planning, drafting, reviewing, organizing, and repeating campaign tasks efficiently.",
  },
];

const useCases = [
  {
    icon: Target,
    title: "Digital Marketers",
    desc: "Marketers can use AI skills to improve messaging, campaign planning, execution speed, and clearer content systems.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers offering marketing services can use AI skills to strengthen client delivery and handle broader campaign work.",
  },
  {
    icon: Users,
    title: "Founders & Small Teams",
    desc: "Small teams and founders can use AI skills to support promotions, landing pages, ad content, and growth-related digital work.",
  },
  {
    icon: BarChart3,
    title: "Performance Operators",
    desc: "Execution-focused operators can use AI skills to improve structured output across campaigns, assets, and workflow systems.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect marketing work with practical digital execution.",
  },
  {
    href: "/ai-tools-for-marketing",
    title: "AI Tools for Marketing",
    desc: "See which AI tools support campaigns, copy, research, funnels, and practical marketing execution.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Review the wider AI skill categories that matter for modern marketers and digital operators.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how marketing-focused AI skills fit inside a broader AI Expert capability model.",
  },
  {
    href: "/courses",
    title: "Courses",
    desc: "Explore the Sikhadenge learning path for structured AI-first digital capability building.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how practical AI-first marketing capability is taught.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for digital marketers?",
    a: "Useful AI skills for digital marketers include copywriting support, campaign ideation, audience research, content systems, funnel thinking, and workflow productivity.",
  },
  {
    q: "Can AI skills help marketers execute faster?",
    a: "Yes. AI skills can support planning, writing, content structuring, campaign ideation, and repeatable execution workflows, which makes marketing work faster and more structured.",
  },
  {
    q: "Do digital marketers need coding to learn AI skills?",
    a: "No. Many practical AI skills for digital marketers do not require coding. A strong starting point is messaging, content, research, and workflow support.",
  },
  {
    q: "Are AI tools and AI skills the same for marketers?",
    a: "No. AI tools are the platforms or software. AI skills are the practical abilities to use those tools effectively for campaigns, content, offers, and workflow execution.",
  },
  {
    q: "Can freelancers and founders benefit from marketing-focused AI skills?",
    a: "Yes. Freelancers and founders can use marketing-focused AI skills to improve promotions, creative direction, content systems, and faster campaign support.",
  },
  {
    q: "What is the biggest mistake marketers make with AI?",
    a: "A common mistake is generating random content without a clear campaign objective, audience angle, or workflow for refinement and testing.",
  },
  {
    q: "Can AI skills help with ads, landing pages, and funnels?",
    a: "Yes. AI can support offer framing, copy drafts, CTA ideas, landing page sections, campaign messaging, and conversion-focused communication workflows.",
  },
  {
    q: "Where should digital marketers start learning AI properly?",
    a: "A structured learning path is the best starting point. Begin with copy, campaign support, audience research, and repeatable marketing workflows instead of random tool exploration.",
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

export default function AiSkillsForDigitalMarketersPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Marketing AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for digital marketers
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Digital marketers do not need to become AI engineers to stay relevant. They need practical AI
              skills that improve messaging, research, campaign ideation, content systems, funnel thinking,
              and execution workflows. A strong marketer path starts with useful skills that create faster,
              clearer, and more structured real-world marketing output.
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
            title="Why AI skills matter for digital marketers"
            desc="Modern marketing work needs more output, more testing support, and faster execution across channels. Practical AI skills help marketers work with more structure, speed, and clarity."
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
            title="Main AI skill categories for digital marketers"
            desc="A strong digital marketer AI path should focus on practical skills that improve campaigns, messaging, research, and execution quality."
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
            title="Who can benefit from marketing-focused AI skills"
            desc="Marketing-focused AI skills are useful across multiple audience types when the learning path stays practical and execution-oriented."
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
            desc="These pages connect marketing-focused AI learning with the broader Sikhadenge topic cluster around skills, tools, marketers, and AI-first digital capability."
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
            desc="These are the common questions people ask before starting AI skills for digital marketing."
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
