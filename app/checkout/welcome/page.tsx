import WelcomeClient from "./WelcomeClient";
import { prisma } from "@/lib/prisma";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: "Checkout Welcome | Sikhadenge",
  description: "Checkout welcome page after payment confirmation.",
};

type PageProps = {
  searchParams?: {
    status?: string;
    storeOrderId?: string;
  };
};

export default async function CheckoutWelcomePage({ searchParams }: PageProps) {
  const status = String(searchParams?.status || "success").trim();

  const keys = [
    "checkout_welcome_redirect_link",
    "checkout_welcome_redirect_delay_seconds",
  ];

  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: keys } },
  });

  const map = new Map(rows.map((row) => [row.key, row.value]));

  const whatsappUrl =
    map.get("checkout_welcome_redirect_link") ||
    "https://chat.whatsapp.com/BrWIgvcmOGZBdmfcoPCGHD";

  const redirectDelaySeconds = Number(
    map.get("checkout_welcome_redirect_delay_seconds") || "5"
  );

  return (
    <WelcomeClient
      status={status}
      whatsappUrl={whatsappUrl}
      redirectDelaySeconds={redirectDelaySeconds}
    />
  );
}
