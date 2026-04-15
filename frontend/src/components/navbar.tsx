import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: 20, padding: 20 }}>
      <Link to="/">Усе про книги</Link>
      <Link to="/book">Книжкова поличка</Link>
      <Link to="/book/new">Додати книгу</Link>
    </nav>
  );
}
