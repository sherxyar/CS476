const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userEmail = process.argv[2];

if (!userEmail) {
  console.error('Please provide a user email as argument. Example: node promote-user-raw.js user@example.com');
  process.exit(1);
}

async function promoteToAdmin() {
  try {
    console.log(`Attempting to promote user with email: ${userEmail} to ADMIN role...`);
    
    const result = await prisma.$queryRaw`
      UPDATE "User" 
      SET "accountRole" = 'ADMIN' 
      WHERE email = ${userEmail}
    `;
    
    console.log(`Update completed. Result:`, result);
    console.log(`Check if user ${userEmail} now has ADMIN role.`);
    
  } catch (error) {
    console.error('Error promoting user to admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

promoteToAdmin();
