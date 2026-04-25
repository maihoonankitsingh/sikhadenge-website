import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, FolderKanban, Search, Sparkles } from "lucide-react";
import { getBlogs, type BlogItem } from "@/lib/blogs";

const BASE_URL = "https://sikhadenge.in";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "AI Blog, ChatGPT Guides, AI Tools, SEO and Workflows | Sikhadenge",
  description:
    "Explore 100,000+ practical AI blog pages on ChatGPT, Gemini, Claude, AI tools, prompts, freelancing, careers, SEO, AEO, GEO, and digital execution.",
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
    title: "AI Blog, ChatGPT Guides, AI Tools, SEO and Workflows | Sikhadenge",
    description:
      "Practical AI blog hub with ChatGPT, Gemini, Claude, AI tools, prompts, careers, freelancing, and search-ready execution guides.",
    siteName: "Sikhadenge",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Blog, ChatGPT Guides, AI Tools, SEO and Workflows | Sikhadenge",
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
    if (seen.has(category)) continue;
    seen.add(category);
    picked.push(post);
    if (picked.length >= 12) break;
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
      const haystack = `${post.slug} ${post.title} ${post.category || ""}`.toLowerCase();
      const score = priorityTerms.reduce(
        (total, term) => total + (haystack.includes(term) ? 1 : 0),
        0,
      );

      return { post, score };
    })
    .sort((a, b) => b.score - a.score);

  const unique = new Set<string>();
  const picked: BlogItem[] = [];

  for (const item of scored) {
    if (unique.has(item.post.slug)) continue;
    unique.add(item.post.slug);
    picked.push(item.post);
    if (picked.length >= 9) break;
  }

  return picked;
}

export default function BlogHubPage() {
  const posts = getBlogs();
  const categoryStats = getCategoryStats(posts);
  const representativePosts = getRepresentativePosts(posts);
  const priorityPosts = getPriorityPosts(posts);
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
    hasPart: priorityPosts.slice(0, 6).map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${BASE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <section className="bg-[linear-gradient(135deg,#13204f_0%,#1f3f9e_100%)] px-4 pb-16 pt-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/80">
            Sikhadenge AI Blog
          </div>

          <h1 className="mt-6 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Practical AI guides built for search, answers, ranking signals, and leads
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-blue-50/85 sm:text-lg">
            Explore real blog coverage across ChatGPT, Gemini, Claude, AI tools,
            prompts, careers, freelancing, business execution, SEO, AEO, GEO,
            and digital growth systems.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-100/70">
                Total Blog Pages
              </div>
              <div className="mt-3 text-3xl font-black">{posts.length.toLocaleString()}</div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-100/70">
                Topic Clusters
              </div>
              <div className="mt-3 text-3xl font-black">{categoryStats.length}+</div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-100/70">
                Search Focus
              </div>
              <div className="mt-3 text-lg font-bold">SEO + AEO + GEO + internal linking</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {["ChatGPT", "Gemini", "Claude", "AI Tools", "Freelancing", "AI Career"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
            <Search className="h-8 w-8 text-blue-700" />
            <h2 className="mt-4 text-xl font-black text-slate-900">Search-ready structure</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Blog hub internal links, category discovery, and representative articles
              help search engines and AI tools understand topical depth.
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
            <Sparkles className="h-8 w-8 text-blue-700" />
            <h2 className="mt-4 text-xl font-black text-slate-900">Answer-first content</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              High-intent topics like ChatGPT, AI tools, careers, prompts, and
              execution workflows stay easy to discover and easier to recommend.
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
            <FolderKanban className="h-8 w-8 text-blue-700" />
            <h2 className="mt-4 text-xl font-black text-slate-900">Authority clusters</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Category-led article discovery improves crawl depth, reduces orphan pages,
              and helps stronger topical authority build over time.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              Priority Articles
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">
              High-intent AI topics readers search for first
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {priorityPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
            >
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                {post.category || "AI Guides"}
              </span>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900 transition group-hover:text-blue-700">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {post.excerpt ||
                  "Practical AI guide with tools, workflow clarity, and real execution support."}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                Read article <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                Crawl Signals
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Stronger discovery for search engines and AI answer systems
              </h2>
            </div>
            <Link
              href="/sitemap.xml"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              Open sitemap <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="text-sm font-black text-slate-900">Canonical-first URLs</div>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Flat blog URLs, deduped slugs, and redirect-safe blog routing reduce crawl confusion.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="text-sm font-black text-slate-900">Internal linking depth</div>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Priority articles and cluster cards help bots and readers reach deeper content faster.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="text-sm font-black text-slate-900">Answer-engine alignment</div>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Topic grouping and article structure make recommendations easier for AI search products.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
          Topic Clusters
        </p>
        <h2 className="mt-2 text-3xl font-black text-slate-900">
          Explore blog categories with strong topical depth
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {representativePosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition hover:border-blue-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                    {post.category || "AI Guides"}
                  </div>
                  <h3 className="mt-3 text-lg font-black leading-snug text-slate-900">
                    {post.title}
                  </h3>
                </div>
                <BookOpen className="h-5 w-5 flex-shrink-0 text-slate-400" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {categoryStats.map((item) => (
            <div
              key={item.label}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              {item.label} ({item.count})
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
