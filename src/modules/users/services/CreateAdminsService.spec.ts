import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateAdminsService from './CreateAdminsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createAdminsService: CreateAdminsService;

describe('CreateAdmins', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createAdminsService = new CreateAdminsService(
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
      createAdminsService.execute({
        email: 'johndoe@exemple.com',
        name: 'John Tre',
        password: '456798',
        profileImage: 'profileImage2.png',
        admin: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create users', async () => {
    const user = await createAdminsService.execute({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
      profileImage: 'profileImage.png',
      admin: true,
    });

    expect(user).toHaveProperty('id');
    expect(user.admin).toBe(true);
  });
});
