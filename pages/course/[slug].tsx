import Head from "next/head";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { getCourseBySlug, getCourseSlugs, type Course } from "../../lib/courses";

type Props = { course: Course };

export default function CoursePage({ course }: Props) {
  return (
    <>
      <Head>
        <title>{course.title} | Sikhadenge</title>
      </Head>

      <main className="min-h-screen bg-[#0B1220] text-white">
        <div className="mx-auto max-w-5xl px-4 pt-24 pb-12">
          <Link href="/courses" className="text-sm text-white/70 hover:text-white">
            ← Back to Courses
          </Link>

          <h1 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">
            {course.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              {course.durationText}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              {course.hoursText}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              {course.startText}
            </span>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[#111827] p-5">
            <p className="text-sm text-[#B0B7C3]">
              Details section can be expanded later (syllabus, tools, projects, outcomes).
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getCourseSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const slug = String(ctx.params?.slug ?? "");
  const course = getCourseBySlug(slug);

  if (!course) return { notFound: true };

  return {
    props: { course },
  };
};

