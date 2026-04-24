"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

const DOMAIN = "https://sikhadenge.space";

function safeJson(obj: unknown) {
  return JSON.stringify(obj).replace(/<\/script/gi, "<\\/script");
}

export default function SeoDynamicJsonLd() {
  const pathname = usePathname() || "/";
  const url = DOMAIN + (pathname === "/" ? "/" : pathname);

  const nodes: any[] = [];

  // WebSite schema
  nodes.push({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sikhadenge",
    url: DOMAIN,
    potentialAction: {
      "@type": "SearchAction",
      target: `${DOMAIN}/blog?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  });

  // WebPage schema
  nodes.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sikhadenge",
    url,
  });

  // FAQ schema for counselling page
  if (pathname === "/counselling") {
    nodes.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is a laptop/PC required for the course?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. A laptop/PC is required for practice, assignments and portfolio projects.",
          },
        },
        {
          "@type": "Question",
          name: "Are classes live or recorded?",
          acceptedAnswer: { "@type": "Answer", text: "Classes are live online." },
        },
        {
          "@type": "Question",
          name: "Which tools are covered?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Graphic Design + Video Editing + Motion Graphics with industry-standard tools, plus Gen-AI workflows for creators.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide projects and portfolio building?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The program is project-based and portfolio-focused with practical outputs.",
          },
        },
      ],
    });
  }

  // Course schema for /courses/<slug>
  if (pathname.startsWith("/courses/") && pathname.split("/").length === 3) {
    const slug = pathname.split("/")[2];
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

    nodes.push({
      "@context": "https://schema.org",
      "@type": "Course",
      name: `${name} — Sikhadenge`,
      description: `Live online ${name} training with project-based learning and portfolio outputs.`,
      provider: {
        "@type": "Organization",
        name: "Sikhadenge",
        sameAs: DOMAIN,
      },
    });
  }

  return (
    <>
      {nodes.map((obj, idx) => (
        <Script
          key={idx}
          id={`sd-jsonld-${idx}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: safeJson(obj) }}
        />
      ))}
    </>
  );
}
