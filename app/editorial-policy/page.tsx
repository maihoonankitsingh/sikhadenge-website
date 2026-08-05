import type { Metadata } from "next";
import {
  GeneratedPageLayout,
  type GeneratedFaq,
  type GeneratedHighlight,
  type GeneratedStep,
} from "../../components/generated/GeneratedPageKit";

const BASE_URL = "https://sikhadenge.in";
const UPDATED_ISO = "2026-07-24";
const UPDATED_LABEL = "July 24, 2026";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How Sikhadenge plans, sources, reviews, updates, corrects, and publishes educational content, including its policy for AI-assisted drafting.",
  alternates: { canonical: `${BASE_URL}/editorial-policy` },
  openGraph: {
    type: "article",
    url: `${BASE_URL}/editorial-policy`,
    siteName: "Sikhadenge",
    title: "Sikhadenge Editorial Policy",
    description:
      "Public standards for ownership, sources, AI assistance, review, corrections, updates, claims, and reader feedback.",
    publishedTime: UPDATED_ISO,
    modifiedTime: UPDATED_ISO,
    images: [{ url: `${BASE_URL}/images/og/og-home.jpg`, width: 1200, height: 630, alt: "Sikhadenge editorial policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sikhadenge Editorial Policy",
    description: "Public standards for sources, AI assistance, review, corrections, updates, and ownership.",
    images: [`${BASE_URL}/images/og/og-home.jpg`],
  },
};

const highlights: GeneratedHighlight[] = [
  { title: "Clear ownership", description: "Sikhadenge is operated by ThinkGrow Pvt. Ltd. and published content should identify its responsible editorial entity.", icon: "users" },
  { title: "People-first purpose", description: "Pages should answer a real question or support a real task before search optimization is considered.", icon: "target" },
  { title: "Primary-source preference", description: "Changing or important facts should be checked against official documentation, standards, original research, or first-party evidence.", icon: "search" },
  { title: "Human accountability", description: "AI may assist drafting or analysis, but a human editorial process remains responsible for the final published result.", icon: "shield" },
  { title: "Visible corrections", description: "Material errors should be reviewed, corrected, and reflected in the page's update context when appropriate.", icon: "check" },
  { title: "No guaranteed outcomes", description: "Content must not promise rankings, traffic, jobs, income, placements, admissions, or other outcomes that cannot be verified and controlled.", icon: "answer" },
];

const steps: GeneratedStep[] = [
  { title: "Define the reader and question", description: "Document who the page is for, what they are trying to accomplish, and what a complete answer must include.", meta: "Planning" },
  { title: "Collect appropriate sources", description: "Prefer primary sources and retain enough context to represent them accurately. High-stakes topics require stronger verification and qualified review.", meta: "Research" },
  { title: "Draft for usefulness", description: "Provide a concise answer, explain the process, show practical examples or evidence, and avoid padding created only for keyword variations.", meta: "Drafting" },
  { title: "Apply human review", description: "Review factual accuracy, originality, clarity, accessibility, internal links, claims, structured data, and whether the page satisfies its stated purpose.", meta: "Quality control" },
  { title: "Publish with ownership data", description: "Use a canonical URL, responsible author or editorial entity, visible update context, appropriate schema, and contact or correction path.", meta: "Publication" },
  { title: "Monitor and correct", description: "Update material changes, fix errors, remove unsupported claims, and return correct HTTP statuses when content is removed or unavailable.", meta: "Maintenance" },
];

const faqs: GeneratedFaq[] = [
  { q: "Who owns Sikhadenge content?", a: "Sikhadenge is operated by ThinkGrow Pvt. Ltd. The Sikhadenge Editorial Team is the responsible publishing entity for general educational and generated knowledge pages unless a page identifies a different qualified author or reviewer." },
  { q: "Does Sikhadenge use AI to create content?", a: "AI tools may assist research organization, outlining, drafting, editing, analysis, or quality checks. AI assistance does not remove human responsibility for verification, originality, usefulness, privacy, or the final published result." },
  { q: "Is AI-generated text published without review?", a: "It should not be. Published material should receive a human editorial review proportionate to the topic's risk, complexity, and potential impact." },
  { q: "Which sources are preferred?", a: "Official documentation, government sources, recognized standards, original research, first-party data, direct evidence, and reputable expert institutions are preferred for important or changing claims." },
  { q: "How are secondary sources used?", a: "Secondary sources can provide context or synthesis, but important claims should not rely on an unverified summary when a relevant primary source is available." },
  { q: "How are high-stakes topics handled?", a: "Legal, medical, financial, tax, safety, security, and similar topics require current authoritative sources, clear limitations, and qualified professional guidance where appropriate. General content is not a substitute for professional advice." },
  { q: "How are statistics and claims checked?", a: "The source, date, scope, methodology, and relevant limitations should be checked. Unsupported ratings, student counts, income claims, placement rates, urgency, or performance guarantees should not be published." },
  { q: "How are updates dated?", a: "A modified date should change when the main answer, material facts, recommendations, sources, or user-facing content meaningfully change. A rebuild or cosmetic edit alone should not imply a substantive update." },
  { q: "What happens when an error is reported?", a: "The editorial team should review the exact page and statement, compare reliable evidence, correct a confirmed material error, and update related metadata or structured data when needed." },
  { q: "Can sponsored content affect editorial answers?", a: "Commercial relationships should not change factual standards. Advertising or sponsorship should be distinguishable from editorial content and should not create unsupported endorsements." },
  { q: "Does SEO determine what Sikhadenge publishes?", a: "Search demand can help identify useful questions, but content should not be created solely to capture variations of the same query. A page must provide a distinct, useful purpose for readers." },
  { q: "How are structured data and FAQs used?", a: "Structured data should match visible page content. FAQs are included when they help users resolve relevant follow-up questions; markup does not guarantee a search rich result or AI citation." },
  { q: "What happens to invalid or removed URLs?", a: "A valid current page should return 200. A moved page should use an appropriate permanent redirect. A nonexistent or removed page without a replacement should return a genuine 404 or 410 instead of a generic 200 response." },
  { q: "Can Sikhadenge guarantee Google or AI visibility?", a: "No. Technical accessibility, useful content, entity clarity, sources, and structured pages can improve eligibility and comprehension, but search engines and AI systems independently decide crawling, indexing, ranking, and citation." },
  { q: "How can a reader request a correction?", a: "Use the Sikhadenge contact page and provide the canonical URL, the exact statement, an explanation of the issue, and a reliable supporting source when available." },
];

export default function EditorialPolicyPage() {
  const canonical = `${BASE_URL}/editorial-policy`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#page`,
        name: "Sikhadenge Editorial Policy",
        description: metadata.description,
        url: canonical,
        datePublished: UPDATED_ISO,
        dateModified: UPDATED_ISO,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#organization` },
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <GeneratedPageLayout
        breadcrumbs={[{ href: "/", label: "Home" }, { href: "/editorial-policy", label: "Editorial Policy" }]}
        eyebrow="Publishing standards"
        title="Sikhadenge Editorial Policy"
        description="The standards used to plan, source, draft, review, publish, update, and correct Sikhadenge educational content, including AI-assisted workflows."
        badges={["ThinkGrow Pvt. Ltd.", "Human accountability", `Updated ${UPDATED_LABEL}`]}
        answerTitle="What is Sikhadenge's editorial standard?"
        answer="Every page should have a clear reader purpose, accurate and appropriately sourced information, visible ownership, human accountability, correct technical signals, and a process for material updates or corrections. AI tools may assist the workflow, but they do not replace editorial responsibility."
        highlights={highlights}
        steps={steps}
        tools={[
          { name: "Primary-source checklist", description: "Records the official source, date, scope, relevant limitations, and the exact claim it supports.", label: "Research" },
          { name: "Claims review", description: "Flags guarantees, unverifiable counts, ratings, earnings, urgency, rankings, placement, and other claims requiring evidence.", label: "Trust" },
          { name: "Technical publishing review", description: "Checks canonical URLs, status codes, robots directives, sitemap eligibility, metadata, links, and structured data consistency.", label: "Technical" },
          { name: "Correction record", description: "Captures the page, reported issue, evidence reviewed, decision, correction, and material update date.", label: "Governance" },
        ]}
        mistakes={[
          "Publishing many near-duplicate pages that differ only by keywords, city names, or minor wording.",
          "Using AI output as a source instead of verifying important claims against reliable evidence.",
          "Adding schema for content or services that are not visible or actually available on the page.",
          "Changing every sitemap modified date on each deployment without a material content update.",
          "Turning invalid URLs into generic 200 pages, which can create soft-404 signals.",
          "Promising traffic, rankings, citations, jobs, income, placements, or outcomes that Sikhadenge cannot control.",
        ]}
        faqs={faqs}
        relatedLinks={[
          { href: "/authors/sikhadenge-editorial-team", label: "Sikhadenge Editorial Team", description: "Review the responsible publishing entity and its working standards." },
          { href: "/about-us", label: "About Sikhadenge", description: "Understand the platform, ownership, mission, and learning approach." },
          { href: "/contact-us", label: "Report a correction", description: "Send the page URL, exact issue, and supporting evidence." },
          { href: "/blog", label: "Knowledge hub", description: "Browse practical guides published under this policy." },
        ]}
        updatedAt={UPDATED_LABEL}
        primaryCta={{ href: "/contact-us", label: "Report an issue or correction" }}
        secondaryCta={{ href: "/authors/sikhadenge-editorial-team", label: "Meet the editorial team" }}
      >
        <section className="mb-14 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#111827]/70 p-6 sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#76A3FF]">AI-assisted content</div>
            <h2 className="mt-3 text-2xl font-extrabold">Permitted assistance</h2>
            <p className="mt-3 text-sm leading-8 text-[#B0B7C3]">AI may help organize research, identify missing questions, draft alternatives, improve structure, check consistency, or support technical implementation. Editors must protect confidential data and verify the final output.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#111827]/70 p-6 sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5B301]">Prohibited shortcuts</div>
            <h2 className="mt-3 text-2xl font-extrabold">Unreviewed scale is not acceptable</h2>
            <p className="mt-3 text-sm leading-8 text-[#B0B7C3]">The policy does not permit publishing fabricated experience, unsupported sources, copied work, misleading local claims, fake authors, automatic guarantees, or large volumes of pages with no distinct user value.</p>
          </div>
        </section>
      </GeneratedPageLayout>
    </>
  );
}
