import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeStorageProvider: IStorageProvider;
let createUsersService: CreateUsersService;

describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeStorageProvider = new FakeStorageProvider();
    createUsersService = new CreateUsersService(
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
      createUsersService.execute({
        email: 'johndoe@exemple.com',
        name: 'John Tre',
        password: '456798',
        profileImage: 'profileImage2.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete temp folder files', async () => {
    const spyOnStorageProviderCb = jest.spyOn(
      fakeStorageProvider,
      'deleteFilesFromTempFolder',
    );

    await createUsersService.execute({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    expect(spyOnStorageProviderCb).toHaveBeenCalled();
  });

  it('should be able to create users', async () => {
    delete fakeStorageProvider.deleteFilesFromTempFolder;

    const user = await createUsersService.execute({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    expect(user).toHaveProperty('id');
  });
});
