// test-prisma.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('DB URL at runtime:', process.env.POSTGRES_URL);
    
    // Test querying a user with AccountRole
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        accountRole: true
      },
      take: 1
    });
    
    console.log('Users with accountRole:', users);
    
    console.log('Connection test successful!');
  } catch (error) {
    console.error('Error testing Prisma connection:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
