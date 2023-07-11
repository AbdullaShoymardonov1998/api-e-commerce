import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma.service';
import { CreateProductsDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllProducts() {
    return this.prisma.products.findMany();
  }

  async createProducts(productDetails: CreateProductsDto) {
    return this.prisma.products.create({
      data: {
        productName: productDetails.name,
        price: productDetails.price,
        quantity: productDetails.quantity,
      },
    });
  }
}
