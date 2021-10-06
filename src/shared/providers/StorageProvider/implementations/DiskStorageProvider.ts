import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/uploadConfig';

import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(fileName: string): Promise<string> {
    const tempFilePath = path.resolve(uploadConfig.tempFolder, fileName);

    try {
      await fs.promises.stat(tempFilePath);

      await fs.promises.rename(
        tempFilePath,
        `${uploadConfig.uploadFolder}/${fileName}`,
      );
    } catch (err) {
      console.log(err);
    }

    return fileName;
  }

  public async deleteFile(fileName: string): Promise<void> {
    const uploadedFilePath = path.resolve(uploadConfig.uploadFolder, fileName);

    try {
      await fs.promises.stat(uploadedFilePath);

      await fs.promises.unlink(uploadedFilePath);
    } catch (err) {
      console.log(err);
    }
  }

  public async deleteFilesFromTempFolder(): Promise<void> {
    const tempFolderFilesReaded = await fs.promises.readdir(
      uploadConfig.tempFolder,
      {
        encoding: 'utf-8',
      },
    );

    tempFolderFilesReaded.forEach(async file => {
      try {
        const filePath = path.resolve(uploadConfig.tempFolder, file);

        await fs.promises.stat(filePath);

        await fs.promises.unlink(filePath);
      } catch {
        // CODE
      }
    });
  }
}
