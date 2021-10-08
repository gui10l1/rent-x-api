import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  profileImage: string;
}

@injectable()
export default class UpdateUsersProfilePhotoService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ profileImage, userId }: IRequest): Promise<User> {
    const findUser = await this.usersRepository.findById(userId);

    if (!findUser) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    await this.storageProvider.deleteFile(profileImage);

    await this.storageProvider.saveFile(profileImage);

    return this.usersRepository.update(findUser, { profileImage });
  }
}
