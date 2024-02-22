const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/authRoutes.js');
const { authenticateToken } = require('../middlewares/authMiddleware');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route to return "Hola"
app.get('/', (req, res) => {
  res.json({ message: 'Hola' });
});

// Routes for user management
app.use('/api/users', authRoutes);

// Test for the '/' route
describe('GET /', () => {
  test('responds with JSON message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Hola' });
  });
});

// Test for authentication middleware
describe('authentication middleware', () => {
    test('calls next() if token is valid', () => {
      const req = { headers: { authorization: 'Bearer valid_token' } }; // Set authorization header
      const res = {};
      const next = jest.fn();
      authenticateToken(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  
    test('responds with 401 if token is missing', () => {
      const req = {}; // No headers set
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      authenticateToken(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith('Unauthorized');
    });
  });

// Run the server for testing
const server = app.listen(0, () => {
  console.log(`Test server running on port ${server.address().port}`);
});
