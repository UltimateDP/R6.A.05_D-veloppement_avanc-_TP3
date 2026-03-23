import { Body, Controller, Headers, Post, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Créer un utilisateur' })
    @ApiResponse({ status: 201, description: 'Utilisateur créé' })
    create(
        @Body() body: any,
        @Headers('authorization') authorization?: string,
    ) {
        return this.usersService.create(body, authorization);
    }

    @Post('login')
    @ApiOperation({ summary: 'Connexion utilisateur' })
    @ApiResponse({ status: 200, description: 'Connexion réussie' })
    login(@Body() body: { email: string; password: string }) {
        return this.usersService.login(body);
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiResponse({ status: 200, description: 'Utilisateur trouvé' })
    findUser(
        @Param('id') id: string,
        @Headers('authorization') authorization?: string,
    ) {
        return this.usersService.find(id, authorization);
    }

    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiResponse({ status: 200, description: 'Utilisateur mis à jour' })
    updateUser(
        @Param('id') id: string,
        @Body() body: any,
        @Headers('authorization') authorization?: string,
    ) {
        return this.usersService.update(id, body, authorization);
    }
}