import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Clapperboard,
  Film,
  GraduationCap,
  Mic2,
  Scissors,
  Sparkles,
  Subtitles,
  TimerReset,
  Users,
  Video,
  Wand2,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Tools for Video Editing | Sikhadenge",
  description:
    "Explore the best AI tools for video editing across scripting, clipping, subtitles, voice support, scene enhancement, and workflow acceleration. A practical guide for creators, freelancers, students, and digital editors.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-tools-for-video-editing",
  },
  openGraph: {
    title: "Best AI Tools for Video Editing | Sikhadenge",
    description:
      "A practical guide to the best AI tools for video editing across scripting, clipping, subtitles, voice support, and workflow acceleration.",
    url: "https://sikhadenge.in/ai-tools-for-video-editing",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Tools for Video Editing | Sikhadenge",
    description:
      "A practical guide to the best AI tools for video editing across scripting, clipping, subtitles, voice support, and workflow acceleration.",
  },
};

const quickInfo = [
  {
    title: "Editing speed",
    desc: "AI tools can reduce repetitive video tasks like cutting, captioning, cleanup, and rough structuring.",
  },
  {
    title: "Workflow support",
    desc: "The right tool mix helps with scripting, clipping, subtitles, audio support, and short-form execution.",
  },
  {
    title: "Practical value",
    desc: "Useful video tools improve output quality and editing flow instead of only creating random effects.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Video demand is increasing",
    desc: "Modern creators, brands, and teams need more reels, explainers, shorts, promos, and content assets than before.",
  },
  {
    icon: Workflow,
    title: "Manual editing takes time",
    desc: "Without the right systems, video work becomes slow, repetitive, and difficult to scale across formats.",
  },
  {
    icon: Bot,
    title: "AI can support execution",
    desc: "AI tools can help with clipping, subtitles, script support, enhancement tasks, and faster production workflows.",
  },
  {
    icon: Briefcase,
    title: "Video skill is highly relevant",
    desc: "Students, freelancers, creators, and digital teams all benefit when they can produce video assets faster and better.",
  },
];

const toolCategories = [
  {
    icon: Clapperboard,
    title: "Script & Planning Tools",
    desc: "Tools that help with hooks, scenes, script outlines, speaking points, and rough creative planning for videos.",
  },
  {
    icon: Scissors,
    title: "Clipping & Editing Tools",
    desc: "Tools that support trimming, short-form extraction, highlight cuts, rough assembly, and edit acceleration.",
  },
  {
    icon: Subtitles,
    title: "Subtitle & Caption Tools",
    desc: "Tools that generate captions, subtitles, transcription support, and text overlays for content videos.",
  },
  {
    icon: Mic2,
    title: "Voice & Audio Tools",
    desc: "Tools that support voice cleanup, dubbing, audio enhancement, narration support, and speech-based workflows.",
  },
  {
    icon: Wand2,
    title: "Enhancement Tools",
    desc: "Tools that help with cleanup, visual polishing, background support, scene refinement, and presentation quality.",
  },
  {
    icon: Workflow,
    title: "Video Workflow Tools",
    desc: "Tools that support storage, project flow, review cycles, repurposing systems, and content pipeline execution.",
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Students can use AI tools to create better presentation videos, project explainers, and practice editing faster.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can improve delivery speed, edit more efficiently, and handle short-form content work better.",
  },
  {
    icon: Users,
    title: "Creators",
    desc: "Creators can use AI tools for reels, talking videos, shorts, captions, repurposing, and content consistency.",
  },
  {
    icon: Film,
    title: "Video Operators",
    desc: "Editors and digital operators can use AI to improve production speed, video quality, and workflow management.",
  },
];

const relatedPaths = [
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "Explore the broader AI tools ecosystem across content, design, video, automation, and digital execution.",
  },
  {
    href: "/ai-skills-for-creators",
    title: "AI Skills for Creators",
    desc: "See how creators use AI across content systems, visual assets, video output, and practical digital workflows.",
  },
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Understand the broader AI skills that connect video tools with real output and structured execution workflows.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Review the AI skill categories that matter most for modern video work and digital execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how video-focused AI tools fit inside a broader AI Expert capability system.",
  },
  {
    href: "/courses",
    title: "Courses",
    desc: "Explore the Sikhadenge learning path that combines AI video with broader AI-first digital capability.",
  },
];

const faqs = [
  {
    q: "What are AI tools for video editing?",
    a: "AI tools for video editing are tools that support scripting, clipping, subtitles, voice cleanup, scene enhancement, repurposing, and faster editing workflows for different video formats.",
  },
  {
    q: "Can AI tools help with short-form videos?",
    a: "Yes. Many AI tools are especially useful for short-form content like reels, shorts, social videos, clips, and repurposed talking-head content.",
  },
  {
    q: "Are AI tools enough to become a strong video editor?",
    a: "No. AI tools can speed up execution, but strong video editing still needs storytelling sense, pacing, audience understanding, editing judgment, and output control.",
  },
  {
    q: "Which AI tools are useful for video editing?",
    a: "Useful tools depend on the workflow, but the main categories include script tools, clipping tools, subtitle tools, audio tools, enhancement tools, and workflow tools.",
  },
  {
    q: "Who should learn AI tools for video editing?",
    a: "Students, freelancers, creators, editors, marketers, and digital operators can all benefit from AI tools when they want faster and more structured video production.",
  },
  {
    q: "Can beginners start using AI tools for video editing?",
    a: "Yes. Beginners can start with script support, subtitles, clipping, and simple enhancement tasks before moving into more advanced video workflows.",
  },
  {
    q: "What is the difference between video tools and video skills?",
    a: "Video tools are platforms or software. Video skills are the practical abilities to use those tools effectively for planning, editing, pacing, finishing, and publishing useful videos.",
  },
  {
    q: "Where should I start learning AI tools for video editing properly?",
    a: "A structured learning path is the best starting point. Begin with planning, clipping, subtitle workflows, and practical content use cases instead of random tool experimentation.",
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

export default function AiToolsForVideoEditingPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Edit Videos with AI Tools Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI tools for video editing
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI tools for video editing can support script planning, clipping, subtitles, voice enhancement,
              rough-cut workflows, and repurposing systems. The best tools are not only effect generators. They
              are production support systems that help creators and teams make video work faster, cleaner, and
              more practical across reels, shorts, explainers, and digital content formats.
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
            title="Why AI tools matter for video editing"
            desc="Modern video work often needs faster production, more platform-ready outputs, and repeatable workflows. AI tools can support editors and creators by improving speed, structure, and output consistency."
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
            title="Main AI tool categories for video work"
            desc="The strongest video workflows usually combine multiple types of AI tools instead of depending on only one editing shortcut."
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
            desc="Video-focused AI tools are useful across multiple audiences when applied inside a clear content and editing workflow."
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
            desc="These pages connect video-focused AI tools with the broader Sikhadenge topic cluster around skills, creators, tools, and AI-first digital execution."
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
            desc="These are the common questions people ask before choosing AI tools for video editing and content production workflows."
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
