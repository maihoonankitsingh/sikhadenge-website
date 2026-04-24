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
  Mail,
  RefreshCcw,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Email Marketing Workflows | Sikhadenge",
  description:
    "Understand AI email marketing workflows in a practical way. Learn how structured AI-assisted systems help with audience segmentation, subject lines, message sequencing, campaign planning, optimization, and repeatable email execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-email-marketing-workflows",
  },
  openGraph: {
    title: "AI Email Marketing Workflows | Sikhadenge",
    description:
      "A practical guide to AI email marketing workflows across audience segmentation, subject lines, campaign sequencing, message planning, optimization, and repeatable execution.",
    url: "https://sikhadenge.in/ai-email-marketing-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Email Marketing Workflows | Sikhadenge",
    description:
      "A practical guide to AI email marketing workflows across audience segmentation, subject lines, campaign sequencing, message planning, optimization, and repeatable execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI email marketing workflows are structured systems that use AI support for segmentation, message planning, subject lines, email sequencing, optimization, and repeatable campaign execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, email marketing becomes inconsistent, generic, and hard to improve. A structured system improves message clarity, relevance, timing, and campaign discipline.",
  },
  {
    title: "Who benefits",
    desc: "Marketers, founders, creators, educators, freelancers, agencies, e-commerce brands, and growth teams all benefit from stronger AI-assisted email marketing workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than writing one email",
    desc: "AI email marketing workflows are not limited to generating one subject line or one campaign draft. They connect audience segmentation, campaign goals, sequencing, message structure, testing, and optimization into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support many email stages",
    desc: "A useful workflow uses AI across campaign ideation, audience-based message variations, subject line options, nurture sequences, CTA drafting, and performance-oriented refinement instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better email execution",
    desc: "A strong workflow helps email campaigns become easier to plan, easier to personalize, easier to optimize, and easier to repeat across different campaign goals.",
  },
  {
    icon: Briefcase,
    title: "This matters in real business systems",
    desc: "Modern email performance usually depends on better message systems, not random sends. Weak planning often reduces open quality, engagement depth, and campaign consistency.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Audience, Goal & Offer Clarity",
    desc: "Start by identifying who the email is for, what stage of awareness they are in, what campaign goal matters most, what offer or message should be communicated, and what action should happen next.",
  },
  {
    icon: ClipboardList,
    title: "Segmentation & Sequence Planning",
    desc: "Use AI to structure audience segments, build campaign flows, map email sequences, identify message order, and create better nurture or conversion paths.",
  },
  {
    icon: FileText,
    title: "Subject Line & Message Support",
    desc: "Build clearer subject lines, preview text, email body copy, CTA direction, benefit framing, and message variations based on audience context and campaign purpose.",
  },
  {
    icon: Mail,
    title: "Format & Campaign Direction",
    desc: "Plan whether the campaign works best as a welcome sequence, educational series, promo series, reminder flow, onboarding sequence, reactivation campaign, or newsletter format.",
  },
  {
    icon: RefreshCcw,
    title: "Testing & Optimization Loop",
    desc: "Refine weak subject lines, improve message order, create alternate email versions, adjust CTA placement, and strengthen performance through repeated iteration.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Email System",
    desc: "Organize segment logic, campaign templates, subject line banks, sequence frameworks, CTA patterns, and send-performance notes into a repeatable email workflow system.",
  },
];

const useCases = [
  {
    icon: TrendingUp,
    title: "Growth & Marketing Teams",
    desc: "Growth and marketing teams can use AI email marketing workflows to improve campaign structure, message quality, and better long-term email performance.",
  },
  {
    icon: Sparkles,
    title: "Founders & Businesses",
    desc: "Founders and businesses can use these workflows to build clearer customer communication, offer education, and repeatable campaign execution.",
  },
  {
    icon: Briefcase,
    title: "Freelancers & Agencies",
    desc: "Freelancers and agencies can use workflow systems to create better client email strategies, stronger campaign sequencing, and cleaner delivery systems.",
  },
  {
    icon: Users,
    title: "Creators & Educators",
    desc: "Creators and educators can use structured workflows to nurture audiences, improve launch communication, and build stronger relationship-based email systems.",
  },
];

const relatedPages = [
  {
    href: "/ai-marketing-workflows",
    title: "Market with Automate Work with AI",
    desc: "See how email execution connects with campaign systems, audience targeting, offer communication, and structured marketing support.",
  },
  {
    href: "/ai-content-planning-workflows",
    title: "Create Content with AI Planning Workflows",
    desc: "Understand how planning systems support better email themes, content sequencing, and long-term communication consistency.",
  },
  {
    href: "/ai-sales-workflows",
    title: "AI Sales Workflows",
    desc: "Explore how email workflows connect with lead nurturing, follow-up systems, objection handling, and conversion-oriented communication.",
  },
  {
    href: "/ai-tools-for-marketing",
    title: "AI Tools for Marketing",
    desc: "See which AI tools can support segmentation, subject lines, copy drafting, campaign planning, and structured email execution.",
  },
  {
    href: "/ai-social-media-workflows",
    title: "AI Social Media Workflows",
    desc: "See how email and social content systems connect through messaging, audience understanding, content sequencing, and repeatable communication.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how email marketing workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI email marketing workflow?",
    a: "An AI email marketing workflow is a structured process that uses AI across segmentation, campaign planning, subject lines, message drafting, optimization, and repeatable email execution.",
  },
  {
    q: "Why are AI email marketing workflows important?",
    a: "They are important because they help teams and individuals move from random email sending to more structured, relevant, and repeatable campaign systems.",
  },
  {
    q: "Can beginners use AI email marketing workflows?",
    a: "Yes. Beginners can start with simple workflows for audience segments, short campaigns, subject line ideas, and email structure before using more advanced systems.",
  },
  {
    q: "Are AI email marketing workflows only for large brands?",
    a: "No. Founders, freelancers, educators, agencies, small businesses, creators, and marketing teams can all use structured AI email marketing workflows.",
  },
  {
    q: "What is the difference between email tools and email workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical email campaign execution.",
  },
  {
    q: "Can AI email marketing workflows help with conversions?",
    a: "Yes. A strong workflow can support better sequencing, stronger message relevance, more effective CTA placement, and improved campaign clarity across the customer journey.",
  },
  {
    q: "What is the biggest mistake people make with AI in email marketing?",
    a: "A common mistake is generating generic email copy without building a proper system for audience segments, sequence logic, campaign goals, and structured optimization.",
  },
  {
    q: "Where should someone start with AI email marketing workflows?",
    a: "A good starting point is a simple system: define the audience segment, clarify the campaign goal, create a short email sequence, test subject lines, then improve message quality over time.",
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

export default function AiEmailMarketingWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI email marketing workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI email marketing workflows help people move from inconsistent campaigns to a structured system for
              segmentation, campaign planning, subject lines, message sequencing, optimization, and repeatable email
              execution. Instead of relying on disconnected email actions, a workflow creates a practical process that
              improves relevance, clarity, and long-term campaign discipline.
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
            title="What AI email marketing workflows actually mean"
            desc="A workflow-based email approach makes AI useful because campaign decisions sit inside a practical sequence instead of becoming random copy generation or random campaign sending."
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
            title="Core stages inside an AI email marketing workflow"
            desc="A practical email system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI email marketing workflows are commonly used"
            desc="These workflows are relevant wherever email communication needs to be planned, personalized, optimized, and repeated in a structured way."
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
            desc="These pages connect AI email marketing workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI email marketing workflows."
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
