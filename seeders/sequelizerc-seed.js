const bcrypt = require('bcrypt');
const { User, Role } = require('./models'); // Assuming you have Sequelize models for User and Role

async function main() {
  try {
    // Check if the admin user already exists
    const adminExists = await User.findOne({
      where: {
        username: 'admin',
      },
    });

    if (adminExists) {
      console.log('Admin user already exists.');
      return;
    }

    // Create roles
    await Role.bulkCreate([
      { name: 'ADMIN' },
      { name: 'AUTHOR' },
      { name: 'READER' }
    ]);

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin_password', 10);

    // Create the admin user
    await User.create({
      username: 'admin',
      email: 'juan.canchila.com',
      password: hashedPassword,
      roleId: 1, // Assuming the admin role has ID 1
      avatar: '0'
    });

    console.log('Admin user created successfully.');
  } catch (error) {
    console.error(error);
  }
}

main();
