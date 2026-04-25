import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

import MetaPixel from "./_components/MetaPixel";
import JsonLd from "./_components/JsonLd";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const SITE_URL = "https://sikhadenge.in";
const OG_IMAGE = "/images/og/og-home.jpg"; // ensure this file exists in /public/images/og/

export const metadata: Metadata = {
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
      <body className={inter.className}>
        <MetaPixel />
        <JsonLd />
        <Header />
        <div className="pt-8">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}


