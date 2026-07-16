"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DEFAULT_CONSENT_STATE,
  hasConsentDecision,
  readStoredConsentState,
  saveConsentDecision,
  type ConsentState,
  type ConsentValue,
} from "@/lib/consent";

type ConsentContextValue = {
  state: ConsentState;
  ready: boolean;
  hasDecision: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (input: {
    analytics: ConsentValue;
    advertising: ConsentValue;
  }) => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConsentState>(DEFAULT_CONSENT_STATE);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const stored = readStoredConsentState();
    if (stored) setState(stored);
    setReady(true);
  }, []);

  const savePreferences = useCallback((input: {
    analytics: ConsentValue;
    advertising: ConsentValue;
  }) => {
    const next = saveConsentDecision(input);
    setState(next);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    savePreferences({
      analytics: "granted",
      advertising: "granted",
    });
  }, [savePreferences]);

  const rejectNonEssential = useCallback(() => {
    savePreferences({
      analytics: "denied",
      advertising: "denied",
    });
  }, [savePreferences]);

  const value = useMemo<ConsentContextValue>(() => ({
    state,
    ready,
    hasDecision: hasConsentDecision(state),
    preferencesOpen,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openPreferences: () => setPreferencesOpen(true),
    closePreferences: () => setPreferencesOpen(false),
  }), [
    state,
    ready,
    preferencesOpen,
    acceptAll,
    rejectNonEssential,
    savePreferences,
  ]);

  return (
    <ConsentContext.Provider value={value}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error("useConsent must be used inside ConsentProvider");
  }

  return context;
}
