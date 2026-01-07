import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";

import { courses } from "../data/courses";
import { companies } from "../data/companies";
type Company = {
  name: string;
  sources: string[];
  fallback: string;
};

type Course = {
  title: string;
  slug: string;
  chips: string[];
  subtitle?: string;
  image?: string;
};

type VideoReview = {
  title: string;
  src?: string;     // optional mp4/webm if you have local files
  poster?: string;  // optional poster image
};

type TextReview = {
  name: string;
  role: string;
  text: string;
};


function firstSource(sources: string[], fallback: string) {
  return sources?.[0] || fallback;
}

/**
 * IMPORTANT:
 * Replace this list with the exact same "companies" list used in app/companies/page.tsx
 * (same names => same /public/images/companies/* assets).
 */


const videoReviews: VideoReview[] = [
  { title: "Learner Review 01", poster: "/images/reviews/poster-1.jpg" },
  { title: "Learner Review 02", poster: "/images/reviews/poster-2.jpg" },
  { title: "Learner Review 03", poster: "/images/reviews/poster-3.jpg" },
  { title: "Learner Review 04", poster: "/images/reviews/poster-4.jpg" },
];

const textReviews: TextReview[] = [
  {
    name: "Student (Batch 23)",
    role: "Graphic Design",
    text: "Structured classes + daily practice. Portfolio output was clear and measurable.",
  },
  {
    name: "Student (Batch 21)",
    role: "Video Editing",
    text: "Industry tools only. Feedback loop was fast, and projects improved week-by-week.",
  },
  {
    name: "Student (Batch 19)",
    role: "Motion Graphics",
    text: "Good pacing. Concepts were explained with practical tasks, not theory-heavy.",
  },
  {
    name: "Student (Batch 24)",
    role: "Beginner",
    text: "Support was consistent. I could track progress using assignments and reviews.",
  },
];

function FullBleed({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {children}
    </div>
  );
}

