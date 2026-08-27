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

export default function App({
  Component,
  pageProps,
  router,
}: AppProps) {
  const Page = Component as HeaderAwarePage;
  const pageKey = router.isReady
    ? router.asPath.split("#", 1)[0] || "/"
    : null;
  const isAiVideoMasterclass =
    router.pathname === "/masterclass/ai-video" ||
    pageKey === "/masterclass/ai-video";

  return (
    <ConsentProvider>
      <MetaConsentRuntime pageKey={pageKey} />
      <ConsentBanner />
      <ConsentPreferences />
      <ConsentSettingsButton />
      {isAiVideoMasterclass ? (
        <style>{`
          body footer { display: none !important; }
          body main > nav { display: none !important; }
          body main > div:first-child { display: none !important; }
          body main > div:last-child { display: none !important; }

          /* AI Video hero — centered light conversion layout */
          body #top {
            position: relative !important;
            overflow: hidden !important;
            min-height: auto !important;
            padding: 54px 0 58px !important;
            background:
              radial-gradient(circle at 88% 18%, rgba(96,165,250,.16), transparent 25%),
              radial-gradient(circle at 78% 76%, rgba(124,58,237,.10), transparent 27%),
              linear-gradient(180deg, #ffffff 0%, #fbfcff 72%, #f7f9ff 100%) !important;
            color: #0f172a !important;
          }

          body #top::before {
            content: "" !important;
            position: absolute !important;
            width: 420px !important;
            height: 420px !important;
            right: -118px !important;
            top: 82px !important;
            border-radius: 50% !important;
            background: repeating-conic-gradient(
              from 0deg,
              rgba(37,99,235,.10) 0deg 4deg,
              transparent 4deg 18deg
            ) !important;
            -webkit-mask: radial-gradient(circle, transparent 0 24%, #000 25% 54%, transparent 55%) !important;
            mask: radial-gradient(circle, transparent 0 24%, #000 25% 54%, transparent 55%) !important;
            opacity: .8 !important;
            pointer-events: none !important;
          }

          body #top::after {
            content: "" !important;
            position: absolute !important;
            width: 520px !important;
            height: 520px !important;
            left: -320px !important;
            bottom: -340px !important;
            border-radius: 50% !important;
            background: radial-gradient(circle, rgba(59,130,246,.10), transparent 68%) !important;
            pointer-events: none !important;
          }

          body #top > div:first-child {
            position: relative !important;
            z-index: 2 !important;
            display: block !important;
            width: min(1180px, calc(100% - 40px)) !important;
            margin: 0 auto !important;
            text-align: center !important;
          }

          body #top > div:first-child > div:first-child {
            position: relative !important;
            width: 100% !important;
            max-width: 1120px !important;
            margin: 0 auto !important;
            padding-top: 86px !important;
            text-align: center !important;
          }

          body #top > div:first-child > div:first-child::before {
            content: "" !important;
            position: absolute !important;
            top: 0 !important;
            left: 50% !important;
            width: 250px !important;
            height: 66px !important;
            transform: translateX(-50%) !important;
            background: url('/brand/sikhadenge-header-safe-320.png?v=headersafe2-20260728') center / contain no-repeat !important;
          }

          /* Hide the old right-side AI Studio card */
          body #top > div:first-child > div:nth-child(2) {
            display: none !important;
          }

          /* Small top badge */
          body #top > div:first-child > div:first-child > span:first-child {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            margin: 0 auto 26px !important;
            padding: 10px 17px !important;
            border: 1px solid #dbeafe !important;
            border-radius: 999px !important;
            background: linear-gradient(180deg,#eff6ff,#f8fbff) !important;
            color: #2563eb !important;
            box-shadow: 0 10px 30px rgba(37,99,235,.08) !important;
            font-size: 11px !important;
            font-weight: 800 !important;
            letter-spacing: .08em !important;
            text-transform: uppercase !important;
          }

          body #top h1 {
            max-width: 1080px !important;
            margin: 0 auto 24px !important;
            color: #111827 !important;
            font-family: Manrope, ui-sans-serif, system-ui, sans-serif !important;
            font-size: clamp(46px, 5.1vw, 74px) !important;
            line-height: 1.06 !important;
            letter-spacing: -.052em !important;
            font-weight: 700 !important;
            text-wrap: balance !important;
          }

          body #top h1 em {
            display: inline-block !important;
            padding: .06em .18em .11em !important;
            border-radius: .19em !important;
            background: linear-gradient(135deg,#2563eb,#5b5cf0 58%,#7c3aed) !important;
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            -webkit-background-clip: border-box !important;
            background-clip: border-box !important;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 12px 28px rgba(37,99,235,.18) !important;
          }

          body #top h1 + p {
            max-width: 860px !important;
            margin: 0 auto !important;
            color: #64748b !important;
            font-size: 18px !important;
            line-height: 1.72 !important;
            font-weight: 500 !important;
          }

          /* Compact prompt chips are not needed in this reference layout */
          body #top h1 + p + div {
            display: none !important;
          }

          /* Three information cards like the reference hero */
          body #top h1 + p + div + div {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 18px !important;
            width: min(900px, 100%) !important;
            margin: 34px auto 28px !important;
          }

          body #top h1 + p + div + div > div {
            min-height: 92px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 14px !important;
            padding: 18px 20px !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 18px !important;
            background: rgba(255,255,255,.94) !important;
            box-shadow: 0 14px 36px rgba(15,23,42,.06) !important;
            text-align: left !important;
          }

          body #top h1 + p + div + div > div:nth-child(4) {
            display: none !important;
          }

          body #top h1 + p + div + div svg {
            width: 42px !important;
            height: 42px !important;
            padding: 10px !important;
            flex: 0 0 auto !important;
            border: 1px solid #dbeafe !important;
            border-radius: 12px !important;
            background: #eff6ff !important;
            color: #2563eb !important;
          }

          body #top h1 + p + div + div small {
            display: block !important;
            margin-bottom: 4px !important;
            color: #2563eb !important;
            font-size: 9px !important;
            font-weight: 800 !important;
            letter-spacing: .12em !important;
          }

          body #top h1 + p + div + div strong {
            display: block !important;
            color: #111827 !important;
            font-size: 15px !important;
            font-weight: 700 !important;
          }

          body #top h1 + p + div + div + div {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 14px !important;
            margin-top: 0 !important;
          }

          body #top h1 + p + div + div + div > a:first-child {
            min-height: 58px !important;
            padding: 0 28px !important;
            border-radius: 16px !important;
            background: linear-gradient(135deg,#2563eb,#4f46e5) !important;
            color: #fff !important;
            box-shadow: 0 18px 42px rgba(37,99,235,.23) !important;
            font-size: 15px !important;
            font-weight: 800 !important;
          }

          body #top h1 + p + div + div + div > a:nth-child(2) {
            min-height: 58px !important;
            padding: 0 25px !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 16px !important;
            background: #ffffff !important;
            color: #111827 !important;
            box-shadow: 0 10px 28px rgba(15,23,42,.05) !important;
            font-size: 15px !important;
            font-weight: 700 !important;
          }

          body #top h1 + p + div + div + div + p {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            margin: 20px auto 0 !important;
            color: #64748b !important;
            font-size: 12px !important;
            font-weight: 600 !important;
          }

          body #top h1 + p + div + div + div + p svg {
            color: #2563eb !important;
          }

          /* Remove old four-stat strip under hero */
          body #top > div:last-child {
            display: none !important;
          }

          @media (max-width: 820px) {
            body #top {
              padding: 38px 0 44px !important;
            }

            body #top::before {
              width: 260px !important;
              height: 260px !important;
              right: -126px !important;
              top: 84px !important;
              opacity: .5 !important;
            }

            body #top > div:first-child > div:first-child {
              padding-top: 72px !important;
            }

            body #top > div:first-child > div:first-child::before {
              width: 210px !important;
              height: 56px !important;
            }

            body #top h1 {
              font-size: clamp(38px, 10vw, 56px) !important;
              line-height: 1.08 !important;
            }

            body #top h1 + p {
              font-size: 16px !important;
              line-height: 1.65 !important;
            }

            body #top h1 + p + div + div {
              grid-template-columns: 1fr !important;
              max-width: 560px !important;
              gap: 10px !important;
              margin-top: 28px !important;
            }

            body #top h1 + p + div + div > div {
              min-height: 78px !important;
            }
          }

          @media (max-width: 560px) {
            body #top {
              padding: 30px 0 38px !important;
            }

            body #top > div:first-child {
              width: min(100% - 28px, 1180px) !important;
            }

            body #top > div:first-child > div:first-child > span:first-child {
              margin-bottom: 22px !important;
              padding: 9px 13px !important;
              font-size: 9px !important;
            }

            body #top h1 {
              font-size: clamp(34px, 11.7vw, 48px) !important;
              letter-spacing: -.045em !important;
            }

            body #top h1 em {
              padding: .05em .13em .09em !important;
            }

            body #top h1 + p + div + div + div {
              flex-direction: column !important;
              width: 100% !important;
            }

            body #top h1 + p + div + div + div > a {
              width: 100% !important;
            }
          }
        `}</style>
      ) : null}
      {!Page.hideGlobalHeader ? <Header /> : null}
      <Component {...pageProps} />
    </ConsentProvider>
  );
}
