export const dynamic = "force-dynamic";
export const revalidate = 0;
import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://sikhadenge.in";
const SLUG = "/ai-tools/ai-video-editing-tools";

export const metadata: Metadata = {
  title: "Edit Videos with AI Editing Tools",
  description:
    "Where AI helps in editing: captions, cut suggestions, noise cleanup, color help, and export assistance. Practical use-cases and limits.",
  alternates: { canonical: SLUG },
  openGraph: {
    type: "article",
    url: SITE + SLUG,
    siteName: "Sikhadenge",
    title: "Edit Videos with AI Editing Tools",
    description:
      "Where AI helps in editing: captions, cut suggestions, noise cleanup, and export assistance.",
  
    images: [{ url: "/images/og/og-home.png", width: 1200, height: 630, alt: "Sikhadenge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edit Videos with AI Editing Tools",
    description:
      "Where AI helps in editing: captions, cut suggestions, noise cleanup, and export assistance.",
  
    images: ["/images/og/og-home.png"],
  },
};

export default function Page() {
  const sections = [
    { t: "Captions", d: "Auto captions + styling. Always review names, technical terms, and timing." },
    { t: "Cut suggestions", d: "Jump-cut detection and silence removal. Works best for talking-head content." },
    { t: "Noise cleanup", d: "AI noise reduction can help, but bad mic placement still sounds bad." },
    { t: "B-roll planning", d: "Use AI to generate b-roll lists from your script (then choose real footage)." },
    { t: "Export help", d: "AI can suggest export presets but you must match platform specs and bitrate needs." },
  ];

  const faq = [
    { q: "Does AI editing mean one-click professional edits?", a: "No. AI speeds up small tasks, but pacing, story, and audio decisions still need human judgment." },
    { q: "What should beginners focus on first?", a: "Timeline basics, pacing, captions, audio cleanup, and export settings. Then add AI utilities for speed." },
    { q: "Do you teach Premiere Pro and real workflow?", a: "Yes. Video Editing course focuses on practical output and industry workflow." },
  ];

  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
   <div className="border border-white/10 rounded-3xl bg-[#111827] p-6 md:p-10">
          <div className="text-xs text-[#9CA3AF] tracking-wide">AI Tools</div>
          <h1 className="mt-2 text-2xl md:text-4xl font-semibold leading-tight">
            Edit Videos with AI Editing Tools
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#B0B7C3] leading-relaxed">
            Practical use-cases: captions, cut suggestions, noise cleanup, b-roll planning, export assistance.
          </p>

          <div className="mt-7 space-y-3">
            {sections.map((x) => (
              <div key={x.t} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold text-white">{x.t}</div>
                <div className="mt-2 text-sm text-[#B0B7C3] leading-relaxed">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/courses/video-editing"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Video Editing course
            </Link>
            <Link
              href="/blog/premiere-pro-reels-editing-workflow"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-[#0B1220]/60 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5 transition"
              style={{ boxShadow: "0 0 18px rgba(245,179,1,0.25)" }}
            >
              Reels workflow post
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(37,99,235,0.55)] hover:bg-[#1D4ED8]"
            >
              Book counselling
            </Link>
          </div>
          {/* SD_AI_ARTICLE_SCHEMA_V1 */}
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Edit Videos with AI Editing Tools", "description": "Where AI helps in editing: captions, cut suggestions, noise cleanup, color help, and export assistance. Practical use-cases and limits.", "url": "https://sikhadenge.in/ai-tools/ai-video-editing-tools", "mainEntityOfPage": {"@type": "WebPage", "@id": "https://sikhadenge.in/ai-tools/ai-video-editing-tools"}, "author": {"@type": "Organization", "name": "Sikhadenge"}, "publisher": {"@type": "Organization", "name": "Sikhadenge", "url": "https://sikhadenge.in"}, "keywords": "ai video editing tools, auto captions, silence remover, noise reduction, editing workflow"}) }}
          />


          {/* SD_AIVIDEO_FAQ_SCHEMA_V1 */}
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faq.map((x) => ({
                  "@type": "Question",
                  name: x.q,
                  acceptedAnswer: { "@type": "Answer", text: x.a },
                })),
              }),
            }}
          />
        </div>
      </div>
    </main>
  );
}
