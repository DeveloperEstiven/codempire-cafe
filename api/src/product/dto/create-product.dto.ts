import { IsBase64, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { PRODUCT_CATEGORY } from '../product.constants';

export class CreateProductDto {
  @ApiProperty({ example: 'Chicken Noodle Soup', description: 'Name of product' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    example:
      'The combination of savory pork meatballs and bitter greens in this hearty dish does indeed taste like true love....',
    description: 'Product description',
  })
  @IsString()
  public description: string;

  @ApiProperty({ example: 'base64 string', description: 'Menu image base64' })
  @IsOptional()
  @IsBase64()
  public image: string;

  @ApiProperty({ example: 'drink', description: 'Product category', enum: PRODUCT_CATEGORY, type: 'enum' })
  @IsNotEmpty()
  public category: PRODUCT_CATEGORY;

  @ApiProperty({ example: 'pizza', description: 'Product type (subcategory)' })
  public subcategory: string;

  @ApiProperty({ example: '150uah', description: 'Product price' })
  @IsNotEmpty()
  public price: string;

  @ApiProperty({ example: '300g', description: 'Product weight' })
  public weight: string;
}
