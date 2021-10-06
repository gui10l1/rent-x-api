import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateAdminsService from './CreateAdminsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeStorageProvider: IStorageProvider;
let createAdminsService: CreateAdminsService;

describe('CreateAdmins', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeStorageProvider = new FakeStorageProvider();
    createAdminsService = new CreateAdminsService(
      fakeUsersRepository,
      fakeStorageProvider,
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

  it('should be able to delete temp folder files', async () => {
    const spyOnStorageProviderCb = jest.spyOn(
      fakeStorageProvider,
      'deleteFilesFromTempFolder',
    );

    await createAdminsService.execute({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
      profileImage: 'profileImage.png',
      admin: true,
    });

    expect(spyOnStorageProviderCb).toHaveBeenCalled();
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
