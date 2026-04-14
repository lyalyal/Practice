import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks() {
    return this.bookService.findAll();
  }

  @Get(':id')
  getOneBook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Post()
  createBook(@Body() body: CreateBookDto) {
    return this.bookService.create(body);
  }

  @Patch(':id')
  updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBookDto,
  ) {
    return this.bookService.update(id, body);
  }

  @Delete(':id')
  deleteBook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.remove(id);
  }
}
