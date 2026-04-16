import { useEffect, useState, useMemo } from "react";
import { getBooks } from "../api/booksApi";
import type { Book } from "../type/book";

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((b) =>
      (b.title + b.author).toLowerCase().includes(search.toLowerCase()),
    );
  }, [books, search]);

  const stats = useMemo(() => {
    const totalPages = filteredBooks.reduce((sum, b) => sum + b.pages, 0);
    const finishedBooks = filteredBooks.filter((b) => b.status === "done");

    const avgRating =
      finishedBooks.reduce((sum, b) => sum + (b.rating || 0), 0) /
      (finishedBooks.length || 1);

    const lastBook = filteredBooks[filteredBooks.length - 1];

    return {
      totalBooks: filteredBooks.length,
      totalPages,
      avgRating: finishedBooks.length > 0 ? avgRating.toFixed(1) : "0.0",
      lastBook: lastBook?.title || "—",
    };
  }, [filteredBooks]);

  return (
    <div className="dashboard">
      <h1>Статистика читання </h1>

      <input
        className="search-input"
        placeholder="Пошук книги"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="stats-row">
        <div className="stat-card">
          <h3>Усього книг</h3>
          <p>{stats.totalBooks}</p>
        </div>

        <div className="stat-card">
          <h3>Сторінок</h3>
          <p>{stats.totalPages}</p>
        </div>

        <div className="stat-card">
          <h3>Середній рейтинг</h3>
          <p>{stats.avgRating}</p>
        </div>
      </div>
      {filteredBooks.length > 0 && (
        <div className="last-book-widget">
          <h3>Остання книга:</h3>
          <p>{stats.lastBook}</p>
        </div>
      )}
    </div>
  );
}
