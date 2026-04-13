import { Controller, Get, Post, Body } from '@nestjs/common';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  getAllGenres() {
    return this.genresService.findAll();
  }

  @Post()
  createGenre(@Body() body: any) {
    return this.genresService.create(body);
  }
}
