import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from '../../../application/app.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UserResponseDto } from '../dto/reponse-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('users')
  createUser(@Body() createUserDto: CreateUserDto): UserResponseDto {
    return this.appService.createUser(createUserDto);
  }

  @Get('users/:id')
  findUser(@Param() findUserDto: FindUserDto): UserResponseDto {
    return this.appService.findUser({ id: Number(findUserDto.id) });
  }

  @Patch('users/:id')
  updateUser(
    @Param() findUserDto: FindUserDto,
    @Body() updateUserDto: UpdateUserDto
  ): UserResponseDto {
    return this.appService.updateUser({ id: Number(findUserDto.id) }, updateUserDto);
  }
}
