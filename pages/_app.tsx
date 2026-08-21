// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/funnel.css";
import "../styles/funnel-confirmation.css";
import "../styles/funnel-checkout.css";
import "../styles/workshop-funnel.css";
import "../styles/funnel-core.css";
import "../styles/funnel-premium.css";
import "../styles/funnel-growthschool.css";
import "../styles/funnel-growthschool-addons.css";
import "../styles/funnel-phase15e.css";
import "../styles/funnel-transaction-premium.css";
import "../styles/funnel-crm.css";
import Header from "../components/Header";

type FunnelAwarePage = AppProps["Component"] & {
  hideGlobalHeader?: boolean;
};

export default function App({ Component, pageProps }: AppProps) {
  const Page = Component as FunnelAwarePage;

  return (
    <>
      {!Page.hideGlobalHeader ? <Header /> : null}
      <Component {...pageProps} />
    </>
  );
}
