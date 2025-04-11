import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import type { Book, BooksDialog } from '@feature/books/models/book.model';
import { BooksService } from '@feature/books/services/books.service';

@Component({
  selector: 'app-add-edit-book-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './add-edit-book-dialog.component.html',
  styleUrl: './add-edit-book-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditBookDialogComponent implements OnInit {
  readonly bookForm = this.fb.group({
    name: ['', Validators.required],
    author: ['', Validators.required],
    year: [0, Validators.required],
    description: ['', Validators.required],
    image: [''],
  });

  @ViewChild('fileInput') fileInput!: ElementRef;
  imagePreview: WritableSignal<string | ArrayBuffer | null> = signal(null);
  isEditMode = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BooksDialog,
    private fb: FormBuilder,
    private booksService: BooksService,
  ) {}

  public ngOnInit() {
    const book = this.data.book;
    this.isEditMode = !!book;

    if (this.isEditMode) {
      this.bookForm.patchValue({
        name: book.name,
        author: book.author,
        year: +book.year,
        description: book.description,
        image: book.image,
      });
    }
  }
  
  public onImageClick(): void {
    this.fileInput.nativeElement.click();
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.imagePreview.set(result);
        this.bookForm.patchValue({ image: result });
      };
      reader.readAsDataURL(file);
    }
  }

  public saveBook(): void {
    const formValue = this.bookForm.value;

    const bookValue: Book = {
      id: this.isEditMode ? this.data.book.id : crypto.randomUUID(),
      name: formValue.name || '',
      author: formValue.author || '',
      year: formValue.year as number,
      description: formValue.description || '',
      image: formValue.image || '',
    };

    if (this.isEditMode) {
      this.booksService.editBook(bookValue);
    } else {
      this.booksService.addBook(bookValue);
    }
  }
}
