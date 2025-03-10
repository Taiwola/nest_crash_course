import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BorrowBooksService } from './borrow_books.service';
import { CreateBorrowBookDto } from './dto/create-borrow_book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow_book.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { Request } from 'express';

@Controller('borrow-books')
@Auth()
export class BorrowBooksController {
  constructor(private readonly borrowBooksService: BorrowBooksService) {}

  @Post('id')
  async create(
    @Body() createBorrowBookDto: CreateBorrowBookDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    return await this.borrowBooksService.borrow(createBorrowBookDto, id, req);
  }

  @Get()
  async findAll() {
    return await this.borrowBooksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.borrowBooksService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBorrowBookDto: UpdateBorrowBookDto,
  ) {
    return await this.borrowBooksService.update(id, updateBorrowBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.borrowBooksService.remove(id);
  }
}
