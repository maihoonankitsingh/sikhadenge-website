// pages/_app.tsx
import type { AppProps } from "next/app";
import { useEffect } from "react";
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

const AI_VIDEO_HIGHLIGHT_PHRASES = new Set([
  "text & images.",
  "real creative output.",
  "what if you learn to replace the hard work instead?",
  "hundreds of millions of jobs.",
  "it's increasing the value of ai skills.",
  "zero filler.",
  "modern ai visuals.",
  "better video output.",
  "real experiences.",
  "reserve your seat.",
  "start directing the output.",
  "checkout experience",
]);

function normalizeHighlightText(value: string | null | undefined) {
  return String(value || "")
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function AiVideoHeadingPillRuntime() {
  useEffect(() => {
    let frame = 0;

    const depth = (element: Element) => {
      let current: Element | null = element;
      let value = 0;
      while (current) {
        value += 1;
        current = current.parentElement;
      }
      return value;
    };

    const apply = () => {
      document.querySelectorAll("main h1, main h2").forEach((heading) => {
        const candidates = Array.from(
          heading.querySelectorAll("em, span, strong, b, i")
        ).filter((element) =>
          AI_VIDEO_HIGHLIGHT_PHRASES.has(
            normalizeHighlightText(element.textContent)
          )
        );

        candidates.sort((a, b) => depth(b) - depth(a));
        const target = candidates[0] as HTMLElement | undefined;
        if (!target) return;

        target.setAttribute("data-ai-video-heading-pill", "1");
        target.style.setProperty("display", "inline", "important");
        target.style.setProperty(
          "padding",
          "0.02em 0.14em 0.07em",
          "important"
        );
        target.style.setProperty("border-radius", "0.18em", "important");
        target.style.setProperty(
          "background",
          "linear-gradient(90deg,#7B54E7 0%,#9553D1 22%,#AE54AA 42%,#CB586F 63%,#E35A3F 82%,#F15A24 100%)",
          "important"
        );
        target.style.setProperty(
          "-webkit-background-clip",
          "border-box",
          "important"
        );
        target.style.setProperty("background-clip", "border-box", "important");
        target.style.setProperty(
          "-webkit-text-fill-color",
          "#fff",
          "important"
        );
        target.style.setProperty("color", "#fff", "important");
        target.style.setProperty("font-style", "normal", "important");
        target.style.setProperty("box-shadow", "none", "important");
        target.style.setProperty("text-shadow", "none", "important");
        target.style.setProperty("box-decoration-break", "clone", "important");
        target.style.setProperty(
          "-webkit-box-decoration-break",
          "clone",
          "important"
        );
      });
    };

    const scheduleApply = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    apply();
    const timers = [100, 350, 900, 1800, 3500].map((delay) =>
      window.setTimeout(apply, delay)
    );

    const observer = new MutationObserver(scheduleApply);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      observer.disconnect();
    };
  }, []);

  return null;
}

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
            /* AI_VIDEO_HEADING_GRADIENT_PILL_V2
               Static source <em> highlights render immediately. Runtime-injected
               heading highlights are targeted only after exact text matching. */
            main h1 > em,
            main h2 > em,
            [data-ai-video-heading-pill="1"] {
              display: inline !important;
              padding: 0.02em 0.14em 0.07em !important;
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
              text-shadow: none !important;
              box-decoration-break: clone;
              -webkit-box-decoration-break: clone;
            }

            @media (max-width: 680px) {
              main h1 > em,
              main h2 > em,
              [data-ai-video-heading-pill="1"] {
                padding: 0.015em 0.12em 0.065em !important;
                border-radius: 0.18em !important;
              }
            }
          `}</style>
          <AiVideoHeadingPillRuntime />
        </>
      ) : null}

      {!Page.hideGlobalHeader ? <Header /> : null}
      <Component {...pageProps} />
    </ConsentProvider>
  );
}
