import { PrismaClient, StoreProductStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const slug = "ai-prompt-starter-pack";

  const existing = await prisma.storeProduct.findUnique({
    where: { slug },
  });

  if (existing) {
    console.log("STORE_PRODUCT_ALREADY_EXISTS", existing.slug);
    return;
  }

  const product = await prisma.storeProduct.create({
    data: {
      title: "AI Prompt Starter Pack",
      slug: "ai-prompt-starter-pack",
      category: "Prompts",
      shortDescription: "Quick entry-level prompt pack for students, freelancers, and creators.",
      fullDescription: "A practical starter prompt pack for students, creators, freelancers, and beginners who want ready-to-use prompt ideas for study, content, and workflow tasks.",
      price: 9,
      compareAtPrice: 99,
      status: StoreProductStatus.ACTIVE,
      deliveryType: "digital_download",
      deliveryUrl: "/downloads/ai-prompt-starter-pack",
      features: [
        "Beginner-friendly prompt pack",
        "Quick copy-paste use cases",
        "Useful for study, content, and workflow tasks",
        "Low-ticket entry product for paid ads funnel"
      ],
      faqs: [
        {
          q: "How will I get access?",
          a: "Access flow will be connected in the payment and delivery steps."
        },
        {
          q: "Is this beginner friendly?",
          a: "Yes, this pack is designed as an easy entry-level starter product."
        }
      ],
      sortOrder: 1,
    },
  });

  console.log("STORE_PRODUCT_CREATED", product.slug, product.id);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
