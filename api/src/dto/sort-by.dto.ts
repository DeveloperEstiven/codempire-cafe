import { IsEnum, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ORDER, SORT } from '../constants/enums';

export class SortByDto {
  @ApiProperty()
  @IsEnum(SORT)
  @IsOptional()
  readonly field?: SORT;

  @IsEnum(ORDER)
  @IsOptional()
  readonly order?: ORDER = ORDER.ASC;
}
