import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}
  async create(createBookDto: CreateBookDto) {
    const book = await this.bookRepository.create({
      ...createBookDto,
    });
    return book;
  }

  async findAll(query: any) {
    const books = await this.bookRepository.find(query);
    return books;
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOne({ where: { id: id } });
    if (!book) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Request was successful',
      data: book,
    };
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.update(
      { id: id },
      {
        ...updateBookDto,
      },
    );

    return {
      message: 'Request successfull',
      data: book,
    };
  }

  async remove(id: string) {
    const book = await this.bookRepository.delete({ id: id });
    return {
      message: 'Request successfull',
      data: book,
    };
  }
}
