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
  Megaphone,
  RefreshCcw,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Lead Generation Workflows | Sikhadenge",
  description:
    "Understand AI lead generation workflows in a practical way. Learn how structured AI-assisted systems help with audience targeting, offer clarity, lead magnets, outreach direction, qualification flow, and repeatable lead generation execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-lead-generation-workflows",
  },
  openGraph: {
    title: "AI Lead Generation Workflows | Sikhadenge",
    description:
      "A practical guide to AI lead generation workflows across audience targeting, offer clarity, lead magnets, outreach direction, qualification flow, and repeatable execution.",
    url: "https://sikhadenge.in/ai-lead-generation-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Lead Generation Workflows | Sikhadenge",
    description:
      "A practical guide to AI lead generation workflows across audience targeting, offer clarity, lead magnets, outreach direction, qualification flow, and repeatable execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI lead generation workflows are structured systems that use AI support for audience targeting, offer positioning, lead magnet planning, message direction, qualification flow, and repeatable lead capture execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, lead generation becomes random and low quality. A structured system improves audience fit, message clarity, response quality, and more disciplined lead capture execution.",
  },
  {
    title: "Who benefits",
    desc: "Founders, marketers, freelancers, agencies, education brands, service businesses, and sales-focused teams all benefit from stronger AI-assisted lead generation workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than one campaign",
    desc: "AI lead generation workflows are not limited to making one ad, one form, or one outreach message. They connect audience research, offer clarity, lead attraction, message direction, qualification logic, and follow-up readiness into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support many lead stages",
    desc: "A useful workflow uses AI across audience segmentation, pain-point mapping, offer framing, lead magnet ideas, outreach drafts, qualification prompts, and response improvement instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better lead quality",
    desc: "A strong workflow helps lead generation become easier to manage, easier to repeat, easier to refine, and easier to scale across different channels and audiences.",
  },
  {
    icon: Briefcase,
    title: "This matters in real business systems",
    desc: "Modern growth often depends on stronger acquisition systems. Random lead generation usually creates weak intent, poor targeting, low conversion quality, and inconsistent follow-up readiness.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Audience, Problem & Offer Clarity",
    desc: "Start by identifying who the lead is, what problem matters most, what offer should attract attention, and what outcome or next step the audience should care about.",
  },
  {
    icon: Search,
    title: "Targeting & Intent Mapping",
    desc: "Use AI to explore audience segments, identify problem-aware groups, map search or platform intent, and create clearer targeting logic for better lead quality.",
  },
  {
    icon: FileText,
    title: "Lead Magnet & Message Support",
    desc: "Build clearer hooks, lead magnets, outreach copy, form messaging, landing page support, CTA direction, and short qualification content for better lead capture.",
  },
  {
    icon: Megaphone,
    title: "Channel & Campaign Direction",
    desc: "Plan whether lead generation works best through ads, landing pages, webinars, organic content, outreach sequences, communities, or platform-specific acquisition formats.",
  },
  {
    icon: RefreshCcw,
    title: "Qualification & Optimization Loop",
    desc: "Refine weak lead sources, improve lead quality filters, adjust offer positioning, improve message relevance, and strengthen conversion readiness through repeated iteration.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Lead Generation System",
    desc: "Organize audience notes, offer angles, lead magnets, campaign templates, qualification logic, and channel performance notes into a repeatable lead generation workflow system.",
  },
];

const useCases = [
  {
    icon: TrendingUp,
    title: "Growth & Marketing Teams",
    desc: "Growth and marketing teams can use AI lead generation workflows to improve targeting, offer communication, campaign quality, and better acquisition discipline.",
  },
  {
    icon: Sparkles,
    title: "Founders & Businesses",
    desc: "Founders and businesses can use these workflows to build stronger inbound systems, clearer offers, and more structured lead capture execution.",
  },
  {
    icon: Briefcase,
    title: "Freelancers & Agencies",
    desc: "Freelancers and agencies can use workflow systems to generate better client leads, improve outreach quality, and create more repeatable prospecting systems.",
  },
  {
    icon: Users,
    title: "Education & Service Brands",
    desc: "Education brands and service businesses can use structured workflows to improve enquiries, pre-qualification, and handoff quality for sales or counselling teams.",
  },
];

