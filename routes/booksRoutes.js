const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    res.send('This is a test response for GET method');
});


module.exports = router;