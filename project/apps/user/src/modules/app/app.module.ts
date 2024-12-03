import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

/*
1.1. Регистрация новых пользователей.
1.2. Авторизация пользователей на основе JWT.
1.18. Получение детальной информации о пользователе.
1.19. Смена пароля пользователя.

? - 1.16. Рассылка почтовых уведомлений на email о появлении новых публикаций.
? - 1.20. Подписка на обновления других пользователей.
*/
