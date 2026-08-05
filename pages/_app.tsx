import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
