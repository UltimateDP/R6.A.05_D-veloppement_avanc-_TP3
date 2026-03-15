import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Alice' })
    name: string;

    @ApiProperty({ example: 'alice@test.com' })
    email: string;

    @ApiProperty({ example: 'admin' })
    role: string;
}