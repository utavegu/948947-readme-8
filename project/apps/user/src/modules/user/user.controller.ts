import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IUser } from '@project/core';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get(':id')
  @ApiOperation({ summary: 'Получение данных о целевом пользователе' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Информация о пользователе успешно получена',
    type: UserEntity,
  })
  // TODO: rdo - дату регистрации, количество публикаций, количество подписчиков и айдишник.
  getUserInfoById(
    @Param('id') id: IUser['id']
  ): Promise<UserEntity> { // почему промис-то только? Он должен ещё на уровне сервиса резолвится, сделай потом как надо, когда базу прикрутишь. И вообще не ентити, а рдо
    return this.userService.getUserInfoById(id);
  }

  @Get('find-by-email')
  // TODO: rdo в тип возвращаемого значения и его же в сваггер
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
