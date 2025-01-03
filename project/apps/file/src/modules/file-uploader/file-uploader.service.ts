import 'multer';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { format } from "date-fns";
import { extension } from 'mime-types';
// возьми в привычку добавлять "node:" к именам пакетов ноды. Доступно только в относительно новых версиях ноды. И лучше вообще настрой на это линтер.
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import FileVaultConfig from '../config/file-vault.config';
import { StoredFile } from './types/stored-file.interface';
import { FileUploaderRepository } from './file-uploader.repository';
import { FileUploaderEntity } from './file-uploader.entity';
import { FileUploaderFactory } from './file-uploader.factory';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);
  private readonly DATE_FORMAT = 'yyyy MM';

  constructor(
    @Inject(FileVaultConfig.KEY)
    private readonly config: ConfigType<typeof FileVaultConfig>,
    private readonly fileRepository: FileUploaderRepository,
  ) {}

  private getUploadDirectoryPath(): string {
    return this.config.uploadDirectory;
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), this.getSubUploadDirectoryPath(), filename);
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month] = format(new Date(), this.DATE_FORMAT).split(' ');
    return join(year, month);
  }

  // а вот тут я Express не импортирую, но после установки типов для малтера перестал ругаться
  public async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const subDirectory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype);
      const filename = `${randomUUID()}.${fileExtension}`;

      const path = this.getDestinationFilePath(filename);

      // проверяет наличие директории и если её нет (или вложенных директорий), то создаёт
      await ensureDir(join(uploadDirectoryPath, subDirectory));
      await writeFile(path, file.buffer);

      return {
        fileExtension,
        filename,
        path,
        subDirectory,
      };
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<FileUploaderEntity> {
    const storedFile = await this.writeFile(file);
    const fileEntity = new FileUploaderFactory().create({
      hashName: storedFile.filename,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: storedFile.path,
      size: file.size,
      subDirectory: storedFile.subDirectory,
      createdAt: undefined,
      updatedAt: undefined,
    });

    await this.fileRepository.save(fileEntity);
    return fileEntity;
  }

  public async getFile(fileId: string): Promise<FileUploaderEntity> {
    const existFile = await this.fileRepository.findById(fileId);

    if (! existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }
}
