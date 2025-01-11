import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitRouting } from '@project/core';

import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import rabbitConfig from '../config/rabbit.config';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    // TODO: Вообще не должен ругаться, разобраться. Мэй би в новой версии такая печаль.
    // @ts-ignore
    return this.rabbitClient.publish<CreateSubscriberDto>(
      // Error: Channel closed by server: 404 (NOT-FOUND) with message "NOT_FOUND - no exchange 'typoteka.notify' in vhost '/'
      // this.rabbiOptions.exchange, // TODO: видимо тут нужно очередь указывать, а не обменник - поразбирайся
      this.rabbiOptions.queue,
      RabbitRouting.AddSubscriber,
      { ...dto }
    );
  }
}
