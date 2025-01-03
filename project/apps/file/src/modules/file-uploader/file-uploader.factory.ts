import { Injectable } from '@nestjs/common';
import { IEntityFactory } from '@project/core';
import { File }from './types/file.interface'
import { FileUploaderEntity } from './file-uploader.entity';

@Injectable()
export class FileUploaderFactory implements IEntityFactory<FileUploaderEntity> {
  public create(entityPlainData: File): FileUploaderEntity {
    return new FileUploaderEntity(entityPlainData);
  }
}
