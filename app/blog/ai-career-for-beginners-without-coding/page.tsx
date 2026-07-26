import type { Metadata } from "next";

import { BlogLongformCareerGuide } from "@/components/blog/BlogLongformCareerGuide";

const BASE_URL = "https://sikhadenge.in";
const TITLE = "AI Career For Beginners Without Coding";
const DESCRIPTION =
  "A detailed practical guide to building an AI career without coding through workflow skills, portfolio projects, responsible tool use, and a realistic 90-day execution plan.";
const CANONICAL = `${BASE_URL}/blog/ai-career-for-beginners-without-coding`;

export const metadata: Metadata = {
  title: `${TITLE} | Sikhadenge`,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: `${TITLE} | Sikhadenge`,
    description: DESCRIPTION,
    siteName: "Sikhadenge",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Sikhadenge`,
    description: DESCRIPTION,
  },
};

const faqs = [
  {
    question: "Can a complete beginner start an AI career without coding?",
    answer:
      "Yes. A beginner can start in AI-assisted content, design, video, marketing, research, operations, sales support and productivity workflows without programming. Professional judgement, communication, verification and proof of work are still required.",
  },
  {
    question: "Which AI skill should I learn first?",
    answer:
      "Choose the skill closest to a useful outcome you already understand or can practise consistently. Start from a real result, such as a research brief, campaign asset, video workflow or operating checklist, rather than choosing a tool only because it is popular.",
  },
  {
    question: "How long does it take to become job-ready?",
    answer:
      "There is no universal timeline. Readiness depends on your existing skill, role difficulty, practice quality and completed projects. Measure progress by whether you can follow a brief, produce reviewed work, explain your process and repeat the result.",
  },
  {
    question: "Do certificates matter for non-coding AI roles?",
    answer:
      "A relevant certificate can demonstrate structured learning, but it should support rather than replace portfolio evidence. Employers and clients still need to understand what you can produce and how you verify quality.",
  },
  {
    question: "How do I prove that I am not only copying AI output?",
    answer:
      "Show the brief, sources, decisions, rejected options, quality checks, edits, limitations and final result. A process-based case study makes your human contribution and responsibility visible.",
  },
  {
    question: "Can I freelance with AI skills before getting a full-time job?",
    answer:
      "You can test a narrowly defined, low-risk service through personal projects, volunteer work or small paid assignments. Set clear expectations, protect client information and avoid promising results you cannot control.",
  },
  {
    question: "Will AI replace the careers I am preparing for?",
    answer:
      "AI can change tasks inside many careers, but useful work still requires problem definition, user understanding, verification, communication and responsibility for the final result. Build adaptable capabilities instead of depending on one tool.",
  },
];

export default function Page() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    mainEntityOfPage: CANONICAL,
    dateModified: "2026-07-26",
    author: {
      "@type": "Organization",
      name: "Sikhadenge Editorial Team",
      url: `${BASE_URL}/authors/sikhadenge-editorial-team`,
    },
    publisher: {
      "@type": "Organization",
      name: "Sikhadenge",
      url: BASE_URL,
    },
    inLanguage: "en-IN",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: TITLE,
        item: CANONICAL,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BlogLongformCareerGuide />
    </>
  );
}
