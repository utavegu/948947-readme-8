import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@project/core';
import { MailService } from '../mail-module/mail.service';

/*
Контроллер `EmailSubscriberController` выглядит не как обычно. Да, здесь
по-прежнему используется декоратор `@Controller`, но теперь этот контроллер
не обрабатывает HTTP-запросы. Он следит за появлением новых сообщений
в очереди `typoteka.notify.income`. Здесь применяет паттерн взаимодействия с Rabbit — pub/sub.
*/

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'typoteka.notify.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'typoteka.notify.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}
