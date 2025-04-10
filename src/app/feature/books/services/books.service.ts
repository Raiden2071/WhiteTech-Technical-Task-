import { Injectable, signal, WritableSignal } from "@angular/core";
import { BOOKS } from "@app/shared/constants/books"
import type { Book } from '@feature/books/models/book.model';

@Injectable({
    providedIn: 'root'
})

export class BooksService {
    public books: WritableSignal<Book[]> = signal(BOOKS);

  public addBook(book: Book): void {
    this.books.update((books) => [...books, book]);
  }

  public deleteBook(id: string): void {
    this.books.update((books) => books.filter((book) => book.id !== id));
  }

  public editBook(book: Book): void {
    this.books.update((books) =>
      books.map((b) => (b.id === book.id ? book : b))
    );
  }
}
