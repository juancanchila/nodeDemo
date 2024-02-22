const faker = require('faker');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        const booksData = [
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 2,
                genre: 'Fantasy', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 3,
                genre: 'Mystery', // Example genre
            },
            // Add more books with titles, descriptions, authors, and genres
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 4,
                genre: 'Romance', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 5,
                genre: 'Thriller', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 6,
                genre: 'Science Fiction', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 2,
                genre: 'Historical Fiction', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 3,
                genre: 'Horror', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 4,
                genre: 'Memoir', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 5,
                genre: 'Biography', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 6,
                genre: 'Self-help', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 2,
                genre: 'Business', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 3,
                genre: 'Cookbook', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 4,
                genre: 'Travel', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 5,
                genre: 'Poetry', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 6,
                genre: 'Essay', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 2,
                genre: 'Drama', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 3,
                genre: 'Art', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 4,
                genre: 'History', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 5,
                genre: 'Science', // Example genre
            },
            {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                authorId: 6,
                genre: 'Mathematics', // Example genre
            },
        ];

        // Create books
        await prisma.book.createMany({
            data: booksData,
        });

        console.log('Books created successfully.');
    } catch (error) {
        console.error('Error creating books:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
