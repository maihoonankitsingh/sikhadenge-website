import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Briefcase,
  FileText,
  Funnel,
  GraduationCap,
  Lightbulb,
  LineChart,
  Megaphone,
  MousePointerClick,
  Search,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Tools for Marketing | Sikhadenge",
  description:
    "Explore the best AI tools for marketing across campaign planning, copywriting, creative support, audience research, funnels, and workflow execution. A practical guide for creators, freelancers, students, and digital teams.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-tools-for-marketing",
  },
  openGraph: {
    title: "Best AI Tools for Marketing | Sikhadenge",
    description:
      "A practical guide to the best AI tools for marketing across campaign planning, copywriting, creative support, funnels, and workflow execution.",
    url: "https://sikhadenge.in/ai-tools-for-marketing",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Tools for Marketing | Sikhadenge",
    description:
      "A practical guide to the best AI tools for marketing across campaign planning, copywriting, creative support, funnels, and workflow execution.",
  },
};

const quickInfo = [
  {
    title: "Campaign speed",
    desc: "AI tools can reduce time spent on ideation, messaging, ad drafts, and asset planning.",
  },
  {
    title: "Execution support",
    desc: "The right tool mix helps with copy, creatives, audience thinking, funnels, and workflow consistency.",
  },
  {
    title: "Practical value",
    desc: "Useful marketing tools improve clarity, speed, and testing support instead of only generating random content.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Marketing needs more output",
    desc: "Modern marketing teams and solo operators need more creatives, more copies, and faster campaign execution across channels.",
  },
  {
    icon: Workflow,
    title: "Manual execution is slow",
    desc: "Without systems, campaign planning, creative support, copy writing, and funnel tasks become repetitive and hard to scale.",
  },
  {
    icon: Bot,
    title: "AI can support marketing flow",
    desc: "AI tools can help with offers, headlines, content drafts, ad ideas, audience thinking, and workflow support.",
  },
  {
    icon: Briefcase,
    title: "Marketing skill is highly useful",
    desc: "Freelancers, creators, small teams, marketers, and digital operators all benefit when marketing work becomes more structured.",
  },
];

const toolCategories = [
  {
    icon: Lightbulb,
    title: "Campaign Ideation Tools",
    desc: "Tools that help with campaign concepts, ad angles, content pillars, offer directions, and idea generation for marketing work.",
  },
  {
    icon: FileText,
    title: "Copywriting Tools",
    desc: "Tools that help with ad copy, hooks, headlines, captions, offers, landing section text, and campaign messaging support.",
  },
  {
    icon: Megaphone,
    title: "Creative Support Tools",
    desc: "Tools that support ad creative planning, visual prompts, asset direction, and marketing content execution workflows.",
  },
  {
    icon: Search,
    title: "Audience Research Tools",
    desc: "Tools that help with understanding user intent, content themes, keyword thinking, and market research support.",
  },
  {
    icon: Funnel,
    title: "Funnel & Page Tools",
    desc: "Tools that support landing page sections, CTA structure, offer communication, and conversion-supporting page thinking.",
  },
  {
    icon: Workflow,
    title: "Marketing Workflow Tools",
    desc: "Tools that support campaign organization, planning systems, asset tracking, review flow, and repeatable execution models.",
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Students can use AI marketing tools to understand modern campaigns, copy structure, and practical digital communication.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can use AI to improve campaign delivery, client communication, offer framing, and faster asset support.",
  },
  {
    icon: Users,
    title: "Creators",
    desc: "Creators can use AI tools for content campaigns, brand deals, ad ideas, social assets, and promotion workflows.",
  },
  {
    icon: BarChart3,
    title: "Digital Teams",
    desc: "Small teams can use AI tools to improve campaign planning, copy systems, creative support, and execution consistency.",
  },
];

const relatedPaths = [
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "Explore the broader AI tools ecosystem across marketing, design, content, video, automation, and digital execution.",
  },
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Understand the broader AI skill categories that connect marketing tools with practical execution and real workflows.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Review the AI skill categories that matter most for modern marketing, content systems, and digital execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how marketing-focused AI tools fit inside a broader AI Expert capability model.",
  },
  {
    href: "/courses",
    title: "Courses",
    desc: "Explore the Sikhadenge learning path that combines AI marketing with broader AI-first digital capability.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how AI-first marketing execution is taught in practice.",
  },
];

const faqs = [
  {
    q: "What are AI tools for marketing?",
    a: "AI tools for marketing are tools that support campaign ideation, copywriting, creative planning, research, funnels, and workflow execution across digital marketing tasks.",
  },
  {
    q: "Can AI tools help with ad copy and campaigns?",
    a: "Yes. Many AI tools can support ad copy drafts, offers, hooks, messaging ideas, campaign directions, and content planning for digital marketing work.",
  },
  {
    q: "Are AI tools enough to become a strong marketer?",
    a: "No. AI tools can speed up execution, but strong marketing still needs audience understanding, positioning clarity, offer thinking, testing judgment, and strategic decisions.",
  },
  {
    q: "Which AI tools are useful for marketing work?",
    a: "Useful tools depend on the workflow, but the main categories include campaign ideation tools, copywriting tools, creative support tools, research tools, funnel tools, and workflow tools.",
  },
  {
    q: "Who should learn AI tools for marketing?",
    a: "Students, freelancers, creators, marketers, founders, and small digital teams can all benefit from marketing-focused AI tools when they want faster and clearer execution.",
  },
  {
    q: "Can beginners start using AI tools for marketing?",
    a: "Yes. Beginners can start with use cases like ad ideas, basic copywriting, campaign planning, CTA support, and structured content workflows before moving into advanced systems.",
  },
  {
    q: "What is the difference between marketing tools and marketing skills?",
    a: "Marketing tools are platforms or software. Marketing skills are the practical abilities to use those tools effectively for messaging, campaigns, offers, funnels, and execution quality.",
  },
  {
    q: "Where should I start learning AI tools for marketing properly?",
    a: "A structured learning path is the best starting point. Begin with campaign thinking, copy support, creative support, and funnel basics instead of random tool experiments.",
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

export default function AiToolsForMarketingPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Market with AI Tools Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI tools for marketing
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI tools for marketing can support campaign ideation, messaging, copywriting, creative direction,
              funnel thinking, audience research, and execution workflows. The best marketing tools are not just
              generators. They are practical systems that help learners and teams improve clarity, speed, and
              output across real digital marketing tasks.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-tools"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Tools
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
            title="Why AI tools matter for marketing"
            desc="Modern marketing needs faster campaigns, stronger messaging, and more content support across multiple channels. AI tools can support marketers by improving speed, structure, and execution consistency."
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
            pill="Tool categories"
            title="Main AI tool categories for marketing work"
            desc="The strongest marketing workflows usually combine multiple categories of AI tools instead of depending on only one output shortcut."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {toolCategories.map((item) => {
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
            title="Who can use these tools effectively"
            desc="Marketing-focused AI tools are useful across multiple audiences when they are applied inside a clear execution workflow."
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
            desc="These pages connect marketing-focused AI tools with the broader Sikhadenge topic cluster around skills, tools, creators, and AI-first digital execution."
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
            desc="These are the common questions people ask before choosing AI tools for marketing and campaign execution workflows."
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