const relatedPages = [
  {
    href: "/ai-sales-workflows",
    title: "AI Sales Workflows",
    desc: "See how lead generation execution connects with qualification, pitch support, objection handling, follow-up quality, and conversion systems.",
  },
  {
    href: "/ai-marketing-workflows",
    title: "Market with Automate Work with AI",
    desc: "Understand how lead generation fits into broader marketing systems, audience communication, and structured campaign execution.",
  },
  {
    href: "/ai-ad-creative-workflows",
    title: "AI Ad Creative Workflows",
    desc: "Explore how lead generation connects with hooks, offer communication, ad messaging, and structured acquisition creatives.",
  },
  {
    href: "/ai-email-marketing-workflows",
    title: "AI Email Marketing Workflows",
    desc: "See how lead generation workflows connect with nurturing systems, message sequencing, and long-term conversion communication.",
  },
  {
    href: "/ai-skills-for-sales-teams",
    title: "AI Skills for Sales Teams",
    desc: "See which AI skills help teams improve lead understanding, qualification quality, follow-up discipline, and conversion readiness.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how lead generation workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI lead generation workflow?",
    a: "An AI lead generation workflow is a structured process that uses AI across audience research, offer positioning, lead magnets, message direction, qualification flow, and repeatable lead capture execution.",
  },
  {
    q: "Why are AI lead generation workflows important?",
    a: "They are important because they help individuals and teams move from random lead acquisition to more structured, relevant, and repeatable lead generation systems.",
  },
  {
    q: "Can beginners use AI lead generation workflows?",
    a: "Yes. Beginners can start with simple workflows for audience clarity, offer positioning, lead magnet ideas, and qualification steps before using more advanced systems.",
  },
  {
    q: "Are AI lead generation workflows only for paid ads?",
    a: "No. Founders, freelancers, agencies, education brands, and businesses can use structured AI lead generation workflows across ads, organic content, outreach, webinars, and landing pages.",
  },
  {
    q: "What is the difference between lead generation tools and lead generation workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical lead generation execution.",
  },
  {
    q: "Can AI lead generation workflows help improve lead quality?",
    a: "Yes. A strong workflow can support better targeting, stronger offers, clearer messaging, qualification logic, and more disciplined follow-up preparation.",
  },
  {
    q: "What is the biggest mistake people make with AI in lead generation?",
    a: "A common mistake is generating many campaign ideas without building a proper system for audience fit, offer clarity, qualification logic, and structured channel execution.",
  },
  {
    q: "Where should someone start with AI lead generation workflows?",
    a: "A good starting point is a simple system: define the audience, clarify the offer, create one lead magnet or entry point, add qualification questions, then improve lead quality through iteration.",
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

export default function AiLeadGenerationWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI lead generation workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI lead generation workflows help people move from disconnected acquisition efforts to a structured system
              for audience targeting, offer clarity, lead attraction, qualification flow, and repeatable lead capture
              execution. Instead of relying on random campaigns, a workflow creates a practical process that improves
              lead quality, speed, and long-term acquisition discipline.
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
            title="What AI lead generation workflows actually mean"
            desc="A workflow-based lead generation approach makes AI useful because acquisition decisions sit inside a practical sequence instead of becoming random ads, random outreach, or random forms."
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
            title="Core stages inside an AI lead generation workflow"
            desc="A practical lead generation system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI lead generation workflows are commonly used"
            desc="These workflows are relevant wherever enquiries, prospects, or qualified leads need to be attracted, filtered, and handed into a structured business system."
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
            desc="These pages connect AI lead generation workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI lead generation workflows."
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
