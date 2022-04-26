import { IsString, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'old password', description: 'old password' })
  @IsString()
  @Length(8, 30)
  readonly oldPassword: string;

  @ApiProperty({ example: 'new password', description: 'new password' })
  @IsString()
  @Length(8, 30)
  readonly newPassword: string;
}
