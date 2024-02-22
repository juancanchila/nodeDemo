require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.ACCESS_TOKEN_SECRET;

// Define the loginController function
const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hardcoded admin user
    const adminUser = {
      id: 1,
      username: 'admin',
      password: 'admin', // Hardcoded password for demonstration purposes only
      email: 'admin@example.com',
      role: 'admin',
      avatar: null, // Assuming you have an 'avatar' field in your user data
    };

    // Check if the provided credentials match the admin user
    if (username === adminUser.username && password === adminUser.password) {
      // Generate an access token
      const accessToken = jwt.sign(
        {
          id: adminUser.id,
          username: adminUser.username,
          email: adminUser.email,
          role: adminUser.role,
        },
        secret
      );

      // Define the structure of userData inline
      const userData = {
        id: adminUser.id,
        username: adminUser.username,
        email: adminUser.email,
        avatar: adminUser.avatar,
      };

      // Send the access token and user data in the response
      res.json({
        accessToken,
        userData,
      });
    } else {
      // If the provided credentials are incorrect, return an error
      return res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Export the loginController function
module.exports = { loginController };
