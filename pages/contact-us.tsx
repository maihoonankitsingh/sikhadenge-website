import Head from "next/head";
import ContactPage from "./contact";

const BASE_URL = "https://sikhadenge.in";

export default function ContactUsPage() {
  return (
    <>
      <Head>
        <title>Contact Sikhadenge</title>
        <meta
          name="description"
          content="Contact Sikhadenge for current course details, admissions, learner support, workshops, partnerships, billing, or general enquiries."
        />
        <link rel="canonical" href={`${BASE_URL}/contact-us`} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/contact-us`} />
        <meta property="og:site_name" content="Sikhadenge" />
        <meta property="og:title" content="Contact Sikhadenge" />
        <meta
          property="og:description"
          content="Ask about current courses, admissions, support, workshops, partnerships, billing, or other Sikhadenge services."
        />
        <meta property="og:image" content={`${BASE_URL}/images/og/og-home.jpg`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "@id": `${BASE_URL}/contact-us#page`,
              name: "Contact Sikhadenge",
              url: `${BASE_URL}/contact-us`,
              isPartOf: { "@id": `${BASE_URL}/#website` },
              about: { "@id": `${BASE_URL}/#organization` },
              mainEntity: {
                "@type": "ContactPoint",
                telephone: "+91-8808505575",
                email: "support@sikhadenge.in",
                contactType: "customer support",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
              },
            }),
          }}
        />
      </Head>
      <ContactPage />
    </>
  );
}
