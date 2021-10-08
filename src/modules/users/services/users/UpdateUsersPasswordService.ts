import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';

import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  password: string;
  oldPassword: string;
  confirmPassword: string;
}

@injectable()
export default class UpdateUsersPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    oldPassword,
    confirmPassword,
    password,
  }: IRequest): Promise<User> {
    const findUser = await this.usersRepository.findById(userId);

    if (!findUser) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    const oldPasswordMatch = await this.hashProvider.compare(
      findUser.password,
      oldPassword,
    );

    if (!oldPasswordMatch) {
      throw new AppError('A senha antiga não coincide com nossos registros!');
    }

    if (confirmPassword !== password) {
      throw new AppError('Confirme sua senha corretamente!');
    }

    const hashedPassword = await this.hashProvider.hash(password);

    return this.usersRepository.update(findUser, { password: hashedPassword });
  }
}
