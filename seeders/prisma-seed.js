const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if the admin user already exists
    const adminExists = await prisma.user.findUnique({
      where: {
        username: 'admin',
      },
    });

    if (adminExists) {
      console.log('Admin user already exists.');
      return;
    }

    // Create roles
    await prisma.role.createMany({
      data: [
        { name: 'ADMIN' },
        { name: 'AUTHOR' },
        { name: 'READER' }
      ],
    });

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin_password', 10);

    // Create the admin user
    await prisma.user.create({
      data: {
        username: 'admin',
        email: 'juan.canchila.com',
        password: hashedPassword,
        roleId: 1, // Assuming the admin role has ID 1
        avatar: '0'
      },
    });

    console.log('Admin user created successfully.');
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
