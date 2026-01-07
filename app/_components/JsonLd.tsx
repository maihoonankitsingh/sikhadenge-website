export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sikhadenge",
    url: "https://sikhadenge.space",
    parentOrganization: {
      "@type": "Organization",
      name: "ThinkGrow Pvt. Ltd.",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
