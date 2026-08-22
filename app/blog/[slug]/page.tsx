import React from "react";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Compass,
  DollarSign,
  GraduationCap,
  LayoutGrid,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wand2,
} from "lucide-react";

type BlogFaq = { q: string; a: string };
type BlogItem = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  intro?: string;
  summaryPoints?: string[];
  practicalSteps?: string[];
  mistakes?: string[];
  faqs?: BlogFaq[];
};

type ParsedSlug = {
  slug: string;
  segments: string[];
  year: string;
  audience: string;
  audienceLabel: string;
  skill: string;
  skillLabel: string;
  primaryIntent: string;
  intentLabel: string;
  keywordCluster: string[];
};

const BASE_URL = "https://sikhadenge.in";

const audienceMap: Record<string, string> = {
  students: "Students",
  student: "Students",
  college: "Students",
  beginners: "Beginners",
  beginner: "Beginners",
  freelancers: "Freelancers",
  freelancer: "Freelancers",
  professionals: "Working Professionals",
  professional: "Working Professionals",
  marketers: "Marketers",
  marketer: "Marketers",
  developers: "Developers",
  developer: "Developers",
  teachers: "Teachers",
  teacher: "Teachers",
  business: "Business Owners",
  businesses: "Business Owners",
  founders: "Founders",
  founder: "Founders",
  creators: "Creators",
  creator: "Creators",
  youtubers: "Creators",
  youtuber: "Creators",
  agencies: "Agencies",
  agency: "Agencies",
  designers: "Designers",
  designer: "Designers",
  job: "Job Seekers",
  jobs: "Job Seekers",
  seekers: "Job Seekers",
};

const skillMap: Record<string, string> = {
  chatgpt: "ChatGPT",
  gemini: "Google Gemini",
  claude: "Claude",
  prompt: "Prompt Engineering",
  prompts: "Prompt Engineering",
  seo: "SEO",
  ai: "AI Skills",
  automation: "Business Automation",
  marketing: "AI Marketing",
  content: "AI Content Creation",
  writing: "AI Content Creation",
  coding: "AI Coding",
  code: "AI Coding",
  graphic: "AI Graphic Design",
  design: "AI Graphic Design",
  generative: "Generative AI",
};

const intentMap: Record<string, string> = {
  benefits: "benefits",
  examples: "examples",
  trends: "trends",
  workflow: "workflow",
  automation: "workflow",
  case: "case-studies",
  studies: "case-studies",
  guide: "guide",
  complete: "guide",
  essential: "skills",
  skills: "skills",
  career: "career",
  options: "career",
  earn: "earning",
  money: "earning",
  tools: "tools",
};

const skillCategoryMap: Record<string, string> = {
  ChatGPT: "ChatGPT",
  "Google Gemini": "AI Tools",
  Claude: "Prompt Engineering",
  "Prompt Engineering": "Prompt Engineering",
  SEO: "AI Marketing",
  "AI Skills": "AI Skills",
  "Business Automation": "AI Freelancing",
  "AI Marketing": "AI Marketing",
  "AI Content Creation": "AI Content Creation",
  "AI Coding": "AI Coding",
  "AI Graphic Design": "AI Graphic Design",
  "Generative AI": "AI Skills",
};

const categoryTools: Record<
  string,
  { name: string; desc: string; free: boolean; badge: string }[]
