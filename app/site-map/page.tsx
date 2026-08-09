import Link from "next/link";
import type { Metadata } from "next";
import HubInternalLinks from "@/components/seo/HubInternalLinks";

export const metadata: Metadata = {
  title: "HTML Sitemap",
  description:
    "Browse the main public Sikhadenge pages, learning hubs, courses, editorial resources, and policies.",
  alternates: {
    canonical: "https://sikhadenge.in/site-map",
  },
  openGraph: {
    title: "HTML Sitemap | Sikhadenge",
    description:
      "Browse the main public Sikhadenge pages, learning hubs, courses, editorial resources, and policies.",
    url: "https://sikhadenge.in/site-map",
    siteName: "Sikhadenge",
    type: "website",
  },
};

type SitemapGroup = {
  label: string;
  links: Array<{ href: string; label: string }>;
};

// Deliberately curated. Never derive this page by walking the app directory:
// doing so can expose private, transactional, preview, or noindex routes.
const GROUPS: SitemapGroup[] = [
  {
    label: "Main Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/about-us", label: "About Sikhadenge" },
      { href: "/contact-us", label: "Contact" },
      { href: "/courses", label: "Courses" },
      { href: "/experts", label: "Experts" },
    ],
  },
  {
    label: "AI Learning Hubs",
    links: [
      { href: "/ai-skills", label: "AI Skills" },
      { href: "/ai-tools", label: "AI Tools" },
      { href: "/ai-expert", label: "AI Expert" },
      { href: "/ai-generalist", label: "AI Generalist" },
      { href: "/what-is-ai-generalist", label: "What Is an AI Generalist?" },
    ],
  },
  {
    label: "Editorial Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/editorial-policy", label: "Editorial Policy" },
      { href: "/authors/sikhadenge-editorial-team", label: "Editorial Team" },
    ],
  },
  {
    label: "Masterclass",
    links: [
      { href: "/gen-ai-masterclass", label: "Gen AI Masterclass" },
      { href: "/gen-ai-masterclass/register-one-step", label: "Masterclass Registration" },
    ],
  },
  {
    label: "Policies",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/refund-policy", label: "Refund Policy" },
      { href: "/terms", label: "Terms" },
      { href: "/cancellation-policy", label: "Cancellation Policy" },
      { href: "/shipping-policy", label: "Shipping Policy" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

export default function SiteMapPage() {
  const totalLinks = GROUPS.reduce((count, group) => count + group.links.length, 0);

  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#245EEA]">
            HTML Sitemap
          </div>
          <h1 className="mt-8 max-w-5xl text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] md:text-[66px]">
            Browse important Sikhadenge pages
          </h1>
          <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
            This curated directory contains public, user-facing pages only. Private dashboards, admin routes, payment states, APIs, previews, and SEO pages under review are intentionally excluded.
          </p>
          <div className="mt-8 inline-flex rounded-2xl border border-[#D8E5F4] bg-white px-5 py-4 shadow-sm">
            <span className="text-sm font-semibold text-[#2563EB]">Public links:&nbsp;</span>
            <span className="text-sm font-bold">{totalLinks}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {GROUPS.map((group) => (
            <section key={group.label} className="rounded-[30px] border border-[#D8E5F4] bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[22px] font-semibold">{group.label}</h2>
                <span className="rounded-full border border-[#D8E5F4] bg-[#F8FBFF] px-3 py-1 text-xs font-semibold text-[#2563EB]">
                  {group.links.length}
                </span>
              </div>
              <div className="mt-6 space-y-3">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-[#ECF2FA] bg-[#FBFDFF] px-4 py-3 transition hover:border-[#BFD4F3] hover:bg-white"
                  >
                    <div>
                      <div className="text-[15px] font-semibold">{link.label}</div>
                      <div className="mt-1 text-[13px] text-[#47607F]">{link.href}</div>
                    </div>
                    <span className="shrink-0 text-[#2563EB] transition group-hover:translate-x-0.5">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <HubInternalLinks hub="site-map" />
    </main>
  );
}
