import { IsPositive, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateProductsOrdersDto {
  @ApiProperty({ example: 4, description: 'menu order count' })
  @IsPositive()
  public count: number;

  @ApiProperty({ example: 4, description: 'product id' })
  @IsUUID()
  public productId: string;
}
