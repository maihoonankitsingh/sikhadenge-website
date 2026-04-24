import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Camera,
  FileText,
  FolderKanban,
  Lightbulb,
  Mic,
  RefreshCcw,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Creator Workflows | Sikhadenge",
  description:
    "Understand AI creator workflows in a practical way. Learn how structured AI-assisted systems help with idea planning, content creation, publishing flow, reuse, and repeatable creator execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-creator-workflows",
  },
  openGraph: {
    title: "AI Creator Workflows | Sikhadenge",
    description:
      "A practical guide to AI creator workflows across idea planning, content creation, publishing flow, reuse, and repeatable creator execution.",
    url: "https://sikhadenge.in/ai-creator-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Creator Workflows | Sikhadenge",
    description:
      "A practical guide to AI creator workflows across idea planning, content creation, publishing flow, reuse, and repeatable creator execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI creator workflows are structured systems that use AI support across idea generation, content planning, creation, publishing, and reuse.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, creator work becomes inconsistent and exhausting. A system improves clarity, speed, and repeatable output quality.",
  },
  {
    title: "Who benefits",
    desc: "Creators, personal brands, educators, freelancers, and content-focused operators all benefit from better AI-assisted creator workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than one content idea",
    desc: "AI creator workflows are not limited to generating one topic or one caption. They connect ideas, scripting, creation, reuse, publishing, and consistency into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI supports multiple creator stages",
    desc: "Useful workflows use AI across ideation, hooks, scripting, format planning, content repurposing, and publishing systems instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better creator execution",
    desc: "A strong workflow helps creators publish more clearly, more consistently, and with less friction across repeated content cycles.",
  },
  {
    icon: Briefcase,
    title: "This matters in real creator systems",
    desc: "Modern creator work often needs faster output, stronger consistency, better topic planning, and more usable workflows across multiple formats.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Idea & Topic Planning",
    desc: "Start with audience interest, content pillar, platform goal, and topic angle before creating the actual content.",
  },
  {
    icon: FileText,
    title: "Hook & Script Support",
    desc: "Use AI to support hooks, structure, talking points, captions, script flow, and clearer message delivery across creator formats.",
  },
  {
    icon: Camera,
    title: "Format & Content Creation",
    desc: "Plan whether the content becomes a reel, post, carousel, short video, thread, talking-head clip, or educational asset.",
  },
  {
    icon: Mic,
    title: "Publishing & Distribution Flow",
    desc: "Build systems for posting rhythm, platform adaptation, captions, CTA structure, and content rollout across channels.",
  },
  {
    icon: RefreshCcw,
    title: "Reuse & Improvement",
    desc: "Improve creator efficiency by repurposing strong content, fixing weak outputs, and refining the next batch using what worked.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Creator System",
    desc: "Organize topic banks, content batches, reusable hooks, publishing plans, and repeatable creator operating systems.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Content Creators",
    desc: "Creators can use AI creator workflows to stay consistent across reels, posts, scripts, ideas, and platform-ready content systems.",
  },
  {
    icon: Sparkles,
    title: "Personal Brands",
    desc: "Personal brands can use these workflows to improve topic consistency, content clarity, and long-term publishing structure.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can use workflow systems to build their own presence or support creator-style execution for clients.",
  },
  {
    icon: Workflow,
    title: "Educators & Coaches",
    desc: "Educators and coaches can use structured workflows to turn their knowledge into repeatable content and publishing systems.",
  },
];

const relatedPages = [
  {
    href: "/ai-social-media-workflows",
    title: "AI Social Media Workflows",
    desc: "See how creator execution connects with planning, adaptation, scheduling, and structured social media publishing systems.",
  },
  {
    href: "/ai-content-workflows",
    title: "Create Content with Automate Work with AI",
    desc: "Explore the broader content workflow layer for ideation, drafting, refinement, and structured content creation.",
  },
  {
    href: "/ai-content-repurposing-workflows",
    title: "Create Content with AI Repurposing Workflows",
    desc: "Understand how creators can turn one strong source into multiple usable content formats through repeatable reuse systems.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support scripting, idea generation, captions, publishing support, and creator workflow execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how creator workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how creator workflows connect with broader high-value AI skill development.",
  },
];

const faqs = [
  {
    q: "What is an AI creator workflow?",
    a: "An AI creator workflow is a structured process that uses AI across idea planning, scripting, content creation, publishing, reuse, and repeatable creator execution.",
  },
  {
    q: "Why are AI creator workflows important?",
    a: "They are important because they help creators move from random posting to more consistent, structured, and manageable content systems.",
  },
  {
    q: "Can beginners use AI creator workflows?",
    a: "Yes. Beginners can start with simple workflows for topic ideas, hooks, captions, and weekly publishing before moving into advanced creator systems.",
  },
  {
    q: "Are AI creator workflows only for influencers?",
    a: "No. Content creators, educators, personal brands, freelancers, coaches, and digital operators can all use structured AI creator workflows.",
  },
  {
    q: "What is the difference between creator tools and creator workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical creator execution.",
  },
  {
    q: "Can AI creator workflows help with consistency?",
    a: "Yes. A strong workflow can support idea planning, scripting, batching, publishing flow, and reuse systems that improve creator consistency.",
  },
  {
    q: "What is the biggest mistake people make with AI creator systems?",
    a: "A common mistake is generating random content ideas without building a proper system for topic planning, creation flow, publishing, and reuse.",
  },
  {
    q: "Where should someone start with AI creator workflows?",
    a: "A good starting point is a simple system: choose content pillars, plan topics, create hooks and scripts, publish consistently, then reuse strong content.",
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

export default function AiCreatorWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI creator workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI creator workflows help people move from random content creation to a structured system for idea planning,
              scripting, creation, publishing, and reuse. Instead of relying on disconnected content tasks, a workflow creates
              a repeatable process that improves consistency, speed, and practical creator execution.
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
            title="What AI creator workflows actually mean"
            desc="A workflow-based creator approach makes AI useful because every content task sits inside a practical sequence instead of becoming random content output."
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
            title="Core stages inside an AI creator workflow"
            desc="A practical creator system usually moves through a small number of repeatable stages that make content execution easier to manage and improve."
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
            title="Where AI creator workflows are commonly used"
            desc="These workflows are relevant wherever content needs to be planned, created, published, reused, and improved in a structured way."
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
            desc="These pages connect AI creator workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI creator workflows."
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
