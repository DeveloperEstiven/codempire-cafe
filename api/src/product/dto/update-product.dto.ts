import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ description: 'id' })
  @IsString()
  @IsNotEmpty()
  public id: string;
}
