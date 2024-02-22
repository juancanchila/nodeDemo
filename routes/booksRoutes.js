const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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

// Route to create books by author ID
router.post('/books/:authorId', async (req, res) => {
    const { authorId } = req.params;
    const { title, description, genre } = req.body;
    try {
        const newBook = await prisma.book.create({
            data: {
                title,
                description,
                authorId: parseInt(authorId),
                genre,
            },
        });
        res.json(newBook);
    } catch (error) {
        console.error('Error creating book:', error);
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
