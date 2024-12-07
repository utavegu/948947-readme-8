import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getMongoConnectionString } from './common';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('mongoDb.user'),
          password: config.get<string>('mongoDb.password'),
          host: config.get<string>('mongoDb.host'),
          port: config.get<string>('mongoDb.port'),
          authDatabase: config.get<string>('mongoDb.authBase'),
          databaseName: config.get<string>('mongoDb.name'),
        })
      }
    },
    inject: [ConfigService]
  }
}
