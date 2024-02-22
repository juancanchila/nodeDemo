interface Book {
    id: number;
    title: string;
    description: string;
    pdfFile: string;
    cover: string;
    coverDescription: string;
    genre: string;
    creationDate: Date;
    published: boolean;
    author: {
      id: number;
      username: string;
      email: string;
      avatar: string;
    };
    ratings: Rating[];
  }
  
  interface Rating {
    id: number;
    value: number;
    createdAt: Date;
    user: {
      id: number;
      username: string;
      email: string;
      avatar: string;
    };
  }
  
  // Function to calculate the average rating for a book
  function calculateAverageRating(ratings: Rating[]): number {
    if (ratings.length === 0) return 0;
    const totalRating = ratings.reduce((acc, curr) => acc + curr.value, 0);
    return totalRating / ratings.length;
  }
  