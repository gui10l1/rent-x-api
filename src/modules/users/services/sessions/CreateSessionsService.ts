import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/authConfig';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const findUserByEmail = await this.usersRepository.findByEmail(email);

    if (!findUserByEmail) {
      throw new AppError('Email/senha incorretos!');
    }

    const comparePassword = await this.hashProvider.compare(
      findUserByEmail.password,
      password,
    );

    if (!comparePassword) {
      throw new AppError('Email/senha incorretos!');
    }

    const { expiresIn, noTimestamp } = authConfig;

    const token = sign({ admin: findUserByEmail.admin }, authConfig.secret, {
      expiresIn,
      noTimestamp,
      subject: findUserByEmail.id,
    });

    return {
      token,
      user: findUserByEmail,
    };
  }
}
