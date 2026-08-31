import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CheckoutClient from "./CheckoutClient";

type PageProps = {
  params: {
    slug: string;
  };
};

export const dynamic = "force-dynamic";

function getPrismaErrorCode(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code?: unknown }).code === "string"
  ) {
    return (error as { code: string }).code;
  }

  return undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
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
      description:
        product.shortDescription ||
        "Complete your order securely on Sikhadenge Store.",
      robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false, noarchive: true },
      },
    };
  } catch (error) {
    console.error("CHECKOUT_METADATA_LOOKUP_FAILED", {
      slug: params.slug,
      prismaCode: getPrismaErrorCode(error),
    });

    return {
      title: "Checkout | Sikhadenge",
      description: "Secure checkout on Sikhadenge Store.",
      robots: { index: false, follow: false },
    };
  }
}

export default async function CheckoutPage({ params }: PageProps) {
  let product;

  try {
    product = await prisma.storeProduct.findUnique({
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
  } catch (error) {
    console.error("CHECKOUT_PRODUCT_LOOKUP_FAILED", {
      slug: params.slug,
      prismaCode: getPrismaErrorCode(error),
    });

    throw new Error("CHECKOUT_PRODUCT_LOOKUP_FAILED");
  }

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
