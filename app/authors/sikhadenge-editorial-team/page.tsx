import type { Metadata } from "next";
import {
  GeneratedPageLayout,
  type GeneratedFaq,
  type GeneratedHighlight,
  type GeneratedStep,
} from "../../../components/generated/GeneratedPageKit";

const BASE_URL = "https://sikhadenge.in";
const UPDATED_ISO = "2026-07-24";
const UPDATED_LABEL = "July 24, 2026";

export const metadata: Metadata = {
  title: "Sikhadenge Editorial Team",
  description:
    "The responsible publishing entity for Sikhadenge practical AI and digital skills guides, including its scope, review process, and correction path.",
  alternates: { canonical: `${BASE_URL}/authors/sikhadenge-editorial-team` },
  openGraph: {
    type: "profile",
    url: `${BASE_URL}/authors/sikhadenge-editorial-team`,
    siteName: "Sikhadenge",
    title: "Sikhadenge Editorial Team",
    description: "Editorial ownership, subject scope, source standards, human review, updates, and corrections.",
    images: [{ url: `${BASE_URL}/images/og/og-home.jpg`, width: 1200, height: 630, alt: "Sikhadenge Editorial Team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sikhadenge Editorial Team",
    description: "Editorial ownership, subject scope, source standards, human review, updates, and corrections.",
    images: [`${BASE_URL}/images/og/og-home.jpg`],
  },
};

const highlights: GeneratedHighlight[] = [
  { title: "Practical AI workflows", description: "Guides that connect AI tools to defined tasks, visible outputs, verification, and responsible human review.", icon: "bot" },
  { title: "Creative and digital skills", description: "Coverage includes design, video, marketing, websites, automation, prompt engineering, and career-oriented learning.", icon: "wand" },
  { title: "Source-aware publishing", description: "Important changing claims should be linked to current official documentation or other appropriate primary evidence.", icon: "search" },
  { title: "Technical publishing quality", description: "Pages are reviewed for canonical URLs, status handling, internal links, structured data, sitemap eligibility, and accessibility basics.", icon: "check" },
  { title: "No fabricated credentials", description: "This page describes an organizational editorial entity and does not invent individual authors, qualifications, or personal experience.", icon: "shield" },
  { title: "Public correction path", description: "Readers can report a specific page issue through the canonical Sikhadenge contact route.", icon: "answer" },
];

const steps: GeneratedStep[] = [
  { title: "Content brief", description: "Define the reader, search or task intent, expected answer, required evidence, risks, and the useful next action.", meta: "Planning" },
  { title: "Source collection", description: "Prioritize official documentation, standards, original research, first-party data, and recognized authoritative sources.", meta: "Research" },
  { title: "Structured drafting", description: "Create a concise answer, clear headings, practical steps, relevant examples, limitations, FAQs, and descriptive internal links.", meta: "Drafting" },
  { title: "Editorial review", description: "Check factual accuracy, originality, clarity, usefulness, claims, privacy, accessibility, citations, and topic-specific risk.", meta: "Review" },
  { title: "Technical review", description: "Check status codes, canonical URLs, metadata, robots directives, schema consistency, sitemap inclusion, and crawlable links.", meta: "Technical" },
  { title: "Maintenance", description: "Review reported issues and update the page when material facts, recommendations, sources, or the main answer change.", meta: "Ongoing" },
];

const faqs: GeneratedFaq[] = [
  { q: "Is the Sikhadenge Editorial Team a person?", a: "No. It is the organizational publishing entity responsible for general Sikhadenge educational and generated knowledge pages when a specific individual author or qualified reviewer is not named." },
  { q: "Why use an organizational author?", a: "An organizational author is more accurate than inventing individual names or credentials for content prepared and maintained through a shared editorial and technical workflow." },
  { q: "Who operates Sikhadenge?", a: "Sikhadenge is operated by ThinkGrow Pvt. Ltd. Ownership and contact details are linked through the About, Contact, and Editorial Policy pages." },
  { q: "What subjects does the team cover?", a: "The scope includes practical AI, prompt engineering, automation, design, video editing, marketing, websites, digital workflows, learning paths, portfolio development, and related career topics." },
  { q: "Does the team claim professional expertise in every topic?", a: "No. Topic coverage does not imply licensed or specialist professional authority. High-stakes subjects require appropriate current sources and qualified professional guidance." },
  { q: "Does the team use AI tools?", a: "AI tools may assist research organization, drafting, editing, consistency checks, or technical implementation. Human accountability remains required for the final published material." },
  { q: "How are sources selected?", a: "Primary sources are preferred for changing or important facts. Secondary sources can add context when they are reputable and accurately represented." },
  { q: "How are claims reviewed?", a: "Claims are checked for evidence, scope, date, wording, and limitations. Unsupported guarantees, ratings, counts, earnings, placements, urgency, or ranking promises should be removed." },
  { q: "How are generated pages kept useful?", a: "Templates should produce a distinct answer, relevant steps, visible FAQs, appropriate internal links, and topic context. Unknown slugs should return 404 rather than generating a generic page." },
  { q: "How are updates handled?", a: "A material update should change the visible content and relevant modified date. Deployment, formatting, or cosmetic changes alone should not imply a new substantive review." },
  { q: "How can I identify the latest version?", a: "Use the canonical URL and visible update context. Search caches, copied snippets, or third-party summaries may not reflect the current page." },
  { q: "How can I request a correction?", a: "Send the canonical URL, exact statement, explanation, and reliable supporting evidence through the Sikhadenge contact page." },
  { q: "Will every reported issue lead to a change?", a: "No. The team should review the evidence and context. A change is appropriate when the content is inaccurate, misleading, outdated, unsupported, or materially unclear." },
  { q: "Can the team guarantee search rankings or AI citations?", a: "No. It can improve technical access, content quality, source clarity, and entity consistency, but external search and AI systems independently decide crawling, indexing, ranking, and citation." },
  { q: "Where are the full publishing rules?", a: "The Sikhadenge Editorial Policy documents the source hierarchy, AI-assisted workflow, human review, correction process, update rules, claims policy, and HTTP status principles." },
];

export default function EditorialTeamPage() {
  const canonical = `${BASE_URL}/authors/sikhadenge-editorial-team`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${canonical}#organization`,
        name: "Sikhadenge Editorial Team",
        url: canonical,
        description: metadata.description,
        parentOrganization: { "@id": `${BASE_URL}/#organization` },
        knowsAbout: [
          "Artificial intelligence skills",
          "Prompt engineering",
          "Digital marketing",
          "Graphic design",
          "Video editing",
          "Website building",
          "Business automation",
          "Educational content publishing",
        ],
        publishingPrinciples: `${BASE_URL}/editorial-policy`,
      },
      {
        "@type": "ProfilePage",
        "@id": `${canonical}#page`,
        name: "Sikhadenge Editorial Team",
        url: canonical,
        dateCreated: UPDATED_ISO,
        dateModified: UPDATED_ISO,
        mainEntity: { "@id": `${canonical}#organization` },
        isPartOf: { "@id": `${BASE_URL}/#website` },
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
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/authors/sikhadenge-editorial-team", label: "Sikhadenge Editorial Team" },
        ]}
        eyebrow="Editorial identity"
        title="Sikhadenge Editorial Team"
        description="The organizational publishing entity responsible for general Sikhadenge practical AI and digital skills content when a specific individual author or specialist reviewer is not named."
        badges={["ThinkGrow Pvt. Ltd.", "Human accountability", `Updated ${UPDATED_LABEL}`]}
        answerTitle="Who is responsible for Sikhadenge knowledge pages?"
        answer="Sikhadenge knowledge pages are owned and maintained by the Sikhadenge Editorial Team under ThinkGrow Pvt. Ltd. The team uses a shared research, editorial, technical, and correction workflow. This organizational identity avoids fabricated individual authorship and provides a stable public ownership trail."
        highlights={highlights}
        steps={steps}
        tools={[
          { name: "Editorial brief", description: "Defines the reader, question, page purpose, evidence needs, risk level, and required practical outcome.", label: "Planning" },
          { name: "Source record", description: "Captures the source URL, publisher, date, scope, limitations, and the exact claim supported.", label: "Research" },
          { name: "Page quality review", description: "Checks usefulness, accuracy, clarity, originality, claims, links, visible FAQs, and accessibility basics.", label: "Editorial" },
          { name: "Technical SEO review", description: "Checks canonical URLs, status codes, metadata, robots, structured data, sitemap inclusion, and internal discovery.", label: "Technical" },
        ]}
        mistakes={[
          "Inventing individual author names, biographies, credentials, experience, or photographs.",
          "Using an organizational byline to hide responsibility for low-quality automated content.",
          "Publishing claims without appropriate evidence, context, date, or limitations.",
          "Allowing AI-generated summaries to replace review of primary sources.",
          "Creating location or service pages that imply availability not confirmed by Sikhadenge.",
          "Leaving readers without a public contact and correction path.",
        ]}
        faqs={faqs}
        relatedLinks={[
          { href: "/editorial-policy", label: "Editorial Policy", description: "Read the full publishing, AI assistance, update, and correction standards." },
          { href: "/about-us", label: "About Sikhadenge", description: "Review ownership, mission, learning system, and platform context." },
          { href: "/blog", label: "Knowledge hub", description: "Browse guides maintained through the editorial workflow." },
          { href: "/contact-us", label: "Contact or correction request", description: "Send a specific page URL and supporting details." },
        ]}
        updatedAt={UPDATED_LABEL}
        primaryCta={{ href: "/editorial-policy", label: "Read the editorial policy" }}
        secondaryCta={{ href: "/contact-us", label: "Contact the team" }}
      >
        <section className="mb-14 rounded-3xl border border-white/10 bg-[#111827]/70 p-6 sm:p-8">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5B301]">Important limitation</div>
          <h2 className="mt-3 text-2xl font-extrabold">An editorial entity is not a substitute for specialist review</h2>
          <p className="mt-3 max-w-4xl text-sm leading-8 text-[#B0B7C3] sm:text-base">
            When a topic requires licensed, regulated, medical, legal, financial, safety, or advanced technical expertise, the page should use current authoritative sources and identify an appropriate qualified reviewer where necessary. General organizational authorship does not create specialist credentials.
          </p>
        </section>
      </GeneratedPageLayout>
    </>
  );
}
