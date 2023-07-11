import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductsDto {
  @IsString()
  @ApiProperty({ description: 'Product name', example: 'Product-10' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product price', example: 2.25 })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product quantity', example: 25 })
  quantity: number;
}