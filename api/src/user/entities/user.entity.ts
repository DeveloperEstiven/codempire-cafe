import { Exclude } from 'class-transformer';
import { IsBase64, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { USER_ROLES } from '../user.constants';

@Entity({ name: 'user' })
export class UserEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ example: '$2b$06$AfdgGJEMzmOPZR0rFJXpu', description: 'publicKey' })
  @Column()
  @Exclude()
  public publicKey: string;

  @ApiProperty({ example: 'User', description: 'user name' })
  @Column()
  public userName: string;

  @ApiProperty({ example: 'user@codempire.team', description: 'user email' })
  @Column({ unique: true })
  public email: string;

  @ApiProperty({ example: 'password', description: 'user password' })
  @Column()
  @Exclude()
  public password: string;

  @ApiProperty({ example: '+380 (95) 434 34 34', description: 'user phone number' })
  @Column({ unique: true })
  public phoneNumber: string;

  @ApiProperty({ example: 'manager/user', description: 'role', default: USER_ROLES.user })
  @Column({ type: 'enum', enum: USER_ROLES, default: USER_ROLES.user })
  public role: USER_ROLES;

  @ApiProperty({ example: 'base64 string', description: 'Menu image base64', default: null, nullable: true })
  @Column({ nullable: true, default: null })
  @IsOptional()
  @IsBase64()
  public image: string;
}
