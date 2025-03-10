import { Module } from '@nestjs/common';
import { BorrowBooksService } from './borrow_books.service';
import { BorrowBooksController } from './borrow_books.controller';
import { BooksModule } from '../books/books.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowBook } from './entities/borrow_book.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    BooksModule,
    UserModule,
    TypeOrmModule.forFeature([BorrowBook]),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [BorrowBooksController],
  providers: [BorrowBooksService],
})
export class BorrowBooksModule {}
