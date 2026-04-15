import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import DashboardPage from "./page/DashboardPage";
import BookListPage from "./page/BookList";
import CreateEditPage from "./page/CreateEdit";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/book" element={<BookListPage />} />
        <Route path="/book/new" element={<CreateEditPage />} />
        <Route path="/book/:id/edit" element={<CreateEditPage />} />
      </Routes>
    </>
  );
}
export default App;
