import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Dashboard</h1>} />
      <Route path="/books" element={<h1>Books list</h1>} />
      <Route path="/books/new" element={<h1>Create book</h1>} />
      <Route path="/books/:id/edit" element={<h1>Edit book</h1>} />
    </Routes>
  );
}

export default App;
