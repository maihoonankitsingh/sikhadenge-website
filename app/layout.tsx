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
    default: "Sikhadenge",
    template: "%s | Sikhadenge",
  },

  description:
    "Live online training: Graphic Design, Video Editing, Motion Graphics, and AI-powered creative skills.",

  alternates: {
    canonical: "/",
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
    title: "Sikhadenge",
    description:
      "Live online training: Graphic Design, Video Editing, Motion Graphics, and AI-powered creative skills.",
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

const Header = dynamic(() => import("../components/Header"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

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


