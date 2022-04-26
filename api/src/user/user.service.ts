import * as bcrypt from 'bcrypt';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/address/entities/address.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { USER_ERRORS } from './user.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AddressEntity) private readonly addressesRepository: Repository<AddressEntity>
  ) {}

  userSerializer(user: UserEntity) {
    const serializedUser = JSON.stringify(instanceToPlain(user));
    return plainToInstance(UserEntity, JSON.parse(serializedUser));
  }

  async getUserByColumnOrFail(body: Partial<UserEntity>, relations?: string[]) {
    const user = await this.userRepository.findOne({ where: body, relations });
    if (!user) {
      throw new HttpException(USER_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(body: UpdateUserDto, userTokenId: string) {
    const { email, phoneNumber, addressIds } = body;
    const user = await this.getUserByColumnOrFail({ id: userTokenId });

    const candidateByEmail = await this.userRepository.findOne({ email });
    const candidateByPhoneNumber = await this.userRepository.findOne({ phoneNumber });

    if (
      (candidateByEmail && candidateByEmail?.id !== userTokenId) ||
      (candidateByPhoneNumber && candidateByPhoneNumber?.id !== userTokenId)
    ) {
      throw new HttpException(USER_ERRORS.alreadyExists, HttpStatus.CONFLICT);
    }

    const addresses = await this.addressesRepository.findByIds(addressIds);
    const updatedUser = this.userSerializer({ ...user, ...body, id: userTokenId, addresses });
    return this.userRepository.save(updatedUser);
  }

  async changePassword(body: ChangePasswordDto, userTokenId: string) {
    const user = await this.getUserByColumnOrFail({ id: userTokenId });
    const isOldPasswordsEqual = await bcrypt.compare(body.oldPassword, user.password);
    if (!isOldPasswordsEqual) {
      throw new HttpException(USER_ERRORS.invalidOldPassword, HttpStatus.CONFLICT);
    }
    const hashPassword = await bcrypt.hash(body.newPassword, 10);
    const updatedUser = await this.userRepository.save({
      ...user,
      id: userTokenId,
      password: hashPassword,
    });
    return this.userSerializer(updatedUser);
  }
}
