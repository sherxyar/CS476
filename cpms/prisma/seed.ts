import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // project manager
  const manager = await prisma.user.upsert({
    where:  { email: "demo@local.test" },
    update: {},
    create: { name: "Demo Manager", email: "demo@local.test" },
  });

  //  project linked to the manager
  await prisma.project.create({
    data: {
      projectID: "2025-0001",
      title: "Seeded Project",
      description: "This row was created by prisma/seed.ts",
      phase: "Planning",
      forecast: 1000,
      actuals:  0,
      budget:   1000,
      plannedStartDate: new Date("2025-07-01"),
      plannedEndDate:   new Date("2025-12-31"),
      projectManagerId: manager.id,
    },
  });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
