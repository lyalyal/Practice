import {
  IsString,
  IsNumber,
  IsIn,
  IsOptional,
  IsNotEmpty,
  Min,
  Max,
  ValidateIf,
} from 'class-validator';
import type { BookStatus } from '../entities/book.entity';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty({ message: 'Назва книги не може бути порожньою' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Книга не може бути без автора' })
  author!: string;

  @IsNumber()
  @Min(1, { message: 'Книга повинна мати хоча б одну сторінку' })
  pages!: number;

  @IsNumber()
  @Max(new Date().getFullYear(), {
    message: 'Книга не може бути видана у майбутньому часі',
  })
  publishedYear!: number;
  @IsOptional()
  @IsNumber({}, { message: 'Оцінка має бути числом' })
  @ValidateIf((o) => o.status === 'done')
  @Min(1)
  @Max(5, { message: 'Оцінка має бути від 1 до 5' })
  rating?: number;

  @IsString()
  @IsIn(['plan', 'reading', 'done'], {
    message: 'Статус має бути: plan, reading або done',
  })
  status!: BookStatus;

  @IsString()
  startDate!: string;

  @IsOptional()
  @IsString()
  finishDate?: string;

  @IsNumber()
  genreId!: number;
}
