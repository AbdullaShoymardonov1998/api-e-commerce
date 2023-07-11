import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-product.dto';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllProducts() {
    return this.productsService.getAllProducts();
  }
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ description: 'Create products' })
  createProducts(@Body() productsData: CreateProductsDto) {
    return this.productsService.createProducts(productsData);
  }
}
