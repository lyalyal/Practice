import { Injectable, NotFoundException } from '@nestjs/common';
import { Genre } from './entities/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenresService {
  private genres: Genre[] = [];

  findAll(): Genre[] {
    return this.genres;
  }

  create(dto: CreateGenreDto): Genre {
    const newGenre: Genre = {
      id: Date.now(),
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
