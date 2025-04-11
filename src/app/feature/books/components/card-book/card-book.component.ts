import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import type { Book } from '../../models/book.model';
import { BOOKS_DIALOG_TYPES, BooksDialogType } from '../../models/book.model';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-card-book',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage],
  templateUrl: './card-book.component.html',
  styleUrl: './card-book.component.scss'
})
export class CardBookComponent {
  public book = input.required<Book>();
  protected readonly BOOKS_DIALOG_TYPES = BOOKS_DIALOG_TYPES;

  constructor(private dialogService: DialogService) {}

  onOpenDialog(event: Event, type: BooksDialogType): void {
    event.stopPropagation();
    this.dialogService.openBookDialog(this.book(), type);
  }
}
