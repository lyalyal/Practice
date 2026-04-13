import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks() {
    return this.bookService.findAll();
  }

  @Post()
  createBook(@Body() body: any) {
    return this.bookService.create(body);
  }
}
