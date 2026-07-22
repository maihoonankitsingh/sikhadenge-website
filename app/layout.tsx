import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import dynamic from "next/dynamic";

import JsonLd from "./_components/JsonLd";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentManager } from "@/components/consent/ConsentManager";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});


const SITE_URL = "https://sikhadenge.in";
const OG_IMAGE = "/images/og/og-home.jpg"; // ensure this file exists in /public/images/og/

export const metadata: Metadata = {
  
  icons: {
    icon: [
      { url: "/favicon-white-bg-48x48.png?v=whitebg-folder-final", sizes: "48x48", type: "image/png" },
      { url: "/favicon-white-bg-32x32.png?v=whitebg-folder-final", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico?v=whitebg-folder-final" },
    ],
    shortcut: ["/favicon-white-bg-48x48.png?v=whitebg-folder-final"],
    apple: [{ url: "/apple-touch-icon.png?v=whitebg-folder-final", sizes: "180x180", type: "image/png" }],
  },
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Sikhadenge | AI Skills, Graphic Design & Video Editing Courses Online",
    template: "%s | Sikhadenge",
  },

  description:
    "Sikhadenge by ThinkGrow Pvt. Ltd. — Live, mentor-led online courses in AI Skills, Graphic Design, Video Editing & Motion Graphics. Join 1,50,000+ students across India. Free masterclasses every Sunday on Zoom.",

  // NO global canonical here — each page sets its own to prevent duplicate canonical issues
  // alternates.canonical is intentionally omitted from root layout

  keywords: [
    "AI skills course India",
    "learn AI skills online",
    "graphic design course",
    "video editing course",
    "motion graphics course",
    "AI tools for beginners",
    "free masterclass online",
    "Sikhadenge",
    "live online course India",
    "ChatGPT course Hindi",
    "AI freelancing course",
  ],

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sikhadenge",
    locale: "en_IN",
    title: "Sikhadenge | AI Skills, Graphic Design & Video Editing Courses Online",
    description:
      "Live mentor-led courses in AI Skills, Graphic Design, Video Editing & Motion Graphics. 1,50,000+ students trained across India. Free Sunday masterclasses on Zoom.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sikhadenge — AI & Creative Skills Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sikhadenge | AI Skills & Creative Courses",
    description:
      "Free live masterclasses every Sunday on Zoom. AI Skills, Graphic Design, Video Editing. 1,50,000+ students across India.",
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1220",
};

const Header = dynamic(() => import("../components/Header"));
const Footer = dynamic(() => import("../components/Footer"));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* SIKHADENGE_FAVICON_FORCE_WHITE_BG */}
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-white-bg-48x48.png?v=whitebg-folder-final" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-white-bg-32x32.png?v=whitebg-folder-final" />
        <link rel="shortcut icon" href="/favicon.ico?v=whitebg-folder-final" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=whitebg-folder-final" />
      </head>
      <body className={`${bricolage.className} ${bricolage.variable}`}>
        <ConsentProvider>
          <ConsentManager />
        <JsonLd />
        <Header />
        <div className="sd-header-spacer" aria-hidden="true" />
        {children}
        <Footer />
        </ConsentProvider>
      </body>
    </html>
  );
}


