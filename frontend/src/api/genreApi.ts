import axios from "axios";

const API = "http://localhost:3000/genres";

export const getGenres = async () => {
  const res = await axios.get(API);
  return res.data;
};
