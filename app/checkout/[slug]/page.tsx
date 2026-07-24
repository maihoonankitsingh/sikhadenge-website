import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CheckoutClient from "./CheckoutClient";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await prisma.storeProduct.findUnique({
    where: { slug: params.slug },
    select: {
      title: true,
      shortDescription: true,
      status: true,
    },
  });

  if (!product || product.status !== "ACTIVE") {
    return {
      title: "Checkout",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Checkout - ${product.title}`,
    description: product.shortDescription || "Complete your order securely on Sikhadenge Store.",
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false, noarchive: true },
    },
  };
}

export default async function CheckoutPage({ params }: PageProps) {
  const product = await prisma.storeProduct.findUnique({
    where: { slug: params.slug },
    select: {
      slug: true,
      title: true,
      category: true,
      shortDescription: true,
      price: true,
      compareAtPrice: true,
      status: true,
    },
  });

  if (!product || product.status !== "ACTIVE") {
    notFound();
  }

  return (
    <CheckoutClient
      product={{
        slug: product.slug,
        title: product.title,
        category: product.category,
        shortDescription: product.shortDescription,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
      }}
    />
  );
}
