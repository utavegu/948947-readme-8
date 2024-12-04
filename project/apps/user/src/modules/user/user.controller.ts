import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from '@project/core';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get(':id')
  // TODO: rdo - дату регистрации, количество публикаций, количество подписчиков и айдишник.
  getUserInfoById(
    @Param('id') id: IUser['id']
  ) {
    return this.userService.getUserInfoById(id);
  }

  @Get('find-by-email')
  findByEmail(
    @Query('email') email: IUser['email']
  ) {
     return this.userService.findByEmail(email);
  }

  @Put()
  editUser() { }

  @Delete()
  deleteUser() { }
}
