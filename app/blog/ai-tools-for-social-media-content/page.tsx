import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lightbulb, Megaphone, Sparkles, Workflow, Wand2 } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Tools for Social Media Content in 2026 | Sikhadenge",
  description:
    "Discover the best AI tools for social media content in 2026. Learn which tools help with captions, hooks, creatives, reels, content planning, and faster social media workflows.",
  alternates: {
    canonical: "https://sikhadenge.in/blog/ai-tools-for-social-media-content",
  },
};

const tools = [
  "ChatGPT for captions, hooks, post ideas, content drafts, and content angle generation",
  "Canva AI for social media creatives, carousel visuals, covers, and fast design support",
  "CapCut AI for reels editing, auto captions, short-form formatting, and quick edits",
  "Claude for long-form content structuring, cleaner drafts, and idea expansion",
  "Notion AI for content calendars, planning, post organization, and workflow management",
  "Gemini for research support, topic exploration, and social content direction",
];

const useCases = [
  "Instagram captions and post ideas",
  "Reels hooks, content scripts, and repurposing",
  "Carousel design and visual content planning",
  "Social media calendars and posting workflow setup",
  "Brand communication and offer messaging support",
  "Creator-side and business-side social media execution",
];

const mistakes = [
  "Posting AI-generated content without editing for brand tone",
  "Using too many tools without a content workflow",
  "Focusing on volume only and ignoring content quality",
  "Not aligning captions, creatives, and video hooks together",
];

const relatedLinks = [
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/ai-skills", label: "AI Skills" },
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-content-workflows", label: "Create Content with Automate Work with AI" },
  { href: "/ai-skills-for-creators", label: "AI Skills for Creators" },
  { href: "/ai-tools-for-content-creation", label: "AI Tools for Content Creation" },
  { href: "/site-map", label: "HTML Sitemap" },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#245EEA] shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
      {children}
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#071533] md:text-[36px]">
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 text-[17px] leading-[1.8] text-[#47607F]">{desc}</p>
      ) : null}
    </div>
  );
}

export default function Page() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Social Media AI Tools</Pill>

          <div className="mt-8 max-w-4xl">
            <h1 className="text-[38px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[58px]">
              AI Tools for Social Media Content in 2026
            </h1>

            <p className="mt-6 max-w-3xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              Social media content now needs speed, consistency, and strong platform-specific execution. AI tools help
              with captions, hooks, ideas, carousel concepts, short-form scripts, reel edits, and content planning.
              The strongest content systems do not rely on one tool alone. They connect writing, visuals, video, and
              workflow together.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-tools-for-content-creation"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore Content AI Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Megaphone,
                title: "Faster content production",
                desc: "AI tools help social media teams and creators publish more consistently with less manual effort.",
              },
              {
                icon: Workflow,
                title: "Better system thinking",
                desc: "The best results come when captions, creatives, reels, and planning work together in one workflow.",
              },
              {
                icon: Wand2,
                title: "Stronger execution support",
                desc: "AI can support ideation, visuals, scripts, and formatting across multiple social platforms.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-[#D8E5F4] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[18px] border border-[#CFE0F6] bg-[#EAF2FE]">
                    <Icon className="h-6 w-6 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-5 text-[20px] font-semibold text-[#071533]">{item.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.8] text-[#47607F]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Why AI tools matter for social media content"
            desc="Social media content is no longer just about posting regularly. It requires platform understanding, hook quality, visual relevance, clarity of message, and speed of execution."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            AI tools matter because they help reduce time spent on repetitive work such as idea generation, caption
            drafting, first-script creation, design exploration, and content calendar planning. This gives creators,
            freelancers, and small businesses more room to focus on strategy and output quality.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Best AI tools for social media content"
            desc="These tools support different stages of modern social media workflows."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {tools.map((tool) => (
              <div
                key={tool}
                className="rounded-[24px] border border-[#D8E5F4] bg-[#FBFDFF] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <p className="text-[16px] leading-[1.8] text-[#071533]">{tool}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="How these tools are used in real social media workflows"
            desc="The value of AI increases when it supports real platform-specific output."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {useCases.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Megaphone className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <p className="text-[16px] leading-[1.8] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="What makes a good AI-supported social media workflow"
            desc="The best workflow connects content idea, written message, visual format, and publishing rhythm."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            A good workflow usually starts with idea generation, then moves into hook writing, post or video structure,
            visual direction, editing, and scheduling. AI tools become useful when they support this flow instead of
            creating random disconnected outputs.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Mistakes to avoid"
            desc="These mistakes reduce content quality even when AI output is fast."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {mistakes.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <p className="text-[16px] leading-[1.8] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#071533] md:text-[36px]">
            The strongest long-term social content advantage
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            The strongest advantage comes from combining AI speed with content judgment, audience understanding, visual
            clarity, and consistent publishing systems. Tools can accelerate content, but strategy and refinement still
            decide growth.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Explore connected AI pages"
            desc="Use these pages to understand the larger content, workflow, and AI skills ecosystem."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-[22px] border border-[#D8E5F4] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition hover:border-[#BFD4F3] hover:bg-[#FBFDFF]"
              >
                <span className="text-[15px] font-semibold text-[#071533]">{item.label}</span>
                <ArrowRight className="h-4 w-4 text-[#2563EB] transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-[#D8E5F4] bg-[linear-gradient(180deg,#F8FBFF_0%,#FFFFFF_100%)] p-8 text-center shadow-[0_10px_28px_rgba(15,23,42,0.04)] md:p-10">
            <h2 className="text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#071533]">
              Learn Create Content with AI Skills with Sikhadenge
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[17px] leading-[1.85] text-[#47607F]">
              Sikhadenge helps learners build practical AI content, design, video, and workflow skills so they can
              create stronger digital output with more speed, clarity, and structure.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free AI Masterclass
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
