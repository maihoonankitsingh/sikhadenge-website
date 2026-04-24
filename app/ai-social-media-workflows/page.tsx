import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  CalendarRange,
  Camera,
  FileText,
  FolderKanban,
  Lightbulb,
  MessageSquare,
  RefreshCcw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Social Media Workflows | Sikhadenge",
  description:
    "Understand AI social media workflows in a practical way. Learn how structured AI-assisted systems help with planning, content angles, captions, creative formats, posting consistency, and repeatable social media execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-social-media-workflows",
  },
  openGraph: {
    title: "AI Social Media Workflows | Sikhadenge",
    description:
      "A practical guide to AI social media workflows across planning, content angles, captions, creative formats, consistency, and repeatable execution.",
    url: "https://sikhadenge.in/ai-social-media-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Social Media Workflows | Sikhadenge",
    description:
      "A practical guide to AI social media workflows across planning, content angles, captions, creative formats, consistency, and repeatable execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI social media workflows are structured systems that use AI support for planning, content ideas, captioning, creative direction, post formats, and repeatable publishing execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, social media often becomes irregular, reactive, and content-heavy without direction. A system improves consistency, clarity, and output quality.",
  },
  {
    title: "Who benefits",
    desc: "Creators, founders, freelancers, marketers, agencies, personal brands, and content teams all benefit from stronger AI-assisted social media workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than making one post",
    desc: "AI social media workflows are not just about generating captions. They connect audience understanding, content pillars, formats, planning, creation, publishing, and refinement into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support many content steps",
    desc: "A useful workflow uses AI across brainstorming, topic expansion, short scripts, captions, carousel structure, content repurposing, and consistency support rather than a single isolated task.",
  },
  {
    icon: Target,
    title: "The goal is repeatable social execution",
    desc: "A strong workflow helps social media become easier to plan, easier to create, easier to maintain, and easier to improve over time.",
  },
  {
    icon: Briefcase,
    title: "This matters in real brand systems",
    desc: "Modern social growth usually depends on content systems, not random posting. Better workflows improve message clarity, brand consistency, and platform-level execution.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Audience, Platform & Content Pillar Clarity",
    desc: "Start by defining who the content is for, which platform matters most, what themes should repeat, and what action or response the content should create.",
  },
  {
    icon: CalendarRange,
    title: "Planning & Topic Mapping",
    desc: "Use AI to generate topic banks, pillar-based ideas, weekly content directions, content sequences, and a more structured publishing calendar.",
  },
  {
    icon: FileText,
    title: "Caption, Script & Message Support",
    desc: "Build clearer captions, short hooks, talking points, reel scripts, carousel text, and post messaging that fits the content goal and audience intent.",
  },
  {
    icon: Camera,
    title: "Format & Creative Direction",
    desc: "Plan whether a topic works best as a reel, carousel, single-image post, text post, talking-head video, educational explainer, or repurposed content format.",
  },
  {
    icon: RefreshCcw,
    title: "Repurposing & Iteration Loop",
    desc: "Improve weak content ideas, create multiple versions, turn one topic into many assets, and build better output cycles through structured repetition.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Social Media System",
    desc: "Organize content pillars, topic banks, caption patterns, posting templates, creative references, and weekly execution systems for long-term content consistency.",
  },
];

const useCases = [
  {
    icon: Sparkles,
    title: "Creators & Personal Brands",
    desc: "Creators and personal brands can use AI social media workflows to maintain consistency, generate better ideas, and communicate with more clarity.",
  },
  {
    icon: TrendingUp,
    title: "Marketers & Growth Teams",
    desc: "Marketers can use these workflows to build stronger platform execution, campaign-linked content systems, and better content production speed.",
  },
  {
    icon: Briefcase,
    title: "Freelancers & Agencies",
    desc: "Freelancers and agencies can use workflow systems to create faster client content pipelines, cleaner approval systems, and repeatable monthly delivery.",
  },
  {
    icon: Users,
    title: "Businesses & Teams",
    desc: "Businesses and internal teams can use structured workflows to align content planning, creative output, publishing rhythm, and brand communication.",
  },
];

const relatedPages = [
  {
    href: "/ai-content-workflows",
    title: "Create Content with Automate Work with AI",
    desc: "See how social media execution connects with broader AI content systems for planning, creation, structuring, and repeatable publishing.",
  },
  {
    href: "/ai-content-planning-workflows",
    title: "Create Content with AI Planning Workflows",
    desc: "Understand how strong planning systems support better topic mapping, publishing structure, and long-term content consistency.",
  },
  {
    href: "/ai-marketing-workflows",
    title: "Market with Automate Work with AI",
    desc: "Explore how social content systems connect with campaign execution, audience communication, and marketing performance goals.",
  },
  {
    href: "/ai-ad-creative-workflows",
    title: "AI Ad Creative Workflows",
    desc: "See how organic social content and structured ad creative workflows connect through hooks, angles, messaging, and creative formats.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support content planning, captioning, creative support, repurposing, and structured social media execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how social media workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI social media workflow?",
    a: "An AI social media workflow is a structured process that uses AI across planning, topic generation, captions, scripts, creative direction, repurposing, and repeatable publishing execution.",
  },
  {
    q: "Why are AI social media workflows important?",
    a: "They are important because they help individuals and teams move from random posting to a more structured, consistent, and practical content system.",
  },
  {
    q: "Can beginners use AI social media workflows?",
    a: "Yes. Beginners can start with simple workflows for content pillars, weekly planning, captions, and basic post structure before using more advanced systems.",
  },
  {
    q: "Are AI social media workflows only for creators?",
    a: "No. Founders, marketers, agencies, freelancers, small businesses, personal brands, and content teams can all use structured AI social media workflows.",
  },
  {
    q: "What is the difference between social media tools and social media workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical content planning and execution.",
  },
  {
    q: "Can AI social media workflows help with consistency?",
    a: "Yes. A strong workflow supports planning, batching, repurposing, topic reuse, caption structure, and more reliable content output over time.",
  },
  {
    q: "What is the biggest mistake people make with AI social content?",
    a: "A common mistake is generating many random post ideas without building a proper system for audience fit, platform context, content pillars, and structured execution.",
  },
  {
    q: "Where should someone start with AI social media workflows?",
    a: "A good starting point is a simple system: define the audience, choose 3 to 5 content pillars, build a weekly topic plan, create post formats, then review and improve what works.",
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

export default function AiSocialMediaWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI social media workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI social media workflows help people move from inconsistent posting to a structured system for content planning,
              captions, formats, creative direction, repurposing, and repeatable publishing. Instead of relying on disconnected content actions,
              a workflow creates a more practical process that improves consistency, speed, and long-term execution quality.
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
            title="What AI social media workflows actually mean"
            desc="A workflow-based social media approach makes AI useful because content decisions sit inside a practical sequence instead of becoming random post generation."
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
            title="Core stages inside an AI social media workflow"
            desc="A practical social media system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI social media workflows are commonly used"
            desc="These workflows are relevant wherever social content needs to be planned, created, improved, and repeated in a structured way."
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
            desc="These pages connect AI social media workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI social media workflows."
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
