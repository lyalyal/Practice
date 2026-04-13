import { Injectable } from '@nestjs/common';

@Injectable()
export class GenresService {
  private genres: any[] = [];

  findAll() {
    return this.genres;
  }

  create(genre: any) {
    const newGenre = {
      id: Date.now(),
      ...genre,
    };

    this.genres.push(newGenre);
    return newGenre;
  }
}
