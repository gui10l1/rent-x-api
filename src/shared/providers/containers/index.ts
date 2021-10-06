import { container } from 'tsyringe';

import BCryptProvider from '../HashProvider/implementations/BCryptProvider';
import IHashProvider from '../HashProvider/models/IHashProvider';
import DiskStorageProvider from '../StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from '../StorageProvider/models/IStorageProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
