export default function JsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://sikhadenge.in/#organization",
    name: "Sikhadenge",
    alternateName: ["Sikha Denge", "SikhaDenge"],
    description:
      "Sikhadenge is India's practical AI skills and creative learning platform by ThinkGrow Pvt. Ltd. We offer live, mentor-led online masterclasses in AI Skills, Graphic Design, Video Editing, and Motion Graphics. Over 1,50,000 students trained across India through weekly Sunday live sessions on Zoom.",
    url: "https://sikhadenge.in",
    logo: {
      "@type": "ImageObject",
      url: "https://sikhadenge.in/images/og/og-home.jpg",
      width: 1200,
      height: 630,
    },
    image: "https://sikhadenge.in/images/og/og-home.jpg",
    foundingDate: "2021",
    numberOfStudents: 150000,
    areaServed: { "@type": "Country", name: "India" },
    inLanguage: ["en", "hi"],
    teaches: [
      "Artificial Intelligence Skills",
      "ChatGPT for Professionals",
      "Generative AI",
      "Graphic Design",
      "Video Editing",
      "Motion Graphics",
      "AI-powered Creative Workflows",
      "Freelancing with AI Tools",
      "Digital Marketing with AI",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sikhadenge Free & Paid Programs",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Gen AI Masterclass",
            description: "Free live Sunday masterclass on Generative AI skills for freelancers, creators, and professionals.",
            url: "https://sikhadenge.in/gen-ai-masterclass",
            isAccessibleForFree: true,
            courseMode: "Online",
            inLanguage: ["en", "hi"],
            provider: { "@id": "https://sikhadenge.in/#organization" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "AI-Powered Graphic Design",
            description: "Live mentor-led graphic design course with AI tools. Learn Photoshop, Illustrator, Canva, and AI image generation.",
            url: "https://sikhadenge.in/courses/graphic-design",
            courseMode: "Online",
            inLanguage: ["en", "hi"],
            provider: { "@id": "https://sikhadenge.in/#organization" },
          },
        },
      ],
    },
    parentOrganization: {
      "@type": "Organization",
      name: "ThinkGrow Pvt. Ltd.",
      url: "https://sikhadenge.in",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-8808505575",
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
        contactOption: "TollFree",
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-8808505575",
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [
      "https://www.instagram.com/sikhadenge",
      "https://www.youtube.com/@sikhadenge",
      "https://www.linkedin.com/company/sikhadenge",
      "https://wa.me/918808505575",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "India",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://sikhadenge.in/#website",
    name: "Sikhadenge",
    url: "https://sikhadenge.in",
    description: "India's practical AI skills and creative learning platform. Free live masterclasses every Sunday on Zoom.",
    publisher: { "@id": "https://sikhadenge.in/#organization" },
    inLanguage: ["en", "hi"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://sikhadenge.in/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // SiteLinksSearchBox for Google AEO
  const searchBox = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sikhadenge",
    url: "https://sikhadenge.in",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://sikhadenge.in/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(searchBox) }} />
    </>
  );
}
