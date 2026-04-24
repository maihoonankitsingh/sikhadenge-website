import { PrismaClient, StoreProductStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const slug = "masterclass-upgrade-toolkit";

  const existing = await prisma.storeProduct.findUnique({
    where: { slug },
  });

  if (existing) {
    console.log("BUMP_PRODUCT_ALREADY_EXISTS", existing.slug);
    return;
  }

  const product = await prisma.storeProduct.create({
    data: {
      title: "Masterclass Upgrade Toolkit",
      slug,
      category: "Workshop Upgrade",
      shortDescription:
        "Optional upgrade with premium prompts, automation resources, and bonus templates.",
      fullDescription:
        "An optional workshop upgrade pack that includes 50+ automation workflows, 999+ premium prompts and productivity hacks, n8n guide, and premium PowerPoint, Excel, and Power BI templates. This will be delivered after the masterclass.",
      price: 187,
      compareAtPrice: 7497,
      status: StoreProductStatus.ACTIVE,
      deliveryType: "post_masterclass_delivery",
      deliveryUrl: "",
      features: [
        "50+ automation workflows",
        "999+ premium prompts and productivity hacks",
        "Guide to using n8n",
        "Premium PowerPoint, Power BI, and Excel templates"
      ],
      faqs: [
        {
          q: "When will this be delivered?",
          a: "This additional product will be shared after the masterclass."
        }
      ],
      sortOrder: 2,
    },
  });

  console.log("BUMP_PRODUCT_CREATED", product.slug, product.id, product.price);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
