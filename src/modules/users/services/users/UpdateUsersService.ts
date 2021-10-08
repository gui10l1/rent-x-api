import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  email: string;
  name: string;
}

@injectable()
export default class UpdateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, name, email }: IRequest): Promise<User> {
    const findUser = await this.usersRepository.findById(userId);

    if (!findUser) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    const findUserByEmail = await this.usersRepository.findByEmail(email);

    if (findUserByEmail) {
      throw new AppError('Este email já está em uso!', 401);
    }

    return this.usersRepository.update(findUser, { email, name });
  }
}
