"use client";

import { useConsent } from "./ConsentProvider";

export function ConsentSettingsButton() {
  const {
    ready,
    hasDecision,
    preferencesOpen,
    openPreferences,
  } = useConsent();

  if (!ready || !hasDecision || preferencesOpen) return null;

  return (
    <button
      type="button"
      onClick={openPreferences}
      aria-label="Open privacy preferences"
      className="fixed bottom-4 left-4 z-[90] rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 shadow-lg"
    >
      Privacy settings
    </button>
  );
}
