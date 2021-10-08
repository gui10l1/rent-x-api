import { container } from 'tsyringe';

import mailConfig from '@config/mailConfig';

import BCryptProvider from '../HashProvider/implementations/BCryptProvider';
import IHashProvider from '../HashProvider/models/IHashProvider';
import EtherealProvider from '../MailProvider/implementations/EtherealProvider';
import HandlebarsProvider from '../MailTemplateProvider/implementations/HandlebarsProvider';
import IMailTemplateProvider from '../MailTemplateProvider/models/IMailTemplateProvider';
import DiskStorageProvider from '../StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from '../StorageProvider/models/IStorageProvider';

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsProvider,
);

const mailProvider = {
  ethereal: container.resolve(EtherealProvider),
};

container.registerInstance('MailProvider', mailProvider[mailConfig.type]);

container.registerSingleton<IHashProvider>('HashProvider', BCryptProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
