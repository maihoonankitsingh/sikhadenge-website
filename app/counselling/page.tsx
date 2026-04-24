import type { Metadata } from "next";
import Client from "./CounsellingClient";

export const metadata: Metadata = {
  title: 'Course Counselling — Sikhadenge',
  description: 'Talk to Sikhadenge for course counselling, eligibility, device requirement, and next steps for admissions.',
  alternates: { canonical: 'https://sikhadenge.in/counselling' },
};

export default function Page() {
  return <Client />;
}
