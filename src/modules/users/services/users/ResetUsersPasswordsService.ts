import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

@injectable()
export default class ResetUsersPasswordsService {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    token,
    confirmPassword,
    password,
  }: IRequest): Promise<void> {
    const findToken = await this.usersTokensRepository.findByToken(token, [
      'user',
    ]);

    if (!findToken) {
      throw new AppError('Token inexistente!');
    }

    const dateToCompare = addHours(findToken.created_at, 2);
    const dateNow = new Date(Date.now());

    if (isAfter(dateNow, dateToCompare)) {
      throw new AppError('Token expirado!');
    }

    const { user } = findToken;

    const compareWithOldPassword = await this.hashProvider.compare(
      user.password,
      password,
    );

    if (compareWithOldPassword) {
      throw new AppError('Você não pode usar a mesma senha que a atual!');
    }

    if (confirmPassword !== password) {
      throw new AppError('As senhas não conferem!');
    }

    const hashedPassword = await this.hashProvider.hash(password);

    await this.usersRepository.update(user, {
      password: hashedPassword,
    });
  }
}
