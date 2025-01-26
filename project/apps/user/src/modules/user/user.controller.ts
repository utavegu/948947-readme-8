import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IUser } from '@project/core';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

   // STATUS: Работает
   @Get('find-by-email')
   @UseGuards(JwtAuthGuard)
   // TODO: rdo в тип возвращаемого значения и его же в сваггер
   findByEmail(
     @Query('email') email: IUser['email']
   ) {
     return this.userService.findByEmail(email);
   }

  // STATUS: работает
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение данных о целевом пользователе' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Информация о пользователе успешно получена',
    type: UserEntity,
  })
  // TODO: rdo - дату регистрации, количество публикаций, количество подписчиков и айдишник.
  getUserInfoById(
    @Param('id') id: IUser['id']
  ) {
    return this.userService.getUserInfoById(id);
  }



  @Put()
  editUser() { }

  @Delete()
  deleteUser() { }
}
