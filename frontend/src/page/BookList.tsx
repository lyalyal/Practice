import { useEffect, useState, useMemo } from "react";
import { getBooks, deleteBook } from "../api/booksApi";
import type { Book } from "../type/book";
import { Link } from "react-router-dom";

export default function BookListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
    } catch {
      setError("Не вдалося завантажити книги");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      (book.title + book.author + book.genreId)
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [books, search]);

  if (loading) return <p>Завантаження книг </p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="books-page">
      <h1>Книги</h1>
      <p className="subtitle">Твій простір для зберігання книг</p>

      <input
        className="search-input"
        placeholder="Пошук книги "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredBooks.length === 0 && (
        <p className="empty-text">
          Зараз немає жодної доданої книги. Додайте книгу
        </p>
      )}
      <div className="books-grid">
        {filteredBooks.map((b) => (
          <div key={b.id} className="book-card">
            <h3>{b.title}</h3>
            <p>{b.author}</p>
            <p>Статус: {b.status}</p>

            <div className="book-actions">
              <Link to={`/book/${b.id}/edit`}>
                <button className="edit-btn">Редагувати</button>
              </Link>

              <button
                className="delete-btn"
                onClick={async () => {
                  await deleteBook(b.id);
                  load();
                }}
              >
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
