import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import { mongoDbConfig } from '@project/helpers';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
  UserRoleEnum
} from '@project/core';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from "../user/user.entity";
import { CreateUserDto } from "../../dto/create-user.dto";
import { LoginUserDto } from '../../dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(mongoDbConfig.KEY)
    private readonly mongoDatabaseConfig: ConfigType<typeof mongoDbConfig>,
    // или вариант 2, который лучше не юзать:
    // private readonly configService: ConfigService,
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

  public async getUser(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }
}
