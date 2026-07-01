import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Learning Paths, No-Code AI Jobs and Practical Tool Workflows",
  description:
    "Explore Sikhadenge learn pages for AI tools, no-code workflows, SEO, AEO, GEO, automation, content, business, jobs, freelancing, and portfolio-ready projects.",
  alternates: {
    canonical: "https://sikhadenge.in/learn",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LearnHubPage() {
  const directories = Array.from({ length: 100 }, (_, index) => index + 1);

  const clusters = [
    "AI tools for jobs",
    "AI tools for freelancing",
    "AI tools for students",
    "AI tools for HR",
    "AI tools for SEO",
    "AI tools for content",
    "AI tools for marketing",
    "AI tools for business",
    "No-code AI workflows",
    "Portfolio-ready AI projects",
  ];

  return (
    <main className="bg-[#F3F7F1] text-slate-950">
      <section className="bg-[radial-gradient(circle_at_top_left,#11C5AE_0%,#0B6B68_34%,#06111F_78%)] text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-300">
            Sikhadenge learning directory
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
            Practical AI learning paths for jobs, freelancing, business and portfolio proof
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">
            Explore practical how-to-use guides for AI tools, SEO, AEO, GEO, automation, content, data, HR, business workflows and no-code AI career paths.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {clusters.map((item) => (
            <div key={item} className="rounded-3xl bg-white p-5 font-black shadow-sm ring-1 ring-slate-200">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-black">Browse all learn pages</h2>
          <p className="mt-3 max-w-3xl leading-8 text-slate-700">
            These directory pages connect Sikhadenge learn URLs so search engines and users can discover the full learning graph.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {directories.map((page) => {
              const label = String(page).padStart(3, "0");
              return (
                <a
                  key={label}
                  href={`/learn-directory-${label}.html`}
                  className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold ring-1 ring-slate-200 hover:bg-slate-100"
                >
                  Learn Directory {label}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
