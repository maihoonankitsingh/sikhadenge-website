export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sikhadenge",
    url: "https://sikhadenge.in",
    logo: "https://sikhadenge.in/images/logo.png",
    sameAs: [
      "https://www.instagram.com/sikhadenge.ai",
      "https://www.linkedin.com"
    ]
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
