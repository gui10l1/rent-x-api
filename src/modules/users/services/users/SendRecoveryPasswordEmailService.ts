import path from 'path';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
export default class SendRecoveryPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const findUserByEmail = await this.usersRepository.findByEmail(email);

    if (!findUserByEmail) {
      throw new AppError('Este email não consta em nossos registros');
    }

    const userToken = await this.usersTokensRepository.create({
      userId: findUserByEmail.id,
    });

    const templateFilePath = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'recovery-password-email.hbs',
    );

    await this.mailProvider.send({
      subject: 'Recuperação de senha',
      template: {
        templateFilePath,
        variables: {
          name: findUserByEmail.name,
          appUrl: `${process.env.APP_URL}`,
          token: userToken.token,
        },
      },
      to: {
        address: findUserByEmail.email,
        name: findUserByEmail.name,
      },
    });
  }
}
