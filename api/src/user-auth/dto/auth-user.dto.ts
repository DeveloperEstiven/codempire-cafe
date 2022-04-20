import { IsString, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { EmailDto } from 'src/dto/email.dto';

export class AuthUserDto extends EmailDto {
  @ApiProperty({ example: 'qwertyui@1', description: 'password' })
  @Length(8, 30)
  @IsString()
  readonly password: string;
}
