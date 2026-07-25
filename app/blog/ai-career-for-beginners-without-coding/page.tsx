import type { Metadata } from "next";

import {
  GeneratedPageLayout,
  type GeneratedFaq,
  type GeneratedHighlight,
  type GeneratedLink,
  type GeneratedStep,
} from "@/components/blog/BlogArticleLayout";

const BASE_URL = "https://sikhadenge.in";
const TITLE = "AI Career For Beginners Without Coding";
const DESCRIPTION =
  "Learn how beginners can build an AI career without coding through practical tools, workflow skills, portfolio projects, and job-ready execution paths.";
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

const focusAreas: GeneratedHighlight[] = [
  {
    title: "Choose a practical AI work direction",
    description:
      "Start with a clear outcome such as content, design, video, marketing, research, operations, or client support instead of trying to learn every tool at once.",
    icon: "target",
  },
  {
    title: "Learn tools through real workflows",
    description:
      "Combine prompting, editing, verification, and delivery so that AI becomes part of a reliable working process rather than a collection of isolated features.",
    icon: "wand",
  },
  {
    title: "Build proof of work",
    description:
      "Create portfolio examples that show the problem, your process, the tools used, your judgement, and the final result a client or employer can evaluate.",
    icon: "book",
  },
  {
    title: "Develop human judgement",
    description:
      "Review accuracy, improve clarity, protect privacy, and adapt AI output to the audience. These decisions remain valuable even when tools change.",
    icon: "shield",
  },
  {
    title: "Connect skills to opportunities",
    description:
      "Map your workflow capability to internships, freelance services, entry-level roles, creator work, or small-business support instead of relying on tool certificates alone.",
    icon: "users",
  },
  {
    title: "Improve through repeatable practice",
    description:
      "Use small projects, feedback, and iteration to increase speed and quality while documenting the steps that consistently produce a useful result.",
    icon: "sparkles",
  },
];

const steps: GeneratedStep[] = [
  {
    title: "Select one career outcome",
    description:
      "Choose a specific direction such as AI-assisted content, design, video editing, marketing, research, operations, or customer support.",
    meta: "Direction",
  },
  {
    title: "Build a focused tool stack",
    description:
      "Learn one primary AI assistant plus the core software used in your chosen field. Practise the complete workflow, not only prompt writing.",
    meta: "Foundation",
  },
  {
    title: "Complete three portfolio projects",
    description:
      "Create beginner, intermediate, and client-style projects. Explain the brief, workflow, decisions, limitations, and measurable final output.",
    meta: "Proof of work",
  },
  {
    title: "Apply the skill in real settings",
    description:
      "Use internships, freelance outreach, volunteer projects, personal brands, or small-business problems to validate whether your workflow delivers value.",
    meta: "Execution",
  },
  {
    title: "Review and specialise",
    description:
      "Track where your results are strongest, improve weak steps, and gradually specialise around an audience, industry, or repeatable service.",
    meta: "Growth",
  },
];

const mistakes = [
  "Learning AI only at theory level without completing real projects",
  "Publishing raw AI output without verification, editing, or context",
  "Changing tools constantly instead of mastering a complete workflow",
  "Building a portfolio that lists tools but does not demonstrate outcomes",
  "Ignoring communication, domain knowledge, privacy, and professional judgement",
];

const faqs: GeneratedFaq[] = [
  {
    q: "Can I start an AI career without learning coding?",
    a: "Yes. Many AI-assisted roles in content, design, video, marketing, research, operations, sales support, and productivity do not require programming. You still need strong workflow skills, judgement, communication, and proof of work.",
  },
  {
    q: "Which AI skill should a non-coder learn first?",
    a: "Start with the skill closest to a real outcome you already understand. For example, combine an AI assistant with writing, design, video editing, marketing, research, or business operations rather than learning prompts without a work context.",
  },
  {
    q: "How can a beginner prove AI skills to employers or clients?",
    a: "Build portfolio projects that explain the problem, inputs, workflow, quality checks, human decisions, and final result. A clear case study is usually more useful than a list of AI tools.",
  },
  {
    q: "How long does it take to become job-ready?",
    a: "There is no fixed timeline. Progress depends on your existing skills, practice quality, project complexity, and chosen role. A focused learner should measure readiness through consistent portfolio output and real feedback rather than only hours studied.",
  },
  {
    q: "Will AI tools replace non-coding digital careers?",
    a: "Tools can automate parts of many jobs, but useful work still requires problem definition, quality control, context, communication, ethics, and responsibility for the final result. Building these capabilities makes a workflow more resilient as tools change.",
  },
];

const relatedLinks: GeneratedLink[] = [
  {
    href: "/ai-generalist",
    label: "AI Generalist Guide",
    description: "Understand broad AI-assisted digital capability.",
  },
  {
    href: "/ai-skills",
    label: "Explore AI Skills",
    description: "Compare practical skills connected to modern work.",
  },
  {
    href: "/ai-tools",
    label: "AI Tools Hub",
    description: "Discover tools for learning and execution.",
  },
  {
    href: "/ai-career-paths",
    label: "AI Career Paths",
    description: "Explore career directions and learning routes.",
  },
  {
    href: "/blog/how-to-build-ai-portfolio",
    label: "Build an AI Portfolio",
    description: "Turn practice into credible proof of work.",
  },
  {
    href: "/blog",
    label: "Sikhadenge AI Blog",
    description: "Continue with related practical guides.",
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <GeneratedPageLayout
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "AI Blog" },
          { href: CANONICAL.replace(BASE_URL, ""), label: TITLE },
        ]}
        eyebrow="Beginner AI career guide"
        title={TITLE}
        description={DESCRIPTION}
        badges={["No coding required", "Beginner friendly", "Portfolio focused"]}
        answerTitle="A practical non-coding AI career starts with one useful workflow"
        answer="Choose a digital work direction, learn how AI supports the complete workflow, build portfolio evidence, and apply the skill in real projects. Coding can expand your options later, but it is not required to begin creating value with AI-assisted content, design, video, marketing, research, or operations."
        highlights={focusAreas}
        steps={steps}
        mistakes={mistakes}
        faqs={faqs}
        relatedLinks={relatedLinks}
        updatedAt="July 2026"
        authorLabel="Sikhadenge Editorial Team"
        authorHref="/authors/sikhadenge-editorial-team"
        primaryCta={{ href: "/gen-ai-masterclass", label: "Join Free AI Masterclass" }}
        secondaryCta={{ href: "/ai-skills", label: "Explore AI Skills" }}
      >
        <p>
          This educational guide focuses on practical learning and responsible execution.
          AI products, features, pricing, and labour-market requirements can change, so
          readers should verify current tool documentation and role requirements before
          making important career decisions.
        </p>
      </GeneratedPageLayout>
    </>
  );
}
