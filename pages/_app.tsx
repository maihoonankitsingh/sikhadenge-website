// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/funnel.css";
import "../styles/funnel-confirmation.css";
import "../styles/funnel-checkout.css";
import "../styles/workshop-funnel.css";
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
