import {
    Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user';
import { IdDto } from 'src/dto/id.dto';
import JwtAuthenticationGuard from 'src/guards/auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { ORDER_ERRORS, ORDER_ROUTES } from './order.constants';
import { OrderService } from './order.service';

@ApiTags(ORDER_ROUTES.main)
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
  addOrder(@Body() body: CreateOrderDto, @User('id') userTokenId: string) {
    return this.orderService.addOrder(body, userTokenId);
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
    type: [OrderEntity],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ORDER_ERRORS.notFound,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  cancelOrder(@Body() body: IdDto, @User('id') userTokenId: string) {
    return this.orderService.cancelOrder(body.id, userTokenId);
  }

  @Get(ORDER_ROUTES.getOrders)
  @ApiOperation({ summary: ORDER_ROUTES.getOrders })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ORDER_ROUTES.getOrders,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  getOrders(@User('id') userTokenId: string) {
    return this.orderService.getOrders(userTokenId);
  }

  @Get(ORDER_ROUTES.getCompleted)
  @ApiOperation({ summary: ORDER_ROUTES.getCompleted })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ORDER_ROUTES.getCompleted,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  getCompleted(@User('id') userTokenId: string) {
    return this.orderService.getCompleted(userTokenId);
  }

  @Get(`${ORDER_ROUTES.getOrders}/:num`)
  @ApiOperation({ summary: ORDER_ROUTES.getOrders })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ORDER_ROUTES.getOrders,
    type: OrderEntity,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  getDetailOrder(@User('id') userTokenId: string, @Param('num') orderNumber: string) {
    return this.orderService.getDetailOrder(userTokenId, +orderNumber);
  }
}
