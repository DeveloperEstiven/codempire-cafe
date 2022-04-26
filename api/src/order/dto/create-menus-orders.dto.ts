import { IsPositive, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMenusOrdersDto {
  @ApiProperty({ example: 4, description: 'menus order count' })
  @IsPositive()
  public count: number;

  @ApiProperty({ example: 4, description: 'menu id' })
  @IsUUID()
  public menuId: string;
}
