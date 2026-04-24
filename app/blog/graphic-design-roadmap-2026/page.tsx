export const dynamic = "force-dynamic";
export const revalidate = 0;
import type { Metadata } from "next";
import Link from "next/link";
import FbqViewContent from "../../components/FbqViewContent";

const SITE = "https://sikhadenge.in";
const SLUG = "/blog/graphic-design-roadmap-2026";
const TITLE = "Graphic Design Roadmap (2026): skills, tools, and portfolio plan";
const DESC = "A practical roadmap to learn Graphic Design: tools, fundamentals, projects, and a portfolio plan you can follow.";
const DATE_PUBLISHED = "2026-01-10";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: SLUG },
  openGraph: {
    type: "article",
    url: SITE + SLUG,
    siteName: "Sikhadenge",
    title: TITLE,
    description: DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: TITLE,
    description: DESC,
    mainEntityOfPage: { "@type": "WebPage", "@id": SITE + SLUG },
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    author: { "@type": "Organization", name: "Sikhadenge" },
    publisher: { "@type": "Organization", name: "Sikhadenge" },
  };

  return (
    <>
      <FbqViewContent />
    <main className="min-h-screen bg-[#0B1220] text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="border border-white/10 rounded-3xl bg-[#111827] p-6 md:p-10">
          <div className="text-xs text-[#9CA3AF] tracking-wide">Blog</div>
          <h1 className="mt-2 text-2xl md:text-4xl font-semibold leading-tight">
            {TITLE}
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#B0B7C3] leading-relaxed">
            {DESC}
          </p>

          <div className="mt-6 space-y-5 text-sm md:text-base text-[#B0B7C3] leading-relaxed">
            <p>
              This guide is written for creators who want practical output: better designs, cleaner edits,
              or faster workflows. Use the checklist below and keep iterating.
            </p>

            <h2 className="text-white text-lg font-semibold">Checklist</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Define the output first (reel, poster, carousel, YouTube edit).</li>
              <li>Collect 3–5 references and write a short brief.</li>
              <li>Work in steps: draft → feedback → refine → export.</li>
              <li>Save presets/templates to repeat faster next time.</li>
            </ul>

            <h2 className="text-white text-lg font-semibold">Common mistakes</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Starting without a clear brief (causes random output).</li>
              <li>Too many effects/plugins before fundamentals are clean.</li>
              <li>Ignoring platform export settings (quality loss).</li>
            </ul>

            <h2 className="text-white text-lg font-semibold">Next step</h2>
            <p>
              If you want a structured, live online learning path with assignments and output tracking, use the links below.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/courses/graphic-design"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Graphic Design course
            </Link>
            <Link
              href="/ai-tools/chatgpt-for-designers"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-[#0B1220]/60 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5 transition"
              style={{ boxShadow: "0 0 18px rgba(245,179,1,0.25)" }}
            >
              ChatGPT for designers
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(37,99,235,0.55)] hover:bg-[#1D4ED8]"
            >
              Book counselling
            </Link>
          </div>

          <div className="mt-6 text-xs text-[#9CA3AF]">
            Updated: {DATE_PUBLISHED}
          </div>

          {/* SD_BLOGPOST_SCHEMA_V1 */}
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </div>
      </div>
    </main>
    </>
  );
}
