import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { skillsData } from "../../data/skillsData";
import {
  GeneratedPageLayout,
  type GeneratedHighlight,
} from "../../components/generated/GeneratedPageKit";
import {
  getAllGeneratedEntries,
  findGeneratedEntry,
  resolveFields,
  uniqueTitle,
  uniqueDescription,
  buildAnswer,
  buildHighlights,
  buildSteps,
  buildMistakes,
  buildFaqs,
  buildTools,
  buildJourney,
  buildUseCases,
  useCasesTitle,
  buildComparisonTable,
  buildIntroParagraph,
  buildClosingParagraph,
  buildTransitionToTakeaways,
  buildTransitionToSteps,
  buildRelatedSkillsTable,
  buildSiblingLinks,
  toTitle,
} from "../../lib/generatedSkillContent";
import { SITE_URL, organizationSchema, websiteSchema, breadcrumbSchema } from "../../lib/schema";

const RELEASE_DATE_ISO = "2026-07-28";
const RELEASE_DATE_LABEL = "July 28, 2026";

// ISR — top entries are pre-rendered at build time, the rest render on
// first request and are cached, matching the scale of the generated dataset.
export async function generateStaticParams() {
  const seen = new Set<string>();
  return [
    ...skillsData.map((skill) => ({ skill: skill.slug })),
    ...getAllGeneratedEntries().slice(0, 500).map((entry) => ({ skill: entry.slug })),
  ].filter(({ skill }) => {
    if (seen.has(skill)) return false;
    seen.add(skill);
    return true;
  });
}

export const dynamicParams = true;
export const revalidate = 86400;

function getPageData(slug: string) {
  const skillInfo = skillsData.find((item) => item.slug === slug);
  const entry = findGeneratedEntry(slug);
  if (!skillInfo && !entry) return null;

  const effectiveEntry = entry ?? {
    slug,
    title: skillInfo!.title,
    description: skillInfo!.description,
    topicLabel: skillInfo!.title,
  };

  const fields = resolveFields(effectiveEntry, slug);
  if (skillInfo) {
    fields.topic = skillInfo.title;
    fields.family = skillInfo.category;
  }

  return { skillInfo, entry: effectiveEntry, fields };
}

