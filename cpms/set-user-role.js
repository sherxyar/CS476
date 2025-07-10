const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userEmail = process.argv[2];
const newRole = process.argv[3]?.toUpperCase(); // ADMIN, PROJECT_MANAGER, or CONTRIBUTOR

if (!userEmail || !newRole) {
  console.error('Please provide both user email and role as arguments.');
  console.error('Example: node set-user-role.js user@example.com ADMIN');
  console.error('Available roles: ADMIN, PROJECT_MANAGER, CONTRIBUTOR');
  process.exit(1);
}

const validRoles = ['ADMIN', 'PROJECT_MANAGER', 'CONTRIBUTOR'];
if (!validRoles.includes(newRole)) {
  console.error(`Invalid role: ${newRole}`);
  console.error('Available roles: ADMIN, PROJECT_MANAGER, CONTRIBUTOR');
  process.exit(1);
}

async function setUserRole() {
  try {
    console.log(`Setting role for user ${userEmail} to ${newRole}...`);
    
    // Check if user exists
    const existingUser = await prisma.$queryRaw`
      SELECT id, email FROM "User" WHERE email = ${userEmail}
    `;
    
    if (!existingUser || existingUser.length === 0) {
      console.error(`User with email ${userEmail} not found.`);
      return;
    }
    
    // Update user role with  SQL
    await prisma.$executeRaw`
      UPDATE "User" 
      SET "accountRole" = ${newRole}::account_role
      WHERE email = ${userEmail}
    `;
    
    console.log(`Successfully updated ${userEmail} role to ${newRole}`);
    
    // Verify the change
    const updatedUser = await prisma.$queryRaw`
      SELECT id, name, email, "accountRole" 
      FROM "User" 
      WHERE email = ${userEmail}
    `;
    
    console.log('Updated user details:', updatedUser[0]);
    
  } catch (error) {
    console.error('Error setting user role:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setUserRole();
