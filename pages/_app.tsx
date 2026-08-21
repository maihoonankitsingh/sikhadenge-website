// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Header from "../components/Header";

type HeaderAwarePage = AppProps["Component"] & {
  hideGlobalHeader?: boolean;
};

export default function App({ Component, pageProps }: AppProps) {
  const Page = Component as HeaderAwarePage;

  return (
    <>
      {!Page.hideGlobalHeader ? <Header /> : null}
      <Component {...pageProps} />
    </>
  );
}
