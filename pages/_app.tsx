// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/ai-video-warm-reference.css";
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
            /* AI_VIDEO_INFORMATIONAL_PILL_STANDARD_V1
               Scope: non-interactive informational / section label pills only.
               CTA Free badges, tool tabs, timers, trust cards and buttons are excluded. */
            main > section#top [class*="kicker"],
            main [class*="sectionHead"] > span:first-child,
            main .aiv13-badge,
            main .ai-v80-eyebrow,
            main .ai-v85-eyebrow,
            main .ai-v85-kicker,
            main .ai-v85-badge,
            main .ai-v54-eyebrow,
            main .ai-v54-kicker,
            main .ai-v54-badge,
            main .ai-v87-eyebrow,
            main .ai-v87-kicker,
            main .ai-v87-badge,
            main section[class*="finalSection"] [class*="finalKicker"],
            main [class*="checkout"] [class*="eyebrow"],
            main [class*="checkout"] [class*="kicker"] {
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
              gap: 8px !important;
              min-height: 36px !important;
              width: fit-content !important;
              max-width: 100% !important;
              margin-left: auto !important;
              margin-right: auto !important;
              padding: 0 14px 0 10px !important;
              border: 1px solid #d9deff !important;
              border-radius: 999px !important;
              background: linear-gradient(180deg,#ffffff 0%,#fbfbff 100%) !important;
              color: #315cf6 !important;
              box-shadow: 0 4px 14px rgba(79,70,229,.08), inset 0 1px 0 rgba(255,255,255,.95) !important;
              font-size: 11px !important;
              font-weight: 800 !important;
              line-height: 1 !important;
              letter-spacing: .035em !important;
              text-transform: none !important;
              white-space: nowrap !important;
            }

            main > section#top [class*="kicker"]::before,
            main [class*="sectionHead"] > span:first-child::before,
            main .aiv13-badge::before,
            main .ai-v80-eyebrow::before,
            main .ai-v85-eyebrow::before,
            main .ai-v85-kicker::before,
            main .ai-v85-badge::before,
            main .ai-v54-eyebrow::before,
            main .ai-v54-kicker::before,
            main .ai-v54-badge::before,
            main .ai-v87-eyebrow::before,
            main .ai-v87-kicker::before,
            main .ai-v87-badge::before,
            main section[class*="finalSection"] [class*="finalKicker"]::before,
            main [class*="checkout"] [class*="eyebrow"]::before,
            main [class*="checkout"] [class*="kicker"]::before {
              content: "" !important;
              display: block !important;
              width: 18px !important;
              height: 18px !important;
              flex: 0 0 18px !important;
              border: 1px solid #dfe4ff !important;
              border-radius: 999px !important;
              background: radial-gradient(circle at center,#3b68ff 0 4px,#eaf0ff 4.5px 100%) !important;
              box-shadow: none !important;
            }

            main > section#top [class*="kicker"] > svg,
            main [class*="sectionHead"] > span:first-child > svg,
            main .aiv13-badge > svg,
            main .ai-v80-eyebrow > svg,
            main .ai-v85-eyebrow > svg,
            main .ai-v85-kicker > svg,
            main .ai-v85-badge > svg,
            main .ai-v54-eyebrow > svg,
            main .ai-v54-kicker > svg,
            main .ai-v54-badge > svg,
            main .ai-v87-eyebrow > svg,
            main .ai-v87-kicker > svg,
            main .ai-v87-badge > svg,
            main section[class*="finalSection"] [class*="finalKicker"] > svg,
            main [class*="checkout"] [class*="eyebrow"] > svg,
            main [class*="checkout"] [class*="kicker"] > svg {
              display: none !important;
            }

            @media (max-width: 680px) {
              main > section#top [class*="kicker"],
              main [class*="sectionHead"] > span:first-child,
              main .aiv13-badge,
              main .ai-v80-eyebrow,
              main .ai-v85-eyebrow,
              main .ai-v85-kicker,
              main .ai-v85-badge,
              main .ai-v54-eyebrow,
              main .ai-v54-kicker,
              main .ai-v54-badge,
              main .ai-v87-eyebrow,
              main .ai-v87-kicker,
              main .ai-v87-badge,
              main section[class*="finalSection"] [class*="finalKicker"],
              main [class*="checkout"] [class*="eyebrow"],
              main [class*="checkout"] [class*="kicker"] {
                min-height: 34px !important;
                padding: 0 12px 0 9px !important;
                gap: 7px !important;
                font-size: 10.5px !important;
              }

              main > section#top [class*="kicker"]::before,
              main [class*="sectionHead"] > span:first-child::before,
              main .aiv13-badge::before,
              main .ai-v80-eyebrow::before,
              main .ai-v85-eyebrow::before,
              main .ai-v85-kicker::before,
              main .ai-v85-badge::before,
              main .ai-v54-eyebrow::before,
              main .ai-v54-kicker::before,
              main .ai-v54-badge::before,
              main .ai-v87-eyebrow::before,
              main .ai-v87-kicker::before,
              main .ai-v87-badge::before,
              main section[class*="finalSection"] [class*="finalKicker"]::before,
              main [class*="checkout"] [class*="eyebrow"]::before,
              main [class*="checkout"] [class*="kicker"]::before {
                width: 16px !important;
                height: 16px !important;
                flex-basis: 16px !important;
                background: radial-gradient(circle at center,#3b68ff 0 3.5px,#eaf0ff 4px 100%) !important;
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
