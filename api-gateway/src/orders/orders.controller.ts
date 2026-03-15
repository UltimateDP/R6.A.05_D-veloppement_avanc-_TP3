import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    getHello() {
        return this.ordersService.getHello();
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Récupérer une commande par ID' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiResponse({
        status: 200,
        description: 'Commande trouvée',
    })
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Créer une commande' })
    @ApiResponse({
        status: 201,
        description: 'Commande créée',
    })
    create(@Body() body: any) {
        return this.ordersService.create(body);
    }
}