import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getData() {
    return this.userService.getData();
  }

  @Post()
  createUser() { }

  @Get()
  getAllUsers() { }

  @Get()
  getUserById() { }

  @Put()
  editUser() { }

  @Delete()
  deleteUser() { }
}
