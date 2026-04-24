import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  FileText,
  FolderKanban,
  GraduationCap,
  LayoutTemplate,
  Megaphone,
  MessageSquareText,
  Search,
  Sparkles,
  Users,
  Wallet,
  Wand2,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Tools for Freelancers in India | Sikhadenge",
  description:
    "Explore practical AI tools for freelancers in India across client work, proposals, content, design support, marketing, workflows, and productivity, and understand how Sikhadenge connects these tools to scalable freelance execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-tools-for-freelancers",
  },
  openGraph: {
    title: "AI Tools for Freelancers in India | Sikhadenge",
    description:
      "A practical guide to AI tools for freelancers in India across client work, proposals, content, design support, marketing, workflows, and productivity.",
    url: "https://sikhadenge.in/ai-tools-for-freelancers",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools for Freelancers in India | Sikhadenge",
    description:
      "A practical guide to AI tools for freelancers in India across client work, proposals, content, design support, marketing, workflows, and productivity.",
  },
};

const quickInfo = [
  {
    title: "Delivery speed",
    desc: "AI tools can help freelancers complete work faster across planning, writing, visuals, edits, and workflow execution.",
  },
  {
    title: "Service support",
    desc: "The right tool mix helps with client communication, proposals, content, assets, and better delivery systems.",
  },
  {
    title: "Practical value",
    desc: "Useful freelance tools are the ones that improve quality, speed, and consistency in real client work.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Freelance work is becoming multi-skill",
    desc: "Clients often expect faster delivery, better communication, and broader support across content, visuals, pages, and campaigns.",
  },
  {
    icon: Workflow,
    title: "Manual freelance work is slow",
    desc: "Without the right systems, proposals, content support, revisions, and execution tasks become repetitive and difficult to scale.",
  },
  {
    icon: Bot,
    title: "AI can support client execution",
    desc: "AI tools can help freelancers with research, ideation, writing, visuals, messaging, workflows, and operational support.",
  },
  {
    icon: Wallet,
    title: "Freelancing rewards efficiency",
    desc: "Freelancers benefit when they can increase quality, improve speed, and handle more client work with better systems.",
  },
];

const toolCategories = [
  {
    icon: MessageSquareText,
    title: "Client Communication Tools",
    desc: "Tools that help with client messages, replies, onboarding text, follow-ups, explanation support, and communication clarity.",
  },
  {
    icon: FileText,
    title: "Proposal & Copy Tools",
    desc: "Tools that help with proposals, service descriptions, gig writing, captions, ad copy, and project documentation support.",
  },
  {
    icon: Wand2,
    title: "Content & Creative Tools",
    desc: "Tools that support content writing, visuals, ad assets, short-form ideas, branding support, and social execution work.",
  },
  {
    icon: LayoutTemplate,
    title: "Page & Presentation Tools",
    desc: "Tools that support landing page thinking, portfolio presentation, offer communication, and structured delivery support.",
  },
  {
    icon: Search,
    title: "Research & Discovery Tools",
    desc: "Tools that help with research, niche understanding, competitor analysis, idea discovery, and faster project preparation.",
  },
  {
    icon: Workflow,
    title: "Workflow & Productivity Tools",
    desc: "Tools that support task organization, project systems, prompt libraries, repeatable workflows, and delivery consistency.",
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Beginners",
    desc: "Beginners can use AI tools to start offering simple freelance services with better structure and faster learning support.",
  },
  {
    icon: Briefcase,
    title: "Service Freelancers",
    desc: "Freelancers can use AI tools to improve quality, reduce repetitive effort, and manage broader client requirements.",
  },
  {
    icon: Users,
    title: "Creators",
    desc: "Creators doing freelance work can use AI for content, visuals, short-form support, and personal brand communication.",
  },
  {
    icon: FolderKanban,
    title: "Digital Operators",
    desc: "Operators and execution-focused freelancers can use AI tools to support content, pages, campaigns, and workflow management.",
  },
];

const relatedPaths = [
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "Explore the broader AI tools ecosystem across content, design, video, automation, and digital execution.",
  },
  {
    href: "/ai-skills-for-freelancers",
    title: "AI Skills for Freelancers",
    desc: "See which AI skills matter most for freelancers who want practical delivery power and stronger client work capability.",
  },
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Understand the broader AI skill categories that connect tools with real work, output quality, and structured execution.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Review the AI skill categories that matter most for modern freelancers and multi-skill digital work.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how freelance-focused AI tools fit inside a broader AI Expert capability system.",
  },
  {
    href: "/courses",
    title: "Courses",
    desc: "Explore the Sikhadenge learning path that combines practical AI tools with broader digital execution capability.",
  },
];

