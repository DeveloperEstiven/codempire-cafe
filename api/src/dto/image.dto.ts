import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
  @ApiProperty()
  b64Image: string;
}
