import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/helpers';
import { MailModule } from '../mail-module/mail.module';
import { EmailSubscriberController } from './email-subscriber.controller';

// Нотификейшены

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
    // Проблема тут (хм... а если запустить только один композ и 1 сервис - всё ок. Видимо, проблема в этом)
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule,
  ],
  controllers: [
    EmailSubscriberController,
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    EmailSubscriberFactory,
  ]
})
export class EmailSubscriberModule {}
