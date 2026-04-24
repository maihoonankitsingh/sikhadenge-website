import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  FileText,
  FolderKanban,
  Funnel,
  Lightbulb,
  LineChart,
  Megaphone,
  RefreshCcw,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Market with Automate Work with AI | Sikhadenge",
  description:
    "Understand AI marketing workflows in a practical way. Learn how structured AI-assisted marketing systems help with campaign ideation, messaging, content planning, asset support, optimization, and execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-marketing-workflows",
  },
  openGraph: {
    title: "Market with Automate Work with AI | Sikhadenge",
    description:
      "A practical guide to AI marketing workflows across campaign ideation, messaging, asset support, optimization, and execution systems.",
    url: "https://sikhadenge.in/ai-marketing-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Market with Automate Work with AI | Sikhadenge",
    description:
      "A practical guide to AI marketing workflows across campaign ideation, messaging, asset support, optimization, and execution systems.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI marketing workflows are structured systems that use AI support across campaign thinking, content planning, messaging, creative support, and optimization.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, AI marketing often becomes random copy generation. A system improves clarity, consistency, and execution quality.",
  },
  {
    title: "Who benefits",
    desc: "Founders, marketers, creators, freelancers, and execution teams all benefit from better AI-assisted marketing workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than one ad copy prompt",
    desc: "AI marketing workflows are not limited to generating one line of copy. They connect objective, audience, positioning, offer clarity, asset support, and optimization into one repeatable process.",
  },
  {
    icon: Bot,
    title: "AI supports multiple marketing stages",
    desc: "Useful workflows use AI across ideation, audience thinking, offer framing, creative support, copy drafting, campaign planning, and reporting support instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is stronger marketing execution",
    desc: "A good workflow helps marketing become clearer, faster, more aligned with the audience, and easier to repeat across channels and campaigns.",
  },
  {
    icon: Briefcase,
    title: "This matters in real business growth",
    desc: "Modern digital marketing often needs more speed, more testing, better offer communication, and more consistent content and creative production.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Campaign Intent & Offer Thinking",
    desc: "Start with goal, audience, offer, problem, positioning, funnel objective, and expected action before creating anything.",
  },
  {
    icon: Funnel,
    title: "Audience & Message Planning",
    desc: "Use AI to support audience angles, pain points, hooks, objections, and message structures for better communication.",
  },
  {
    icon: FileText,
    title: "Copy & Content Support",
    desc: "Build drafts for ads, captions, landing page sections, scripts, email-style messaging, and campaign content structures.",
  },
  {
    icon: Megaphone,
    title: "Creative & Asset Support",
    desc: "Use AI to support visuals, ad concepts, content directions, offer presentation, and multi-format creative execution.",
  },
  {
    icon: RefreshCcw,
    title: "Testing & Refinement",
    desc: "Improve copy clarity, creative direction, CTA strength, message fit, and content performance through structured iteration.",
  },
  {
    icon: FolderKanban,
    title: "Execution & Reporting System",
    desc: "Organize campaign flow, asset status, content batches, notes, review checkpoints, and repeatable optimization systems.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Marketing Teams",
    desc: "Teams can use AI marketing workflows for campaign planning, content production, creative support, and faster execution.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can use these workflows to improve client strategy support, copy clarity, asset planning, and cleaner delivery systems.",
  },
  {
    icon: Megaphone,
    title: "Founders",
    desc: "Founders can use AI marketing workflows to clarify offers, improve communication, and support lead generation systems.",
  },
  {
    icon: LineChart,
    title: "Growth Operators",
    desc: "Growth-focused operators can use workflow systems to improve campaign structure, asset flow, and execution speed.",
  },
];

const relatedPages = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the wider AI skill categories that connect with marketing systems and practical digital execution.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support marketing copy, creative generation, content planning, and execution workflows.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how marketing workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how marketing workflows connect with broader high-value AI skill development.",
  },
  {
    href: "/ai-content-workflows",
    title: "Create Content with Automate Work with AI",
    desc: "Explore the connected workflow layer for ideation, drafting, repurposing, and structured content systems.",
  },
  {
    href: "/ai-design-workflows",
    title: "Design with Automate Work with AI",
    desc: "See how marketing execution connects with structured AI-assisted design systems and visual workflows.",
  },
];

const faqs = [
  {
    q: "What is an AI marketing workflow?",
    a: "An AI marketing workflow is a structured process that uses AI across campaign thinking, offer framing, messaging, content support, creative support, testing, and execution.",
  },
  {
    q: "Why are AI marketing workflows important?",
    a: "They are important because they make marketing execution more structured, repeatable, and aligned with business goals than random copy or creative generation.",
  },
  {
    q: "Can beginners use AI marketing workflows?",
    a: "Yes. Beginners can start with simple workflows for offer clarity, audience angles, ad copy drafts, and content planning before moving into more advanced systems.",
  },
  {
    q: "Are AI marketing workflows only for ad teams?",
    a: "No. Founders, creators, freelancers, growth teams, and marketers can all use structured AI marketing workflows.",
  },
  {
    q: "What is the difference between AI marketing tools and AI marketing workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that show how those tools are used step by step for practical marketing execution.",
  },
  {
    q: "Can AI marketing workflows help with campaigns and content together?",
    a: "Yes. A strong workflow can connect offer communication, ad copy, content ideas, creatives, landing support, and execution planning together.",
  },
  {
    q: "What is the biggest mistake people make with AI marketing?",
    a: "A common mistake is generating random copy or creatives without a clear audience, offer structure, funnel objective, or testing system.",
  },
  {
    q: "Where should someone start with AI marketing workflows?",
    a: "A good starting point is a simple system: goal, audience, offer, message, assets, refine, and execute.",
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

export default function AiMarketingWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI marketing workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI marketing workflows help people move from random copy or disconnected campaign tasks to a
              structured system for offer thinking, audience messaging, content planning, creative support,
              refinement, and execution. Instead of relying on isolated prompts, a workflow creates a
              repeatable process that improves marketing clarity, speed, and output quality.
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
            title="What AI marketing workflows actually mean"
            desc="A workflow-based marketing approach makes AI useful because every campaign task sits inside a practical sequence instead of becoming a disconnected output."
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
            title="Core stages inside an AI marketing workflow"
            desc="A practical marketing system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI marketing workflows are commonly used"
            desc="These workflows are relevant wherever campaigns, messaging, content, and assets need to be planned, executed, refined, and repeated in a structured way."
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
            desc="These pages connect AI marketing workflows with the broader Sikhadenge topic cluster around skills, tools, creators, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI marketing workflows."
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
