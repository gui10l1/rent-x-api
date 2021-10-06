import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUsersService: CreateUsersService;

describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUsersService = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should not be able to create users with duplicated emails', async () => {
    await fakeUsersRepository.create({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    await expect(
      createUsersService.execute({
        email: 'johndoe@exemple.com',
        name: 'John Tre',
        password: '456798',
        profileImage: 'profileImage2.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create users', async () => {
    const user = await createUsersService.execute({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    expect(user).toHaveProperty('id');
  });
});
