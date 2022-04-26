import { IsBase64, IsOptional, IsPhoneNumber, IsString, IsUUID, MaxLength } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { ERRORS } from 'src/constants/errors';
import { EmailDto } from 'src/dto/email.dto';

export class UpdateUserDto extends EmailDto {
  @ApiPropertyOptional({ example: 'user', description: 'user name' })
  @IsString()
  @MaxLength(50)
  @IsOptional()
  readonly userName: string;

  @ApiPropertyOptional({ example: '+380 (95) 434 34 34', description: 'phone number' })
  @IsPhoneNumber('UA', { message: ERRORS.invalidPhoneNumber })
  @IsOptional()
  readonly phoneNumber: string;

  @ApiPropertyOptional({ example: '[id, id, ..]', description: 'user addresses ids', isArray: true })
  @IsUUID('all', { each: true })
  @IsOptional()
  readonly addressIds: string[];

  @ApiPropertyOptional({ example: 'b64 img', description: 'user logo' })
  @IsString()
  @IsBase64()
  @IsOptional()
  readonly logo: string;
}
