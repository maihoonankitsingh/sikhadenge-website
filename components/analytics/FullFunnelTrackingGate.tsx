"use client";

import { usePathname } from "next/navigation";

import { FullFunnelTrackingBridge } from "@/components/analytics/FullFunnelTrackingBridge";

const AI_VIDEO_PATH = "/masterclass/ai-video";
const REGISTER_PATH = "/gen-ai-masterclass/register-one-step";
const CHECKOUT_PREFIX = "/checkout/";

export function FullFunnelTrackingGate() {
  const pathname = usePathname() || "/";

  const enabled =
    pathname === AI_VIDEO_PATH ||
    pathname === REGISTER_PATH ||
    pathname.startsWith(CHECKOUT_PREFIX);

  return enabled ? <FullFunnelTrackingBridge /> : null;
}
