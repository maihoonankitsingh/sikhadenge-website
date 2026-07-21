import type { Metadata } from "next";
import Client from "./ContactUsClient";
import { CONTACT_FAQS } from "./contactFaqs";
import { absoluteUrl, siteConfig } from "@/lib/seo";

const pageUrl = `${siteConfig.url}/contact-us`;

export const metadata: Metadata = {
  title: "Contact Sikhadenge | Course Counselling, Support & Partnerships",
  description:
    "Contact Sikhadenge for AI course counselling, admissions, learner support, corporate training, partnerships, billing, and careers. Submit the official form and continue automatically on WhatsApp, or call or email the team.",
  keywords: [
    "contact Sikhadenge",
    "Sikhadenge phone number",
    "Sikhadenge WhatsApp",
    "Sikhadenge support email",
    "AI course counselling India",
    "Sikhadenge admissions",
    "Sikhadenge learner support",
    "Sikhadenge corporate training",
    "Sikhadenge partnership",
  ],
  alternates: {
    canonical: pageUrl,
  },
  authors: [{ name: "Sikhadenge" }],
  creator: "Sikhadenge",
  publisher: "ThinkGrow Pvt. Ltd.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Contact Sikhadenge | Official Support & Course Counselling",
    description:
      "Use Sikhadenge's official contact page for course counselling, admissions, learner support, partnerships, corporate training, billing, and career enquiries.",
    url: pageUrl,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: "Contact Sikhadenge for official support and course counselling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sikhadenge | Official Support & Course Counselling",
    description:
      "Submit Sikhadenge's official contact form and continue automatically on WhatsApp, or call or email the team for counselling, support, partnerships, and business enquiries.",
    images: [absoluteUrl(siteConfig.ogImage)],
  },
};

const contactFaqs = CONTACT_FAQS;

const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      legalName: "ThinkGrow Pvt. Ltd.",
      url: siteConfig.url,
      logo: absoluteUrl(siteConfig.logo),
      email: "support@sikhadenge.in",
      telephone: "+91-8808505575",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: "+91-8808505575",
          email: "support@sikhadenge.in",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
          url: pageUrl,
        },
        {
          "@type": "ContactPoint",
          contactType: "course counselling",
          telephone: "+91-8808505575",
          email: "support@sikhadenge.in",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
          url: pageUrl,
        },
      ],
      sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin].filter(Boolean),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "ContactPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Contact Sikhadenge",
      description:
        "Official Sikhadenge contact page for course counselling, admissions, learner support, corporate training, partnerships, billing, careers, and structured form-to-WhatsApp enquiries.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      about: {
        "@id": `${siteConfig.url}/#organization`,
      },
      mainEntity: {
        "@id": `${siteConfig.url}/#organization`,
      },
      inLanguage: ["en-IN", "hi-IN"],
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact us",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: contactFaqs.map((faq) => ({
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Client />
    </>
  );
}
