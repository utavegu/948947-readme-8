import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploaderRepository } from './file-uploader.repository';
import { FileModel, FileSchema } from './file.model';
import { FileUploaderFactory } from './file-uploader.factory';

// Итого пример пути получения файла: http://localhost:3000/static/6_Takayuki-Harada_Cardinal-Sin.jpg
// http://localhost:3000/static/2025/01/4fc247a4-842a-455b-ae77-8dfb8c66040d.jpeg
const SERVE_ROOT = '/static';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('application.uploadDirectory');
        return [{
          rootPath,
          serveRoot: SERVE_ROOT,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      }
    }),
    MongooseModule.forFeature([
      { name: FileModel.name, schema: FileSchema }
    ])
  ],
  providers: [
    FileUploaderService,
    FileUploaderRepository,
    FileUploaderFactory,
  ],
  controllers: [FileUploaderController],
})
export class FileUploaderModule {}

/*
* `rootPath` — путь к директории со статичными файлами;
* `serveRoot` — задаёт корневую директорию статических файлов. По умолчание в настройке пустая строка. Это означает, что для получения статического файла необходимо обратиться к корневому маршруту сервиса: `http://localhost:3000/file.txt`. Чтобы задать дополнительный сегмент, например, `static`, и предназначена опция `serveRoot`.

Помимо основных настроек мы можем задать дополнительные. Их следует перечислить в ключе `serveStaticOptions`. Мы укажем две, но их больше. Список поддерживаемых настроек:

* `etag` — включает или отключает отправку заголовка ETag в ответ на запросы к статическим файлам. Значение по умолчанию - `true`.

* `lastModified` — включает или отключает отправку заголовка Last-Modified в ответ на запросы к статическим файлам. Значение по умолчанию - true.

* `maxAge` — устанавливает время жизни кэша для статических файлов, выраженное в миллисекундах. Значение по умолчанию - 0 (кэширование отключено).

* `immutable` — включает или отключает отправку заголовка `Cache-Control: immutable`, который указывает на то, что статический файл никогда не будет изменен. Это позволяет клиентам кэшировать файлы более длительное время. Значение по умолчанию - `false`.

* `index` - имя файла, который должен использоваться в качестве индексного при запросе к корневой папке. Например, если установить `index` в 'index.html', то при запросе к корневой папке будет отображаться файл `index.html`. Значение по умолчанию - `false` (отключено).

* `redirect` — включает или отключает перенаправление при запросе к директории. Если установлено значение `true`, то при запросе к директории будет перенаправление на соответствующий URL с добавлением /. Значение по умолчанию - `false`.

* `setHeaders - функция для установки пользовательских заголовков в ответ на запросы к статическим файлам. Функция принимает два аргумента: `res` - объект `http.ServerResponse`, и `path` - строка, указывающая на путь к запрашиваемому файлу.

* `fallthrough` — должен ли сервер продолжать обработку запроса, если статический файл не найден. Если свойство установлено в `true`, то сервер продолжит обработку запроса и передаст его следующему обработчику маршрута. Если свойство установлено в `false`, то сервер вернет ответ с ошибкой `404`.
*/
