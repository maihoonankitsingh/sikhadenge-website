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

type SocialPlatform = "instagram" | "linkedin" | "pinterest" | "whatsapp";

const socialLinks: Array<{ href: string; label: string; platform: SocialPlatform }> = [
  {
    href: "https://www.instagram.com/sikhadenge.ai/",
    label: "Instagram",
    platform: "instagram",
  },
  {
    href: "https://www.linkedin.com/company/sikhadenge/",
    label: "LinkedIn",
    platform: "linkedin",
  },
  {
    href: "https://www.pinterest.com/sikhadenge/?actingBusinessId=1027454239896756554",
    label: "Pinterest",
    platform: "pinterest",
  },
  {
    href: "https://wa.me/918808505575",
    label: "WhatsApp",
    platform: "whatsapp",
  },
];

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  const commonClass = "h-[20px] w-[20px] transition-transform duration-300 group-hover:scale-110";

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={commonClass}>
        <defs>
          <linearGradient id="footer-instagram-gradient" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEDA75" />
            <stop offset="0.3" stopColor="#FA7E1E" />
            <stop offset="0.55" stopColor="#D62976" />
            <stop offset="0.78" stopColor="#962FBF" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
        <path
          fill="url(#footer-instagram-gradient)"
          d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
        />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={commonClass} fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }

  if (platform === "pinterest") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={commonClass} fill="#E60023">
        <path d="M12 0C5.372 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.406.042-3.442.219-.936 1.407-5.965 1.407-5.965s-.359-.72-.359-1.782c0-1.669.968-2.915 2.172-2.915 1.024 0 1.518.769 1.518 1.69 0 1.03-.655 2.57-.994 3.996-.283 1.195.599 2.169 1.777 2.169 2.132 0 3.771-2.249 3.771-5.495 0-2.874-2.066-4.884-5.017-4.884-3.418 0-5.425 2.563-5.425 5.213 0 1.032.397 2.136.893 2.739a.36.36 0 0 1 .083.345c-.091.378-.293 1.195-.333 1.362-.053.22-.174.266-.402.16-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.162 0 7.398 2.966 7.398 6.931 0 4.133-2.607 7.46-6.22 7.46-1.215 0-2.357-.631-2.747-1.378l-.747 2.848c-.27 1.039-1.001 2.345-1.492 3.14 1.123.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={commonClass} fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.894 9.825 9.825 0 0 1 2.9 6.988c-.003 5.45-4.437 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

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
        <div className="p-6 sm:p-8 lg:p-10">
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
                    <SocialIcon platform={item.platform} />
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
