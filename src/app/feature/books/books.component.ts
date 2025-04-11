import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';

import { CardBookComponent } from './components/card-book/card-book.component';
import { Book, BOOKS_DIALOG_TYPES, BooksDialogType } from './models/book.model';
import { BooksService } from './services/books.service';
import { DialogService } from './services/dialog.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInput,
    CardBookComponent,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private books$: Observable<Book[]> = toObservable(this.booksService.books);
  protected readonly BOOKS_DIALOG_TYPES = BOOKS_DIALOG_TYPES;

  filteredBooks: WritableSignal<Book[]> = signal<Book[]>([]);
  searchText: FormControl<string> = this.fb.nonNullable.control<string>('')

  constructor(
    private booksService: BooksService,
    private fb: FormBuilder,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.filteredBooks.set(this.booksService.books());

    this.initFormListeners();
  }

  public openDialog(book: Book | null, dialogType: BooksDialogType): void {
    this.dialogService.openBookDialog(book, dialogType);
  }

  private initFormListeners(): void {
    this.books$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.applyFilter();
      });

    this.searchText.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.applyFilter();
      });
  }

  private applyFilter(): void {
    const books = this.booksService.books();
    const searchText = this.searchText.value ? this.searchText.value.toLowerCase() : '';

    if (searchText) {
      const filtered = books.filter(book =>
        book.name.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText)
      );
      this.filteredBooks.set(filtered);
    } else {
      this.filteredBooks.set(books);
    }
  }
}
