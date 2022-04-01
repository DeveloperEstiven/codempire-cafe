import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { USER_ROLES } from '../user.constants';

@Entity({ name: 'user' })
export class UserEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ description: 'publicKey' })
  @Column({ type: 'varchar', length: 30 })
  @Exclude()
  public publicKey: string;

  @ApiProperty({ example: 'User', description: 'username' })
  @Column({ type: 'varchar', length: 30 })
  public username: string;

  @ApiProperty({ example: 'user@codempire.team', description: 'user email' })
  @Column({ type: 'varchar', length: 30, unique: true })
  public email: string;

  @ApiProperty({ example: 'password', description: 'user password' })
  @Column({ type: 'varchar', length: 16 })
  @Exclude()
  public password: string;

  @ApiProperty({ example: '+3806525678', description: 'user phone number' })
  @Column({ type: 'varchar', length: 10, unique: true })
  public phoneNumber: string;

  @ApiProperty({ example: 'manager/user', description: 'role' })
  @Column({ type: 'enum', enum: USER_ROLES })
  public role: USER_ROLES;
}
