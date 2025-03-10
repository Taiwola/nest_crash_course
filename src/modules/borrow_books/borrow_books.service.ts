import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBorrowBookDto } from './dto/create-borrow_book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow_book.dto';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { BooksService } from '../books/books.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowBook } from './entities/borrow_book.entity';
import { Repository } from 'typeorm';
import { BookStatus } from '../books/entities/book.entity';

@Injectable()
export class BorrowBooksService {
  constructor(
    @InjectRepository(BorrowBook) private borrowBook: Repository<BorrowBook>,
    private userService: UserService,
    private bookService: BooksService,
  ) {}

  async borrow(
    createBorrowBookDto: CreateBorrowBookDto,
    id: string,
    req: Request,
  ) {
    try {
      const userId = req.user.id;
      const user = await this.userService.findOne(userId);
      const book = await this.bookService.findOne(id);
      if (!book.data.id) {
        throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
      }

      const bookStatus = book.data.status;

      if (bookStatus === BookStatus.borrowed) {
        throw new HttpException(
          'Book is already in use, try later',
          HttpStatus.BAD_REQUEST,
        );
      }

      const borrowBook = await this.borrowBook.create({
        book: [book.data],
        dueDate: createBorrowBookDto.dueDate,
        user: user.data,
      });

      await this.bookService.update(book.data.id, {
        status: BookStatus.borrowed,
      });

      return {
        message: 'Request successfull',
        data: borrowBook,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const borrowedBooks = await this.borrowBook.find({
      relations: ['user', 'book'],
    });
    return {
      message: 'Request was successfull',
      data: borrowedBooks,
    };
  }

  async findAllUserBorrowedBooks(id: string) {
    const borrowedBooks = await this.borrowBook.find({
      where: { user: { id: id } },
      relations: ['user', 'book'],
    });
    return {
      message: 'Request was successfull',
      data: borrowedBooks,
    };
  }

  async findOne(id: string) {
    const borrowedBook = await this.borrowBook.findOne({
      where: { id: id },
      relations: ['user', 'book'],
    });
    if (!borrowedBook) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Request successful',
      data: borrowedBook,
    };
  }

  async update(id: string, updateBorrowBookDto: UpdateBorrowBookDto) {
    const updateBook = await this.borrowBook.update(
      { id: id },
      {
        ...updateBorrowBookDto,
      },
    );

    return {
      message: 'Request successfull',
      data: updateBook,
    };
  }

  async remove(id: string) {
    const removeBorrowedBook = await this.borrowBook.delete({ id: id });
    return {
      message: 'Requst successfull',
      data: removeBorrowedBook,
    };
  }
}
