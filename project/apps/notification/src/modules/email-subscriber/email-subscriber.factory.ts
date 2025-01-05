import { Injectable } from '@nestjs/common';

import { Subscriber, IEntityFactory } from '@project/core';
import { EmailSubscriberEntity } from './email-subscriber.entity';

@Injectable()
export class EmailSubscriberFactory implements IEntityFactory<EmailSubscriberEntity> {
  public create(entityPlainData: Subscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity(entityPlainData);
  }
}
