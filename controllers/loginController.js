require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const secret = process.env.ACCESS_TOKEN_SECRET;

const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user with the provided username and include the associated role
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        Role: true, // Include the associated role
      },
    });

    // If user is not found or password is incorrect, return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid username or password');
    }

    // Generate access token
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.Role.name, // Access the role name from the associated role
      },
      secret
    );

    // Define user data to be sent in response
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.Role.name, // Include the role name from the associated role
    };

    // Send access token and user data in response
    res.json({
      accessToken,
      userData,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { loginController };
