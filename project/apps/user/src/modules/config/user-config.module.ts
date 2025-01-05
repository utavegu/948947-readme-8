import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { applicationConfig, jwtConfig, mongoDbConfig } from '@project/helpers';
import rabbitConfig from './rabbit.config';

const ENV_USERS_FILE_PATH = 'apps/user/user.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        applicationConfig,
        mongoDbConfig,
        jwtConfig,
        rabbitConfig,
      ],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class UserConfigModule {}
