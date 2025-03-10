import { IsDate } from 'class-validator';

export class CreateBorrowBookDto {
  @IsDate()
  dueDate: Date;
}
