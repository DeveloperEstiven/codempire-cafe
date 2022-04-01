import { ApiProperty } from '@nestjs/swagger';

import { USER_ROLES } from '../user.constants';

export class CreateUserDto {
  @ApiProperty({ example: 'user', description: 'username' })
  readonly username: string;

  @ApiProperty({ example: 'user@codempire.team', description: 'email' })
  readonly email: string;

  @ApiProperty({ example: '12341', description: 'password' })
  readonly password: string;

  @ApiProperty({ example: '3809932932', description: 'phone number' })
  readonly phoneNumber: string;

  @ApiProperty({ example: 'admin', description: 'role (admin/user)' })
  readonly role: USER_ROLES;
}
