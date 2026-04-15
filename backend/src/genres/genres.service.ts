import { Injectable, NotFoundException } from '@nestjs/common';
import { Genre } from './entities/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenresService {
  private genres: Genre[] = [
    { id: 1, name: 'Фантастика' },
    { id: 2, name: 'Детектив' },
    { id: 3, name: 'Роман' },
    { id: 4, name: 'Історія' },
    { id: 5, name: 'Автобіографія' },
    { id: 6, name: 'Класика' },
    { id: 7, name: 'Психологія' },
    { id: 8, name: 'Комікс' },
  ];

  findAll(): Genre[] {
    return this.genres;
  }

  create(dto: CreateGenreDto): Genre {
    const newGenre: Genre = {
      id: this.genres.length + 1,
      ...dto,
    };
    this.genres.push(newGenre);
    return newGenre;
  }

  remove(id: number) {
    const index = this.genres.findIndex((g) => g.id === id);
    if (index === -1) throw new NotFoundException('Жанр не знайдено');
    this.genres.splice(index, 1);
    return { message: 'Жанр видалено' };
  }
}
