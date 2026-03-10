import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from '../../../application/app.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { FindOrderDto } from '../dto/find-order.dto';
import { OrderResponseDto } from '../dto/response-order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('orders')
  createOrder(@Body() createOrderDto: CreateOrderDto): OrderResponseDto {
    return this.appService.createOrder(createOrderDto);
  }

  @Get('orders/:id')
  findOrder(@Param() findOrderDto: FindOrderDto): OrderResponseDto {
    return this.appService.findOrder({ id: Number(findOrderDto.id) });
  }

  @Patch('orders/:id')
  updateOrder(
    @Param() findOrderDto: FindOrderDto,
    @Body() updateOrderDto: UpdateOrderDto
  ): OrderResponseDto {
    return this.appService.updateOrder({ id: Number(findOrderDto.id) }, updateOrderDto);
  }
}
