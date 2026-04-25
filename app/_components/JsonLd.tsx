export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sikhadenge.in/#organization",
        name: "Sikhadenge",
        legalName: "ThinkGrow Pvt. Ltd.",
        url: "https://sikhadenge.in",
        logo: "https://sikhadenge.in/brand/logo.png",
        description:
          "Sikhadenge is an India-focused AI learning platform for practical AI skills, AI tools, prompts, automation, content, design, video, marketing, SEO, AEO, GEO, and digital workflows.",
        email: "support@sikhadenge.in",
        telephone: "+91 88085 05575",
        areaServed: "IN",
        knowsAbout: [
          "AI skills",
          "ChatGPT",
          "Gemini",
          "Claude",
          "AI tools",
          "AI prompts",
          "AI automation",
          "AI content creation",
          "AI design",
          "AI video editing",
          "SEO",
          "AEO",
          "GEO",
          "Digital workflows",
        ],
        sameAs: [
          "https://www.instagram.com/sikhadenge.ai/",
          "https://www.youtube.com/@Sikhadenge",
          "https://www.facebook.com/profile.php?id=61572748710302",
          "https://x.com/sikhadenge",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "support@sikhadenge.in",
            telephone: "+91 88085 05575",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://sikhadenge.in/#website",
        url: "https://sikhadenge.in",
        name: "Sikhadenge",
        publisher: {
          "@id": "https://sikhadenge.in/#organization",
        },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://sikhadenge.in/blog?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}