import { In, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesDto } from 'src/dto/addresses.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { ADDRESS_ERRORS } from './address.constants';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity) private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  async addAddress({ addresses }: AddressesDto, userTokenId: string) {
    const user = await this.userRepository.findOne({ id: userTokenId });

    const candidate = await this.addressRepository.find({
      where: {
        address: In(addresses),
      },
    });

    if (candidate.length) {
      throw new HttpException(ADDRESS_ERRORS.alreadyExist, HttpStatus.CONFLICT);
    }

    const addressesEntities = await this.addressRepository.save(addresses);
    await this.userRepository.save({ ...user, addresses: addressesEntities });
    return addressesEntities;
  }
}
