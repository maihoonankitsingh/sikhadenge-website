// pages/_app.tsx
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import Header from "../components/Header";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { ConsentPreferences } from "@/components/consent/ConsentPreferences";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentSettingsButton } from "@/components/consent/ConsentSettingsButton";
import { MetaConsentRuntime } from "@/components/consent/MetaConsentBridge";

type HeaderAwarePage = AppProps["Component"] & {
  hideGlobalHeader?: boolean;
};

const defaultDescription =
  "Live online, structured courses with portfolio output and support. Learn industry tools with practical projects.";

export default function App({ Component, pageProps, router }: AppProps) {
  const Page = Component as HeaderAwarePage;
  const pageKey = router.isReady ? router.asPath.split("#", 1)[0] || "/" : null;
  const isAiVideoMasterclass =
    router.pathname === "/masterclass/ai-video" || pageKey === "/masterclass/ai-video";

  return (
    <ConsentProvider>
      <Head>
        <meta key="og-type" property="og:type" content="website" />
        <meta key="og-site-name" property="og:site_name" content="SikhaDenge" />
        <meta key="og-url" property="og:url" content="https://sikhadenge.in" />
        <meta key="og-title" property="og:title" content="SikhaDenge" />
        <meta key="og-description" property="og:description" content={defaultDescription} />
        <meta
          key="og-image"
          property="og:image"
          content="https://sikhadenge.in/images/about/about-hero-desk.webp"
        />
        <meta key="twitter-card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter-title" name="twitter:title" content="SikhaDenge" />
        <meta key="twitter-description" name="twitter:description" content={defaultDescription} />
        <meta
          key="twitter-image"
          name="twitter:image"
          content="https://sikhadenge.in/images/about/about-hero-desk.webp"
        />
      </Head>

      <MetaConsentRuntime pageKey={pageKey} />
      <ConsentBanner />
      <ConsentPreferences />
      <ConsentSettingsButton />

      {isAiVideoMasterclass ? <style>{`body footer{display:none!important}`}</style> : null}

      {!Page.hideGlobalHeader ? <Header /> : null}
      <Component {...pageProps} />
    </ConsentProvider>
  );
}
