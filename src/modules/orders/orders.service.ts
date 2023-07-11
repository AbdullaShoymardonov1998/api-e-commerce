import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma.service';
import { CreateOrdersDto } from './dto/create-orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}
  async createOrders(orderDetails: CreateOrdersDto) {
    const product = await this.prisma.products.findFirst({
      where: {
        id: orderDetails.productId,
      },
    });

    if (!product) {
      throw new HttpException('Product Id not found', HttpStatus.NOT_FOUND);
    }

    const updatedQuantity = product.quantity - orderDetails.quantity;

    if (updatedQuantity < 0) {
      throw new HttpException(
        'Quantity is inefficient',
        HttpStatus.BAD_REQUEST,
      );
    }

    const order = await this.prisma.orders.create({
      data: {
        product: {
          connect: {
            id: orderDetails.productId,
          },
        },
        quantity: orderDetails.quantity,
      },
    });

    await this.prisma.products.update({
      where: {
        id: orderDetails.productId,
      },
      data: {
        quantity: updatedQuantity,
      },
    });

    return {
      message: 'Success',
      data: order,
    };
  }
}
