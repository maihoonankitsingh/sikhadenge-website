import Link from "next/link";

const quickLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
];

const policyLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Refund Policy" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr_1fr_1.1fr]">
          <div>
            <div className="text-xl font-semibold text-slate-950">Sikhadenge</div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              ThinkGrow Pvt. Ltd. Practical, future-ready learning focused on
              real workflows and professional output.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                YT
              </a>
              <a
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                IN
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-900">
              Quick Links
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  className="transition hover:text-slate-950"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-900">
              Policies
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              {policyLinks.map((item) => (
                <Link
                  key={item.href}
                  className="transition hover:text-slate-950"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-900">
              Contact
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">
                Support: support@sikhadenge.in
              </div>
              <div className="mt-2 text-sm text-slate-600">
                Working hours: 10:00 AM - 7:00 PM
              </div>
              <div className="mt-4 inline-flex rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                +91 88085 05575
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>(c) {new Date().getFullYear()} Sikhadenge. All rights reserved.</div>
          <div>Parent Company: ThinkGrow Pvt. Ltd.</div>
        </div>
      </div>
    </footer>
  );
}