function CompaniesMarquee() {
  const loop = useMemo(() => [...companies, ...companies], []);

  return (
    <section className="mt-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Learners build portfolios aligned to real-world standards
            </h2>
            <p className="mt-2 text-sm md:text-base text-[#B0B7C3]">
              Tool-first training • practical projects • review-driven improvement
            </p>
          </div>

          <Link
            href="/companies"
            className="text-sm text-[#B0B7C3] hover:text-white underline underline-offset-4"
          >
            View all companies
          </Link>
        </div>
      </div>

      <FullBleed>
        <div className="mt-6 border-y border-[rgba(255,255,255,0.10)] bg-[#0B1220]">
          <div className="sd-home-marquee">
            <div className="sd-home-marquee__track">
              {loop.map((c, idx) => (
                <div className="sd-home-logo" key={`${c.name}-${idx}`} title={c.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={firstSource(c.sources, c.fallback)}
                    alt={c.name}
                    className="h-8 md:h-10 w-auto opacity-90"
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.dataset.fallbackApplied) return;
                      img.dataset.fallbackApplied = "1";
                      img.src = c.fallback;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </FullBleed>
    </section>
  );
}

function CoursesMarquee() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<number | null>(null);

  const loop = useMemo(() => [...courses, ...courses], []);

  useEffect(() => {
    const el = (typeof document !== "undefined" ? document.querySelector('[data-sd-course-viewport="1"]') : null) as HTMLElement | null;
    if (!el) return;

    const pauseBriefly = () => {

      setPaused(true);
      if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
      pauseTimer.current = window.setTimeout(() => setPaused(false), 1200);
    };

    el.addEventListener("wheel", pauseBriefly, { passive: true });
    el.addEventListener("touchstart", pauseBriefly, { passive: true });
    el.addEventListener("scroll", pauseBriefly, { passive: true });

    return () => {
      el.removeEventListener("wheel", pauseBriefly);
      el.removeEventListener("touchstart", pauseBriefly);
      el.removeEventListener("scroll", pauseBriefly);
      if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    };
  }, []);

  return (
    <section className="mt-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">Courses</h2>
            <p className="mt-2 text-sm md:text-base text-[#B0B7C3]">
              One structured track. Daily practice. Portfolio output.
            </p>
          </div>

          <Link
            href="/courses"
            className="sd-btn-secondary inline-flex items-center justify-center px-4 py-2 text-sm"
          >
            View all
          </Link>
        </div>
      </div>

      <FullBleed>
        <div className="mt-6">
          <div
            className="overflow-x-auto sd-home-scrollbar-hide"
            aria-label="Courses carousel" data-sd-course-viewport="1" ref={ref}>
            <div
              className={`sd-home-course-marquee ${paused ? "is-paused" : ""}`}
            >
              <div className="sd-home-course-marquee__track">
                {loop.map((c, idx) => (
                  <article
                    key={`${c.slug}-${idx}`}
                    className="sd-home-course-card sd-card"
                  >
                    <div
                      className="sd-home-course-card__media"
                      aria-hidden="true"
                      style={{
                        backgroundImage: c.image ? `url(${c.image})` : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="p-4">
                      <div className="text-base md:text-lg font-semibold text-white">
                        {c.title}
                      </div>
                      {c.subtitle ? (
                        <div className="mt-1 text-sm text-[#B0B7C3]">{c.subtitle}</div>
                      ) : null}

                      <div className="mt-3 flex flex-wrap gap-2">
                        {c.chips.map((chip) => (
                          <span
                            key={chip}
                            className="sd-home-chip"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4">
                        <Link
                          href={`/courses/${c.slug}`}
                          className="text-sm text-[#B0B7C3] hover:text-white underline underline-offset-4"
                        >
                          View Course
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FullBleed>
    </section>
  );
}

function ReviewsHome() {
  const videoLoop = useMemo(() => [...videoReviews], []);
  const textLoop = useMemo(() => [...textReviews, ...textReviews], []);

  return (
    <section className="mt-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Success Stories of our learners
            </h2>
            <p className="mt-2 text-sm md:text-base text-[#B0B7C3]">
              Video feedback + text reviews. Practical outcomes and progress.
            </p>
          </div>

          <Link
            href="/reviews"
            className="text-sm text-[#B0B7C3] hover:text-white underline underline-offset-4"
          >
            View all
          </Link>
        </div>

        {/* Video cards (reels style frames) */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {videoLoop.map((v, idx) => (
            <Link
              key={`${v.title}-${idx}`}
              href="/reviews"
              className="sd-home-video-card sd-card group"
              aria-label={v.title}
            >
              <div className="sd-home-video-card__frame">
                {v.src ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video
                    className="sd-home-video-card__media"
                    src={v.src}
                    poster={v.poster}
                    muted
                    playsInline
                    loop
                    autoPlay
                  />
                ) : (
                  <div className="sd-home-video-card__placeholder" />
                )}
                <div className="sd-home-video-card__overlay">
                  <div className="sd-home-play">
                    <span className="sd-home-play__tri" />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="text-sm font-medium text-white">{v.title}</div>
                <div className="mt-1 text-xs text-[#B0B7C3]">Tap to view</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Text reviews horizontal scroller (matches the same dark card style) */}
        <div className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-lg md:text-xl font-semibold text-white">Text Reviews</h3>
          </div>

          <div className="mt-4 border border-[rgba(255,255,255,0.10)] rounded-2xl bg-[#0B1220]">
            <div className="sd-home-marquee sd-home-marquee--slow">
              <div className="sd-home-marquee__track">
                {textLoop.map((r, idx) => (
                  <div className="sd-home-text-review sd-card" key={`${r.name}-${idx}`}>
                    <div className="text-sm font-semibold text-white">{r.name}</div>
                    <div className="text-xs text-[#B0B7C3]">{r.role}</div>
                    <div className="mt-3 text-sm text-[#B0B7C3] leading-relaxed">
                      {r.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3">
            <Link
              href="/reviews"
              className="text-sm text-[#B0B7C3] hover:text-white underline underline-offset-4"
            >
              View all reviews
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CounsellingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Close counselling form"
      />
      <div className="relative z-[61] max-w-xl mx-auto mt-16 px-4">
        <div className="sd-card border border-[rgba(255,255,255,0.10)] rounded-2xl bg-[#111827]">
          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg md:text-xl font-semibold text-white">
                  Counselling Form
                </div>
                <div className="mt-1 text-sm text-[#B0B7C3]">
                  Share details. Team will confirm batch + course fit.
                </div>
              </div>
              <button
                className="text-[#B0B7C3] hover:text-white"
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs text-[#B0B7C3]">Name</span>
                <input
                  className="mt-1 w-full rounded-xl bg-[#0B1220] border border-[rgba(255,255,255,0.10)] px-3 py-2 text-white outline-none"
                  name="name"
                  autoComplete="name"
                />
              </label>

              <label className="block">
                <span className="text-xs text-[#B0B7C3]">Phone</span>
                <input
                  className="mt-1 w-full rounded-xl bg-[#0B1220] border border-[rgba(255,255,255,0.10)] px-3 py-2 text-white outline-none"
                  name="phone"
                  autoComplete="tel"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-xs text-[#B0B7C3]">Interested course</span>
                <select
                  className="mt-1 w-full rounded-xl bg-[#0B1220] border border-[rgba(255,255,255,0.10)] px-3 py-2 text-white outline-none"
                  name="course"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {courses.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="text-xs text-[#B0B7C3]">Message (optional)</span>
                <textarea
                  className="mt-1 w-full rounded-xl bg-[#0B1220] border border-[rgba(255,255,255,0.10)] px-3 py-2 text-white outline-none"
                  name="message"
                  rows={3}
                />
              </label>

              <div className="md:col-span-2 flex flex-col md:flex-row gap-3 md:items-center md:justify-between mt-2">
                <div className="text-xs text-[#9CA3AF]">
                  Your details are used only for counselling and batch coordination.
                </div>
                <div className="flex gap-2">
                  <button type="button" className="sd-btn-secondary px-4 py-2 text-sm" onClick={onClose}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="sd-btn-primary px-4 py-2 text-sm"
                    onClick={() => {
                      // Wire this to your existing submit flow if needed.
                      onClose();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-4 text-xs text-[#9CA3AF]">
              Note: This modal is safe for build. If you already have an API submit endpoint, connect it here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {

  useEffect(() => {
    const el = (typeof document !== "undefined" ? document.querySelector('[data-sd-course-viewport="1"]') : null) as HTMLElement | null;
    if (!el) return;

    // Mobile only (coarse pointer). Desktop keeps CSS marquee.
    const isTouch =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;

    if (!isTouch) return;

    let raf = 0;
    let last = 0;
    let paused = false;
    let resumeTimer: any = null;

    const pause = () => {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };
    const scheduleResume = () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, 800);
    };

    const onTouchStart = () => pause();
    const onTouchEnd = () => scheduleResume();

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    const tick = (t: number) => {
      if (!last) last = t;
      const dt = t - last;
      last = t;

      if (!paused) {
        // Works with your duplicated list (scrollWidth / 2 loop)
        const half = el.scrollWidth / 2;
        el.scrollLeft += dt * 0.35; // speed
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  const [counsellingOpen, setCounsellingOpen] = useState(false);

  return (
    <Fragment>
      <Head>
        <title>Sikhadenge — Job-ready Design & Editing Courses</title>
        <meta
          name="description"
          content="Live online, structured courses with portfolio output and support. Learn industry tools with practical projects."
        />
      </Head>

      <main className="min-h-screen bg-[#0B1220] text-white">
        {/* (1) HERO */}
        <section className="pt-10 md:pt-14">
          <div className="max-w-6xl mx-auto px-4">
            <div
              className="sd-card border border-[rgba(255,255,255,0.10)] rounded-3xl bg-[#111827] overflow-hidden"
            >
              <div
                className="p-6 md:p-10"
                style={{
                  background:
                    "radial-gradient(900px 420px at 20% 10%, rgba(37,99,235,0.18), transparent 55%), radial-gradient(800px 420px at 80% 30%, rgba(245,179,1,0.14), transparent 55%)",
                }}
              >
                <div className="max-w-2xl">
                  <h1 className="text-2xl md:text-4xl font-semibold leading-tight">
                    Job-ready Graphic Design & Video Editing — affordable, using industry tools
                  </h1>
                  <p className="mt-4 text-sm md:text-base text-[#B0B7C3] leading-relaxed">
                    Live online classes • structured daily practice • portfolio-focused output • consistent support & review.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      className="sd-btn-primary px-5 py-3 text-sm"
                      onClick={() => setCounsellingOpen(true)}
                    >
                      Open counselling form
                    </button>

                    <div className="flex gap-3">
                      <Link
                        href="/courses"
                        className="sd-btn-secondary px-5 py-3 text-sm inline-flex items-center justify-center"
                      >
                        View Courses
                      </Link>
                      <Link
                        href="/reviews"
                        className="sd-btn-secondary px-5 py-3 text-sm inline-flex items-center justify-center"
                      >
                        Reviews
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-[#9CA3AF]">
                    Professional guidance only. Your details are used for counselling and scheduling.
                  </div>
                </div>

                {/* highlights (kept minimal, not marketing-heavy) */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="sd-card bg-[#0B1220] border border-[rgba(255,255,255,0.10)] rounded-2xl p-4">
                    <div className="text-sm font-semibold">Structured learning</div>
                    <div className="mt-1 text-sm text-[#B0B7C3]">Daily tasks, weekly milestones, clear outcomes.</div>
                  </div>
                  <div className="sd-card bg-[#0B1220] border border-[rgba(255,255,255,0.10)] rounded-2xl p-4">
                    <div className="text-sm font-semibold">Portfolio output</div>
                    <div className="mt-1 text-sm text-[#B0B7C3]">Project-based builds you can show.</div>
                  </div>
                  <div className="sd-card bg-[#0B1220] border border-[rgba(255,255,255,0.10)] rounded-2xl p-4">
                    <div className="text-sm font-semibold">Support + review</div>
                    <div className="mt-1 text-sm text-[#B0B7C3]">Feedback loops to improve faster.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* (2) COMPANIES MARQUEE */}
        <CompaniesMarquee />

        {/* (3) COURSES (auto-scrolling, manual scroll enabled) */}
        <CoursesMarquee />

        {/* Curriculum snapshot (kept as a small section; minimal change) */}
        <section className="mt-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="sd-card border border-[rgba(255,255,255,0.10)] rounded-3xl bg-[#111827] p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white">Curriculum snapshot</h2>
                  <p className="mt-2 text-sm md:text-base text-[#B0B7C3]">
                    Tools + fundamentals + projects + portfolio presentation.
                  </p>
                </div>
                <Link
                  href="/courses"
                  className="text-sm text-[#B0B7C3] hover:text-white underline underline-offset-4"
                >
                  Full curriculum
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="sd-card bg-[#0B1220] border border-[rgba(255,255,255,0.10)] rounded-2xl p-4">
                  <div className="text-sm font-semibold">Week-by-week structure</div>
                  <div className="mt-1 text-sm text-[#B0B7C3]">Clear progression, practical checkpoints.</div>
                </div>
                <div className="sd-card bg-[#0B1220] border border-[rgba(255,255,255,0.10)] rounded-2xl p-4">
                  <div className="text-sm font-semibold">Assignments + review</div>
                  <div className="mt-1 text-sm text-[#B0B7C3]">Daily practice with improvements tracked.</div>
                </div>
                <div className="sd-card bg-[#0B1220] border border-[rgba(255,255,255,0.10)] rounded-2xl p-4">
                  <div className="text-sm font-semibold">Portfolio packaging</div>
                  <div className="mt-1 text-sm text-[#B0B7C3]">Presentation-ready output for jobs/freelance.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* (4) REVIEWS / TESTIMONIALS */}
        <ReviewsHome />

        {/* (5) FINAL CTA (bottom counselling) */}
        <section className="mt-14 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="sd-card border border-[rgba(255,255,255,0.10)] rounded-3xl bg-[#111827] p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white">
                    Need help choosing the right track?
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-[#B0B7C3]">
                    Share your goal and current level. Counsellor will confirm batch and course fit.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    className="sd-btn-primary px-5 py-3 text-sm"
                    onClick={() => setCounsellingOpen(true)}
                  >
                    Open counselling form
                  </button>
                  <Link
                    href="/reviews"
                    className="sd-btn-secondary px-5 py-3 text-sm inline-flex items-center justify-center"
                  >
                    View reviews
                  </Link>
                </div>
              </div>

              <div className="mt-4 text-xs text-[#9CA3AF]">
                Your details are used only for counselling and scheduling.
              </div>
            </div>
          </div>
        </section>

        <CounsellingModal open={counsellingOpen} onClose={() => setCounsellingOpen(false)} />

        <style jsx global>{`
          /* Hide scrollbar (manual scroll still works) */
          .sd-home-scrollbar-hide {
            scrollbar-width: none;
          }
          .sd-home-scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          /* Logos marquee (reference behavior: translateX(-50%)) */
          .sd-home-marquee {
            overflow: hidden;
            width: 100%;
          }
          .sd-home-marquee__track {
            display: flex;
            width: max-content;
            align-items: center;
            gap: 28px;
            padding: 14px 18px;
            animation: sdMarquee 26s linear infinite;
            will-change: transform;
          }
          .sd-home-marquee--slow .sd-home-marquee__track {
            animation-duration: 34s;
          }
          @keyframes sdMarquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .sd-home-logo {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 10px 14px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(17, 24, 39, 0.55);
          }

          /* Courses marquee (continuous + manual scroll container) */
          .sd-home-course-marquee {
            overflow: hidden;
            width: 100%;
          }
          .sd-home-course-marquee__track {
            display: flex;
            width: max-content;
            gap: 14px;
            padding: 0 18px 6px 18px;
            animation: sdCourseMarquee 38s linear infinite;
            will-change: transform;
          }
          .sd-home-course-marquee.is-paused .sd-home-course-marquee__track {
            animation-play-state: paused;
          }
          .sd-home-course-marquee:hover .sd-home-course-marquee__track {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .sd-home-course-marquee__track,
            .sd-home-marquee__track {
              animation: none !important;
            }
          }
          @keyframes sdCourseMarquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .sd-home-course-card {
            width: 320px;
            min-width: 320px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            background: #111827;
            overflow: hidden;
          }
          .sd-home-course-card__media {
            height: 140px;
            background:
              radial-gradient(700px 220px at 20% 30%, rgba(37, 99, 235, 0.22), transparent 60%),
              radial-gradient(600px 220px at 85% 35%, rgba(245, 179, 1, 0.16), transparent 60%),
              linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0));
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          .sd-home-chip {
            display: inline-flex;
            align-items: center;
            height: 24px;
            padding: 0 10px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(11, 18, 32, 0.6);
            color: #b0b7c3;
            font-size: 12px;
          }

          /* Video cards */
          .sd-home-video-card {
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            background: #111827;
            overflow: hidden;
            text-decoration: none;
          }
          .sd-home-video-card__frame {
            position: relative;
            aspect-ratio: 9 / 16;
            background: #0b1220;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          .sd-home-video-card__media {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .sd-home-video-card__placeholder {
            width: 100%;
            height: 100%;
            background:
              radial-gradient(520px 240px at 20% 20%, rgba(37, 99, 235, 0.22), transparent 60%),
              radial-gradient(520px 240px at 80% 40%, rgba(245, 179, 1, 0.16), transparent 60%),
              linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0));
          }
          .sd-home-video-card__overlay {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at 50% 60%, rgba(0,0,0,0.25), rgba(0,0,0,0.55));
            opacity: 0.9;
            transition: opacity 180ms ease;
          }
          .sd-home-video-card:hover .sd-home-video-card__overlay {
            opacity: 1;
          }
          .sd-home-play {
            width: 54px;
            height: 54px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.16);
            background: rgba(17, 24, 39, 0.55);
            box-shadow: 0 0 18px rgba(37, 99, 235, 0.55);
            display: grid;
            place-items: center;
          }
          .sd-home-play__tri {
            width: 0;
            height: 0;
            border-left: 14px solid white;
            border-top: 9px solid transparent;
            border-bottom: 9px solid transparent;
            margin-left: 3px;
          }

          /* Text review cards inside marquee */
          .sd-home-text-review {
            width: 320px;
            min-width: 320px;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 18px;
            background: #111827;
            padding: 14px;
          }
          .sd-home-course-card__media{ position:relative; overflow:hidden; }
          .sd-home-course-card__img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.92; }

          /* HOME: Courses sample-card override */
          /* Only affects the existing Home Courses cards */
          .sd-home-course-card{
            width: 360px;
            min-width: 360px;
            border-radius: 24px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.10);
            background: #111827;
          }

          /* top image area like sample */
          .sd-home-course-card__media{
            height: 190px;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            border-bottom: 1px solid rgba(255,255,255,0.10);
            position: relative;
          }
          .sd-home-course-card__media::after{
            content:"";
            position:absolute;
            inset:0;
            background: linear-gradient(180deg, rgba(11,18,32,0.10), rgba(11,18,32,0.70));
          }

          /* body padding like sample */
          .sd-home-course-card__body,
          .sd-home-course-card__content{
            padding: 18px !important;
          }

          /* make the 'View Course' link look like a button (without touching other links) */
          .sd-home-course-card a[href^="/courses/"]{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 42px;
            padding: 0 14px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.10);
            background: rgba(11,18,32,0.40);
            color: #FFFFFF;
            font-weight: 700;
            text-decoration: none;
            white-space: nowrap;
          }
          .sd-home-course-card a[href^="/courses/"]:hover{
            border-color: rgba(37,99,235,0.55);
            box-shadow: 0 0 18px rgba(37,99,235,0.18);
          }


          /* HOME: Courses button center */
          .sd-home-course-card a[href^="/courses/"]{
            margin: 12px auto 0 auto !important;
          }


          /* HOME: Courses button full width */
          /* Full-width centered button like sample */
          .sd-home-course-card a[href^="/courses/"]{
            display: flex !important;
            width: 100% !important;
            height: 46px !important;
            justify-content: center !important;
            align-items: center !important;
            margin: 14px 0 0 0 !important;
            border-radius: 14px !important;
            background: #2563EB !important;
            border: 1px solid rgba(255,255,255,0.10) !important;
            color: #FFFFFF !important;
            font-weight: 800 !important;
            text-decoration: none !important;
            box-shadow: 0 0 18px rgba(37,99,235,0.22) !important;
          }
          .sd-home-course-card a[href^="/courses/"]:hover{
            background: #1D4ED8 !important;
            box-shadow: 0 0 18px rgba(37,99,235,0.30) !important;
          }


          /* HOME: Courses manual scroll */
          [data-sd-course-viewport="1"]{
            overflow-x: auto !important;
            overflow-y: hidden !important;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-x;
            overscroll-behavior-x: contain;
            scroll-behavior: smooth;
            scrollbar-width: thin;
          }
          [data-sd-course-viewport="1"]::-webkit-scrollbar{ height: 8px; }
          [data-sd-course-viewport="1"]::-webkit-scrollbar-thumb{
            background: rgba(255,255,255,0.12);
            border-radius: 999px;
          }

          /* On mobile, disable CSS marquee animation inside Courses
             (auto-scroll is handled via scrollLeft JS so finger scroll stays smooth) */
          @media (pointer: coarse){
            [data-sd-course-viewport="1"] *{ animation: none !important; }
          }

        `}</style>
      </main>
    </Fragment>
  );
}

