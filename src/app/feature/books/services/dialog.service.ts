import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddEditBookDialogComponent } from '../dialogs/books-dialog/add-edit-book-dialog/add-edit-book-dialog.component'
import { DeleteBookDialogComponent } from '../dialogs/books-dialog/delete-book-dialog/delete-book-dialog.component';
import { ShowBookDialogComponent } from '../dialogs/books-dialog/show-book-dialog/show-book-dialog.component'
import { Book, BOOKS_DIALOG_TYPES, BooksDialogType } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openBookDialog(book: Book | null, dialogType: BooksDialogType): void {
    const dialogComponent = {
      [BOOKS_DIALOG_TYPES.SHOW]: ShowBookDialogComponent,
      [BOOKS_DIALOG_TYPES.EDIT]: AddEditBookDialogComponent,
      [BOOKS_DIALOG_TYPES.DELETE]: DeleteBookDialogComponent,
      [BOOKS_DIALOG_TYPES.ADD]: AddEditBookDialogComponent,
    };

    this.dialog.open(dialogComponent[dialogType], {
      data: {
        book,
        dialogType: dialogType,
      },
      width: '600px',
    });
  }
} 