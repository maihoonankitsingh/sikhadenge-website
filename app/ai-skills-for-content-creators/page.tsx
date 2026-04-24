import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Camera,
  Clapperboard,
  FileText,
  Lightbulb,
  Megaphone,
  Mic2,
  PenTool,
  Sparkles,
  Users,
  Video,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Content Creators | Sikhadenge",
  description:
    "Explore the best AI skills for content creators across ideation, scripting, visuals, short-form videos, voice support, content systems, and workflow execution. A practical guide for modern creators, educators, and personal brands.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-content-creators",
  },
  openGraph: {
    title: "Best AI Skills for Content Creators | Sikhadenge",
    description:
      "A practical guide to the best AI skills for content creators across ideation, scripting, visuals, short-form videos, voice support, and workflow execution.",
    url: "https://sikhadenge.in/ai-skills-for-content-creators",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Content Creators | Sikhadenge",
    description:
      "A practical guide to the best AI skills for content creators across ideation, scripting, visuals, short-form videos, voice support, and workflow execution.",
  },
};

const quickInfo = [
  {
    title: "Creator relevance",
    desc: "Content creators now benefit when they can use AI across ideation, scripts, visuals, edits, and publishing systems.",
  },
  {
    title: "Output speed",
    desc: "The right AI skills help creators produce more consistent and more structured content faster.",
  },
  {
    title: "Practical value",
    desc: "Useful AI skills improve content quality and workflow clarity more than random tool experiments.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Creators need more output than before",
    desc: "Modern content creation often needs regular posting, stronger hooks, better visuals, short-form output, and platform-wise consistency.",
  },
  {
    icon: Workflow,
    title: "Manual creation is hard to scale",
    desc: "Without systems, ideation, scripting, editing, and repurposing take too much time and reduce content consistency.",
  },
  {
    icon: Bot,
    title: "AI can support creator workflows",
    desc: "AI skills help creators improve ideation, content structuring, video support, voice support, and repeatable publishing processes.",
  },
  {
    icon: Briefcase,
    title: "Creator work is now business work",
    desc: "Creators, coaches, educators, and solo brands benefit when content production becomes more structured and execution-focused.",
  },
];

const skillCategories = [
  {
    icon: Lightbulb,
    title: "Ideation Skills",
    desc: "Content creators should learn how to use AI for topic discovery, hooks, series ideas, pillar planning, and audience-focused content angles.",
  },
  {
    icon: FileText,
    title: "Script & Writing Skills",
    desc: "Useful skills include script drafting, post writing, caption support, speaking points, carousel text, and structured communication output.",
  },
  {
    icon: PenTool,
    title: "Visual Support Skills",
    desc: "Creators benefit when they can use AI to support thumbnails, poster directions, creative visuals, and basic design execution thinking.",
  },
  {
    icon: Video,
    title: "Short-Form Video Skills",
    desc: "A practical AI skill is learning how to support clips, reels, subtitles, edit flow, and short-form execution across modern platforms.",
  },
  {
    icon: Mic2,
    title: "Voice & Audio Skills",
    desc: "Creators can use AI for narration support, voice cleanup, dubbing assistance, speaking clarity support, and audio workflow improvement.",
  },
  {
    icon: Workflow,
    title: "Content System Skills",
    desc: "Strong creators learn how AI fits into repeatable workflows such as idea, script, draft, edit, repurpose, and publish systems.",
  },
];

const useCases = [
  {
    icon: Camera,
    title: "Social Media Creators",
    desc: "Creators on Instagram, YouTube, and short-form platforms can use AI skills to improve speed, clarity, and output consistency.",
  },
  {
    icon: Clapperboard,
    title: "Video Creators",
    desc: "Video-focused creators can use AI skills for script flow, edit support, subtitle logic, and faster content repurposing.",
  },
  {
    icon: Megaphone,
    title: "Personal Brands",
    desc: "Coaches, founders, and educators can use AI skills to improve message clarity and build more consistent brand communication.",
  },
  {
    icon: Users,
    title: "Modern Digital Creators",
    desc: "Anyone building content-based visibility can use practical AI skills to strengthen their digital execution system.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect creator work with practical digital execution.",
  },
  {
    href: "/ai-tools-for-creators",
    title: "AI Tools for Creators",
    desc: "See which AI tools help with ideas, scripts, visuals, short-form videos, and repeatable creator workflows.",
  },
  {
    href: "/ai-skills-for-creators",
    title: "AI Skills for Creators",
    desc: "Review the broader creator-focused AI skill path across content, visuals, videos, and digital output systems.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Understand the wider AI skill categories that matter for modern creators and practical digital growth.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how creator-focused AI skills fit into a broader AI Expert capability model.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how practical AI-first creator workflows are taught.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for content creators?",
    a: "Useful AI skills for content creators include ideation, scripting, writing support, visual support, short-form video support, voice support, and structured content workflow building.",
  },
  {
    q: "Can AI skills help creators make content faster?",
    a: "Yes. AI skills can reduce time spent on planning, writing, ideation, subtitles, content structure, and repurposing, which helps creators publish more consistently.",
  },
  {
    q: "Do creators need coding to learn AI skills?",
    a: "No. Many practical AI skills for content creators do not require coding. A strong starting point is ideation, writing, visuals, video support, and workflow systems.",
  },
  {
    q: "Are AI tools and AI skills the same for creators?",
    a: "No. AI tools are the software or platforms. AI skills are the practical abilities to use those tools effectively for real creator workflows and content output.",
  },
  {
    q: "Can beginner creators learn AI skills from zero?",
    a: "Yes. Beginner creators can start with hooks, script drafts, captions, simple visuals, and repeatable publishing workflows before moving into advanced systems.",
  },
  {
    q: "What is the biggest mistake creators make with AI?",
    a: "A common mistake is generating random content without a clear content angle, audience goal, platform format, or workflow for refining the output.",
  },
  {
    q: "Can AI skills help with reels, thumbnails, captions, and scripts?",
    a: "Yes. AI can support topic ideas, script structure, captions, thumbnails, short-form content planning, and overall creator workflow execution.",
  },
  {
    q: "Where should content creators start learning AI properly?",
    a: "A structured learning path is the best starting point. Begin with ideation, script support, visuals, and repeatable content workflows instead of random tool use.",
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

export default function AiSkillsForContentCreatorsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Content Creator AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for content creators
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Content creators do not need random AI experiments to grow. They need practical AI skills that
              improve ideation, scripting, visuals, video support, voice workflows, and repeatable content
              systems. A strong creator path starts with useful skills that help turn scattered creation into
              a more consistent and more structured output process.
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
            pill="Why this matters"
            title="Why AI skills matter for content creators"
            desc="Modern creator work needs more consistency, faster content systems, and stronger platform-wise execution. Practical AI skills help creators improve speed, structure, and output quality."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {whyItMatters.map((item) => {
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
            pill="Core skill categories"
            title="Main AI skill categories for content creators"
            desc="A strong creator AI path should focus on practical skill areas that improve ideas, content structure, visuals, videos, and repeatable execution."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {skillCategories.map((item) => {
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
            title="Who can benefit from creator-focused AI skills"
            desc="Creator-focused AI skills are useful across multiple audience types when the learning path stays practical and output-oriented."
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
            pill="Related learning paths"
            title="Explore connected AI learning pages"
            desc="These pages connect creator-focused AI learning with the broader Sikhadenge topic cluster around skills, tools, creators, and AI-first digital capability."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPaths.map((item) => (
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
            desc="These are the common questions people ask before starting AI skills for content creation."
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
