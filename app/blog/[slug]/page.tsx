import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  AlertTriangle,
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
import { getBlogBySlug, getBlogs, type BlogFaq, type BlogItem } from "@/lib/blogs";

type ParsedSlug = {
  slug: string;
  year: string;
  audienceLabel: string;
  skillLabel: string;
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
  founders: "Founders",
  creators: "Creators",
  creator: "Creators",
  designers: "Designers",
  designer: "Designers",
  job: "Job Seekers",
  jobs: "Job Seekers",
};

const skillMap: Record<string, string> = {
  chatgpt: "ChatGPT",
  gemini: "Google Gemini",
  claude: "Claude",
  prompt: "Prompt Engineering",
  prompts: "Prompt Engineering",
  seo: "SEO",
  ai: "AI Skills",
  automation: "AI Automation",
  marketing: "AI Marketing",
  content: "AI Content Creation",
  writing: "AI Writing",
  coding: "AI Coding",
  design: "AI Graphic Design",
  graphic: "AI Graphic Design",
  video: "AI Video Editing",
  freelance: "AI Freelancing",
  career: "AI Career",
};

const intentMap: Record<string, string> = {
  benefits: "Benefits",
  examples: "Examples",
  trends: "Trends",
  workflow: "Workflow",
  automation: "Workflow",
  case: "Case Studies",
  studies: "Case Studies",
  guide: "Guide",
  complete: "Guide",
  essential: "Skills",
  skills: "Skills",
  career: "Career",
  options: "Career",
  earn: "Earning",
  money: "Earning",
  tools: "Tools",
  how: "How To",
};

const categoryTools: Record<
  string,
  { name: string; desc: string; free: boolean; badge: string }[]
> = {
  "AI Skills": [
    { name: "ChatGPT", desc: "Research, drafts, answers, and daily AI learning support.", free: true, badge: "Free" },
    { name: "Google Gemini", desc: "Multi-modal AI for text, image, code, and productivity work.", free: true, badge: "Free" },
    { name: "Notion AI", desc: "Notes, planning, summaries, and knowledge organization.", free: true, badge: "Free" },
    { name: "Coursera AI Courses", desc: "Structured learning path for stronger fundamentals.", free: false, badge: "Paid" },
  ],
  "AI Tools": [
    { name: "ChatGPT", desc: "Fast idea generation, research, and output support.", free: true, badge: "Free" },
    { name: "Gemini", desc: "Broad multimodal assistance for study and work.", free: true, badge: "Free" },
    { name: "Claude", desc: "Long-form reasoning and document-focused work.", free: true, badge: "Free" },
    { name: "Canva", desc: "Visual content, presentations, and quick creative production.", free: true, badge: "Free" },
  ],
  ChatGPT: [
    { name: "ChatGPT Free", desc: "A practical entry point for prompts, answers, and daily execution.", free: true, badge: "Free" },
    { name: "ChatGPT Plus", desc: "Better reasoning and stronger reliability for serious users.", free: false, badge: "Paid" },
    { name: "Custom GPTs", desc: "Task-specific assistants for repeatable workflows.", free: true, badge: "Free" },
    { name: "OpenAI API", desc: "Useful when AI needs to be integrated in systems and tools.", free: false, badge: "Paid" },
  ],
  "AI Freelancing": [
    { name: "Upwork", desc: "High-intent freelance demand across AI content and workflow services.", free: true, badge: "Free" },
    { name: "Fiverr", desc: "Quick marketplace for lightweight AI service offers.", free: true, badge: "Free" },
    { name: "ChatGPT", desc: "Speeds up proposals, drafts, and delivery support.", free: true, badge: "Free" },
    { name: "Canva", desc: "Useful for delivery when clients need quick design support too.", free: true, badge: "Free" },
  ],
  "AI Content Creation": [
    { name: "ChatGPT", desc: "Ideas, outlines, scripts, captions, and editing support.", free: true, badge: "Free" },
    { name: "Canva", desc: "Fast creatives, carousels, and presentation outputs.", free: true, badge: "Free" },
    { name: "CapCut", desc: "Short-form editing and repurposing support.", free: true, badge: "Free" },
    { name: "Notion AI", desc: "Useful for planning content systems and drafts.", free: true, badge: "Free" },
  ],
  "AI Graphic Design": [
    { name: "Canva", desc: "Fast visual output for creators, businesses, and students.", free: true, badge: "Free" },
    { name: "Adobe Firefly", desc: "Professional AI visual generation for design workflows.", free: true, badge: "Free" },
    { name: "Midjourney", desc: "High-quality concept visuals and creative ideation.", free: false, badge: "Paid" },
    { name: "Figma", desc: "Helpful for UI flows and fast concept work.", free: true, badge: "Free" },
  ],
  "AI Marketing": [
    { name: "ChatGPT", desc: "Ad copy, messaging, ideas, and campaign support.", free: true, badge: "Free" },
    { name: "Gemini", desc: "Research, idea comparison, and broad support for teams.", free: true, badge: "Free" },
    { name: "Canva", desc: "Ad creatives, social assets, and quick visual production.", free: true, badge: "Free" },
    { name: "HubSpot AI", desc: "CRM-assisted marketing operations and automation support.", free: true, badge: "Free" },
  ],
  "Prompt Engineering": [
    { name: "ChatGPT", desc: "Best everyday environment for prompt testing and refinement.", free: true, badge: "Free" },
    { name: "Claude", desc: "Useful for longer prompts, detailed context, and reasoning.", free: true, badge: "Free" },
    { name: "FlowGPT", desc: "Prompt discovery and examples from community usage.", free: true, badge: "Free" },
    { name: "PromptPerfect", desc: "Helpful for optimizing prompt structure and clarity.", free: true, badge: "Free" },
  ],
  "AI Coding": [
    { name: "GitHub Copilot", desc: "Inline coding support for engineering productivity.", free: false, badge: "Paid" },
    { name: "Cursor", desc: "AI-first coding editor for refactors and debugging flow.", free: true, badge: "Free" },
    { name: "ChatGPT", desc: "Useful for learning, debugging, and code explanation.", free: true, badge: "Free" },
    { name: "Replit AI", desc: "Fast experimentation inside browser-based coding setups.", free: true, badge: "Free" },
  ],
};

