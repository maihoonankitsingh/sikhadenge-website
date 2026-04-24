import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Briefcase, Lightbulb, Search, Sparkles, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "What Is an AI Expert | Sikhadenge",
  description:
    "Understand what an AI Expert is, why this role matters, which skills are involved, and how this AI-first capability connects with modern digital work, tools, workflows, and practical execution.",
  alternates: {
    canonical: "https://sikhadenge.in/what-is-ai-generalist",
  },
  openGraph: {
    title: "What Is an AI Expert | Sikhadenge",
    description:
      "Understand what an AI Expert is, why this role matters, which skills are involved, and how this AI-first capability connects with modern digital work, tools, workflows, and practical execution.",
    url: "https://sikhadenge.in/what-is-ai-generalist",
    siteName: "Sikhadenge",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is an AI Expert | Sikhadenge",
    description:
      "Understand what an AI Expert is, why this role matters, which skills are involved, and how this AI-first capability connects with modern digital work, tools, workflows, and practical execution.",
  },
};

const faqs = [
  {
    q: "What is an AI Expert?",
    a: "An AI Expert is someone who can use AI across multiple digital execution areas such as content, design, video, marketing support, tools, workflows, and modern business tasks.",
  },
  {
    q: "Is an AI Expert a real career path?",
    a: "Yes. As digital work becomes more connected, broader AI-assisted capability is becoming more relevant across freelancing, creator work, startup teams, marketing, and digital execution roles.",
  },
  {
    q: "Which skills are important for an AI Expert?",
    a: "Important AI Expert skills usually include content creation, prompt clarity, design support, video support, workflow thinking, tool selection, and practical digital execution across multiple outputs.",
  },
  {
    q: "Who should learn AI Expert skills?",
    a: "Students, freelancers, creators, career switchers, marketers, operators, and digital workers can all benefit from AI Expert capability.",
  },
  {
    q: "Where should someone start?",
    a: "A good starting point is to understand the role clearly, learn the core skill buckets, explore practical AI tools, and build connected workflows instead of learning random tools without structure.",
  },
  {
    q: "Can AI Expert skills help with earning opportunities?",
    a: "Yes. These skills can support freelance services, client work, digital execution roles, creator systems, and broader project-based opportunities.",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#245EEA] shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
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
      <h2 className="mt-6 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#071533] md:text-[48px]">
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 max-w-4xl text-[17px] leading-[1.8] text-[#47607F] md:text-[18px]">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

export default function WhatIsAiGeneralistPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>AI Blog Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[40px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[62px]">
              What is an AI Expert
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              An AI Expert is a person who can use AI across multiple digital work areas instead of depending on one
              isolated workflow. This includes content support, design direction, video assistance, AI tools, workflow
              thinking, and practical digital execution. As modern work becomes more connected, this kind of broad
              capability is becoming more valuable for learners, freelancers, creators, and teams.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-generalist"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Expert
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Concept"
            title="What the role actually means"
            desc="The idea behind an AI Expert is not just knowing tool names. It is about using AI across connected execution areas with practical clarity."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Sparkles,
                title: "More than one tool",
                desc: "An AI Expert does not stay limited to one AI platform. The role becomes useful because it connects multiple tools and outputs into one practical working system.",
              },
              {
                icon: Workflow,
                title: "More than one output type",
                desc: "This capability often includes content, visuals, short-form video, workflows, prompts, support systems, and AI-assisted execution across multiple digital tasks.",
              },
              {
                icon: Bot,
                title: "AI is used with structure",
                desc: "Random prompting is not enough. The value comes from knowing where AI fits, how to use it, and how to turn it into repeatable output quality.",
              },
              {
                icon: Briefcase,
                title: "Practical work relevance matters",
                desc: "The role becomes valuable because it supports real-world needs such as client work, digital projects, content systems, creator workflows, marketing execution, and business operations.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-[#D8E5F4] bg-white p-7 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-[78px] w-[78px] items-center justify-center rounded-[22px] border border-[#CFE0F6] bg-[#EAF2FE]">
                    <Icon className="h-7 w-7 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-6 text-[20px] font-semibold text-[#071533]">{item.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.85] text-[#47607F]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Use cases"
            title="Where AI Expert skills are useful"
            desc="This role matters because broad AI capability can create value in multiple practical directions."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Students",
                desc: "Students can build more modern digital capability by learning how AI connects across skills instead of learning isolated tools without execution context.",
              },
              {
                title: "Freelancers",
                desc: "Freelancers can use AI Expert skills to offer broader services, handle different project needs, and improve delivery speed across client work.",
              },
              {
                title: "Creators",
                desc: "Creators can use AI across content planning, visuals, video systems, scripting, publishing support, and execution workflows.",
              },
              {
                title: "Modern digital teams",
                desc: "Small teams and operators benefit when one person can support multiple digital layers including communication, assets, workflows, and AI-assisted production.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#D8E5F4] bg-[#FBFDFF] p-7 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <h3 className="text-[20px] font-semibold text-[#071533]">{item.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.85] text-[#47607F]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Tools"
            title="Which tools and systems support this role"
            desc="AI Expert capability usually sits on top of multiple tools and systems rather than one platform."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              "AI writing and content tools",
              "AI image and design support tools",
              "AI video support tools",
              "Prompt and workflow systems",
              "Landing page and content structure tools",
              "AI-assisted productivity and documentation tools",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Search className="mt-0.5 h-5 w-5 text-[#2563EB]" />
                  <p className="text-[16px] font-semibold leading-[1.7] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Workflow"
            title="How someone should start learning this properly"
            desc="The strongest learning path is structured. The goal is to build connected capability instead of random knowledge."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {[
              "Understand the AI Expert role clearly",
              "Learn core AI skill buckets",
              "Explore the right AI tools",
              "Practice connected workflows",
              "Build real output-based projects",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-[26px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="text-sm font-semibold text-[#2563EB]">Step {index + 1}</div>
                <p className="mt-3 text-[16px] font-semibold leading-[1.75] text-[#071533]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Related pages"
            title="Explore connected AI pages"
            desc="These pages connect this blog guide with the wider Sikhadenge AI learning cluster."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/ai-skills", label: "AI Skills" },
              { href: "/ai-tools", label: "AI Tools" },
              { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
              { href: "/ai-content-workflows", label: "Create Content with Automate Work with AI" },
              { href: "/ai-design-workflows", label: "Design with Automate Work with AI" },
              { href: "/ai-video-production-workflows", label: "Edit Videos with Automate Work with AI" },
              { href: "/ai-marketing-workflows", label: "Market with Automate Work with AI" },
              { href: "/site-map", label: "HTML Sitemap" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-[22px] border border-[#D8E5F4] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition hover:border-[#BFD4F3] hover:bg-[#FBFDFF]"
              >
                <span className="text-[15px] font-semibold text-[#071533]">{item.label}</span>
                <ArrowRight className="h-4 w-4 text-[#2563EB] transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="FAQs"
            title="Frequently asked questions"
            desc="These are the most common questions people ask before exploring AI Expert learning paths."
          />

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-[24px] border border-[#D8E5F4] bg-[#FBFDFF] px-6 py-5 shadow-[0_6px_18px_rgba(15,23,42,0.03)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-semibold leading-[1.5] text-[#071533] marker:content-none">
                  <span>{item.q}</span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#D8E5F4] bg-white text-[#2563EB] transition group-open:rotate-180">
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
