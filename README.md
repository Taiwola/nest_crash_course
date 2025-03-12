

# 📚 Notes & Textbook Borrowing System  

A library system that allows users to borrow and manage notes or textbooks, built using **NestJS**, **PostgreSQL**, and **TypeORM** with modular architecture and role-based access control.  

## 🚀 Features  

- 🏗 **Modular Architecture**: Follows NestJS best practices, with separate modules for **users, books, and borrowed books**.  
- 🔑 **Authentication & Authorization**: Implements **AuthGuard** and **RolesGuard** at the controller level for fine-grained access control.  
- 📖 **Notes & Textbooks Management**:  
  - **Users**: Borrow and return notes.  
  - **Moderators**: Add and remove notes from the system.  
- 👥 **User Roles**:  
  - **User** → Can borrow and return notes.  
  - **Moderator** → Can add, remove, and manage notes.  
- 🛢️ **PostgreSQL with TypeORM**: Used for efficient data management and relationships.  
- 📡 **RESTful API**: Provides endpoints for managing notes and users.  

## 🛠️ Technologies Used  

- **NestJS** - Scalable server-side application framework  
- **TypeScript** - Ensuring type safety  
- **PostgreSQL** - Relational database for storing user and book data  
- **TypeORM** - ORM for database interactions  
- **JWT Authentication** - Secure user authentication    

## 🏗 Project Structure  

```
📂 src  
 ┣ 📂 modules  
 ┃ ┣ 📂 users          # User management (user management)  
 ┃ ┣ 📂 auth          # auth management (Roles, Authentication)  
 ┃ ┣ 📂 books          # Books and Notes management  
 ┃ ┣ 📂 borrow_books   # Borrowing & returning books  
 ┣ 📂 common           # Shared utilities, DTOs, and decorators  
 ┣ 📜 main.ts          # Application entry point  
 ┗ 📜 app.module.ts    # Root module  
```

## 🛠 Installation  

1. Clone the repository:  
   ```sh
   git clone https://github.com/your-repo/borrowing-system.git
   cd borrowing-system
   ```

2. Install dependencies:  
   ```sh
   npm install
   ```

3. Configure environment variables in `.env`:
   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/library
   JWT_SECRET=your-secret-key
   ```

4. Run database migrations:  
   ```sh
   npm run typeorm migration:run
   ```

5. Start the application:  
   ```sh
   npm run start
   ```

## 🔑 Authentication & Authorization  

- **AuthGuard**: Protects routes from unauthorized users.  
- **RolesGuard**: Ensures only users with the correct role can access certain endpoints.  
- **Implementation**: Applied at **controller level** instead of globally for better control.  


## 🏛 Database Schema (TypeORM)  

### User Entity  

```ts
@Entity('users')
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
```

### Book Entity  

```ts
@Entity('books')
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
```

### Borrowed Books Entity  

```ts
@Entity('borrow_books')
export class BorrowBook {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.borrowBooks)
  user: User;

  @ManyToOne(() => Book, (book) => book.borrowBooks)
  book: Book;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dueDate: Date;

   @Column({
    type: 'enum',
    enum: BookBorrowStatus,
    default: BookBorrowStatus.borrowed,
  })
  status: BookBorrowStatus;
}
```

 

## ✍️ Author  

**Olantori Oluwaseun**  

