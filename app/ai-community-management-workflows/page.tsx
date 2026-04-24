import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  ClipboardList,
  FileText,
  FolderKanban,
  Lightbulb,
  MessageSquare,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Community Management Workflows | Sikhadenge",
  description:
    "Understand AI community management workflows in a practical way. Learn how structured AI-assisted systems help with member engagement, moderation support, response clarity, content planning, escalation logic, and repeatable community execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-community-management-workflows",
  },
  openGraph: {
    title: "AI Community Management Workflows | Sikhadenge",
    description:
      "A practical guide to AI community management workflows across engagement, moderation support, response clarity, content planning, escalation logic, and repeatable execution.",
    url: "https://sikhadenge.in/ai-community-management-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Community Management Workflows | Sikhadenge",
    description:
      "A practical guide to AI community management workflows across engagement, moderation support, response clarity, content planning, escalation logic, and repeatable execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI community management workflows are structured systems that use AI support for engagement planning, moderation support, response direction, member communication, and repeatable community execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, communities become inactive, inconsistent, or hard to manage. A structured system improves engagement quality, moderation discipline, response speed, and community clarity.",
  },
  {
    title: "Who benefits",
    desc: "Creators, education brands, founders, agencies, support teams, membership businesses, and internal communities all benefit from stronger AI-assisted community management workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than replying to members",
    desc: "AI community management workflows are not limited to answering messages. They connect member onboarding, engagement planning, moderation, communication guidelines, escalation logic, and improvement cycles into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support many community stages",
    desc: "A useful workflow uses AI across discussion prompts, FAQ support, reply drafting, moderation assistance, member issue summaries, and engagement planning instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is healthier community execution",
    desc: "A strong workflow helps communities become easier to manage, easier to grow, easier to moderate, and easier to improve across different member groups and activity levels.",
  },
  {
    icon: Briefcase,
    title: "This matters in real brand systems",
    desc: "Modern communities often depend on better systems, not random activity. Weak management usually creates confusion, low participation, delayed support, and reduced member trust.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Community Goal & Member Clarity",
    desc: "Start by identifying why the community exists, who the members are, what type of interaction should happen, what value members should receive, and what behavior should be encouraged.",
  },
  {
    icon: ClipboardList,
    title: "Engagement & Content Planning",
    desc: "Use AI to build discussion prompts, weekly engagement themes, event ideas, resource sharing systems, welcome flows, and participation structures for healthier community activity.",
  },
  {
    icon: FileText,
    title: "Response & Communication Support",
    desc: "Build clearer replies, announcement drafts, FAQ responses, onboarding messages, update notes, and structured communication that improves member understanding.",
  },
  {
    icon: ShieldCheck,
    title: "Moderation & Escalation Direction",
    desc: "Plan how to handle rule violations, conflict cases, repeated questions, sensitive issues, member complaints, and situations that require human review or escalation.",
  },
  {
    icon: RefreshCcw,
    title: "Feedback & Improvement Loop",
    desc: "Refine weak engagement patterns, improve onboarding, identify inactive segments, strengthen moderation quality, and improve participation through repeated review.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Community System",
    desc: "Organize onboarding flows, moderation rules, message templates, engagement plans, FAQ patterns, and escalation notes into a repeatable community management workflow system.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Education & Learning Communities",
    desc: "Education brands can use AI community management workflows to improve student support, engagement quality, onboarding clarity, and community discipline.",
  },
  {
    icon: Sparkles,
    title: "Creators & Membership Brands",
    desc: "Creators and membership brands can use these workflows to maintain healthier engagement, stronger communication, and more consistent community value delivery.",
  },
  {
    icon: Briefcase,
    title: "Agencies & Client Communities",
    desc: "Agencies can use workflow systems to manage client groups, support channels, updates, and discussion spaces with more structure and clarity.",
  },
  {
    icon: TrendingUp,
    title: "Business & Support Teams",
    desc: "Businesses and support teams can use structured workflows to improve member handling, moderation quality, response discipline, and long-term retention support.",
  },
];

const relatedPages = [
  {
    href: "/ai-customer-support-workflows",
    title: "AI Customer Support Workflows",
    desc: "See how community management connects with issue handling, response quality, escalation systems, and structured support execution.",
  },
  {
    href: "/ai-social-media-workflows",
    title: "AI Social Media Workflows",
    desc: "Understand how community engagement connects with content planning, audience communication, and platform-level interaction systems.",
  },
  {
    href: "/ai-brand-strategy-workflows",
    title: "AI Brand Strategy Workflows",
    desc: "Explore how community management supports brand communication, tone consistency, member trust, and long-term relationship building.",
  },
  {
    href: "/ai-content-planning-workflows",
    title: "Create Content with AI Planning Workflows",
    desc: "See how planned content systems support community discussions, engagement rhythms, announcements, and recurring activity formats.",
  },
  {
    href: "/ai-tools-for-creators",
    title: "AI Tools for Creators",
    desc: "See which AI tools support community replies, content prompts, moderation assistance, communication structure, and workflow execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how community management workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI community management workflow?",
    a: "An AI community management workflow is a structured process that uses AI across engagement planning, moderation support, response drafting, escalation logic, and repeatable community execution.",
  },
  {
    q: "Why are AI community management workflows important?",
    a: "They are important because they help individuals and teams move from reactive community handling to more structured, clear, and repeatable community systems.",
  },
  {
    q: "Can beginners use AI community management workflows?",
    a: "Yes. Beginners can start with simple workflows for welcome messages, discussion prompts, FAQ replies, and moderation support before using more advanced systems.",
  },
  {
    q: "Are AI community management workflows only for big communities?",
    a: "No. Creators, educators, founders, agencies, membership businesses, learning communities, and internal teams can all use structured AI community management workflows.",
  },
  {
    q: "What is the difference between community tools and community management workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical community management execution.",
  },
  {
    q: "Can AI community management workflows help with moderation?",
    a: "Yes. A strong workflow can support moderation guidance, issue summaries, escalation rules, repeated question handling, and clearer communication during sensitive situations.",
  },
  {
    q: "What is the biggest mistake people make with AI in community management?",
    a: "A common mistake is generating random replies without building a proper system for engagement goals, moderation standards, member onboarding, and escalation logic.",
  },
  {
    q: "Where should someone start with AI community management workflows?",
    a: "A good starting point is a simple system: define the community purpose, set communication rules, create welcome messages, plan weekly engagement prompts, then improve through feedback and moderation review.",
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

export default function AiCommunityManagementWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI community management workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI community management workflows help people move from disconnected engagement and moderation tasks to a
              structured system for member communication, response clarity, content planning, moderation support, and
              repeatable community execution. Instead of relying on random interactions, a workflow creates a practical
              process that improves clarity, engagement quality, and long-term community health.
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
            title="What AI community management workflows actually mean"
            desc="A workflow-based community approach makes AI useful because engagement and moderation decisions sit inside a practical sequence instead of becoming random replies, random announcements, or random moderation."
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
            title="Core stages inside an AI community management workflow"
            desc="A practical community management system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI community management workflows are commonly used"
            desc="These workflows are relevant wherever member interaction, moderation, onboarding, updates, and community health need to be managed in a structured way."
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
            desc="These pages connect AI community management workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI community management workflows."
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
