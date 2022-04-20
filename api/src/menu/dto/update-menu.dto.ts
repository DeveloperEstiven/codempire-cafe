import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @ApiProperty({ description: 'id' })
  @IsString()
  @IsNotEmpty()
  public id: string;
}
