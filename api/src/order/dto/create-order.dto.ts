import { IsArray, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DELIVERY_STATUS } from '../order.constants';
import { CreateMenusOrdersDto } from './create-menus-orders.dto';
import { CreateProductsOrdersDto } from './create-products-orders.dto';

export class CreateOrderDto {
  @ApiProperty({ example: 'on way', description: 'delivery status', enum: DELIVERY_STATUS })
  @IsEnum(DELIVERY_STATUS)
  public status: DELIVERY_STATUS = DELIVERY_STATUS.created;

  @ApiPropertyOptional({ example: '2022-04-26T07:35:13.414Z', description: 'wanted delivery date' })
  @IsDateString()
  @IsOptional()
  public wantedDeliveryDate: Date;

  @ApiPropertyOptional({ example: 'without sugar', description: 'order comment' })
  @IsString()
  @IsOptional()
  public comment: string;

  @ApiProperty({ type: [CreateProductsOrdersDto], description: 'ordered products' })
  @IsArray()
  public productsOrders: CreateProductsOrdersDto[];

  @ApiProperty({ type: [CreateMenusOrdersDto], description: 'ordered menus' })
  @IsArray()
  public menusOrders: CreateMenusOrdersDto[];
}
