const express = require('express');
const router = express.Router();
const { loginController }  = require('../controllers/loginController'); // Importing the loginController function

// Define the login route with the loginController function as the callback
router.post('/login', loginController);

// Export the router
module.exports = router;
