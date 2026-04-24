import type { Metadata } from "next";
import {
  Blocks,
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
  title: "AI Skills for Students in India | Sikhadenge",
  description:
    "Learn which practical AI skills students in India should build across content, design, video, websites, marketing, and workflows, and understand how Sikhadenge connects these skills to internships, freelancing, and modern careers.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-students",
  },
};

const whyCards = [
  {
    icon: <GraduationCap className="h-9 w-9" />,
    title: "Students need practical digital capability",
    description:
      "Degrees alone are not enough for many modern roles. Students increasingly need practical execution skills that connect with real digital work and AI-assisted output.",
  },
  {
    icon: <Sparkles className="h-9 w-9" />,
    title: "AI makes learning more execution-oriented",
    description:
      "Students can now move faster from theory to output by using AI for content, visuals, communication, workflow support, and project execution.",
  },
  {
    icon: <Blocks className="h-9 w-9" />,
    title: "One skill is often not enough anymore",
    description:
      "Modern opportunities usually reward broader ability. Students who can support multiple digital tasks become more useful for internships, freelancing, and early job roles.",
  },
  {
    icon: <Rocket className="h-9 w-9" />,
    title: "Early adoption gives a long-term advantage",
    description:
      "Students who build structured AI skills early can develop stronger portfolios, better confidence, and more relevant capability before entering the market.",
  },
];

const skillCards = [
  {
    icon: <PenTool className="h-9 w-9" />,
    title: "AI-assisted design support",
    description:
      "Students should learn how AI can support visual ideas, layouts, social creatives, thumbnails, brand assets, and practical design execution.",
  },
  {
    icon: <FileText className="h-9 w-9" />,
    title: "Content and communication skills",
    description:
      "Writing support, script structure, caption drafting, briefs, messaging, and content systems are useful skills across careers and digital projects.",
  },
  {
    icon: <Clapperboard className="h-9 w-9" />,
    title: "Video workflow understanding",
    description:
      "Students benefit from learning how reels, explainers, short-form edits, and AI-assisted video workflows are planned and executed.",
  },
  {
    icon: <LayoutTemplate className="h-9 w-9" />,
    title: "Landing pages and digital execution",
    description:
      "Understanding page sections, structure, conversion flow, and website support helps students become more useful in digital teams and projects.",
  },
  {
    icon: <Megaphone className="h-9 w-9" />,
    title: "Marketing asset execution",
    description:
      "Students should understand how content, offers, visuals, and campaign messaging work together inside practical digital marketing systems.",
  },
  {
    icon: <Workflow className="h-9 w-9" />,
    title: "Workflow and productivity support",
    description:
      "AI can help students organize tasks, improve internal systems, reduce repetitive work, and build clearer project execution routines.",
  },
];

const outcomeCards = [
  {
    icon: <BriefcaseBusiness className="h-10 w-10" />,
    title: "Internship readiness",
    description:
      "Students with practical AI skills can contribute faster in early roles because they understand output, not just theory.",
  },
  {
    icon: <Lightbulb className="h-10 w-10" />,
    title: "Project confidence",
    description:
      "A broader skill stack helps students handle content, visuals, ideas, page work, and digital execution with more confidence.",
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Better team usefulness",
    description:
      "Students become more valuable when they can support multiple connected tasks across communication, content, design, and workflow systems.",
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Career relevance",
    description:
      "Modern digital roles increasingly value practical cross-functional ability supported by AI-assisted execution.",
  },
  {
    icon: <Sparkles className="h-10 w-10" />,
    title: "Portfolio growth",
    description:
      "Students can use these skills to create stronger real-world outputs and improve proof of work over time.",
  },
  {
    icon: <Workflow className="h-10 w-10" />,
    title: "Execution mindset",
    description:
      "Learning AI skills the right way helps students think in systems, output, and workflow clarity instead of scattered learning.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Which AI skills are best for students right now?",
    answer:
      "The most practical AI skills for students usually include content support, visual execution, video workflow understanding, landing page basics, campaign support, and workflow productivity systems.",
  },
  {
    question: "Should students only learn AI tools?",
    answer:
      "No. Students should learn how AI fits into real digital execution. Tools matter, but practical output, workflow understanding, and cross-functional capability matter more.",
  },
  {
    question: "Can these skills help students before graduation?",
    answer:
      "Yes. Students can use these skills for portfolio building, freelance work, internships, project support, and stronger career readiness before entering full-time roles.",
  },
  {
    question: "Are AI skills useful for non-technical students too?",
    answer:
      "Yes. These skills are useful for many students because they connect with communication, content, design support, marketing execution, and modern digital work beyond purely technical fields.",
  },
  {
    question: "Why do students need broader AI capability instead of one narrow skill?",
    answer:
      "Because modern work often needs people who can support multiple connected tasks. Broader capability helps students stay more relevant and useful in real digital environments.",
  },
  {
    question: "What is the biggest mistake students make while learning AI?",
    answer:
      "A common mistake is scattered tool chasing without building real execution skills. Students should focus on output, workflow understanding, and practical digital capability.",
  },
];

const quickAnswers = [
  {
    label: "Best focus",
    value:
      "Students should build practical AI skills across content, visuals, video, pages, and workflows.",
  },
  {
    label: "Main goal",
    value:
      "The goal is to become more useful for internships, projects, freelancing, and modern digital careers.",
  },
  {
    label: "Big advantage",
    value:
      "Students who start early build stronger proof of work, better execution confidence, and better market relevance.",
  },
];

export default function AiSkillsForStudentsPage() {
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
              Student AI skill guide
            </div>

            <h1 className="mt-6 text-[40px] font-black leading-[1.02] tracking-[-0.03em] text-[#0B1220] md:text-[68px]">
              Best AI skills for students who want stronger internships, projects, and career relevance
            </h1>

            <p className="mt-6 max-w-4xl text-[19px] leading-[1.8] text-[#475569] md:text-[22px]">
              Students now need more than theory. The most useful AI skills are the ones that improve real execution across content, visuals, video support, pages, campaign work, and workflow systems. These capabilities help students become more relevant for internships, projects, freelancing, and modern digital careers.
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
          title="Why students should build AI skills early"
          description="Students who develop practical AI capability early gain an advantage because they become more useful across real digital tasks, not just classroom theory."
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
          title="What students should actually learn"
          description="The best student AI skill stack is practical, cross-functional, and directly connected to modern digital execution."
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
          pill="Student outcomes"
          title="What these skills can help students achieve"
          description="The value of AI skills for students is not only learning tools. The real value is stronger relevance, confidence, output, and career usefulness."
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
            description="These pages help students understand how AI skills connect with freelancers, creators, tools, broader learning paths, and the AI Expert model."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/ai-skills-for-freelancers", label: "AI Skills for Freelancers" },
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
          description="Clear answers to common questions students usually have before choosing which AI skills to learn."
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
              Start building practical AI skills as a student with Sikhadenge
            </h2>
            <p className="mb-8 text-sm leading-7 text-slate-300 sm:text-base">
              Learn the AI skills that actually help students with internships, projects, freelancing, and modern digital careers. Start with the free masterclass and move toward stronger execution and real proof of work.
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
