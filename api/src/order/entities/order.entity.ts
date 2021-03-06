import { IsPositive } from 'class-validator';
import {
    Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressEntity } from 'src/address/entities/address.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { DELIVERY_STATUS, ORDER_ROUTES } from '../order.constants';
import { MenusOrdersEntity } from './menus-orders.entity';
import { ProductsOrdersEntity } from './products-orders.entity';

@Entity(ORDER_ROUTES.main)
export class OrderEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ example: 1843, description: 'order number' })
  @PrimaryGeneratedColumn('increment')
  public orderNumber: number;

  @ApiProperty({ example: '2022-04-26T07:05:31.620Z', description: 'order date' })
  @CreateDateColumn({ type: 'timestamptz' })
  public date: Date;

  @ApiProperty({ example: '2022-04-26T07:35:13.414Z', description: 'wanted delivery date' })
  @CreateDateColumn({ type: 'timestamptz' })
  public wantedDeliveryDate: Date;

  @ApiProperty({
    example: 'on way',
    description: 'delivery status',
    enum: DELIVERY_STATUS,
    default: DELIVERY_STATUS.created,
  })
  @Column({ type: 'enum', enum: DELIVERY_STATUS, default: DELIVERY_STATUS.created })
  public status: DELIVERY_STATUS;

  @ApiProperty({ example: 1200, description: 'order price' })
  @Column()
  @IsPositive()
  public price: number;

  @ApiPropertyOptional({ example: 'without sugar', description: 'order comment' })
  @Column({ default: '' })
  public comment: string;

  @ApiPropertyOptional({ example: 'tasty food', description: "user's feedback" })
  @Column({ default: '' })
  public customerFeedback: string;

  @ApiPropertyOptional({ example: 3.5, description: 'order rating' })
  @Column({ nullable: true, default: null })
  public rating: number;

  @ApiPropertyOptional({ example: true, description: 'if order is viewed by user in notifications' })
  @Column({ default: false, type: Boolean })
  public isViewedByUser: boolean;

  @ApiPropertyOptional({ example: true, description: 'if order is viewed by manager in notifications' })
  @Column({ default: false, type: Boolean })
  public isViewedByManager: boolean;

  @ManyToOne(() => AddressEntity, (address) => address.orders)
  public address: AddressEntity;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  public user: UserEntity;

  @OneToMany(() => ProductsOrdersEntity, (productOrder) => productOrder.order)
  public productsOrders: ProductsOrdersEntity[];

  @OneToMany(() => MenusOrdersEntity, (menuOrder) => menuOrder.order)
  public menusOrders: MenusOrdersEntity[];
}
