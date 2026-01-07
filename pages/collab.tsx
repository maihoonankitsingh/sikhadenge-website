
// pages/collab.tsx
import Head from "next/head";
import Link from "next/link";
import PageShell from "../components/PageShell";

function IconBadge({
  children,
  glow = "blue",
}: {
  children: React.ReactNode;
  glow?: "blue" | "gold";
}) {
  const glowClass =
    glow === "gold"
      ? "shadow-[0_0_18px_rgba(245,179,1,0.55)]"
      : "shadow-[0_0_18px_rgba(37,99,235,0.55)]";

  return (
    <div
      className={[
        "grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-[#111827]/60 backdrop-blur",
        glowClass,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function CollabPage() {
  const admissionsPhone = "+91 8808505575";
  const supportEmail = "support@sikhadenge.in";

  return (
    <PageShell title="Collaboration / Tie-up">
      <Head>
        <title>Collaboration / Tie-up | Sikhadenge</title>
        <meta
          name="description"
          content="Collaboration / Tie-up queries for Sikhadenge. Use the Contact Form and select the Collaboration category."
        />
      </Head>

      {/* NOTE: Ye page dark-theme me same contact-page style follow karega */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Hero card */}
        <section className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/35 backdrop-blur">
            {/* background image */}
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(11,18,32,0.90) 0%, rgba(11,18,32,0.55) 55%, rgba(11,18,32,0.92) 100%), url('/images/contact/workshop-classroom.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="relative p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <IconBadge glow="blue">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2a10 10 0 1 0 10 10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M22 2l-7.5 7.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14 2h8v8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </IconBadge>

                <div>
                  <div className="text-xs tracking-[0.2em] text-[#B0B7C3]">
                    CORPORATE / WORKSHOP
                  </div>
                  <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                    Collaboration /{" "}
                    <span className="text-[#F5B301]">Tie-up</span>
                  </h1>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#B0B7C3]">
                    Training, workshops, brand partnerships, community programs
                    or corporate tie-ups.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#0B1220]/40 p-4">
                  <div className="flex items-center gap-3">
                    <IconBadge glow="gold">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M6.5 10.5l3 3 8-8"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 12a9 9 0 1 1-9-9"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </IconBadge>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Fast routing
                      </div>
                      <div className="text-xs text-[#9CA3AF]">
                        Use Contact Form → select “Collaboration”
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0B1220]/40 p-4">
                  <div className="flex items-center gap-3">
                    <IconBadge glow="blue">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 6h16v12H4z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 7l8 6 8-6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </IconBadge>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Email (optional)
                      </div>
                      <div className="text-xs text-[#9CA3AF] break-all">
                        {supportEmail}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 text-xs text-[#9CA3AF]">
                Parent company: ThinkGrow Pvt Ltd.
              </div>
            </div>
          </div>
        </section>

        {/* Right: Steps + button */}
        <aside className="lg:col-span-5">
          <div className="rounded-3xl border border-white/10 bg-[#111827]/45 p-6 backdrop-blur sm:p-8">
            <div className="flex items-start gap-3">
              <IconBadge glow="gold">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3l9 4.5-9 4.5-9-4.5L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 7.5V16.5L12 21 3 16.5V7.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </IconBadge>

              <div>
                <div className="text-sm font-semibold text-white">
                  Send collaboration request
                </div>
                <div className="mt-1 text-xs text-[#9CA3AF]">
                  Single place for all queries (recommended).
                </div>
              </div>
            </div>

            <ol className="mt-5 space-y-3 text-sm text-[#B0B7C3]">
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0B1220]/40 text-xs text-white">
                  1
                </span>
                Open Contact Form.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0B1220]/40 text-xs text-white">
                  2
                </span>
                Select Category: <span className="text-white">Collaboration</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0B1220]/40 text-xs text-white">
                  3
                </span>
                Add brief + links (company/profile/website).
              </li>
            </ol>

            <div className="mt-6 grid gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#F5B301] px-4 py-3 text-sm font-semibold text-[#0B1220] hover:bg-[#F5B301]/90"
              >
                Go to Contact Form
                <span aria-hidden="true">→</span>
              </Link>

              <div className="rounded-2xl border border-white/10 bg-[#0B1220]/40 p-4">
                <div className="text-xs text-[#9CA3AF]">Phone (Admissions)</div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {admissionsPhone}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
