import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Clock3,
  Compass,
  FolderKanban,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { getBlogs, type BlogItem } from "@/lib/blogs";

const BASE_URL = "https://sikhadenge.in";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "AI Blog, ChatGPT Guides, AI Tools, SEO and Workflows",
  description:
    "Explore 120,000+ practical AI blog pages covering ChatGPT, Gemini, Claude, AI tools, prompts, freelancing, careers, SEO, AEO, GEO, and digital workflows.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/blog`,
    title:
      "AI Blog, ChatGPT Guides, AI Tools, SEO and Workflows | Sikhadenge",
    description:
      "Practical AI guides for learners, creators, freelancers, professionals, and business owners.",
    siteName: "Sikhadenge",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Blog, ChatGPT Guides, AI Tools, SEO and Workflows | Sikhadenge",
    description:
      "Practical AI guides for learners, creators, freelancers, professionals, and business owners.",
  },
};

const BLOG_FAQS = [
  {
    question: "What can I learn from the Sikhadenge AI Blog?",
    answer:
      "The Sikhadenge AI Blog covers practical guides on ChatGPT, Gemini, Claude, AI tools, prompts, content creation, design, video, marketing, automation, careers, freelancing, business workflows, SEO, AEO, and GEO.",
  },
  {
    question: "Is the Sikhadenge AI Blog suitable for beginners?",
    answer:
      "Yes. Many guides are written for beginners who need clear explanations, practical steps, useful tool guidance, and structured workflows without advanced technical knowledge.",
  },
  {
    question: "Does the Blog include practical workflows or only theory?",
    answer:
      "The Blog focuses on practical execution. Articles connect tools and concepts with workflows, use cases, implementation steps, project ideas, productivity systems, and real work outcomes.",
  },
  {
    question: "Are there AI guides for students, freelancers, and creators?",
    answer:
      "Yes. The library includes focused guides for students, job seekers, writers, designers, video editors, marketers, creators, freelancers, and small-business teams.",
  },
  {
    question: "Does the Blog cover AI careers and job-ready skills?",
    answer:
      "Yes. Readers can explore AI career paths, future-ready skills, beginner roadmaps, freelancing opportunities, portfolio development, client workflows, and practical digital capabilities.",
  },
  {
    question: "Can I learn about SEO, AEO, GEO, and AI search visibility?",
    answer:
      "Yes. The Blog includes content about search visibility, SEO workflows, answer-engine optimisation, generative-engine optimisation, content structure, internal linking, and topical authority.",
  },
  {
    question: "How can I find the right article quickly?",
    answer:
      "Start with the featured guide, browse the topic collections, or open one of the popular guides selected for common learning and work goals.",
  },
  {
    question: "How large is the Sikhadenge Blog library?",
    answer:
      "The Blog contains more than 120,000 practical AI pages organised across multiple topic categories and use cases.",
  },
] as const;

function getCategoryStats(posts: BlogItem[]) {
  const counts = new Map<string, number>();

  for (const post of posts) {
    const key = post.category || "AI Guides";
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label, count]) => ({ label, count }));
}

function getRepresentativePosts(posts: BlogItem[]) {
  const seen = new Set<string>();
  const picked: BlogItem[] = [];

  for (const post of posts) {
    const category = post.category || "AI Guides";

    if (seen.has(category)) {
      continue;
    }

    seen.add(category);
    picked.push(post);

    if (picked.length >= 10) {
      break;
    }
  }

  return picked;
}

