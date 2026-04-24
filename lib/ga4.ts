import { BetaAnalyticsDataClient } from "@google-analytics/data";

function getPrivateKey() {
  const key = process.env.GA4_PRIVATE_KEY || "";
  return key.replace(/\\n/g, "\n");
}

export function getAnalyticsClient() {
  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GA4_CLIENT_EMAIL,
      private_key: getPrivateKey(),
    },
  });
}

export function getPropertyName() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) throw new Error("Missing GA4_PROPERTY_ID");
  return `properties/${propertyId}`;
}

export function secondsToReadable(sec: number) {
  if (!Number.isFinite(sec) || sec <= 0) return "0s";
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}
