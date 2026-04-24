import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const product = await prisma.storeProduct.findUnique({
    where: { slug: params.slug },
    select: {
      title: true,
      shortDescription: true,
    },
  });

  if (!product) {
    return {
      title: "Product Not Found | Sikhadenge",
    };
  }

  return {
    title: `${product.title} | Sikhadenge Store`,
    description:
      product.shortDescription ||
      "Digital products, prompt packs, and automation toolkits by Sikhadenge.",
  };
}

export default async function StoreProductPage({ params }: PageProps) {
  const product = await prisma.storeProduct.findUnique({
    where: { slug: params.slug },
  });

  if (!product || product.status !== "ACTIVE") {
    notFound();
  }

  const features = Array.isArray(product.features) ? product.features : [];
  const faqs = Array.isArray(product.faqs) ? product.faqs : [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              {product.category || "Digital Product"}
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {product.title}
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600">
              {product.fullDescription || product.shortDescription || "No description available."}
            </p>

            {features.length > 0 ? (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-slate-900">What you get</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      {String(feature)}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {faqs.length > 0 ? (
              <div className="mt-10">
                <h2 className="text-xl font-semibold text-slate-900">FAQs</h2>
                <div className="mt-4 space-y-4">
                  {faqs.map((item, index) => {
                    const row = item as { q?: string; a?: string };
                    return (
                      <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <h3 className="text-sm font-semibold text-slate-900">
                          {row.q || "Question"}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {row.a || "Answer"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-slate-900">₹{product.price}</span>
              {product.compareAtPrice ? (
                <span className="pb-1 text-base text-slate-400 line-through">
                  ₹{product.compareAtPrice}
                </span>
              ) : null}
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Instant-access digital product page is ready. Checkout and delivery flow
              will be connected in the next steps.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={`/checkout/${product.slug}`}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
              >
                Continue to Checkout
              </a>

              <a
                href="/store"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900"
              >
                Back to Store
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">Safe launch mode</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This page is live-ready as a product landing page, but payment is not yet enabled.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
