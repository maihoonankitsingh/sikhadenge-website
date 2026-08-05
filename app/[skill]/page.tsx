import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { skillsData } from "../../data/skillsData";
import {
  GeneratedPageLayout,
  type GeneratedFaq,
  type GeneratedHighlight,
  type GeneratedStep,
  type GeneratedTool,
} from "../../components/generated/GeneratedPageKit";

const BASE_URL = "https://sikhadenge.in";
const RELEASE_DATE_ISO = "2026-07-24";
const RELEASE_DATE_LABEL = "July 24, 2026";

function getSkill(slug: string) {
  return skillsData.find((skill) => skill.slug === slug);
}

function buildHighlights(title: string, skills: string[]): GeneratedHighlight[] {
  const icons = ["book", "target", "check", "sparkles"] as const;
  const supplied = skills.slice(0, 6).map((skill, index) => ({
    title: skill,
    description: `Learn the practical foundations of ${skill}, apply them in a focused task, and review the result against a clear quality standard.`,
    icon: icons[index % icons.length],
  }));

  return [
    ...supplied,
    {
      title: "Portfolio evidence",
      description: `Document a complete ${title} project with the problem, process, decisions, result, and improvements made after feedback.`,
      icon: "graduate" as const,
    },
    {
      title: "Professional review",
      description: "Check accuracy, usability, execution quality, presentation, and whether the output meets the original brief.",
      icon: "shield" as const,
    },
  ].slice(0, 6);
}

function buildSteps(title: string): GeneratedStep[] {
  return [
    {
      title: "Define the role and outcome",
      description: `Identify what a ${title} is expected to produce, who uses the output, and which quality standards matter in the target role or project.`,
      meta: "Role clarity",
    },
    {
      title: "Learn the essential concepts",
      description: "Understand the core terminology, workflow, common file formats, constraints, and review criteria before relying on advanced tools.",
      meta: "Foundation",
    },
    {
      title: "Practice one capability at a time",
      description: "Complete small exercises with a visible result. Save versions and notes so improvement can be compared rather than guessed.",
      meta: "Focused practice",
    },
    {
      title: "Build a realistic project",
      description: `Use a clear brief to create a complete ${title} project that another person can inspect, use, or evaluate.`,
      meta: "Proof of work",
    },
    {
      title: "Review and revise",
      description: "Compare the output with the brief, correct weak areas, verify important facts or technical behavior, and explain major decisions.",
      meta: "Quality loop",
    },
    {
      title: "Publish a portfolio case study",
      description: "Show the problem, constraints, process, tools, final output, feedback received, and what changed during revision.",
      meta: "Portfolio",
    },
  ];
}

function buildTools(title: string): GeneratedTool[] {
  return [
    {
      name: `${title} primary workspace`,
      description: "Choose one professional tool or development environment that matches the first project. Verify current requirements and licensing on the official website.",
      label: "Core",
    },
    {
      name: "Official documentation",
      description: "Use first-party documentation for current features, APIs, limitations, formats, security guidance, and technical changes.",
      label: "Primary source",
    },
    {
      name: "Project brief template",
      description: "Record the user, goal, constraints, deliverables, deadline, acceptance criteria, and review notes before starting.",
      label: "Workflow",
    },
    {
      name: "Portfolio case-study template",
      description: "Present the problem, process, important decisions, final result, and improvements made after review.",
      label: "Evidence",
    },
  ];
}

function buildFaqs(title: string, category: string): GeneratedFaq[] {
  return [
    {
      q: `What does a ${title} do?`,
      a: `A ${title} applies ${category.toLowerCase()} knowledge to produce useful, reviewable outcomes. The exact responsibilities vary by role, company, project, and level of experience.`,
    },
    {
      q: `Can a complete beginner become a ${title}?`,
      a: "Yes. Start with the fundamentals, practice one capability at a time, complete small projects, and use feedback to improve before attempting complex professional work.",
    },
    {
      q: `Which skills are most important for a ${title}?`,
      a: "The most important skills are the ones needed to understand the problem, execute the core workflow, verify quality, communicate decisions, and deliver a result that meets the brief.",
    },
    {
      q: `How long does it take to become a ${title}?`,
      a: "Basic familiarity can develop through focused practice, but dependable professional capability requires repeated projects, correction, collaboration, and experience with real constraints. There is no fixed guaranteed timeline.",
    },
    {
      q: "Do I need a degree to start?",
      a: "A degree may be required by some employers, but practical projects, role-relevant knowledge, communication, and a strong portfolio can also be important. Check the requirements of each role or organization.",
    },
    {
      q: "Which tools should I learn first?",
      a: "Choose the primary tool required for the first project and learn it through a complete workflow. Verify current features, pricing, system requirements, and limitations in official documentation.",
    },
    {
      q: "How should I practice effectively?",
      a: "Use a written brief, create a visible output, compare it with acceptance criteria, record feedback, revise the work, and save what changed between versions.",
    },
    {
      q: "What should I include in a portfolio?",
      a: "Include the problem, constraints, your contribution, process, important decisions, final output, feedback, and measurable improvement. Remove confidential client information.",
    },
    {
      q: "Can this skill help with jobs or freelancing?",
      a: "It can support employment or freelance work when you can demonstrate relevant capability, communicate clearly, meet deadlines, and connect the work to a user or business outcome. No course or page can guarantee a job or income.",
    },
    {
      q: "How do I know whether my work is professional quality?",
      a: "Review correctness, completeness, clarity, usability, consistency, accessibility, maintainability, and whether the final output satisfies the original brief and target audience.",
    },
    {
      q: "Should I use AI tools while learning?",
      a: "AI tools can help with explanations, drafts, debugging, ideas, and review, but you remain responsible for verification, understanding, originality, privacy, and the final result.",
    },
    {
      q: "How is this page optimized for search and AI answers?",
      a: "It uses a direct answer, descriptive headings, visible FAQs, structured steps, entity context, internal links, and matching structured data. These features improve clarity but do not guarantee rankings or citations.",
    },
    {
      q: "Does structured data guarantee a rich result?",
      a: "No. Structured data helps machines interpret visible content, but search engines decide eligibility and presentation. It should accurately represent what users can see on the page.",
    },
    {
      q: "How often should this learning guide be updated?",
      a: "Update it when the role, tools, standards, recommended workflow, important facts, or linked resources materially change. Cosmetic rebuilds alone should not change the modified date.",
    },
    {
      q: "What should I do after reading this page?",
      a: "Choose one small project, write a brief, complete the first step, save the result, and review it against a written checklist before moving to advanced topics.",
    },
  ];
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return skillsData.map((skill) => ({ skill: skill.slug }));
}

