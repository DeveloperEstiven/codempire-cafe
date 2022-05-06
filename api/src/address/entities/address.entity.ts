import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { OrderEntity } from 'src/order/entities/order.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ADDRESS_ROUTES } from '../address.constants';

@Entity(ADDRESS_ROUTES.main)
export class AddressEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ example: '2464 Royal Ln. Mesa, New Jersey 45463', description: 'User address' })
  @Column()
  public address: string;

  @ApiProperty({ example: false, description: 'If address is active' })
  @Column()
  public isActive: boolean;

  @ManyToOne(() => UserEntity, (user) => user.addresses, { onDelete: 'CASCADE' })
  public user: UserEntity;

  @OneToMany(() => OrderEntity, (order) => order.address)
  public orders: OrderEntity[];
}
