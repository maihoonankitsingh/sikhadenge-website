import type { Metadata } from "next";
import Client from "./ContactUsClient";

export const metadata: Metadata = {
  title: 'Contact — Sikhadenge',
  description: 'Contact Sikhadenge for course counselling and admissions. Call or WhatsApp for details.',
  alternates: { canonical: 'https://sikhadenge.in/contact-us' },
};

export default function Page() {
  return <Client />;
}
