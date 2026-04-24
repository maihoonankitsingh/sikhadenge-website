import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import HubInternalLinks from "@/components/seo/HubInternalLinks";

export const metadata: Metadata = {
  title: "HTML Sitemap | Sikhadenge",
  description:
    "Browse all important Sikhadenge pages including AI skills, workflows, tools, blogs, and learning pages through a structured HTML sitemap.",
  alternates: {
    canonical: "https://sikhadenge.in/site-map",
  },
  openGraph: {
    title: "HTML Sitemap | Sikhadenge",
    description:
      "Browse all important Sikhadenge pages including AI skills, workflows, tools, blogs, and learning pages through a structured HTML sitemap.",
    url: "https://sikhadenge.in/site-map",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Sitemap | Sikhadenge",
    description:
      "Browse all important Sikhadenge pages including AI skills, workflows, tools, blogs, and learning pages through a structured HTML sitemap.",
  },
};

const APP_DIR = path.join(process.cwd(), "app");

const EXCLUDED_ROUTES = new Set([
  "/dashboard",
  "/admin/dashboard",
  "/admin/masterclass-dashboard",
  "/admission/complete",
  "/admission/welcome",
  "/admission-payu/complete",
  "/site-map",
]);

const EXCLUDED_PREFIXES = [
  "/api",
  "/auth",
  "/private",
  "/tmp",
  "/admin",
];

function shouldSkipDir(name: string) {
  return (
    name.startsWith("_") ||
    name.startsWith("(") ||
    name.startsWith("[") ||
    name.includes(".bk_") ||
    name.includes(".bak_") ||
    name === "api"
  );
}

function collectRoutes(dir: string, baseRoute = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes: string[] = [];

  const hasPage = entries.some(
    (entry) => entry.isFile() && entry.name === "page.tsx"
  );

  if (hasPage) {
    routes.push(baseRoute || "/");
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (shouldSkipDir(entry.name)) continue;

    const childDir = path.join(dir, entry.name);
    const childRoute = `${baseRoute}/${entry.name}`.replace(/\/+/g, "/");
    routes.push(...collectRoutes(childDir, childRoute));
  }

  return routes;
}

function isAllowedRoute(route: string) {
  if (EXCLUDED_ROUTES.has(route)) return false;
  if (EXCLUDED_PREFIXES.some((prefix) => route === prefix || route.startsWith(prefix + "/"))) {
    return false;
  }
  return true;
}

function titleFromRoute(route: string) {
  if (route === "/") return "Home";

  const part = route.split("/").filter(Boolean).pop() || "";
  return part
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "ai") return "AI";
      if (word.toLowerCase() === "seo") return "SEO";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function groupLabel(route: string) {
  if (route === "/") return "Main Pages";
  if (route.startsWith("/ai-skills-for-")) return "AI Skills By Audience";
  if (route === "/ai-skills") return "AI Skills Hub";
  if (route.startsWith("/ai-tools-for-")) return "AI Tools By Use Case";
  if (route === "/ai-tools") return "AI Tools Hub";
  if (route.startsWith("/ai-") && route.endsWith("-workflows")) return "AI Workflow Pages";
  if (route.startsWith("/ai-")) return "AI Core Pages";
  if (route.startsWith("/blog")) return "Blog Pages";
  if (route.startsWith("/courses")) return "Course Pages";
  if (
    route === "/privacy-policy" ||
    route === "/refund-policy" ||
    route === "/terms" ||
    route === "/shipping-policy" ||
    route === "/cancellation-policy" ||
    route === "/disclaimer"
  ) {
    return "Policy Pages";
  }
  return "Business Pages";
}

function groupOrder(label: string) {
  const order: Record<string, number> = {
    "Main Pages": 1,
    "AI Core Pages": 2,
    "AI Skills Hub": 3,
    "AI Skills By Audience": 4,
    "AI Tools Hub": 5,
    "AI Tools By Use Case": 6,
    "AI Workflow Pages": 7,
    "Blog Pages": 8,
    "Course Pages": 9,
    "Business Pages": 10,
    "Policy Pages": 11,
  };
  return order[label] ?? 99;
}

function buildGroupedRoutes() {
  const routes = Array.from(
    new Set(collectRoutes(APP_DIR).filter(isAllowedRoute))
  ).sort();

  const grouped = new Map<string, string[]>();

  for (const route of routes) {
    const label = groupLabel(route);
    if (!grouped.has(label)) grouped.set(label, []);
    grouped.get(label)!.push(route);
  }

  return Array.from(grouped.entries()).sort(
    (a, b) => groupOrder(a[0]) - groupOrder(b[0])
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#245EEA] shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
      {children}
    </div>
  );
}

export default function SiteMapPage() {
  const groupedRoutes = buildGroupedRoutes();
  const totalLinks = groupedRoutes.reduce((acc, [, routes]) => acc + routes.length, 0);

  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>HTML Sitemap</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Browse all important Sikhadenge pages
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              This HTML sitemap helps users and search engines discover the main Sikhadenge page structure across AI
              skills, workflows, tools, blog pages, courses, and important business pages.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-[#D8E5F4] bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
                <div className="text-sm font-semibold text-[#2563EB]">Total links</div>
                <div className="mt-2 text-3xl font-bold text-[#071533]">{totalLinks}</div>
              </div>
              <div className="rounded-[24px] border border-[#D8E5F4] bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
                <div className="text-sm font-semibold text-[#2563EB]">SEO cluster</div>
                <div className="mt-2 text-3xl font-bold text-[#071533]">AI authority</div>
              </div>
              <div className="rounded-[24px] border border-[#D8E5F4] bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
                <div className="text-sm font-semibold text-[#2563EB]">Purpose</div>
                <div className="mt-2 text-3xl font-bold text-[#071533]">Discovery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {groupedRoutes.map(([label, routes]) => (
              <section
                key={label}
                className="rounded-[30px] border border-[#D8E5F4] bg-white p-7 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[22px] font-semibold leading-[1.3] text-[#071533]">
                    {label}
                  </h2>
                  <span className="rounded-full border border-[#D8E5F4] bg-[#F8FBFF] px-3 py-1 text-xs font-semibold text-[#2563EB]">
                    {routes.length}
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {routes.map((route) => (
                    <Link
                      key={route}
                      href={route}
                      className="group flex items-start justify-between gap-4 rounded-2xl border border-[#ECF2FA] bg-[#FBFDFF] px-4 py-3 transition hover:border-[#BFD4F3] hover:bg-white"
                    >
                      <div>
                        <div className="text-[15px] font-semibold text-[#071533]">
                          {titleFromRoute(route)}
                        </div>
                        <div className="mt-1 text-[13px] leading-[1.6] text-[#47607F]">
                          {route}
                        </div>
                      </div>
                      <span className="shrink-0 text-[#2563EB] transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
      <HubInternalLinks hub="site-map" />
</main>
  );
}
