import Link from "next/link";
import { redirect } from "next/navigation";
import { getMasterclassSettings } from "@/lib/masterclass-settings";

type PageProps = {
  searchParams?: {
    phone?: string;
    name?: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const phone = String(searchParams?.phone || "").trim();
  const name = String(searchParams?.name || "").trim();

  if (!phone) {
    redirect("/gen-ai-masterclass/register-one-step");
  }

  const settings = await getMasterclassSettings();
  const COMMUNITY_LINK = settings.redirectLink || settings.communityLink;
  const REDIRECT_DELAY_SECONDS = settings.redirectDelaySeconds;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            header, footer { display: none !important; }
            html, body { background: #0B1220; margin: 0 !important; padding: 0 !important; }
            body > * { margin-top: 0 !important; }
            main { margin-top: 0 !important; padding-top: 0 !important; }
          `,
        }}
      />
      <main className="relative min-h-screen overflow-hidden bg-[#0B1220] text-white pt-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(245,179,1,0.10),transparent_22%),linear-gradient(180deg,#0B1220_0%,#111827_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />

        <section className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-6 md:py-8">
          <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/5 p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur md:p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-3xl text-emerald-300">
              ✓
            </div>

            <p className="mt-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#F5B301]">
              Gen-AI Masterclass
            </p>

            <h1 className="mt-5 text-2xl font-extrabold leading-tight md:text-4xl">
              Registration{" "}
              <span className="block bg-gradient-to-r from-white via-[#93C5FD] to-[#F5B301] bg-clip-text text-transparent">
                Successful
              </span>
            </h1>

            <p className="mt-4 text-sm leading-7 text-white/80 md:text-base">
              {name ? `${name}, ` : ""}your seat is confirmed.
            </p>

            <p className="mt-2 text-sm leading-7 text-white/70 md:text-base">
              You will be redirected to the WhatsApp community in{" "}
              <span className="font-bold text-[#F5B301]">
                {REDIRECT_DELAY_SECONDS} seconds
              </span>
              .
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                Registered Phone
              </p>
              <p className="mt-2 break-all text-base font-semibold text-white">
                {phone}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={COMMUNITY_LINK}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#2563EB] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#1D4ED8]"
              >
                Join WhatsApp Community
              </Link>

              <Link
                href="/gen-ai-masterclass/register-one-step"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Back to Register Page
              </Link>
            </div>

            <p className="mt-5 text-xs leading-6 text-white/55 md:text-sm">
              Keep your WhatsApp active. Class details and updates will be shared there.
            </p>
          </div>
        </section>

        <script
          dangerouslySetInnerHTML={{
            __html: `setTimeout(function () { window.location.href = ${JSON.stringify(
              COMMUNITY_LINK
            )}; }, ${REDIRECT_DELAY_SECONDS * 1000});`,
          }}
        />
      </main>
    </>
  );
}
