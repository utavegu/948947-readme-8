import 'multer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { format } from "date-fns";
import { extension } from 'mime-types';
// возьми в привычку добавлять "node:" к именам пакетов ноды. Доступно только в относительно новых версиях ноды. И лучше вообще настрой на это линтер.
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import FileVaultConfig from '../config/file-vault.config';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);

  constructor(
    @Inject(FileVaultConfig.KEY)
    private readonly config: ConfigType<typeof FileVaultConfig>,
  ) {}

  private getUploadDirectoryPath(): string {
    // можно разбить и до дней, при необходимости
    const [year, month] = format(new Date(), "yyyy MM").split(' ');
    return join(this.config.uploadDirectory, year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), filename);
  }

  // а вот тут я Express не импортирую, но после установки типов для малтера перестал ругаться
  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const filename = randomUUID();
      const fileExtension = extension(file.mimetype);

      const destinationFile = this.getDestinationFilePath(`${filename}.${fileExtension}`);

      await ensureDir(uploadDirectoryPath); // проверяет наличие директории и если её нет (или вложенных директорий), то создаёт
      await writeFile(destinationFile, file.buffer);

      return destinationFile;
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }
}
