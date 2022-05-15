import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/address/entities/address.entity';
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
    @InjectRepository(ProductsOrdersEntity) private readonly productsOrdersRepository: Repository<ProductsOrdersEntity>,
    @InjectRepository(AddressEntity) private readonly addressRepository: Repository<AddressEntity>
  ) {}

  getOrdersWithDescription(orders: OrderEntity[]) {
    return orders.map((order) => {
      const productsDescription = order.productsOrders.map((productOrder) => productOrder?.product?.description);
      const menusDescription = order.menusOrders.map((menuOrder) => menuOrder?.menu?.description);
      const description = [...menusDescription, ...productsDescription].join(', ');

      const newOrder = {
        ...order,
        description,
      };
      delete newOrder.productsOrders;
      delete newOrder.menusOrders;
      return newOrder;
    });
  }

  async getOrders(userTokenId: string) {
    const orders = await this.orderRepository.find({
      where: { user: userTokenId },
      relations: ['productsOrders', 'menusOrders'],
      order: {
        orderNumber: 'DESC',
      },
    });

    return this.getOrdersWithDescription(orders);
  }

  async getAllOrders() {
    const orders = await this.orderRepository.find({
      relations: ['productsOrders', 'menusOrders'],
      order: {
        orderNumber: 'DESC',
      },
    });

    return this.getOrdersWithDescription(orders);
  }

  async getCompleted(userTokenId: string) {
    const orders = await this.orderRepository.find({
      where: { user: userTokenId, status: 'delivered' },
      order: {
        orderNumber: 'DESC',
      },
    });

    return orders;
  }

  async getDetailOrder(userTokenId: string, orderNumber: number) {
    const order = await this.orderRepository.findOne({
      where: { user: userTokenId, orderNumber },
      relations: ['productsOrders', 'menusOrders', 'address', 'user'],
    });
    if (!order) {
      throw new HttpException(ORDER_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async getManagerDetailOrder(orderNumber: number) {
    const order = await this.orderRepository.findOne({
      where: { orderNumber },
      relations: ['productsOrders', 'menusOrders', 'address', 'user'],
    });
    if (!order) {
      throw new HttpException(ORDER_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    return order;
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
    const address = await this.addressRepository.findOne({ id: body.addressId, user });

    if (!address) {
      throw new HttpException(ORDER_ERRORS.addressNotFound, HttpStatus.NOT_FOUND);
    }

    const productsOrders = await this.getProductsWithCount(body.productsOrders);
    const menusOrders = await this.getMenusWithCount(body.menusOrders);

    const menusTotalPrice = menusOrders.reduce((prev, curr) => prev + curr.count * curr.menu.price, 0);
    const productsTotalPrice = productsOrders.reduce((prev, curr) => prev + curr.count * curr.product.price, 0);

    return this.orderRepository.save({
      ...body,
      address,
      price: menusTotalPrice + productsTotalPrice,
      menusOrders,
      productsOrders,
      user,
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
