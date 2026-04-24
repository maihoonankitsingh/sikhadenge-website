import type { Metadata } from "next";
import {
  Blocks,
  Bot,
  BriefcaseBusiness,
  Clapperboard,
  FileText,
  Globe,
  Image as ImageIcon,
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
  title: "Best AI Skills for Creators in 2026 | Sikhadenge",
  description:
    "Discover the best AI skills creators should build across content, visuals, video, pages, audience communication and workflow systems to grow faster with better execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-creators",
  },
};

const whyCards = [
  {
    icon: <Sparkles className="h-9 w-9" />,
    title: "Creators need faster content systems",
    description:
      "Modern creators need repeatable systems for ideas, content planning, visuals, videos, publishing support, and audience communication across platforms.",
  },
  {
    icon: <Blocks className="h-9 w-9" />,
    title: "AI helps creators work across multiple formats",
    description:
      "Creators no longer work in just one content layer. They often need support across visuals, scripts, reels, offers, pages, and audience-facing digital assets.",
  },
  {
    icon: <Rocket className="h-9 w-9" />,
    title: "Execution speed creates growth advantage",
    description:
      "When creators use AI properly, they can reduce manual effort, improve consistency, and move faster from idea to publishable output.",
  },
  {
    icon: <Users className="h-9 w-9" />,
    title: "Audience growth depends on structured output",
    description:
      "Creators who build clear systems for content, communication, and production can grow more consistently than those who rely only on random effort.",
  },
];

const skillCards = [
  {
    icon: <FileText className="h-9 w-9" />,
    title: "Content ideation and scripting",
    description:
      "Creators should learn how AI can support topic discovery, hooks, outlines, captions, scripts, and content structuring for regular output.",
  },
  {
    icon: <ImageIcon className="h-9 w-9" />,
    title: "Visual asset creation support",
    description:
      "Thumbnails, post creatives, carousels, brand visuals, and supporting graphic assets are important parts of creator execution.",
  },
  {
    icon: <Clapperboard className="h-9 w-9" />,
    title: "Video workflow execution",
    description:
      "Creators benefit from understanding short-form video structure, reels workflows, production support, edit planning, and AI-assisted video execution.",
  },
  {
    icon: <Megaphone className="h-9 w-9" />,
    title: "Audience communication and offers",
    description:
      "Creators should know how to support launches, offers, audience messaging, content campaigns, and digital communication with more clarity.",
  },
  {
    icon: <LayoutTemplate className="h-9 w-9" />,
    title: "Pages, funnels, and digital presentation",
    description:
      "Landing page structure, offer presentation, audience flow, and digital asset execution are important for creators building products or communities.",
  },
  {
    icon: <Workflow className="h-9 w-9" />,
    title: "Workflow and publishing systems",
    description:
      "Creators need better systems for planning, batching, publishing, revisions, documentation, and recurring execution support.",
  },
];

