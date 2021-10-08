import { container } from 'tsyringe';

import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UsersTokensRepository from '../infra/typeorm/repositories/UsersTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
