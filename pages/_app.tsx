// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Header from "../components/Header";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { ConsentPreferences } from "@/components/consent/ConsentPreferences";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentSettingsButton } from "@/components/consent/ConsentSettingsButton";
import { MetaConsentRuntime } from "@/components/consent/MetaConsentBridge";

export default function App({
  Component,
  pageProps,
  router,
}: AppProps) {
  const pageKey = router.isReady
    ? router.asPath.split("#", 1)[0] || "/"
    : null;

  return (
    <ConsentProvider>
      <MetaConsentRuntime pageKey={pageKey} />
      <ConsentBanner />
      <ConsentPreferences />
      <ConsentSettingsButton />
      <Header />
      <Component {...pageProps} />
    </ConsentProvider>
  );
}
