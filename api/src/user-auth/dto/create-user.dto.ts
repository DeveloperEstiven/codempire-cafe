import { IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ERRORS } from '../../constants/errors';
import { AuthUserDto } from './auth-user.dto';

export class CreateUserDto extends AuthUserDto {
  @ApiProperty({ example: 'user', description: 'user name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  readonly userName: string;

  @ApiProperty({ example: '+380 (95) 434 34 34', description: 'phone number' })
  @IsPhoneNumber('UA', { message: ERRORS.invalidPhoneNumber })
  readonly phoneNumber: string;
}