function parseSlug(slug: string, post?: BlogItem): ParsedSlug {
  const segments = slug.toLowerCase().split("-").filter(Boolean);
  const year = segments.find((segment) => /^\d{4}$/.test(segment)) ?? "2026";

  const audienceKey = segments.find((segment) => audienceMap[segment]);
  const skillKey =
    segments.find((segment) => skillMap[segment]) ??
    post?.category?.toLowerCase().split(" ")[0] ??
    "ai";
  const intentKey = segments.find((segment) => intentMap[segment]) ?? "guide";

  const skillLabel = skillMap[skillKey] ?? post?.category ?? "AI Skills";
  const audienceLabel = audienceMap[audienceKey ?? ""] ?? "Working Professionals";
  const intentLabel = intentMap[intentKey] ?? "Guide";

  return {
    slug,
    year,
    audienceLabel,
    skillLabel,
    intentLabel,
    keywordCluster: [
      skillLabel,
      `${skillLabel} ${intentLabel}`,
      `${skillLabel} for ${audienceLabel}`,
      `${skillLabel} in ${year}`,
      `${skillLabel} SEO`,
      `${skillLabel} AEO`,
      `${skillLabel} GEO`,
      `Sikhadenge ${skillLabel}`,
    ],
  };
}

function normalizeCategory(category?: string) {
  if (!category) return "AI Skills";
  if (category === "ChatGPT Guide") return "ChatGPT";
  return category;
}

function getArticleTools(category?: string) {
  return categoryTools[normalizeCategory(category)] ?? categoryTools["AI Skills"];
}

export async function generateStaticParams() {
  return getBlogs()
    .slice(0, 1200)
    .map((post) => ({ slug: post.slug }));
}

