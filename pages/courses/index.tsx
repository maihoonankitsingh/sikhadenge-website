// pages/courses/index.tsx
import Head from "next/head";
import CourseCard from "../../components/CourseCard";
import { courses } from "../../lib/courses";

export default function CoursesPage() {
  return (
    <>
      <Head>
        <title>Courses | Sikhadenge</title>
      </Head>

      {/* NOTE:
         Header fixed hai to top padding dena padega.
         Gap zyada lag raha tha isliye yahan pt-24 rakha hai (pehle likely zyada tha). */}
      <main className="min-h-screen bg-[#0B1220] text-white">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-12">
          {/* HERO */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15]">
              The World's #1{" "}
              <span className="text-[#F5B301]">Affordable</span> and{" "}
              <span className="text-[#F5B301]">Job relevant</span>
              <br />
              Design courses
            </h1>

            <div className="mx-auto mt-4 h-[3px] w-32 rounded-full bg-white/70" />

            <p className="mt-4 text-sm text-white/70">
              Select a course to view details.
            </p>
          </div>

          {/* GRID */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

