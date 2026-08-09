import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://sikhadenge.in";

// Store inventory is database-backed and must be rendered at request time.
// This keeps production builds independent from runtime database credentials.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Digital Products, Prompt Packs & Automation Toolkits",
  description: "Browse Sikhadenge digital products, prompt packs, and practical automation toolkits with clear product details and secure checkout.",
  alternates: { canonical: `${BASE_URL}/store` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/store`,
    siteName: "Sikhadenge",
    title: "Sikhadenge Store",
    description: "Digital products, prompt packs, and practical automation toolkits by Sikhadenge.",
    images: [{ url: `${BASE_URL}/images/og/og-home.jpg`, width: 1200, height: 630, alt: "Sikhadenge Store" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sikhadenge Store",
    description: "Digital products, prompt packs, and practical automation toolkits by Sikhadenge.",
    images: [`${BASE_URL}/images/og/og-home.jpg`],
  },
};

export default async function StorePage() {
  const products = await prisma.storeProduct.findMany({
    where: { status: "ACTIVE" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  const canonical = `${BASE_URL}/store`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: "Sikhadenge Store",
        description: metadata.description,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        publisher: { "@id": `${BASE_URL}/#organization` },
        mainEntity: { "@id": `${canonical}#products` },
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#products`,
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.title,
          url: `${BASE_URL}/store/${product.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Store", item: canonical },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex items-center gap-2">
            <li><Link className="hover:text-slate-900" href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700" aria-current="page">Store</li>
          </ol>
        </nav>

        <header className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Sikhadenge Store
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Digital Products, Prompt Packs & Automation Toolkits
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Explore practical digital resources with transparent descriptions, visible pricing, secure checkout, and support links before purchase.
            </p>
          </div>
        </header>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">No products available yet</h2>
            <p className="mt-2 text-sm text-slate-600">Products will appear here after they are reviewed and activated.</p>
          </div>
        ) : (
          <section aria-label="Available digital products" className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <article key={product.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-500">{product.category || "Digital Product"}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-900">₹{product.price}</span>
                </div>

                <h2 className="mt-5 text-xl font-semibold leading-snug text-slate-900">
                  <Link className="hover:text-blue-700" href={`/store/${product.slug}`}>{product.title}</Link>
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {product.shortDescription || "Open the product page for features, FAQs, pricing, and delivery information."}
                </p>

                <div className="mt-6">
                  <Link
                    href={`/store/${product.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
                  >
                    View product details
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}

        <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 shadow-sm" aria-labelledby="store-trust">
          <h2 id="store-trust" className="text-lg font-semibold text-slate-900">Store ownership, policies, and support</h2>
          <p className="mt-2">
            Sikhadenge is operated by ThinkGrow Pvt. Ltd. Review the{" "}
            <Link className="font-medium text-blue-700 hover:underline" href="/terms">terms</Link>,{" "}
            <Link className="font-medium text-blue-700 hover:underline" href="/refund-policy">refund policy</Link>, and{" "}
            <Link className="font-medium text-blue-700 hover:underline" href="/privacy-policy">privacy policy</Link>. For a product or order question, use the{" "}
            <Link className="font-medium text-blue-700 hover:underline" href="/contact-us">contact page</Link>.
          </p>
        </section>
      </section>
    </main>
  );
}
