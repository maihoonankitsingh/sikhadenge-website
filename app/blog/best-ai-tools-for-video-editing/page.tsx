import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Video, Zap, Film, Sparkles, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Tools for Video Editing (2026 Guide) | Sikhadenge",
  description:
    "Discover the best AI tools for video editing in 2026. Learn how to create reels, YouTube videos, and client work faster using AI-powered workflows.",
  alternates: {
    canonical: "https://sikhadenge.in/blog/best-ai-tools-for-video-editing",
  },
};

const tools = [
  "Runway ML – AI video editing, background removal, and generative video features",
  "Pika Labs – AI video generation and creative motion content",
  "CapCut AI – Fast editing, auto captions, and short-form content workflows",
  "Adobe Premiere Pro (AI features) – Professional editing with AI assist tools",
  "Descript – AI-based video editing with text-based workflow",
  "HeyGen – AI avatar and talking video creation",
];

const useCases = [
  "Instagram reels and short-form content creation",
  "YouTube video editing and content production",
  "Client work for brands and businesses",
  "Ad creatives and promotional videos",
  "Educational and course content creation",
];

const mistakes = [
  "Using AI tools without understanding editing basics",
  "Overusing AI effects and reducing video quality",
  "Ignoring storytelling and structure",
  "Depending only on one tool instead of workflow",
];

const relatedLinks = [
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/ai-skills", label: "AI Skills" },
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-skills-for-creators", label: "AI Skills for Creators" },
  { href: "/ai-productivity-tools", label: "AI Productivity Tools" },
  { href: "/site-map", label: "HTML Sitemap" },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#245EEA]">
      {children}
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-[28px] font-semibold text-[#071533] md:text-[36px]">
        {title}
      </h2>
      {desc && <p className="mt-4 text-[17px] text-[#47607F]">{desc}</p>}
    </div>
  );
}

export default function Page() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7]">
        <div className="mx-auto max-w-[1080px] px-4 py-16">
          <Pill>Edit Videos with AI Tools</Pill>

          <h1 className="mt-6 text-[40px] font-semibold md:text-[56px]">
            Best AI Tools for Video Editing (2026 Guide)
          </h1>

          <p className="mt-6 max-w-3xl text-[18px] text-[#47607F]">
            AI has completely changed video editing workflows. Today, you can create reels,
            YouTube videos, and client projects faster using AI tools. The focus is not only on
            tools but how they are used together in a workflow.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href="/gen-ai-masterclass" className="bg-[#2563EB] text-white px-6 py-3 rounded-full">
              Join Free Masterclass
            </Link>
            <Link href="/ai-tools" className="border px-6 py-3 rounded-full">
              Explore AI Tools
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-16">
          <SectionTitle
            title="Why AI is important for video editing"
            desc="AI tools reduce manual effort and speed up editing. This allows creators and freelancers to deliver more content in less time."
          />

          <p className="mt-6 text-[#47607F] max-w-3xl">
            Earlier, video editing required advanced skills and long timelines. Now AI tools help
            with auto captions, background removal, voice sync, and even video generation. This
            creates new opportunities for beginners to enter the video editing space.
          </p>
        </div>
      </section>

      <section className="bg-white border-y">
        <div className="mx-auto max-w-[1080px] px-4 py-16">
          <SectionTitle
            title="Best AI video editing tools"
            desc="These tools are widely used in real workflows."
          />

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <div key={tool} className="p-6 border rounded-xl">
                <div className="flex gap-3">
                  <Sparkles className="text-blue-500" />
                  <p>{tool}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-16">
          <SectionTitle
            title="Where you can use these tools"
            desc="These tools are used across different types of video work."
          />

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {useCases.map((item) => (
              <div key={item} className="p-6 border rounded-xl">
                <div className="flex gap-3">
                  <Video className="text-blue-500" />
                  <p>{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y">
        <div className="mx-auto max-w-[1080px] px-4 py-16">
          <SectionTitle
            title="Mistakes to avoid"
            desc="Avoid these mistakes while using AI for video editing."
          />

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {mistakes.map((item) => (
              <div key={item} className="p-6 border rounded-xl">
                <div className="flex gap-3">
                  <Lightbulb className="text-blue-500" />
                  <p>{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-16">
          <SectionTitle
            title="Explore related AI pages"
          />

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {relatedLinks.map((item) => (
              <Link key={item.href} href={item.href} className="border p-4 rounded-xl flex justify-between">
                {item.label}
                <ArrowRight className="w-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-16 text-center">
          <h2 className="text-[30px] font-semibold">
            Learn Edit Videos with AI Skills with Sikhadenge
          </h2>

          <p className="mt-4 text-[#47607F] max-w-2xl mx-auto">
            Sikhadenge helps you learn practical AI video editing workflows used in real client work.
          </p>

          <div className="mt-8">
            <Link href="/gen-ai-masterclass" className="bg-[#2563EB] text-white px-6 py-3 rounded-full">
              Join Free AI Masterclass
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
