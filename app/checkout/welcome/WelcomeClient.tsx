"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  status: string;
  whatsappUrl: string;
  redirectDelaySeconds?: number;
};

export default function WelcomeClient({
  status,
  whatsappUrl,
  redirectDelaySeconds = 5,
}: Props) {
  const safeDelay = Number.isFinite(redirectDelaySeconds) && redirectDelaySeconds >= 0
    ? redirectDelaySeconds
    : 5;

  const [seconds, setSeconds] = useState(safeDelay);
  const redirectDone = useRef(false);

  const isSuccess = useMemo(() => !status || status === "success", [status]);
  const finalUrl = useMemo(() => String(whatsappUrl || "").trim(), [whatsappUrl]);

  const goToWhatsApp = () => {
    if (!finalUrl) return;
    try {
      window.location.href = finalUrl;
      setTimeout(() => {
        window.location.replace(finalUrl);
      }, 700);
    } catch {
      window.location.replace(finalUrl);
    }
  };

  useEffect(() => {
    setSeconds(safeDelay);
  }, [safeDelay]);

  useEffect(() => {
    if (!isSuccess || !finalUrl) return;
    if (redirectDone.current) return;

    const tick = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(tick);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      if (redirectDone.current) return;
      redirectDone.current = true;
      goToWhatsApp();
    }, safeDelay * 1000);

    const fallback = setTimeout(() => {
      if (redirectDone.current) return;
      redirectDone.current = true;
      goToWhatsApp();
    }, safeDelay * 1000 + 2000);

    return () => {
      clearInterval(tick);
      clearTimeout(timer);
      clearTimeout(fallback);
    };
  }, [isSuccess, finalUrl, safeDelay]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-10">
        <div className="w-full rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-[0_20px_60px_rgba(2,6,23,0.08)] sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
            {isSuccess ? "✓" : "!"}
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {isSuccess ? "Payment Received Successfully" : "Payment Status Pending"}
          </h1>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            {isSuccess
              ? "Your registration is confirmed. Join the WhatsApp community now to receive workshop details and post-masterclass resources."
              : "We could not confirm your payment automatically yet. Please wait a moment or use the button below."}
          </p>

          {isSuccess ? (
            <>
              <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-left">
                <p className="text-center text-base font-semibold text-emerald-800">
                  Redirecting to WhatsApp community in {seconds} second{seconds === 1 ? "" : "s"}.
                </p>

                <div className="mt-4 rounded-2xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Active WhatsApp Community Link
                  </p>
                  <p className="mt-2 break-all text-sm leading-6 text-slate-800">
                    {finalUrl}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={goToWhatsApp}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-[#3267E3] px-5 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(50,103,227,0.28)] transition hover:bg-[#2457D6]"
                >
                  Join WhatsApp Community Now
                </button>
              </div>
            </>
          ) : (
            <div className="mt-6 space-y-3">
              <a
                href="/payment-success"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#3267E3] px-5 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(50,103,227,0.28)] transition hover:bg-[#2457D6]"
              >
                Open Payment Status Page
              </a>
            </div>
          )}

          <p className="mt-6 text-sm leading-6 text-slate-500">
            Keep your WhatsApp active. Masterclass details and post-masterclass resources will be shared there.
          </p>
        </div>
      </section>
    </main>
  );
}
