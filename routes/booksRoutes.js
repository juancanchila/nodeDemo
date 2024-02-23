const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of all books.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         authorId:
 *           type: integer
 *         genre:
 *           type: string
 *         ratings:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Rating'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */


// Route to get all books
router.get('/books', async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to get books by author ID
router.get('/by-author/:authorId', async (req, res) => {
    const { authorId } = req.params;

    // Validate if authorId is a valid integer
    const authorIdInt = parseInt(authorId);
    if (isNaN(authorIdInt)) {
        return res.status(400).json({ error: 'Invalid authorId. Must be an integer.' });
    }

    try {
        const booksByAuthor = await prisma.book.findMany({
            where: {
                authorId: authorIdInt,
            },
        });
        res.json(booksByAuthor);
    } catch (error) {
        console.error('Error fetching books by author:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Route to get books rated by a user
router.get('/rated-books/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const ratedBooks = await prisma.book.findMany({
            where: {
                ratings: {
                    some: {
                        userId: parseInt(userId),
                    },
                },
            },
        });
        res.json(ratedBooks);
    } catch (error) {
        console.error('Error fetching rated books:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
