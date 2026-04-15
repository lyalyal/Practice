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

    pages: z.coerce
      .number()
      .refine((val) => !isNaN(val), {
        message: "Введіть число",
      })
      .min(1, "Кількість сторінок має бути більше 0"),

    publishedYear: z.coerce
      .number()
      .refine((val) => !isNaN(val), {
        message: "Введіть число",
      })
      .min(1200, "Рік має бути не менше 1200"),

    rating: z.coerce
      .number()
      .refine((val) => !isNaN(val), {
        message: "Оцінка книги",
      })
      .min(1, "Мінімально  1")
      .max(5, "Максимально 5"),

    startDate: z.string().min(1, "Оберіть дату початку читання"),

    finishDate: z.string().optional(),

    genreId: z.coerce.number().refine((val) => !isNaN(val), {
      message: "Оберіть жанр",
    }),

    status: z.enum(["plan", "reading", "done"], {
      message: "Оберіть статус книги",
    }),
  })
  .refine(
    (data) => {
      if (!data.finishDate) return true;
      return new Date(data.finishDate) >= new Date(data.startDate);
    },
    {
      message: "Дата завершення не може бути раніше дати початку",
      path: ["finishDate"],
    },
  );

type FormData = z.infer<typeof schema>;

export default function CreateEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  type Genre = {
    id: number;
    name: string;
  };

  const [genres, setGenres] = useState<Genre[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
  });

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  useEffect(() => {
    if (!id) return;

    getBook(Number(id)).then((book) => {
      reset(book);
    });
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    if (id) {
      await updateBook(Number(id), data);
    } else {
      await createBook(data);
    }

    navigate("/book");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      <h2>{id ? "Редагування книги" : "Додавання книги"}</h2>

      <label>Назва книги</label>
      <input {...register("title")} />
      {errors.title && <p>{errors.title.message}</p>}

      <label>Автор</label>
      <input {...register("author")} />
      {errors.author && <p>{errors.author.message}</p>}

      <label>Кількість сторінок</label>
      <input type="number" {...register("pages", { valueAsNumber: true })} />
      {errors.pages && <p>{errors.pages.message}</p>}

      <label>Рік видання</label>
      <input
        type="number"
        {...register("publishedYear", { valueAsNumber: true })}
      />
      {errors.publishedYear && <p>{errors.publishedYear.message}</p>}

      <label>Оцінка книги</label>
      <input type="number" {...register("rating", { valueAsNumber: true })} />
      {errors.rating && <p>{errors.rating.message}</p>}

      <label>Дата початку читання</label>
      <input type="date" {...register("startDate")} />
      {errors.startDate && <p>{errors.startDate.message}</p>}

      <label>Дата завершення читання</label>
      <input type="date" {...register("finishDate")} />
      {errors.finishDate && <p>{errors.finishDate.message}</p>}

      <label>Жанр</label>
      <select {...register("genreId", { valueAsNumber: true })}>
        <option value="">Оберіть жанр</option>

        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
      {errors.genreId && <p>{errors.genreId.message}</p>}

      <label>Статус книги</label>
      <select {...register("status")}>
        <option value="">Оберіть статус</option>
        <option value="plan">Заплановано</option>
        <option value="reading">Читаю</option>
        <option value="done">Прочитано</option>
      </select>
      {errors.status && <p>{errors.status.message}</p>}

      <button type="submit">{id ? "Зберегти зміни" : "Додати книгу"}</button>
    </form>
  );
}
