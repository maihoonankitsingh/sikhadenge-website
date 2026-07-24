import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./auth.css";
import "./inbox.css";
import "./branding.css";
import "./premium-dashboard.css";
import "./premium-icons.css";
import "./premium-fixes.css";
import "./compact-header.css";
import "./final-ui.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const MAIN_SITE = "https://sikhadenge.in";

export const metadata: Metadata = {
  title: "SikhaDenge WhatsApp Agent",
  description: "SikhaDenge-owned WhatsApp inbox, AI agent and lead dashboard.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      {
        url: `${MAIN_SITE}/favicon.png?v=whatsapp-agent-20260724`,
        type: "image/png",
      },
      {
        url: `${MAIN_SITE}/favicon.ico?v=whatsapp-agent-20260724`,
        sizes: "any",
      },
    ],
    shortcut: `${MAIN_SITE}/favicon.png?v=whatsapp-agent-20260724`,
    apple: `${MAIN_SITE}/apple-touch-icon.png?v=whatsapp-agent-20260724`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
