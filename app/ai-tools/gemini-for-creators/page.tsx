export const dynamic = "force-dynamic";
export const revalidate = 0;
import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://sikhadenge.in";
const SLUG = "/ai-tools/gemini-for-creators";

export const metadata: Metadata = {
  title: "Gemini for Creators",
  description:
    "A practical research-to-script workflow using Gemini: collect sources, outline, write drafts, and refine into publish-ready content.",
  alternates: { canonical: SLUG },
  openGraph: {
    type: "article",
    url: SITE + SLUG,
    siteName: "Sikhadenge",
    title: "Gemini for Creators",
    description:
      "A practical research-to-script workflow: collect sources, outline, write drafts, and refine.",
  
    images: [{ url: "/images/og/og-home.png", width: 1200, height: 630, alt: "Sikhadenge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gemini for Creators",
    description:
      "A practical research-to-script workflow: collect sources, outline, write drafts, and refine.",
  
    images: ["/images/og/og-home.png"],
  },
};

export default function Page() {
  const workflow = [
    { t: "1) Research pack", d: "Ask for 10 key points + counterpoints + examples. Save sources and claims." },
    { t: "2) Outline", d: "Convert the research into a clean outline (hook → points → examples → close)." },
    { t: "3) Draft", d: "Write a short draft, then request 2 alternative versions (shorter + punchier)." },
    { t: "4) Script polish", d: "Add timing, on-screen text, and b-roll suggestions." },
  ];

  const faq = [
    { q: "What is Gemini best for?", a: "Fast research, summarizing sources, building outlines, and converting information into draft scripts." },
    { q: "How do I avoid generic output?", a: "Give constraints: target audience, platform, length, tone, examples, and what to avoid." },
    { q: "Is this only for videos?", a: "No. The same workflow works for blogs, carousels, newsletters, and course notes." },
  ];

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Use Gemini for research-to-script workflow",
    description: "A practical workflow: research → outline → draft → polish.",
    step: workflow.map((x) => ({ "@type": "HowToStep", name: x.t, text: x.d })),
  };

  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="border border-white/10 rounded-3xl bg-[#111827] p-6 md:p-10">
          <div className="text-xs text-[#9CA3AF] tracking-wide">AI Tools</div>
          <h1 className="mt-2 text-2xl md:text-4xl font-semibold leading-tight">
            Gemini for Creators
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#B0B7C3] leading-relaxed">
            Use Gemini to turn research into publish-ready scripts: outline, draft, polish, and output planning.
          </p>

          <div className="mt-7 space-y-3">
            {workflow.map((x) => (
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
              href="/courses/ai-mastery"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-[#0B1220]/60 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5 transition"
              style={{ boxShadow: "0 0 18px rgba(245,179,1,0.25)" }}
            >
              AI Mastery module
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Gemini for Creators", "description": "A practical research-to-script workflow using Gemini: collect sources, outline, write drafts, and refine into publish-ready content.", "url": "https://sikhadenge.in/ai-tools/gemini-for-creators", "mainEntityOfPage": {"@type": "WebPage", "@id": "https://sikhadenge.in/ai-tools/gemini-for-creators"}, "author": {"@type": "Organization", "name": "Sikhadenge"}, "publisher": {"@type": "Organization", "name": "Sikhadenge", "url": "https://sikhadenge.in"}, "keywords": "gemini for creators, ai research workflow, script writing with ai, content outline, creator workflow"}) }}
          />


          {/* SD_GEMINI_FAQ_SCHEMA_V1 */}
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
          {/* SD_GEMINI_HOWTO_SCHEMA_V1 */}
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
          />
        </div>
      </div>
    </main>
  );
}
