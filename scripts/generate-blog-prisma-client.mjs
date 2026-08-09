import { spawnSync } from "node:child_process";

const command = process.platform === "win32" ? "npx.cmd" : "npx";
const schema = "modules/blog/database/schema.prisma";

// Prisma Client generation does not connect to the database, but Prisma still
// validates that the datasource URL matches the declared provider. Keep codegen
// independent from the website's runtime DATABASE_URL by supplying an isolated
// PostgreSQL-shaped placeholder unless BLOG_CONTENT_DATABASE_URL is explicitly set.
const codegenDatabaseUrl =
  process.env.BLOG_CONTENT_DATABASE_URL ||
  "postgresql://blog_codegen:blog_codegen@127.0.0.1:5432/blog_codegen?schema=blog_content";

const result = spawnSync(
  command,
  ["prisma", "generate", "--schema", schema],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: codegenDatabaseUrl,
    },
  },
);

if (result.error) {
  console.error("BLOG PRISMA CODEGEN: FAILED", result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
