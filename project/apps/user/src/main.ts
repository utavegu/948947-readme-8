/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get('application.port');
  const globalPrefix = 'api';

  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalPipes(new ValidationPipe({
      transform: true,
    }));

  const userSpecConfig = new DocumentBuilder()
    .setTitle('User service API')
    .setDescription('Описание API для сервиса пользователей')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, userSpecConfig);
  SwaggerModule.setup('spec', app, documentFactory);

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
