import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { MenuEntity } from 'src/menu/entities/menu.entity';
import { OrderEntity } from './order.entity';

@Entity('menus_orders')
export class MenusOrdersEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => MenuEntity, (menu) => menu.menusOrders, { eager: true, onDelete: 'CASCADE' })
  public menu: MenuEntity;

  @ApiProperty({ example: 4, description: 'menus count' })
  @Column()
  public count: number;

  @ManyToOne(() => OrderEntity, (order: OrderEntity) => order.menusOrders, {
    onDelete: 'CASCADE',
  })
  public order: OrderEntity;
}
