import fs from "fs";
import path from "path";
import Head from "next/head";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Bot,
  ChevronDown,
  Compass,
  FileCheck2,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type BlogItem = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  updatedAt?: string;
  dateModified?: string;
};

type Props = {
  posts: BlogItem[];
};

const BASE_URL = "https://sikhadenge.in";
const RELEASE_DATE = "2026-07-24";

function getBlogPosts(): BlogItem[] {
  try {
    const filePath = path.join(process.cwd(), "data", "blogs.json");
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as BlogItem[];
    return parsed.filter(
      (post) =>
        typeof post?.slug === "string" &&
        post.slug.trim().length > 0 &&
        typeof post?.title === "string" &&
        post.title.trim().length > 0,
    );
  } catch (error) {
    console.error("Unable to load data/blogs.json for /blog", error);
    return [];
  }
}

export async function getStaticProps() {
  return {
    props: {
      posts: getBlogPosts().slice(0, 30),
    },
    revalidate: 86400,
  };
}

const faqs = [
  {
    q: "What does the Sikhadenge blog cover?",
    a: "The blog covers practical AI and digital skill topics such as AI tools, prompt engineering, automation, design, video, marketing, websites, freelancing, careers, and responsible workflow design.",
  },
  {
    q: "Who are these guides written for?",
    a: "They are written for students, beginners, working professionals, freelancers, creators, marketers, developers, and business owners who need a practical starting point or a clear next action.",
  },
  {
    q: "Are all articles written by humans?",
    a: "Sikhadenge may use AI-assisted drafting or analysis, but published material should be reviewed for accuracy, usefulness, originality, clarity, and alignment with the editorial policy.",
  },
  {
    q: "How are changing product facts checked?",
    a: "Features, pricing, policies, model access, and technical behavior should be verified using official provider documentation before important decisions are made.",
  },
  {
    q: "How often are articles updated?",
    a: "Articles should be updated when the main answer, important facts, recommended workflow, sources, or linked resources materially change. Cosmetic rebuilds alone should not change the modified date.",
  },
  {
    q: "Does every article contain a direct answer?",
    a: "Generated article templates are designed to show a concise answer near the beginning, followed by practical takeaways, steps, quality checks, FAQs, and related resources.",
  },
  {
    q: "Why do articles include FAQs?",
    a: "FAQs help readers resolve common follow-up questions without repeating a search. Matching FAQ structured data can help machines understand the visible content, but it does not guarantee a rich result.",
  },
  {
    q: "Can I rely on an article for professional advice?",
    a: "Articles provide general educational information. For legal, medical, financial, tax, security, or other high-stakes decisions, use qualified professionals and current authoritative sources.",
  },
  {
    q: "How should I use a practical guide?",
    a: "Choose one relevant outcome, complete the first step, produce a visible result, review it against a written checklist, and save what changed after feedback.",
  },
  {
    q: "Can these guides help with jobs or freelancing?",
    a: "They can support skill development and portfolio work, but no article, course, or tool can guarantee employment, clients, rankings, traffic, or income.",
  },
  {
    q: "How can I report an error?",
    a: "Use the Sikhadenge contact page and include the article URL, the specific statement, and a reliable source or explanation so the editorial team can review it.",
  },
  {
    q: "Where can I learn about the publishing process?",
    a: "Read the Sikhadenge editorial policy and editorial team page for source standards, AI-assisted content rules, corrections, updates, ownership, and contact information.",
  },
];

function IconOrb({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <span
      className={`relative inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border ${
        gold
          ? "border-[#F5B301]/35 bg-[linear-gradient(145deg,rgba(245,179,1,0.30),rgba(245,179,1,0.06))] text-[#F5B301] shadow-[0_14px_34px_rgba(245,179,1,0.22)]"
          : "border-[#2563EB]/40 bg-[linear-gradient(145deg,rgba(37,99,235,0.34),rgba(37,99,235,0.07))] text-[#76A3FF] shadow-[0_14px_34px_rgba(37,99,235,0.25)]"
      }`}
      aria-hidden="true"
    >
      <span className="absolute inset-x-2 top-1 h-px bg-white/45" />
      {children}
    </span>
  );
}

