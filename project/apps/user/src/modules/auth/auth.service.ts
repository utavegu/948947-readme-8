import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { ConfigType } from '@nestjs/config';
import { createJWTPayload, jwtConfig, mongoDbConfig } from '@project/helpers';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
  IUser,
  Token,
  TokenPayload,
  UserRoleEnum
} from '@project/core';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from "../user/user.entity";
import { CreateUserDto } from "../../dto/create-user.dto";
import { LoginUserDto } from '../../dto/login-user.dto';
import { NotifyService } from '../notify/notify.service';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    // @Inject(mongoDbConfig.KEY)
    // private readonly mongoDatabaseConfig: ConfigType<typeof mongoDbConfig>,
    // или вариант 2, который лучше не юзать:
    // private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly notifyService: NotifyService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    // Извлекаем настройки из конфигурации
    // console.log(mongoDatabaseConfig.host);
    // console.log(mongoDatabaseConfig.user);
    // А вот так лучше не надо (типизация мимо):
    // console.log(configService.get<string>('db.host'));
    // console.log(configService.get<string>('db.user'));
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  public async register(dto: CreateUserDto) {
    const { email, firstname, lastname, password, dateBirth } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const user = {
      email,
      firstname,
      lastname,
      role: UserRoleEnum.User,
      avatar: '',
      dateOfBirth: new Date(dateBirth),
      passwordHash: ''
    };

    const userEntity = await new UserEntity(user).setPassword(password)

    this.userRepository.save(userEntity);

    const { email: newUserEmail, firstname: newUserFirstname, lastname: newUserLastname } = userEntity;
    await this.notifyService.registerSubscriber({
      email: newUserEmail,
      firstname: newUserFirstname,
      lastname: newUserLastname
    });

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  // тут лишнее имхо
  // public async getUser(id: string) {
  //   const user = await this.userRepository.findById(id);

  //   if (!user) {
  //     throw new NotFoundException(AUTH_USER_NOT_FOUND);
  //   }

  //   return user;
  // }

  public async createUserToken(user: IUser): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Ладно, будь тут, раз используешься в стратегиях аутентификации
  public async getUserByEmail(email: string) {
    const existUser = await this.userRepository.findByEmail(email);

    if (! existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }
}
