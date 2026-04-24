import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  CalendarRange,
  CheckSquare,
  FileText,
  FolderKanban,
  Lightbulb,
  RefreshCcw,
  Sparkles,
  Target,
  TimerReset,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Productivity Workflows | Sikhadenge",
  description:
    "Understand AI productivity workflows in a practical way. Learn how structured AI-assisted productivity systems help with planning, prioritization, summaries, task execution, and repeatable daily work.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-productivity-workflows",
  },
  openGraph: {
    title: "AI Productivity Workflows | Sikhadenge",
    description:
      "A practical guide to AI productivity workflows across planning, prioritization, summaries, task execution, and repeatable daily work.",
    url: "https://sikhadenge.in/ai-productivity-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Productivity Workflows | Sikhadenge",
    description:
      "A practical guide to AI productivity workflows across planning, prioritization, summaries, task execution, and repeatable daily work.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI productivity workflows are structured systems that use AI support to improve planning, task clarity, summaries, and execution speed.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, productivity advice stays generic. A system improves focus, repeatability, and real execution quality.",
  },
  {
    title: "Who benefits",
    desc: "Students, professionals, founders, freelancers, and teams all benefit from better AI-assisted productivity workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than one productivity prompt",
    desc: "AI productivity workflows are not just about asking for a to-do list. They connect planning, prioritization, execution, review, and next-step clarity into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI supports multiple work stages",
    desc: "Useful workflows use AI across schedule support, summaries, task breakdowns, daily planning, note organization, and execution support instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better execution control",
    desc: "A strong workflow helps work become clearer, more organized, easier to track, and easier to repeat across daily or weekly operating systems.",
  },
  {
    icon: Briefcase,
    title: "This matters in real work environments",
    desc: "Modern work often includes too many moving parts, repeated updates, context switching, and fragmented tasks that reduce execution quality.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Goal & Priority Planning",
    desc: "Start by identifying the real objective, deciding what matters first, and separating important work from low-value tasks.",
  },
  {
    icon: CalendarRange,
    title: "Day & Week Structuring",
    desc: "Use AI to support planning, slotting work, sequencing priorities, and creating clearer daily or weekly operating structure.",
  },
  {
    icon: CheckSquare,
    title: "Task Breakdown & Action Clarity",
    desc: "Break large work into smaller actions, checklists, next steps, and more usable execution units.",
  },
  {
    icon: FileText,
    title: "Notes & Summary Support",
    desc: "Use AI to summarize meetings, tasks, updates, documents, and daily notes so information stays easier to use.",
  },
  {
    icon: RefreshCcw,
    title: "Review & Adjustment",
    desc: "Improve productivity flow by reviewing what got delayed, what worked, what repeated, and what needs adjustment.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Execution System",
    desc: "Organize recurring systems, review checkpoints, work boards, and repeatable planning structures for ongoing productivity.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Teams",
    desc: "Teams can use AI productivity workflows to improve internal planning, update clarity, follow-ups, and better daily execution structure.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can use these workflows to manage clients, tasks, delivery timelines, notes, and repeated execution routines.",
  },
  {
    icon: TimerReset,
    title: "Founders & Operators",
    desc: "Founders and operators can use workflow systems to reduce mental load, improve prioritization, and handle repeated execution demands.",
  },
  {
    icon: Sparkles,
    title: "Students & Professionals",
    desc: "Students and professionals can use AI productivity workflows for study planning, task systems, note clarity, and better time use.",
  },
];

const relatedPages = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the wider AI skill categories that connect with productivity systems and practical digital execution.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support summaries, planning, task organization, workflow management, and daily execution systems.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how productivity workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how productivity workflows connect with broader high-value AI skill development.",
  },
  {
    href: "/ai-automation-workflows",
    title: "AI Automation Workflows",
    desc: "Explore the connected workflow layer for repeated process execution, task support, and structured operating systems.",
  },
  {
    href: "/ai-content-workflows",
    title: "Create Content with Automate Work with AI",
    desc: "See how productivity systems connect with ideation, drafting, repurposing, and structured content execution.",
  },
];

const faqs = [
  {
    q: "What is an AI productivity workflow?",
    a: "An AI productivity workflow is a structured process that uses AI across planning, prioritization, summaries, task breakdowns, reviews, and repeatable daily execution systems.",
  },
  {
    q: "Why are AI productivity workflows important?",
    a: "They are important because they help people move from generic productivity advice to clearer, more repeatable execution systems.",
  },
  {
    q: "Can beginners use AI productivity workflows?",
    a: "Yes. Beginners can start with simple workflows such as daily planning, task breakdowns, summaries, and weekly review support before moving into more advanced systems.",
  },
  {
    q: "Are AI productivity workflows only for teams?",
    a: "No. Students, founders, freelancers, professionals, and teams can all use structured AI productivity workflows.",
  },
  {
    q: "What is the difference between productivity tools and productivity workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical daily execution.",
  },
  {
    q: "Can AI productivity workflows help with planning and follow-ups?",
    a: "Yes. A strong workflow can support planning, task clarity, meeting notes, summaries, follow-ups, and repeated operating routines.",
  },
  {
    q: "What is the biggest mistake people make with AI productivity?",
    a: "A common mistake is generating lists or plans without creating a repeatable review system, realistic task flow, or execution habit structure.",
  },
  {
    q: "Where should someone start with AI productivity workflows?",
    a: "A good starting point is a simple system: identify priorities, break tasks, plan the day, summarize progress, and review what needs adjustment.",
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

export default function AiProductivityWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI productivity workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI productivity workflows help people move from generic planning and scattered task handling to a
              structured system for prioritization, planning, summaries, execution, and review. Instead of
              relying on disconnected productivity tips, a workflow creates a repeatable process that improves
              clarity, focus, and practical daily execution.
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
            title="What AI productivity workflows actually mean"
            desc="A workflow-based productivity approach makes AI useful because repeated work sits inside a practical sequence instead of becoming random task assistance."
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
            title="Core stages inside an AI productivity workflow"
            desc="A practical productivity system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI productivity workflows are commonly used"
            desc="These workflows are relevant wherever repeated work needs to be planned, tracked, reviewed, and improved in a structured way."
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
            desc="These pages connect AI productivity workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI productivity workflows."
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
