import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
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
import { OnlyGuestGuard } from './guards/only-guest.guard';
import { AuthenticationResponseMessage } from 'libs/shared/core/src/lib/constants';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './typespaces/request-with-user.interface';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  // TODO: гарда - только незарегистрированным
  // DTO - почта*, имя*, пароль* (храним в захэшированном виде), аватар. Дата регистрации - автоматически в сущности при создании.
  // валидация - собрать и отправить все ошибки кучей, чтобы после сабмита фронт мог их отобразить
  // rdo - созданный пользователь (без пароля и даты), код 201
  // STATUS: работает (айдишник сам собой заработал, интересно)
  @Post('register')
  @UseGuards(JwtAuthGuard)
  @UseGuards(OnlyGuestGuard)
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Новый пользователь успешно зарегистрирован'
  })
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    // лучше это делать красиво через интерфейсы и не в контроллере, но сейчас этого делать не буду
    const finallyUser = newUser.toPOJO();
    delete finallyUser.passwordHash;

    return finallyUser;
  }

  // TODO: гарда - только незарегистрированным
  // STATUS: работает
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
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
  // STATUS: работает
  @UseGuards(JwtAuthGuard)
  @Get('/demo/:id')
  // public async demoPipe(@Param('id', ParseIntPipe) id: number) {
  public async demoPipe(@Param('id') id: number) {
    console.log(typeof id);

    return 'Ура, вы преодолели Гарда!'
  }

  // Лучше в модуль юзеров
  // STATUS: работает
  // @Get('/show-must-go-one/:id')
  // public async show(@Param('id', MongoIdValidationPipe) id: string) {
  //   const existUser = await this.authService.getUser(id);

  //   // лучше это делать красиво через интерфейсы и не в контроллере, но сейчас этого делать не буду
  //   const finallyUser = existUser.toPOJO();
  //   delete finallyUser.passwordHash;

  //   return existUser.toPOJO();
  // }

  // STATUS: работает
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }


}
