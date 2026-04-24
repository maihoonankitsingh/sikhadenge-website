"use client";

import Image from "next/image";
import Link from "next/link";

type Course = {
  title: string;
  subtitle: string;
  chips: [string, string, string];
  href: string;
  image: string;
};

const COURSES: Course[] = [
  {
    title: "Graphic Design (Professional)",
    subtitle: "Ps • Ai • Id • Branding + Layout",
    chips: ["4 months", "2 hrs/day", "next batch soon"],
    href: "/courses/graphic-design",
    image: "/images/courses/graphic-design.webp",
  },
  {
    title: "Video Editing (Professional)",
    subtitle: "Pr • Ae • Au • Reels + Long form",
    chips: ["4 months", "2 hrs/day", "next batch soon"],
    href: "/courses/video-editing",
    image: "/images/courses/video-editing.webp",
  },
  {
    title: "Motion Graphics",
    subtitle: "Ae • Typography • Transitions",
    chips: ["4 months", "2 hrs/day", "next batch soon"],
    href: "/courses/motion-graphics",
    image: "/images/courses/motion-graphics.webp",
  },
  {
    title: "AI Mastery for Creators",
    subtitle: "AI workflows • Prompting • Productivity",
    chips: ["4 months", "2 hrs/day", "next batch soon"],
    href: "/courses/ai-mastery",
    image: "/images/courses/ai-mastery.webp",
  },
  {
    title: "AI Color Theory & Visual Systems",
    subtitle: "Color • Contrast • Composition • AI Assist",
    chips: ["2 months", "2 hrs/day", "next batch soon"],
    href: "/courses/ai-color-theory",
    image: "/images/courses/ai-color-theory.webp",
  },
  {
    title: "AI Typography & Layout",
    subtitle: "Hierarchy • Grid • Spacing • Systems",
    chips: ["2 months", "2 hrs/day", "next batch soon"],
    href: "/courses/ai-typography-layout",
    image: "/images/courses/ai-typography-layout.webp",
  },
  {
    title: "AI Branding & Packaging",
    subtitle: "Brand System • Packaging • Concepts",
    chips: ["2 months", "2 hrs/day", "next batch soon"],
    href: "/courses/ai-branding-packaging",
    image: "/images/courses/ai-branding-packaging.webp",
  },
];

export default function CourseCardsRow({ courses = COURSES }: { courses?: Course[] }) {
  return (
    <section className="w-full">
      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 items-stretch justify-items-start">
        {courses.map((c) => (
          <article
            key={c.href}
            className="w-full h-full rounded-[26px] overflow-hidden"
            style={{
              background: "#111827",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 10px 35px rgba(0,0,0,0.45)",
            }}
          >
            <div className="relative w-full h-[150px] sm:h-[160px]">
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 92vw, (max-width: 1280px) 48vw, 420px"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1220]/70 via-transparent to-transparent" />
            </div>

            <div className="p-6 flex flex-col">
              <h3
                className="text-[17px] sm:text-[18px] font-semibold leading-tight"
                style={{
                  color: "#FFFFFF",
                  minHeight: 22,
                  maxHeight: 22,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={c.title}
              >
                {c.title}
              </h3>

              <div
                className="mt-2 text-[12px] sm:text-[13px]"
                style={{
                  color: "rgba(176,183,195,1)",
                  minHeight: 20,
                  maxHeight: 20,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={c.subtitle}
              >
                {c.subtitle}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2" style={{ minHeight: 28 }}>
                {c.chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex w-full items-center justify-center rounded-full px-3 py-1 text-[11px] leading-none"
                    style={{
                      border: "1px solid rgba(255,255,255,0.10)",
                      background: "rgba(11,18,32,0.55)",
                      color: "rgba(255,255,255,0.86)",
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-5">
                <Link
                  href={c.href}
                  className="inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-sm sm:text-base font-semibold"
                  style={{
                    background: "#F5B301",
                    color: "#0B1220",
                    boxShadow: "0 0 18px rgba(245,179,1,0.55)",
                  }}
                >
                  View Course
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