function getPriorityPosts(posts: BlogItem[]) {
  const priorityTerms = [
    "chatgpt",
    "gemini",
    "claude",
    "prompt",
    "freelancing",
    "career",
    "tools",
    "students",
    "business",
    "marketing",
  ];

  return posts
    .map((post) => {
      const haystack =
        `${post.slug} ${post.title} ${post.category || ""}`.toLowerCase();
      const score = priorityTerms.reduce(
        (total, term) => total + (haystack.includes(term) ? 1 : 0),
        0,
      );

      return { post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 9)
    .map((item) => item.post);
}

function getPostSummary(post: BlogItem, limit = 170) {
  const source =
    post.excerpt ||
    "A practical AI guide with clear tools, useful workflows, and execution-focused learning support.";

  if (source.length <= limit) {
    return source;
  }

  return `${source.slice(0, limit).trim()}…`;
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-slate-600">
        {description}
      </p>
    </div>
  );
}

export default function BlogHubPage() {
  const posts = getBlogs();
  const categoryStats = getCategoryStats(posts);
  const representativePosts = getRepresentativePosts(posts);
  const priorityPosts = getPriorityPosts(posts);
  const featuredPost = priorityPosts[0] || posts[0];
  const supportingPosts = priorityPosts.slice(1, 4);
  const popularPosts = priorityPosts.slice(3, 9);
  const latestPosts = posts.slice(0, 6);
  const totalCategoryCount = new Set(
    posts.map((post) => post.category || "AI Guides"),
  ).size;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Sikhadenge AI Blog",
    url: `${BASE_URL}/blog`,
    description:
      "Practical AI guides covering tools, workflows, freelancing, careers, prompts, SEO, AEO, and GEO.",
    isPartOf: {
      "@type": "WebSite",
      name: "Sikhadenge",
      url: BASE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: priorityPosts.slice(0, 6).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BASE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BLOG_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  if (!featuredPost) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-20 text-slate-950">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <BookOpen className="mx-auto h-8 w-8 text-blue-700" />
          <h1 className="mt-4 text-3xl font-bold">Sikhadenge AI Blog</h1>
          <p className="mt-3 text-slate-600">
            Practical AI guides are being prepared.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      data-blog-hub-design="light-editorial-v2"
      className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-950"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b border-slate-200 bg-white px-4 pb-16 pt-12 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <Link href="/" className="transition hover:text-blue-700">
              Home
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-semibold text-slate-700">Blog</span>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
                <Sparkles className="h-4 w-4" />
                Sikhadenge AI Knowledge Hub
              </div>

              <h1 className="mt-6 max-w-5xl text-[38px] font-bold leading-[1.06] tracking-[-0.045em] text-slate-950 sm:text-[50px] lg:text-[64px]">
                Practical AI guides for learning, work, and digital growth
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Explore clear, execution-focused guides across AI tools,
                ChatGPT, careers, freelancing, content, design, marketing,
                automation, SEO, AEO, GEO, and modern digital workflows.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#featured-guides"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(29,78,216,0.18)] transition hover:-translate-y-0.5 hover:bg-blue-800"
                >
                  Start with featured guides
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#topics"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                >
                  Browse topics
                  <Compass className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="border-l-2 border-blue-700 pl-4">
                  <p className="text-2xl font-bold text-slate-950">
                    {posts.length.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Blog pages</p>
                </div>
                <div className="border-l-2 border-blue-700 pl-4">
                  <p className="text-2xl font-bold text-slate-950">
                    {totalCategoryCount}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Topic categories</p>
                </div>
                <div className="col-span-2 border-l-2 border-blue-700 pl-4 sm:col-span-1">
                  <p className="text-2xl font-bold text-slate-950">Practical</p>
                  <p className="mt-1 text-sm text-slate-500">Learn · Apply · Grow</p>
                </div>
              </div>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-white text-blue-700">
                  <BookOpen className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-700">
                  Reader-first
                </span>
              </div>
              <h2 className="mt-6 text-2xl font-bold tracking-[-0.025em] text-slate-950">
                Find a useful guide and move directly to execution
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Each collection is organised around a real question, learning
                goal, tool, skill, career path, or practical workflow.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Answer-first explanations",
                  "Step-by-step practical workflows",
                  "Related guides for deeper learning",
                  "Editorial and source-quality signals",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section id="featured-guides" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Start here"
            title="Featured practical AI guides"
            description="Begin with high-intent topics selected for common learning, career, freelancing, business, and productivity goals."
          />

          <div className="mt-9 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-3xl border border-blue-200 bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,0.07)] sm:p-9">
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700">
                {featuredPost.category || "AI Guides"}
              </span>
              <h3 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl">
                {featuredPost.title}
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                {getPostSummary(featuredPost, 235)}
              </p>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
              >
                Read featured guide
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>

            <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-6 shadow-[0_14px_42px_rgba(15,23,42,0.05)]">
              {supportingPosts.map((post, index) => (
                <article key={post.slug} className="py-6 first:pt-7 last:pb-7">
                  <div className="flex gap-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-700">
                        {post.category || "AI Guides"}
                      </p>
                      <h3 className="mt-2 text-lg font-bold leading-snug text-slate-950">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="transition hover:text-blue-700"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {getPostSummary(post, 110)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="topics" className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionIntro
              eyebrow="Explore by topic"
              title="Focused learning paths across the AI library"
              description="Choose a topic collection and continue through related guides instead of browsing an unstructured list."
            />
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
              <FolderKanban className="h-4 w-4 text-blue-700" />
              {totalCategoryCount} categories
            </div>
          </div>

          <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {representativePosts.map((post, index) => {
              const stat = categoryStats.find(
                (item) => item.label === (post.category || "AI Guides"),
              );

              return (
                <article key={post.slug} className="border-t border-slate-200 pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-bold text-blue-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-slate-400">
                      {stat ? `${stat.count.toLocaleString()} guides` : "Topic guide"}
                    </span>
                  </div>
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    {post.category || "AI Guides"}
                  </p>
                  <h3 className="mt-2 text-xl font-bold leading-snug text-slate-950">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition hover:text-blue-700"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
                  >
                    Open topic path
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Popular now"
            title="Guides readers can use immediately"
            description="Practical starting points for tools, careers, freelancing, students, creators, marketing, and business workflows."
          />

          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {popularPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700">
                  {post.category || "AI Guides"}
                </p>
                <h3 className="mt-3 text-xl font-bold leading-snug text-slate-950">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition hover:text-blue-700"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {getPostSummary(post, 130)}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
                >
                  Read guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
                Editorial standard
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Built for useful answers, not keyword padding
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                The Blog structure supports readers first while preserving clear
                signals for search engines, answer engines, and AI retrieval
                systems.
              </p>
              <Link
                href="/editorial-policy"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
              >
                Read the editorial policy
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: BadgeCheck,
                  title: "Editorial ownership",
                  text: "Clear authorship, update signals, review context, and accountable site policies.",
                },
                {
                  icon: CheckCircle2,
                  title: "Answer-first structure",
                  text: "Direct summaries, practical steps, FAQs, and related learning paths for fast understanding.",
                },
                {
                  icon: ShieldCheck,
                  title: "Trust and source quality",
                  text: "Guidance is framed with scope, limitations, verification cues, and source standards where needed.",
                },
                {
                  icon: Clock3,
                  title: "Ongoing maintenance",
                  text: "Pages use update and revalidation systems so the library can be reviewed and improved over time.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200 bg-white text-blue-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Recently available"
            title="Continue exploring the knowledge library"
            description="Open another practical guide and build a connected learning path around your current goal."
          />

          <div className="mt-9 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-6 sm:px-8">
            {latestPosts.map((post) => (
              <article key={post.slug} className="grid gap-3 py-6 sm:grid-cols-[160px_1fr_auto] sm:items-center sm:gap-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-700">
                  {post.category || "AI Guides"}
                </p>
                <div>
                  <h3 className="text-lg font-bold leading-snug text-slate-950">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition hover:text-blue-700"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {getPostSummary(post, 115)}
                  </p>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Read ${post.title}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionIntro
            eyebrow="FAQ"
            title="Questions about the Sikhadenge AI Blog"
            description="Clear answers about the library, its topics, intended readers, and practical learning approach."
          />

          <div className="mt-9 divide-y divide-slate-200 border-y border-slate-200">
            {BLOG_FAQS.map((faq, index) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-5 text-left text-base font-bold text-slate-950 marker:content-none sm:text-lg">
                  <span className="flex items-start gap-4">
                    <span className="mt-0.5 text-xs font-bold text-blue-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {faq.question}
                  </span>
                  <span className="text-xl font-normal text-slate-400 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-2 pl-10 pr-8 pt-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-blue-200 bg-blue-50 px-6 py-10 sm:px-10 sm:py-12">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
                From reading to execution
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Build practical AI skills with a structured next step
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Continue with free learning resources, guided courses, and
                project-focused support after exploring the Blog.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/free-ai-masterclass"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
              >
                Join free AI masterclass
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center rounded-xl border border-blue-300 bg-white px-6 py-3 text-sm font-bold text-blue-800 transition hover:border-blue-400"
              >
                Explore courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
