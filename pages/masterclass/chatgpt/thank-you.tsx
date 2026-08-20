import type { GetServerSideProps } from "next";
import ConfirmationPage from "../../../components/funnel/ConfirmationPage";
import { getFunnelConfig } from "../../../data/funnels";
import { prisma } from "../../../lib/prisma";

type Props = {
  offerMode: "free" | "paid";
  confirmationVerified: boolean;
  leadId: string;
};

function ChatGPTMasterclassThankYouPage({ offerMode, confirmationVerified, leadId }: Props) {
  return (
    <ConfirmationPage
      config={getFunnelConfig("chatgpt", offerMode)}
      confirmationVerified={confirmationVerified}
      leadId={leadId || undefined}
    />
  );
}

(ChatGPTMasterclassThankYouPage as typeof ChatGPTMasterclassThankYouPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const offerMode = query.mode === "paid" ? "paid" : "free";
  const leadId = typeof query.lead_id === "string" ? query.lead_id.slice(0, 120) : "";

  if (!leadId) {
    return { props: { offerMode, confirmationVerified: false, leadId: "" } };
  }

  if (offerMode === "paid") {
    const payment = await prisma.funnelPayment.findFirst({
      where: {
        leadId,
        funnel: "chatgpt",
        offerMode: "paid",
        purpose: "masterclass_entry",
        status: "captured",
      },
      select: { id: true },
    });
    return {
      props: {
        offerMode,
        confirmationVerified: Boolean(payment),
        leadId,
      },
    };
  }

  const lead = await prisma.lead.findFirst({
    where: {
      id: leadId,
      source: "funnel:chatgpt:free",
    },
    select: { id: true },
  });

  return {
    props: {
      offerMode,
      confirmationVerified: Boolean(lead),
      leadId,
    },
  };
};

export default ChatGPTMasterclassThankYouPage;
