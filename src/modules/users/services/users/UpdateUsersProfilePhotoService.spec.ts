import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';

import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import UpdateUsersProfilePhotoService from './UpdateUsersProfilePhotoService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUsersProfilePhotoService: UpdateUsersProfilePhotoService;

describe('UpdateUsersProfilePhoto', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUsersProfilePhotoService = new UpdateUsersProfilePhotoService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should not be able to update a non-existing user', async () => {
    await expect(
      updateUsersProfilePhotoService.execute({
        profileImage: 'newProfileImage.png',
        userId: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update user photo', async () => {
    const user = await fakeUsersRepository.create({
      email: 'email@email.com',
      name: 'User',
      password: '123465',
      profileImage: 'profileImage.png',
    });

    const userUpdated = await updateUsersProfilePhotoService.execute({
      profileImage: 'newProfileImage.png',
      userId: user.id,
    });

    expect(userUpdated.id).toBe(user.id);
    expect(userUpdated.profile_image).toBe('newProfileImage.png');
  });
});
