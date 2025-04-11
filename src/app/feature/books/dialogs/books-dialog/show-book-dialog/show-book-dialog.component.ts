import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import type { BooksDialog } from '@feature/books/models/book.model';

@Component({
  selector: 'app-show-book-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIcon
  ],
  templateUrl: './show-book-dialog.component.html',
  styleUrl: './show-book-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowBookDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: BooksDialog) {}
}
