import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/helpers';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { UserConfigModule } from '../config/user-config.module';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    UserConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

/*
1.1. Регистрация новых пользователей (auth)
1.2. Авторизация пользователей на основе JWT (auth)
1.18. Получение детальной информации о пользователе (user)
1.19. Смена пароля пользователя (auth)

? - 1.16. Рассылка почтовых уведомлений на email о появлении новых публикаций.
? - 1.20. Подписка на обновления других пользователей.
*/
