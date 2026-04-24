"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  status: string;
  whatsappUrl: string;
};

export default function WelcomeClient({ status, whatsappUrl }: Props) {
  const [seconds, setSeconds] = useState(5);
  const redirectDone = useRef(false);

  const isSuccess = useMemo(() => !status || status === "success", [status]);

  useEffect(() => {
    if (!isSuccess || !whatsappUrl) return;

    const doRedirect = () => {
      if (redirectDone.current) return;
      redirectDone.current = true;
      window.location.replace(whatsappUrl);
    };

    const tick = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(tick);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timer = setTimeout(doRedirect, 5000);
    const fallback = setTimeout(doRedirect, 6500);

    return () => {
      clearInterval(tick);
      clearTimeout(timer);
      clearTimeout(fallback);
    };
  }, [isSuccess, whatsappUrl]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-10">
        <div className="w-full rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-[0_20px_60px_rgba(2,6,23,0.08)] sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
            {isSuccess ? "✓" : "!"}
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {isSuccess ? "Welcome to Sikhadenge" : "We Are Checking Your Payment"}
          </h1>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            {isSuccess
              ? "Your payment has been received successfully. Your registration is confirmed."
              : "Your payment status could not be confirmed yet. Please wait a moment or contact support if needed."}
          </p>

          {isSuccess ? (
            <>
              <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-base font-semibold text-emerald-800">
                  Redirecting you to the WhatsApp community in {seconds} second{seconds === 1 ? "" : "s"}.
                </p>
                <p className="mt-2 text-sm leading-6 text-emerald-700">
                  If redirect does not happen automatically, use the button below.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={whatsappUrl}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-[#3267E3] px-5 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(50,103,227,0.28)] transition hover:bg-[#2457D6]"
                >
                  Join WhatsApp Community Now
                </a>
              </div>
            </>
          ) : (
            <div className="mt-6">
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
