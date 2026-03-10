import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsNumber()
    @IsNotEmpty()
    totalAmount: number;
}
