import Head from "next/head";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { getCourseBySlug, getCourseSlugs, type Course } from "../../lib/courses";

type Props = { course: Course };

const SITE_URL = "https://sikhadenge.in";

function asText(value: unknown, fallback = ""): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  return fallback;
}

function firstText(course: Course, keys: string[], fallback = ""): string {
  const c = course as Record<string, unknown>;
  for (const key of keys) {
    const value = c[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return fallback;
}

function listFrom(course: Course, keys: string[], fallback: string[] = []): string[] {
  const c = course as Record<string, unknown>;
  for (const key of keys) {
    const value = c[key];
    if (Array.isArray(value)) {
      const arr = value.map((item) => String(item).trim()).filter(Boolean);
      if (arr.length) return arr;
    }
  }
  return fallback;
}

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export default function CoursePage({ course }: Props) {
  const c = course as Record<string, unknown>;

  const slug = asText(c.slug, "");
  const title = firstText(course, ["title", "name"], "Sikhadenge Course");
  const description = firstText(
    course,
    ["description", "shortDescription", "summary", "subtitle"],
    `Learn ${title} with Sikhadenge through structured live online classes, practical assignments, portfolio-focused projects, and beginner-friendly guidance.`
  );

  const level = firstText(course, ["level", "difficulty"], "Beginner friendly");
  const duration = firstText(course, ["duration", "courseDuration"], "Structured live online learning");
  const price = firstText(course, ["price", "fees", "amount"], "1200");
  const canonical = `${SITE_URL}/course/${slug}`;

  const highlights = listFrom(course, ["highlights", "features", "outcomes", "points"], [
    "Live online learning format",
    "Practical assignments and guided execution",
    "Portfolio-ready project direction",
    "Beginner-friendly structured roadmap",
  ]);

  const modules = listFrom(course, ["modules", "curriculum", "topics"], highlights);
  const tools = listFrom(course, ["tools", "software"], ["AI tools", "Creative workflow tools", "Digital execution systems"]);

  const pageTitle = `${title} | Sikhadenge`;
  const metaDescription =
    description.length > 155 ? `${description.slice(0, 152).trim()}...` : description;

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    description,
    url: canonical,
    provider: {
      "@type": "EducationalOrganization",
      name: "Sikhadenge",
      url: SITE_URL,
    },
    educationalCredentialAwarded: "Certificate of Completion",
    inLanguage: "en",
    courseMode: "online",
    educationalLevel: level,
    about: tools,
    teaches: modules,
    offers: {
      "@type": "Offer",
      url: canonical,
      price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      category: "Online course",
      seller: {
        "@type": "EducationalOrganization",
        name: "Sikhadenge",
        url: SITE_URL,
      },
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      name: `${title} live online batch`,
      courseMode: "online",
      location: {
        "@type": "VirtualLocation",
        url: canonical,
      },
      courseWorkload: duration,
      instructor: {
        "@type": "Organization",
        name: "Sikhadenge",
        url: SITE_URL,
      },
      offers: {
        "@type": "Offer",
        url: canonical,
        price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: `${SITE_URL}/courses`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonical,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is included in ${title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${title} includes structured lessons, practical assignments, guided workflows, and project-focused learning with Sikhadenge.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${title} beginner friendly?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The course is designed to be beginner friendly and moves from fundamentals to practical execution step by step.",
        },
      },
      {
        "@type": "Question",
        name: "Is this course online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Sikhadenge course delivery is structured for live online learning and guided digital execution.",
        },
      },
      {
        "@type": "Question",
        name: "Will learners get practical project guidance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The learning path focuses on practical work, portfolio direction, and real execution instead of only theory.",
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sikhadenge" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />

        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(courseJsonLd)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />
      </Head>

      <main className="min-h-screen bg-[#05060A] text-white">
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <Link href="/courses" className="text-sm font-semibold text-[#B3FF3A] hover:underline">
            ← Back to Courses
          </Link>

          <div className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl md:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B3FF3A]">
              Sikhadenge Course
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
              {description}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Format</p>
                <p className="mt-2 font-bold text-white">Live online</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Level</p>
                <p className="mt-2 font-bold text-white">{level}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Outcome</p>
                <p className="mt-2 font-bold text-white">Practical portfolio work</p>
              </div>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <section>
                <h2 className="text-2xl font-black">What you will learn</h2>
                <ul className="mt-5 space-y-3 text-white/75">
                  {modules.slice(0, 8).map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#B3FF3A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black">Why Sikhadenge</h2>
                <ul className="mt-5 space-y-3 text-white/75">
                  {highlights.slice(0, 8).map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#B3FF3A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="mt-10 rounded-3xl border border-[#B3FF3A]/20 bg-[#B3FF3A]/10 p-6">
              <h2 className="text-2xl font-black">Quick answer for learners and AI search</h2>
              <p className="mt-3 text-white/75">
                {title} by Sikhadenge is a structured online learning path for learners who want
                practical skill development, guided execution, project direction, and clear next steps
                instead of random tutorials.
              </p>
            </section>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/gen-ai-masterclass"
                className="rounded-full bg-[#B3FF3A] px-6 py-3 text-center font-black text-black hover:opacity-90"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/contact-us"
                className="rounded-full border border-white/15 px-6 py-3 text-center font-bold text-white hover:bg-white/10"
              >
                Talk to Sikhadenge
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getCourseSlugs().map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      course,
    },
  };
};
