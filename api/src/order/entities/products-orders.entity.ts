import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../../product/entities/product.entity';
import { OrderEntity } from './order.entity';

@Entity('products_orders')
export class ProductsOrdersEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ example: 4, description: 'products count' })
  @Column()
  public count: number;

  @ManyToOne(() => ProductEntity, (product) => product.productsOrders, { eager: true, onDelete: 'CASCADE' })
  public product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order: OrderEntity) => order.productsOrders, {
    onDelete: 'CASCADE',
  })
  public order: OrderEntity;
}
