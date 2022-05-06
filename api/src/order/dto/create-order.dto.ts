import { IsArray, IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMenusOrdersDto } from './create-menus-orders.dto';
import { CreateProductsOrdersDto } from './create-products-orders.dto';

export class CreateOrderDto {
  @ApiPropertyOptional({ example: '2022-04-26T07:35:13.414Z', description: 'wanted delivery date' })
  @IsDateString()
  @IsOptional()
  public wantedDeliveryDate: Date;

  @ApiPropertyOptional({ example: 'without sugar', description: 'order comment' })
  @IsString()
  @IsOptional()
  public comment: string;

  @ApiProperty({ example: '2118 Thornridge Cir. Syracuse', description: 'order address' })
  @IsString()
  @IsUUID()
  public addressId: string;

  @ApiProperty({ type: [CreateProductsOrdersDto], description: 'ordered products' })
  @IsArray()
  public productsOrders: CreateProductsOrdersDto[];

  @ApiProperty({ type: [CreateMenusOrdersDto], description: 'ordered menus' })
  @IsArray()
  public menusOrders: CreateMenusOrdersDto[];
}
