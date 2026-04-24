import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  FileText,
  FolderKanban,
  Headphones,
  LifeBuoy,
  RefreshCcw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Customer Support Workflows | Sikhadenge",
  description:
    "Understand AI customer support workflows in a practical way. Learn how structured AI-assisted systems help with ticket handling, response drafting, issue categorization, escalation logic, follow-up clarity, and repeatable support execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-customer-support-workflows",
  },
  openGraph: {
    title: "AI Customer Support Workflows | Sikhadenge",
    description:
      "A practical guide to AI customer support workflows across ticket handling, response drafting, issue categorization, escalation logic, follow-up clarity, and repeatable execution.",
    url: "https://sikhadenge.in/ai-customer-support-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Customer Support Workflows | Sikhadenge",
    description:
      "A practical guide to AI customer support workflows across ticket handling, response drafting, issue categorization, escalation logic, follow-up clarity, and repeatable execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI customer support workflows are structured systems that use AI support for issue understanding, response drafting, ticket handling, escalation logic, follow-up clarity, and repeatable support execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, support becomes reactive, inconsistent, and slow. A structured system improves response quality, speed, categorization accuracy, and customer communication.",
  },
  {
    title: "Who benefits",
    desc: "Support teams, education businesses, SaaS teams, agencies, service brands, founders, and operations teams all benefit from stronger AI-assisted support workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than one reply",
    desc: "AI customer support workflows are not limited to generating a single response. They connect issue intake, categorization, response direction, escalation logic, resolution clarity, and follow-up into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support many support stages",
    desc: "A useful workflow uses AI across ticket summaries, sentiment understanding, response drafting, resolution suggestions, FAQ matching, and escalation support instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better support execution",
    desc: "A strong workflow helps support become easier to manage, easier to scale, easier to standardize, and easier to improve across different issue types and team members.",
  },
  {
    icon: Briefcase,
    title: "This matters in real customer systems",
    desc: "Modern customer experience depends on clear and timely support. Random replies or weak handoffs usually reduce trust, increase confusion, and create repeat issue cycles.",
  },
];

const workflowStages = [
  {
    icon: ClipboardList,
    title: "Issue Intake & Context Clarity",
    desc: "Start by identifying what the customer issue is, what product or service it relates to, how urgent it is, what the expected resolution is, and what background context is already available.",
  },
  {
    icon: CheckCircle2,
    title: "Categorization & Priority Mapping",
    desc: "Use AI to classify issues, detect repeated support themes, identify priority level, and route tickets based on urgency, complexity, and support category.",
  },
  {
    icon: FileText,
    title: "Response & Resolution Support",
    desc: "Build clearer replies, better explanation formats, resolution steps, next-action guidance, and response drafts that match the issue type and customer context.",
  },
  {
    icon: LifeBuoy,
    title: "Escalation & Exception Handling",
    desc: "Plan when an issue should be escalated, when a human response is required, how exceptions should be handled, and how difficult cases should move across teams.",
  },
  {
    icon: RefreshCcw,
    title: "Follow-Up & Closure Loop",
    desc: "Refine follow-up timing, confirmation messages, unresolved issue handling, resolution tracking, and closure communication through repeated iteration.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Support System",
    desc: "Organize templates, support categories, escalation rules, FAQ patterns, response structures, and team notes into a repeatable customer support workflow system.",
  },
];

const useCases = [
  {
    icon: Headphones,
    title: "Support Teams",
    desc: "Support teams can use AI customer support workflows to improve response consistency, reduce confusion, and handle larger issue volumes with better quality.",
  },
  {
    icon: Sparkles,
    title: "Education & Service Brands",
    desc: "Education and service businesses can use these workflows to manage student or customer questions, issue resolution, and follow-up communication more clearly.",
  },
  {
    icon: TrendingUp,
    title: "SaaS & Digital Products",
    desc: "SaaS and digital product teams can use workflow systems to improve issue routing, resolution speed, documentation support, and customer experience quality.",
  },
  {
    icon: Users,
    title: "Operations & Business Teams",
    desc: "Operations teams can use structured workflows to connect customer communication, internal handoffs, escalation quality, and support process discipline.",
  },
];

const relatedPages = [
  {
    href: "/ai-sales-workflows",
    title: "AI Sales Workflows",
    desc: "See how support workflows connect with lead handling, customer communication, follow-up quality, and structured business conversations.",
  },
  {
    href: "/ai-business-workflows",
    title: "AI Business Workflows",
    desc: "Understand how AI support systems fit into broader business operations, internal process quality, and repeatable execution models.",
  },
  {
    href: "/ai-team-workflows",
    title: "AI Team Workflows",
    desc: "Explore how support execution connects with team coordination, role clarity, handoffs, and better internal workflow systems.",
  },
  {
    href: "/ai-skills-for-operations-teams",
    title: "AI Skills for Operations Teams",
    desc: "See which AI skills help operations and support teams improve ticket handling, response speed, documentation, and issue management.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support support ticket summaries, response drafting, categorization, escalation logic, and workflow execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how customer support workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI customer support workflow?",
    a: "An AI customer support workflow is a structured process that uses AI across issue understanding, categorization, response drafting, escalation logic, follow-up planning, and repeatable support execution.",
  },
  {
    q: "Why are AI customer support workflows important?",
    a: "They are important because they help teams move from reactive support handling to more structured, consistent, and scalable support systems.",
  },
  {
    q: "Can beginners use AI customer support workflows?",
    a: "Yes. Beginners can start with simple workflows for ticket summaries, reply drafting, issue categories, and follow-up handling before using more advanced systems.",
  },
  {
    q: "Are AI customer support workflows only for large companies?",
    a: "No. Small businesses, education brands, SaaS teams, agencies, operations teams, and service businesses can all use structured AI customer support workflows.",
  },
  {
    q: "What is the difference between support tools and support workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical support execution.",
  },
  {
    q: "Can AI customer support workflows help with escalations?",
    a: "Yes. A strong workflow can support issue routing, escalation rules, exception handling, priority mapping, and better communication across teams.",
  },
  {
    q: "What is the biggest mistake people make with AI in support?",
    a: "A common mistake is generating generic support replies without building a proper system for issue context, severity, categorization, escalation, and closure logic.",
  },
  {
    q: "Where should someone start with AI customer support workflows?",
    a: "A good starting point is a simple system: define support categories, create standard reply structures, set escalation rules, track unresolved issues, then improve response quality over time.",
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

export default function AiCustomerSupportWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI customer support workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI customer support workflows help people move from inconsistent issue handling to a structured system
              for ticket understanding, response clarity, escalation decisions, follow-up communication, and repeatable
              resolution execution. Instead of relying on disconnected support actions, a workflow creates a practical
              process that improves speed, clarity, and long-term support quality.
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
            title="What AI customer support workflows actually mean"
            desc="A workflow-based support approach makes AI useful because support decisions sit inside a practical sequence instead of becoming random replies, random escalation, or random follow-up."
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
            title="Core stages inside an AI customer support workflow"
            desc="A practical support system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI customer support workflows are commonly used"
            desc="These workflows are relevant wherever customer questions, tickets, issues, and escalations need to be handled in a structured way."
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
            desc="These pages connect AI customer support workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI customer support workflows."
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
