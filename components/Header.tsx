"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname() ?? "";
  return (
    <header className="fixed inset-x-0 top-[56px] z-50 sd-header-under-offer border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/5 shadow-[0_0_18px_rgba(37,99,235,0.55)]">
            <span className="text-sm font-semibold text-black">SD</span>
          </span>
          <span className="text-sm font-semibold tracking-wide text-black">Sikhadenge</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "text-sm transition",
                  active ? "text-black" : "text-black/70 hover:text-black",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(37,99,235,0.55)] hover:bg-[#1D4ED8]"
          >
            Enquire
          </Link>
        </div>
      </div>
    </header>
  );
}
