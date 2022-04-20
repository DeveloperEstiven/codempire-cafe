import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;
}
