import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from '../constants/errors';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  userSerializer(user: UserEntity) {
    const serializedUser = JSON.stringify(instanceToPlain(user));
    return plainToInstance(UserEntity, JSON.parse(serializedUser));
  }

  async getUserByColumn(body: Partial<UserEntity>, relations?: string[]) {
    const user = await this.userRepository.findOne({ where: body, relations });
    if (!user) {
      throw new HttpException(ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserById(body: { userId: string }) {
    return await this.userRepository.findOne(body.userId);
  }
}
