// pages/_app.tsx
import type { AppProps } from "next/app";
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

export default function App({ Component, pageProps, router }: AppProps) {
  const Page = Component as HeaderAwarePage;
  const pageKey = router.isReady ? router.asPath.split("#", 1)[0] || "/" : null;
  const isAiVideoMasterclass =
    router.pathname === "/masterclass/ai-video" || pageKey === "/masterclass/ai-video";

  return (
    <ConsentProvider>
      <MetaConsentRuntime pageKey={pageKey} />
      <ConsentBanner />
      <ConsentPreferences />
      <ConsentSettingsButton />

      {isAiVideoMasterclass ? (
        <>
          <style>{`body footer{display:none!important}`}</style>
          <style jsx global>{`
            /* AI_VIDEO_HEADING_GRADIENT_PILL_V1
               Scope: AI Video route only. Converts highlighted heading phrases
               to the approved purple -> coral -> orange rounded pill treatment. */
            main h1 > em,
            main h2 > em,
            main h1 > span,
            main h2 > span {
              display: inline-block !important;
              padding: 0.025em 0.16em 0.085em !important;
              border-radius: 0.18em !important;
              background: linear-gradient(
                90deg,
                #7B54E7 0%,
                #9553D1 22%,
                #AE54AA 42%,
                #CB586F 63%,
                #E35A3F 82%,
                #F15A24 100%
              ) !important;
              -webkit-background-clip: border-box !important;
              background-clip: border-box !important;
              -webkit-text-fill-color: #fff !important;
              color: #fff !important;
              font-style: normal !important;
              box-shadow: none !important;
              box-decoration-break: clone;
              -webkit-box-decoration-break: clone;
            }

            @media (max-width: 680px) {
              main h1 > em,
              main h2 > em,
              main h1 > span,
              main h2 > span {
                padding: 0.02em 0.14em 0.075em !important;
                border-radius: 0.19em !important;
              }
            }
          `}</style>
        </>
      ) : null}

      {!Page.hideGlobalHeader ? <Header /> : null}
      <Component {...pageProps} />
    </ConsentProvider>
  );
}
