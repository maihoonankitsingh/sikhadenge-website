import type { Metadata } from "next";
import { notFound } from "next/navigation";
import generatedPages from "../../../data/generated-seo.json";
import {
  GeneratedPageLayout,
  type GeneratedFaq,
  type GeneratedHighlight,
  type GeneratedStep,
  type GeneratedTool,
} from "../../../components/generated/GeneratedPageKit";

const BASE_URL = "https://sikhadenge.in";
const RELEASE_DATE_ISO = "2026-07-24";
const RELEASE_DATE_LABEL = "July 24, 2026";

type ExpertPageData = {
  slug: string;
  title: string;
  description: string;
  skill: string;
  city?: string;
};

const expertPages = generatedPages as ExpertPageData[];

function getPage(slug: string) {
  return expertPages.find((page) => page.slug === slug);
}

function buildFaqs(page: ExpertPageData): GeneratedFaq[] {
  const location = page.city && page.city !== "Online" ? ` in ${page.city}` : " online";
  return [
    {
      q: `What is the ${page.skill} learning path${location}?`,
      a: `The practical path starts with fundamentals, moves into guided exercises, then real-world projects, review, correction, and a documented portfolio. The page is a learning guide; schedules and availability should be confirmed with Sikhadenge.`,
    },
    {
      q: `Who should learn ${page.skill}?`,
      a: `Students, working professionals, freelancers, creators, and business owners can learn ${page.skill} when it connects to a real task or career goal. The required depth depends on the work you want to perform.`,
    },
    {
      q: `Can a complete beginner start ${page.skill}?`,
      a: "Yes. Beginners should start with terminology and one simple workflow, then complete a small project before adding advanced tools or techniques.",
    },
    {
      q: `What will I be able to create after learning ${page.skill}?`,
      a: `The expected output should be visible and reviewable, such as a project, workflow, analysis, campaign, design, automation, or portfolio case study relevant to ${page.skill}.`,
    },
    {
      q: "Is the introductory masterclass free?",
      a: "Sikhadenge may provide free introductory sessions or resources. Confirm the current session format, date, eligibility, and inclusions on the registration page or with the support team.",
    },
    {
      q: "Are the sessions live or recorded?",
      a: "The exact delivery format can vary by program. Check the current registration or course page for live session timing, recordings, assignments, and support access.",
    },
    {
      q: `How long does it take to learn ${page.skill}?`,
      a: "Basic familiarity can develop through a few focused practice sessions. Reliable professional capability requires repeated projects, feedback, correction, and experience with real constraints.",
    },
    {
      q: "Do I need a laptop or can I learn on mobile?",
      a: "A mobile device can support videos, notes, and simple practice, but most production workflows, file handling, design, coding, editing, or automation are more reliable on a laptop or desktop.",
    },
    {
      q: "Which tools should I install first?",
      a: "Install only the primary tool required for the first project. Verify system requirements, pricing, privacy terms, and current features on the tool provider's official website.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Certificate availability depends on the specific Sikhadenge program and its completion requirements. Confirm the current policy before enrollment rather than relying on a general page.",
    },
    {
      q: `Can ${page.skill} help with jobs or freelancing?`,
      a: `It can support employment or freelance work when you can show relevant projects, explain decisions, meet deadlines, accept feedback, and connect the work to a user or business outcome. No program can guarantee a job or income.`,
    },
    {
      q: "How should I build a portfolio?",
      a: "For each project, show the problem, constraints, process, tools, important decisions, final output, and what changed after feedback. Explain your contribution clearly.",
    },
    {
      q: "How does Sikhadenge review practical work?",
      a: "A useful review should check correctness, clarity, completeness, execution quality, presentation, and whether the result meets the stated brief. The exact review process depends on the active program.",
    },
    {
      q: `Is this page only for people${location}?`,
      a: page.city && page.city !== "Online"
        ? `The page uses ${page.city} as a location context, but online availability and eligibility should be confirmed with Sikhadenge. It does not claim a physical center unless the official contact page confirms one.`
        : "The guide is intended for online learners. Confirm current enrollment availability, schedules, and regional requirements before registering.",
    },
    {
      q: "What should I do after reading this page?",
      a: `Choose one ${page.skill} outcome, complete the first practice step, save the result, and ask Sikhadenge for the current program or masterclass details if you need guided support.`,
    },
  ];
}

