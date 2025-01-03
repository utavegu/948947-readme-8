import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';
import { FileVaultConfigModule } from '../config/file-vault-config.module';
import { getMongooseOptions } from '../config/file-vault.mongoose-options';


// Вообще самым взрослым подходом считается S3, но сторадж в файловой системе или БД также имеют право на жизнь (в бд для этого надо читать отдельную документацию - как там хранить бинарники). И даже если брать текущую реализацию, всё равно было бы более взрослым решением раздавать файлы, например, через Nginx (или другой веб-сервер), а не через FileService
@Module({
  imports: [
    FileUploaderModule,
    FileVaultConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class FileAppModule {}

/*
Просто модуль, предоставляющий сервис для работы с файлами другим сервисам. Контроллер скорее всего вообще не понадобится, так как малтер цепляется к ручкам контроллера на создание целевого ресурса. Но настройки малтера тоже закинуть в этот модуль.
*/
