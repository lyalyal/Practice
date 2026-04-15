import axios from "axios";
import type { Book } from "../type/book";

const API_URL = "http://localhost:3000";

export const getBooks = async (): Promise<Book[]> => {
  const res = await axios.get(`${API_URL}/book`);
  return res.data;
};

export const getBook = async (id: number): Promise<Book> => {
  const res = await axios.get(`${API_URL}/book/${id}`);
  return res.data;
};

export const createBook = async (book: Omit<Book, "id">) => {
  const res = await axios.post(`${API_URL}/book`, book);
  return res.data;
};

export const updateBook = async (id: number, book: Omit<Book, "id">) => {
  const res = await axios.patch(`${API_URL}/book/${id}`, book);
  return res.data;
};

export const deleteBook = async (id: number) => {
  await axios.delete(`${API_URL}/book/${id}`);
};
