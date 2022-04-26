import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ example: '2464 Royal Ln. Mesa, New Jersey 45463', description: 'User address' })
  @IsString()
  @IsNotEmpty()
  public address: string;

  @ApiProperty({ example: false, description: 'If address is active' })
  @IsBoolean()
  @IsNotEmpty()
  public isActive: boolean;
}
