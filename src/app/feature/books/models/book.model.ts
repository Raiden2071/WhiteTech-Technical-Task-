export const BOOKS_DIALOG_TYPES = {
  SHOW: 'show',
  EDIT: 'edit',
  DELETE: 'delete',
  ADD: 'add'
} as const;
export type BooksDialogType = typeof BOOKS_DIALOG_TYPES[keyof typeof BOOKS_DIALOG_TYPES];

export interface Book {
    id: string;
    name: string;
    author: string;
    year: number;
    description: string;
    image: string;
}

export interface BooksDialog {
  book: Book;
  dialogType: BooksDialogType;
}
