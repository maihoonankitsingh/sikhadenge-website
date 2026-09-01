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

            /* AI_VIDEO_TABLET_CONSOLIDATION_V1
               Tablet-only responsive band. Desktop >1024px and mobile <=680px are untouched. */
            @media (min-width: 681px) and (max-width: 1024px) {
              main [class*="container"] {
                width: min(100% - 40px, 960px) !important;
              }

              main > section#top {
                padding-top: 34px !important;
                padding-bottom: 54px !important;
              }

              main > section#top [class*="brandFloat"] {
                display: none !important;
              }

              main > section#top h1,
              #ai-video-hero-v125 h1 {
                max-width: 820px !important;
                font-size: clamp(42px, 6.2vw, 54px) !important;
                line-height: 1.06 !important;
                letter-spacing: -.045em !important;
              }

              main > section#top [class*="heroSubhead"],
              #ai-video-hero-v125 [class*="subtitle"] {
                max-width: 720px !important;
                margin-left: auto !important;
                margin-right: auto !important;
                font-size: 16px !important;
                line-height: 1.62 !important;
              }

              main > section#top [class*="heroFacts"] {
                grid-template-columns: repeat(3,minmax(0,1fr)) !important;
                gap: 10px !important;
                width: min(780px,100%) !important;
                margin-top: 28px !important;
                margin-bottom: 24px !important;
              }

              main > section#top [class*="heroFacts"] > div {
                min-height: 78px !important;
                padding: 13px 14px !important;
                gap: 10px !important;
              }

              main > section#top [class*="heroActions"],
              #ai-video-hero-v125 .v125-actions,
              #ai-video-hero-v125 .v125-cta-row {
                width: min(700px,100%) !important;
                margin-left: auto !important;
                margin-right: auto !important;
                gap: 10px !important;
                flex-wrap: nowrap !important;
              }

              main > section#top [class*="heroActions"] > a,
              #ai-video-hero-v125 .v125-actions > a,
              #ai-video-hero-v125 .v125-cta-row > a {
                flex: 1 1 0 !important;
                min-width: 0 !important;
              }

              #ai-video-hero-v125 .v125-corner-left {
                transform: scale(.88) !important;
                transform-origin: top left !important;
              }

              #ai-video-hero-v125 .v125-corner-right {
                transform: scale(.88) !important;
                transform-origin: top right !important;
              }

              #outcomes,
              #learn,
              #tools,
              #faq,
              main section[class*="audienceSection"] {
                padding-top: 72px !important;
                padding-bottom: 72px !important;
              }

              #outcomes [class*="outcomeGrid"],
              #outcomes > div > div:nth-child(2) {
                grid-template-columns: repeat(2,minmax(0,1fr)) !important;
                gap: 16px !important;
                width: min(860px,100%) !important;
                max-width: 860px !important;
                margin-left: auto !important;
                margin-right: auto !important;
              }

              #outcomes [class*="outcomeGrid"] > article:nth-child(3),
              #outcomes > div > div:nth-child(2) > article:nth-child(3) {
                grid-column: 1 / -1 !important;
                width: calc(50% - 8px) !important;
                justify-self: center !important;
              }

              #outcomes [aria-label="AI video creation workflow"] {
                padding: 14px !important;
              }

              #outcomes [aria-label="AI video creation workflow"] > div {
                display: grid !important;
                grid-template-columns: repeat(6,minmax(0,1fr)) !important;
                gap: 10px !important;
              }

              #outcomes [aria-label="AI video creation workflow"] > div > span[aria-hidden="true"] {
                display: none !important;
              }

              #outcomes [aria-label="AI video creation workflow"] > div > div {
                grid-column: span 2 !important;
                min-width: 0 !important;
                min-height: 112px !important;
              }

              #outcomes [aria-label="AI video creation workflow"] > div > div:nth-of-type(4) {
                grid-column: 2 / span 2 !important;
              }

              #outcomes [aria-label="AI video creation workflow"] > div > div:nth-of-type(5) {
                grid-column: 4 / span 2 !important;
              }

              .aiv13-shell {
                width: min(100% - 40px,920px) !important;
                padding-top: 70px !important;
                padding-bottom: 72px !important;
              }

              .aiv13-grid {
                grid-template-columns: repeat(2,minmax(0,1fr)) !important;
                gap: 12px !important;
                width: min(760px,100%) !important;
              }

              .ai-v80-inner,
              .ai-v85-inner,
              .ai-v85-shell,
              .ai-v85-wrap {
                width: min(100% - 40px,920px) !important;
                padding-top: 70px !important;
                padding-bottom: 74px !important;
              }

              .ai-v80-grid,
              .ai-v85-grid,
              .ai-v85-cards {
                grid-template-columns: repeat(2,minmax(0,1fr)) !important;
                gap: 14px !important;
                width: min(820px,100%) !important;
                max-width: 820px !important;
                margin-left: auto !important;
                margin-right: auto !important;
              }

              .ai-v80-grid > :nth-child(3):last-child,
              .ai-v85-grid > :nth-child(3):last-child,
              .ai-v85-cards > :nth-child(3):last-child {
                grid-column: 1 / -1 !important;
                width: calc(50% - 7px) !important;
                justify-self: center !important;
              }

              #learn [class*="moduleGrid"] {
                grid-template-columns: repeat(2,minmax(0,1fr)) !important;
                gap: 12px !important;
              }

              #learn [class*="moduleGrid"] > article {
                min-height: 0 !important;
                padding: 20px !important;
              }

              #tools [class*="toolTabs"] {
                display: flex !important;
                flex-direction: row !important;
                justify-content: center !important;
                align-items: center !important;
                gap: 8px !important;
              }

              #tools [class*="toolGrid"] {
                grid-template-columns: repeat(2,minmax(0,1fr)) !important;
                gap: 10px !important;
              }

              #tools [class*="toolCard"] {
                min-height: 86px !important;
                padding: 14px !important;
              }

              main section[class*="audienceSection"] [class*="audienceGrid"] {
                grid-template-columns: repeat(2,minmax(0,1fr)) !important;
                gap: 12px !important;
              }

              main section[class*="audienceSection"] [class*="audienceGrid"] > article {
                min-height: 0 !important;
                padding: 20px !important;
              }

              .ai-v54-inner,
              .ai-v87-inner {
                width: min(100% - 40px,920px) !important;
                padding-top: 70px !important;
                padding-bottom: 74px !important;
              }

              .ai-v54-grid,
              .ai-v87-grid {
                grid-template-columns: repeat(2,minmax(0,1fr)) !important;
                gap: 14px !important;
                width: min(860px,100%) !important;
                margin-left: auto !important;
                margin-right: auto !important;
              }

              .ai-v54-grid > :last-child:nth-child(odd),
              .ai-v87-grid > :last-child:nth-child(odd) {
                grid-column: 1 / -1 !important;
                width: calc(50% - 7px) !important;
                justify-self: center !important;
              }

              #faq [class*="faqGrid"] {
                width: min(760px,100%) !important;
                max-width: 760px !important;
                margin-left: auto !important;
                margin-right: auto !important;
              }

              main section[class*="finalSection"] {
                padding-top: 58px !important;
                padding-bottom: 82px !important;
              }

              main section[class*="finalSection"] [class*="finalCard"] {
                width: min(100% - 40px,920px) !important;
                min-height: 0 !important;
                padding: 40px 38px !important;
                grid-template-columns: 1fr !important;
                gap: 28px !important;
                text-align: center !important;
              }

              main section[class*="finalSection"] h2,
              main section[class*="finalSection"] p {
                margin-left: auto !important;
                margin-right: auto !important;
              }

              main section[class*="finalSection"] [class*="finalAction"] {
                width: min(340px,100%) !important;
                margin-left: auto !important;
                margin-right: auto !important;
              }

              #ai-video-sticky-offer-v61 {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
              }

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
                max-width: calc(100% - 40px) !important;
                min-height: 36px !important;
                padding: 8px 14px 8px 10px !important;
                line-height: 1.2 !important;
                text-align: center !important;
                white-space: normal !important;
              }
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
