import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import type { Book } from '../../models/book.model';
import { BOOKS_DIALOG_TYPES, BooksDialogType } from '../../models/book.model';

@Component({
  selector: 'app-card-book',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage],
  templateUrl: './card-book.component.html',
  styleUrl: './card-book.component.scss'
})
export class CardBookComponent {
  book = input.required<Book>();
  protected readonly openDialog = output<{book: Book, type: BooksDialogType}>();

  protected readonly BOOKS_DIALOG_TYPES = BOOKS_DIALOG_TYPES;

  onOpenDialog(event: Event, type: BooksDialogType): void {
    event.stopPropagation();
    this.openDialog.emit({ book: this.book(), type });
  }
}
