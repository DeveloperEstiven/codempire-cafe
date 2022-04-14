import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity } from './entities/ingredient.entity';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';

@Module({
  controllers: [IngredientController],
  providers: [IngredientService],
  imports: [TypeOrmModule.forFeature([IngredientEntity])],
})
export class IngredientModule {}
