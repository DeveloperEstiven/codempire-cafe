import { In, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesDto } from 'src/dto/addresses.dto';
import { ADDRESS_ERRORS } from './address.constants';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(@InjectRepository(AddressEntity) private readonly addressRepository: Repository<AddressEntity>) {}

  async addAddress({ addresses }: AddressesDto) {
    const candidate = await this.addressRepository.find({
      where: {
        address: In(addresses),
      },
    });

    if (candidate.length) {
      throw new HttpException(ADDRESS_ERRORS.alreadyExist, HttpStatus.CONFLICT);
    }
    return this.addressRepository.save(addresses);
  }
}
