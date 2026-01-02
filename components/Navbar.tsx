import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // route change → close mobile menu
    setOpen(false);
  }, [router.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-sd-border bg-sd-navy/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-sd-text">
          Sikhadenge
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((x) => {
            const active = router.pathname === x.href;
            return (
              <Link
                key={x.href}
                href={x.href}
                className={
                  active
                    ? "text-sd-gold font-semibold"
                    : "text-sd-textSecondary hover:text-sd-text transition"
                }
              >
                {x.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/contact" className="sd-btn-secondary">
              Contact
            </Link>
            <Link href="/#counselling" className="sd-btn-primary">
              Counselling
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sd-border bg-sd-surface/40 text-sd-text md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="#B0B7C3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={open ? "md:hidden" : "hidden"}>
        <div className="border-t border-sd-border bg-sd-navy/95">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <div className="grid gap-2">
              {nav.map((x) => {
                const active = router.pathname === x.href;
                return (
                  <Link
                    key={x.href}
                    href={x.href}
                    className={
                      "rounded-xl px-3 py-3 transition " +
                      (active
                        ? "bg-sd-surface border border-sd-blue/30 text-sd-gold"
                        : "bg-sd-surface/40 border border-sd-border text-sd-textSecondary hover:text-sd-text")
                    }
                  >
                    {x.label}
                  </Link>
                );
              })}

              <div className="mt-2 grid gap-2 sm:hidden">
                <Link href="/contact" className="sd-btn-secondary">
                  Contact
                </Link>
                <Link href="/#counselling" className="sd-btn-primary">
                  Counselling
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
