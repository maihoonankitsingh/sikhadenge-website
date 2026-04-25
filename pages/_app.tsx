// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Header from "../components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div style={{ paddingTop: 32 }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