export const dynamicParams = true;
export const revalidate = 604800;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog Article Not Found | Sikhadenge",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const parsed = parseSlug(params.slug, post);
  const title = post.title;
  const description =
    post.excerpt ||
    `${title} practical guide with tools, workflow, FAQs, earning angle, and execution clarity for ${parsed.audienceLabel.toLowerCase()}.`;

  return {
    title: `${title} | Sikhadenge`,
    description,
    alternates: {
      canonical: `${BASE_URL}/blog/${params.slug}`,
    },
    keywords: parsed.keywordCluster,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "article",
      url: `${BASE_URL}/blog/${params.slug}`,
      title,
      description,
      siteName: "Sikhadenge",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const allBlogs = getBlogs();
  const post = getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const parsed = parseSlug(params.slug, post);
  const title = post.title;
  const category = normalizeCategory(post.category);
  const readTime = post.readTime || "8 min read";
  const intro =
    post.intro ||
    `${title} ko practical angle se samajhna tab valuable hota hai jab aap isse real work, projects, learning systems, aur execution se connect karte ho. Is guide me step-by-step clarity milegi ki kya seekhna hai, kaise apply karna hai, aur kahaan mistakes avoid karni hain.`;

  const summaryPoints = post.summaryPoints || [
    `${parsed.skillLabel} ka clear use-case samajhna`,
    `Right tools, prompts, aur workflow choose karna`,
    `Execution aur earning angle ko practical tarike se dekhna`,
  ];

  const practicalSteps = post.practicalSteps || [
    "Sabse pehle use-case aur expected output clear karo.",
    "Ek primary tool stack choose karke daily small practice start karo.",
    "Real sample outputs banao jaise drafts, assets, research notes, ya workflows.",
    "Portfolio, delivery system, aur repeatable execution process build karo.",
  ];

  const mistakes = post.mistakes || [
    "Bahut saare tools ek saath test karke focus lose karna.",
    "AI output ko bina review ke directly use karna.",
    "Skill learning ko real work ya portfolio se connect na karna.",
    "Search intent aur audience need ko ignore karna.",
  ];

  const faqs = post.faqs || [
    {
      q: `${title} beginners ke liye useful hai kya?`,
      a: "Haan. Agar aap basics ke saath practical implementation chahte ho to ye guide beginner-friendly bhi hai aur growth-focused bhi.",
    },
    {
      q: "Kya is topic me coding zaruri hai?",
      a: "Har case me nahi. Bahut se workflows, prompts, tools, aur execution systems bina coding ke bhi use kiye ja sakte hain.",
    },
    {
      q: "Isse earning ya career growth me help mil sakti hai?",
      a: "Haan. Agar aap is skill ko projects, delivery systems, ya role-specific output ke saath connect karte ho to strong growth potential banta hai.",
    },
    {
      q: "Best next step kya hona chahiye?",
      a: "Ek clear use-case choose karo, daily practice routine banao, aur real output examples ke saath implementation start karo.",
    },
  ];

  const tools = getArticleTools(category);
  const relatedPosts = allBlogs
    .filter((item) => item.slug !== params.slug && normalizeCategory(item.category) === category)
    .slice(0, 6);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: post.excerpt || intro,
    mainEntityOfPage: `${BASE_URL}/blog/${params.slug}`,
    inLanguage: "en-IN",
    articleSection: category,
    keywords: parsed.keywordCluster.join(", "),
    author: {
      "@type": "Organization",
      name: "Sikhadenge",
    },
    publisher: {
      "@type": "Organization",
      name: "Sikhadenge",
      url: BASE_URL,
    },
    datePublished: "2026-04-24",
    dateModified: "2026-04-24",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: `${BASE_URL}/blog/${params.slug}` },
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

  const sectionLinks = [
    { href: "#why-this-matters", label: "Why this matters" },
    { href: "#what-you-will-learn", label: "What you will learn" },
    { href: "#step-by-step-guide", label: "Step-by-step guide" },
    { href: "#recommended-tools", label: "Recommended tools" },
    { href: "#mistakes-to-avoid", label: "Common mistakes" },
    { href: "#frequently-asked-questions", label: "FAQs and next steps" },
  ];

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
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

      <header className="bg-[linear-gradient(135deg,#13204f_0%,#1f3f9e_100%)] px-4 pb-16 pt-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <nav className="mb-6 text-sm text-blue-100/75">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="transition hover:text-white">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{title}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/80">
              {category}
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-blue-100/80">
              <Clock3 className="h-4 w-4" /> {readTime}
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85">
              For {parsed.audienceLabel}
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-blue-50/85 sm:text-lg">
            {intro}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {parsed.keywordCluster.slice(0, 6).map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85"
              >
                {keyword}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <Search className="h-7 w-7 text-blue-200" />
              <div className="mt-4 text-lg font-black">Search-ready clarity</div>
              <p className="mt-2 text-sm leading-7 text-blue-50/75">
                Structured sections, direct answers, and stronger intent matching.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <Sparkles className="h-7 w-7 text-blue-200" />
              <div className="mt-4 text-lg font-black">Practical execution</div>
              <p className="mt-2 text-sm leading-7 text-blue-50/75">
                Tools, workflow, and next-step guidance focused on real output.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <TrendingUp className="h-7 w-7 text-blue-200" />
              <div className="mt-4 text-lg font-black">Career and earning angle</div>
              <p className="mt-2 text-sm leading-7 text-blue-50/75">
                Useful for roles, projects, portfolio work, and growth systems.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-12 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
            In this guide
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sectionLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <section
          id="why-this-matters"
          className="mb-12 rounded-[28px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
        >
          <div className="flex items-center gap-3">
            <Compass className="h-8 w-8 text-blue-700" />
            <h2 className="text-2xl font-black text-slate-900">Why this matters</h2>
          </div>
          <p className="mt-5 text-base leading-8 text-slate-700">
            {parsed.skillLabel} ka practical value tab strong hota hai jab aap isse
            real audience need, workflow clarity, aur execution outcomes ke saath
            connect karte ho. Search intent bhi isi tarah strong hota hai: readers
            ko direct answer, examples, tools, aur action path chahiye hota hai.
          </p>
        </section>

        <section id="what-you-will-learn" className="mb-12">
          <div className="flex items-center gap-3">
            <LayoutGrid className="h-8 w-8 text-emerald-600" />
            <h2 className="text-2xl font-black text-slate-900">What you will learn</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {summaryPoints.map((point) => (
              <div
                key={point}
                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
              >
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="step-by-step-guide" className="mb-12">
          <div className="flex items-center gap-3">
            <Wand2 className="h-8 w-8 text-violet-600" />
            <h2 className="text-2xl font-black text-slate-900">Step-by-step guide</h2>
          </div>
          <div className="mt-6 space-y-4">
            {practicalSteps.map((step, index) => (
              <div
                key={step}
                className="flex gap-5 rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
              >
                <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-lg font-black text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{step}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Is step ko real use-case, output quality, aur repeatability ke saath
                    execute karo. Sirf theory nahi, actual practice aur proof-of-work
                    result yahan matter karta hai.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-[28px] bg-[linear-gradient(135deg,#1d4ed8_0%,#1e3a8a_100%)] p-8 text-white shadow-[0_14px_34px_rgba(37,99,235,0.22)]">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-100/75">
            Conversion block
          </div>
          <h2 className="mt-4 text-3xl font-black">Free AI Masterclass join karo</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-blue-50/85">
            Agar aap {parsed.skillLabel} ko sirf samajhna nahi, balki real output ke saath
            use karna chahte ho, to guided masterclass aapko faster execution path de sakti hai.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/gen-ai-masterclass/register-one-step"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Register Free Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Talk to Team
            </Link>
          </div>
        </section>

        <section id="recommended-tools" className="mb-12">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-amber-600" />
            <h2 className="text-2xl font-black text-slate-900">Recommended tools</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{tool.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{tool.desc}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
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

        <section id="mistakes-to-avoid" className="mb-12">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-rose-600" />
            <h2 className="text-2xl font-black text-slate-900">Mistakes to avoid</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {mistakes.map((mistake) => (
              <div
                key={mistake}
                className="rounded-[24px] border border-rose-100 bg-rose-50 p-5 text-sm font-semibold leading-7 text-slate-700"
              >
                {mistake}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-[24px] border border-emerald-100 bg-emerald-50 p-7">
              <TrendingUp className="h-7 w-7 text-emerald-700" />
              <h3 className="mt-4 text-lg font-black text-slate-900">Market demand</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {parsed.skillLabel} aur related execution skills ki demand career, client work,
                content systems, and business workflows me steadily grow kar rahi hai.
              </p>
            </div>
            <div className="rounded-[24px] border border-blue-100 bg-blue-50 p-7">
              <DollarSign className="h-7 w-7 text-blue-700" />
              <h3 className="mt-4 text-lg font-black text-slate-900">Earning angle</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Skill ko service, portfolio, automation support, ya execution workflow me convert
                karke earning aur positioning dono improve kiye ja sakte hain.
              </p>
            </div>
            <div className="rounded-[24px] border border-violet-100 bg-violet-50 p-7">
              <GraduationCap className="h-7 w-7 text-violet-700" />
              <h3 className="mt-4 text-lg font-black text-slate-900">Practical learning</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Output-based learning sabse strong hoti hai. Prompts, workflows, drafts,
                assets, aur examples build karke faster improvement hota hai.
              </p>
            </div>
          </div>
        </section>

        <section id="frequently-asked-questions" className="mb-12">
          <div className="flex items-center gap-3">
            <CircleHelp className="h-8 w-8 text-slate-700" />
            <h2 className="text-2xl font-black text-slate-900">Frequently asked questions</h2>
          </div>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                  <span className="text-base font-black text-slate-900">{faq.q}</span>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-400 transition group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section>
            <div className="flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-blue-700" />
              <h2 className="text-2xl font-black text-slate-900">Related articles</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                >
                  <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                    {normalizeCategory(item.category)}
                  </div>
                  <h3 className="mt-3 text-lg font-black leading-snug text-slate-900 group-hover:text-blue-700">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.excerpt ||
                      `${normalizeCategory(item.category)} practical guide with better workflow and execution clarity.`}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                    Read article <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
