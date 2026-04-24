import type { Metadata } from "next";
import {
  Blocks,
  BriefcaseBusiness,
  Clapperboard,
  FileText,
  Globe,
  HandCoins,
  LayoutTemplate,
  Lightbulb,
  Megaphone,
  PenTool,
  Rocket,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

import SectionHeader from "@/app/components/brand/SectionHeader";
import LightFeatureCard from "@/app/components/brand/LightFeatureCard";
import DarkCapabilityCard from "@/app/components/brand/DarkCapabilityCard";
import FaqBlock, { type FaqItem } from "@/app/components/brand/FaqBlock";

export const metadata: Metadata = {
  title: "AI Skills for Freelancers in India | Sikhadenge",
  description:
    "Discover the practical AI skills freelancers in India should build across content, design, video, pages, client execution, and workflows to become more useful, more competitive, and more scalable with Sikhadenge.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-freelancers",
  },
};

const whyCards = [
  {
    icon: <HandCoins className="h-9 w-9" />,
    title: "Freelancers need stronger service capability",
    description:
      "Freelancers often lose opportunities when they can only offer one narrow skill. Broader AI-assisted capability helps them handle more client needs with better execution.",
  },
  {
    icon: <Sparkles className="h-9 w-9" />,
    title: "AI improves speed and delivery quality",
    description:
      "When used properly, AI helps freelancers move faster on ideas, drafts, production support, and recurring execution work without lowering output quality.",
  },
  {
    icon: <Blocks className="h-9 w-9" />,
    title: "Modern clients want multi-skill support",
    description:
      "Many clients need help across content, design, pages, visuals, video, and communication. Freelancers who can support connected tasks become more valuable.",
  },
  {
    icon: <Rocket className="h-9 w-9" />,
    title: "Broader execution creates growth leverage",
    description:
      "Freelancers who understand AI-assisted workflows can improve turnaround time, offer stronger solutions, and build better long-term client trust.",
  },
];

const skillCards = [
  {
    icon: <PenTool className="h-9 w-9" />,
    title: "Creative and visual support",
    description:
      "Freelancers should know how to support thumbnails, social creatives, design assets, layouts, and visual execution with AI-assisted workflows.",
  },
  {
    icon: <FileText className="h-9 w-9" />,
    title: "Content and messaging execution",
    description:
      "Scripts, captions, sales copy, content drafts, briefs, and communication systems are highly useful skills for client work across industries.",
  },
  {
    icon: <Clapperboard className="h-9 w-9" />,
    title: "Video workflow support",
    description:
      "Freelancers benefit from understanding reels, short-form edits, promo flows, video content planning, and AI-assisted execution support.",
  },
  {
    icon: <LayoutTemplate className="h-9 w-9" />,
    title: "Landing pages and digital assets",
    description:
      "Clients often need help with sections, page structure, offer presentation, website support, and conversion-oriented digital execution.",
  },
  {
    icon: <Megaphone className="h-9 w-9" />,
    title: "Campaign and launch execution",
    description:
      "AI skills are useful for ad support, offer communication, campaign content, launch assets, and coordinated execution across client projects.",
  },
  {
    icon: <Workflow className="h-9 w-9" />,
    title: "Workflow and delivery systems",
    description:
      "Freelancers should build systems for revisions, internal task flow, documentation, recurring output, and more organized client execution.",
  },
];

const outcomeCards = [
  {
    icon: <BriefcaseBusiness className="h-10 w-10" />,
    title: "Stronger client value",
    description:
      "Freelancers become more useful when they can support multiple connected digital tasks instead of offering only one isolated service.",
  },
  {
    icon: <HandCoins className="h-10 w-10" />,
    title: "Better earning potential",
    description:
      "Broader execution capability can improve pricing power because freelancers can contribute more deeply to client projects and outcomes.",
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Higher retention potential",
    description:
      "Clients are more likely to continue with freelancers who can support content, visuals, pages, communication, and workflow execution together.",
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "More market relevance",
    description:
      "Freelancers who adapt to AI-assisted work stay more relevant as digital expectations shift toward faster and broader execution.",
  },
  {
    icon: <Lightbulb className="h-10 w-10" />,
    title: "Better service confidence",
    description:
      "A clearer AI skill stack helps freelancers approach projects with stronger structure, better ideas, and more practical delivery support.",
  },
  {
    icon: <Workflow className="h-10 w-10" />,
    title: "Scalable delivery systems",
    description:
      "AI-assisted workflows help freelancers reduce repetitive effort and create more repeatable service systems over time.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Which AI skills are best for freelancers right now?",
    answer:
      "The most useful AI skills for freelancers usually include content execution, visual support, video workflow understanding, landing page support, campaign assets, and workflow systems for smoother client delivery.",
  },
  {
    question: "Why do freelancers need broader AI capability?",
    answer:
      "Because many clients no longer need one isolated task only. They want support across multiple connected execution areas, and broader AI capability helps freelancers deliver that value.",
  },
  {
    question: "Can AI skills help freelancers get better clients?",
    answer:
      "Yes. Freelancers who can show faster execution, better output systems, and broader delivery support often become more attractive to serious clients.",
  },
  {
    question: "Do freelancers need technical coding skills for this?",
    answer:
      "Not always. Many useful freelancer AI skills connect more with execution, communication, content, design support, pages, and workflow systems than pure coding.",
  },
  {
    question: "What is the biggest mistake freelancers make while learning AI?",
    answer:
      "A common mistake is focusing only on trendy tools instead of building real client-useful capability. Freelancers should focus on output, delivery systems, and business relevance.",
  },
  {
    question: "Can these skills help freelancers scale their services?",
    answer:
      "Yes. AI-assisted systems can improve delivery speed, structure, and repeatability, which helps freelancers handle projects more efficiently and grow with better operational clarity.",
  },
];

