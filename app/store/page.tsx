import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Store | Sikhadenge",
  description: "Digital products, prompt packs, and automation toolkits by Sikhadenge.",
};

export default async function StorePage() {
  const products = await prisma.storeProduct.findMany({
    where: { status: "ACTIVE" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Sikhadenge Store
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Digital Products, Prompt Packs & Automation Toolkits
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Explore low-ticket digital products, prompt bundles, and automation-focused resources.
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">No products available yet</h2>
            <p className="mt-2 text-sm text-slate-600">
              Products will appear here after they are added and activated.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-500">
                    {product.category || "Digital Product"}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-900">
                    ₹{product.price}
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-semibold leading-snug text-slate-900">
                  {product.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {product.shortDescription || "No description available."}
                </p>

                <div className="mt-6">
                  <a
                    href={`/store/${product.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
                  >
                    View Product
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
