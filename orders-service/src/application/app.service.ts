import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderResponseDto } from '../adapter/in/dto/response-order.dto';
import { CreateOrderDto } from '../adapter/in/dto/create-order.dto';
import { OrderStatus } from '../domain/order-status.enum';

@Injectable()
export class AppService {

  createOrder(createOrderDto: CreateOrderDto): OrderResponseDto {
    return {
      id: 1,
      userId: createOrderDto.userId,
      status: createOrderDto.status,
      totalAmount: createOrderDto.totalAmount,
      createdAt: new Date(),
    };
  }

  findOrder(findOrderDto: { id: number }): OrderResponseDto {
    return {
      id: Number(findOrderDto.id),
      userId: 1,
      status: OrderStatus.PENDING,
      totalAmount: 100,
      createdAt: new Date(),
    };
  }
  
  updateOrder(findOrderDto: { id: number }, updateOrderDto: CreateOrderDto): OrderResponseDto {
    // Règle métier: impossible de passer à SHIPPED sans être PAID
    if (updateOrderDto.status === OrderStatus.SHIPPED && findOrderDto.id) {
      const currentOrder = this.findOrder(findOrderDto);
      if (currentOrder.status !== OrderStatus.PAID) {
        throw new BadRequestException(
          `Cannot ship order ${findOrderDto.id}. Order must be PAID before shipping.`,
        );
      }
    }

    return {
      id: Number(findOrderDto.id),
      userId: updateOrderDto.userId,
      status: updateOrderDto.status,
      totalAmount: updateOrderDto.totalAmount,
      createdAt: new Date(),
    };
  }
}
