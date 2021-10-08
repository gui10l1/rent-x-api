import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository';

import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider';

import SendRecoveryPasswordEmailService from './SendRecoveryPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let sendRecoveryPasswordEmailService: SendRecoveryPasswordEmailService;

describe('SendRecoveryPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    sendRecoveryPasswordEmailService = new SendRecoveryPasswordEmailService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeMailProvider,
    );
  });

  it('should not be able to send emails to users that are not registered in database', async () => {
    await expect(
      sendRecoveryPasswordEmailService.execute({
        email: 'non@existing.email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to send emails', async () => {
    const spyOnMailProviderMethod = jest.spyOn(fakeMailProvider, 'send');

    await fakeUsersRepository.create({
      email: 'email@email.com',
      name: 'User Name',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    await sendRecoveryPasswordEmailService.execute({
      email: 'email@email.com',
    });

    expect(spyOnMailProviderMethod).toHaveBeenCalled();
  });
});
