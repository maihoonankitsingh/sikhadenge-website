import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lightbulb, PenTool, Sparkles, Video, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Content with AI Creation for Beginners in 2026 | Sikhadenge",
  description:
    "Learn AI content creation for beginners in 2026. Understand tools, workflows, content types, and how to create captions, reels, blogs, and visuals using AI step by step.",
  alternates: {
    canonical: "https://sikhadenge.in/blog/ai-content-creation-for-beginners",
  },
};

const contentTypes = [
  "Short-form content like reels, shorts, and hook-based videos",
  "Social media posts including captions, carousels, and creatives",
  "Blog content, scripts, and long-form structured writing",
  "Visual content like thumbnails, banners, and simple designs",
  "Content repurposing across multiple platforms",
  "Basic marketing content such as offers and communication posts",
];

const tools = [
  "ChatGPT for captions, scripts, ideas, and structured content writing",
  "Canva AI for social media creatives, thumbnails, and carousel visuals",
  "CapCut AI for editing reels, adding captions, and formatting videos",
  "Claude for long-form writing, clarity, and structured drafts",
  "Notion AI for planning, content calendars, and workflow organization",
];

const steps = [
  "Start with content idea and target audience clarity",
  "Use AI to generate first draft (caption, script, or outline)",
  "Refine content manually for tone, clarity, and intent",
  "Create visuals or video using AI-supported tools",
  "Publish consistently and improve based on feedback",
];

const mistakes = [
  "Copy-pasting AI content without editing",
  "Using too many tools without understanding workflow",
  "Ignoring audience and focusing only on output quantity",
  "Not practicing real content creation regularly",
];

const relatedLinks = [
  { href: "/ai-content-workflows", label: "Create Content with Automate Work with AI" },
  { href: "/ai-tools-for-content-creation", label: "AI Tools for Content Creation" },
  { href: "/ai-tools-for-social-media-content", label: "AI Tools for Social Media" },
  { href: "/ai-skills-for-creators", label: "AI Skills for Creators" },
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-skills", label: "AI Skills" },
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
          <Pill>Beginner Guide</Pill>

          <div className="mt-8 max-w-4xl">
            <h1 className="text-[38px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[58px]">
              Create Content with AI Creation for Beginners in 2026
            </h1>

            <p className="mt-6 max-w-3xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              AI content creation allows beginners to create captions, reels, blogs, visuals, and marketing content
              faster. The goal is not just to use AI tools, but to build a clear workflow that combines ideas, writing,
              visuals, and execution.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-content-workflows"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore Content Workflows
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: PenTool,
                title: "Content creation made easier",
                desc: "AI helps generate captions, scripts, and content ideas quickly.",
              },
              {
                icon: Video,
                title: "Faster video content",
                desc: "Reels and short videos can be created with AI-assisted editing tools.",
              },
              {
                icon: Workflow,
                title: "Workflow-based approach",
                desc: "The best results come from combining writing, visuals, and execution.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-[#D8E5F4] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[18px] border border-[#CFE0F6] bg-[#EAF2FE]">
                    <Icon className="h-6 w-6 text-[#2563EB]" />
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
            title="Types of content you can create using AI"
            desc="AI supports multiple content formats used across platforms."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {contentTypes.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-[#FBFDFF] p-6"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 text-[#2563EB]" />
                  <p className="text-[16px]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Best AI tools for beginners"
            desc="These tools are commonly used in content workflows."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {tools.map((tool) => (
              <div key={tool} className="rounded-[24px] border border-[#D8E5F4] bg-white p-6">
                <div className="flex gap-3">
                  <Lightbulb className="h-5 w-5 text-[#2563EB]" />
                  <p>{tool}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Step-by-step beginner workflow"
            desc="Follow a simple process to start creating content."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {steps.map((step, i) => (
              <div key={step} className="rounded-[24px] border border-[#D8E5F4] p-6">
                <div className="text-sm text-[#2563EB] font-semibold">Step {i + 1}</div>
                <p className="mt-2">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle title="Mistakes to avoid" />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {mistakes.map((item) => (
              <div key={item} className="rounded-[24px] border border-[#D8E5F4] p-6">
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle title="Explore connected AI pages" />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {relatedLinks.map((item) => (
              <Link key={item.href} href={item.href} className="flex justify-between border p-4 rounded-xl">
                {item.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E3EBF7] bg-white text-center py-16">
        <h2 className="text-2xl font-semibold">Start Learning AI with Sikhadenge</h2>
        <p className="mt-4 text-[#47607F]">
          Learn practical AI content creation, design, and video workflows step by step.
        </p>
        <Link href="/gen-ai-masterclass" className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-full">
          Join Free Masterclass
        </Link>
      </section>
    </main>
  );
}
