import { useEffect, useState } from "react";
import { getBooks } from "../api/booksApi";
import type { Book } from "../type/book";

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const totalPages = books.reduce((sum, b) => sum + b.pages, 0);
  const finished = books.filter((b) => b.status === "done").length;

  return (
    <div>
      <h1>Усе про книги</h1>
      <p>Всі книги: {books.length}</p>
      <p>Прочитано: {finished}</p>
      <p>Загально сторінок: {totalPages}</p>
    </div>
  );
}
