import { prisma } from "@/lib/prisma";

export const DEFAULT_MASTERCLASS_DATE = "⏰24 March | Tuesday";
export const DEFAULT_MASTERCLASS_TIME = "🔴Live Class | 07:00 PM";
export const DEFAULT_COMMUNITY_LINK = "https://chat.whatsapp.com/BrWIgvcmOGZBdmfcoPCGHD";
export const DEFAULT_REDIRECT_LINK = "https://chat.whatsapp.com/BrWIgvcmOGZBdmfcoPCGHD";
export const DEFAULT_REDIRECT_DELAY_SECONDS = 5;
export const DEFAULT_CAMPAIGN_NAME = "masterclass_auto_1";
export const DEFAULT_CHECKOUT_REDIRECT_LINK = "https://chat.whatsapp.com/CvbSGsautwH0CGuOzW2c8q";
export const DEFAULT_CHECKOUT_REDIRECT_DELAY_SECONDS = 5;

export type MasterclassSettings = {
  masterclassDate: string;
  masterclassTime: string;
  communityLink: string;
  redirectLink: string;
  redirectDelaySeconds: number;
  campaignName: string;
  checkoutRedirectLink: string;
  checkoutRedirectDelaySeconds: number;
};

function toPositiveInt(value: string | undefined, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback;
}

export async function getMasterclassSettings(): Promise<MasterclassSettings> {
  const keys = [
    "masterclass_date",
    "masterclass_time",
    "masterclass_community_link",
    "masterclass_welcome_redirect_link",
    "masterclass_welcome_redirect_delay_seconds",
    "masterclass_aisensy_campaign_name",
    "checkout_welcome_redirect_link",
    "checkout_welcome_redirect_delay_seconds",
  ];

  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: keys } },
  });

  const map = new Map(rows.map((row) => [row.key, row.value]));

  return {
    masterclassDate:
      map.get("masterclass_date") || DEFAULT_MASTERCLASS_DATE,
    masterclassTime:
      map.get("masterclass_time") || DEFAULT_MASTERCLASS_TIME,
    communityLink:
      map.get("masterclass_community_link") || DEFAULT_COMMUNITY_LINK,
    redirectLink:
      map.get("masterclass_welcome_redirect_link") || DEFAULT_REDIRECT_LINK,
    redirectDelaySeconds: toPositiveInt(
      map.get("masterclass_welcome_redirect_delay_seconds"),
      DEFAULT_REDIRECT_DELAY_SECONDS
    ),
    campaignName:
      map.get("masterclass_aisensy_campaign_name") || DEFAULT_CAMPAIGN_NAME,
    checkoutRedirectLink:
      map.get("checkout_welcome_redirect_link") ||
      DEFAULT_CHECKOUT_REDIRECT_LINK,
    checkoutRedirectDelaySeconds: toPositiveInt(
      map.get("checkout_welcome_redirect_delay_seconds"),
      DEFAULT_CHECKOUT_REDIRECT_DELAY_SECONDS
    ),
  };
}
