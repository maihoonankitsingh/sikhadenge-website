export const SITE_URL = "https://sikhadenge.in";

export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Sikhadenge",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: "support@sikhadenge.in",
    telephone: "+91-8808505575",
    sameAs: [
      "https://instagram.com/sikhadenge.ai",
      "https://linkedin.com/company/sikhadenge",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@sikhadenge.in",
        telephone: "+91-8808505575",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Sikhadenge",
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  const validItems = items.filter(
    (item) =>
      item &&
      typeof item.question === "string" &&
      typeof item.answer === "string" &&
      item.question.trim().length > 0 &&
      item.answer.trim().length > 0
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validItems.map((item) => ({
      "@type": "Question",
      name: item.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.trim(),
      },
    })),
  };
}

export function articleSchema({
  url,
  title,
  description,
  datePublished = "2026-03-13",
  dateModified = "2026-03-13",
}: {
  url: string;
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: "en-IN",
    author: {
      "@type": "Organization",
      name: "Sikhadenge",
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    datePublished,
    dateModified,
  };
}

export function courseSchema() {
  return {
    "@type": "Course",
    "@id": `${SITE_URL}/#course`,
    name: "AI Expert Professional Program",
    description:
      "An 8-week practical AI program covering AI design, AI video creation, AI content creation, AI marketing assets, AI websites, and AI automation workflows for students, freelancers, creators, and beginners in India.",
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    educationalCredentialAwarded: "Certificate of Completion",
    courseMode: "online",
    inLanguage: "en-IN",
    timeRequired: "P8W",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "4999",
      availability: "https://schema.org/InStock",
      category: "EducationalOccupationalProgram",
      url: SITE_URL,
    },
  };
}
