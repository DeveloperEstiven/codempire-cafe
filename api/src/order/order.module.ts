import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from 'src/menu/entities/menu.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { MenusOrdersEntity } from './entities/menus-orders.entity';
import { OrderEntity } from './entities/order.entity';
import { ProductsOrdersEntity } from './entities/products-orders.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      UserEntity,
      MenusOrdersEntity,
      ProductsOrdersEntity,
      MenuEntity,
      ProductEntity,
    ]),
  ],
})
export class OrderModule {}
