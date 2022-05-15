import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { ORDER, SORT } from 'src/constants/enums';
import { PageOptionsDto } from './page-options.dto';

export class FilterDto extends PageOptionsDto {
  @ApiPropertyOptional({ isArray: true })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  readonly subcategories: string[] = [];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly term: string = '';

  @ApiPropertyOptional()
  @IsEnum(SORT)
  @IsOptional()
  @IsString()
  readonly field?: SORT;

  @IsEnum(ORDER)
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly order?: ORDER = ORDER.ASC;
}
