import multer, { StorageEngine } from 'multer';
import path from 'path';
import { v4 } from 'uuid';

interface IUploadConfig {
  type: 'disk';
  tempFolder: string;
  uploadFolder: string;
  config: {
    multer: {
      storage: StorageEngine;
    };
  };
}

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');
const uploadFolder = path.resolve(__dirname, '..', '..', 'temp', 'uploads');

export default {
  type: 'disk',
  tempFolder,
  uploadFolder,
  config: {
    multer: {
      storage: multer.diskStorage({
        destination: tempFolder,
        filename: (_, file, cb) => {
          const fileExtension = file.originalname.split('.').reverse()[0];
          const fileName = `${v4()}.${fileExtension}`;

          return cb(null, fileName);
        },
      }),
    },
  },
} as IUploadConfig;
