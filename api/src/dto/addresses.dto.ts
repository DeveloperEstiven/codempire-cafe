import { IsArray } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from '../address/dto/create-address.dto';

export class AddressesDto {
  @ApiProperty({ type: [CreateAddressDto], description: 'user addresses' })
  @IsArray()
  readonly addresses: CreateAddressDto[];
}
