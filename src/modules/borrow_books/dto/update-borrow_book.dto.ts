import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowBookDto } from './create-borrow_book.dto';

export class UpdateBorrowBookDto extends PartialType(CreateBorrowBookDto) {}
