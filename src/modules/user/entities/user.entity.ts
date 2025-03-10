import { BorrowBook } from 'src/modules/borrow_books/entities/borrow_book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum UserRole {
  moderator = 'moderator',
  user = 'user',
}

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('enum', { default: UserRole.user, enum: UserRole })
  role: UserRole;

  @OneToMany(() => BorrowBook, (bookBorrowed) => bookBorrowed.user)
  borrowed_books: BorrowBook[];
}
