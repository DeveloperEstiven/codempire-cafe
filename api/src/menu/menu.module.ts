import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../product/entities/product.entity';
import { MenuEntity } from './entities/menu.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [TypeOrmModule.forFeature([MenuEntity, ProductEntity])],
})
export class MenuModule {}
