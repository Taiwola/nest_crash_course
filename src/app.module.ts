import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { typeormConfigAsync } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './modules/books/books.module';
import { BorrowBooksModule } from './modules/borrow_books/borrow_books.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync(typeormConfigAsync),
    BooksModule,
    BorrowBooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
