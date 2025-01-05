import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '../config/notify.mongoose-options';
import { NotifyConfigModule } from '../config/notify-config.module';
import { EmailSubscriberModule } from '../email-subscriber/email-subscriber.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyConfigModule,
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
