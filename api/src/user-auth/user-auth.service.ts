import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from 'src/constants/errors';
import { EXPIRE_JWT_TIME } from '../constants/etc';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

  private async createPublicKey() {
    return await bcrypt.genSalt(6);
  }

  private async createSecretString(publicKey: string) {
    const secret = await this.configService.get('JWT_SECRET');
    return `${secret}${publicKey}`;
  }

  async signUp(userDto: CreateUserDto) {
    const email = userDto.email.toLowerCase();
    const candidateByEmail = await this.userRepository.findOne({ where: { email } });
    const candidateByPhoneNumber = await this.userRepository.findOne({ where: { phoneNumber: userDto.phoneNumber } });
    if (candidateByEmail || candidateByPhoneNumber) {
      throw new HttpException(ERRORS.userAlreadyExist, HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 10);
    const publicKey = await this.createPublicKey();
    const user = await this.userRepository.save({
      ...userDto,
      email,
      publicKey,
      password: hashPassword,
    });
    return {
      user: this.userService.userSerializer(user),
      token: await this.createToken(user),
    };
  }

  async logIn(userDto: AuthUserDto) {
    const user = await this.validateUser(userDto);
    const newPublicKey = await this.createPublicKey();
    const updatedUser = await this.userRepository.save({
      ...user,
      publicKey: newPublicKey,
    });
    return {
      user: this.userService.userSerializer(updatedUser),
      token: await this.createToken(updatedUser),
    };
  }

  async logOut(id: string) {
    const user = await this.userService.getUserByColumn({ id });
    const newPublicKey = await this.createPublicKey();
    await this.userRepository.save({
      ...user,
      publicKey: newPublicKey,
    });
    return {
      message: 'success',
    };
  }

  private async validateUser(userDto: AuthUserDto) {
    const email = userDto.email.toLowerCase();
    const user = await this.userService.getUserByColumn({ email });
    const isPasswordsEqual = await bcrypt.compare(userDto.password, user.password);

    if (user && isPasswordsEqual) {
      return user;
    }
    throw new UnauthorizedException({ message: ERRORS.validationError });
  }
}
