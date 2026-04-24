import type { Metadata } from "next";
import Client from "./CompaniesClient";

export const metadata: Metadata = {
  title: 'Companies & Outcomes — Sikhadenge',
  description: 'Explore outcomes, hiring-aligned training and creator-ready skills taught at Sikhadenge.',
  alternates: { canonical: 'https://sikhadenge.in/companies' },
};

export default function Page() {
  return <Client />;
}
