import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateOrdersDto {
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Order quantity', example: 12 })
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product ID', example: 'uuid' })
  productId: string;
}
