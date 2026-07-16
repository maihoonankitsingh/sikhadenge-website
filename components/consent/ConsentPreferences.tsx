"use client";

import { useEffect, useState } from "react";
import { useConsent } from "./ConsentProvider";

export function ConsentPreferences() {
  const {
    state,
    preferencesOpen,
    closePreferences,
    savePreferences,
  } = useConsent();

  const [analytics, setAnalytics] = useState(state.analytics === "granted");
  const [advertising, setAdvertising] = useState(state.advertising === "granted");

  useEffect(() => {
    if (!preferencesOpen) return;
    setAnalytics(state.analytics === "granted");
    setAdvertising(state.advertising === "granted");
  }, [preferencesOpen, state.analytics, state.advertising]);

  if (!preferencesOpen) return null;

  function handleSave() {
    savePreferences({
      analytics: analytics ? "granted" : "denied",
      advertising: advertising ? "granted" : "denied",
    });
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-black/50 p-4 sm:items-center"
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-preferences-title"
        className="w-full max-w-xl rounded-2xl bg-white p-6 text-neutral-900 shadow-2xl"
      >
        <h2
          id="consent-preferences-title"
          className="text-xl font-semibold"
        >
          Privacy preferences
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Choose which optional technologies SikhaDenge may use. Essential
          storage remains enabled because it is required for core website
          functions and security.
        </p>

        <div className="mt-5 space-y-3">
          <label className="flex items-start justify-between gap-4 rounded-xl border border-neutral-200 p-4">
            <span>
              <span className="block font-semibold">Essential</span>
              <span className="mt-1 block text-sm text-neutral-600">
                Required for website operation, security and saved privacy choices.
              </span>
            </span>
            <input
              type="checkbox"
              checked
              disabled
              aria-label="Essential storage always enabled"
              className="mt-1 h-5 w-5"
            />
          </label>

          <label className="flex items-start justify-between gap-4 rounded-xl border border-neutral-200 p-4">
            <span>
              <span className="block font-semibold">Analytics</span>
              <span className="mt-1 block text-sm text-neutral-600">
                Helps us understand website usage and improve performance.
              </span>
            </span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
              aria-label="Allow analytics technologies"
              className="mt-1 h-5 w-5"
            />
          </label>

          <label className="flex items-start justify-between gap-4 rounded-xl border border-neutral-200 p-4">
            <span>
              <span className="block font-semibold">Advertising</span>
              <span className="mt-1 block text-sm text-neutral-600">
                Allows advertising measurement and relevant campaign tracking.
              </span>
            </span>
            <input
              type="checkbox"
              checked={advertising}
              onChange={(event) => setAdvertising(event.target.checked)}
              aria-label="Allow advertising technologies"
              className="mt-1 h-5 w-5"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={closePreferences}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Save preferences
          </button>
        </div>
      </section>
    </div>
  );
}
