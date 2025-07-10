const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userEmail = process.argv[2];

if (!userEmail) {
  console.error('Please provide a user email as argument. Example: node promote-to-admin.js user@example.com');
  process.exit(1);
}

async function promoteToAdmin() {
  try {
    console.log(`Attempting to promote user with email: ${userEmail} to ADMIN role...`);
    
    // First check if the user exists
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true, name: true, email: true, accountRole: true }
    });
    
    if (!user) {
      console.error(`User with email ${userEmail} not found.`);
      return;
    }
    
    console.log('Current user details:', user);
    
    const result = await prisma.$executeRaw`
      UPDATE "User" 
      SET "accountRole" = 'ADMIN'::account_role 
      WHERE email = ${userEmail}
    `;
    
    if (result > 0) {
      console.log(`Successfully promoted ${userEmail} to ADMIN role!`);
      
      // Verify the change
      const updatedUser = await prisma.user.findUnique({
        where: { email: userEmail },
        select: { id: true, name: true, email: true, accountRole: true }
      });
      
      console.log('Updated user details:', updatedUser);
    } else {
      console.log('No changes were made. User may already be an admin.');
    }
  } catch (error) {
    console.error('Error promoting user to admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

promoteToAdmin();
