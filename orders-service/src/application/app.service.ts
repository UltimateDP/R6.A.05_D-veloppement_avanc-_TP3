import { Injectable } from '@nestjs/common';
import { OrderResponseDto } from '../adapter/in/dto/response-order.dto';
import { CreateOrderDto } from '../adapter/in/dto/create-order.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

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
      status: "pending",
      totalAmount: 100,
      createdAt: new Date(),
    };
  }
  
  updateOrder(findOrderDto: { id: number }, updateOrderDto: CreateOrderDto): OrderResponseDto {
    return {
      id: Number(findOrderDto.id),
      userId: updateOrderDto.userId,
      status: updateOrderDto.status,
      totalAmount: updateOrderDto.totalAmount,
      createdAt: new Date(),
    };
  }
}
