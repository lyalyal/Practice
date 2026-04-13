import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  private book: any[] = [];

  findAll() {
    return this.book;
  }

  create(bookDate: any) {
    const newBook = {
      id: Date.now(),
      ...bookDate,
    };

    this.book.push(newBook);
    return newBook;
  }
}
