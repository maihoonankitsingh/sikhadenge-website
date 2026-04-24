import { Suspense } from "react";
import VerifyPageClient from "./VerifyPageClient";

function VerifyPageFallback() {
  return <div className="min-h-[40vh]" />;
}

export default function Page() {
  return (
    <Suspense fallback={<VerifyPageFallback />}>
      <VerifyPageClient />
    </Suspense>
  );
}
