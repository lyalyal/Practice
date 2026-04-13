Тема проєкту: електронний читацький щоденник

Сутності для проєкту
| Поле | Тип | Опис |
| ------------- | ------ | ----------------------------- |
| id | number | Унікальний ідентифікатор |
| title | string | Назва книги |
| author | string | Автор |
| pages | number | Кількість сторінок |
| publishedYear | number | Рік видання |
| startDate | string | Дата початку читання |
| finishDate | string | Дата завершення |
| rating | number | Оцінка від 1 до 5 |
| status | string | planned / reading / completed |
| genreId | number | ID жанру |

Жанр книги
| Поле | Тип | Опис |
| ---- | ------ | ------------- |
| id | number | Унікальний ID |
| name | string | Назва жанру |

Ендпоінти для книг і жанрів
| Method | Endpoint | Description |
| ------ | -------- | ------------------ |
| GET | /books | Отримати всі книги |
| POST | /books | Створити книгу |
| GET | /genres | Отримати всі жанри |
| POST | /genres | Створити жанр |
