import { Book } from 'src/modules/books/entities/book.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

export enum BookBorrowStatus {
  borrowed = 'borrowed',
  returned = 'returned',
}

@Entity()
export class BorrowBook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: BookBorrowStatus,
    default: BookBorrowStatus.borrowed,
  })
  status: BookBorrowStatus;

  @ManyToOne(() => User, (user) => user.borrowed_books)
  user: User;

  @ManyToMany(() => Book)
  @JoinTable()
  book: Book[];
}
