import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  /* ------------------------------------------------------
   * 1. Seed a demo manager account (idempotent upsert)
   * ----------------------------------------------------*/
  const demoManager = await prisma.user.upsert({
    where: { email: "demo@local.test" },
    update: {},
    create: {
      name: "Demo Manager",
      email: "demo@local.test",
      // store a bcrypt hash, never plaintext
      hashedPassword: await bcrypt.hash("password123", 12),
    },
  });

  /* ------------------------------------------------------
   * 2. Seed an example project owned by the demo manager
   * ----------------------------------------------------*/
  await prisma.project.upsert({
    where: { projectID: "CP-0001" },
    update: {},
    create: {
      projectID: "CP-0001",
      title: "Campus Plaza Renovation",
      description: "Example project seeded for demo purposes.",
      phase: "Planning",
      forecast: 100_000,
      budget: 120_000,
      actuals: 20_000,
      plannedStartDate: new Date("2025-07-01"),
      plannedEndDate: new Date("2026-06-30"),
      projectManagerId: demoManager.id,
    },
  });

  /* ------------------------------------------------------
   * 3. (Optional) Add a quick PM Note to show history flow
   * ----------------------------------------------------*/
  await prisma.pMNote.create({
    data: {
      note: "Initial kickoff meeting scheduled.",
      projectId: "CP-0001",
      userId: demoManager.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("\u274C Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
