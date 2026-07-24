import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://sikhadenge.in";
const ORGANIZATION_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const FALLBACK_OG_IMAGE = `${BASE_URL}/images/og/og-home.jpg`;

type PageProps = {
  params: {
    slug: string;
  };
};

type FaqRow = {
  q: string;
  a: string;
};

function cleanDescription(value?: string | null, fallback?: string) {
  const clean = String(value || fallback || "")
    .replace(/\s+/g, " ")
    .trim();

  if (clean.length <= 180) return clean;
  return `${clean.slice(0, 177).replace(/\s+\S*$/, "")}...`;
}

function toFeatureList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .slice(0, 24);
}

function toFaqList(value: unknown): FaqRow[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      const row = item as { q?: unknown; a?: unknown };
      return {
        q: String(row?.q || "").trim(),
        a: String(row?.a || "").trim(),
      };
    })
    .filter((item) => item.q && item.a)
    .slice(0, 20);
}

function absoluteImage(value?: string | null) {
  if (!value) return FALLBACK_OG_IMAGE;
  if (/^https?:\/\//i.test(value)) return value;
  return `${BASE_URL}/${value.replace(/^\/+/, "")}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await prisma.storeProduct.findUnique({
    where: { slug: params.slug },
    select: {
      title: true,
      shortDescription: true,
      fullDescription: true,
      status: true,
      coverImage: true,
      previewImage: true,
    },
  });

  if (!product || product.status !== "ACTIVE") {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `${BASE_URL}/store/${params.slug}`;
  const description = cleanDescription(
    product.shortDescription || product.fullDescription,
    "Digital products, prompt packs, and automation toolkits by Sikhadenge.",
  );
  const image = absoluteImage(product.coverImage || product.previewImage);

  return {
    title: product.title,
    description,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Sikhadenge",
      title: product.title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: [image],
    },
  };
}

export default async function StoreProductPage({ params }: PageProps) {
  const product = await prisma.storeProduct.findUnique({
    where: { slug: params.slug },
  });

  if (!product || product.status !== "ACTIVE") {
    notFound();
  }

  const features = toFeatureList(product.features);
  const faqs = toFaqList(product.faqs);
  const canonical = `${BASE_URL}/store/${product.slug}`;
  const description = cleanDescription(
    product.fullDescription || product.shortDescription,
    "A Sikhadenge digital product designed for practical AI and automation workflows.",
  );
  const productImage = absoluteImage(product.coverImage || product.previewImage);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: product.title,
        description,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        dateCreated: product.createdAt.toISOString(),
        dateModified: product.updatedAt.toISOString(),
        mainEntity: { "@id": `${canonical}#product` },
      },
      {
        "@type": "Product",
        "@id": `${canonical}#product`,
        name: product.title,
        url: canonical,
        description,
        image: [productImage],
        sku: product.slug,
        category: product.category || "Digital Product",
        brand: { "@id": ORGANIZATION_ID },
        offers: {
          "@type": "Offer",
          url: `${BASE_URL}/checkout/${product.slug}`,
          priceCurrency: "INR",
          price: Number(product.price).toFixed(2),
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": ORGANIZATION_ID },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Store", item: `${BASE_URL}/store` },
          { "@type": "ListItem", position: 3, name: product.title, item: canonical },
        ],
      },
      ...(faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${canonical}#faq`,
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link className="hover:text-slate-900" href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link className="hover:text-slate-900" href="/store">Store</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700" aria-current="page">{product.title}</li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              {product.category || "Digital Product"}
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {product.title}
            </h1>

            <section aria-labelledby="quick-answer" className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
              <h2 id="quick-answer" className="text-sm font-bold uppercase tracking-[0.14em] text-blue-700">
                Quick answer
              </h2>
              <p className="mt-2 text-base leading-7 text-slate-700">
                {product.fullDescription || product.shortDescription || "This Sikhadenge digital product provides a practical resource for a defined AI or automation workflow."}
              </p>
            </section>

            {features.length > 0 ? (
              <section className="mt-8" aria-labelledby="product-includes">
                <h2 id="product-includes" className="text-xl font-semibold text-slate-900">What you get</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {faqs.length > 0 ? (
              <section className="mt-10" aria-labelledby="product-faqs">
                <h2 id="product-faqs" className="text-xl font-semibold text-slate-900">Frequently asked questions</h2>
                <div className="mt-4 space-y-4">
                  {faqs.map((item) => (
                    <div
                      key={item.q}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <h3 className="text-sm font-semibold text-slate-900">{item.q}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="mt-10 border-t border-slate-200 pt-6 text-sm leading-6 text-slate-600" aria-labelledby="product-publisher">
              <h2 id="product-publisher" className="font-semibold text-slate-900">Publisher and support</h2>
              <p className="mt-2">
                Published by Sikhadenge under ThinkGrow Pvt. Ltd. Review the{" "}
                <Link className="font-medium text-blue-700 hover:underline" href="/terms">terms</Link>,{" "}
                <Link className="font-medium text-blue-700 hover:underline" href="/refund-policy">refund policy</Link>, or{" "}
                <Link className="font-medium text-blue-700 hover:underline" href="/contact-us">contact support</Link> before purchase.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Product information last updated {product.updatedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
              </p>
            </section>
          </article>

          <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm" aria-label="Purchase information">
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-slate-900">₹{product.price}</span>
              {product.compareAtPrice ? (
                <span className="pb-1 text-base text-slate-400 line-through">₹{product.compareAtPrice}</span>
              ) : null}
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Continue to the secure checkout, review the final amount including applicable taxes, and complete payment through Razorpay.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href={`/checkout/${product.slug}`}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
              >
                Continue to secure checkout
              </Link>

              <Link
                href="/store"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900"
              >
                Back to Store
              </Link>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-semibold text-slate-900">Payment and delivery</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Payment is verified before access or delivery details are shown. Keep your email and WhatsApp number accurate so order communication reaches you.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
