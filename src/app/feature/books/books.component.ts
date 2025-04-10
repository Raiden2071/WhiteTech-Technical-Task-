import { CommonModule, NgOptimizedImage } from '@angular/common';
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
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  DeleteBookDialogComponent
} from '@feature/books/dialogs/books-dialog/delete-book-dialog/delete-book-dialog.component';
import {
  EditBookDialogComponent
} from '@feature/books/dialogs/books-dialog/edit-book-dialog/edit-book-dialog.component';
import {
  ShowBookDialogComponent
} from '@feature/books/dialogs/books-dialog/show-book-dialog/show-book-dialog.component';
import { Observable } from 'rxjs';

import { Book, BOOKS_DIALOG_TYPES, BooksDialogType } from './models/book.model';
import { BooksService } from './services/books.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInput,
    MatButton,
    NgOptimizedImage,
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

  // readonly bookForm = this.fb.group({
  //   image: [''],
  //   name: ['', Validators.required],
  //   author: ['', Validators.required],
  //   year: ['', Validators.required],
  //   description: ['', Validators.required]
  // });

  constructor(
    private booksService: BooksService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.filteredBooks.set(this.booksService.books());

    this.initFormListeners();
  }

  // public addBook(): void {
  //   if (this.bookForm.valid) {
  //     const formValue = this.bookForm.getRawValue();
  //     const newBook: Book = {
  //       id: uuidv4(),
  //       name: formValue.name ?? '',
  //       author: formValue.author ?? '',
  //       year: +(formValue.year ?? 0),
  //       description: formValue.description ?? '',
  //       image: formValue.image ?? '',
  //     };

  //     this.booksService.addBook(newBook);
  //     this.bookForm.reset();
  //   }
  // }

  // public onFileChange(event: Event): void {
  //   // const file = event.target.files[0];
  //   // if (file) {
  //   //   this.bookForm.patchValue({ image: file });
  //   // }
  // }

  public openDialog(book: Book, dialogType: BooksDialogType): void {
    const dialogComponent = {
      [BOOKS_DIALOG_TYPES.SHOW]: ShowBookDialogComponent,
      [BOOKS_DIALOG_TYPES.EDIT]: EditBookDialogComponent,
      [BOOKS_DIALOG_TYPES.DELETE]: DeleteBookDialogComponent,
    };

    this.dialog.open(dialogComponent[dialogType], {
      data: {
        book,
        dialogType: dialogType,
      },
      width: '600px',
    });
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
