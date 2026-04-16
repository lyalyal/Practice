import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import DashboardPage from "./page/DashboardPage";
import BookListPage from "./page/BookList";
import CreateEditPage from "./page/CreateEdit";

function App() {
  return (
    <>
      <Navbar />

      <div className="app-container">
        <Routes>
          <Route path="/" element={<BookListPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/book/new" element={<CreateEditPage />} />
          <Route path="/book/:id/edit" element={<CreateEditPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
