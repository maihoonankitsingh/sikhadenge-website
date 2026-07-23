import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  FolderKanban,
  Search,
  Sparkles,
} from "lucide-react";

import { getBlogs, type BlogItem } from "@/lib/blogs";

const BASE_URL = "https://sikhadenge.in";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "AI Blog, ChatGPT Guides, AI Tools, SEO and Workflows",
  description:
    "Explore 110,000+ practical AI blog pages on ChatGPT, Gemini, Claude, AI tools, prompts, freelancing, careers, SEO, AEO, GEO, and digital execution.",
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
      "Practical AI blog hub with ChatGPT, Gemini, Claude, AI tools, prompts, careers, freelancing, and search-ready execution guides.",
    siteName: "Sikhadenge",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Blog, ChatGPT Guides, AI Tools, SEO and Workflows | Sikhadenge",
    description:
      "Practical AI blog hub with ChatGPT, Gemini, Claude, AI tools, prompts, careers, freelancing, and search-ready execution guides.",
  },
};

function getCategoryStats(posts: BlogItem[]) {
  const counts = new Map<string, number>();

  for (const post of posts) {
    const key = post.category || "AI Guides";
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
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

    if (picked.length >= 12) {
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

  const scored = posts
    .map((post) => {
      const haystack =
        `${post.slug} ${post.title} ${post.category || ""}`.toLowerCase();

      const score = priorityTerms.reduce(
        (total, term) =>
          total + (haystack.includes(term) ? 1 : 0),
        0,
      );

      return { post, score };
    })
    .sort((a, b) => b.score - a.score);

  const unique = new Set<string>();
  const picked: BlogItem[] = [];

  for (const item of scored) {
    if (unique.has(item.post.slug)) {
      continue;
    }

    unique.add(item.post.slug);
    picked.push(item.post);

    if (picked.length >= 9) {
      break;
    }
  }

  return picked;
}

function getPostSummary(post: BlogItem, limit = 175) {
  const source =
    post.excerpt ||
    "Practical AI guide with clear tools, useful workflows, and execution-focused learning support.";

  if (source.length <= limit) {
    return source;
  }

  return `${source.slice(0, limit).trim()}…`;
}

export default function BlogHubPage() {
  const posts = getBlogs();
  const categoryStats = getCategoryStats(posts);
  const representativePosts =
    getRepresentativePosts(posts);
  const priorityPosts = getPriorityPosts(posts);

  const featuredPost =
    priorityPosts[0] || posts[0];

  const supportingPosts =
    priorityPosts.slice(1, 4);

  const popularPosts =
    priorityPosts.slice(0, 6);

  const discoveryPosts =
    posts.slice(0, 6);

  const totalCategoryCount = new Set(
    posts.map(
      (post) => post.category || "AI Guides",
    ),
  ).size;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Sikhadenge AI Blog",
    url: `${BASE_URL}/blog`,
    description:
      "Large practical AI blog hub covering tools, workflows, freelancing, careers, prompts, SEO, AEO, and GEO execution.",
    isPartOf: {
      "@type": "WebSite",
      name: "Sikhadenge",
      url: BASE_URL,
    },
    hasPart: priorityPosts
      .slice(0, 6)
      .map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BASE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
  };

  if (!featuredPost) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-20 text-slate-950">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-slate-200 bg-white p-8 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-blue-600" />
          <h1 className="mt-4 text-3xl font-medium">
            Sikhadenge AI Blog
          </h1>
          <p className="mt-3 text-slate-600">
            Practical AI guides are being prepared.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      data-blog-hub-design="brand-editorial-v1"
      className="min-h-screen bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_30%,#F8FAFC_100%)] text-slate-950"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionJsonLd,
          ),
        }}
      />

      <section className="relative overflow-hidden px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-blue-200/45 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute right-[-160px] top-[40px] h-[360px] w-[360px] rounded-full bg-violet-200/35 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/85 px-4 py-2 text-[11px] font-normal uppercase tracking-[0.18em] text-blue-700 shadow-[0_8px_25px_rgba(37,99,235,0.08)] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Sikhadenge AI Knowledge Hub
            </div>

            <h1 className="mt-6 max-w-4xl text-[34px] font-medium leading-[1.04] tracking-[-0.035em] text-slate-950 sm:text-[44px] lg:text-[54px]">
              Practical AI knowledge for modern work,
              learning, and growth
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Discover practical guides across AI tools,
              ChatGPT, careers, freelancing, content,
              design, marketing, automation, and
              future-ready digital workflows.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#featured-guides"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Explore featured guides
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#topic-clusters"
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700"
              >
                Browse AI topics
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-[20px] border border-blue-100 bg-white/85 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.045)] backdrop-blur">
                <p className="text-[10px] font-normal uppercase tracking-[0.16em] text-blue-600">
                  Total Blog Pages
                </p>
                <p className="mt-2 text-2xl font-medium text-slate-950">
                  {posts.length.toLocaleString()}
                </p>
              </div>

              <div className="rounded-[20px] border border-blue-100 bg-white/85 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.045)] backdrop-blur">
                <p className="text-[10px] font-normal uppercase tracking-[0.16em] text-blue-600">
                  Topic Categories
                </p>
                <p className="mt-2 text-2xl font-medium text-slate-950">
                  {totalCategoryCount}
                </p>
              </div>

              <div className="col-span-2 rounded-[20px] border border-blue-100 bg-white/85 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.045)] backdrop-blur sm:col-span-1">
                <p className="text-[10px] font-normal uppercase tracking-[0.16em] text-blue-600">
                  Knowledge Focus
                </p>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  Learn · Apply · Grow
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {popularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-normal text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
                >
                  {post.category || "AI Guides"}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[570px]">
            <div
              data-blog-hero-visual="ai-knowledge-map-v1"
              className="relative overflow-hidden rounded-[34px] border border-blue-100 bg-[linear-gradient(145deg,#07152F_0%,#123D8D_58%,#7557D7_100%)] p-5 shadow-[0_30px_75px_rgba(30,64,175,0.2)] sm:p-6"
            >
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-300/25 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl"
              />

              <div className="relative rounded-[26px] border border-white/15 bg-white/10 p-5 backdrop-blur-xl sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-blue-100/80">
                      AI knowledge map
                    </p>

                    <h2 className="mt-2 text-2xl font-medium tracking-[-0.025em] text-white">
                      One hub. Multiple practical paths.
                    </h2>
                  </div>

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white">
                    <Search className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "AI tools & prompts",
                    "Careers & freelancing",
                    "Content & marketing",
                    "Design & video",
                    "Automation workflows",
                    "SEO · AEO · GEO",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-[18px] border border-white/12 bg-white/10 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/12 text-xs font-medium text-blue-100">
                          {String(index + 1).padStart(
                            2,
                            "0",
                          )}
                        </span>

                        <span className="text-sm font-normal text-white/90">
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[20px] border border-cyan-200/20 bg-slate-950/25 p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />

                    <div>
                      <p className="text-sm font-medium text-white">
                        Built for practical discovery
                      </p>

                      <p className="mt-1 text-xs leading-6 text-blue-100/75">
                        Find a useful guide, understand the
                        workflow, and move directly toward a
                        real learning or work outcome.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="featured-guides"
        className="px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-blue-600">
              Featured guides
            </p>

            <h2 className="mt-3 text-3xl font-medium tracking-[-0.025em] text-slate-950 sm:text-4xl">
              Start with practical AI topics readers
              explore first
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Clear guides designed to help learners,
              creators, freelancers, and professionals
              understand tools and apply them in real work.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative overflow-hidden rounded-[30px] border border-blue-100 bg-[linear-gradient(145deg,#0A1734_0%,#184CA6_68%,#5A55D9_100%)] p-7 text-white shadow-[0_24px_60px_rgba(30,64,175,0.18)] transition hover:-translate-y-1 sm:p-9"
            >
              <div
                aria-hidden="true"
                className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"
              />

              <div className="relative">
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-normal uppercase tracking-[0.18em] text-blue-100">
                  {featuredPost.category || "AI Guides"}
                </span>

                <h3 className="mt-5 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">
                  {featuredPost.title}
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-blue-50/80 sm:text-base">
                  {getPostSummary(
                    featuredPost,
                    235,
                  )}
                </p>

                <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white">
                  Read featured guide
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            <div className="grid gap-4">
              {supportingPosts.map(
                (post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group rounded-[24px] border border-blue-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:border-blue-300"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xs font-medium text-blue-700">
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <div>
                        <p className="text-[10px] font-normal uppercase tracking-[0.16em] text-blue-600">
                          {post.category || "AI Guides"}
                        </p>

                        <h3 className="mt-2 text-lg font-medium leading-snug text-slate-950 transition group-hover:text-blue-700">
                          {post.title}
                        </h3>

                        <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-blue-700">
                          Read guide
                          <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="topic-clusters"
        className="px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-blue-600">
                Explore by topic
              </p>

              <h2 className="mt-3 text-3xl font-medium tracking-[-0.025em] text-slate-950 sm:text-4xl">
                Discover focused AI learning paths
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Browse representative guides across the
                strongest topic categories in the
                Sikhadenge knowledge library.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
              <FolderKanban className="h-4 w-4 text-blue-600" />
              {totalCategoryCount} categories
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {representativePosts.map(
              (post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-[24px] border border-blue-100 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_18px_42px_rgba(37,99,235,0.1)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#EAF2FF,#F1EEFF)] text-xs font-medium text-blue-700">
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <BookOpen className="h-4 w-4 text-slate-300 transition group-hover:text-blue-500" />
                  </div>

                  <p className="mt-5 text-[10px] font-normal uppercase tracking-[0.17em] text-blue-600">
                    {post.category || "AI Guides"}
                  </p>

                  <h3 className="mt-2 text-lg font-medium leading-snug text-slate-950 transition group-hover:text-blue-700">
                    {post.title}
                  </h3>
                </Link>
              ),
            )}
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {categoryStats.map((item) => (
              <span
                key={item.label}
                className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-normal text-slate-600"
              >
                {item.label} ·{" "}
                {item.count.toLocaleString()}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="priority-guides"
        className="px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-blue-600">
              More practical guides
            </p>

            <h2 className="mt-3 text-3xl font-medium tracking-[-0.025em] text-slate-950 sm:text-4xl">
              Continue exploring useful AI workflows
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {discoveryPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-[26px] border border-blue-100 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.045)] transition hover:-translate-y-1 hover:border-blue-300"
              >
                <p className="text-[10px] font-normal uppercase tracking-[0.17em] text-blue-600">
                  {post.category || "AI Guides"}
                </p>

                <h3 className="mt-3 text-xl font-medium leading-snug text-slate-950 transition group-hover:text-blue-700">
                  {post.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                  {getPostSummary(post)}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-700">
                  Read article
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-[26px] border border-blue-100 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.045)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Search className="h-5 w-5" />
              </span>

              <h2 className="mt-5 text-xl font-medium text-slate-950">
                Search-ready structure
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Clear internal links, topic discovery,
                and representative articles help readers
                and search systems understand the depth
                of each subject.
              </p>
            </article>

            <article className="rounded-[26px] border border-blue-100 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.045)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                <Sparkles className="h-5 w-5" />
              </span>

              <h2 className="mt-5 text-xl font-medium text-slate-950">
                Answer-first content
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                High-intent AI topics remain easy to
                discover, understand, recommend, and
                connect with practical execution.
              </p>
            </article>

            <article className="rounded-[26px] border border-blue-100 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.045)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                <FolderKanban className="h-5 w-5" />
              </span>

              <h2 className="mt-5 text-xl font-medium text-slate-950">
                Authority clusters
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Category-led content supports stronger
                topical depth, lower orphan-page risk,
                and clearer learning journeys.
              </p>
            </article>
          </div>

          <div className="mt-6 rounded-[30px] border border-blue-100 bg-[linear-gradient(135deg,#F3F8FF_0%,#F6F2FF_100%)] p-6 shadow-[0_16px_42px_rgba(37,99,235,0.06)] sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[10px] font-normal uppercase tracking-[0.18em] text-blue-600">
                  Crawl Signals
                </p>

                <h2 className="mt-3 text-2xl font-medium tracking-[-0.02em] text-slate-950">
                  Strong discovery without exposing
                  technical complexity to readers
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  Canonical URLs, internal linking depth,
                  topic grouping, and structured data
                  remain preserved behind a cleaner,
                  visitor-first Blog experience.
                </p>
              </div>

              <Link
                href="/sitemap.xml"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-700 transition hover:-translate-y-0.5 hover:border-blue-400"
              >
                Open sitemap
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-blue-100 bg-[linear-gradient(135deg,#07152F_0%,#174899_60%,#6255D8_100%)] px-6 py-10 text-white shadow-[0_28px_70px_rgba(30,64,175,0.2)] sm:px-10 sm:py-12">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-blue-100/75">
                Learn beyond the article
              </p>

              <h2 className="mt-3 text-3xl font-medium tracking-[-0.025em] sm:text-4xl">
                Turn practical AI knowledge into
                real project capability
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50/80 sm:text-base">
                Continue from useful guides to structured
                learning, mentor support, practical
                workflows, and visible output.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/gen-ai-masterclass/register-one-step"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-blue-800 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Join Free AI Masterclass
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/15"
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
