import { IsBase64, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ example: 'Italian Evening', description: 'Name of menu' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    example: 'This combination of delicious italian salad, soup and steak will not leave you indifferent.',
    description: 'Menu description',
  })
  @IsString()
  public description: string;

  @ApiProperty({ example: 'base64 string', description: 'Menu image base64' })
  @IsBase64()
  public image: string;

  @ApiProperty({ example: '1200uah', description: 'Menu price' })
  @IsNotEmpty()
  public price: string;
}