const outcomeCards = [
  {
    icon: <Bot className="h-10 w-10" />,
    title: "Faster content execution",
    description:
      "Creators can move faster from raw ideas to scripts, visuals, videos, and publish-ready assets with stronger AI-assisted workflows.",
  },
  {
    icon: <Lightbulb className="h-10 w-10" />,
    title: "Better creative consistency",
    description:
      "Structured AI skills help creators maintain output quality and reduce inconsistency across posts, reels, and campaigns.",
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Stronger digital presence",
    description:
      "Creators benefit from better presentation, content systems, landing support, and more organized audience-facing digital execution.",
  },
  {
    icon: <BriefcaseBusiness className="h-10 w-10" />,
    title: "Monetization support",
    description:
      "These skills can support launches, offer communication, product pages, and other creator workflows connected to business growth.",
  },
  {
    icon: <PenTool className="h-10 w-10" />,
    title: "Better brand expression",
    description:
      "Creators can improve visual identity, content presentation, and execution quality across multiple formats with stronger systems.",
  },
  {
    icon: <Workflow className="h-10 w-10" />,
    title: "Scalable creator systems",
    description:
      "AI-assisted workflows help creators reduce repetitive effort and build more repeatable systems for long-term output.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Which AI skills are best for creators right now?",
    answer:
      "The most useful AI skills for creators usually include content ideation, scripting, visual support, video workflow execution, audience communication, page support, and publishing systems.",
  },
  {
    question: "Do creators need more than just video editing skills?",
    answer:
      "Yes. Modern creators usually need a broader system that includes content planning, visuals, messaging, offers, landing support, and workflow execution beyond only editing.",
  },
  {
    question: "Can AI help creators grow faster?",
    answer:
      "Yes. When used properly, AI can improve speed, content consistency, idea execution, production flow, and overall digital output for creators.",
  },
  {
    question: "Are these skills useful for small creators too?",
    answer:
      "Yes. Small creators often benefit even more because AI-assisted systems help them handle multiple execution areas without needing a large team.",
  },
  {
    question: "What is the biggest mistake creators make while learning AI?",
    answer:
      "A common mistake is using AI only for random generation without building a repeatable content and execution system. Real value comes from structured workflows.",
  },
  {
    question: "Can these skills support monetization too?",
    answer:
      "Yes. Better communication, offers, landing pages, audience-facing content, and execution systems can directly support creator monetization efforts.",
  },
];

const quickAnswers = [
  {
    label: "Best focus",
    value:
      "Creators should build AI skills across content, visuals, video, offers, pages, and workflow systems.",
  },
  {
    label: "Main goal",
    value:
      "The goal is to produce faster, stay consistent, and improve audience-facing digital execution.",
  },
  {
    label: "Big advantage",
    value:
      "Creators who use AI properly can improve speed, structure, output quality, and monetization readiness.",
  },
];

export default function AiSkillsForCreatorsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#0B1220]">
      <section className="border-b border-[#E2E8F0] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center rounded-full border border-[#BFD3F2] bg-[#EFF6FF] px-4 py-2 text-[15px] font-semibold text-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.08)]">
              Creator AI skill guide
            </div>

            <h1 className="mt-6 text-[40px] font-bold leading-[1.04] tracking-[-0.03em] text-[#0B1220] md:text-[68px]">
              Best AI skills for creators who want faster and stronger digital execution
            </h1>

            <p className="mt-6 max-w-4xl text-[19px] leading-[1.8] text-[#475569] md:text-[22px]">
              Creators now need more than just posting regularly. The best AI skills are the ones that
              improve real execution across ideas, scripts, visuals, videos, offers, pages, and
              publishing systems. These capabilities help creators move faster, stay more consistent,
              and build stronger audience-facing digital output.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/gen-ai-masterclass"
                className="inline-flex items-center rounded-full bg-[#2563EB] px-7 py-3.5 text-[16px] font-semibold text-white shadow-[0_14px_34px_rgba(37,99,235,0.28)] transition hover:bg-[#1D4ED8]"
              >
                Join free masterclass
              </a>

              <a
                href="/ai-generalist"
                className="inline-flex items-center rounded-full border border-[#C7D7EF] bg-white px-7 py-3.5 text-[16px] font-semibold text-[#0B1220] shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition hover:border-[#2563EB] hover:text-[#2563EB]"
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
          title="Why creators should build AI skills now"
          description="Creators who build practical AI capability can improve output speed, consistency, and digital presentation across multiple content formats."
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
          title="What creators should actually learn"
          description="The best creator AI skill stack is practical, content-oriented, and directly connected to real audience-facing execution."
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
          pill="Creator outcomes"
          title="What these skills can help creators achieve"
          description="The real value is not only using AI tools. The bigger value is stronger execution, better consistency, and better creator-side growth systems."
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
            description="These pages help creators understand how AI skills connect with students, freelancers, tools, broader learning paths, and the AI Expert model."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/ai-skills-for-students", label: "AI Skills for Students" },
              { href: "/ai-skills-for-freelancers", label: "AI Skills for Freelancers" },
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
          description="Clear answers to common questions creators usually have before choosing which AI skills to build."
          items={faqItems}
        />
      </section>
    </main>
  );
}
