import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBook } from "../api/booksApi";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  pages: z.number().min(1),
  publishedYear: z.number().min(1900),
  rating: z.number().min(1).max(5),
  startDate: z.string(),
  finishDate: z.string().optional(),
  genreId: z.number(),
  status: z.enum(["plan", "reading", "done"]),
});

type FormData = z.infer<typeof schema>;

export default function BookFormPage() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await createBook(data);
    navigate("/book");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Title" {...register("title")} />
      <input placeholder="Author" {...register("author")} />
      <input
        type="number"
        placeholder="Pages"
        {...register("pages", { valueAsNumber: true })}
      />
      <input
        type="number"
        placeholder="Year"
        {...register("publishedYear", { valueAsNumber: true })}
      />
      <input
        type="number"
        placeholder="Rating"
        {...register("rating", { valueAsNumber: true })}
      />
      <input type="date" {...register("startDate")} />
      <input type="date" {...register("finishDate")} />
      <input
        type="number"
        placeholder="Genre id"
        {...register("genreId", { valueAsNumber: true })}
      />

      <select {...register("status")}>
        <option value="plan">Plan</option>
        <option value="reading">Reading</option>
        <option value="done">Done</option>
      </select>

      <button type="submit">Save</button>
    </form>
  );
}
