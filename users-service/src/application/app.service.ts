import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponseDto } from '../adapter/in/dto/reponse-user.dto';
import { CreateUserDto } from '../adapter/in/dto/create-user.dto';

type StoredUser = UserResponseDto & { password: string };

@Injectable()
export class AppService {
  private readonly users: StoredUser[] = [
    {
      id: 1,
      email: 'alice@test.com',
      name: 'Alice',
      password: 'secret123',
      role: 'user',
    },
  ];

  createUser(createUserDto: CreateUserDto): UserResponseDto {
    const user: StoredUser = {
      id: this.users.length + 1,
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password,
      role: createUserDto.role,
    };

    this.users.push(user);

    return this.toResponse(user);
  }

  findUser(findUserDto: { id: number }): UserResponseDto {
    const user = this.users.find((storedUser) => storedUser.id === Number(findUserDto.id));

    if (!user) {
      throw new NotFoundException(`User ${findUserDto.id} not found`);
    }

    return this.toResponse(user);
  }
  
  updateUser(findUserDto: { id: number }, updateUserDto: CreateUserDto): UserResponseDto {
    const userIndex = this.users.findIndex(
      (storedUser) => storedUser.id === Number(findUserDto.id),
    );

    if (userIndex === -1) {
      throw new NotFoundException(`User ${findUserDto.id} not found`);
    }

    const updatedUser: StoredUser = {
      email: updateUserDto.email,
      id: Number(findUserDto.id),
      name: updateUserDto.name,
      password: updateUserDto.password,
      role: updateUserDto.role,
    };

    this.users[userIndex] = updatedUser;

    return this.toResponse(updatedUser);
  }

  findByEmail(email: string): StoredUser | undefined {
    return this.users.find((user) => user.email === email);
  }

  private toResponse(user: StoredUser): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }  
}
