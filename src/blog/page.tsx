// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Sikhadenge",
  description: "Updates, learning guides, and student outcomes.",
};

const posts = [
  {
    title: "How to build a job-ready portfolio (step-by-step)",
    date: "Dec 2025",
    slug: "#",
  },
  {
    title: "Graphic Design roadmap for beginners (4 months)",
    date: "Dec 2025",
    slug: "#",
  },
  {
    title: "Freelancing basics: pricing, proposals, and delivery",
    date: "Dec 2025",
    slug: "#",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs uppercase tracking-widest text-white/50">Blog</p>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Guides + updates
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
              Learning guides, tool breakdowns, and practical workflow notes.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25 sm:w-72"
              placeholder="Search (UI only)"
            />
            <button
              type="button"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Filter
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <Link
              key={p.title}
              href={p.slug}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
            >
              <div className="text-xs text-white/50">{p.date}</div>
              <div className="mt-2 text-base font-semibold group-hover:text-white">
                {p.title}
              </div>
              <div className="mt-3 text-sm text-white/65">
                Read in 3–5 minutes.
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
