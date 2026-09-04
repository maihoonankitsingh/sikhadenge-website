import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MetaPixel from "./_components/MetaPixel";
import JsonLd from "./_components/JsonLd";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const SITE_URL = "https://sikhadenge.in";
const OG_IMAGE = "/images/og/og-home.jpg"; // ensure this file exists in /public/images/og/

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Sikhadenge — Learn Graphic Design, Video Editing & AI Skills Online",
    template: "%s | Sikhadenge",
  },

  description:
    "Sikhadenge by ThinkGrow Pvt. Ltd. offers live mentor-led courses in Graphic Design, Video Editing, Motion Graphics, and AI creative skills. Join 12,000+ students across India.",

  alternates: {
    canonical: "https://sikhadenge.in",
  },

  keywords: [
    "Graphic Design course",
    "Video Editing course",
    "Motion Graphics course",
    "Adobe Photoshop training",
    "Adobe Illustrator training",
    "Premiere Pro course",
    "After Effects course",
    "Live online course",
    "Sikhadenge",
  ],

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sikhadenge",
    locale: "en_IN",
    title: "Sikhadenge — Learn Graphic Design, Video Editing & AI Skills Online",
    description:
      "Live mentor-led courses in Graphic Design, Video Editing, Motion Graphics, and AI creative skills. 12,000+ students trained across India.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sikhadenge",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sikhadenge",
    description:
      "Live online training: Graphic Design, Video Editing, Motion Graphics, and AI-powered creative skills.",
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1220",
  colorScheme: "dark",
};

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
        {children}
        <Footer />
      </body>
    </html>
  );
}
