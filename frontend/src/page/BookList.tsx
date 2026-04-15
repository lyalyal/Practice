import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api/booksApi";
import type { Book } from "../type/book";
import { Link } from "react-router-dom";

export default function BookListPage() {
  const [books, setBooks] = useState<Book[]>([]);

  const load = async () => setBooks(await getBooks());
  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>Books</h1>

      {books.map((b) => (
        <div key={b.id}>
          <b>{b.title}</b> — {b.author} ({b.status})
          <br />
          <Link to={`/book/${b.id}/edit`}>Edit</Link>
          <button
            onClick={() => {
              deleteBook(b.id);
              load();
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
