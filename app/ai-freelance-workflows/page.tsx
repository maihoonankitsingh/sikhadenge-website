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
  UserRound,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Freelance Workflows | Sikhadenge",
  description:
    "Understand AI freelance workflows in a practical way. Learn how structured AI-assisted freelance systems help with client handling, brief clarity, delivery flow, revisions, and repeatable service execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-freelance-workflows",
  },
  openGraph: {
    title: "AI Freelance Workflows | Sikhadenge",
    description:
      "A practical guide to AI freelance workflows across client handling, brief clarity, delivery flow, revisions, and repeatable service execution.",
    url: "https://sikhadenge.in/ai-freelance-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Freelance Workflows | Sikhadenge",
    description:
      "A practical guide to AI freelance workflows across client handling, brief clarity, delivery flow, revisions, and repeatable service execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI freelance workflows are structured systems that use AI support across client communication, planning, delivery, revisions, and service operations.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, freelance work becomes inconsistent and stressful. A system improves speed, clarity, and delivery quality.",
  },
  {
    title: "Who benefits",
    desc: "Freelancers, solo operators, service providers, and client-facing execution roles all benefit from better AI-assisted workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than one client prompt",
    desc: "AI freelance workflows are not limited to writing one proposal or one message. They connect client intake, brief clarity, execution, revisions, and handover into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI supports multiple freelance stages",
    desc: "Useful workflows use AI across communication, requirement understanding, planning, drafting, reporting, feedback handling, and service delivery support instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is cleaner freelance execution",
    desc: "A strong workflow helps freelance work become more professional, more organized, easier to manage, and easier to repeat across multiple clients.",
  },
  {
    icon: Briefcase,
    title: "This matters in real client work",
    desc: "Modern freelance work often involves fast response expectations, brief confusion, revision cycles, and repeated delivery tasks that need structure.",
  },
];

const workflowStages = [
  {
    icon: Handshake,
    title: "Client Intake & First Response",
    desc: "Start with inquiry handling, requirement capture, early clarity, and first-level communication that sets the project direction.",
  },
  {
    icon: ClipboardList,
    title: "Brief & Scope Structuring",
    desc: "Use AI to organize raw client inputs into a clearer brief, scope notes, deliverables, timelines, and expectation checkpoints.",
  },
  {
    icon: MessageSquareText,
    title: "Communication & Update Flow",
    desc: "Support follow-ups, clarification messages, progress updates, and client-facing communication with more structure and consistency.",
  },
  {
    icon: FileText,
    title: "Delivery Support",
    desc: "Use AI to support drafts, task planning, work preparation, delivery notes, and output structuring across freelance projects.",
  },
  {
    icon: RefreshCcw,
    title: "Revision & Feedback Handling",
    desc: "Improve revision clarity by turning comments into structured actions, cleaner responses, and more manageable update cycles.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Freelance System",
    desc: "Organize reusable processes, delivery checklists, review points, client status flow, and repeatable freelance operating systems.",
  },
];

const useCases = [
  {
    icon: UserRound,
    title: "Solo Freelancers",
    desc: "Solo freelancers can use AI freelance workflows to improve communication, clarity, execution quality, and project handling speed.",
  },
  {
    icon: Briefcase,
    title: "Service Providers",
    desc: "Service providers can use these workflows to handle client work more professionally across planning, updates, and delivery.",
  },
  {
    icon: Handshake,
    title: "Client-Facing Operators",
    desc: "People handling client coordination can use structured workflows for briefs, follow-ups, revisions, and communication flow.",
  },
  {
    icon: Workflow,
    title: "Freelance Teams",
    desc: "Small freelance teams can use workflow systems to improve handoffs, status updates, and more repeatable delivery operations.",
  },
];

const relatedPages = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the wider AI skill categories that connect with service systems and practical digital execution.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support communication, briefs, content support, and structured freelance execution workflows.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how freelance workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how freelance workflows connect with broader high-value AI skill development.",
  },
  {
    href: "/ai-content-workflows",
    title: "Create Content with Automate Work with AI",
    desc: "Explore the connected workflow layer for ideation, drafting, repurposing, and structured content systems.",
  },
  {
    href: "/ai-freelancers-skills",
    title: "AI Skills for Freelancers",
    desc: "Review the freelancer-focused AI skill path that connects delivery, communication, and client-work execution.",
  },
];

const faqs = [
  {
    q: "What is an AI freelance workflow?",
    a: "An AI freelance workflow is a structured process that uses AI across client handling, brief structuring, communication, delivery support, revisions, and repeatable service execution.",
  },
  {
    q: "Why are AI freelance workflows important?",
    a: "They are important because they help freelancers reduce confusion, improve delivery consistency, and manage client work more professionally.",
  },
  {
    q: "Can beginners use AI freelance workflows?",
    a: "Yes. Beginners can start with simple workflows for inquiry handling, requirement notes, delivery checklists, and revision support before moving into more advanced systems.",
  },
  {
    q: "Are AI freelance workflows only for experienced freelancers?",
    a: "No. Beginners, solo freelancers, client-facing operators, and small freelance teams can all use structured AI freelance workflows.",
  },
  {
    q: "What is the difference between freelance tools and freelance workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical service delivery.",
  },
  {
    q: "Can AI freelance workflows help with revisions and client communication?",
    a: "Yes. A strong workflow can support clarification, updates, revision mapping, response drafting, and smoother client communication overall.",
  },
  {
    q: "What is the biggest mistake people make with AI in freelancing?",
    a: "A common mistake is using AI for scattered replies or drafts without creating a proper system for briefs, updates, revisions, and final delivery.",
  },
  {
    q: "Where should someone start with AI freelance workflows?",
    a: "A good starting point is a simple system: inquiry, brief, task plan, update flow, delivery, and revision handling.",
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

export default function AiFreelanceWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI freelance workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI freelance workflows help people move from scattered client handling to a structured system
              for communication, brief clarity, task planning, delivery support, revisions, and final handover.
              Instead of relying on disconnected actions, a workflow creates a repeatable process that improves
              clarity, speed, and practical service execution across freelance projects.
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
            title="What AI freelance workflows actually mean"
            desc="A workflow-based freelance approach makes AI useful because every client task sits inside a practical sequence instead of becoming a disconnected action."
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
            title="Core stages inside an AI freelance workflow"
            desc="A practical freelance system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI freelance workflows are commonly used"
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
            desc="These pages connect AI freelance workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI freelance workflows."
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
