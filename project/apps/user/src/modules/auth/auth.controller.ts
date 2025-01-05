import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { LoginUserDto } from '../../dto/login-user.dto';
import { MongoIdValidationPipe } from '@project/pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { fillDto } from '@project/helpers';
import { LoggedUserRdo } from '../../rdo/logged-user.rdo';
import { NotifyService } from '../notify/notify.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notifyService: NotifyService,
    ) { }

  // TODO: гарда - только незарегистрированным
  // DTO - почта*, имя*, пароль* (храним в захэшированном виде), аватар. Дата регистрации - автоматически в сущности при создании.
  // валидация - собрать и отправить все ошибки кучей, чтобы после сабмита фронт мог их отобразить
  // rdo - созданный пользователь (без пароля и даты), код 201
  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Новый пользователь успешно зарегистрирован'
  })
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    // TODO: Лучше не засорять контроллер и перенести это в сервис
    const { email, firstname, lastname } = newUser;
    await this.notifyService.registerSubscriber({ email, firstname, lastname });
    return newUser.toPOJO();
  }

  // TODO: гарда - только незарегистрированным
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const userToken = await this.authService.createUserToken(verifiedUser);
    return fillDto(LoggedUserRdo, { ...verifiedUser.toPOJO(), ...userToken });
  }


  /*
  Также:

  Смена пароля:
  @Patch, param id + body passwords (старый и новый, правила валидации смотри в ТЗ)

  + логаут

  */

  /*
  Ожидается тип number, но на самом деле придёт строка (как и любые другие получаемые параметры). Этот момент можно оптимизировать двумя способами (если этого не сделать, можно нарваться на ошибку, пытаясь сделать с пришедшими данными что-то характерное только для чисел)
  1) Через пайп прямо тут (см. ниже)
  2) Зарегистрировать `ValidationPipe` глобально и в объекте настроек передать свойство `transform: true`. Тогда пайп возьмёт на себе приведение параметров, исходя из его типа. То есть не придётся указывать для каждого параметра пайп с префиксом `Parse*`
  */
  @UseGuards(JwtAuthGuard)
  @Get('/demo/:id')
  // public async demoPipe(@Param('id', ParseIntPipe) id: number) {
  public async demoPipe(@Param('id') id: number) {
    console.log(typeof id);
  }

  // Лучше в модуль юзеров
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser.toPOJO();
  }


}
