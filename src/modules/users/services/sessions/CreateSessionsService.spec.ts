import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';

import CreateSessionsService from './CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSessionsService: CreateSessionsService;

describe('CreateSessions', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSessionsService = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should not be able to create sessions when email does not match with the ones already registered', async () => {
    await expect(
      createSessionsService.execute({
        email: 'non@existing.email',
        password: '123465',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create sessions when user password is incorrect', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      name: 'User',
      password: '123465',
      profileImage: 'profileImage.png',
    });

    await expect(
      createSessionsService.execute({
        email: user.email,
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create sessions', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@email.com',
      name: 'User',
      password: '123465',
      profileImage: 'profileImage.png',
    });

    const { user: userLogged } = await createSessionsService.execute({
      email: user.email,
      password: user.password,
    });

    expect(userLogged.id).toBe(user.id);
  });
});
