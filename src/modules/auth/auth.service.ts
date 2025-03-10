import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in-dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interface/payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(payload: Payload) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async create(createAuthDto: CreateAuthDto) {
    const userExist = await this.userService.findByEmail(createAuthDto.email);

    if (userExist) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }

    const hashPwd = await bcrypt.hash(createAuthDto.password, 10);

    createAuthDto.password = hashPwd;

    const createUser = await this.userService.create(createAuthDto);

    return {
      message: 'user created successfully',
      data: createUser,
    };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException('Invalid credential', HttpStatus.BAD_REQUEST);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credential', HttpStatus.BAD_REQUEST);
    }

    const token = await this.generateToken({ id: user.id, email: user.email });

    return {
      message: 'User signed in successfully',
      data: user,
      token: token,
    };
  }
}