export default function Blog({ posts }: Props) {
  const categories = Array.from(new Set(posts.map((post) => post.category).filter(Boolean))).slice(0, 8) as string[];
  const collectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${BASE_URL}/blog#collection`,
        name: "Sikhadenge Practical AI and Digital Skills Blog",
        description:
          "Answer-first practical guides about AI tools, digital skills, workflows, careers, freelancing, and responsible execution.",
        url: `${BASE_URL}/blog`,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        publisher: { "@id": `${BASE_URL}/#organization` },
        dateModified: RELEASE_DATE,
      },
      {
        "@type": "ItemList",
        "@id": `${BASE_URL}/blog#articles`,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${BASE_URL}/blog/${post.slug}`,
          name: post.title,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/blog#faq`,
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
      <Head>
        <title>Practical AI and Digital Skills Blog | Sikhadenge</title>
        <meta
          name="description"
          content="Explore answer-first, practical guides about AI tools, prompt engineering, automation, design, video, marketing, websites, freelancing, careers, and digital workflows."
        />
        <link rel="canonical" href={`${BASE_URL}/blog`} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/blog`} />
        <meta property="og:site_name" content="Sikhadenge" />
        <meta property="og:title" content="Practical AI and Digital Skills Blog | Sikhadenge" />
        <meta
          property="og:description"
          content="Answer-first guides with practical steps, quality checks, visible FAQs, and related learning paths."
        />
        <meta property="og:image" content={`${BASE_URL}/images/og/og-home.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      </Head>

      <main className="min-h-screen bg-[#0B1220] text-white">
        <header className="relative overflow-hidden border-b border-white/10 px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_10%,rgba(37,99,235,0.25),transparent_62%),radial-gradient(640px_420px_at_88%_8%,rgba(245,179,1,0.11),transparent_65%)]" />
          <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle,_white_1px,_transparent_1px)] [background-size:20px_20px]" />
          <div className="relative mx-auto max-w-6xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_310px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/35 bg-[#2563EB]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9BBCFF]">
                  <Sparkles className="h-4 w-4" /> Sikhadenge knowledge hub
                </div>
                <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  Practical AI and digital skills guides
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-[#C5CBD5] sm:text-lg">
                  Clear answers, real workflows, source-aware recommendations, quality checks, and next actions for learners and professionals.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {["Answer-first", "Human-reviewed", "Source-aware", "Mobile responsive"].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-[#D6DAE1]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#111827]/75 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur">
                <IconOrb gold>
                  <FileCheck2 className="h-5 w-5" />
                </IconOrb>
                <div className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#F5B301]">Publishing standard</div>
                <div className="mt-2 text-lg font-bold">Useful before optimized</div>
                <p className="mt-3 text-sm leading-7 text-[#B0B7C3]">
                  Pages should satisfy a real question, disclose ownership, avoid unsupported claims, and return the correct HTTP status.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <section className="mb-14 rounded-3xl border border-white/10 bg-[#111827]/70 p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <IconOrb>
                  <Compass className="h-5 w-5" />
                </IconOrb>
                <div>
                  <h2 className="text-2xl font-extrabold">Explore by topic</h2>
                  <p className="mt-2 text-sm leading-7 text-[#B0B7C3]">Topic labels help readers understand the available coverage. Article links remain the crawlable navigation.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(categories.length > 0 ? categories : ["AI skills", "Automation", "Design", "Marketing", "Careers"]).map((category) => (
                  <span key={category} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-[#C5CBD5]">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section aria-labelledby="latest-guides" className="mb-16">
            <div className="mb-7 flex items-start gap-4">
              <IconOrb>
                <BookOpen className="h-5 w-5" />
              </IconOrb>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#76A3FF]">Article collection</div>
                <h2 id="latest-guides" className="mt-1 text-3xl font-extrabold tracking-tight">Latest practical guides</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-[#B0B7C3]">A curated entry point into the full sitemap-backed article collection.</p>
              </div>
            </div>

            {posts.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex min-h-[280px] flex-col rounded-3xl border border-white/10 bg-[#111827]/70 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:border-[#2563EB]/50 hover:bg-[#111827]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <IconOrb gold={index % 3 === 1}>
                        {index % 3 === 0 ? <Bot className="h-5 w-5" /> : index % 3 === 1 ? <Layers3 className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                      </IconOrb>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9CA3AF]">
                        {post.category || "Digital skills"}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-extrabold leading-tight transition group-hover:text-[#9BBCFF]">{post.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-[#B0B7C3]">
                      {post.excerpt || "A practical guide with a concise answer, structured steps, quality checks, FAQs, and relevant next actions."}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#76A3FF]">
                      Read guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-[#111827]/70 p-8">
                <div className="flex items-start gap-4">
                  <IconOrb gold>
                    <ShieldCheck className="h-5 w-5" />
                  </IconOrb>
                  <div>
                    <h3 className="text-xl font-bold">Article feed is temporarily unavailable</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-[#B0B7C3]">
                      The hub will not invent article links when the production content dataset cannot be loaded. Existing canonical article URLs can still be discovered through a valid production sitemap after the dataset is present.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="mb-16 grid gap-4 md:grid-cols-3">
            {[
              { icon: BadgeCheck, title: "Editorial ownership", description: "Published pages link to an editorial team and a public publishing policy." },
              { icon: ShieldCheck, title: "Correct status handling", description: "Known article slugs return 200; unknown slugs return a genuine 404 rather than a generic soft-404 page." },
              { icon: Search, title: "Crawlable architecture", description: "Canonical URLs, internal links, robots rules, and sitemap entries work together without guaranteeing indexing." },
            ].map((item, index) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#111827]/70 p-6">
                <IconOrb gold={index === 1}>
                  <item.icon className="h-5 w-5" />
                </IconOrb>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#B0B7C3]">{item.description}</p>
              </div>
            ))}
          </section>

          <section className="mb-16" aria-labelledby="blog-faq">
            <div className="mb-7 flex items-start gap-4">
              <IconOrb>
                <FileCheck2 className="h-5 w-5" />
              </IconOrb>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#76A3FF]">FAQ</div>
                <h2 id="blog-faq" className="mt-1 text-3xl font-extrabold tracking-tight">Blog and editorial questions</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-[#B0B7C3]">Twelve visible answers about sources, updates, AI assistance, corrections, and practical use.</p>
              </div>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111827]/80 open:border-[#2563EB]/45">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-base font-bold [&::-webkit-details-marker]:hidden">
                    <span>{faq.q}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-[#9CA3AF] transition group-open:rotate-180 group-open:text-[#76A3FF]" />
                  </summary>
                  <div className="border-t border-white/10 px-5 py-5 text-sm leading-8 text-[#B0B7C3]">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(640px_320px_at_0%_0%,rgba(37,99,235,0.25),transparent_62%),linear-gradient(135deg,#111827_0%,#0D1730_100%)] p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5B301]">Trust and support</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight">Review how Sikhadenge publishes and corrects content</h2>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-[#B0B7C3]">Ownership, source standards, AI-assisted drafting, update rules, and corrections are documented publicly.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/editorial-policy" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F5B301] px-6 py-4 text-sm font-black text-[#0B1220]">
                  Editorial policy <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/authors/sikhadenge-editorial-team" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-sm font-bold">
                  Editorial team
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
