// check-user-role.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Specify the email of the user you want to check
const userEmail = process.argv[2] || 'sheryaartahir@gmail.com';

async function checkUserRole() {
  try {
    console.log(`Checking role for user with email: ${userEmail}`);
    
    // Try with direct database query to bypass Prisma's type checking
    const result = await prisma.$queryRaw`
      SELECT id, name, email, "accountRole" 
      FROM "User" 
      WHERE email = ${userEmail}
    `;
    
    if (result && result.length > 0) {
      console.log('User details:', result[0]);
      console.log(`User ${userEmail} has role: ${result[0].accountRole}`);
    } else {
      console.log(`User ${userEmail} not found.`);
    }
    
  } catch (error) {
    console.error('Error checking user role:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUserRole();
