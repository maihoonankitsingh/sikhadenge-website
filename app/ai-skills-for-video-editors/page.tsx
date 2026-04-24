import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Captions,
  Clapperboard,
  Film,
  Lightbulb,
  Mic2,
  Scissors,
  Sparkles,
  Subtitles,
  Users,
  Video,
  Workflow,
  Wand2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Video Editors | Sikhadenge",
  description:
    "Explore the best AI skills for video editors across scripting, clipping, subtitles, audio cleanup, short-form workflows, and practical video execution. A useful guide for editors, creators, freelancers, and digital learners.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-video-editors",
  },
  openGraph: {
    title: "Best AI Skills for Video Editors | Sikhadenge",
    description:
      "A practical guide to the best AI skills for video editors across scripting, clipping, subtitles, audio cleanup, and workflow execution.",
    url: "https://sikhadenge.in/ai-skills-for-video-editors",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Video Editors | Sikhadenge",
    description:
      "A practical guide to the best AI skills for video editors across scripting, clipping, subtitles, audio cleanup, and workflow execution.",
  },
};

const quickInfo = [
  {
    title: "Editing relevance",
    desc: "Modern video editors benefit when they can use AI across scripting, cuts, subtitles, audio, and short-form workflows.",
  },
  {
    title: "Faster execution",
    desc: "The right AI skills help editors reduce repetitive work and improve speed across rough cuts and production support.",
  },
  {
    title: "Practical value",
    desc: "Useful AI skills improve workflow quality and delivery consistency more than random effects or unstructured tools.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Video demand keeps increasing",
    desc: "Brands, creators, educators, and businesses all need more reels, shorts, explainers, promos, and content assets than before.",
  },
  {
    icon: Workflow,
    title: "Manual editing takes too much time",
    desc: "Without better systems, cutting, captioning, cleanup, and repurposing become repetitive and difficult to scale.",
  },
  {
    icon: Bot,
    title: "AI can support edit workflows",
    desc: "Practical AI skills help editors improve scripting, clipping, subtitles, audio support, and structured production workflows.",
  },
  {
    icon: Briefcase,
    title: "Editors need broader execution capability",
    desc: "Freelancers, creators, and digital operators benefit when editing work becomes faster, clearer, and more repeatable.",
  },
];

const skillCategories = [
  {
    icon: Lightbulb,
    title: "Script & Planning Skills",
    desc: "Video editors should learn how AI supports hooks, outline thinking, scene ideas, speaking points, and structured edit planning.",
  },
  {
    icon: Scissors,
    title: "Clipping & Edit Support Skills",
    desc: "Useful skills include using AI for rough cuts, highlight extraction, short-form clipping, and edit acceleration support.",
  },
  {
    icon: Subtitles,
    title: "Subtitle & Caption Skills",
    desc: "A practical AI skill is learning how to support captions, subtitle flow, readability, and text-based video clarity.",
  },
  {
    icon: Mic2,
    title: "Audio Support Skills",
    desc: "Editors benefit when they can use AI for voice cleanup, dubbing support, basic enhancement, and audio workflow improvements.",
  },
  {
    icon: Wand2,
    title: "Enhancement Skills",
    desc: "Strong editor skills include learning how to support cleanup, polish, refinements, and output presentation quality using AI.",
  },
  {
    icon: Workflow,
    title: "Workflow System Skills",
    desc: "Editors should learn how AI fits into repeatable systems like plan, cut, subtitle, refine, repurpose, and publish workflows.",
  },
];

const useCases = [
  {
    icon: Film,
    title: "Freelance Editors",
    desc: "Freelance editors can use AI skills to speed up delivery, handle more formats, and improve structured client execution.",
  },
  {
    icon: Clapperboard,
    title: "Content Creators",
    desc: "Creators editing their own videos can use AI skills for reels, shorts, subtitles, script flow, and faster publishing support.",
  },
  {
    icon: Video,
    title: "Short-Form Operators",
    desc: "Short-form editors can use AI skills for clipping, captions, pacing support, and repurposing multiple formats efficiently.",
  },
  {
    icon: Users,
    title: "Digital Teams",
    desc: "Teams handling content production can use AI skills to improve output speed, consistency, and workflow clarity.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect video editing with practical digital execution.",
  },
  {
    href: "/ai-tools-for-video-editing",
    title: "AI Tools for Video Editing",
    desc: "See which AI tools support scripting, clipping, subtitles, audio support, and faster video production workflows.",
  },
  {
    href: "/ai-skills-for-content-creators",
    title: "AI Skills for Content Creators",
    desc: "Review the broader creator-focused AI skill path across scripts, visuals, videos, and publishing systems.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Understand the wider AI skill categories that matter for modern editors and practical digital output.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how video-focused AI skills fit into a broader AI Expert capability model.",
  },
  {
    href: "/courses",
    title: "Courses",
    desc: "Explore the Sikhadenge learning path for structured AI-first video and digital capability building.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for video editors?",
    a: "Useful AI skills for video editors include script support, clipping support, subtitle workflows, audio cleanup support, enhancement support, and repeatable edit workflow systems.",
  },
  {
    q: "Can AI skills help video editors work faster?",
    a: "Yes. AI skills can reduce repetitive effort in clipping, subtitles, rough cuts, voice cleanup, and repurposing, which improves editing speed.",
  },
  {
    q: "Do video editors need coding to learn AI skills?",
    a: "No. Many practical AI skills for video editors do not require coding. A strong starting point is scripts, captions, clipping, audio support, and workflow systems.",
  },
  {
    q: "Are AI tools and AI skills the same for editors?",
    a: "No. AI tools are the software or platforms. AI skills are the practical abilities to use those tools effectively for real editing workflows and useful video output.",
  },
  {
    q: "Can beginner editors learn AI skills from zero?",
    a: "Yes. Beginners can start with simple script support, subtitles, clipping workflows, and edit organization before moving into advanced production systems.",
  },
  {
    q: "What is the biggest mistake video editors make with AI?",
    a: "A common mistake is depending on generated shortcuts without understanding pacing, story flow, audience format, or refinement needs in the final video.",
  },
  {
    q: "Can AI skills help with reels, shorts, captions, and talking-head edits?",
    a: "Yes. AI can support hooks, script structure, captions, clip extraction, audio cleanup, and short-form workflow execution across these formats.",
  },
  {
    q: "Where should video editors start learning AI properly?",
    a: "A structured learning path is the best starting point. Begin with scripting, clipping, subtitles, and repeatable editing workflows instead of random tool use.",
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

export default function AiSkillsForVideoEditorsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Video Editing AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for video editors
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Video editors do not need random AI shortcuts to stay relevant. They need practical AI skills that
              improve scripting, clipping, subtitles, audio support, short-form workflows, and repeatable edit
              systems. A strong editor path starts with useful skills that make delivery faster while keeping
              quality and control in the editing process.
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
            title="Why AI skills matter for video editors"
            desc="Modern editing work needs faster turnaround, more formats, and better production support. Practical AI skills help editors improve speed, structure, and repeatable output quality."
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
            title="Main AI skill categories for video editors"
            desc="A strong editor AI path should focus on practical skill areas that improve planning, cuts, subtitles, audio support, and workflow execution."
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
            title="Who can benefit from video-focused AI skills"
            desc="Video-focused AI skills are useful across multiple audience types when the learning path stays practical and execution-oriented."
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
            desc="These pages connect video-focused AI learning with the broader Sikhadenge topic cluster around skills, tools, creators, and AI-first digital capability."
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
            desc="These are the common questions people ask before starting AI skills for video editing work."
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
