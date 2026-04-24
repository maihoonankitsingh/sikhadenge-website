import type { Metadata } from "next";
import {
  Blocks,
  Bot,
  BriefcaseBusiness,
  Clapperboard,
  FileText,
  Globe,
  GraduationCap,
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
  title: "Best AI Skills to Learn in 2026 | Sikhadenge",
  description:
    "Discover the best AI skills to learn in 2026 across content, design, video, marketing, pages and workflows, and understand which skills matter most for modern digital execution.",
  alternates: {
    canonical: "https://sikhadenge.in/best-ai-skills-to-learn",
  },
};

const whyCards = [
  {
    icon: <Sparkles className="h-9 w-9" />,
    title: "The best AI skills are practical, not random",
    description:
      "The most useful AI skills are the ones that improve real execution across content, visuals, video, communication, pages, and workflow systems instead of isolated tool usage.",
  },
  {
    icon: <Blocks className="h-9 w-9" />,
    title: "Modern work rewards broader digital capability",
    description:
      "People who can contribute across multiple connected execution areas often become more useful than those who only know one narrow digital task.",
  },
  {
    icon: <Rocket className="h-9 w-9" />,
    title: "AI changes how work gets done",
    description:
      "The biggest shift is not only new tools. The real shift is faster planning, better output systems, and improved execution speed across digital work.",
  },
  {
    icon: <Users className="h-9 w-9" />,
    title: "Useful skills depend on output value",
    description:
      "The best AI skills are the ones that help people produce work that businesses, teams, clients, audiences, or projects actually need.",
  },
];

const skillCards = [
  {
    icon: <FileText className="h-9 w-9" />,
    title: "Content creation and communication",
    description:
      "One of the best AI skill areas is content support across ideation, writing, scripting, briefs, audience communication, and structured messaging systems.",
  },
  {
    icon: <PenTool className="h-9 w-9" />,
    title: "Design and visual execution",
    description:
      "Visual capability matters because AI can now support graphics, layouts, thumbnails, brand assets, and digital creative output more efficiently.",
  },
  {
    icon: <Clapperboard className="h-9 w-9" />,
    title: "Video workflow execution",
    description:
      "AI-assisted video systems are becoming highly useful for short-form content, promos, explainers, editing support, and production speed.",
  },
  {
    icon: <Megaphone className="h-9 w-9" />,
    title: "Marketing asset and campaign support",
    description:
      "AI skills that support offers, campaign messaging, launch materials, audience communication, and marketing execution are increasingly valuable.",
  },
  {
    icon: <LayoutTemplate className="h-9 w-9" />,
    title: "Pages, landing flow, and digital presentation",
    description:
      "Page structure, section logic, landing support, and conversion-oriented digital execution are highly practical AI-supported skills today.",
  },
  {
    icon: <Workflow className="h-9 w-9" />,
    title: "Workflow productivity and systems",
    description:
      "One of the strongest AI skill categories is using AI to reduce repetitive work, improve planning, support documentation, and build clearer execution systems.",
  },
];

