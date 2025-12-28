"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () =>
      NAV.map((item) => ({
        ...item,
        active:
          item.href === "/"
            ? pathname === "/"
            : pathname?.startsWith(item.href),
      })),
    [pathname]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative">
            <Image
              src="/brand/logo.png"
              alt="Sikhadenge"
              width={160}
              height={44}
              priority
              className="h-8 w-auto object-contain md:h-9"
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "rounded-full px-4 py-2 text-sm transition",
                "text-white/70 hover:text-white hover:bg-white/5",
                item.active && "bg-white/10 text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition md:inline-flex"
          >
            Enquiry
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white/90 hover:bg-white/10 transition md:hidden"
            aria-label="Open menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-white/10 bg-black/70 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="grid gap-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cx(
                    "rounded-2xl px-4 py-3 text-sm transition",
                    "text-white/80 bg-white/5 hover:bg-white/10",
                    item.active && "bg-white/10 text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black"
              >
                Enquiry
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
