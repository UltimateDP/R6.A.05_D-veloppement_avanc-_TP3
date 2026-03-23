import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { OrderStatus } from '../../../domain/order-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({
        example: 1,
        description: 'ID de l’utilisateur',
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        example: 'PENDING',
        description: 'Statut de la commande',
    })
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;

    @ApiProperty({
        example: 99.99,
        description: 'Montant total',
    })
    @IsNumber()
    @IsNotEmpty()
    totalAmount: number;
}