const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js');
const authorRoutes = require('./routes/authorRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const booksRoutes = require('./routes/booksRoutes.js');
const { authenticateToken } = require('./middlewares/authMiddleware');
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to return "Hola"
app.get('/', (req, res) => {
  res.json({ message: 'Hola' });
});

// No authentication required
app.use('/api/auth', authRoutes); // Auth routes


app.use('/api', authenticateToken);
// Routes for user management
app.use('/api/author', authorRoutes); // Auth routes
app.use('/api/users', userRoutes); // User routes (already protected by authenticateToken middleware)
app.use('/api/books', booksRoutes); // Book routes (already protected by authenticateToken middleware)


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