const quickAnswers = [
  {
    label: "Best focus",
    value:
      "Freelancers should build AI skills across content, visuals, video, pages, campaigns, and workflow systems.",
  },
  {
    label: "Main goal",
    value:
      "The goal is to become more valuable to clients through broader and faster digital execution.",
  },
  {
    label: "Big advantage",
    value:
      "Freelancers who use AI properly can improve speed, delivery confidence, and service quality.",
  },
];

export default function AiSkillsForFreelancersPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#0B1220]">
      <section className="relative overflow-hidden border-b border-[#E2E8F0] bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.10),_transparent_35%),linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 right-0 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl"></div>
          <div className="absolute bottom-0 left-10 h-40 w-40 rounded-full bg-slate-100 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center rounded-full border border-[#BFD3F2] bg-[#EFF6FF] px-4 py-2 text-[15px] font-semibold text-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.08)]">
              Freelancer AI skill guide
            </div>

            <h1 className="mt-6 text-[40px] font-black leading-[1.02] tracking-[-0.03em] text-[#0B1220] md:text-[68px]">
              Best AI skills for freelancers who want better clients, better delivery, and better growth
            </h1>

            <p className="mt-6 max-w-4xl text-[19px] leading-[1.8] text-[#475569] md:text-[22px]">
              Freelancers now need more than one narrow skill. The best AI skills are the ones that improve real client execution across content, visuals, video support, landing pages, campaign work, and workflow systems. These capabilities help freelancers become more valuable, more competitive, and more scalable in modern digital projects.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/gen-ai-masterclass"
                className="inline-flex items-center rounded-2xl bg-[#2563EB] px-7 py-3.5 text-[16px] font-bold text-white shadow-[0_14px_34px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </a>

              <a
                href="/ai-generalist"
                className="inline-flex items-center rounded-2xl border border-[#C7D7EF] bg-white px-7 py-3.5 text-[16px] font-bold text-[#0B1220] shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                Explore AI Expert
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {quickAnswers.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-[#D7E3F4] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                >
                  <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#2563EB]">
                    {item.label}
                  </div>
                  <p className="mt-3 text-[16px] leading-[1.8] text-[#475569]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <SectionHeader
          pill="Why this matters"
          title="Why freelancers should build AI skills now"
          description="Freelancers who adopt practical AI capability early can improve client value, execution speed, and service flexibility across modern digital work."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {whyCards.map((item) => (
            <LightFeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <SectionHeader
          pill="Skill coverage"
          title="What freelancers should actually learn"
          description="The best freelancer AI skill stack is practical, client-oriented, and directly connected to real execution across digital services."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillCards.map((item) => (
            <LightFeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <SectionHeader
          pill="Freelancer outcomes"
          title="What these skills can help freelancers achieve"
          description="The real value is not only using AI tools. The bigger value is becoming more useful, more scalable, and more competitive for client work."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {outcomeCards.map((item) => (
            <DarkCapabilityCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="rounded-[36px] border border-[#D7E3F4] bg-white p-8 shadow-[0_18px_42px_rgba(15,23,42,0.06)] md:p-12">
          <SectionHeader
            pill="Related learning paths"
            title="Explore connected AI skill pages"
            description="These pages help freelancers understand how AI skills connect with students, creators, tools, broader learning paths, and the AI Expert model."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/ai-skills-for-students", label: "AI Skills for Students" },
              { href: "/ai-skills-for-creators", label: "AI Skills for Creators" },
              { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
              { href: "/ai-tools", label: "AI Tools Hub" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-[22px] border border-[#D7E3F4] bg-[#F8FBFF] px-5 py-4 text-[16px] font-semibold text-[#0B1220] shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 pb-20 md:px-6 md:pb-24">
        <FaqBlock
          pill="FAQs"
          title="Frequently asked questions"
          description="Clear answers to common questions freelancers usually have before choosing which AI skills to build."
          items={faqItems}
        />
      </section>

      <section className="border-t border-slate-100 bg-[#07152E] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(15,23,42,0.9))] p-8 shadow-[0_24px_80px_rgba(2,6,23,0.45)] sm:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-200 sm:text-sm">
              Final Next Step
            </div>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Start building practical AI skills for freelance growth with Sikhadenge
            </h2>
            <p className="mb-8 text-sm leading-7 text-slate-300 sm:text-base">
              Learn the AI skills that help freelancers improve delivery, strengthen client value, and build more scalable services. Start with the free masterclass and move toward faster execution and better results.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 sm:text-base"
              >
                Join Free AI Masterclass
              </a>
              <a
                href="/courses"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:text-base"
              >
                Explore Courses
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