> = {
  "AI Skills": [
    { name: "ChatGPT", desc: "Research, answers, drafts, and learning support for daily AI work.", free: true, badge: "Free" },
    { name: "Google Gemini", desc: "Multi-modal AI for text, image, code, and productivity workflows.", free: true, badge: "Free" },
    { name: "Notion AI", desc: "Planning, summaries, notes, and knowledge organization.", free: true, badge: "Free" },
    { name: "Coursera AI Courses", desc: "Structured courses for stronger fundamentals and certification value.", free: false, badge: "Paid" },
  ],
  "AI Tools": [
    { name: "Google Gemini", desc: "Fast everyday assistant for writing, research, and multimodal use.", free: true, badge: "Free" },
    { name: "Claude", desc: "Long-form reasoning, summaries, and document-heavy work.", free: true, badge: "Free" },
    { name: "ChatGPT Plus", desc: "Advanced reasoning, GPTs, and stronger workflow flexibility.", free: false, badge: "Paid" },
    { name: "Gamma", desc: "Quick deck creation and business presentation support.", free: true, badge: "Free" },
  ],
  ChatGPT: [
    { name: "ChatGPT Free", desc: "Good starting point for prompts, summaries, research, and daily practice.", free: true, badge: "Free" },
    { name: "ChatGPT Plus", desc: "Better reasoning and more reliable output for serious users.", free: false, badge: "Paid" },
    { name: "Custom GPTs", desc: "Task-specific assistants for repeatable workflows and support.", free: true, badge: "Free" },
    { name: "OpenAI API", desc: "Useful when businesses want AI inside apps or automations.", free: false, badge: "Paid" },
  ],
  "AI Freelancing": [
    { name: "Upwork", desc: "High-intent freelance demand across AI writing, support, and automation.", free: true, badge: "Free" },
    { name: "Fiverr", desc: "Fast gig marketplace for AI services and lightweight delivery offers.", free: true, badge: "Free" },
    { name: "ChatGPT", desc: "Speeds up proposals, drafts, delivery systems, and client communication.", free: true, badge: "Free" },
    { name: "Jasper", desc: "Helpful when content production volume matters more than low cost.", free: false, badge: "Paid" },
  ],
  "AI Content Creation": [
    { name: "ChatGPT", desc: "Idea generation, outlines, captions, scripts, and editing support.", free: true, badge: "Free" },
    { name: "Canva", desc: "Social creatives, design tasks, and presentation support.", free: true, badge: "Free" },
    { name: "CapCut", desc: "Fast editing, repurposing, and short-form content production.", free: true, badge: "Free" },
    { name: "Opus Clip", desc: "Long-form to short-form repurposing for creators and agencies.", free: true, badge: "Free" },
  ],
  "AI Graphic Design": [
    { name: "Canva", desc: "Quick visual production for creators, students, and businesses.", free: true, badge: "Free" },
    { name: "Adobe Firefly", desc: "Professional visual generation inside Adobe workflows.", free: true, badge: "Free" },
    { name: "Midjourney", desc: "High-quality concept visuals and creative ideation.", free: false, badge: "Paid" },
    { name: "Figma AI", desc: "Helpful for UI flows, UX drafts, and fast concept work.", free: true, badge: "Free" },
  ],
  "AI Marketing": [
    { name: "ChatGPT", desc: "Ad copy, messaging, campaign angles, and analysis support.", free: true, badge: "Free" },
    { name: "Gemini", desc: "Broad research and multi-format idea support for marketing teams.", free: true, badge: "Free" },
    { name: "Canva", desc: "Ad creatives, simple landing assets, and promotional visuals.", free: true, badge: "Free" },
    { name: "HubSpot AI", desc: "Useful for CRM-heavy teams and pipeline-assisted automation.", free: true, badge: "Free" },
  ],
  "Prompt Engineering": [
    { name: "ChatGPT", desc: "Best everyday prompt testing and structured iteration environment.", free: true, badge: "Free" },
    { name: "Claude", desc: "Strong for longer prompts, reasoning, and document-based work.", free: true, badge: "Free" },
    { name: "FlowGPT", desc: "Prompt examples and community discovery for inspiration.", free: true, badge: "Free" },
    { name: "PromptPerfect", desc: "Useful when prompt cleanup and optimization matter.", free: true, badge: "Free" },
  ],
  "AI Coding": [
    { name: "GitHub Copilot", desc: "Inline code support and daily engineering productivity.", free: false, badge: "Paid" },
    { name: "Cursor", desc: "AI-first coding editor for debugging, refactors, and flow.", free: true, badge: "Free" },
    { name: "ChatGPT", desc: "Code explanation, debugging support, and learning workflows.", free: true, badge: "Free" },
    { name: "Replit AI", desc: "Fast browser-based experimentation for prototypes.", free: true, badge: "Free" },
  ],
};

