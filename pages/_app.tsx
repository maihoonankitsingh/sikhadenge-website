// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/chatgpt-tools-section.css";
import Header from "../components/Header";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { ConsentPreferences } from "@/components/consent/ConsentPreferences";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentSettingsButton } from "@/components/consent/ConsentSettingsButton";
import { MetaConsentRuntime } from "@/components/consent/MetaConsentBridge";

type HeaderAwarePage = AppProps["Component"] & {
  hideGlobalHeader?: boolean;
};

export default function App({
  Component,
  pageProps,
  router,
}: AppProps) {
  const Page = Component as HeaderAwarePage;
  const pageKey = router.isReady
    ? router.asPath.split("#", 1)[0] || "/"
    : null;

  return (
    <ConsentProvider>
      <MetaConsentRuntime pageKey={pageKey} />
      <ConsentBanner />
      <ConsentPreferences />
      <ConsentSettingsButton />
      {!Page.hideGlobalHeader ? <Header /> : null}
      <Component {...pageProps} />
    </ConsentProvider>
  );
}
