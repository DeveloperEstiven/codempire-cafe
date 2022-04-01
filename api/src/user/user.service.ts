import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async userSerializer(user: UserEntity) {
    const serializedUser = JSON.stringify(instanceToPlain(user));

    return plainToInstance(UserEntity, JSON.parse(serializedUser));
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async getUserById(body: { userId: string }) {
    return await this.userRepository.findOne(body.userId);
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.save(dto);
    return user;
  }
}
