const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const secret = process.env.ACCESS_TOKEN_SECRET;

// Define the loginController function
const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Retrieve user from the database using Prisma
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user || user.password !== password) {
      return res.status(401).send('Invalid username or password');
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      secret
    );

    // Define the structure of userData inline
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar, // Assuming you have an 'avatar' field in your user data
    };

    res.json({
      accessToken,
      userData,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Export the loginController function
module.exports = { loginController };
