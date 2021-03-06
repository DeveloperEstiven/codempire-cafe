import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity } from '../ingredient/entities/ingredient.entity';
import { MenuEntity } from '../menu/entities/menu.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [TypeOrmModule.forFeature([ProductEntity, IngredientEntity, MenuEntity])],
})
export class ProductModule {}
