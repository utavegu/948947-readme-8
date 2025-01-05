import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/helpers';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotifyModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAccessStrategy,
  ],
})
export class AuthModule { }
