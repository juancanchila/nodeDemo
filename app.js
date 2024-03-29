const express = require('express');
const cors = require('cors'); // Import cors module
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js');
const authorRoutes = require('./routes/authorRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const booksRoutes = require('./routes/booksRoutes.js');
const { authenticateToken } = require('./middlewares/authMiddleware');
const app = express();
const { specs, swaggerUi } = require('./swagger');
// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());
// Route to return "Hola"
app.get('/', (req, res) => {
  res.json({ message: 'Hola' });
});

// No authentication required
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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
