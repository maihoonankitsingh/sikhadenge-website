import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

import MetaPixel from "./_components/MetaPixel";
import JsonLd from "./_components/JsonLd";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const SITE_URL = "https://sikhadenge.in";
const OG_IMAGE = "/images/og/og-home.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Sikhadenge",
  title: {
    default: "Sikhadenge — Practical AI and Digital Skills for India",
    template: "%s | Sikhadenge",
  },
  description:
    "Sikhadenge by ThinkGrow Pvt. Ltd. provides practical, mentor-led learning in AI, design, video, marketing, websites, automation, and modern digital workflows.",
  authors: [{ name: "Sikhadenge Editorial Team", url: `${SITE_URL}/authors/sikhadenge-editorial-team` }],
  creator: "Sikhadenge",
  publisher: "ThinkGrow Pvt. Ltd.",
  category: "Education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sikhadenge",
    locale: "en_IN",
    title: "Sikhadenge — Practical AI and Digital Skills for India",
    description:
      "Practical, mentor-led learning in AI, design, video, marketing, websites, automation, and modern digital workflows.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sikhadenge practical AI and digital skills learning platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sikhadenge — Practical AI and Digital Skills for India",
    description:
      "Practical, mentor-led learning in AI, design, video, marketing, websites, automation, and modern digital workflows.",
    images: [OG_IMAGE],
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1220",
  colorScheme: "dark",
};

const Header = dynamic(() => import("../components/Header"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
