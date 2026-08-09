import { LockKeyhole, Mail, Sparkles } from "lucide-react";
import { sanitizeDashboardNext } from "@/lib/dashboard-auth";

type PageProps = {
  searchParams?: {
    error?: string;
    next?: string;
  };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function DashboardLoginPage({ searchParams }: PageProps) {
  const error = String(searchParams?.error || "").trim();
  const next = sanitizeDashboardNext(searchParams?.next);

  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#EEF3FA] px-4 py-8 text-[#0F172A] md:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-180px)] max-w-[1380px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[34px] border border-[#D8E2F0] bg-white shadow-[0_30px_90px_rgba(15,23,42,0.10)] lg:grid-cols-[0.94fr_1.06fr]">
          {/* LEFT LOGIN PANEL */}
          <section className="flex items-center justify-center bg-[linear-gradient(180deg,#ffffff,#f8fbff)] px-6 py-10 sm:px-10 lg:px-12">
            <div className="w-full max-w-[430px]">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563EB] text-sm font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.28)]">
                  SD
                </div>

                <div>
                  <div className="text-[20px] font-extrabold leading-none tracking-tight text-[#0F172A]">
                    Sikhadenge
                  </div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
                    Dashboard Access
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-[#E5ECF6] bg-white p-6 shadow-[0_16px_48px_rgba(15,23,42,0.06)] sm:p-7">
                <div className="text-center text-[38px] font-extrabold leading-none tracking-tight text-[#0F172A]">
                  Sign In
                </div>

                <p className="mt-3 text-center text-[15px] leading-7 text-[#64748B]">
                  Secure login for private dashboard modules and internal reporting access.
                </p>

                {error === "invalid" ? (
                  <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    Invalid username or password.
                  </div>
                ) : null}

                <form method="POST" action="/api/dashboard-auth/login" className="mt-7 space-y-5">
                  <input type="hidden" name="next" value={next} />

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#334155]">
                      Username
                    </label>
                    <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#D8E2F0] bg-[#F8FBFF] px-4 transition focus-within:border-[#2563EB] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#2563EB]/10">
                      <Mail className="h-4 w-4 text-[#64748B]" />
                      <input
                        name="user"
                        required
                        autoComplete="username"
                        placeholder="Enter username"
                        className="w-full bg-transparent text-[15px] text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#334155]">
                      Password
                    </label>
                    <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#D8E2F0] bg-[#F8FBFF] px-4 transition focus-within:border-[#2563EB] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#2563EB]/10">
                      <LockKeyhole className="h-4 w-4 text-[#64748B]" />
                      <input
                        type="password"
                        name="pass"
                        required
                        autoComplete="current-password"
                        placeholder="Enter password"
                        className="w-full bg-transparent text-[15px] text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-[14px] text-[#64748B]">
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-[#CBD5E1]" />
                      <span>Remember for session</span>
                    </label>
                    <span className="font-medium text-[#2563EB]">Private access</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-[#2563EB] px-4 text-[16px] font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)] transition hover:bg-[#1D4ED8]"
                  >
                    Login to Dashboard
                  </button>
                </form>

                <div className="mt-6 border-t border-[#E2E8F0] pt-5 text-center text-[13px] leading-6 text-[#64748B]">
                  This area is restricted to internal business reporting, tracking, and admin controls.
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT BRAND PANEL */}
          <section className="relative hidden overflow-hidden bg-[linear-gradient(180deg,#2563EB_0%,#3B82F6_55%,#2F6DF0_100%)] lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_22%)]" />
            <div className="absolute left-[-80px] top-[-80px] h-[240px] w-[240px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-[-90px] right-[-50px] h-[220px] w-[220px] rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between px-10 py-12 xl:px-12 xl:py-14">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
                  <Sparkles className="h-3.5 w-3.5" />
                  Internal Business Workspace
                </div>

                <h2 className="mt-8 max-w-[540px] text-[30px] font-semibold leading-[1.18] tracking-[-0.02em] text-white xl:text-[34px]">
                  Welcome back. Sign in to your
                  <span className="ml-2 underline decoration-white/55 underline-offset-4">
                    Sikhadenge dashboard
                  </span>
                </h2>

                <p className="mt-7 max-w-[560px] text-[19px] leading-9 text-white/85">
                  Monitor leads, registrations, Zoom joins, team performance, and internal execution systems from one protected workspace.
                </p>
              </div>

              <div className="relative mx-auto mt-10 w-full max-w-[560px]">
                <div className="rounded-[22px] bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-[14px] font-semibold text-[#0F172A]">Sales Report</div>

                    <div className="flex items-center gap-4 text-[11px] text-[#64748B]">
                      <div className="inline-flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
                        Profit
                      </div>
                      <div className="inline-flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#E5EAF2]" />
                        Expenses
                      </div>
                    </div>
                  </div>

                  <div className="relative h-[210px] rounded-[18px] bg-[#FFFFFF] px-4 pb-7 pt-4">
                    <div className="absolute inset-x-4 bottom-7 top-4">
                      <div className="flex h-full items-end justify-between gap-3">
                        {[
                          { label: "Jan", blue: 48, gray: 92 },
                          { label: "Fab", blue: 36, gray: 64 },
                          { label: "Mar", blue: 46, gray: 78 },
                          { label: "Apr", blue: 28, gray: 50 },
                          { label: "May", blue: 18, gray: 58 },
                          { label: "Jun", blue: 24, gray: 62 },
                          { label: "Jul", blue: 18, gray: 64 },
                          { label: "Aug", blue: 40, gray: 72 },
                          { label: "Sep", blue: 30, gray: 54 },
                          { label: "Oct", blue: 44, gray: 80 },
                        ].map((item) => (
                          <div key={item.label} className="flex h-full flex-1 items-end justify-center gap-[3px]">
                            <div
                              className="w-full max-w-[12px] rounded-t-[10px] bg-[#E7ECF3]"
                              style={{ height: `${item.gray}%` }}
                            />
                            <div
                              className="w-full max-w-[12px] rounded-t-[10px] bg-[linear-gradient(180deg,#4B78ED_0%,#3565E4_100%)]"
                              style={{ height: `${item.blue}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="absolute inset-x-4 bottom-0 flex justify-between text-[10px] font-medium text-[#94A3B8]">
                      {["Jan", "Fab", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m) => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>

                    <div className="absolute right-[74px] top-[76px] rounded-lg bg-[#0F172A] px-3 py-1.5 text-[10px] font-medium text-white shadow-[0_10px_24px_rgba(15,23,42,0.22)]">
                      $ 89,897
                    </div>

                    <div className="absolute right-[64px] top-[102px] rounded-lg bg-[#1E293B] px-3 py-1.5 text-[10px] font-medium text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]">
                      $ 98,265
                    </div>
                  </div>
                </div>

                <div className="absolute right-[-12px] top-[-18px] w-[108px] rounded-[12px] bg-white p-2.5 shadow-[0_16px_36px_rgba(15,23,42,0.16)]">
                  <div className="text-[7px] font-semibold text-[#64748B]">Popular Categories</div>

                  <div className="relative mx-auto mt-2 flex h-[64px] w-[64px] items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_220deg,#111827_0deg,#111827_115deg,#3B82F6_115deg,#3B82F6_250deg,#38BDF8_250deg,#38BDF8_360deg)]" />
                    <div className="absolute inset-[8px] rounded-full bg-white" />
                    <div className="relative text-center">
                      <div className="text-[6px] font-medium leading-tight text-[#64748B]">Total Categories</div>
                      <div className="mt-0.5 text-[9px] font-bold text-[#0F172A]">2418</div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[5px] text-[#64748B]">
                    <div className="inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#111827]" />
                      Mobile
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
                      Laptop
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
                      Electronics
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2">
                  <div className="h-[4px] w-4 rounded-full bg-white" />
                  <div className="h-[4px] w-2 rounded-full bg-white/45" />
                  <div className="h-[4px] w-2 rounded-full bg-white/45" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
