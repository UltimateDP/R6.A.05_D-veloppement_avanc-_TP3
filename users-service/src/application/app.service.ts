import { Injectable } from '@nestjs/common';
import { UserResponseDto } from '../adapter/in/dto/reponse-user.dto';
import { CreateUserDto } from '../adapter/in/dto/create-user.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserDto: CreateUserDto): UserResponseDto {
    return {
      id: 1,
      email: createUserDto.email,
      name: createUserDto.name,
    };
  }

  findUser(findUserDto: { id: number }): UserResponseDto {
    return {
      id: Number(findUserDto.id),
      email: "test@example.com",  
      name: "Test User",
    };
  }
  
  updateUser(findUserDto: { id: number }, updateUserDto: CreateUserDto): UserResponseDto {
    return {
      id: Number(findUserDto.id),
      email: updateUserDto.email,
      name: updateUserDto.name,
    };
  }  
}
