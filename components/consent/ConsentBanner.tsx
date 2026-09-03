"use client";

import Link from "next/link";
import { useConsent } from "./ConsentProvider";

export function ConsentBanner() {
  const {
    ready,
    hasDecision,
    acceptAll,
    rejectNonEssential,
    openPreferences,
  } = useConsent();

  if (!ready || hasDecision) return null;

  return (
    <section
      aria-label="Cookie and privacy preferences"
      role="dialog"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-white p-4 text-neutral-900 shadow-2xl sm:p-5"
    >
      <h2 className="text-base font-semibold sm:text-lg">Your privacy choices</h2>

      <p className="mt-2 text-xs leading-5 text-neutral-600 sm:text-sm sm:leading-6">
        <span className="sm:hidden">
          Essential storage keeps the site working. Analytics and ads need your permission. Read our{" "}
          <Link className="underline" href="/privacy-policy" prefetch={false}>
            privacy policy
          </Link>
          .
        </span>
        <span className="hidden sm:inline">
          We use essential storage to operate the website. With your permission,
          we also use analytics and advertising technologies to understand
          performance and improve relevant communication. Read our{" "}
          <Link className="underline" href="/privacy-policy" prefetch={false}>
            privacy policy
          </Link>
          .
        </span>
      </p>

      <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
        <button
          type="button"
          onClick={acceptAll}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Accept all
        </button>

        <button
          type="button"
          onClick={rejectNonEssential}
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold"
        >
          Reject non-essential
        </button>

        <button
          type="button"
          onClick={openPreferences}
          className="rounded-lg px-4 py-2 text-sm font-semibold underline"
        >
          Manage preferences
        </button>
      </div>
    </section>
  );
}