function buildHighlights(page: ExpertPageData): GeneratedHighlight[] {
  return [
    {
      title: "Foundation before tools",
      description: `Understand the core concepts and quality standards behind ${page.skill} before depending on shortcuts.`,
      icon: "book",
    },
    {
      title: "Guided practical work",
      description: "Use assignments and real briefs that create visible, reviewable output rather than passive course completion.",
      icon: "target",
    },
    {
      title: "Review and correction",
      description: "Apply feedback to improve accuracy, execution quality, presentation, and professional consistency.",
      icon: "check",
    },
    {
      title: "Portfolio evidence",
      description: "Document the problem, process, decisions, output, and improvement made after review.",
      icon: "graduate",
    },
    {
      title: "Current source checks",
      description: "Verify changing tool features, pricing, and system requirements in official documentation.",
      icon: "search",
    },
    {
      title: "Clear next action",
      description: "Move from reading to one concrete practice task or a current Sikhadenge program enquiry.",
      icon: "sparkles",
    },
  ];
}

function buildSteps(page: ExpertPageData): GeneratedStep[] {
  return [
    {
      title: `Define your ${page.skill} goal`,
      description: "Choose whether the immediate goal is learning fundamentals, building a portfolio, improving current work, preparing for jobs, or delivering a client project.",
      meta: "Goal and baseline",
    },
    {
      title: "Learn the core workflow",
      description: `Understand the sequence, terminology, files, quality checks, and common constraints involved in practical ${page.skill} work.`,
      meta: "Foundation",
    },
    {
      title: "Complete guided exercises",
      description: "Use small exercises to practice one capability at a time. Save versions so improvement can be compared instead of relying on memory.",
      meta: "Focused practice",
    },
    {
      title: "Build a realistic project",
      description: "Work from a clear brief, create a complete output, and present it in a way that another person can inspect and understand.",
      meta: "Proof of work",
    },
    {
      title: "Review and revise",
      description: "Check the result against the brief, correct weak areas, explain decisions, and verify important facts or technical behavior.",
      meta: "Quality review",
    },
    {
      title: "Publish a case study",
      description: "Turn the final work into a concise portfolio case study with the problem, process, output, feedback, and measured improvement.",
      meta: "Portfolio",
    },
  ];
}

function buildTools(page: ExpertPageData): GeneratedTool[] {
  return [
    {
      name: `${page.skill} primary tool`,
      description: "Choose the professional tool most relevant to the first project. Confirm current system requirements and licensing before installation.",
      label: "Core",
    },
    {
      name: "Official documentation",
      description: "Use first-party documentation for current features, limitations, formats, privacy, pricing, and technical changes.",
      label: "Primary source",
    },
    {
      name: "Project brief template",
      description: "Record the user, goal, constraints, deliverables, deadline, acceptance criteria, and review notes.",
      label: "Workflow",
    },
    {
      name: "Portfolio case-study template",
      description: "Present the problem, process, important decisions, final result, and what changed after feedback.",
      label: "Evidence",
    },
  ];
}

export async function generateStaticParams() {
  return expertPages.slice(0, 500).map((page) => ({ slug: page.slug }));
}

