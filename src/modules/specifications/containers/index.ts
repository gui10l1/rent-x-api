import { container } from 'tsyringe';

import SpecificationsRepository from '../infra/typeorm/repositories/SpecificationsRepository';
import ISpecificationsRepository from '../repositories/ISpecificationsRepository';

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);
