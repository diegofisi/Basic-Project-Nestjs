import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':dni')
  findOne(@Param('dni') dni: string) {
    return this.usersService.findOne(dni);
  }

  @Patch(':dni')
  update(@Param('dni') dni: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(dni, updateUserDto);
  }

  @Delete(':dni')
  remove(@Param('dni') dni: string) {
    return this.usersService.remove(dni);
  }
}
