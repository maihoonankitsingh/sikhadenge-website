import fs from "fs";
import path from "path";
import Head from "next/head";
import Link from "next/link";

type BlogItem = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
};

type Props = {
  posts: BlogItem[];
};

function getBlogPosts(): BlogItem[] {
  try {
    const filePath = path.join(process.cwd(), "data", "blogs.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as BlogItem[];
    return parsed.slice(0, 12);
  } catch {
    return [];
  }
}

export async function getStaticProps() {
  return {
    props: {
      posts: getBlogPosts(),
    },
    revalidate: 86400,
  };
}

export default function Blog({ posts }: Props) {
  const featured = posts.slice(0, 6);

  return (
    <>
      <Head>
        <title>AI Blog | Sikhadenge</title>
        <meta
          name="description"
          content="Sikhadenge AI blog with practical guides on ChatGPT, AI tools, automation, prompt engineering, SEO, AEO, GEO, freelancing, jobs, and digital growth."
        />
        <link rel="canonical" href="https://sikhadenge.in/blog" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sikhadenge.in/blog" />
        <meta property="og:title" content="AI Blog | Sikhadenge" />
        <meta
          property="og:description"
          content="Practical AI blog covering ChatGPT, AI tools, workflows, prompt engineering, search visibility, and career growth."
        />
      </Head>

      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="bg-[linear-gradient(135deg,#13204f_0%,#1f3f9e_100%)] px-4 pb-16 pt-24 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white/80 inline-flex">
              Sikhadenge AI Blog
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Practical AI guides built for search, answers, and conversions
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-blue-50/85 sm:text-lg">
              Explore actionable articles on ChatGPT, AI tools, prompt
              engineering, workflows, freelancing, jobs, business use cases, and
              SEO-ready growth.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "ChatGPT guides",
                "AI tools",
                "Prompt engineering",
                "SEO + AEO + GEO",
                "Freelancing",
                "Business automation",
              ].map((item) => (
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
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featured.length > 0 ? (
              featured.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                    {post.category || "AI Skills"}
                  </span>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 transition group-hover:text-blue-700">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {post.excerpt ||
                      "Practical AI guide with tools, workflow, answers, and real-world execution support."}
                  </p>
                  <div className="mt-5 text-sm font-bold text-blue-700">
                    Read article
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-[24px] border border-slate-200 bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] md:col-span-2 xl:col-span-3">
                <h2 className="text-2xl font-black text-slate-900">
                  Blog index is active
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-600">
                  Blog data file local copy me available nahi hai, lekin blog
                  system active hai. Production me available article slugs yahan
                  surface honge.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/ai-expert"
                    className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    Explore AI Expert
                  </Link>
                  <Link
                    href="/gen-ai-masterclass/register-one-step"
                    className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Join Free Masterclass
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
