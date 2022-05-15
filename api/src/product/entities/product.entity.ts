import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { ProductsOrdersEntity } from 'src/order/entities/products-orders.entity';
import { IngredientEntity } from '../../ingredient/entities/ingredient.entity';
import { MenuEntity } from '../../menu/entities/menu.entity';
import { PRODUCT_CATEGORY, PRODUCT_ROUTES } from '../product.constants';

@Entity({ name: PRODUCT_ROUTES.main })
export class ProductEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ example: 'Chicken Noodle Soup', description: 'Name of product' })
  @Column({ unique: true })
  public name: string;

  @ApiProperty({
    example:
      'The combination of savory pork meatballs and bitter greens in this hearty dish does indeed taste like true love....',
    description: 'Product description',
  })
  @Column()
  public description: string;

  @ApiProperty({ example: 'base64 string', description: 'Menu image base64' })
  @Column()
  public image: string;

  @ApiProperty({ example: 'drink', description: 'Product category', enum: PRODUCT_CATEGORY })
  @Column({ type: 'enum', enum: PRODUCT_CATEGORY })
  public category: PRODUCT_CATEGORY;

  @ApiProperty({ example: 'pizza', description: 'Product type (subcategory)' })
  @Column()
  public subcategory: string;

  @ApiProperty({ example: '150', description: 'Product price' })
  @Column()
  public price: number;

  @ApiProperty({ example: '300g', description: 'Product weight' })
  @Column()
  public weight: string;

  @OneToMany(() => ProductsOrdersEntity, (productsOrders) => productsOrders.product)
  public productsOrders: ProductsOrdersEntity[];

  @ManyToMany(() => IngredientEntity, (ingredient) => ingredient.products)
  @JoinTable()
  public ingredients: IngredientEntity[];

  @ManyToMany(() => MenuEntity, (menu) => menu.products, {
    onDelete: 'CASCADE',
  })
  public menus: MenuEntity[];
}
