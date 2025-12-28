"use client";

import { useEffect, useState } from "react";

const SOCIAL = [
  { name: "Facebook", href: "#", icon: FacebookIcon },
  { name: "Instagram", href: "#", icon: InstagramIcon },
  { name: "LinkedIn", href: "#", icon: LinkedInIcon },
  { name: "YouTube", href: "#", icon: YouTubeIcon },
  { name: "Behance", href: "#", icon: BehanceIcon },
  { name: "Pinterest", href: "#", icon: PinterestIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
        {/* background gradient (left dark -> right warm) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-amber-900/60" />
          <div className="absolute right-0 top-0 h-full w-[55%] bg-[radial-gradient(ellipse_at_right,rgba(245,158,11,0.35),transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:18px_18px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Brand */}
            <div className="lg:col-span-3">
              <div className="flex items-start gap-4">
                {/* Replace with your logo image if needed */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <span className="text-sm font-semibold tracking-tight">SD</span>
                </div>

                <div>
                  <div className="text-xl font-semibold leading-tight">
                    Sikhadenge
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    Learn • Earn • Grow
                  </div>
                  <div className="mt-2 text-sm text-white/60">
                    Sikhne ka Sahi Platform
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-2">
              <div className="text-sm font-semibold text-white/90">Pages</div>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li>
                  <a className="hover:text-white" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="/about-us">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="/contact">
                    Contacts
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="/blog">
                    Blog Page
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div className="lg:col-span-2">
              <div className="text-sm font-semibold text-white/90">Policies</div>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li>
                  <a className="hover:text-white" href="/refund-policy">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="/privacy-policy">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact + Social */}
            <div className="lg:col-span-3">
              <div className="text-sm font-semibold text-white/90">Contact</div>

              <div className="mt-4 space-y-2 text-sm text-white/80">
                <a className="block hover:text-white" href="tel:+918808505575">
                  +91-8808505575
                </a>
                <a
                  className="block hover:text-white"
                  href="mailto:support@sikhadenge.in"
                >
                  support@sikhadenge.in
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                {SOCIAL.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    className="text-white/70 hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="lg:col-span-2 lg:text-right">
              <div className="text-sm font-semibold text-white/90">
                Copyright-
              </div>
              <div className="mt-4 text-sm text-white/70">
                Sikhadenge (Parented by ThinkGrow)
              </div>
              <div className="mt-1 text-sm text-white/70">
                © {year} - All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating buttons (right side) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Scroll to top */}
        <button
          type="button"
          onClick={scrollTop}
          className={[
            "grid h-12 w-12 place-items-center rounded-2xl bg-fuchsia-600 text-white shadow-lg ring-1 ring-white/10 transition",
            showTop ? "opacity-100" : "pointer-events-none opacity-0",
          ].join(" ")}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>

        {/* WhatsApp */}
        <a
          href="https://wa.me/918808505575"
          target="_blank"
          rel="noreferrer"
          className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500 text-white shadow-lg ring-1 ring-white/10"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
      </div>
    </>
  );
}

/* ---------------- Icons (SVG) ---------------- */

function ArrowUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 5l-7 7m7-7l7 7M12 5v14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 11.8a8 8 0 0 1-11.7 7L4 20l1.3-4.1A8 8 0 1 1 20 11.8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.9c.2-.3.5-.5.9-.5h.5c.3 0 .6.2.7.5l.6 1.3c.1.3.1.6-.1.9l-.4.6c-.1.2-.1.5.1.7.6.8 1.5 1.6 2.4 2.2.2.1.5.1.7-.1l.6-.4c.3-.2.6-.2.9-.1l1.3.6c.3.1.5.4.5.7v.5c0 .4-.2.7-.5.9-.5.3-1.1.5-1.7.3-3.2-1-6-3.8-7-7-.2-.6 0-1.2.3-1.7Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.3-1.6 1.7-1.6h1.5V4.8c-.3 0-1.4-.1-2.7-.1-2.7 0-4.6 1.6-4.6 4.6V11H6.8v3h2.6v8h4.1Z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 6.7A2.2 2.2 0 1 1 6.5 2.3a2.2 2.2 0 0 1 0 4.4ZM4.6 21.7h3.8V9H4.6v12.7ZM9.8 9h3.6v1.7h.1c.5-1 1.7-2 3.6-2 3.9 0 4.6 2.6 4.6 5.9v7.1h-3.8v-6.3c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.4H9.8V9Z" />
    </svg>
  );
}

function YouTubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8ZM10.2 15.3V8.7L16 12l-5.8 3.3Z" />
    </svg>
  );
}

function BehanceIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8.6 11.2c1.2 0 2.1-.8 2.1-2 0-1.3-.8-2.1-2.5-2.1H3v14h5.6c2.4 0 4.1-1.2 4.1-3.7 0-1.8-1-2.9-2.4-3.2 1.1-.4 1.7-1.4 1.7-2.9 0-2.5-1.7-4.3-5-4.3H1v18h7.6c4.2 0 6.6-2.1 6.6-5.8 0-2.6-1.4-4.3-3.3-4.9 1.4-.8 2.2-2.1 2.2-4 0-3.4-2.3-5.3-6.5-5.3H1V3h7.1c3.6 0 5.7 1.5 5.7 4.2 0 2-1 3.2-2.7 3.8Zm-4.2-4h3.4c1.6 0 2.4.6 2.4 1.8 0 1.3-.8 1.9-2.2 1.9H4.4V7.2Zm0 6.7h3.8c1.7 0 2.7.7 2.7 2.2 0 1.6-1 2.3-2.7 2.3H4.4v-4.5Z" />
      <path d="M14.8 7h6.2v1.8h-6.2V7Zm3.1 12.3c-3 0-5-2.1-5-5.2 0-3.2 2-5.3 5-5.3 3.1 0 5 2.1 5 5.7h-7.5c.2 1.5 1.2 2.4 2.6 2.4 1.1 0 1.8-.5 2.1-1.2h2.6c-.6 2.2-2.5 3.6-4.8 3.6Zm-2.4-6.7h4.9c-.2-1.3-1.1-2.1-2.4-2.1-1.4 0-2.3.8-2.5 2.1Z" />
    </svg>
  );
}

function PinterestIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.2 2C6.8 2 3 5.6 3 10.2c0 3 1.8 4.7 3.1 4.7.5 0 .8-1.3.8-1.7 0-.4-1-1.2-1-2.8 0-3.3 2.5-5.7 6-5.7 2.9 0 5.1 1.7 5.1 4.7 0 2.2-1 6.4-3.9 6.4-1.1 0-2-1-1.7-2.1.4-1.4 1.1-3 1.1-4.1 0-1-.5-1.8-1.6-1.8-1.3 0-2.3 1.3-2.3 3 0 1.1.4 1.9.4 1.9S7.8 18.3 7.6 19c-.3 1.2-.2 2.6-.1 3.6.8-1.1 1.1-2.2 1.4-3.4.2-.7.8-2.9.8-2.9.4.8 1.5 1.5 2.7 1.5 3.5 0 6-3.2 6-7.3C19.4 5.4 16.2 2 12.2 2Z" />
    </svg>
  );
}
