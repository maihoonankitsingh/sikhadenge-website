import type { NextPageContext } from "next";

export default function ErrorPage({ statusCode }: { statusCode?: number }) {
  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1>Something went wrong</h1>
      <p>Status: {statusCode ?? 500}</p>
    </main>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? (err as any)?.statusCode ?? 404;
  return { statusCode };
};
