import 'multer';
import { Express } from 'express';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileUploaderService } from './file-uploader.service';

// Не думаю, честно говоря, что нужен контроллер для файлов. Скорее перехватчик файла весить на нужные ручки контроллеров, где нужно передать картинку, и там в сервисах уже дергать сервис файла. Возможно, переделаю.
@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileUploaderService.saveFile(file);
  }
}
