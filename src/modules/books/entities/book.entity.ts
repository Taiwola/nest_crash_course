import { BorrowBook } from 'src/modules/borrow_books/entities/borrow_book.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

export enum BookStatus {
  borrowed = 'borrowed',
  free = 'free',
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  cover_page: string;

  @Column()
  book_link: string;

  @Column({ type: 'enum', enum: BookStatus, default: BookStatus.free })
  status: BookStatus;

  @ManyToMany(() => BorrowBook)
  @JoinTable()
  book: BorrowBook[];
}
