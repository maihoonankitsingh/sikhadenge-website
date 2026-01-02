import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/collab", label: "Collab" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function SiteHeader() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] border-b border-white/10 bg-[#0B1220]/85 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1100px] items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-extrabold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#111827] border border-white/10">
            <span className="text-[#F5B301] font-black">SD</span>
          </span>
          <span>Sikhadenge</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => {
            const active = isActive(router.pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "text-[#F5B301] font-semibold"
                    : "text-[#B0B7C3] hover:text-white transition"
                }
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-2 inline-flex h-10 items-center justify-center rounded-xl bg-[#F5B301] px-4 text-[#0B1220] font-semibold border border-white/10 transition hover:shadow-[0_0_18px_rgba(245,179,1,0.55)]"
          >
            Get Support
          </Link>
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#111827]"
          aria-label="Open menu"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="text-white text-xl leading-none">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {/* Mobile nav panel */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0B1220]">
          <div className="mx-auto max-w-[1100px] px-4 py-3 grid gap-2">
            {nav.map((item) => {
              const active = isActive(router.pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={
                    "rounded-xl px-3 py-2 border border-white/10 bg-[#111827] " +
                    (active ? "text-[#F5B301] font-semibold" : "text-[#B0B7C3]")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-[#F5B301] text-[#0B1220] font-semibold border border-white/10 hover:shadow-[0_0_18px_rgba(245,179,1,0.55)]"
            >
              Get Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

