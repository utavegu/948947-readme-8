import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { LoginUserDto } from '../../dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // TODO: гарда - только незарегистрированным
  // DTO - почта*, имя*, пароль* (храним в захэшированном виде), аватар. Дата регистрации - автоматически в сущности при создании.
  // валидация - собрать и отправить все ошибки кучей, чтобы после сабмита фронт мог их отобразить
  // rdo - созданный пользователь (без пароля и даты), код 201
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return newUser.toPOJO();
  }

  // TODO: гарда - только незарегистрированным
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return verifiedUser.toPOJO();
  }

  // Так, это зачем вообще и почему тут? Да, по логике это должно быть не тут "Пользователь может запросить детальную информацию по определенному пользователю". А возвращает - дату регистрации, количество публикаций, количество подписчиков и айдишник. Если я правильно понял
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser.toPOJO();
  }

  /*
  Также:

  Смена пароля:
  @Patch, param id + body passwords (старый и новый, правила валидации смотри в ТЗ)

  */


}