function getBlogs(): BlogItem[] {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "blogs.json"), "utf8"),
    ) as BlogItem[];
  } catch {
    return [];
  }
}

function titleCase(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseSlug(slug: string, post?: BlogItem): ParsedSlug {
  const slugLower = slug.toLowerCase();
  const segments = slugLower.split("-").filter(Boolean);
  const year = segments.find((segment) => /^\d{4}$/.test(segment)) ?? "2026";

  const audienceKey =
    segments.find((segment) => audienceMap[segment]) ?? "professionals";
  const skillKey =
    segments.find((segment) => skillMap[segment]) ??
    post?.category?.toLowerCase().split(" ")[0] ??
    "ai";
  const intentKey =
    segments.find((segment) => intentMap[segment]) ?? "guide";

  const skillLabel = skillMap[skillKey] ?? post?.category ?? "AI Skills";
  const audienceLabel = audienceMap[audienceKey] ?? "Working Professionals";
  const intentLabel = intentMap[intentKey] ?? "guide";

  const keywordCluster = [
    skillLabel,
    `${skillLabel} ${intentLabel}`,
    `${skillLabel} for ${audienceLabel}`,
    `${skillLabel} in ${year}`,
    `${skillLabel} SEO`,
    `${skillLabel} AEO`,
    `${skillLabel} GEO`,
    `Sikhadenge ${skillLabel}`,
  ];

  return {
    slug,
    segments,
    year,
    audience: audienceKey,
    audienceLabel,
    skill: skillKey,
    skillLabel,
    primaryIntent: intentKey,
    intentLabel,
    keywordCluster,
  };
}

function buildHeadline(parsed: ParsedSlug) {
  const intentTitles: Record<string, string> = {
    benefits: `Benefits of ${parsed.skillLabel} for ${parsed.audienceLabel} in ${parsed.year}`,
    examples: `Examples of ${parsed.skillLabel} for ${parsed.audienceLabel} in ${parsed.year}`,
    trends: `Trends in ${parsed.skillLabel} for ${parsed.audienceLabel} in ${parsed.year}`,
    workflow: `${parsed.skillLabel} Workflow Guide for ${parsed.audienceLabel} in ${parsed.year}`,
    "case-studies": `Case Studies in ${parsed.skillLabel} for ${parsed.audienceLabel}`,
    guide: `Complete Guide to ${parsed.skillLabel} for ${parsed.audienceLabel} in ${parsed.year}`,
    skills: `Essential Skills for ${parsed.skillLabel} for ${parsed.audienceLabel} in ${parsed.year}`,
    career: `Career Options in ${parsed.skillLabel} for ${parsed.audienceLabel} in ${parsed.year}`,
    earning: `How to Earn with ${parsed.skillLabel} for ${parsed.audienceLabel} in ${parsed.year}`,
    tools: `Top ${parsed.skillLabel} Tools for ${parsed.audienceLabel} in ${parsed.year}`,
  };

  return intentTitles[parsed.intentLabel] ??
    `${titleCase(parsed.slug)} in ${parsed.year}`;
}

function buildDescription(parsed: ParsedSlug) {
  return `${buildHeadline(parsed)}. Practical Sikhadenge guide with SEO, AEO, GEO-aligned answers, tools, learning path, workflow tips, mistakes to avoid, and lead-ready action steps for ${parsed.audienceLabel.toLowerCase()}.`;
}

function buildIntro(parsed: ParsedSlug) {
  return `${parsed.skillLabel} ${parsed.audienceLabel.toLowerCase()} ke liye ${parsed.year} me aur bhi important ho raha hai, kyunki search demand, AI adoption, productivity pressure, aur digital competition sab saath me badh rahe hain. Is guide me hum practical level par dekhenge ki ${parsed.skillLabel} ko kaise seekhna, use karna, monetize karna, aur better results ke liye system me convert karna chahiye.`;
}

function buildSummaryPoints(parsed: ParsedSlug) {
  return [
    `${parsed.skillLabel} ka practical roadmap ${parsed.audienceLabel.toLowerCase()} ke context me samajhna`,
    `Best tools, prompts, ya workflows choose karna without confusion`,
    `SEO, AEO, GEO, learning, earning, aur execution ko ek page me connect karna`,
  ];
}

function buildPracticalSteps(parsed: ParsedSlug) {
  return [
    `${parsed.skillLabel} ka clear use-case choose karo jo ${parsed.audienceLabel.toLowerCase()} ke liye immediately relevant ho`,
    `Ek primary tool aur ek repeatable workflow select karo, phir daily small practice routine banao`,
    `Real-world outputs banao jaise proposals, content drafts, automations, prompts, ya portfolio examples`,
    `Apne work ko measure karo: speed, quality, conversions, leads, ya interview confidence me kya improvement aaya`,
  ];
}

function buildStepDetails(parsed: ParsedSlug) {
  return [
    `Sabse pehle clarity lao. Aapka goal learning hai, freelancing hai, jobs hai, ya business output? Jab goal clear hota hai tab ${parsed.skillLabel} random tool nahi rehta, ek productive system ban jata hai.`,
    `Too many tools try karne ke bajay ek focused stack banao. Daily practice se prompts, outputs, aur review quality improve hoti hai. Isi stage par aapka execution edge build hota hai.`,
    `Small projects hi best proof hote hain. Students ke liye assignments aur interview prep, freelancers ke liye client assets, aur businesses ke liye SOPs ya sales copy jaise outputs strong proof create karte hain.`,
    `Akhri step optimization ka hai. Jo cheez kaam kar rahi hai use document karo, templates banao, aur usi ko better conversion, better search relevance, aur better delivery ke liye scale karo.`,
  ];
}

function buildMistakes(parsed: ParsedSlug) {
  return [
    `${parsed.skillLabel} ko sirf trend samajhkar bina workflow ke use karna`,
    `Har output ko final maan lena aur human review skip karna`,
    `Prompt quality aur context clarity ko ignore karna`,
    `Search intent, audience need, aur conversion goal ko mix up kar dena`,
  ];
}

function buildFaqs(parsed: ParsedSlug, title: string) {
  return [
    {
      q: `${title} ke liye sabse pehla practical step kya hai?`,
      a: `Sabse pehle ek clear use-case choose karo. ${parsed.skillLabel} tab best kaam karta hai jab task, audience, output format, aur goal clearly defined ho.`,
    },
    {
      q: `${parsed.skillLabel} SEO, AEO, aur GEO me kaise help karta hai?`,
      a: `${parsed.skillLabel} better topic coverage, answer blocks, FAQs, semantic relevance, workflow speed, aur structured drafts me help karta hai. Isse search-friendly aur AI-answer-friendly content banana easy hota hai.`,
    },
    {
      q: `Kya ${parsed.audienceLabel.toLowerCase()} ${parsed.skillLabel} se real earning ya growth paa sakte hain?`,
      a: `Haan. Ye jobs, freelancing, business systems, productivity, aur communication quality me direct impact la sakta hai jab aap isse repeatable workflow ke roop me use karte ho.`,
    },
    {
      q: `Beginners ke liye ${parsed.skillLabel} seekhne ka sahi tareeka kya hai?`,
      a: `Basics samjho, ek tool par focus karo, daily practice karo, aur small proof-of-work banao. Theory se zyada implementation par dhyan do.`,
    },
    {
      q: `Kya ye page sirf keyword ke liye hai ya practical bhi hai?`,
      a: `Ye page keyword-rich hai, lekin structure, answers, tools, mistakes, CTA, aur practical learning path sab isliye rakhe gaye hain taaki page genuinely useful lage aur fake doorway na lage.`,
    },
  ];
}

function getDeepContent(parsed: ParsedSlug) {
  return {
    whyMatters: `${parsed.year} me ${parsed.skillLabel} ka importance isliye badh raha hai kyunki companies, freelancers, creators, aur students sab faster output aur smarter execution chahte hain. Jo log ${parsed.skillLabel} ko practical level par use kar pa rahe hain unhe search visibility, content speed, problem solving, aur delivery quality me edge mil raha hai. Isi wajah se is topic par search volume aur commercial intent dono strong bane hue hain.`,
    marketStats: `${parsed.skillLabel} se related demand India me rapidly increase ho rahi hai. Businesses ko AI-assisted communication, marketing, workflow support, automation, and research help chahiye. Ye category sirf trend nahi, ek durable capability ban rahi hai jahan early movers better positioning le rahe hain.`,
    futureScope: `Aane wale 2-4 saal me ${parsed.skillLabel} literacy waise hi important hogi jaise aaj spreadsheet, content, ya digital tools ki basic understanding hai. Jo log abhi se systems, prompts, review habits, aur practical execution seekhenge unke paas future-ready advantage hoga.`,
    earnings: `${parsed.skillLabel} directly side-income, freelancing, team productivity, aur role expansion me help kar sakta hai. Students interviews me stronger answers de sakte hain, freelancers faster delivery kar sakte hain, aur business owners internal processes ko lean bana sakte hain.`,
  };
}

function buildKeywordList(parsed: ParsedSlug, title: string) {
  return [
    title,
    parsed.skillLabel,
    `${parsed.skillLabel} ${parsed.year}`,
    `${parsed.skillLabel} for ${parsed.audienceLabel}`,
    `${parsed.skillLabel} prompts`,
    `${parsed.skillLabel} tools`,
    `${parsed.skillLabel} workflow`,
    `${parsed.skillLabel} SEO`,
    `${parsed.skillLabel} AEO`,
    `${parsed.skillLabel} GEO`,
    `Sikhadenge ${parsed.skillLabel}`,
    `${parsed.skillLabel} guide`,
    `${parsed.skillLabel} tutorial`,
    `${parsed.skillLabel} examples`,
    `${parsed.skillLabel} use cases`,
  ];
}

export async function generateStaticParams() {
  return getBlogs()
    .slice(0, 500)
    .map((post) => ({ slug: post.slug }));
}

export const dynamicParams = true;
export const revalidate = 2592000;

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const post = getBlogs().find((item) => item.slug === params.slug);
  const parsed = parseSlug(params.slug, post);
  const title = post?.title || buildHeadline(parsed);
  const description = post?.excerpt || buildDescription(parsed);
  const keywords = buildKeywordList(parsed, title);
  const canonical = `${BASE_URL}/blog/${params.slug}`;

  return {
    title: `${title} | Sikhadenge`,
    description,
    keywords,
    alternates: { canonical },
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
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      siteName: "Sikhadenge",
      images: [
        {
          url: `${BASE_URL}/images/courses/ai-mastery-design-editing-cover.webp`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/images/courses/ai-mastery-design-editing-cover.webp`],
    },
  };
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const allBlogs = getBlogs();
  const post = allBlogs.find((item) => item.slug === params.slug);
  const parsed = parseSlug(params.slug, post);
  const title = post?.title || buildHeadline(parsed);
  const category = post?.category || skillCategoryMap[parsed.skillLabel] || "AI Skills";
  const readTime = post?.readTime || "8 min read";
  const intro = post?.intro || buildIntro(parsed);
  const summaryPoints = post?.summaryPoints || buildSummaryPoints(parsed);
  const practicalSteps = post?.practicalSteps || buildPracticalSteps(parsed);
  const mistakes = post?.mistakes || buildMistakes(parsed);
  const faqs = post?.faqs || buildFaqs(parsed, title);
  const deepContent = getDeepContent(parsed);
  const tools = categoryTools[category] || categoryTools["AI Skills"];
  const stepDetails = buildStepDetails(parsed);
  const stepTimelines = [
    "2-3 din clarity",
    "1 week repetition",
    "2-3 weeks practical proof",
    "Ongoing optimization",
  ];

  const relatedPosts = allBlogs
    .filter((item) => item.slug !== params.slug)
    .filter(
      (item) =>
        item.category === category ||
        item.slug.includes(parsed.skill) ||
        item.slug.includes(parsed.audience),
    )
    .slice(0, 6);

  const canonical = `${BASE_URL}/blog/${params.slug}`;
  const description = post?.excerpt || buildDescription(parsed);
  const keywordList = buildKeywordList(parsed, title);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: canonical,
    datePublished: "2026-01-01",
    dateModified: "2026-04-23",
    author: {
      "@type": "Organization",
      name: "Sikhadenge",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Sikhadenge",
      url: BASE_URL,
    },
    about: [
      parsed.skillLabel,
      parsed.audienceLabel,
      "SEO",
      "AEO",
      "GEO",
      "AI workflows",
    ],
    keywords: keywordList.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="min-h-screen bg-[#eff4fb] text-slate-900">
        <header className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(87,120,255,0.22),transparent_34%),linear-gradient(135deg,#142457_0%,#1d3180_50%,#142457_100%)] pt-28 pb-20">
          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,_white_1px,_transparent_1px)] [background-size:18px_18px]" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/85">
                {category}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Clock3 className="h-4 w-4" />
                {readTime}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                For {parsed.audienceLabel}
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-blue-50/85 sm:text-lg">
              {intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {keywordList.slice(0, 6).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold text-white/85"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass/register-one-step"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-black text-[#17306d] shadow-xl transition hover:bg-slate-100"
              >
                Join Free Masterclass
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                Talk to Team
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Search-ready structure",
                  detail: "SEO, AEO, GEO aligned layout with clear answers and strong intent mapping.",
                  icon: Search,
                },
                {
                  label: "Practical learning focus",
                  detail: "Outputs, prompts, workflows, and mistakes to avoid instead of only theory.",
                  icon: Sparkles,
                },
                {
                  label: "Lead-generation angle",
                  detail: "Sales-ready CTA blocks and decision support for high-intent users.",
                  icon: ShieldCheck,
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-[24px] border border-white/10 bg-white/8 p-5 backdrop-blur"
                >
                  <card.icon className="h-5 w-5 text-blue-200" />
                  <h2 className="mt-3 text-lg font-extrabold text-white">
                    {card.label}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-blue-50/75">
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="mb-12 rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_2px_24px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3">
              <LayoutGrid className="h-5 w-5 text-blue-700" />
              <h2 className="text-xl font-black text-slate-900">Is guide me kya hai</h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "#why", label: "Ye kyu zaruri hai", icon: TrendingUp },
                { href: "#summary", label: "Kya seekhoge", icon: CheckCircle2 },
                { href: "#steps", label: "Step-by-step guide", icon: Compass },
                { href: "#tools", label: "Recommended tools", icon: Wand2 },
                { href: "#mistakes", label: "Common mistakes", icon: ShieldCheck },
                { href: "#market", label: "Market and earning", icon: DollarSign },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <item.icon className="h-4 w-4 text-blue-700" />
                  <span className="text-sm font-semibold text-slate-700">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </nav>

          <section id="why" className="mb-12 rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_2px_24px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-blue-700" />
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                  Section 01
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  Ye kyu zaruri hai
                </h2>
              </div>
            </div>
            <p className="mt-5 text-[15px] leading-8 text-slate-600">
              {deepContent.whyMatters}
            </p>
            <p className="mt-4 text-[15px] leading-8 text-slate-600">
              Is page ka goal sirf search traffic nahi hai. Iska goal hai
              intent ko samajhna, trust build karna, aur users ko practical
              next step tak le jaana. Isi wajah se content structure answer-first
              aur sales-aware rakha gaya hai.
            </p>
          </section>

          <section id="summary" className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
                  Section 02
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  Kya seekhoge
                </h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {summaryPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="steps" className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <Compass className="h-5 w-5 text-indigo-600" />
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">
                  Section 03
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  Step-by-step guide
                </h2>
              </div>
            </div>
            <div className="space-y-4">
              {practicalSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-5 rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
                >
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-black text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {step}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {stepDetails[index]}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                      <Clock3 className="h-3.5 w-3.5" />
                      {stepTimelines[index]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-[30px] bg-[linear-gradient(135deg,#2753d7_0%,#2444ac_100%)] p-8 text-white shadow-[0_24px_60px_rgba(39,83,215,0.2)] sm:p-10">
            <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white/85">
              Conversion Block
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight">
              Free AI Masterclass join karo
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-blue-50/85 sm:text-base">
              Agar aap {parsed.skillLabel} ko sirf samajhna nahi, balki real
              work me use karna chahte ho, to guided practice sabse fast path
              hota hai. Sikhadenge ka masterclass action-oriented learners ke
              liye bana hai.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass/register-one-step"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-black text-[#1f41a0] transition hover:bg-slate-100"
              >
                Register Free Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/15"
              >
                Talk to Team
              </Link>
            </div>
          </section>

          <section id="tools" className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <Wand2 className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
                  Section 04
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  Recommended tools
                </h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {tool.name}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {tool.desc}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] ${
                        tool.free
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {tool.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="mistakes" className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-rose-600" />
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-rose-600">
                  Section 05
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  Ye galtiyan mat karna
                </h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {mistakes.map((mistake) => (
                <div
                  key={mistake}
                  className="rounded-[24px] border border-rose-100 bg-rose-50 p-5"
                >
                  <p className="text-sm font-semibold leading-7 text-slate-700">
                    {mistake}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="market" className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
                  Section 06
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  Market and earning potential
                </h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Market demand
                </h3>
                <p className="mt-3 text-sm leading-8 text-slate-600">
                  {deepContent.marketStats}
                </p>
              </div>
              <div className="rounded-[24px] border border-blue-200 bg-blue-50 p-6">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Earning angle
                </h3>
                <p className="mt-3 text-sm leading-8 text-slate-600">
                  {deepContent.earnings}
                </p>
              </div>
              <div className="rounded-[24px] border border-violet-200 bg-violet-50 p-6 sm:col-span-2">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Future scope
                </h3>
                <p className="mt-3 text-sm leading-8 text-slate-600">
                  {deepContent.futureScope}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <CircleHelp className="h-5 w-5 text-slate-700" />
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Section 07
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  Frequently asked questions
                </h2>
              </div>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5">
                    <span className="text-left text-base font-bold text-slate-900">
                      {faq.q}
                    </span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180 group-open:text-blue-700" />
                  </summary>
                  <div className="border-t border-slate-100 px-6 py-5 text-sm leading-8 text-slate-600">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-[30px] bg-[linear-gradient(135deg,#111c3d_0%,#172856_100%)] p-8 text-white shadow-[0_24px_60px_rgba(17,28,61,0.24)] sm:p-10">
            <h2 className="max-w-3xl text-3xl font-black tracking-tight">
              Sikhadenge ke saath practical AI journey shuru karo
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-200 sm:text-base">
              Agar aapka goal jobs, freelancing, business growth, ya better
              digital execution hai, to practical systems hi long-term value dete
              hain. Sikhadenge isi gap ko solve karta hai.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass/register-one-step"
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-6 py-4 text-sm font-black text-white transition hover:bg-blue-600"
              >
                Join Practical AI Masterclass
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/15"
              >
                Explore Courses
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Students", icon: GraduationCap },
                { label: "Freelancers", icon: Briefcase },
                { label: "Professionals", icon: TrendingUp },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[20px] border border-white/10 bg-white/8 p-5 backdrop-blur"
                >
                  <item.icon className="h-5 w-5 text-blue-200" />
                  <div className="mt-3 text-sm font-bold text-white">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {relatedPosts.length > 0 && (
            <section className="mb-6">
              <div className="mb-5 flex items-center gap-3">
                <LayoutGrid className="h-5 w-5 text-blue-700" />
                <h2 className="text-2xl font-black text-slate-900">
                  Related articles
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                  >
                    <span className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                      {item.category || "AI Skills"}
                    </span>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 transition group-hover:text-blue-700">
                      {item.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