const faqs = [
  {
    q: "What are AI tools for freelancers?",
    a: "AI tools for freelancers are tools that support client communication, proposals, content work, visual support, research, workflow organization, and overall delivery efficiency.",
  },
  {
    q: "Can AI tools help freelancers deliver faster?",
    a: "Yes. AI tools can reduce time spent on repetitive work such as writing drafts, preparing proposals, planning content, creating support assets, and organizing workflows.",
  },
  {
    q: "Are AI tools enough to become a successful freelancer?",
    a: "No. AI tools can improve speed and execution, but success in freelancing still depends on skill quality, client trust, communication, delivery discipline, and positioning.",
  },
  {
    q: "Which AI tools are useful for freelancers?",
    a: "Useful tools depend on the service type, but the main categories include communication tools, proposal tools, content and creative tools, research tools, page tools, and workflow tools.",
  },
  {
    q: "Who should learn AI tools for freelancing?",
    a: "Beginners, service freelancers, creators, digital operators, marketers, and small independent professionals can all benefit from freelance-focused AI tools.",
  },
  {
    q: "Can beginners use AI tools to start freelancing?",
    a: "Yes. Beginners can start with simple use cases like service descriptions, client communication, content support, basic visuals, and structured project workflows.",
  },
  {
    q: "What is the difference between freelance tools and freelance skills?",
    a: "Freelance tools are platforms or software. Freelance skills are the practical abilities to use those tools effectively while delivering useful client outcomes and maintaining quality.",
  },
  {
    q: "Where should I start learning AI tools for freelancing properly?",
    a: "A structured learning path is the best starting point. Begin with client communication, content support, offer presentation, and repeatable delivery systems instead of random tool use.",
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

export default function AiToolsForFreelancersPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="relative overflow-hidden border-b border-[#E4ECF7] bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.10),_transparent_35%),linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 right-0 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl"></div>
          <div className="absolute bottom-0 left-10 h-40 w-40 rounded-full bg-slate-100 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>AI Freelancer Tools Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-black leading-[1.02] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI tools for freelancers who want better delivery, better systems, and better client results
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI tools for freelancers can support client communication, proposals, content work, creative assets, research, service delivery, and workflow systems. The best freelance tools are not just productivity hacks. They are practical support systems that help independent professionals deliver faster, work more clearly, and build better service quality across modern digital projects.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-2xl bg-[#2563EB] px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-tools"
                className="inline-flex items-center justify-center rounded-2xl border border-[#CFE0F6] bg-white px-6 py-3.5 text-[15px] font-bold text-[#0A2245] transition hover:-translate-y-0.5 hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
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
            title="Why AI tools matter for freelancers"
            desc="Freelance work often requires speed, flexibility, communication clarity, and broad execution support. AI tools can help freelancers work faster while keeping better structure and consistency."
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
            title="Main AI tool categories for freelance work"
            desc="The strongest freelance workflows usually combine multiple categories of AI tools instead of depending on only one shortcut."
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
            desc="Freelance-focused AI tools are useful across multiple audiences when they are applied inside a clear service and delivery workflow."
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
            desc="These pages connect freelance-focused AI tools with the broader Sikhadenge topic cluster around skills, tools, creators, and AI-first digital execution."
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
            desc="These are the common questions people ask before choosing AI tools for freelance work, service delivery, and client workflows."
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

      <section className="border-t border-slate-100 bg-[#07152E] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(15,23,42,0.9))] p-8 shadow-[0_24px_80px_rgba(2,6,23,0.45)] sm:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-200 sm:text-sm">
              Final Next Step
            </div>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Start using practical AI tools for freelance growth with Sikhadenge
            </h2>
            <p className="mb-8 text-sm leading-7 text-slate-300 sm:text-base">
              Learn how freelance-focused AI tools support client work, proposals, content, research, delivery systems, and real business execution. Start with the free masterclass and move toward faster delivery and stronger client value.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 sm:text-base"
              >
                Join Free AI Masterclass
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:text-base"
              >
                Explore Courses
              </Link>
            </div>
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
