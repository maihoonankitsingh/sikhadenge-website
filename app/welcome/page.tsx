import { redirect } from "next/navigation";

type PageProps = {
  searchParams?: {
    status?: string;
    storeOrderId?: string;
  };
};

export default function WelcomeForwarder({ searchParams }: PageProps) {
  const qs = new URLSearchParams();
  if (searchParams?.status) qs.set("status", String(searchParams.status));
  if (searchParams?.storeOrderId) qs.set("storeOrderId", String(searchParams.storeOrderId));
  const query = qs.toString();
  redirect(`/checkout/welcome${query ? `?${query}` : ""}`);
}
