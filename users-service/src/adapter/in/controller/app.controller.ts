import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from '../../../application/app.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UserResponseDto } from '../dto/reponse-user.dto';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): UserResponseDto {
    return this.appService.createUser(createUserDto);
  }

  @Get(':id')
  findUser(@Param() findUserDto: FindUserDto): UserResponseDto {
    return this.appService.findUser({ id: Number(findUserDto.id) });
  }

  @Patch(':id')
  updateUser(
    @Param() findUserDto: FindUserDto,
    @Body() updateUserDto: UpdateUserDto,
  ): UserResponseDto {
    return this.appService.updateUser({ id: Number(findUserDto.id) }, updateUserDto);
  }
}