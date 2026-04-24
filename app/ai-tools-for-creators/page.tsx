import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Camera,
  Clapperboard,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Lightbulb,
  Megaphone,
  Mic2,
  Sparkles,
  Users,
  Video,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Tools for Creators | Sikhadenge",
  description:
    "Explore the best AI tools for creators across content ideation, scripting, thumbnails, visuals, short-form video, voice support, and workflow systems. A practical guide for modern creators, freelancers, and digital storytellers.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-tools-for-creators",
  },
  openGraph: {
    title: "Best AI Tools for Creators | Sikhadenge",
    description:
      "A practical guide to the best AI tools for creators across content ideation, scripting, visuals, short-form video, voice support, and workflow systems.",
    url: "https://sikhadenge.in/ai-tools-for-creators",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Tools for Creators | Sikhadenge",
    description:
      "A practical guide to the best AI tools for creators across content ideation, scripting, visuals, short-form video, voice support, and workflow systems.",
  },
};

const quickInfo = [
  {
    title: "Creation speed",
    desc: "AI tools can help creators move faster from idea to script, visual, edit, and publish-ready output.",
  },
  {
    title: "Creative support",
    desc: "The right tool mix helps with content planning, visuals, voice, editing, and repeatable creator workflows.",
  },
  {
    title: "Practical value",
    desc: "Useful creator tools improve clarity, consistency, and publishing flow instead of only generating random content.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Creators need more output",
    desc: "Modern creators often need more posts, reels, scripts, visuals, hooks, thumbnails, and content systems across multiple platforms.",
  },
  {
    icon: Workflow,
    title: "Manual creation is slow",
    desc: "Without the right systems, ideation, scripting, editing, and repurposing become repetitive and hard to scale consistently.",
  },
  {
    icon: Bot,
    title: "AI can support creator flow",
    desc: "AI tools can help creators with planning, writing, visuals, voice, video support, and workflow organization.",
  },
  {
    icon: Briefcase,
    title: "Creator skill is now digital business skill",
    desc: "Creators, freelancers, coaches, educators, and personal brand builders all benefit when content production becomes more structured.",
  },
];

const toolCategories = [
  {
    icon: Lightbulb,
    title: "Ideation Tools",
    desc: "Tools that help creators generate topics, hooks, content pillars, post angles, series ideas, and audience-focused directions.",
  },
  {
    icon: FileText,
    title: "Script & Writing Tools",
    desc: "Tools that support captions, post drafts, reel scripts, carousel writing, speaking points, and structured content systems.",
  },
  {
    icon: ImageIcon,
    title: "Visual & Thumbnail Tools",
    desc: "Tools that help with thumbnails, creative directions, visual drafts, social media creatives, and brand-consistent outputs.",
  },
  {
    icon: Video,
    title: "Video Support Tools",
    desc: "Tools that support clipping, short-form planning, subtitles, rough edits, repurposing, and video workflow acceleration.",
  },
  {
    icon: Mic2,
    title: "Voice & Audio Tools",
    desc: "Tools that help with dubbing, narration support, voice cleanup, audio clarity, and spoken-content workflows.",
  },
  {
    icon: Workflow,
    title: "Creator Workflow Tools",
    desc: "Tools that support content calendars, production systems, review flows, prompt systems, and repeatable publishing structures.",
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Beginner Creators",
    desc: "New creators can use AI tools to learn content systems, idea generation, and faster output creation with better structure.",
  },
  {
    icon: Camera,
    title: "Social Media Creators",
    desc: "Creators can use AI tools for hooks, captions, thumbnails, shorts, reels, and platform-ready creative workflows.",
  },
  {
    icon: Clapperboard,
    title: "Video Creators",
    desc: "Video-focused creators can use AI tools for scripts, edits, subtitles, narration, and faster content repurposing.",
  },
  {
    icon: Megaphone,
    title: "Personal Brand Builders",
    desc: "Coaches, educators, consultants, and solo brands can use AI tools to build clearer and more consistent content systems.",
  },
];

const relatedPaths = [
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "Explore the broader AI tools ecosystem across design, content, video, automation, and digital execution.",
  },
  {
    href: "/ai-skills-for-creators",
    title: "AI Skills for Creators",
    desc: "See which AI skills matter most for creators who want better content systems, visuals, videos, and modern execution capability.",
  },
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Understand the broader AI skill categories that connect creator tools with practical output and real digital work.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Review the AI skill categories that matter most for creators, beginners, and practical digital learners.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how creator-focused AI tools fit inside a broader AI Expert capability system.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how AI-first creator workflows are taught in practice.",
  },
];

const faqs = [
  {
    q: "What are AI tools for creators?",
    a: "AI tools for creators are tools that support ideation, writing, scripting, visuals, thumbnails, short-form video, voice support, and workflow organization for modern content creation.",
  },
  {
    q: "Can AI tools help creators make content faster?",
    a: "Yes. AI tools can help with hooks, captions, scripts, visuals, subtitles, repurposing, and content planning, which makes creation faster and more structured.",
  },
  {
    q: "Are AI tools enough to become a strong creator?",
    a: "No. AI tools can support output speed and consistency, but strong creator growth still needs audience understanding, originality, editing judgment, and communication clarity.",
  },
  {
    q: "Which AI tools are useful for creators?",
    a: "Useful tools depend on the content format, but the main categories include ideation tools, script tools, visual tools, video tools, voice tools, and workflow tools.",
  },
  {
    q: "Who should learn AI tools for content creation and creator work?",
    a: "Beginner creators, video creators, social media creators, educators, coaches, consultants, freelancers, and personal brand builders can all benefit from creator-focused AI tools.",
  },
  {
    q: "Can beginners start using AI tools as creators?",
    a: "Yes. Beginners can start with hooks, captions, simple scripts, idea systems, thumbnails, and short-form support before moving into advanced workflows.",
  },
  {
    q: "What is the difference between creator tools and creator skills?",
    a: "Creator tools are software or platforms. Creator skills are the practical abilities to use those tools effectively for planning, creating, editing, and publishing useful content.",
  },
  {
    q: "Where should creators start learning AI tools properly?",
    a: "A structured learning path is the best starting point. Begin with ideation, writing, basic visuals, and repeatable creator workflows instead of random tool experimentation.",
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

export default function AiToolsForCreatorsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>AI Creator Tools Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI tools for creators
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI tools for creators can support ideation, scripts, captions, visuals, thumbnails, short-form
              video, voice workflows, and repeatable content systems. The best creator tools are not only content
              generators. They are practical support systems that help creators produce more consistent, clearer,
              and faster output across modern digital platforms.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-tools"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Tools
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
            title="Why AI tools matter for creators"
            desc="Modern creator work needs speed, consistency, platform flexibility, and stronger content systems. AI tools can support creators by improving structure, output speed, and workflow clarity."
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
            pill="Tool categories"
            title="Main AI tool categories for creators"
            desc="The strongest creator workflows usually combine multiple AI tool categories instead of depending on only one shortcut."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {toolCategories.map((item) => {
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
            title="Who can use these tools effectively"
            desc="Creator-focused AI tools are useful across multiple audience types when they are applied inside a clear content workflow."
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
            desc="These pages connect creator-focused AI tools with the broader Sikhadenge topic cluster around skills, tools, learners, and AI-first digital execution."
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
            desc="These are the common questions people ask before choosing AI tools for content creation, creator workflows, and modern publishing systems."
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
