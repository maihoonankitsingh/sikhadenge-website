import type { Metadata } from "next";
import "./globals.css";
import "./auth.css";
import "./inbox.css";
import "./branding.css";
import "./premium-dashboard.css";
import "./premium-icons.css";

const OFFICIAL_LOGO =
  "https://sikhadenge.in/brand/sikhadenge-header-safe-320.png?v=headersafe1";

export const metadata: Metadata = {
  title: "SikhaDenge WhatsApp Agent",
  description: "SikhaDenge-owned WhatsApp inbox, AI agent and lead dashboard.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "https://sikhadenge.in/favicon.ico", type: "image/x-icon" },
      { url: OFFICIAL_LOGO, type: "image/png" },
    ],
    shortcut: "https://sikhadenge.in/favicon.ico",
    apple: OFFICIAL_LOGO,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
