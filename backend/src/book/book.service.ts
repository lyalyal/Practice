import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  private book: Book[] = [];

  findAll(): Book[] {
    return this.book;
  }

  findOne(id: number): Book {
    const found = this.book.find((item) => item.id === id);
    if (!found) throw new NotFoundException(`Книгу з ID ${id} не знайдено`);
    return found;
  }

  create(dto: CreateBookDto): Book {
    const newBook: Book = {
      id: Date.now(),
      ...dto,
    };
    this.book.push(newBook);
    return newBook;
  }

  update(id: number, dto: UpdateBookDto): Book {
    const item = this.findOne(id);
    Object.assign(item, dto);
    return item;
  }

  remove(id: number) {
    const index = this.book.findIndex((item) => item.id === id);
    if (index === -1)
      throw new NotFoundException(`Книгу з ID ${id} не знайдено`);
    this.book.splice(index, 1);
    return { message: 'Книгу успішно видалено' };
  }
}
