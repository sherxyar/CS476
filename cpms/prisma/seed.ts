import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "sheryar@example.com" },
    update: {},                     // nothing to update if it exists
    create: {
      name: "sheryar",
      email: "sheryar@example.com",
      hashedPassword: "test"
    },
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
