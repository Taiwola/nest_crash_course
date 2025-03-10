import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.UserRepository.create({
      ...createUserDto,
    });
    return {
      message: 'Request successfull',
      data: user,
    };
  }

  async findByEmail(email: string) {
    const user = await this.UserRepository.findOne({ where: { email: email } });
    return user;
  }

  async findAll() {
    const users = await this.UserRepository.find({
      relations: ['borrowed_books'],
    });
    return {
      message: 'Request successfull',
      daat: users,
    };
  }

  async findOne(id: string) {
    const user = await this.UserRepository.findOne({
      where: { id: id },
      relations: ['borrowed_books'],
    });
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Request successfull',
      data: user,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.UserRepository.update(
      { id: id },
      { ...updateUserDto },
    );
    return {
      message: 'Request successfull',
      data: user,
    };
  }

  async remove(id: string) {
    const user = await this.UserRepository.delete({ id: id });
    return {
      message: 'Request successfull',
      data: user,
    };
  }
}
