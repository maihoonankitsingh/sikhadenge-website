import Link from "next/link";
import generatedPages from "../../data/generated-seo.json";
import { Search, MapPin, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Professional Experts Directory | Sikhadenge",
  description: "Find the best AI and Digital Experts specialized in your industry and city.",
};

function safeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ExpertsDirectory() {
  const cities = Array.from(
    new Set(
      generatedPages
        .map((p: any) => safeString(p.city))
        .filter(Boolean) as string[]
    )
  ).sort((a, b) => a.localeCompare(b));

  const skills = Array.from(
    new Set(
      generatedPages
        .map((p: any) => safeString(p.skill))
        .filter(Boolean) as string[]
    )
  ).sort((a, b) => a.localeCompare(b));

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50 pb-16 pt-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-black sm:text-6xl">
            Expert <span className="text-blue-600">Directory</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600">
            Browse through our network of specialized expert pages across India.
            Pick your skill focus or location to explore relevant pages.
          </p>

          <div className="relative mx-auto max-w-2xl">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by skill or city..."
              className="w-full rounded-2xl border border-slate-200 py-4 pl-12 pr-4 shadow-sm outline-none transition-all focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-4 py-20 md:grid-cols-2">
        <div>
          <div className="mb-8 flex items-center">
            <GraduationCap className="mr-3 h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Skills / Categories</h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {skills.map((skill) => (
              <Link
                key={skill}
                href={`/expert/${slugify(skill)}`}
                className="rounded-xl border border-slate-100 bg-slate-50 px-6 py-4 font-semibold shadow-sm transition-all hover:border-blue-200 hover:bg-white hover:text-blue-600"
              >
                {skill}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8 flex items-center">
            <MapPin className="mr-3 h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Top Locations</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {cities.map((city) => (
              <Link
                key={city}
                href="#"
                className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-3 text-slate-600 transition-all hover:bg-white hover:text-blue-600"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-20 text-center text-white">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="mb-2 text-5xl font-black">{skills.length}+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-100">
              Categories
            </div>
          </div>
          <div>
            <div className="mb-2 text-5xl font-black">{cities.length}+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-100">
              Cities
            </div>
          </div>
          <div>
            <div className="mb-2 text-5xl font-black">{generatedPages.length}+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-100">
              Expert Pages
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