export function generateMetadata({ params }: { params: { skill: string } }): Metadata {
  const skill = getSkill(params.skill);
  if (!skill) {
    return {
      title: "Skill Page Not Found",
      description: "The requested Sikhadenge skill page is not available.",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `${BASE_URL}/${skill.slug}`;
  const description = `Learn how to become a ${skill.title} through fundamentals, focused practice, real projects, review, and portfolio evidence. ${skill.description}`;

  return {
    title: `How to Become a ${skill.title}`,
    description,
    alternates: { canonical },
    authors: [{ name: "Sikhadenge Editorial Team", url: `${BASE_URL}/authors/sikhadenge-editorial-team` }],
    openGraph: {
      type: "article",
      url: canonical,
      siteName: "Sikhadenge",
      title: `How to Become a ${skill.title}`,
      description,
      publishedTime: RELEASE_DATE_ISO,
      modifiedTime: RELEASE_DATE_ISO,
      images: [
        {
          url: `${BASE_URL}/images/og/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: `How to become a ${skill.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `How to Become a ${skill.title}`,
      description,
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

export default function SkillPage({ params }: { params: { skill: string } }) {
  const skill = getSkill(params.skill);
  if (!skill) notFound();

  const canonical = `${BASE_URL}/${skill.slug}`;
  const description = `Learn how to become a ${skill.title} through fundamentals, focused practice, real projects, review, and portfolio evidence. ${skill.description}`;
  const answer = `To become a ${skill.title}, learn the essential concepts, practice one capability at a time, complete a realistic project, revise it using feedback, and publish a case study that explains your process and result. Tool knowledge alone is not enough; professional capability requires judgment, verification, communication, and consistent delivery.`;
  const faqs = buildFaqs(skill.title, skill.category);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        "@id": `${canonical}#learning-resource`,
        name: `How to Become a ${skill.title}`,
        description,
        url: canonical,
        inLanguage: "en-IN",
        educationalUse: "Professional development",
        learningResourceType: "Career and skills guide",
        teaches: skill.skills,
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
          { "@type": "ListItem", position: 2, name: skill.title, item: canonical },
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
          { href: `/${skill.slug}`, label: skill.title },
        ]}
        eyebrow={`${skill.category} career guide`}
        title={`How to Become a ${skill.title}`}
        description={description}
        badges={[skill.category, `${skill.skills.length} core capabilities`, `Updated ${RELEASE_DATE_LABEL}`]}
        answerTitle={`What is the practical path to becoming a ${skill.title}?`}
        answer={answer}
        highlights={buildHighlights(skill.title, skill.skills)}
        steps={buildSteps(skill.title)}
        tools={buildTools(skill.title)}
        mistakes={[
          "Learning tools without understanding the problem, workflow, or quality standard behind the role.",
          "Watching tutorials continuously without completing reviewable projects.",
          "Copying portfolio work without explaining your own contribution and decisions.",
          "Using AI-generated output without verification, understanding, privacy checks, or revision.",
          "Making guaranteed salary, placement, certification, or career claims without verifiable evidence.",
          "Trying to master every tool before completing one useful end-to-end workflow.",
        ]}
        faqs={faqs}
        relatedLinks={[
          { href: "/blog", label: "Practical learning guides", description: "Explore related tools, workflows, and career topics." },
          { href: "/ai-expert", label: "AI Expert pathway", description: "Review the main Sikhadenge AI learning program." },
          { href: "/about-us", label: "About Sikhadenge", description: "Understand the platform and its outcome-focused approach." },
          { href: "/contact-us", label: "Contact and admissions", description: "Ask for current course and support details." },
        ]}
        updatedAt={RELEASE_DATE_LABEL}
        primaryCta={{ href: "/gen-ai-masterclass/register-one-step", label: "Join the free masterclass" }}
        secondaryCta={{ href: "/contact-us", label: "Ask Sikhadenge" }}
      />
    </>
  );
}
