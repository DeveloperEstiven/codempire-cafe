import bcrypt from 'bcrypt';

import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ERRORS } from 'src/constants/errors';
import { EXPIRE_JWT_TIME } from '../constants/etc';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  private async createToken(user: UserEntity) {
    const expiresIn = EXPIRE_JWT_TIME + Date.now();
    const data = { id: user.id, expiresIn };
    const secret = await this.createSecretString(user.publicKey);
    return this.jwtService.sign(data, { secret });
  }

  private async createSecretString(publicKey: string) {
    const secret = await this.configService.get('JWT_SECRET');
    return `${secret}${publicKey}`;
  }

  async signUp(userDto: CreateUserDto) {
    const candidate = this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(ERRORS.userAlreadyExist, HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    return this.createToken(user);
  }

  async signIn(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.createToken(user);
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const isPasswordsEqual = await bcrypt.compare(userDto.password, user.password);
    if (user && isPasswordsEqual) {
      return user;
    }
    throw new UnauthorizedException({ message: ERRORS.validationError });
  }
}
