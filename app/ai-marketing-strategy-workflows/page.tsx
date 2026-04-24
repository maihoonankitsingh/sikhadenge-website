import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  FileText,
  FolderKanban,
  Lightbulb,
  Megaphone,
  RefreshCcw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Market with AI Strategy Workflows | Sikhadenge",
  description:
    "Understand AI marketing strategy workflows in a practical way. Learn how structured AI-assisted systems help with audience clarity, positioning, campaign planning, messaging, and repeatable marketing execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-marketing-strategy-workflows",
  },
  openGraph: {
    title: "Market with AI Strategy Workflows | Sikhadenge",
    description:
      "A practical guide to AI marketing strategy workflows across audience clarity, positioning, campaign planning, messaging, and repeatable marketing execution.",
    url: "https://sikhadenge.in/ai-marketing-strategy-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Market with AI Strategy Workflows | Sikhadenge",
    description:
      "A practical guide to AI marketing strategy workflows across audience clarity, positioning, campaign planning, messaging, and repeatable marketing execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI marketing strategy workflows are structured systems that use AI support across audience clarity, positioning, planning, messaging, and campaign direction.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, marketing strategy becomes reactive and fragmented. A system improves clarity, consistency, and better execution quality.",
  },
  {
    title: "Who benefits",
    desc: "Founders, marketers, freelancers, creators, and growing teams all benefit from better AI-assisted marketing strategy workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than one campaign idea",
    desc: "AI marketing strategy workflows are not limited to generating one slogan or one post angle. They connect audience understanding, positioning, messaging, planning, and execution into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI supports multiple strategy stages",
    desc: "Useful workflows use AI across audience mapping, value communication, campaign thinking, content directions, offer framing, and messaging refinement instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better marketing clarity",
    desc: "A strong workflow helps strategy become easier to explain, easier to repeat, and easier to convert into usable campaigns and content systems.",
  },
  {
    icon: Briefcase,
    title: "This matters in real growth execution",
    desc: "Modern marketing often fails because messaging, audience fit, campaign thinking, and content direction are handled without a consistent strategic system.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Audience & Offer Clarity",
    desc: "Start by defining who the audience is, what problem matters, what offer exists, and what result the communication should drive.",
  },
  {
    icon: TrendingUp,
    title: "Positioning & Message Direction",
    desc: "Use AI to support positioning logic, audience angles, value communication, core messaging direction, and brand-level differentiation thinking.",
  },
  {
    icon: Megaphone,
    title: "Campaign & Channel Planning",
    desc: "Plan campaign themes, channel fit, content direction, traffic ideas, offer timing, and message distribution structure.",
  },
  {
    icon: FileText,
    title: "Strategy Notes & Execution Mapping",
    desc: "Turn raw strategy thinking into cleaner notes, messaging frameworks, campaign documents, content plans, and execution references.",
  },
  {
    icon: RefreshCcw,
    title: "Review & Refinement",
    desc: "Improve weak positioning, unclear messaging, low-performing angles, and strategy gaps through structured iteration and clearer insight loops.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Marketing System",
    desc: "Organize reusable messaging patterns, audience notes, campaign frameworks, planning templates, and repeatable strategy systems for future execution.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Founders",
    desc: "Founders can use AI marketing strategy workflows to clarify positioning, communicate offers better, and align growth activities more cleanly.",
  },
  {
    icon: Briefcase,
    title: "Marketers",
    desc: "Marketers can use these workflows to improve campaign planning, message direction, audience fit, and stronger execution consistency.",
  },
  {
    icon: Sparkles,
    title: "Freelancers",
    desc: "Freelancers can use workflow systems to support client strategy thinking, messaging plans, offer angles, and better campaign structure.",
  },
  {
    icon: Workflow,
    title: "Small Teams",
    desc: "Small teams can use structured workflows to reduce marketing confusion and build stronger repeatable strategy-to-execution systems.",
  },
];

const relatedPages = [
  {
    href: "/ai-marketing-workflows",
    title: "Market with Automate Work with AI",
    desc: "See how marketing strategy connects with campaign execution, content systems, and structured delivery workflows.",
  },
  {
    href: "/ai-ad-creative-workflows",
    title: "AI Ad Creative Workflows",
    desc: "Understand how strategy connects with hooks, offer communication, creative directions, and testable ad execution.",
  },
  {
    href: "/ai-social-media-workflows",
    title: "AI Social Media Workflows",
    desc: "See how marketing strategy connects with content calendars, platform planning, publishing systems, and message distribution.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support audience mapping, messaging, summaries, campaign planning, and structured strategy workflows.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how marketing strategy workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how marketing strategy workflows connect with broader high-value AI skill development.",
  },
];

const faqs = [
  {
    q: "What is an AI marketing strategy workflow?",
    a: "An AI marketing strategy workflow is a structured process that uses AI across audience clarity, positioning, messaging, campaign planning, and repeatable strategy execution.",
  },
  {
    q: "Why are AI marketing strategy workflows important?",
    a: "They are important because they help teams move from random ideas to more structured, clear, and repeatable marketing thinking.",
  },
  {
    q: "Can beginners use AI marketing strategy workflows?",
    a: "Yes. Beginners can start with simple workflows for audience clarity, offer messaging, campaign themes, and basic planning before using advanced systems.",
  },
  {
    q: "Are AI marketing strategy workflows only for agencies?",
    a: "No. Founders, freelancers, marketers, creators, and small teams can all use structured AI marketing strategy workflows.",
  },
  {
    q: "What is the difference between marketing tools and marketing strategy workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical strategy development and execution.",
  },
  {
    q: "Can AI marketing strategy workflows help with positioning?",
    a: "Yes. A strong workflow can support audience understanding, offer communication, differentiators, campaign themes, and cleaner message direction.",
  },
  {
    q: "What is the biggest mistake people make with AI in marketing strategy?",
    a: "A common mistake is generating many campaign ideas without building a structured system for audience clarity, positioning, messaging, and refinement.",
  },
  {
    q: "Where should someone start with AI marketing strategy workflows?",
    a: "A good starting point is a simple system: define the audience, clarify the offer, build core messaging, choose campaign direction, then refine through iteration.",
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

export default function AiMarketingStrategyWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI marketing strategy workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI marketing strategy workflows help people move from random campaign thinking to a structured system for audience clarity,
              positioning, messaging, planning, and repeatable execution. Instead of relying on disconnected ideas,
              a workflow creates a repeatable process that improves strategic clarity, consistency, and practical marketing direction.
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
            title="What AI marketing strategy workflows actually mean"
            desc="A workflow-based strategy approach makes AI useful because repeated marketing decisions sit inside a practical sequence instead of becoming random ideas."
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
            title="Core stages inside an AI marketing strategy workflow"
            desc="A practical marketing strategy system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI marketing strategy workflows are commonly used"
            desc="These workflows are relevant wherever audience understanding, positioning, messaging, and campaign direction need to be built in a structured way."
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
            desc="These pages connect AI marketing strategy workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI marketing strategy workflows."
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
