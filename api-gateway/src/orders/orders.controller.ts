import { Body, Controller, Get, Param, Post, Patch, Headers } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Récupérer une commande par ID' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiResponse({ status: 200, description: 'Commande trouvée' })
    findOne(
        @Param('id') id: string,
        @Headers('authorization') authorization?: string,
    ) {
        return this.ordersService.findOne(id, authorization);
    }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Créer une commande' })
    @ApiResponse({ status: 201, description: 'Commande créée' })
    create(
        @Body() body: any,
        @Headers('authorization') authorization?: string,
    ) {
        return this.ordersService.create(body, authorization);
    }

    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Mettre à jour une commande' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiResponse({ status: 200, description: 'Commande mise à jour' })
    update(
        @Param('id') id: string,
        @Body() body: any,
        @Headers('authorization') authorization?: string,
    ) {
        return this.ordersService.update(id, body, authorization);
    }
}