const outcomeCards = [
  {
    icon: <GraduationCap className="h-10 w-10" />,
    title: "Better career relevance",
    description:
      "People who learn the right AI skills become more aligned with how modern digital roles, teams, and businesses now expect work to happen.",
  },
  {
    icon: <BriefcaseBusiness className="h-10 w-10" />,
    title: "Stronger practical value",
    description:
      "The best AI skills are useful because they support real deliverables, not just experiments. That makes them more valuable in actual work settings.",
  },
  {
    icon: <Bot className="h-10 w-10" />,
    title: "Faster output execution",
    description:
      "Practical AI skills help people move faster from idea to execution across multiple digital work layers without relying only on manual effort.",
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Broader digital usefulness",
    description:
      "A strong AI skill stack improves how useful someone is across content, visuals, videos, pages, workflows, and digital communication.",
  },
  {
    icon: <Lightbulb className="h-10 w-10" />,
    title: "Better decision-making",
    description:
      "When people understand where AI actually fits, they make better choices about output, systems, priorities, and digital execution strategy.",
  },
  {
    icon: <Workflow className="h-10 w-10" />,
    title: "Long-term adaptability",
    description:
      "The best AI skills build a mindset for adapting to new tools, changing workflows, and evolving digital requirements over time.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "What are the best AI skills to learn right now?",
    answer:
      "The most useful AI skills right now usually include content creation, visual support, video workflow execution, marketing asset support, page structure understanding, and workflow productivity systems.",
  },
  {
    question: "Should people focus only on AI tools?",
    answer:
      "No. Tools matter, but the bigger value comes from learning how AI fits into real execution, output quality, communication, systems, and digital workflows.",
  },
  {
    question: "Which AI skills are best for career growth?",
    answer:
      "Skills that improve practical execution across content, visuals, video, pages, campaigns, and workflow systems are usually more valuable for long-term career relevance.",
  },
  {
    question: "Are the best AI skills different for students, freelancers, and creators?",
    answer:
      "The context changes slightly, but the core useful categories often remain similar: content, visuals, video, pages, communication, and workflows. The difference is how each group applies them.",
  },
  {
    question: "What is the biggest mistake people make while learning AI skills?",
    answer:
      "A common mistake is chasing trendy tools without building real execution ability. The better approach is to focus on output, systems, and practical capability.",
  },
  {
    question: "Why do broader AI skills matter more than one narrow skill?",
    answer:
      "Because modern digital work is increasingly connected. People who can support multiple related tasks often become more useful than those limited to one narrow task only.",
  },
];

const quickAnswers = [
  {
    label: "Best focus",
    value:
      "The best AI skills are practical skills across content, visuals, video, marketing, pages, and workflows.",
  },
  {
    label: "Main goal",
    value:
      "The goal is to build stronger real-world execution capability, not only tool familiarity.",
  },
  {
    label: "Big advantage",
    value:
      "People who learn the right AI skills become faster, more useful, and more adaptable in modern digital work.",
  },
];

export default function BestAiSkillsToLearnPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#0B1220]">
      <section className="border-b border-[#E2E8F0] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center rounded-full border border-[#BFD3F2] bg-[#EFF6FF] px-4 py-2 text-[15px] font-semibold text-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.08)]">
              AI skill guide
            </div>

            <h1 className="mt-6 text-[40px] font-bold leading-[1.04] tracking-[-0.03em] text-[#0B1220] md:text-[68px]">
              Best AI skills to learn for modern digital work
            </h1>

            <p className="mt-6 max-w-4xl text-[19px] leading-[1.8] text-[#475569] md:text-[22px]">
              The best AI skills are not just about using tools. The real value comes from learning
              how AI improves execution across content, visuals, video support, campaigns, digital
              pages, and workflow systems. These are the skills that make people more useful in
              modern digital work.
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
          title="Why the right AI skills matter more now"
          description="The most useful AI skills are the ones that improve practical output, business usefulness, and execution quality across modern digital work."
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
          title="Which AI skill areas are the most useful"
          description="The strongest AI skill stack is practical, cross-functional, and closely tied to real digital execution instead of random tool use."
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
          pill="Why these skills win"
          title="What these AI skills can help people achieve"
          description="The bigger benefit is not just using AI. It is becoming more useful, more adaptable, and more capable in real digital environments."
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
            description="These pages help connect broader AI learning with students, freelancers, creators, tools, and the AI Expert model."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/ai-skills-for-students", label: "AI Skills for Students" },
              { href: "/ai-skills-for-freelancers", label: "AI Skills for Freelancers" },
              { href: "/ai-skills-for-creators", label: "AI Skills for Creators" },
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
          description="Clear answers to common questions people usually have before deciding which AI skills are worth learning."
          items={faqItems}
        />
      </section>
    </main>
  );
}
