import Link from "next/link";
import type { Course } from "../lib/courses";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  const { slug, category, title, durationText, hoursText, startText, coverImage } = course;

  return (
    <div className="h-full rounded-2xl border border-white/10 bg-[#111827] shadow-[0_30px_80px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden shrink-0">
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-[#0B1220]" />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-[#0B1220]" />

        {category ? (
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[12px] font-medium text-white/90">
              {category}
            </span>
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
        {/* Title: smaller + single-line */}
        <h3 className="text-[15px] md:text-[16px] font-semibold tracking-tight text-white truncate">
          {title}
        </h3>

        {/* meta chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          {durationText ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/80">
              {durationText}
            </span>
          ) : null}
          {hoursText ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/80">
              {hoursText}
            </span>
          ) : null}
          {startText ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/80">
              {startText}
            </span>
          ) : null}
        </div>

        {/* Button pinned to bottom */}
        <div className="mt-auto pt-4">
          <Link
            href={`/course/${slug}`}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-3 text-[14px] font-semibold text-white hover:bg-[#1D4ED8] transition"
          >
            View Course
            <span className="transition group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

