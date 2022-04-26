import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { MenusOrdersEntity } from 'src/order/entities/menus-orders.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import { MENU_ROUTES } from '../menu.constants';

@Entity(MENU_ROUTES.main)
export class MenuEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ example: 'Italian Evening', description: 'Name of menu' })
  @Column({ unique: true })
  public name: string;

  @ApiProperty({
    example: 'This combination of delicious italian salad, soup and steak will not leave you indifferent.',
    description: 'Menu description',
  })
  @Column()
  public description: string;

  @ApiProperty({ example: 'base64 string', description: 'Menu image base64' })
  @Column()
  public image: string;

  @ApiProperty({ example: '1200', description: 'Menu price' })
  @Column()
  public price: number;

  @ManyToOne(() => MenusOrdersEntity, (menusOrders) => menusOrders.menus)
  public menusOrders: MenusOrdersEntity;

  @ManyToMany(() => ProductEntity, (product) => product.menus)
  @JoinTable()
  public products: ProductEntity[];
}
