export default function JsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://sikhadenge.in/#organization",
    name: "Sikhadenge",
    alternateName: "Sikha Denge",
    description:
      "Sikhadenge is a live, mentor-led online training platform by ThinkGrow Pvt. Ltd. offering courses in Graphic Design, Video Editing, Motion Graphics, and AI creative skills for students and professionals across India.",
    url: "https://sikhadenge.in",
    logo: {
      "@type": "ImageObject",
      url: "https://sikhadenge.in/images/og/og-home.jpg",
      width: 1200,
      height: 630,
    },
    foundingDate: "2021",
    areaServed: { "@type": "Country", name: "India" },
    inLanguage: ["en", "hi"],
    parentOrganization: {
      "@type": "Organization",
      name: "ThinkGrow Pvt. Ltd.",
      url: "https://sikhadenge.in",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8808505575",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.instagram.com/sikhadenge",
      "https://www.youtube.com/@sikhadenge",
      "https://www.linkedin.com/company/sikhadenge",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://sikhadenge.in/#website",
    name: "Sikhadenge",
    url: "https://sikhadenge.in",
    publisher: { "@id": "https://sikhadenge.in/#organization" },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://sikhadenge.in/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

