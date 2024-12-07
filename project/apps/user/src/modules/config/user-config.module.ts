import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { applicationConfig, mongoDbConfig } from '@project/helpers';

const ENV_USERS_FILE_PATH = 'apps/user/user.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        applicationConfig,
        mongoDbConfig
      ],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class UserConfigModule {}
