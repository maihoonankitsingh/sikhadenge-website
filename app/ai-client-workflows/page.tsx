import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  ClipboardList,
  FileText,
  FolderKanban,
  Handshake,
  Lightbulb,
  MessageSquareText,
  RefreshCcw,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Client Workflows | Sikhadenge",
  description:
    "Understand AI client workflows in a practical way. Learn how structured AI-assisted client systems help with communication, requirement clarity, updates, revisions, and repeatable delivery execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-client-workflows",
  },
  openGraph: {
    title: "AI Client Workflows | Sikhadenge",
    description:
      "A practical guide to AI client workflows across communication, requirement clarity, updates, revisions, and repeatable delivery execution.",
    url: "https://sikhadenge.in/ai-client-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Client Workflows | Sikhadenge",
    description:
      "A practical guide to AI client workflows across communication, requirement clarity, updates, revisions, and repeatable delivery execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI client workflows are structured systems that use AI support across requirement capture, communication, updates, revisions, and delivery handling.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, client work often becomes unclear and reactive. A system improves communication quality, structure, and delivery confidence.",
  },
  {
    title: "Who benefits",
    desc: "Freelancers, agencies, founders, coordinators, and client-facing execution teams all benefit from better AI-assisted client workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than one reply or one brief",
    desc: "AI client workflows are not limited to drafting one message. They connect inquiry handling, requirement understanding, project flow, revisions, and final delivery into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI supports multiple client stages",
    desc: "Useful workflows use AI across communication support, note structuring, brief clarity, progress updates, revision handling, and delivery organization instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is cleaner client execution",
    desc: "A strong workflow helps client work become more professional, more predictable, and easier to manage across repeated projects and delivery cycles.",
  },
  {
    icon: Briefcase,
    title: "This matters in real service work",
    desc: "Modern client work often includes fast response needs, unclear requirements, scattered feedback, and repeated follow-ups that need better structure.",
  },
];

const workflowStages = [
  {
    icon: Handshake,
    title: "Inquiry & First Communication",
    desc: "Start with first response, project understanding, expectation setting, and initial clarity before any execution begins.",
  },
  {
    icon: ClipboardList,
    title: "Requirement & Brief Structuring",
    desc: "Use AI to turn raw client inputs into cleaner requirement notes, scope understanding, task clarity, and project checkpoints.",
  },
  {
    icon: MessageSquareText,
    title: "Update & Communication Flow",
    desc: "Support follow-ups, clarification replies, update messages, and client-facing communication with more structure and consistency.",
  },
  {
    icon: FileText,
    title: "Delivery & Documentation Support",
    desc: "Use AI to support task summaries, delivery notes, handover messaging, and project documentation across client work.",
  },
  {
    icon: RefreshCcw,
    title: "Revision & Feedback Handling",
    desc: "Turn scattered feedback into structured actions, cleaner replies, and more manageable revision cycles.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Client System",
    desc: "Organize status flow, review checkpoints, client notes, reusable templates, and repeatable client-handling systems.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Agencies",
    desc: "Agencies can use AI client workflows to improve communication consistency, internal handoffs, and structured delivery systems.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can use these workflows to handle client projects more clearly across brief intake, updates, revisions, and final delivery.",
  },
  {
    icon: Handshake,
    title: "Client Coordinators",
    desc: "Coordinators can use structured workflows for requirement capture, update flow, revision mapping, and cleaner client communication.",
  },
  {
    icon: Workflow,
    title: "Delivery Teams",
    desc: "Delivery teams can use workflow systems to improve repeated execution, response quality, and project tracking across multiple clients.",
  },
];

const relatedPages = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the wider AI skill categories that connect with client systems and practical digital execution.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support communication, notes, briefs, summaries, and structured client execution workflows.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how client workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how client workflows connect with broader high-value AI skill development.",
  },
  {
    href: "/ai-freelance-workflows",
    title: "AI Freelance Workflows",
    desc: "Explore the connected workflow layer for freelance handling, delivery support, revisions, and service execution.",
  },
  {
    href: "/ai-productivity-workflows",
    title: "AI Productivity Workflows",
    desc: "See how client execution connects with planning, follow-ups, summaries, and structured daily workflow systems.",
  },
];

const faqs = [
  {
    q: "What is an AI client workflow?",
    a: "An AI client workflow is a structured process that uses AI across communication, requirement clarity, updates, revisions, delivery support, and repeatable client handling.",
  },
  {
    q: "Why are AI client workflows important?",
    a: "They are important because they help reduce confusion, improve professional communication, and create more repeatable client execution systems.",
  },
  {
    q: "Can beginners use AI client workflows?",
    a: "Yes. Beginners can start with simple workflows for requirement notes, update drafts, revision mapping, and delivery checklists before moving into more advanced systems.",
  },
  {
    q: "Are AI client workflows only for agencies?",
    a: "No. Freelancers, agencies, founders, coordinators, and client-facing delivery teams can all use structured AI client workflows.",
  },
  {
    q: "What is the difference between client tools and client workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical client handling and delivery.",
  },
  {
    q: "Can AI client workflows help with updates and revisions?",
    a: "Yes. A strong workflow can support progress updates, clarification messages, revision handling, handover notes, and smoother client communication overall.",
  },
  {
    q: "What is the biggest mistake people make with AI in client work?",
    a: "A common mistake is using AI for scattered replies without building a proper system for requirements, update flow, revisions, and delivery checkpoints.",
  },
  {
    q: "Where should someone start with AI client workflows?",
    a: "A good starting point is a simple system: inquiry, requirement notes, update flow, delivery support, and revision handling.",
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

export default function AiClientWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI client workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI client workflows help people move from scattered client handling to a structured system for
              requirement clarity, communication, updates, revisions, and final delivery. Instead of relying on
              disconnected actions, a workflow creates a repeatable process that improves clarity, speed, and
              practical execution across client projects.
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
            title="What AI client workflows actually mean"
            desc="A workflow-based client approach makes AI useful because every client-facing task sits inside a practical sequence instead of becoming a disconnected action."
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
            title="Core stages inside an AI client workflow"
            desc="A practical client system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI client workflows are commonly used"
            desc="These workflows are relevant wherever client work needs to be handled, tracked, delivered, and improved in a structured way."
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
            desc="These pages connect AI client workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI client workflows."
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
