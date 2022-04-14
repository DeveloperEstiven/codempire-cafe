import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../../product/entities/product.entity';

import { INGREDIENT_ROUTES } from '../ingredient.constants';

@Entity({ name: INGREDIENT_ROUTES.main })
export class IngredientEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ example: 'Milk', description: 'ingredient name' })
  @Column({ unique: true })
  public name: string;

  @ApiProperty({ example: 'false', description: 'if ingredient is allergen', default: false })
  @Column({ default: false })
  public isAllergen: boolean;

  @ManyToMany(() => ProductEntity, (product) => product.ingredients)
  public products: ProductEntity[];
}
