import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ example: 'drink', description: 'Product category' })
  @Column({ type: 'enum', enum: PRODUCT_CATEGORY })
  public category: PRODUCT_CATEGORY;

  @ApiProperty({ example: 'pizza', description: 'Product type (subcategory)' })
  @Column()
  public subcategory: string;

  @ApiProperty({ example: '150uah', description: 'Product price' })
  @Column()
  public price: string;

  @ApiProperty({ example: '300g', description: 'Product weight' })
  @Column()
  public weight: string;

  @ManyToMany(() => IngredientEntity, (ingredient) => ingredient.products)
  @JoinTable()
  public ingredients: IngredientEntity[];

  @ManyToMany(() => MenuEntity, (menu: MenuEntity) => menu.products)
  public menus: MenuEntity[];
}