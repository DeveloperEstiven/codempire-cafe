import { IsEmail, IsString, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({ example: 'user@codempire.team', description: 'email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwertyui@1', description: 'password' })
  @Length(8, 30)
  @IsString()
  readonly password: string;
}
