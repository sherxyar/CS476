import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "sheryar@example.com" },
    update: {},                     
    create: {
      name: "sheryar",
      email: "sheryar@example.com",
      hashedPassword: "test",
      accountRole: "PROJECT_MANAGER"
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
