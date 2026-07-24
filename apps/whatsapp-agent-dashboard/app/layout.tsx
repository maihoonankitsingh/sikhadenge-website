import type { Metadata } from "next";
import "./globals.css";
import "./auth.css";
import "./inbox.css";
import "./branding.css";
import "./premium-dashboard.css";
import "./premium-icons.css";
import "./premium-fixes.css";
import "./compact-header.css";
import "./final-ui.css";

const APP_MARK = "/sikhadenge-app-mark-v3.svg";

export const metadata: Metadata = {
  title: "SikhaDenge WhatsApp Agent",
  description: "SikhaDenge-owned WhatsApp inbox, AI agent and lead dashboard.",
  robots: { index: false, follow: false },
  icons: {
    icon: [{ url: APP_MARK, type: "image/svg+xml" }],
    shortcut: APP_MARK,
    apple: APP_MARK,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
