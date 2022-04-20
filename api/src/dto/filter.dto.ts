import { IsArray, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { SortByDto } from './sort-by.dto';

export class FilterDto {
  @ApiProperty({ isArray: true })
  @IsArray()
  @IsOptional()
  readonly subcategories: string[] = [];

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly term: string = '';

  @ApiProperty()
  @IsOptional()
  readonly sort?: SortByDto;
}
