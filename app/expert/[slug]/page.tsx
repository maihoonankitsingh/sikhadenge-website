export const dynamicParams = true;
export const revalidate = 2592000;

import generatedPages from "../../../data/generated-seo-merged.json";
import { notFound } from "next/navigation";
import {
  BookOpen,
  ChevronDown,
  Compass,
  Layers3,
  Lightbulb,
  MapPinned,
  Rocket,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

type GeneratedPage = {
  slug: string;
  title?: string;
  description?: string;
  skill?: string;
  city?: string;
  industry?: string;
  familyKey?: string;
  rootSlug?: string;
  pageKind?: string;
  relatedFamilies?: string[];
  dynamicValues?: {
    audience?: string;
    city?: string;
    location?: string;
    usecase?: string;
    modifier?: string;
  };
};


const LIMITED_EXPERT_SLUGS = [
  "ai-tools",
  "graphic-design",
  "video-editing",
  "digital-marketing",
  "seo",
  "copywriting",
  "content-writing",
  "web-development",
  "no-code-development",
  "personal-branding",
  "freelancing",
  "motion-graphics",
  "after-effects",
  "premiere-pro",
  "branding-design",
  "logo-design",
  "typography-design",
  "color-theory",
  "ui-design",
  "ux-design",
  "creator-economy",
  "frontend-development",
  "backend-development",
  "full-stack-development",
  "coding",
  "python",
  "app-development",
  "remote-jobs",
  "online-business",
  "corporate-ai-training",
  "client-work",
  "graphic-design-career",
  "video-editing-career",
  "digital-marketing-career",
  "social-media-marketing",
  "performance-marketing",
  "email-marketing",
  "content-marketing",
  "youtube-growth",
  "instagram-growth",
  "linkedin-personal-branding",
  "sales",
  "consulting",
  "business-operations",
  "customer-support",
  "ecommerce",
  "ai-for-education",
  "ai-for-agencies",
  "ai-for-small-business",
  "ai-for-startups",
  "ai-for-creators"
];

export async function generateStaticParams() {
  return [];
}


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = (generatedPages as GeneratedPage[]).find((item) => item.slug === params.slug);

  if (!page) {
    return {
      title: "Expert Page Not Found | Sikhadenge",
      description: "The requested expert page could not be found.",
    };
  }

  return {
    title: page.title || "Expert Guide | Sikhadenge",
    description:
      page.description ||
      "Premium expert guide by Sikhadenge with practical structure for SEO, AEO, GEO, and modern digital work.",
  };
}

function safeText(value?: string, fallback: string = "India") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function labelFromSlug(value: string) {
  return value.replace(/-/g, " ");
}