export const dynamicParams = true;
export const revalidate = 2592000;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = getPage(params.slug);
  if (!page) {
    return {
      title: "Learning Page Not Found",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `${BASE_URL}/expert/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    authors: [{ name: "Sikhadenge Editorial Team", url: `${BASE_URL}/authors/sikhadenge-editorial-team` }],
    openGraph: {
      type: "article",
      url: canonical,
      siteName: "Sikhadenge",
      title: page.title,
      description: page.description,
      publishedTime: RELEASE_DATE_ISO,
      modifiedTime: RELEASE_DATE_ISO,
      images: [
        {
          url: `${BASE_URL}/images/og/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [`${BASE_URL}/images/og/og-home.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default function ExpertPage({ params }: { params: { slug: string } }) {
  const page = getPage(params.slug);
  if (!page) notFound();

  const canonical = `${BASE_URL}/expert/${page.slug}`;
  const faqs = buildFaqs(page);
  const locationLabel = page.city && page.city !== "Online" ? page.city : "Online learning";
  const answer = `${page.skill} is best learned through a sequence of fundamentals, guided exercises, a realistic project, review, revision, and a documented portfolio case study. Use this page as a practical roadmap and confirm current Sikhadenge program schedules, delivery format, and eligibility before registering.`;
  const waLink = `https://wa.me/918808505575?text=${encodeURIComponent(`Hi, I want current details about the ${page.skill} learning program on Sikhadenge.`)}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        "@id": `${canonical}#learning-resource`,
        name: page.title,
        description: page.description,
        url: canonical,
        inLanguage: "en-IN",
        educationalUse: "Professional development",
        learningResourceType: "Practical learning guide",
        teaches: page.skill,
        provider: { "@id": `${BASE_URL}/#organization` },
        dateModified: RELEASE_DATE_ISO,
        author: {
          "@type": "Organization",
          name: "Sikhadenge Editorial Team",
          url: `${BASE_URL}/authors/sikhadenge-editorial-team`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Expert learning pages", item: `${BASE_URL}/ai-expert` },
          { "@type": "ListItem", position: 3, name: page.title, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <GeneratedPageLayout
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/ai-expert", label: "AI Expert" },
          { href: `/expert/${page.slug}`, label: page.title },
        ]}
        eyebrow={`${page.skill} learning guide`}
        title={page.title}
        description={page.description}
        badges={[locationLabel, "Practical roadmap", `Updated ${RELEASE_DATE_LABEL}`]}
        answerTitle={`What is the right way to learn ${page.skill}?`}
        answer={answer}
        highlights={buildHighlights(page)}
        steps={buildSteps(page)}
        tools={buildTools(page)}
        mistakes={[
          `Learning ${page.skill} only through passive videos without producing reviewable work.`,
          "Installing many tools before understanding the first workflow and quality standard.",
          "Publishing copied or automated work without original decisions, verification, or ownership.",
          "Using unsupported ratings, placement claims, income promises, or artificial urgency.",
          "Creating location pages that imply a physical center or local service that is not officially available.",
          "Treating a certificate as stronger evidence than a clear portfolio and demonstrated capability.",
        ]}
        faqs={faqs}
        relatedLinks={[
          { href: "/ai-expert", label: "AI Expert program", description: "Review the main Sikhadenge AI learning pathway." },
          { href: "/blog", label: "Practical AI guides", description: "Explore answer-first learning articles and workflows." },
          { href: "/about-us", label: "About Sikhadenge", description: "Understand the platform, learning approach, and ownership." },
          { href: "/contact-us", label: "Contact and admissions", description: "Ask for current program details and availability." },
        ]}
        updatedAt={RELEASE_DATE_LABEL}
        primaryCta={{ href: waLink, label: "Ask for current program details" }}
        secondaryCta={{ href: "/contact-us", label: "Open contact page" }}
      >
        <section className="mb-14 rounded-3xl border border-white/10 bg-[#111827]/70 p-6 sm:p-8">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5B301]">Location accuracy</div>
          <h2 className="mt-3 text-2xl font-extrabold">Location context without unsupported local claims</h2>
          <p className="mt-3 max-w-4xl text-sm leading-8 text-[#B0B7C3] sm:text-base">
            This page uses <strong className="text-white">{locationLabel}</strong> as a learning context. It does not claim a physical training center, local office, guaranteed batch, or city-specific placement unless Sikhadenge confirms that information on an official page.
          </p>
        </section>
      </GeneratedPageLayout>
    </>
  );
}
