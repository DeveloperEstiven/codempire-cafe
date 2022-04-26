import { Exclude } from 'class-transformer';
import { IsBase64, IsOptional } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressEntity } from 'src/address/entities/address.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { USER_ROLES, USER_ROUTES } from '../user.constants';

@Entity(USER_ROUTES.main)
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

  @OneToMany(() => AddressEntity, (address) => address.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public addresses: AddressEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  public orders: OrderEntity[];

  @ApiPropertyOptional({ example: 'b64 img', description: 'user logo' })
  @IsOptional()
  @IsBase64()
  @Column({ nullable: true, default: null })
  public logo: string;
}
