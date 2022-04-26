import { Body, Controller, HttpCode, HttpStatus, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdDto } from 'src/dto/id.dto';
import JwtAuthenticationGuard from 'src/guards/auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { ORDER_ERRORS, ORDER_ROUTES } from './order.constants';
import { OrderService } from './order.service';

@Controller(ORDER_ROUTES.main)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(ORDER_ROUTES.addOrder)
  @ApiOperation({ summary: ORDER_ROUTES.addOrder })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ORDER_ROUTES.addOrder,
    type: OrderEntity,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthenticationGuard)
  addOrder(@Body() body: CreateOrderDto) {
    return this.orderService.addOrder(body);
  }

  @Put(ORDER_ROUTES.updateOrder)
  @ApiOperation({ summary: ORDER_ROUTES.updateOrder })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ORDER_ROUTES.updateOrder,
    type: OrderEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ORDER_ERRORS.notFound,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(updateOrderDto);
  }

  @Post(ORDER_ROUTES.cancelOrder)
  @ApiOperation({ summary: ORDER_ROUTES.cancelOrder })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ORDER_ROUTES.cancelOrder,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ORDER_ERRORS.notFound,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  cancelOrder(@Body() body: IdDto) {
    return this.orderService.cancelOrder(body);
  }
}
