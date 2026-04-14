import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty({ message: 'Назва жанру не може бути порожньою' })
  @MaxLength(30, { message: 'Назва жанру занадто довга' })
  name!: string;
}
