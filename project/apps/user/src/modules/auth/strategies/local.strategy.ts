import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';

import { IUser } from '@project/core';

import { AuthService } from '../auth.service';

const USERNAME_FIELD_NAME = 'email';
const strategyConfig = {
  // По умолчанию стратегия ожидает логин из поля login, но тут используется другое, потому переопределяем его
  usernameField: USERNAME_FIELD_NAME
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(strategyConfig);
  }

  public async validate(email: string, password: string): Promise<IUser> {
    return this.authService.verifyUser({ email, password })
  }
}
