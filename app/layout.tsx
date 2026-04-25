import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeaderGate from "@/app/_components/HeaderGate";
import FooterGate from "@/app/_components/FooterGate";
import MainGate from "@/app/_components/MainGate";
import JsonLd from "@/app/_components/JsonLd";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://sikhadenge.in"),
  applicationName: "Sikhadenge",
  title: {
    default: "Sikhadenge | Practical AI Skills, AI Tools and Digital Workflows",
    template: "%s | Sikhadenge",
  },
  description:
    "Sikhadenge helps India-focused learners build practical AI skills across ChatGPT, Gemini, Claude, AI tools, prompts, automation, content, design, video, marketing, SEO, AEO, GEO, and digital workflows.",
  keywords: [
    "Sikhadenge",
    "AI skills India",
    "learn AI tools",
    "ChatGPT course India",
    "AI masterclass",
    "AI tools for students",
    "AI skills for freelancers",
    "AI workflow learning",
    "SEO AEO GEO",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://sikhadenge.in",
    siteName: "Sikhadenge",
    title: "Sikhadenge | Practical AI Skills, AI Tools and Digital Workflows",
    description:
      "Learn practical AI skills for students, freelancers, creators, professionals, and business owners with Sikhadenge.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sikhadenge | Practical AI Skills, AI Tools and Digital Workflows",
    description:
      "Practical AI learning across tools, prompts, workflows, content, design, video, marketing, SEO, AEO, and GEO.",
  },
  other: {
    "ai-discovery": "https://sikhadenge.in/llms.txt",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body>
        <HeaderGate>
          <Header />
        </HeaderGate>

        <MainGate>{children}</MainGate>

        <FooterGate>
          <Footer />
        </FooterGate>

        <JsonLd />

        <Script id="meta-pixel-base" strategy="afterInteractive">
          {`
            !(function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)})(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID || ""}');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID || ""}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}

        {process.env.NEXT_PUBLIC_CLARITY_ID ? (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}