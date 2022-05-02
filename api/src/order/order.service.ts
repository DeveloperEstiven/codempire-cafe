import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from 'src/constants/errors';
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

  async getOrders(userTokenId: string) {
    const orders = await this.orderRepository.find({
      where: { user: userTokenId },
      relations: ['productsOrders', 'menusOrders'],
      order: {
        orderNumber: 'DESC',
      },
    });
    console.log('🛑 ~ OrderService ~ orders', orders);

    const ordersWithDescriptions = orders.map((order) => {
      const newOrder = {
        ...order,
        description:
          order.productsOrders.map((productOrder) => productOrder?.product?.description).join(', ') +
          ', ' +
          order.menusOrders.map((menuOrder) => menuOrder?.menu?.description).join(', '),
      };
      delete newOrder.productsOrders;
      delete newOrder.menusOrders;
      return newOrder;
    });

    return ordersWithDescriptions;
  }

  async getDetailOrder(userTokenId: string, orderNumber: number) {
    return this.orderRepository.findOne({
      where: { user: userTokenId, orderNumber },
      relations: ['productsOrders', 'menusOrders'],
    });
  }

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

  async cancelOrder(orderId: string, userTokenId: string) {
    const order = await this.orderRepository.findOne({ id: orderId });
    if (!order) {
      throw new HttpException(ORDER_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    const userOrder = await this.orderRepository.findOne({ where: { user: userTokenId } });
    if (!userOrder) {
      throw new HttpException(ERRORS.tokenError, HttpStatus.FORBIDDEN);
    }
    await this.orderRepository.delete({ id: orderId });
    return {
      message: 'success',
    };
  }

  async addOrder(body: CreateOrderDto, userTokenId: string) {
    const user = await this.userRepository.findOne({ id: userTokenId });

    const productsOrders = await this.getProductsWithCount(body.productsOrders);
    const menusOrders = await this.getMenusWithCount(body.menusOrders);

    const menusTotalPrice = menusOrders.reduce((prev, curr) => prev + curr.count * curr.menu.price, 0);
    const productsTotalPrice = productsOrders.reduce((prev, curr) => prev + curr.count * curr.product.price, 0);

    return this.orderRepository.save({
      ...body,
      user,
      price: menusTotalPrice + productsTotalPrice,
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
