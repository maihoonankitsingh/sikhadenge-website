const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const roles = [
    { key: "SUPER_ADMIN", name: "Super Admin" },
    { key: "ADMIN", name: "Admin" },
    { key: "EMPLOYEE", name: "Employee" },
    { key: "TUTOR", name: "Tutor" },
    { key: "STUDENT", name: "Student" },
    { key: "AFFILIATE", name: "Affiliate" },
  ];

  for (const r of roles) {
    await prisma.sdRole.upsert({
      where: { key: r.key },
      update: { name: r.name },
      create: r,
    });
  }

  await prisma.sdAllowedEmail.upsert({
    where: { email: "ankit@sikhadenge.in" },
    update: { note: "Owner" },
    create: { email: "ankit@sikhadenge.in", note: "Owner" },
  });

  console.log("OK: seeded roles + allowed email");
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
