import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBook, getBook, updateBook } from "../api/booksApi";
import { getGenres } from "../api/genreApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const schema = z
  .object({
    title: z.string().min(1, "Введіть назву книги"),
    author: z.string().min(1, "Введіть автора"),

    pages: z.coerce.number().min(1, "Введіть кількість сторінок"),
    publishedYear: z.coerce.number(),
    genreId: z.coerce.number(),

    status: z.enum(["plan", "reading", "done"]),

    startDate: z.string().min(1, "Оберіть дату початку"),
    finishDate: z.string().optional(),

    rating: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number().min(1, "Оцінка 1-5").max(5, "Оцінка 1-5"),
    ),
  })
  .refine(
    (data) => {
      if (data.status !== "done") return true;
      return data.rating !== undefined;
    },
    {
      message: "Поставте оцінку прочитаній книзі",
      path: ["rating"],
    },
  )
  .refine(
    (data) => {
      if (!data.finishDate) return true;

      const start = new Date(data.startDate);
      const finish = new Date(data.finishDate);

      return finish >= start;
    },
    {
      message: "Дата завершення не може бути раніше",
      path: ["finishDate"],
    },
  );

type FormData = z.infer<typeof schema>;

export default function CreateEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  type Genre = { id: number; name: string };
  const [genres, setGenres] = useState<Genre[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) as any });

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  useEffect(() => {
    if (!id) return;
    getBook(Number(id)).then((book) => reset(book));
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    if (id) await updateBook(Number(id), data);
    else await createBook(data);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>{id ? "Редагування книги" : "Додавання книги"}</h2>

      <label>Назва книги</label>
      <input {...register("title")} />
      <p className="error">{errors.title?.message}</p>

      <label>Автор</label>
      <input {...register("author")} />
      <p className="error">{errors.author?.message}</p>

      <label>Кількість сторінок</label>
      <input type="number" {...register("pages")} />
      <p className="error">{errors.pages?.message}</p>

      <label>Рік видання</label>
      <input type="number" {...register("publishedYear")} />
      <p className="error">{errors.publishedYear?.message}</p>

      <label>Оцінка</label>
      <input type="number" {...register("rating")} />
      <p className="error">{errors.rating?.message}</p>

      <label>Дата початку</label>
      <input type="date" {...register("startDate")} />
      <p className="error">{errors.startDate?.message}</p>

      <label>Дата завершення</label>
      <input type="date" {...register("finishDate")} />
      <p className="error">{errors.finishDate?.message}</p>

      <label>Жанр</label>
      <select {...register("genreId")}>
        <option value="">Оберіть жанр</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
      <p className="error">{errors.genreId?.message}</p>

      <label>Статус</label>
      <select {...register("status")}>
        <option value="">Оберіть статус</option>
        <option value="plan">Заплановано</option>
        <option value="reading">Читаю</option>
        <option value="done">Прочитано</option>
      </select>
      <p className="error">{errors.status?.message}</p>

      <button className="mainBtn">{id ? "Зберегти" : "Додати книгу"}</button>
    </form>
  );
}
