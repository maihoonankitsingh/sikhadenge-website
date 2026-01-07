import { useMemo, useState } from "react";
import Link from "next/link";
import CounsellingModal from "../components/CounsellingModal";

type Course = {
  title: string;
  slug: string;
  tag: string;
  duration: string;
  level: string;
  mode: string;
  highlights: string[];
};

export default function CoursesPage() {
  const [open, setOpen] = useState(false);

  const courses: Course[] = useMemo(
    () => [
      {
        title: "Graphic Design (Foundation to Portfolio)",
        slug: "graphic-design-foundation",
        tag: "Design",
        duration: "8 weeks",
        level: "Beginner → Intermediate",
        mode: "Live Online",
        highlights: ["Photoshop + Illustrator", "Typography + Layout", "Branding basics"],
      },
      {
        title: "Video Editing (Reels + Longform)",
        slug: "video-editing-reels-longform",
        tag: "Editing",
        duration: "6 weeks",
        level: "Beginner → Intermediate",
        mode: "Live Online",
        highlights: ["Premiere Pro workflow", "Story + pacing", "Export + formats"],
      },
      {
        title: "Motion Graphics (After Effects Track)",
        slug: "motion-graphics-after-effects",
        tag: "Motion",
        duration: "6 weeks",
        level: "Intermediate",
        mode: "Live Online",
        highlights: ["Keyframes + graph editor", "Text + logo animation", "Compositing basics"],
      },
      {
        title: "Branding & Packaging Design",
        slug: "branding-packaging",
        tag: "Branding",
        duration: "4 weeks",
        level: "Intermediate",
        mode: "Live Online",
        highlights: ["Brand identity system", "Packaging layout", "Mockups + presentation"],
      },
      {
        title: "Color Theory + Typography (Design Essentials)",
        slug: "color-theory-typography",
        tag: "Essentials",
        duration: "3 weeks",
        level: "All levels",
        mode: "Live Online",
        highlights: ["Color harmony", "Typography rules", "Hierarchy + readability"],
      },
      {
        title: "AI Tools for Creators (Design + Editing)",
        slug: "ai-tools-creators",
        tag: "AI",
        duration: "3 weeks",
        level: "All levels",
        mode: "Live Online",
        highlights: ["Prompting workflows", "Speed + consistency", "Output polish"],
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <section className="mx-auto max-w-7xl px-4 pt-24 pb-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111827] px-3 py-1 text-xs text-[#B0B7C3]">
              <span className="h-2 w-2 rounded-full bg-[#F5B301]" />
              Courses • Sikhadenge
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Find a course to fast-forward your career
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#B0B7C3]">
              Live online training focused on outcomes, assignments, and portfolio-ready work.
              Choose a track and book a counselling call.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#F5B301] px-5 text-sm font-semibold text-[#0B1220] hover:shadow-[0_0_18px_rgba(245,179,1,0.55)] transition-shadow"
          >
            Enquire
          </button>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {courses.map((c) => (
            <div
              key={c.slug}
              className="rounded-2xl border border-white/10 bg-[#111827] overflow-hidden"
            >
              {/* image placeholder */}
              <div className="h-40 bg-gradient-to-br from-[#0B1220] via-[#111827] to-[#0B1220] border-b border-white/10 relative">
                <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                  {c.tag}
                </div>
              </div>

              <div className="p-5">
                <div className="text-lg font-bold leading-6">{c.title}</div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-[#B0B7C3]">
                  <div className="rounded-lg border border-white/10 bg-[#0B1220]/40 px-2 py-2">
                    {c.duration}
                  </div>
                  <div className="rounded-lg border border-white/10 bg-[#0B1220]/40 px-2 py-2">
                    {c.mode}
                  </div>
                  <div className="rounded-lg border border-white/10 bg-[#0B1220]/40 px-2 py-2">
                    {c.level}
                  </div>
                </div>

                <ul className="mt-4 grid gap-2 text-sm text-[#B0B7C3]">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#F5B301]" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/course/${c.slug}`}
                    className="inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-white/10 bg-[#0B1220]/40 text-sm font-semibold text-white hover:bg-[#0B1220]/60"
                  >
                    View details
                  </Link>

                  <button
                    onClick={() => setOpen(true)}
                    className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-[#2563EB] text-sm font-semibold text-white hover:shadow-[0_0_18px_rgba(37,99,235,0.55)] transition-shadow"
                  >
                    Counselling
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CounsellingModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}

