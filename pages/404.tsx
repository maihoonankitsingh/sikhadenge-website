import Head from "next/head";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 | Sikhadenge</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="min-h-screen bg-[#0B1220] text-white">
        <section className="pt-24 pb-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-8 sm:p-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0B1220] px-3 py-1 text-xs text-[#B0B7C3]">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{
                      boxShadow: "0 0 18px rgba(37,99,235,0.55)",
                      background: "#2563EB",
                    }}
                  />
                  Page not found
                </div>

                <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  404 — This page doesn’t exist
                </h1>
                <p className="mt-3 text-base leading-relaxed text-[#B0B7C3]">
                  The link may be incorrect, or the page may have moved.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white"
                    style={{ boxShadow: "0 0 18px rgba(37,99,235,0.55)" }}
                  >
                    Go to Home
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm font-semibold text-white"
                  >
                    Contact support
                  </Link>
                </div>

                <div className="mt-8 h-px w-full bg-white/10" />
                <div className="mt-4 text-xs text-[#9CA3AF]">
                  Sikhadenge • If you reached here from an internal link, update the route.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

