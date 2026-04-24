import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const logos = [
  "HEIRESS",
  "TOZO",
  "HELL BABIS",
  "cocokind",
  "Oxyfresh",
  "DOT & KEY",
  "Styleguy",
  "Bellefit",
  "AMAZING LACE",
];

function FloatingBox({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        "absolute rounded-[24px] border border-black/[0.05] shadow-[0_24px_70px_rgba(15,23,42,0.08)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function ImageSlot({
  label,
  className = "",
  innerClassName = "",
}: {
  label: string;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-[22px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.03)_100%)]",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_38%)]" />
      <div
        className={[
          "absolute inset-[14px] rounded-[18px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.03)_100%)]",
          innerClassName,
        ].join(" ")}
      />
      <div className="absolute inset-x-0 bottom-4 text-center">
        <div className="inline-flex rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-white/90 backdrop-blur">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function AIGrowthPreviewPage() {
  return (
    <main className="bg-[#f5f4f1]">
      <section className="mx-auto w-full max-w-[1500px] px-4 pb-24 pt-8 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1220px] px-4 pb-12 pt-10 md:px-6 lg:px-8">
          <div className="mx-auto max-w-[760px] text-center">
            <h1
              className={[
                cormorant.className,
                "mx-auto text-[64px] font-medium leading-[0.92] tracking-[-0.04em] text-black sm:text-[86px] lg:text-[104px]",
              ].join(" ")}
            >
              AI-Driven Conversation
              <br />
              Growth Right Away
            </h1>

            <p className="mx-auto mt-6 max-w-[700px] text-[18px] leading-[1.6] text-[#444444] sm:text-[20px]">
              From concept to conversion — manage thousands of successful
              influencers ads seamlessly.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/masterclass"
                className="inline-flex min-w-[178px] items-center justify-center rounded-full bg-black px-8 py-4 text-[17px] font-medium text-white transition hover:bg-[#1a1a1a]"
              >
                Download Free App
              </Link>

              <Link
                href="/masterclass"
                className="inline-flex min-w-[178px] items-center justify-center rounded-full border border-black/30 bg-transparent px-8 py-4 text-[17px] font-medium text-black transition hover:bg-black/[0.03]"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          <div className="relative mx-auto mt-10 h-[620px] w-full max-w-[1120px] overflow-hidden">
            <div className="absolute left-1/2 top-[43%] h-[380px] w-[800px] -translate-x-1/2 rounded-t-[999px] border border-black/[0.06] border-b-0 opacity-70" />
            <div className="absolute left-1/2 top-[51%] h-[280px] w-[640px] -translate-x-1/2 rounded-t-[999px] bg-[#e9e1bc]" />

            <FloatingBox className="left-[88px] top-[58px] h-[170px] w-[152px] overflow-hidden bg-[#d7e5f4]">
              <div className="relative h-full w-full bg-[linear-gradient(140deg,#d3e2f3_0%,#bdd1eb_58%,#edf3f8_100%)]">
                <div className="absolute left-3 top-3 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-black shadow-sm">
                  2:01
                </div>

                <div className="absolute inset-[12px] bottom-[16px] top-[20px] rounded-[20px] border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_100%)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.25),transparent_38%)]" />
                  <div className="absolute left-[30px] top-[46px] h-[64px] w-[88px] rotate-[-12deg] rounded-[16px] bg-[#79a0dd] shadow-[0_14px_30px_rgba(59,130,246,0.25)]" />
                  <div className="absolute left-[86px] top-[62px] h-[14px] w-[30px] rotate-[-12deg] rounded-full bg-white/28" />
                  <div className="absolute inset-x-0 bottom-6 text-center">
                    <div className="inline-flex rounded-full bg-white/70 px-3 py-1 text-[10px] font-semibold tracking-[0.08em] text-slate-700 shadow-sm">
                      PRODUCT IMAGE
                    </div>
                  </div>
                </div>
              </div>
            </FloatingBox>

            <FloatingBox className="left-[160px] top-[244px] h-[44px] w-[124px] bg-[#efb4eb]">
              <div className="flex h-full items-center justify-center gap-1 text-[20px] text-black">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </FloatingBox>

            <FloatingBox className="left-[0px] top-[336px] h-[102px] w-[218px] bg-[#f2d455]">
              <div className="flex h-full items-center justify-between px-5">
                <div className="flex items-end gap-1">
                  <span className="block h-4 w-3 bg-[#3a150d]" />
                  <span className="block h-8 w-3 bg-[#3a150d]" />
                  <span className="block h-12 w-3 bg-[#3a150d]" />
                  <span className="block h-6 w-3 bg-[#3a150d]" />
                </div>
                <div className="min-w-[118px]">
                  <div className="text-[12px] font-medium text-black/60">Engagement</div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="text-[30px] font-semibold leading-none text-black">
                      40%
                    </div>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                      ▲
                    </div>
                  </div>
                </div>
              </div>
            </FloatingBox>

            <FloatingBox className="right-[72px] top-[68px] h-[144px] w-[240px] bg-[#b7e8ae]">
              <div className="flex h-full items-center justify-between px-5">
                <div>
                  <div className="flex items-end gap-1 leading-none">
                    <span className="text-[44px] font-semibold tracking-[-0.05em] text-black">
                      8
                    </span>
                    <span className="mb-1 text-[18px] font-medium text-black">items</span>
                  </div>
                  <div className="mt-2 text-[14px] text-black/70">Sold this week</div>
                  <div className="mt-4 inline-flex rounded-full bg-white px-3 py-1 text-[14px] font-medium text-black shadow-sm">
                    $12
                  </div>
                </div>

                <div className="relative h-[102px] w-[70px] rotate-[18deg] rounded-[18px]">
                  <div className="absolute left-1/2 top-0 h-[16px] w-[18px] -translate-x-1/2 rounded-full bg-[#d8d8d8]" />
                  <div className="absolute left-1/2 top-[10px] h-[88px] w-[36px] -translate-x-1/2 rounded-[16px] bg-[#111111]" />
                  <div className="absolute left-1/2 top-[34px] w-[54px] -translate-x-1/2 -rotate-[18deg]">
                    <div className="rounded-md border border-white/25 bg-white/5 px-1 py-2 text-center text-[10px] font-semibold text-white/90">
                      PRODUCT
                    </div>
                  </div>
                </div>
              </div>
            </FloatingBox>

            <FloatingBox className="right-[6px] top-[290px] h-[160px] w-[188px] overflow-hidden bg-[#f7f7f7]">
              <div className="relative h-[112px] w-full overflow-hidden rounded-t-[24px]">
                <div className="h-full w-full bg-[linear-gradient(135deg,#c8d8e5_0%,#f0d2b6_58%,#c8e3be_100%)]" />
                <div className="absolute inset-x-5 bottom-0 h-[86px] rounded-t-[16px] bg-[linear-gradient(135deg,#9ac0d7_0%,#efb489_50%,#70b566_100%)] opacity-90" />
                <div className="absolute inset-x-4 top-4 bottom-0 rounded-t-[18px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_100%)]" />
                <div className="absolute inset-x-0 bottom-4 text-center">
                  <div className="inline-flex rounded-full bg-white/70 px-3 py-1 text-[10px] font-semibold tracking-[0.08em] text-slate-700 shadow-sm">
                    SOCIAL IMAGE
                  </div>
                </div>
              </div>
              <div className="relative px-4 pb-3 pt-2">
                <div className="absolute -top-5 left-3 rounded-[9px] bg-[#5b2017] px-3 py-1 text-[13px] font-semibold text-white">
                  1.5k
                </div>
                <div className="mt-3 flex items-center justify-between text-[17px] text-black/28">
                  <span className="text-[#ef4e4e]">♥</span>
                  <span>💬</span>
                  <span>🛒</span>
                  <span>➤</span>
                </div>
              </div>
            </FloatingBox>

            <div className="absolute left-1/2 top-[86px] h-[430px] w-[292px] -translate-x-1/2 rounded-[42px] border-[8px] border-[#212121] bg-[#212121] shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-[#d8cdc3]">
                <div className="absolute left-1/2 top-4 h-5 w-[112px] -translate-x-1/2 rounded-full bg-[#121212]" />

                <div className="absolute left-4 right-4 top-8 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full bg-black/24 px-3 py-2 backdrop-blur">
                    <div className="h-7 w-7 rounded-full bg-[radial-gradient(circle_at_40%_35%,#f0d7bf_0%,#b8613f_45%,#1f1f1f_100%)]" />
                    <span className="text-[12px] font-medium text-white">Wade Warren</span>
                  </div>
                  <div className="rounded-full bg-[#ff684c] px-3 py-1.5 text-[12px] font-semibold text-white">
                    Live
                  </div>
                </div>

                <div className="absolute inset-x-[14px] bottom-[14px] top-[72px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#cfb5a8_0%,#e39a78_58%,#5a342e_100%)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.32),transparent_24%)]" />

                  <div className="absolute inset-x-[18px] top-[18px] bottom-[18px] rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.02)_100%)]">
                    <div className="absolute inset-[18px] rounded-[22px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.01)_100%)]" />
                    <div className="absolute inset-x-0 bottom-[64px] text-center">
                      <div className="inline-flex rounded-full bg-black/35 px-4 py-1.5 text-[11px] font-semibold tracking-[0.10em] text-white/95 backdrop-blur">
                        MAIN PORTRAIT IMAGE
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-[120px] bg-[linear-gradient(180deg,rgba(55,31,28,0)_0%,rgba(55,31,28,0.52)_100%)]" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-[0px] left-1/2 flex w-full max-w-[1120px] -translate-x-1/2 flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[16px] font-semibold tracking-[-0.02em] text-black/82">
              {logos.map((logo) => (
                <div key={logo} className="whitespace-nowrap">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
