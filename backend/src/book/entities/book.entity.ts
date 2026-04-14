export type BookStatus = 'plan' | 'reading' | 'done';

export class Book {
  id!: number;
  title!: string;
  author!: string;
  pages!: number;
  publishedYear!: number;
  status!: BookStatus;
  rating!: number;
  startDate!: string;
  finishDate?: string;
  genreId!: number;
}
