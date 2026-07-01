type StaticBlogSeoSignalsProps = {
  slug: string;
  title: string;
  description: string;
  topic: string;
  faqs: Array<{ question: string; answer: string }>;
};

const DOMAIN = "https://sikhadenge.in";

function pageUrl(slug: string) {
  return `${DOMAIN}/blog/${slug}`;
}

export function StaticBlogSeoSignals({
  slug,
  title,
  description,
  topic,
  faqs,
}: StaticBlogSeoSignalsProps) {
  const url = pageUrl(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: title,
        description,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        author: {
          "@type": "Organization",
          name: "Sikhadenge",
          url: DOMAIN,
        },
        publisher: {
          "@type": "Organization",
          name: "Sikhadenge",
          url: DOMAIN,
          logo: {
            "@type": "ImageObject",
            url: `${DOMAIN}/brand/sikhadenge-logo-header-320.png`,
          },
        },
        dateModified: "2026-07-01",
        datePublished: "2026-07-01",
        inLanguage: ["en", "hi"],
        about: topic,
        isAccessibleForFree: true,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: DOMAIN,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${DOMAIN}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-[24px] border border-[#D8E5F4] bg-[#F8FBFF] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
              Sikhadenge AI Search Notes
            </p>
            <h2 className="mt-3 text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#071533]">
              Quick answer for readers, Google, Bing, and AI search
            </h2>
            <p className="mt-3 max-w-3xl text-[16px] leading-[1.8] text-[#47607F]">
              This guide is structured for practical learners and answer engines. It explains {topic} with clear context,
              real workflow relevance, common mistakes, and connected Sikhadenge learning pages.
            </p>
            <p className="mt-4 text-sm font-medium text-[#0A2245]">
              Reviewed by Sikhadenge editorial team · Updated July 2026 · Focus: SEO, AEO, GEO, and LLM visibility.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
