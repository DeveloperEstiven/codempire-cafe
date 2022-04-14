import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateIngredientDto {
  @ApiProperty({ example: 'Milk', description: 'ingredient name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'false', description: 'if ingredient is allergen', default: false })
  @IsBoolean()
  @IsOptional()
  readonly isAllergen: boolean;
}
