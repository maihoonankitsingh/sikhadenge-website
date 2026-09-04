"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const quickLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

const policyLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Refund Policy" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/sikhadenge.institute",
    label: "Instagram",
    icon: "https://cdn.simpleicons.org/instagram/E4405F",
  },
  {
    href: "https://www.linkedin.com/company/sikhadenge/",
    label: "LinkedIn",
    icon: "https://cdn.simpleicons.org/linkedin/0A66C2",
  },
  {
    href: "https://www.pinterest.com/sikhadenge/?actingBusinessId=1027454239896756554",
    label: "Pinterest",
    icon: "https://cdn.simpleicons.org/pinterest/BD081C",
  },
  {
    href: "https://wa.me/918808505575",
    label: "WhatsApp",
    icon: "https://cdn.simpleicons.org/whatsapp/25D366",
  },
];

const FOOTERLESS_CHECKOUT_PATH = "/checkout/ai-prompt-starter-pack";

export default function Footer() {
  const pathname = usePathname() ?? "";

  if (pathname === FOOTERLESS_CHECKOUT_PATH) {
    return null;
  }

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] text-slate-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-[30px] border border-slate-200/80 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.45fr_0.8fr_0.9fr_1.2fr] lg:gap-12">
            <div>
              <a
                href="/"
                className="inline-flex items-center overflow-visible"
                aria-label="Sikhadenge Home"
              >
                <img
                  src="/brand/sikhadenge-header-safe-320.png?v=headersafe2-20260728"
                  alt="Sikhadenge"
                  className="block h-12 w-auto object-contain"
                />
              </a>

              <p className="mt-5 max-w-md text-[15px] leading-7 text-slate-600">
                ThinkGrow Pvt. Ltd. Practical, future-ready learning focused on
                real workflows and professional output.
              </p>

              <div className="mt-6 flex flex-wrap gap-3" aria-label="Sikhadenge social media links">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Sikhadenge on ${item.label}`}
                    title={item.label}
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_14px_34px_rgba(15,23,42,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <img
                      src={item.icon}
                      alt=""
                      aria-hidden="true"
                      className="h-[19px] w-[19px] object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-900">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden="true" />
                Quick Links
              </div>
              <div className="mt-5 grid gap-3.5 text-sm text-slate-600">
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    className="group inline-flex w-fit items-center gap-2 transition-colors duration-200 hover:text-slate-950"
                    href={item.href}
                  >
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className="translate-x-0 text-slate-300 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-900">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600" aria-hidden="true" />
                Policies
              </div>
              <div className="mt-5 grid gap-3.5 text-sm text-slate-600">
                {policyLinks.map((item) => (
                  <Link
                    key={item.href}
                    className="group inline-flex w-fit items-center gap-2 transition-colors duration-200 hover:text-slate-950"
                    href={item.href}
                  >
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className="translate-x-0 text-slate-300 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-900">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" aria-hidden="true" />
                Contact
              </div>

              <div className="mt-5 rounded-[22px] border border-slate-200/90 bg-[linear-gradient(145deg,#F8FAFC_0%,#FFFFFF_55%,#EFF6FF_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <a
                  href="mailto:support@sikhadenge.in"
                  className="block break-all text-sm font-semibold text-slate-900 transition-colors hover:text-blue-600"
                >
                  Support: support@sikhadenge.in
                </a>

                <div className="mt-2.5 flex items-center gap-2 text-sm text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span>Working hours: 10:00 AM - 7:00 PM</span>
                </div>

                <a
                  href="tel:+918808505575"
                  className="mt-4 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 hover:shadow-md"
                >
                  +91 88085 05575
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-slate-200/80 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
            <div>(c) {new Date().getFullYear()} Sikhadenge. All rights reserved.</div>
            <div>Parent Company: ThinkGrow Pvt. Ltd.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
