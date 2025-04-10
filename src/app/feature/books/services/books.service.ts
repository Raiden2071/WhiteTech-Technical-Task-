import { Injectable, signal, WritableSignal } from "@angular/core";

import { Book } from "../models/book.model";

@Injectable({
    providedIn: 'root'
})

export class BooksService {
    public books: WritableSignal<Book[]> = signal([
      { id: '1', name: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', year: 1997, description: 'A young wizard begins his adventures at Hogwarts.', image: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg" },
      { id: '2', name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, description: 'A classic novel that explores themes of wealth and society in the Roaring Twenties.', image: '' },
      { id: '3', name: '1984', author: 'George Orwell', year: 1949, description: 'A dystopian novel depicting a totalitarian regime and the suppression of truth.', image: '' },
      { id: '4', name: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, description: 'A novel centered on racial injustice and moral growth in the American South.', image: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630' },
      { id: '5', name: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951, description: 'A story about teenage rebellion and the challenges of adolescence.', image: '' },
      { id: '6', name: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, description: 'A romantic novel following the emotional development of Elizabeth Bennet.', image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg' },
      { id: '7', name: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, description: 'A fantasy novel about the adventures of Bilbo Baggins.', image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg' },
      { id: '8', name: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', year: 1967, description: 'A multi-generational story of the Buendía family.', image: '' },
      { id: '9', name: 'The Alchemist', author: 'Paulo Coelho', year: 1988, description: 'A philosophical novel about a young Andalusian shepherd.', image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg' },
      { id: '10', name: 'Brave New World', author: 'Aldous Huxley', year: 1932, description: 'A dystopian novel envisioning a future society.', image: '' },
      { id: '11', name: 'The Lord of the Rings', author: 'J.R.R. Tolkien', year: 1954, description: 'An epic high-fantasy novel about the quest to destroy a powerful ring.', image: 'https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg' },
      { id: '12', name: 'Crime and Punishment', author: 'Fyodor Dostoevsky', year: 1866, description: 'A psychological novel exploring the moral dilemmas of Raskolnikov.', image: '' }
    ]);

  public addBook(newBook: Book): void {
    this.books.update((books: Book[]) => [...books, newBook]);
  }

  public deleteBook(bookId: string): void {
    this.books.update((books: Book[]) => books.filter(book => book.id !== bookId));
  }

  public editBook(updatedBook: Book): void {
    this.books.update((books: Book[]) =>
      books.map(book => book.id === updatedBook.id ? updatedBook : book)
    );
  }
}
