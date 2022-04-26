import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { OrderEntity } from 'src/order/entities/order.entity';

export class UpdateOrderDto extends PartialType(OrderEntity) {
  @ApiProperty({ description: 'id' })
  @IsString()
  @IsNotEmpty()
  public id: string;
}
