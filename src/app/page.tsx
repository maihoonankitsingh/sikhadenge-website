// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff7f1] text-slate-900">
      <Navbar />

      <Hero />

      <CareerPath />

      <Courses />

      <WhatSetsApart />

      <Testimonials />

      <Masterclasses />

      <AlumniStats />

      <Reviews />

      <Companies />

      <InstructorCTA />

      <BlogTeaser />

      <Newsletter />

      <Footer />

      <WhatsAppFloat />
    </main>
  );
}

/* ------------------------------ NAVBAR ------------------------------ */
/** Logo fix:
 * Put logo here: public/brand/logo.png
 * Then it will work: src="/brand/logo.png"
 */
function Navbar() {
  const nav = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 mb-4 rounded-2xl border border-black/5 bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between px-4 py-3 sm:px-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-36">
                <Image
                  src="/brand/logo.png"
                  alt="Sikhadenge"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-sm font-semibold">Sikhadenge</div>
                <div className="text-xs text-slate-500">Learn • Earn • Grow</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {i.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="rounded-full bg-[#ff6b57] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,107,87,0.35)] hover:opacity-95"
              >
                Enquiry
              </Link>

              <div className="md:hidden">
                <details className="relative">
                  <summary className="list-none cursor-pointer rounded-full border border-black/10 bg-white px-3 py-2 text-sm">
                    Menu
                  </summary>
                  <div className="absolute right-0 mt-2 w-44 rounded-xl border border-black/10 bg-white p-2 shadow-lg">
                    {nav.map((i) => (
                      <Link
                        key={i.href}
                        href={i.href}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      >
                        {i.label}
                      </Link>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ HERO ------------------------------ */
function Hero() {
  const chips = ["Graphic Design", "Video Editing", "Motion Graphics", "AI Tools"];

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff1e8] via-[#fff8f3] to-[#f4efff]" />
      <div className="absolute inset-0 opacity-70 [background:radial-gradient(900px_500px_at_80%_20%,rgba(255,107,87,0.18),transparent_55%),radial-gradient(700px_450px_at_15%_75%,rgba(88,101,242,0.14),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-slate-700">
              <span className="h-2 w-2 rounded-full bg-[#ff6b57]" />
              Live Online • Projects • Portfolio • Mentorship
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Upskilling platform for
              <span className="block">Creators, Designers</span>
              <span className="block">& Job-ready Learners</span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-slate-700 sm:text-lg">
              Industry-standard tools, daily live classes, real projects, and a structured
              mentorship system to build a premium portfolio.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-[#ff6b57] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,107,87,0.35)] hover:opacity-95"
              >
                Schedule 1:1 Free counselling
              </Link>

              <Link
                href="/blog"
                className="rounded-full border border-black/10 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-white"
              >
                View Blog
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-slate-700"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { k: "1000+", v: "Learners trained" },
                { k: "Live", v: "Mentor-led classes" },
                { k: "Projects", v: "Portfolio outcomes" },
              ].map((m) => (
                <div
                  key={m.k}
                  className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
                >
                  <div className="text-xl font-extrabold text-slate-900">{m.k}</div>
                  <div className="mt-1 text-sm text-slate-600">{m.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">Trustpilot</span>
                <span>4.7</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">Facebook</span>
                <span>4.9</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5">
            <div className="grid gap-4">
              <div className="rounded-3xl border border-black/10 bg-white/70 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                <div className="text-xs font-semibold text-slate-500">Career Launchpad</div>
                <div className="mt-2 text-2xl font-extrabold text-slate-900">
                  Structured learning system
                </div>
                <div className="mt-4 grid gap-3">
                  {[
                    ["Daily practice", "Assignments + feedback loop to improve fast."],
                    ["Portfolio building", "Real project-style work that looks premium."],
                    ["Mentorship & support", "Doubt support + guidance for next steps."],
                  ].map(([t, d]) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-black/10 bg-white/70 p-4"
                    >
                      <div className="font-semibold text-slate-900">{t}</div>
                      <div className="mt-1 text-sm text-slate-600">{d}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-black/10 bg-[#ffe9dc] p-6">
                  <div className="text-2xl font-extrabold text-slate-900">
                    Interactive
                    <br />
                    Classes
                    <br />
                    on Zoom
                  </div>
                </div>

                <div className="rounded-3xl border border-black/10 bg-[#efeaff] p-6">
                  <div className="text-2xl font-extrabold text-slate-900">
                    Industry
                    <br />
                    Recognized
                    <br />
                    Certificates
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white/70 p-6">
                <div className="text-sm text-slate-600">Outcome</div>
                <div className="mt-1 text-lg font-semibold text-slate-900">
                  Job / freelance-ready portfolio
                </div>
                <div className="mt-4 h-28 rounded-2xl border border-black/10 bg-gradient-to-br from-slate-100 to-slate-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CAREER PATH ------------------------------ */
function CareerPath() {
  const roles = [
    "Graphic Designer",
    "Video Editor",
    "Motion Designer",
    "Social Media Designer",
    "Brand Designer",
    "UI/UX Starter",
  ];

  return (
    <section className="relative bg-white">
      <div className="absolute inset-0 opacity-70 [background:radial-gradient(800px_400px_at_20%_55%,rgba(255,107,87,0.10),transparent_55%),radial-gradient(900px_450px_at_85%_40%,rgba(88,101,242,0.10),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Shape <span className="text-slate-500 font-medium">your</span> creative future
              <br />
              with the <span className="font-extrabold">right career</span> path
            </h2>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-700">
              {[
                ["1", "Discover your interests"],
                ["2", "Explore career paths"],
                ["3", "Build the right skills"],
              ].map(([n, t]) => (
                <span key={n} className="inline-flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#111827] text-white text-xs">
                    {n}
                  </span>
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {roles.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <div>Match accuracy</div>
                <div>Trusted by 10k+ learners</div>
              </div>

              <div className="mt-5 rounded-2xl border border-black/10 bg-[#fff7f1] p-5">
                <div className="text-lg font-semibold text-slate-900">
                  Get a career plan (free)
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  We will suggest the best path based on your goals and availability.
                </div>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#ff6b57] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,107,87,0.30)] hover:opacity-95"
                >
                  Find My Career Path →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ COURSES ------------------------------ */
function Courses() {
  const courses = [
    {
      tag: "Design",
      title: "Professional Graphic Design Program",
      price: "₹15,000",
      meta: "4 Months • 120+ Hours • Jan 05",
    },
    {
      tag: "Editing",
      title: "Video Editing + Motion Basics",
      price: "₹15,000",
      meta: "4 Months • 120+ Hours • Jan 10",
    },
    {
      tag: "AI Tools",
      title: "AI Tools for Creators (Practical)",
      price: "₹9,999",
      meta: "6 Weeks • 40+ Hours • Jan 17",
    },
    {
      tag: "Motion",
      title: "After Effects Motion Graphics Track",
      price: "₹15,000",
      meta: "4 Months • 120+ Hours • Jan 25",
    },
    {
      tag: "Design",
      title: "Brand Identity + Portfolio Projects",
      price: "₹12,999",
      meta: "6 Weeks • 35+ Hours • Jan 27",
    },
    {
      tag: "Editing",
      title: "Short-form Reels Editing (Advanced)",
      price: "₹7,999",
      meta: "4 Weeks • 25+ Hours • Feb 02",
    },
  ];

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#fff7f1]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Find a course to fast-forward your career
            </h2>
            <p className="mt-2 text-slate-600">
              Premium curriculum + projects + mentorship.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#5865f2] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(88,101,242,0.25)] hover:opacity-95"
          >
            Explore all courses →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <div
              key={c.title}
              className="rounded-3xl border border-black/10 bg-white p-4 shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
            >
              <div className="relative h-40 overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-slate-100 to-slate-50">
                <span className="absolute left-3 top-3 rounded-full bg-[#ff6b57] px-3 py-1 text-xs font-semibold text-white">
                  {c.tag}
                </span>
              </div>

              <div className="mt-4">
                <div className="text-lg font-bold text-slate-900">{c.title}</div>
                <div className="mt-2 text-sm text-slate-600">
                  <span className="font-semibold text-[#5865f2]">{c.price}</span>
                  <span className="mx-2 text-slate-300">•</span>
                  {c.meta}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Get Brochure
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#ff6b57] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(255,107,87,0.25)] hover:opacity-95"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white hover:bg-slate-50">
            ‹
          </button>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-white hover:opacity-95">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ WHAT SETS APART ------------------------------ */
function WhatSetsApart() {
  const points = [
    { accent: "Experience", title: "Engaging and collaborative learning environments" },
    { accent: "Mentors", title: "Guidance from industry mentors" },
    { accent: "Certificate", title: "Industry recognized certificate" },
    { accent: "Support", title: "Assistance for job seekers (portfolio + interview prep)" },
  ];

  return (
    <section className="relative bg-white">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-xs font-semibold tracking-widest text-[#5865f2]">
          WHAT SETS US APART
        </div>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Find Out More About Learning Experience at Sikhadenge
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border border-black/10 bg-gradient-to-br from-[#ffe9dc] to-[#efeaff] shadow-[0_18px_45px_rgba(0,0,0,0.06)]" />
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-4">
              {points.map((p) => (
                <div
                  key={p.title}
                  className="flex items-start gap-4 rounded-2xl border border-[#ff6b57]/20 bg-[#fff3ef] p-5"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white border border-black/10">
                    <span className="text-sm font-bold text-[#ff6b57]">✓</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    <span className="text-[#ff6b57]">{p.accent}</span> {p.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ TESTIMONIALS ------------------------------ */
/** If you want exact thumbnails:
 * Upload 4 images and I will map them.
 */
function Testimonials() {
  const items = [
    { name: "Shivam Rawat", role: "Designer" },
    { name: "Subhiksha Saravanan", role: "Creator" },
    { name: "Sneha Sharma", role: "Video Editor" },
    { name: "Azna Parveen", role: "Student" },
  ];

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff7f1] to-white" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Success Stories of Our Learners
            </h2>
            <p className="mt-2 text-slate-600">Video testimonials (replace later).</p>
          </div>
          <button className="hidden sm:grid h-11 w-11 place-items-center rounded-full bg-slate-900 text-white">
            →
          </button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t) => (
            <div key={t.name}>
              <div className="relative h-72 overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-[#7c86ff] to-[#ffe9dc] shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-white/85 shadow-lg">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-[#ff6b57] text-white">
                      ▶
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="font-bold text-slate-900">{t.name}</div>
                <div className="text-sm text-slate-600">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ MASTERCLASSES ------------------------------ */
function Masterclasses() {
  const posters = ["UX-UI Design", "V-Ray", "Rhino", "Revit Skills"];

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[#0b1020]" />
      <div className="absolute inset-0 opacity-70 [background:radial-gradient(900px_500px_at_20%_30%,rgba(88,101,242,0.25),transparent_60%),radial-gradient(900px_500px_at_85%_60%,rgba(255,107,87,0.22),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-white">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Live Masterclasses by industry experts with 8+ years of exp.
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posters.map((p) => (
            <div
              key={p}
              className="relative h-72 overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                LIVE
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-sm font-semibold">
                {p}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ ALUMNI STATS ------------------------------ */
function AlumniStats() {
  return (
    <section className="relative bg-white">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-xs font-semibold tracking-widest text-[#5865f2]">
          OUR ALUMNI NETWORK
        </div>

        <div className="mt-3 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Your love inspires us,
              <br />
              every minute
            </h2>
            <p className="mt-4 text-slate-600 max-w-lg">
              Outcome-focused learning that helps you apply real skills in real work.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-extrabold text-[#ff6b57]">93%</div>
                <div className="mt-2 text-sm text-slate-600">
                  Participants complete the course successfully
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#ff6b57]">9/10</div>
                <div className="mt-2 text-sm text-slate-600">
                  Participants reported better learning outcomes
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-16 w-16 rounded-full border border-black/10 bg-gradient-to-br from-[#ffe9dc] to-[#efeaff]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ REVIEWS ------------------------------ */
function Reviews() {
  const reviews = [
    { name: "Garima Mour", text: "Clear explanations, beginner friendly, practical." },
    { name: "Atharv Kulkarni", text: "Structured sessions and good guidance." },
    { name: "Avani Alti", text: "Mentorship helped me get clarity on next steps." },
    { name: "Simran Ratnani", text: "Very interactive and project-focused learning." },
    { name: "Maurya Shejav", text: "Helped me understand workflow and practice." },
    { name: "Bedanta Baruah", text: "Loved the sessions, useful for industry skills." },
  ];

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#fff7f1]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
          What learners say
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center justify-between">
                <div className="font-bold text-slate-900">{r.name}</div>
                <div className="text-xs text-[#5865f2] font-semibold">Alumni</div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ COMPANIES ------------------------------ */
function Companies() {
  const labels = ["PW", "Trainman", "DCS", "redBus", "Hotstar", "Studioz", "Flipkart", "CannonDesign", "More", "More", "More", "More"];

  return (
    <section className="relative bg-white">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-center text-2xl font-extrabold text-slate-900">
          Companies our students work for
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {labels.map((l, idx) => (
            <div
              key={idx}
              className="mx-auto flex h-16 w-full max-w-[240px] items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
            >
              <div className="text-sm font-semibold text-slate-500">{l}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-sm font-semibold text-slate-700">
          56+ more Companies
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ INSTRUCTOR CTA ------------------------------ */
function InstructorCTA() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#fff7f1]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {["#ff6b57", "#ffd56a", "#7c86ff", "#ff74d1"].map((c, idx) => (
                <div key={idx} className="h-40 rounded-3xl" style={{ background: c }} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Become an instructor!
            </h2>
            <p className="mt-4 max-w-xl text-slate-600">
              Share your expertise. Design your curriculum with support, and deliver workshops
              to learners.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3 text-sm text-slate-700">
              <div className="rounded-2xl border border-black/10 bg-white p-4">Build your brand</div>
              <div className="rounded-2xl border border-black/10 bg-white p-4">Supplement income</div>
              <div className="rounded-2xl border border-black/10 bg-white p-4">Networking opportunities</div>
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#ff6b57] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,107,87,0.30)] hover:opacity-95"
            >
              Start Teaching with us →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ BLOG TEASER ------------------------------ */
function BlogTeaser() {
  const posts = [
    { tag: "Editing", title: "Reels editing workflow: from raw to final", date: "Nov 13, 2025", read: "4 min", big: true },
    { tag: "Design", title: "Typography basics that upgrade your designs", date: "Nov 13, 2025", read: "6 min" },
    { tag: "AI Tools", title: "Practical prompts for creatives", date: "Nov 13, 2025", read: "7 min" },
    { tag: "Motion", title: "AE basics for motion projects", date: "Nov 10, 2025", read: "4 min" },
  ];

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[#f5f0ff]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-xs font-semibold tracking-widest text-[#5865f2]">BLOGS</div>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Explore our newest and most-read blog posts.
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            View all →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            {posts
              .filter((p) => p.big)
              .map((p) => (
                <div
                  key={p.title}
                  className="relative h-[340px] overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-[#5865f2] to-[#ff6b57] shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-black/0" />
                  <div className="absolute left-6 bottom-6 right-6 text-white">
                    <span className="inline-flex rounded bg-white/20 px-2 py-1 text-xs font-semibold">
                      {p.tag}
                    </span>
                    <div className="mt-3 text-2xl font-extrabold leading-snug">{p.title}</div>
                    <div className="mt-2 text-sm text-white/80">
                      {p.date} • {p.read}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="lg:col-span-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {posts
                .filter((p) => !p.big)
                .map((p) => (
                  <div
                    key={p.title}
                    className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
                  >
                    <div className="h-32 bg-gradient-to-br from-[#efeaff] to-[#ffe9dc]" />
                    <div className="p-5">
                      <span className="inline-flex rounded bg-[#5865f2] px-2 py-1 text-xs font-semibold text-white">
                        {p.tag}
                      </span>
                      <div className="mt-3 font-bold text-slate-900">{p.title}</div>
                      <div className="mt-2 text-sm text-slate-600">
                        {p.date} • {p.read}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ NEWSLETTER ------------------------------ */
function Newsletter() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[#ff6b57]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 text-white">
            <h2 className="text-3xl font-extrabold">
              Subscribe to Our Newsletter For Weekly Update 🚀
            </h2>
            <p className="mt-3 text-white/85">
              Be the first to know about our new <span className="font-semibold italic">Blogs</span>,{" "}
              <span className="font-semibold italic">Courses</span> &{" "}
              <span className="font-semibold italic">Masterclasses</span>!
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
              <div className="grid gap-4">
                <input
                  placeholder="Enter your Email address"
                  className="h-12 w-full rounded-xl border border-black/10 px-4 outline-none focus:ring-2 focus:ring-[#5865f2]/30"
                />
                <button className="h-12 w-full rounded-xl bg-[#5865f2] text-sm font-semibold text-white shadow-[0_16px_35px_rgba(88,101,242,0.25)] hover:opacity-95">
                  Get Weekly Updates for Free!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ FOOTER ------------------------------ */
function Footer() {
  return (
    <footer className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-[#b45309]/70" />
      <div className="absolute inset-0 opacity-40 [background:radial-gradient(900px_400px_at_85%_70%,rgba(255,120,70,0.35),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 text-white">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="relative h-12 w-44">
              <Image src="/brand/logo.png" alt="Sikhadenge" fill className="object-contain" />
            </div>
            <div className="mt-3 text-sm text-white/75">Sikhne ka Sahi Platform</div>
          </div>

          <div className="md:col-span-2">
            <div className="text-sm font-semibold text-white/90">Pages</div>
            <div className="mt-4 grid gap-3 text-sm text-white/80">
              <Link className="hover:text-white" href="/">Home</Link>
              <Link className="hover:text-white" href="/about-us">About Us</Link>
              <Link className="hover:text-white" href="/contact">Contacts</Link>
              <Link className="hover:text-white" href="/blog">Blog Page</Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-sm font-semibold text-white/90">Policies</div>
            <div className="mt-4 grid gap-3 text-sm text-white/80">
              <Link className="hover:text-white" href="/refund-policy">Refund Policy</Link>
              <Link className="hover:text-white" href="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-sm font-semibold text-white/90">Contact</div>
            <div className="mt-4 grid gap-2 text-sm text-white/85">
              <div>+91-8808505575</div>
              <div>support@sikhadenge.in</div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-white/90">
              {["f", "ig", "in", "yt", "Be", "p"].map((t) => (
                <a
                  key={t}
                  href="#"
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
                >
                  {t}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 md:text-right">
            <div className="text-sm text-white/80">
              Copyright-
              <br />
              SikhaDenge (Parented by ThinkGrow)
              <br />© {new Date().getFullYear()} - All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ FLOATING BUTTONS ------------------------------ */
function WhatsAppFloat() {
  const phone = "918808505575";
  const wa = `https://wa.me/${phone}?text=${encodeURIComponent("Hi, I want 1:1 counselling.")}`;

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-3 rounded-full bg-[#ff7a45] px-4 py-3 text-white shadow-[0_16px_40px_rgba(255,122,69,0.35)] hover:opacity-95"
      >
        <span className="text-sm font-semibold">Free counselling</span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.6a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.57-.14a2 2 0 0 1 2.11.45c.83.27 1.7.47 2.6.59A2 2 0 0 1 22 16.92Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>

      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#22c55e] shadow-[0_18px_45px_rgba(34,197,94,0.35)] hover:opacity-95"
        aria-label="WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 11.9a8 8 0 1 1-15.2 3.2L4 20l4.95-1.75A8 8 0 0 1 20 11.9Z"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 9.5c.2 2 2.8 4.6 4.8 4.8.6.06 1.6-.4 2-.9.3-.3.2-.8 0-1l-1-1c-.3-.3-.7-.2-1 0l-.6.4c-.5.3-2-1-2.3-1.5l.4-.6c.2-.3.3-.7 0-1l-1-1c-.2-.2-.7-.3-1 0-.5.4-1 1.4-.9 2Z"
            fill="white"
            opacity="0.95"
          />
        </svg>
      </a>
    </div>
  );
}
