import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 2xl:px-12 ${className}`}>
      {children}
    </div>
  );
}
