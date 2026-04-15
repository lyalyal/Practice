export type BookStatus = "plan" | "reading" | "done";

export interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
  publishedYear: number;
  status: BookStatus;
  rating: number;
  startDate: string;
  finishDate?: string;
  genreId: number;
}
