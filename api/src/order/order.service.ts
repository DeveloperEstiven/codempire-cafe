import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdDto } from 'src/dto/id.dto';
import { MenuEntity } from 'src/menu/entities/menu.entity';
import { MenusOrdersEntity } from 'src/order/entities/menus-orders.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateMenusOrdersDto } from './dto/create-menus-orders.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateProductsOrdersDto } from './dto/create-products-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductsOrdersEntity } from './entities/products-orders.entity';
import { ORDER_ERRORS } from './order.constants';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(MenusOrdersEntity) private readonly menusOrdersRepository: Repository<MenusOrdersEntity>,
    @InjectRepository(MenuEntity) private readonly menuRepository: Repository<MenuEntity>,
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductsOrdersEntity) private readonly productsOrdersRepository: Repository<ProductsOrdersEntity>
  ) {}

  async updateOrder(updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ id: updateOrderDto.id });
    if (!order) {
      throw new HttpException(ORDER_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    return this.orderRepository.save({
      ...order,
      ...updateOrderDto,
    });
  }

  async cancelOrder({ id }: IdDto) {
    const order = await this.orderRepository.findOne({ id });

    if (!order) {
      throw new HttpException(ORDER_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    await this.orderRepository.delete({ id });
    return {
      message: 'success',
    };
  }

  async addOrder(body: CreateOrderDto) {
    const user = await this.userRepository.findOne({ id: body.user });

    const productsOrders = await this.getProductsWithCount(body.productsOrders);
    const menusOrders = await this.getMenusWithCount(body.menusOrders);

    return this.orderRepository.save({
      ...body,
      user,
      menusOrders,
      productsOrders,
    });
  }

  async getProductsWithCount(body: CreateProductsOrdersDto[]) {
    const productsWithCount = await Promise.all(
      body.map(async ({ productId: id, ...rest }) => ({
        ...rest,
        product: await this.productRepository.findOne({ where: { id } }),
      }))
    );
    return this.productsOrdersRepository.save(productsWithCount);
  }

  async getMenusWithCount(body: CreateMenusOrdersDto[]) {
    const menusWithCount = await Promise.all(
      body.map(async ({ menuId: id, ...rest }) => ({
        ...rest,
        menu: await this.menuRepository.findOne({ where: { id } }),
      }))
    );
    return this.menusOrdersRepository.save(menusWithCount);
  }
}
