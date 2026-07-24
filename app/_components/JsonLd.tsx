export default function JsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://sikhadenge.in/#organization",
    name: "Sikhadenge",
    alternateName: "Sikha Denge",
    description:
      "Sikhadenge is an India-focused practical AI and digital skills learning platform operated by ThinkGrow Pvt. Ltd.",
    url: "https://sikhadenge.in",
    logo: {
      "@type": "ImageObject",
      url: "https://sikhadenge.in/images/og/og-home.jpg",
      width: 1200,
      height: 630,
    },
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
      email: "support@sikhadenge.in",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
      url: "https://sikhadenge.in/contact-us",
    },
    knowsAbout: [
      "Artificial intelligence skills",
      "Graphic design",
      "Video editing",
      "Digital marketing",
      "Website building",
      "Business automation",
      "Prompt engineering",
    ],
    publishingPrinciples: "https://sikhadenge.in/editorial-policy",
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
    alternateName: "Sikha Denge",
    url: "https://sikhadenge.in",
    publisher: { "@id": "https://sikhadenge.in/#organization" },
    inLanguage: ["en", "hi"],
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
