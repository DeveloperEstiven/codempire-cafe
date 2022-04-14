import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientEntity } from './entities/ingredient.entity';

import { INGREDIENT_ERRORS } from './ingredient.constants';

@Injectable()
export class IngredientService {
  @InjectRepository(IngredientEntity) private readonly ingredientRepository: Repository<IngredientEntity>;

  async addIngredient(createIngredientDto: CreateIngredientDto) {
    const { name } = createIngredientDto;
    const ingredient = await this.ingredientRepository.findOne({ name });
    if (ingredient) {
      throw new HttpException(INGREDIENT_ERRORS.alreadyExist, HttpStatus.CONFLICT);
    }
    return this.ingredientRepository.save(createIngredientDto);
  }

  async removeIngredient(id: string) {
    const ingredient = await this.ingredientRepository.findOne({ id });
    if (!ingredient) {
      throw new HttpException(INGREDIENT_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    await this.ingredientRepository.delete({ id });
    return {
      message: 'success',
    };
  }
}
