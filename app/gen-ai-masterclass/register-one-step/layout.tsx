import type { ReactNode } from "react";

export default function RegisterOneStepLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050B1A] -mt-[42px] pt-16 md:-mt-[54px] md:pt-24">
      {children}
    </div>
  );
}
