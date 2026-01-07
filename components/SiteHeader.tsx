import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function SiteHeader() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0B1220]/85 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-extrabold text-white">
          Sikhadenge
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((i) => {
            const active = router.pathname === i.href;
            return (
              <Link
                key={i.href}
                href={i.href}
                className={[
                  "text-sm transition-colors",
                  active ? "text-[#F5B301]" : "text-[#B0B7C3] hover:text-white",
                ].join(" ")}
              >
                {i.label}
              </Link>
            );
          })}

          <Link
            href="/#counselling"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#F5B301] px-4 text-sm font-semibold text-[#0B1220] hover:shadow-[0_0_18px_rgba(245,179,1,0.55)] transition-shadow"
          >
            Counselling
          </Link>
        </nav>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#111827] text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0B1220]/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-3 grid gap-2">
            {NAV.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-[#B0B7C3] hover:text-white"
              >
                {i.label}
              </Link>
            ))}
            <Link
              href="/#counselling"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-[#F5B301] px-4 py-3 text-center text-sm font-semibold text-[#0B1220] hover:shadow-[0_0_18px_rgba(245,179,1,0.55)] transition-shadow"
            >
              Counselling
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

