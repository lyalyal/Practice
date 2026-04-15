import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: 20, padding: 20 }}>
      <Link to="/">Dashboard</Link>
      <Link to="/book">Books</Link>
      <Link to="/book/new">Add book</Link>
    </nav>
  );
}