function labelFromAudience(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ExpertDetailPage({ params }: { params: { slug: string } }) {
  const generatedPage = (generatedPages as GeneratedPage[]).find((item) => item.slug === params.slug);

  if (!generatedPage) {
    notFound();
  }

  const title = generatedPage.title || "Expert Guide";
  const description =
    generatedPage.description ||
    "Premium expert guide by Sikhadenge for practical growth, execution, and long-term authority.";

  const topic =
    generatedPage.skill ||
    generatedPage.title?.replace(/\s+\|\s+Sikhadenge$/, "") ||
    generatedPage.familyKey ||
    "AI Skill";

  const pageKind = safeText(generatedPage.pageKind, "guide");
  const familyKey = safeText(generatedPage.familyKey, generatedPage.rootSlug || "expert");
  const rootSlug = safeText(generatedPage.rootSlug, familyKey);
  const audience = safeText(generatedPage.dynamicValues?.audience, "beginners");
  const city = safeText(
    generatedPage.dynamicValues?.city ||
      generatedPage.dynamicValues?.location ||
      generatedPage.city,
    "India"
  );
  const usecase = safeText(generatedPage.dynamicValues?.usecase, "practical work");
  const modifier = safeText(generatedPage.dynamicValues?.modifier, "practical growth");

  const relatedFamilies = Array.isArray(generatedPage.relatedFamilies)
    ? generatedPage.relatedFamilies.slice(0, 8)
    : [];

  const relatedTopicLinks = [
    rootSlug,
    ...relatedFamilies,
    familyKey,
    "ai-tools",
    "ai-skills",
    "ai-career",
    "make-money-with-ai",
  ]
    .filter(Boolean)
    .filter((value, index, arr) => arr.indexOf(value) === index)
    .slice(0, 8);

  const familyToneMap: Record<string, { angle: string; cta: string }> = {
    "ai-tools": {
      angle: "tool choice, practical workflows, and better execution speed",
      cta: "Use Sikhadenge to turn tool awareness into practical workflow quality and better output.",
    },
    "ai-skills": {
      angle: "capability building, portfolio strength, and long-term positioning",
      cta: "Use Sikhadenge to build structured skills that improve confidence, quality, and practical market relevance.",
    },
    "ai-career": {
      angle: "career clarity, role direction, and market-ready planning",
      cta: "Use Sikhadenge to move from confusion to a clearer, more practical AI career direction.",
    },
    "ai-jobs": {
      angle: "job readiness, role alignment, and practical competence",
      cta: "Build stronger job readiness with a practical structure that connects learning with execution.",
    },
    "ai-marketing": {
      angle: "growth systems, campaign execution, and better digital performance",
      cta: "Learn how to apply AI in marketing with practical systems that improve speed, quality, and decision making.",
    },
    "ai-automation": {
      angle: "workflow systems, leverage, and repeatable efficiency",
      cta: "Use Sikhadenge to convert automation ideas into real systems that improve execution and reduce friction.",
    },
    "prompt-engineering": {
      angle: "clear prompting, controllable outputs, and better AI execution",
      cta: "Learn prompt engineering as a practical control layer so tools become more reliable and useful.",
    },
    "make-money-with-ai": {
      angle: "earning structure, service positioning, and monetization pathways",
      cta: "Use Sikhadenge to connect AI learning with practical earning models and stronger service execution.",
    },
  };

  const familyTone =
    familyToneMap[familyKey] || {
      angle: "practical work, structured execution, and modern digital growth",
      cta: `Use Sikhadenge to connect ${topic} with practical execution, stronger capability, and long-term growth.`,
    };

  const audienceCtaMap: Record<string, string> = {
    students: `Build ${topic} as a future-ready advantage and turn learning into practical output early.`,
    freelancers: `Use ${topic} to improve delivery quality, client trust, and repeatable freelance execution.`,
    founders: `Use ${topic} to improve systems, decision quality, and scalable digital growth.`,
    marketers: `Apply ${topic} in campaigns, content, and performance workflows for stronger execution.`,
    designers: `Use ${topic} to improve creative speed, workflow quality, and practical output.`,
    creators: `Turn ${topic} into better content systems, stronger consistency, and smarter production.`,
    "working-professionals": `Use ${topic} to improve productivity, clarity, and practical work quality.`,
    "job-seekers": `Build job-ready proof with ${topic} through structured outputs and stronger positioning.`,
    beginners: `Start ${topic} with one clear workflow so learning becomes simple, practical, and repeatable.`,
  };

  const cityInsightMap: Record<string, string> = {
    delhi: `${topic} is highly relevant in Delhi because competition is high and practical capability matters for visibility, jobs, freelance work, and business execution.`,
    mumbai: `${topic} matters in Mumbai because speed, execution, and market positioning play a major role in creative, digital, and growth-focused work.`,
    bangalore: `${topic} is especially valuable in Bangalore because modern digital roles reward structured capability, systems thinking, and practical output.`,
    hyderabad: `${topic} supports strong growth in Hyderabad because more digital teams now value execution quality and workflow efficiency.`,
    pune: `${topic} is useful in Pune because students, freelancers, and professionals can use it to build stronger future-ready capability.`,
    chennai: `${topic} helps in Chennai by improving role relevance, practical output, and structured digital execution.`,
    kolkata: `${topic} can improve digital competitiveness in Kolkata by helping learners move from scattered effort to structured capability.`,
    ahmedabad: `${topic} is becoming more relevant in Ahmedabad as businesses and professionals look for faster, smarter digital execution.`,
    jaipur: `${topic} can create strong practical value in Jaipur for learners and freelancers who want modern digital growth.`,
    lucknow: `${topic} is useful in Lucknow because it helps bridge the gap between learning and practical market relevance.`,
  };

  const audienceSpecificCta =
    audienceCtaMap[(audience || "").toLowerCase().replace(/\s+/g, "-")] ||
    `Use ${topic} to build stronger execution, clarity, and practical digital growth.`;

  const citySpecificInsight =
    cityInsightMap[(city || "").toLowerCase().replace(/\s+/g, "-")] ||
    `${topic} becomes more powerful when it is applied with geo-aware relevance, practical workflows, and stronger market context in ${city}.`;

  const familyAwareFaqItems = [
    {
      q: `Why is ${topic} important beyond theory?`,
      a: `${topic} matters because it supports ${familyTone.angle}. That makes it useful in real work, not just interesting in theory.`,
    },
    {
      q: `What should ${audience} do first with ${topic}?`,
      a: `${audience} should begin with one practical use case, one output target, and one repeatable workflow so the topic becomes actionable quickly.`,
    },
    {
      q: `How does ${topic} become useful in ${city}?`,
      a: `It becomes useful when it is tied to the actual digital and work context of ${city}, where practical execution and clarity can improve positioning and outcomes.`,
    },
    {
      q: `What makes this expert page premium?`,
      a: `This page is designed to explain the topic, connect it with real use cases, map it to role relevance, and give structured action paths instead of staying generic.`,
    },
    {
      q: `Can ${topic} create long-term value?`,
      a: `Yes. When it is connected to repeatable execution, real output, and market relevance, ${topic} supports long-term capability rather than short-lived interest.`,
    },
    {
      q: `What should I do after reading this page?`,
      a: `Pick one use case, connect it with one workflow, and start turning the topic into proof of practical execution.`,
    },
    {
      q: `Why does this page connect ${topic} with SEO, AEO, and GEO?`,
      a: `Because premium authority pages work best when they combine search relevance, answerable structure, and geo-aware context.`,
    },
    {
      q: `What is the best next step with Sikhadenge?`,
      a: familyTone.cta,
    },
  ];

  const premiumSections = [
    {
      icon: Lightbulb,
      title: `Why ${topic} is important in real work`,
      paragraphs: [
        `${topic} matters because practical digital work today rewards clarity, speed, execution quality, and repeatable systems. A person who understands where this topic fits can improve decisions, output quality, workflow structure, and long-term positioning. This matters for students, freelancers, creators, job seekers, founders, and working professionals.`,
        `Most low-value pages stop at explanation. A stronger expert page should connect the topic with actual work, practical reality, and usable execution. That is where authority starts.`,
      ],
    },
    {
      icon: Target,
      title: `Who this expert page is useful for`,
      paragraphs: [
        `This page is useful for ${audience} because ${topic} can support better direction, stronger execution, and better positioning. A beginner can use it to reduce confusion. A freelancer can use it to improve delivery. A working professional can use it to improve productivity and output quality.`,
        `A premium page should support more than one intent. Some visitors want to learn. Some want to earn. Some want stronger systems. Some want market-ready clarity. This page is structured for that wider practical intent.`,
      ],
    },
    {
      icon: Compass,
      title: `How ${topic} supports SEO, AEO, and GEO`,
      paragraphs: [
        `From an SEO point of view, ${topic} becomes stronger when it is mapped to audience intent, practical relevance, and search phrasing. From an AEO point of view, the page becomes more useful when it clearly answers what the topic is, who it helps, and how it creates outcomes. From a GEO point of view, the page gets stronger when relevance is connected with ${city} and broader India demand.`,
        `That is why a premium expert page should combine clear explanation, role relevance, market context, and action direction together.`,
      ],
    },
    {
      icon: Workflow,
      title: `Practical use cases of ${topic}`,
      paragraphs: [
        `${topic} becomes far more useful when it is connected to actual use cases such as ${usecase}, structured delivery, better workflows, content systems, practical learning, and portfolio-oriented execution. Without context, the topic stays abstract. With context, it becomes usable.`,
        `This is one of the biggest differences between low-value pages and premium authority pages: premium pages connect explanation with execution.`,
      ],
    },
    {
      icon: Rocket,
      title: `Career and growth value of ${topic}`,
      paragraphs: [
        `A topic like ${topic} has real growth value because it influences how clearly a person can work, communicate capability, and create usable output. That improves positioning in interviews, freelance pitching, client delivery, portfolio building, and business execution.`,
        `For many users, the practical question is not whether the topic sounds important. The real question is whether it helps with earning, growth, confidence, or results. This page is structured to answer that clearly.`,
      ],
    },
    {
      icon: BookOpen,
      title: `A premium way to learn and apply ${topic}`,
      paragraphs: [
        `The strongest way to learn ${topic} is to begin with one clear use case, understand the workflow, create one practical output, and then repeat that process until quality improves. That is much better than trying to learn everything at once.`,
        `Once the basics are clear, the next step is to connect the topic with adjacent families such as tools, workflows, earning, content, marketing, design, or career growth. That is how the topic becomes part of a larger authority system.`,
      ],
    },
  ];

  const quickSummaryCards = [
    {
      icon: Layers3,
      title: "Is guide me kya hai",
      text: "Meaning, relevance, practical use cases, growth direction, FAQ, and next action path.",
    },
    {
      icon: MapPinned,
      title: "Geo relevance",
      text: `This page keeps ${city} context and broader India market relevance in mind.`,
    },
    {
      icon: Sparkles,
      title: "Quick summary",
      text: `${topic} is explained with workflow, execution, and practical growth angle.`,
    },
  ];

  const internalLinkGroups = [
    {
      title: "Core topic paths",
      links: relatedTopicLinks.slice(0, 4),
    },
    {
      title: "Growth paths",
      links: relatedTopicLinks.slice(2, 6),
    },
    {
      title: "Action paths",
      links: relatedTopicLinks.slice(4, 8),
    },
  ].filter((group) => group.links.length > 0);

  const premiumCtaTitle = `Build practical authority in ${topic}`;
  const premiumCtaText = `Sikhadenge focuses on structured, practical, execution-first learning so topics like ${topic} become useful for output, growth, freelance work, jobs, and long-term positioning.`;

  return (
    <main className="min-h-screen bg-[#F5F7FB] text-slate-900">
      <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#142C8E_0%,#1E3A8A_45%,#312E81_100%)]">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pt-24">
          <div className="max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                Premium expert root
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80">
                {pageKind}
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80">
                For {labelFromAudience(audience)}
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85">
                Audience: <span className="font-semibold text-[#F5B301]">{labelFromAudience(audience)}</span>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85">
                Location: <span className="font-semibold text-[#F5B301]">{city}</span>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85">
                Use case: <span className="font-semibold text-[#F5B301]">{usecase}</span>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85">
                Focus: <span className="font-semibold text-[#F5B301]">{modifier}</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/gen-ai-masterclass/register-one-step"
                className="inline-flex items-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-[0_10px_30px_rgba(255,255,255,0.18)] transition hover:translate-y-[-1px]"
              >
                Join Free Masterclass
              </a>
              <a
                href={`/${rootSlug}`}
                className="inline-flex items-center rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Explore Root Topic
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {quickSummaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8B5CF6_0%,#2563EB_100%)] text-white shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{card.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            {premiumSections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <section
                  key={section.title}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8B5CF6_0%,#2563EB_100%)] text-white shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex h-9 min-w-[42px] items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-xs font-bold text-blue-700">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-5">
                    {section.paragraphs.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-base leading-8 text-slate-600">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">Premium expert signals</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    Word target: 1500–1800
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    Structure: SEO + AEO + GEO aligned
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    Family: {familyKey}
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    Slug: {params.slug}
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">Related paths</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {relatedTopicLinks.map((slug) => (
                    <a
                      key={slug}
                      href={`/${slug}`}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {labelFromSlug(slug)}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">Action step</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Use this page as a premium expert map. Then connect the topic with one real use
                  case and one execution workflow so it becomes useful in actual work.
                </p>
                <a
                  href="/gen-ai-masterclass/register-one-step"
                  className="mt-5 inline-flex rounded-2xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.28)] transition hover:bg-[#1D4ED8]"
                >
                  Start with Sikhadenge
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8B5CF6_0%,#2563EB_100%)] text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Family angle: {familyTone.angle}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              City insight: {citySpecificInsight}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Audience action: {audienceSpecificCta}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {familyAwareFaqItems.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900">
                  <span>{faq.q}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-blue-600 transition duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 border-t border-slate-200 pt-3 text-sm leading-7 text-slate-600">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {internalLinkGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-900">{group.title}</h3>
              <div className="mt-4 space-y-3">
                {group.links.map((slug) => (
                  <a
                    key={slug}
                    href={`/${slug}`}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {labelFromSlug(slug)}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-[linear-gradient(135deg,#0B1F63_0%,#1E40AF_45%,#0F172A_100%)] p-8 shadow-[0_20px_60px_rgba(37,99,235,0.18)]">
          <h2 className="text-3xl font-black text-white">{premiumCtaTitle}</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-blue-100">
            {premiumCtaText}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/gen-ai-masterclass/register-one-step"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:translate-y-[-1px]"
            >
              Book Free Masterclass
            </a>
            <a
              href={`/${rootSlug}`}
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Explore More {topic}
            </a>
            <a
              href="/ai-skills"
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Explore AI Skills
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
