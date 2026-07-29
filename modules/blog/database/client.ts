import "server-only";

import { PrismaClient as BlogContentPrismaClient } from "./generated/client";

type BlogPrismaGlobal = typeof globalThis & {
  __sikhadengeBlogContentDb?: BlogContentPrismaClient;
};

const globalForBlogPrisma = globalThis as BlogPrismaGlobal;

export const blogContentDb =
  globalForBlogPrisma.__sikhadengeBlogContentDb ??
  new BlogContentPrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForBlogPrisma.__sikhadengeBlogContentDb = blogContentDb;
}

export type { BlogContentPrismaClient };
