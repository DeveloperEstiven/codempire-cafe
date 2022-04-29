import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user';
import { AddressesDto } from 'src/dto/addresses.dto';
import JwtAuthenticationGuard from 'src/guards/auth.guard';
import { ADDRESS_ERRORS, ADDRESS_ROUTES } from './address.constants';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';

@ApiTags(ADDRESS_ROUTES.main)
@Controller(ADDRESS_ROUTES.main)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(ADDRESS_ROUTES.addAddress)
  @ApiOperation({ summary: ADDRESS_ROUTES.addAddress })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ADDRESS_ROUTES.addAddress,
    type: [AddressEntity],
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ADDRESS_ERRORS.alreadyExist,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthenticationGuard)
  addAddress(@Body() body: AddressesDto, @User('id') userTokenId: string) {
    return this.addressService.addAddress(body, userTokenId);
  }
}
