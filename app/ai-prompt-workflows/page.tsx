import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  FileText,
  FolderKanban,
  Lightbulb,
  MessageSquareQuote,
  RefreshCcw,
  Sparkles,
  Target,
  Users,
  Wand2,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Prompt Workflows | Sikhadenge",
  description:
    "Understand AI prompt workflows in a practical way. Learn how structured AI-assisted prompt systems help with clarity, context, refinement, output quality, and repeatable execution across real digital work.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-prompt-workflows",
  },
  openGraph: {
    title: "AI Prompt Workflows | Sikhadenge",
    description:
      "A practical guide to AI prompt workflows across clarity, context, refinement, output quality, and repeatable execution systems.",
    url: "https://sikhadenge.in/ai-prompt-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Prompt Workflows | Sikhadenge",
    description:
      "A practical guide to AI prompt workflows across clarity, context, refinement, output quality, and repeatable execution systems.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI prompt workflows are structured systems that use repeatable prompt logic to improve output clarity, quality, and usability.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, prompting becomes random and inconsistent. A system improves context, refinement, and output control.",
  },
  {
    title: "Who benefits",
    desc: "Creators, freelancers, marketers, founders, operators, and teams all benefit from better AI prompt workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than one prompt",
    desc: "AI prompt workflows are not limited to writing one instruction. They connect intent, context, structure, refinement, and output evaluation into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI prompting works better with process",
    desc: "Useful workflows use AI prompts across multiple stages such as ideation, first draft, clarification, improvement, restructuring, and final output support instead of one isolated input.",
  },
  {
    icon: Target,
    title: "The goal is better output control",
    desc: "A strong prompt workflow helps outputs become more relevant, more accurate, more structured, and more aligned with the actual task.",
  },
  {
    icon: Briefcase,
    title: "This matters in real digital execution",
    desc: "Modern AI work often fails because users ask for outputs without enough structure, context, refinement steps, or clear output standards.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Task & Output Clarity",
    desc: "Start by defining what the task is, what kind of output is needed, what format matters, and what success should look like.",
  },
  {
    icon: MessageSquareQuote,
    title: "Context & Instruction Layer",
    desc: "Add useful context such as audience, role, tone, format, constraints, examples, or project details before expecting a strong output.",
  },
  {
    icon: Wand2,
    title: "Prompt Structuring",
    desc: "Use a structured prompt format so the AI gets clear goals, better instructions, and less ambiguity during generation.",
  },
  {
    icon: FileText,
    title: "Draft & Refinement Loop",
    desc: "Use follow-up prompts to improve weak outputs, expand useful parts, tighten language, or reframe the result for better quality.",
  },
  {
    icon: RefreshCcw,
    title: "Iteration & Correction",
    desc: "Fix mistakes, remove repetition, improve specificity, and adjust formatting through controlled iteration instead of starting from scratch.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Prompt System",
    desc: "Organize proven prompt patterns, reusable templates, prompt libraries, and workflow-based prompt systems for repeated work.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Creators",
    desc: "Creators can use AI prompt workflows to improve scripts, captions, content ideas, image prompts, and structured creative output.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can use these workflows to improve client delivery, faster drafts, structured communication, and better output quality.",
  },
  {
    icon: Sparkles,
    title: "Founders & Operators",
    desc: "Founders and operators can use prompt systems to support planning, content, messaging, summaries, and daily AI-assisted execution.",
  },
  {
    icon: Workflow,
    title: "Teams",
    desc: "Teams can use structured prompt workflows to create repeatable output standards and reduce quality inconsistency across AI use.",
  },
];

const relatedPages = [
  {
    href: "/ai-content-workflows",
    title: "Create Content with Automate Work with AI",
    desc: "Explore the broader workflow layer for ideation, drafting, refinement, and structured content systems.",
  },
  {
    href: "/ai-productivity-workflows",
    title: "AI Productivity Workflows",
    desc: "See how better prompt systems connect with planning, summaries, task clarity, and repeatable daily execution.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools depend heavily on structured prompting for better text, image, idea, and workflow outputs.",
  },
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the wider AI skill categories that connect with prompt systems and practical digital execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how prompt workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how prompt workflows connect with broader high-value AI skill development.",
  },
];

const faqs = [
  {
    q: "What is an AI prompt workflow?",
    a: "An AI prompt workflow is a structured process that uses prompts in multiple stages such as task clarity, context setting, drafting, refinement, and output correction to improve results.",
  },
  {
    q: "Why are AI prompt workflows important?",
    a: "They are important because they help users move from random prompting to more controlled, repeatable, and useful AI-assisted execution.",
  },
  {
    q: "Can beginners use AI prompt workflows?",
    a: "Yes. Beginners can start with simple prompt systems for task clarity, better instructions, and refinement loops before moving into advanced prompt frameworks.",
  },
  {
    q: "Are AI prompt workflows only for technical users?",
    a: "No. Creators, freelancers, marketers, founders, operators, and teams can all use structured AI prompt workflows.",
  },
  {
    q: "What is the difference between a prompt and a prompt workflow?",
    a: "A prompt is one instruction. A prompt workflow is a repeatable system that uses multiple prompt stages to improve the final output.",
  },
  {
    q: "Can AI prompt workflows improve output quality?",
    a: "Yes. A strong workflow can improve relevance, structure, specificity, formatting, and overall usability of AI-generated outputs.",
  },
  {
    q: "What is the biggest mistake people make with AI prompting?",
    a: "A common mistake is asking for complex outputs without enough context, structure, constraints, or refinement logic.",
  },
  {
    q: "Where should someone start with AI prompt workflows?",
    a: "A good starting point is a simple system: define the task, add context, ask for a draft, refine weak parts, then save the useful structure for reuse.",
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

export default function AiPromptWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI prompt workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI prompt workflows help people move from random prompting to a structured system for task clarity,
              context setting, refinement, and final output control. Instead of relying on one disconnected prompt,
              a workflow creates a repeatable process that improves quality, usability, and consistency across real digital work.
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
            pill="What this means"
            title="What AI prompt workflows actually mean"
            desc="A workflow-based prompting approach makes AI useful because every output task sits inside a practical sequence instead of becoming random instruction writing."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {meaningBlocks.map((item) => {
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
            pill="Workflow stages"
            title="Core stages inside an AI prompt workflow"
            desc="A practical prompt system usually moves through a small number of repeatable stages that make output creation easier to manage and improve."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {workflowStages.map((item) => {
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
            title="Where AI prompt workflows are commonly used"
            desc="These workflows are relevant wherever AI outputs need to be clearer, more structured, more repeatable, and more useful across daily work."
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
            pill="Related pages"
            title="Explore connected AI learning pages"
            desc="These pages connect AI prompt workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPages.map((item) => (
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
            desc="These are the common questions people ask before building structured AI prompt workflows."
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
