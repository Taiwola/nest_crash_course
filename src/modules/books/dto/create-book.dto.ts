import { IsEnum, IsString } from 'class-validator';
import { BookStatus } from '../entities/book.entity';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  cover_page: string;

  @IsString()
  book_link: string;

  @IsEnum(BookStatus)
  status: BookStatus;
}
