import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  FileText,
  FolderKanban,
  Handshake,
  Lightbulb,
  RefreshCcw,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Team Workflows | Sikhadenge",
  description:
    "Understand AI team workflows in a practical way. Learn how structured AI-assisted systems help with coordination, task clarity, internal communication, updates, and repeatable team execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-team-workflows",
  },
  openGraph: {
    title: "AI Team Workflows | Sikhadenge",
    description:
      "A practical guide to AI team workflows across coordination, task clarity, internal communication, updates, and repeatable team execution.",
    url: "https://sikhadenge.in/ai-team-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Team Workflows | Sikhadenge",
    description:
      "A practical guide to AI team workflows across coordination, task clarity, internal communication, updates, and repeatable team execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI team workflows are structured systems that use AI support for coordination, communication, execution visibility, and repeatable team operations.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, teams face confusion, delays, and repeated misalignment. A system improves clarity, speed, and consistency.",
  },
  {
    title: "Who benefits",
    desc: "Founders, managers, coordinators, operators, and small or growing teams all benefit from better AI-assisted team workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than one team message",
    desc: "AI team workflows are not limited to writing one update or one note. They connect task flow, internal coordination, progress visibility, and repeated team execution into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI supports multiple team stages",
    desc: "Useful workflows use AI across summaries, meeting notes, task breakdowns, follow-ups, role clarity, reporting, and process support instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better team execution",
    desc: "A strong workflow helps team work become more visible, more coordinated, easier to manage, and easier to improve over time.",
  },
  {
    icon: Briefcase,
    title: "This matters in real work environments",
    desc: "Modern teams often lose time in unclear updates, scattered follow-ups, weak handoffs, and repeated communication gaps that need better systems.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Role & Task Clarity",
    desc: "Start by defining who is responsible, what needs to be done, when it is needed, and what successful completion looks like.",
  },
  {
    icon: Handshake,
    title: "Coordination & Communication Flow",
    desc: "Use AI to support structured updates, internal communication, follow-up clarity, and better handoff communication between people.",
  },
  {
    icon: FileText,
    title: "Meeting Notes & Summary Support",
    desc: "Turn discussions, calls, and internal conversations into clearer summaries, next steps, task notes, and useful execution references.",
  },
  {
    icon: Users,
    title: "Execution Tracking",
    desc: "Improve team visibility by organizing task movement, pending items, blockers, and update structure across the work cycle.",
  },
  {
    icon: RefreshCcw,
    title: "Review & Improvement",
    desc: "Check where delays, confusion, repetition, or missed follow-ups happen, then refine the workflow through iteration.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Team System",
    desc: "Organize recurring updates, operating templates, review checkpoints, task boards, and repeatable team execution systems.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Small Teams",
    desc: "Small teams can use AI team workflows to improve daily coordination, update clarity, and repeated execution quality.",
  },
  {
    icon: Briefcase,
    title: "Managers",
    desc: "Managers can use these workflows to improve follow-ups, task visibility, summaries, and better execution control.",
  },
  {
    icon: Sparkles,
    title: "Founders",
    desc: "Founders can use workflow systems to improve team alignment, internal communication, and operational clarity without depending on scattered follow-ups.",
  },
  {
    icon: Workflow,
    title: "Coordinators & Operators",
    desc: "Execution-focused coordinators can use structured team workflows to improve task movement, reporting, and daily work consistency.",
  },
];

const relatedPages = [
  {
    href: "/ai-business-workflows",
    title: "AI Business Workflows",
    desc: "See how team execution connects with broader business process systems, coordination, and repeated operational support.",
  },
  {
    href: "/ai-productivity-workflows",
    title: "AI Productivity Workflows",
    desc: "Understand how planning, summaries, and structured execution routines support stronger team coordination.",
  },
  {
    href: "/ai-automation-workflows",
    title: "AI Automation Workflows",
    desc: "See how team workflows connect with repeated process systems and AI-supported automation execution.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support meeting notes, updates, summaries, coordination, and structured team workflows.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how team workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how team workflows connect with broader high-value AI skill development.",
  },
];

const faqs = [
  {
    q: "What is an AI team workflow?",
    a: "An AI team workflow is a structured process that uses AI across coordination, communication, task clarity, summaries, and repeatable team execution support.",
  },
  {
    q: "Why are AI team workflows important?",
    a: "They are important because they help teams reduce confusion, improve coordination, and build more repeatable internal execution systems.",
  },
  {
    q: "Can small teams use AI team workflows?",
    a: "Yes. Small teams can use simple workflow systems for updates, task visibility, summaries, and follow-up support before moving into larger operating systems.",
  },
  {
    q: "Are AI team workflows only for managers?",
    a: "No. Founders, managers, coordinators, operators, and growing teams can all use structured AI team workflows.",
  },
  {
    q: "What is the difference between team tools and team workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical team execution.",
  },
  {
    q: "Can AI team workflows help with meetings and follow-ups?",
    a: "Yes. A strong workflow can support meeting notes, next-step clarity, updates, blockers, and smoother follow-up systems.",
  },
  {
    q: "What is the biggest mistake people make with AI in team operations?",
    a: "A common mistake is using AI for isolated notes or messages without building a repeatable structure for communication, tracking, and execution.",
  },
  {
    q: "Where should someone start with AI team workflows?",
    a: "A good starting point is a simple system: define team roles, structure updates, summarize meetings, track pending work, and refine the process over time.",
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

export default function AiTeamWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI team workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI team workflows help people move from scattered internal coordination to a structured system for task clarity,
              communication, summaries, tracking, and repeatable team execution. Instead of relying on disconnected updates,
              a workflow creates a repeatable process that improves clarity, speed, and operational consistency across team work.
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
            title="What AI team workflows actually mean"
            desc="A workflow-based team approach makes AI useful because repeated coordination tasks sit inside a practical sequence instead of becoming isolated updates."
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
            title="Core stages inside an AI team workflow"
            desc="A practical team system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI team workflows are commonly used"
            desc="These workflows are relevant wherever repeated team tasks need to be coordinated, tracked, summarized, and improved in a structured way."
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
            desc="These pages connect AI team workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI team workflows."
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