export function generateMetadata({ params }: { params: { skill: string } }): Metadata {
  const data = getPageData(params.skill);
  if (!data) {
    return { title: "Page Not Found", robots: { index: false, follow: false } };
  }

  const { entry, fields } = data;
  const title = uniqueTitle(entry, fields);
  const description = uniqueDescription(entry, fields);
  const url = `${SITE_URL}/${params.skill}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    authors: [{ name: "Sikhadenge Editorial Team", url: `${SITE_URL}/authors/sikhadenge-editorial-team` }],
    openGraph: {
      type: "article",
      url,
      siteName: "Sikhadenge",
      title,
      description,
      publishedTime: RELEASE_DATE_ISO,
      modifiedTime: RELEASE_DATE_ISO,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
  const data = getPageData(params.skill);
  if (!data) notFound();

  const { skillInfo, entry, fields } = data;
  const url = `${SITE_URL}/${params.skill}`;
  const title = uniqueTitle(entry, fields);
  const description = uniqueDescription(entry, fields);
  const answer = buildAnswer(fields);
  const introParagraph = buildIntroParagraph(fields);
  const closingParagraph = buildClosingParagraph(fields);
  const transitionToTakeaways = buildTransitionToTakeaways(fields);
  const transitionToSteps = buildTransitionToSteps(fields);
  const faqs = buildFaqs(fields);

  let highlights: GeneratedHighlight[] = buildHighlights(fields);
  if (skillInfo?.skills?.length) {
    const curated: GeneratedHighlight[] = skillInfo.skills.slice(0, 3).map((item, index) => ({
      title: item,
      description: `A core capability inside the ${skillInfo.title} learning path.`,
      icon: index % 2 === 0 ? "target" : "sparkles",
    }));
    highlights = [...curated, ...highlights].slice(0, 6);
  }

  const steps = buildSteps(fields);
  const mistakes = buildMistakes(fields);
  const tools = buildTools(fields);
  const journey = buildJourney(fields);
  const useCases = buildUseCases(fields);
  const comparisonTable = buildComparisonTable(fields);
  const secondaryTable = buildRelatedSkillsTable(entry, fields) ?? undefined;
  const { links: siblingLinks, title: siblingLinksTitle } = buildSiblingLinks(entry, fields);

  const badges = [
    fields.cityIsSpecific ? fields.city : "Online learning",
    "Practical roadmap",
    `Updated ${RELEASE_DATE_LABEL}`,
  ];

  const relatedFamilies = (entry.relatedFamilies || []).slice(0, 4);
  const relatedLinks = [
    ...relatedFamilies.map((familySlug) => ({
      href: `/${familySlug}`,
      label: toTitle(familySlug),
      description: `Explore the connected ${toTitle(familySlug)} guide.`,
    })),
    { href: "/best-ai-skills-to-learn", label: "AI skills", description: "Browse the broader AI skills roadmap." },
    { href: "/blog", label: "Practical guides", description: "Read answer-first learning articles and workflows." },
    { href: "/contact-us", label: "Contact Sikhadenge", description: "Ask for current program details and availability." },
  ].slice(0, 6);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      {
        "@type": "LearningResource",
        "@id": `${url}#learning-resource`,
        name: title,
        description,
        url,
        inLanguage: "en-IN",
        educationalUse: "Professional development",
        learningResourceType: "Practical learning guide",
        teaches: fields.topic,
        provider: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        dateModified: RELEASE_DATE_ISO,
        author: {
          "@type": "Organization",
          name: "Sikhadenge Editorial Team",
          url: `${SITE_URL}/authors/sikhadenge-editorial-team`,
        },
      },
      breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: fields.family || fields.topic, url },
      ]),
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
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
          { href: "/best-ai-skills-to-learn", label: "AI skills" },
          { href: `/${params.skill}`, label: title },
        ]}
        eyebrow={`${fields.topic} learning guide`}
        title={title}
        description={description}
        badges={badges}
        answerTitle={`What is the right way to approach ${fields.topic}?`}
        answer={answer}
        introParagraph={introParagraph}
        journey={journey}
        transitionToTakeaways={transitionToTakeaways}
        highlights={highlights}
        useCases={useCases}
        useCasesTitle={useCasesTitle(fields)}
        transitionToSteps={transitionToSteps}
        steps={steps}
        comparisonTable={comparisonTable}
        secondaryTable={secondaryTable}
        tools={tools}
        mistakes={mistakes}
        closingParagraph={closingParagraph}
        faqs={faqs}
        siblingLinks={siblingLinks}
        siblingLinksTitle={siblingLinksTitle}
        relatedLinks={relatedLinks}
        updatedAt={RELEASE_DATE_LABEL}
        primaryCta={{ href: "/gen-ai-masterclass/register-one-step", label: "Join the free masterclass" }}
        secondaryCta={{ href: "/contact-us", label: "Contact Sikhadenge" }}
        theme="light"
        iconStyle="3d"
      >
        {fields.cityIsSpecific ? (
          <section className="mb-14 rounded-3xl border border-[var(--gpk-border)] bg-[var(--gpk-card-bg)] p-6 sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gpk-gold-text)]">Location accuracy</div>
            <h2 className="mt-3 text-2xl font-extrabold">Location context without unsupported local claims</h2>
            <p className="mt-3 max-w-4xl text-sm leading-8 text-[var(--gpk-muted)] sm:text-base">
              This page uses <strong className="text-[var(--gpk-text)]">{fields.city}</strong> as a learning and search context. It does not claim a
              physical training center, guaranteed local batch, or city-specific placement unless Sikhadenge confirms that
              information on an official page.
            </p>
          </section>
        ) : (
          <section className="mb-14 rounded-3xl border border-[var(--gpk-border)] bg-[var(--gpk-card-bg)] p-6 sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gpk-gold-text)]">Source standard</div>
            <h2 className="mt-3 text-2xl font-extrabold">Verify changing facts at the primary source</h2>
            <p className="mt-3 max-w-4xl text-sm leading-8 text-[var(--gpk-muted)] sm:text-base">
              Tool features, prices, policies, and platform limits change. Prefer official provider documentation and other
              primary sources over secondhand summaries, and treat this page as a starting roadmap, not a substitute for
              verifying details before you commit time or money.
            </p>
          </section>
        )}
      </GeneratedPageLayout>
    </>
  );
}
