export const dynamic = "force-dynamic";
export const revalidate = 0;
import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://sikhadenge.in";
const SLUG = "/ai-tools/chatgpt-for-designers";

export const metadata: Metadata = {
  title: "ChatGPT for Designers",
  description:
    "Prompt patterns for designers: better briefs, more variations, structured feedback, and faster iteration without losing quality.",
  alternates: { canonical: SLUG },
  openGraph: {
    type: "article",
    url: SITE + SLUG,
    siteName: "Sikhadenge",
    title: "ChatGPT for Designers",
    description:
      "Prompt patterns for designers: better briefs, more variations, structured feedback, and faster iteration.",
  
    images: [{ url: "/images/og/og-home.png", width: 1200, height: 630, alt: "Sikhadenge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT for Designers",
    description:
      "Prompt patterns for designers: better briefs, more variations, structured feedback, and faster iteration.",
  
    images: ["/images/og/og-home.png"],
  },
};

export default function Page() {
  const prompts = [
    {
      title: "1) Design Brief Prompt",
      text:
        "Act as a creative director. Ask 10 clarifying questions, then write a 1-page design brief with target audience, message, tone, constraints, and 3 layout directions.",
    },
    {
      title: "2) Variation Prompt",
      text:
        "Generate 10 layout variations for a {poster/carousel} with clear hierarchy. Provide headline styles, spacing notes, and component order.",
    },
    {
      title: "3) Critique Prompt",
      text:
        "Review this design description: {describe}. Give feedback in 3 sections: hierarchy, typography, spacing. Suggest 5 concrete fixes.",
    },
    {
      title: "4) System Prompt (repeatable)",
      text:
        "You are my design QA. Always check: hierarchy, alignment, spacing, contrast, consistency, export size, and platform fit. Output a checklist and fixes.",
    },
  ];

  const faq = [
    {
      q: "What is the best use of ChatGPT in design?",
      a: "Brief writing, idea generation, layout directions, naming options, and structured critique. It helps most when you already have clear goals and constraints.",
    },
    {
      q: "Does ChatGPT replace design fundamentals?",
      a: "No. Typography, spacing, hierarchy, and composition still decide the final quality. ChatGPT mainly speeds up thinking and iteration.",
    },
    {
      q: "How do I get better output?",
      a: "Give constraints: format, audience, brand colors, reference style, and what not to do. Then iterate with critique prompts.",
    },
  ];

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Use ChatGPT for better design output",
    description:
      "A practical workflow to use ChatGPT for design: brief → variations → critique → refine.",
    step: [
      { "@type": "HowToStep", name: "Write a clear brief", text: "Use a brief prompt to define audience, message, and constraints." },
      { "@type": "HowToStep", name: "Generate variations", text: "Ask for multiple layout directions with hierarchy notes." },
      { "@type": "HowToStep", name: "Get critique", text: "Use a critique prompt to identify hierarchy/spacing/typography issues." },
      { "@type": "HowToStep", name: "Refine and export", text: "Apply fixes, keep consistency, and export for the platform." },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="border border-white/10 rounded-3xl bg-[#111827] p-6 md:p-10">
          <div className="text-xs text-[#9CA3AF] tracking-wide">AI Tools</div>
          <h1 className="mt-2 text-2xl md:text-4xl font-semibold leading-tight">
            ChatGPT for Designers
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#B0B7C3] leading-relaxed">
            Best use-cases: better briefs, more variations, structured critique, and repeatable QA checklists.
          </p>

          <div className="mt-7 space-y-4">
            {prompts.map((p) => (
              <div key={p.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold text-white">{p.title}</div>
                <div className="mt-2 text-sm text-[#B0B7C3] leading-relaxed">
                  <code className="whitespace-pre-wrap">{p.text}</code>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/courses/graphic-design"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Graphic Design course
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "ChatGPT for Designers", "description": "Prompt patterns for designers: better briefs, more variations, structured feedback, and faster iteration without losing quality.", "url": "https://sikhadenge.in/ai-tools/chatgpt-for-designers", "mainEntityOfPage": {"@type": "WebPage", "@id": "https://sikhadenge.in/ai-tools/chatgpt-for-designers"}, "author": {"@type": "Organization", "name": "Sikhadenge"}, "publisher": {"@type": "Organization", "name": "Sikhadenge", "url": "https://sikhadenge.in"}, "keywords": "chatgpt for designers, ai for graphic design, design prompts, design feedback checklist, creative workflow"}) }}
          />


          {/* SD_CHATGPT_FAQ_SCHEMA_V1 */}
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
          {/* SD_CHATGPT_HOWTO_SCHEMA_V1 */}
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
