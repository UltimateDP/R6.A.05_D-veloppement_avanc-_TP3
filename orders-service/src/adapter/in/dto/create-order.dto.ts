import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { OrderStatus } from '../../../domain/order-status.enum';

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;

    @IsNumber()
    @IsNotEmpty()
    totalAmount: number;
}
