import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientEntity } from './entities/ingredient.entity';
import { INGREDIENT_ERRORS } from './ingredient.constants';

@Injectable()
export class IngredientService {
  @InjectRepository(IngredientEntity) private readonly ingredientRepository: Repository<IngredientEntity>;
  @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>;

  async addIngredient(createIngredientDto: CreateIngredientDto) {
    const { name } = createIngredientDto;
    const ingredient = await this.ingredientRepository.findOne({ name });
    if (ingredient) {
      throw new HttpException(INGREDIENT_ERRORS.alreadyExist, HttpStatus.CONFLICT);
    }
    return this.ingredientRepository.save(createIngredientDto);
  }

  async getIngredientByIdOrFail(id: string) {
    const ingredient = await this.ingredientRepository.findOne({ id });
    if (!ingredient) {
      throw new HttpException(INGREDIENT_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    return ingredient;
  }

  async checkIngredientContains(id: string, checkExists = true) {
    checkExists && (await this.getIngredientByIdOrFail(id));

    const products = await this.productRepository.find({ relations: ['ingredients'] });
    const productsWithIngredient: ProductEntity[] = [];
    products.forEach((product) => {
      const x = product.ingredients?.filter((product) => product.id === id);
      x.length && productsWithIngredient.push(product);
    });

    return productsWithIngredient;
  }

  async removeIngredient(id: string) {
    await this.getIngredientByIdOrFail(id);

    const productsWithIngredient = await this.checkIngredientContains(id, false);

    const emptyProductsWithIngredientIds = productsWithIngredient
      .filter((product) => product.ingredients.length === 1)
      .map((product) => product.id);

    emptyProductsWithIngredientIds.length && (await this.productRepository.delete(emptyProductsWithIngredientIds));

    await this.ingredientRepository.delete({ id });
    return {
      message: 'success',
    };
  }
}
