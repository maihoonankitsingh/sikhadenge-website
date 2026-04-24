import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  collectionPrisma?: PrismaClient;
};

export const collectionPrisma =
  globalForPrisma.collectionPrisma ??
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.collectionPrisma = collectionPrisma;
}
