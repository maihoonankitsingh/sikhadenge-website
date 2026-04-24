import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  FileText,
  GraduationCap,
  Lightbulb,
  MessageSquareText,
  Sparkles,
  Users,
  Workflow,
  Wrench,
  PenTool,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Beginners | Sikhadenge",
  description:
    "Explore the best AI skills for beginners across content, design, prompts, workflows, research, and practical digital execution. A simple guide for students, freshers, career switchers, and serious beginners.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-beginners",
  },
  openGraph: {
    title: "Best AI Skills for Beginners | Sikhadenge",
    description:
      "A practical guide to the best AI skills for beginners across content, design, prompts, workflows, and digital execution.",
    url: "https://sikhadenge.in/ai-skills-for-beginners",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Beginners | Sikhadenge",
    description:
      "A practical guide to the best AI skills for beginners across content, design, prompts, workflows, and digital execution.",
  },
};

const quickInfo = [
  {
    title: "Easy starting point",
    desc: "Beginners do not need to master everything at once. They need a practical and structured entry path.",
  },
  {
    title: "Real-world relevance",
    desc: "The best beginner AI skills are the ones that connect directly to useful output and modern digital work.",
  },
  {
    title: "Skill-first learning",
    desc: "Good beginner learning focuses on capability, not random tool names or scattered tutorials.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "AI is now part of modern work",
    desc: "Students, beginners, and freshers increasingly need some level of AI-assisted working ability across content, communication, and digital tasks.",
  },
  {
    icon: Workflow,
    title: "Scattered learning creates confusion",
    desc: "Most beginners get stuck because they see too many tools and too many videos without a clear starting structure.",
  },
  {
    icon: Bot,
    title: "Simple skills can create early momentum",
    desc: "Basic AI skills like prompting, content support, ideation, and structured workflow usage can quickly build confidence.",
  },
  {
    icon: Briefcase,
    title: "Practical skills improve readiness",
    desc: "Beginners who learn useful AI skills become more prepared for internships, freelance work, digital execution, and modern roles.",
  },
];

const skillCategories = [
  {
    icon: MessageSquareText,
    title: "Prompt Basics",
    desc: "Beginners should first learn how to ask clearly, structure requests, refine outputs, and communicate with AI tools properly.",
  },
  {
    icon: FileText,
    title: "Content Support Skills",
    desc: "Useful beginner skills include writing ideas, captions, outlines, simple scripts, summaries, and basic structured content support.",
  },
  {
    icon: PenTool,
    title: "Design Support Skills",
    desc: "Beginners can start with simple visual directions, thumbnail thinking, poster ideas, and creative support workflows using AI.",
  },
  {
    icon: Lightbulb,
    title: "Research & Idea Skills",
    desc: "A strong beginner skill is learning how to use AI for topic exploration, comparison, idea generation, and basic concept understanding.",
  },
  {
    icon: Workflow,
    title: "Workflow Skills",
    desc: "Beginners should learn how AI fits inside repeatable work steps such as idea, draft, review, edit, and final output creation.",
  },
  {
    icon: Wrench,
    title: "Tool Usage Basics",
    desc: "It helps to understand which kinds of AI tools are useful for text, visuals, video, productivity, and digital execution support.",
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Students can start with AI skills for notes, content support, presentations, project work, and practical digital capability.",
  },
  {
    icon: Users,
    title: "Freshers",
    desc: "Freshers can use beginner AI skills to improve communication, digital output, and modern career readiness.",
  },
  {
    icon: Briefcase,
    title: "Career Switchers",
    desc: "Career switchers can use beginner-friendly AI skills to enter digital work more confidently with practical support systems.",
  },
  {
    icon: Bot,
    title: "Serious Beginners",
    desc: "Anyone starting from zero can begin with simple AI skills and gradually move toward broader execution capability.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect beginner learning with practical digital work.",
  },
  {
    href: "/ai-tools-for-students",
    title: "AI Tools for Students",
    desc: "See which AI tools help learners and beginners handle notes, study work, and practical execution tasks.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand the broader capability model that beginners can grow into over time.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Review the wider set of AI skills that become useful after the beginner stage.",
  },
  {
    href: "/courses",
    title: "Courses",
    desc: "Explore the Sikhadenge learning path for structured AI-first skill development.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to see how practical beginner AI learning works.",
  },
];

const faqs = [
  {
    q: "Which AI skills are best for beginners?",
    a: "The best AI skills for beginners are prompt basics, content support, idea generation, research support, simple design assistance, and workflow understanding.",
  },
  {
    q: "Do beginners need coding to learn AI skills?",
    a: "No. Many beginner AI skills do not require coding. A strong starting point is practical usage across content, visuals, research, and digital tasks.",
  },
  {
    q: "What should beginners learn first in AI?",
    a: "Beginners should first learn how to give good prompts, understand tool categories, and use AI for simple real-world output like notes, ideas, writing, and structured support.",
  },
  {
    q: "Are AI tools and AI skills the same thing?",
    a: "No. AI tools are platforms or software. AI skills are the practical abilities to use those tools effectively for useful outputs and structured work.",
  },
  {
    q: "Can students start learning AI skills from zero?",
    a: "Yes. Students can start from zero if they follow a practical and structured path focused on basic prompts, outputs, and repeatable workflows.",
  },
  {
    q: "How long does it take to learn beginner AI skills?",
    a: "Beginners can start using basic AI skills quickly, but real confidence comes with regular practice and applying the skills in actual tasks and projects.",
  },
  {
    q: "What is the biggest mistake beginners make while learning AI?",
    a: "A common mistake is jumping between too many tools without learning one clear workflow or one practical use case properly.",
  },
  {
    q: "Where should beginners start learning AI properly?",
    a: "A structured learning path is the best starting point. Begin with simple prompts, useful outputs, and practical tasks instead of random tool exploration.",
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

export default function AiSkillsForBeginnersPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Beginner AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for beginners
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Beginners do not need to start with advanced AI theory or complex tools. The best beginner AI
              skills are practical ones that improve how people think, write, explore ideas, create simple
              outputs, and work with better structure. A strong beginner path starts with useful tasks and
              gradually builds broader digital capability.
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
            title="Why AI skills matter for beginners"
            desc="The digital world is changing quickly, and beginners now need more than basic software familiarity. Practical AI skills can help people learn faster, work more clearly, and become more relevant in modern digital environments."
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
            pill="Core beginner skills"
            title="Main AI skill categories for beginners"
            desc="A strong beginner AI path should start with practical and easy-to-apply skill areas instead of overwhelming technical complexity."
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
            title="Who can benefit from beginner AI skills"
            desc="Beginner-friendly AI skills are useful across multiple audience types when the learning path stays practical and structured."
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
            desc="These pages connect beginner AI learning with the broader Sikhadenge topic cluster around skills, tools, learners, and AI-first digital capability."
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
            desc="These are the common questions people ask before starting AI skills as a beginner."
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
