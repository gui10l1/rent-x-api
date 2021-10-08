import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

import IUsersRepositoryDTO from '../../dtos/IUsersRepositoryDTO';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';

type IRequest = Omit<IUsersRepositoryDTO, 'admin'>;

@injectable()
export default class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password, ...rest }: IRequest): Promise<User> {
    const findUserByEmail = await this.usersRepository.findByEmail(email);

    if (findUserByEmail) {
      throw new AppError(
        'Já existe um usuário cadastrado com este email!',
        401,
      );
    }

    await this.storageProvider.saveFile(rest.profileImage);

    const hashedPassword = await this.hashProvider.hash(password);

    return this.usersRepository.create({
      email,
      password: hashedPassword,
      ...rest,
    });
  }
}
