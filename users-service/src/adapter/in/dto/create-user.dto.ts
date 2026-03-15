import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'Alice',
        description: 'Nom de l’utilisateur',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'alice@test.com',
        description: 'Email de l’utilisateur',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'secret123',
        description: 'Mot de passe',
    })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        example: 'admin',
        description: 'Rôle utilisateur',
    })
    @IsString()
    role: string;
}
