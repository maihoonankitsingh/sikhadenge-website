"use client";

import { useEffect } from "react";
import { useConsent } from "./ConsentProvider";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const META_SCRIPT_ID = "meta-pixel-remote";
const META_PLACEHOLDER_ID = "PASTE_REAL_PIXEL_ID_NUMBER";

type MetaPixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  push?: MetaPixelFunction;
  loaded?: boolean;
  version?: string;
};

type MetaWindow = typeof window & {
  fbq?: MetaPixelFunction;
  _fbq?: MetaPixelFunction;
  __sdMetaPixelInitialized?: boolean;
};

function getOrCreateMetaPixel(): MetaPixelFunction {
  const metaWindow = window as MetaWindow;

  if (typeof metaWindow.fbq === "function") {
    return metaWindow.fbq;
  }

  const fbq = ((...args: unknown[]) => {
    if (typeof fbq.callMethod === "function") {
      fbq.callMethod(...args);
      return;
    }

    fbq.queue = fbq.queue || [];
    fbq.queue.push(args);
  }) as MetaPixelFunction;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  metaWindow.fbq = fbq;
  metaWindow._fbq = fbq;

  return fbq;
}

export function MetaConsentBridge() {
  const { state, ready } = useConsent();

  useEffect(() => {
    if (!ready) return;

    const metaWindow = window as MetaWindow;

    if (state.advertising !== "granted") {
      if (typeof metaWindow.fbq === "function") {
        metaWindow.fbq("consent", "revoke");
      }
      return;
    }

    if (!META_PIXEL_ID || META_PIXEL_ID === META_PLACEHOLDER_ID) return;

    const fbq = getOrCreateMetaPixel();
    fbq("consent", "grant");

    if (!metaWindow.__sdMetaPixelInitialized) {
      fbq("init", META_PIXEL_ID);
      metaWindow.__sdMetaPixelInitialized = true;
    }

    fbq("track", "PageView");

    if (document.getElementById(META_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = META_SCRIPT_ID;
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";

    document.head.appendChild(script);
  }, [state.advertising, ready]);

  return null;
}
