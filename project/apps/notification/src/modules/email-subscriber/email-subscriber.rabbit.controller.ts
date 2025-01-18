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

LOG [RabbitMQModule] Initializing RabbitMQ Handlers
LOG [RabbitMQModule] Searching for RabbitMQ Handlers in Controllers. You can not use NestJS HTTP-Requests in these controllers!
LOG [RabbitMQModule] Registering rabbitmq handlers from EmailSubscriberController
LOG [RabbitMQModule] EmailSubscriberController.create {subscribe} -> typoteka.notify.income::notify.addSubscriber::typoteka.notify.income
LOG [AmqpConnection] Successfully connected to RabbitMQ broker (default)
LOG [AmqpConnection] Successfully connected a RabbitMQ channel "AmqpConnection"
*/

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  // Работает, кроме того, что написал ниже
  @RabbitSubscribe({
    exchange: 'typoteka.notify.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'typoteka.notify.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    // console.log('Прилетело из модуля юзеров:');
    // console.log(subscriber);
    this.subscriberService.addSubscriber(subscriber);
    /*
    Тут валит ошибку, пока закомментирую. Разобраться позже

    Error: connect ECONNREFUSED 127.0.0.1:25
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1595:16)

    Process exited with code 1, waiting for changes to restart...

    Чтобы хотя бы не клал бэк - завернул пока в трай-кэтч. И это второй интересный момент, почему не отрабатывает глобальный перехват ошибки и позволяет серверу упасть - тоже разобраться.
    */
    // this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}
