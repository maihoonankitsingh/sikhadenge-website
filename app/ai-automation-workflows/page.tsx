import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  FileText,
  FolderKanban,
  Lightbulb,
  RefreshCcw,
  Settings2,
  Sparkles,
  Split,
  Target,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Automation Workflows | Sikhadenge",
  description:
    "Understand AI automation workflows in a practical way. Learn how structured AI-assisted automation systems help with task flow, process support, triggers, outputs, and repeatable execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-automation-workflows",
  },
  openGraph: {
    title: "AI Automation Workflows | Sikhadenge",
    description:
      "A practical guide to AI automation workflows across task flow, process support, triggers, outputs, and repeatable execution systems.",
    url: "https://sikhadenge.in/ai-automation-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Workflows | Sikhadenge",
    description:
      "A practical guide to AI automation workflows across task flow, process support, triggers, outputs, and repeatable execution systems.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI automation workflows are structured systems that use AI support to reduce repetitive work and improve repeatable process execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, automation becomes messy or disconnected. A system improves clarity, consistency, and process control.",
  },
  {
    title: "Who benefits",
    desc: "Founders, freelancers, coordinators, teams, and operations-focused roles all benefit from better AI automation workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than one automation tool",
    desc: "AI automation workflows are not just about connecting apps. They connect inputs, decisions, actions, outputs, and follow-up logic into one repeatable process.",
  },
  {
    icon: Bot,
    title: "AI supports automation with intelligence",
    desc: "Useful workflows use AI for summaries, routing logic, message drafting, classification, content support, and decision assistance inside automation systems.",
  },
  {
    icon: Target,
    title: "The goal is better execution quality",
    desc: "A strong workflow helps work become faster, cleaner, easier to manage, and more scalable across repeated digital tasks.",
  },
  {
    icon: Briefcase,
    title: "This matters in real operational work",
    desc: "Modern digital systems often need more speed, less manual repetition, better task flow, and stronger execution support across everyday operations.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Process Identification",
    desc: "Start by identifying repeated tasks, bottlenecks, handoff points, and work patterns that are suitable for structured automation.",
  },
  {
    icon: Split,
    title: "Trigger & Flow Planning",
    desc: "Use workflow logic to define what starts the process, what conditions matter, and how steps move from one stage to another.",
  },
  {
    icon: Settings2,
    title: "Action & Tool Mapping",
    desc: "Map the tools, tasks, AI support points, outputs, notifications, and system actions needed inside the workflow.",
  },
  {
    icon: FileText,
    title: "AI Support Layer",
    desc: "Use AI to summarize, classify, draft, organize, transform, or enrich the information moving through the automation process.",
  },
  {
    icon: RefreshCcw,
    title: "Testing & Refinement",
    desc: "Improve logic, remove failures, simplify steps, and refine output quality through testing and iteration cycles.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Execution System",
    desc: "Organize workflow monitoring, update rules, review checkpoints, and repeatable process control for long-term use.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Operations Teams",
    desc: "Operations teams can use AI automation workflows to reduce repetitive tasks and improve coordination, tracking, and internal process flow.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can use these workflows to support lead handling, client follow-ups, task systems, and simpler delivery operations.",
  },
  {
    icon: Wrench,
    title: "Process Operators",
    desc: "Execution-focused operators can use structured automation workflows for updates, summaries, notes, and internal task management.",
  },
  {
    icon: Workflow,
    title: "Founders & Small Teams",
    desc: "Founders and small teams can use automation systems to improve consistency, save time, and create more scalable operating processes.",
  },
];

const relatedPages = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the wider AI skill categories that connect with process systems and practical digital execution.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support automation, workflows, process support, and structured business execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how automation workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how automation workflows connect with broader high-value AI skill development.",
  },
  {
    href: "/ai-content-workflows",
    title: "Create Content with Automate Work with AI",
    desc: "Explore the connected workflow layer for ideation, drafting, repurposing, and structured content systems.",
  },
  {
    href: "/ai-marketing-workflows",
    title: "Market with Automate Work with AI",
    desc: "See how automation execution connects with campaigns, content systems, and marketing process support.",
  },
];

const faqs = [
  {
    q: "What is an AI automation workflow?",
    a: "An AI automation workflow is a structured process that uses AI inside repeatable automation systems to support tasks like summaries, routing, drafting, classification, and process execution.",
  },
  {
    q: "Why are AI automation workflows important?",
    a: "They are important because they help teams reduce repetitive work, improve process consistency, and make digital operations easier to scale.",
  },
  {
    q: "Can beginners use AI automation workflows?",
    a: "Yes. Beginners can start with simple workflows such as form handling, note summaries, alerts, and repeated process support before moving into more advanced systems.",
  },
  {
    q: "Are AI automation workflows only for technical teams?",
    a: "No. Founders, freelancers, coordinators, operations teams, and non-technical users can all benefit from structured AI automation workflows.",
  },
  {
    q: "What is the difference between automation tools and automation workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical process execution.",
  },
  {
    q: "Can AI automation workflows help with internal team operations?",
    a: "Yes. A strong workflow can support internal updates, note summaries, task routing, lead handling, documentation, and operational consistency.",
  },
  {
    q: "What is the biggest mistake people make with AI automation?",
    a: "A common mistake is automating disconnected steps without understanding the real process logic, failure points, review needs, or output quality.",
  },
  {
    q: "Where should someone start with AI automation workflows?",
    a: "A good starting point is a simple system: identify a repeated task, define the trigger, map the steps, add AI support where needed, then test and refine.",
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

export default function AiAutomationWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI automation workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI automation workflows help people move from repeated manual work to a structured system for
              process support, triggers, actions, AI assistance, and final outputs. Instead of relying on
              disconnected automations, a workflow creates a repeatable process that improves clarity, speed,
              and practical execution across operations and digital systems.
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
            title="What AI automation workflows actually mean"
            desc="A workflow-based automation approach makes AI useful because every repeated task sits inside a practical sequence instead of becoming a disconnected tool action."
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
            title="Core stages inside an AI automation workflow"
            desc="A practical automation system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI automation workflows are commonly used"
            desc="These workflows are relevant wherever repeated digital tasks need to be handled, refined, and repeated in a structured way."
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
            desc="These pages connect AI automation workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI automation workflows."
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
