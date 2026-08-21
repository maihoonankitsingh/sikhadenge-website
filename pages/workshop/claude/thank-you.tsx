import type { GetServerSideProps } from "next";
import WorkshopConfirmationPage from "../../../components/funnel/workshop/WorkshopConfirmationPage";
import { getFunnelConfig } from "../../../data/funnels";
import { prisma } from "../../../lib/prisma";

type Props = {
  confirmationVerified: boolean;
};

function ClaudeWorkshopThankYouPage({ confirmationVerified }: Props) {
  return (
    <WorkshopConfirmationPage
      config={getFunnelConfig("claude", "paid")}
      confirmationVerified={confirmationVerified}
    />
  );
}

(ClaudeWorkshopThankYouPage as typeof ClaudeWorkshopThankYouPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const leadId = typeof query.lead_id === "string" ? query.lead_id.slice(0, 120) : "";
  if (!leadId) return { props: { confirmationVerified: false } };

  const payment = await prisma.funnelPayment.findFirst({
    where: {
      leadId,
      funnel: "claude",
      purpose: "implementation_workshop",
      status: "captured",
    },
    select: { id: true },
  });

  return { props: { confirmationVerified: Boolean(payment) } };
};

export default ClaudeWorkshopThankYouPage;
