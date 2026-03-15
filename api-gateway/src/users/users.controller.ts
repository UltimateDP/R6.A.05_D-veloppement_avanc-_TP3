import { Body, Controller, Headers, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getHello() {
        return this.usersService.getHello();
    }

    @ApiOperation({ summary: 'Créer un utilisateur' })
    @ApiResponse({ status: 201, description: 'Utilisateur créé' })
    @ApiResponse({ status: 400, description: 'Données invalides' })
    @Post()
    create(
        @Body() body: any,
        @Headers('authorization') authorization?: string,
    ) {
        return this.usersService.create(body, authorization);
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiResponse({ status: 200, description: 'Utilisateur trouvé' })
    @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
    findUser(@Param() params) {
        return this.usersService.find(params);
    }
}