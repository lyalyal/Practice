import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo"> Читацький щоденник</h2>

      <div className="nav-links">
        <Link to="/">Усі книги</Link>
        <Link to="/dashboard">Статистика</Link>
        <Link to="/book/new" className="add-btn">
          + Додати книгу
        </Link>
      </div>
    </nav>
  );
}
