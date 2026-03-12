import { OrderStatus } from '../../../domain/order-status.enum';

export class OrderResponseDto {
    id: number;
    userId: number;
    status: OrderStatus;
    totalAmount: number;
    createdAt: Date;
}
