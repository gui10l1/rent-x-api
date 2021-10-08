import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import UpdateUsersPasswordService from './UpdateUsersPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUsersPasswordService: UpdateUsersPasswordService;

describe('UpdateUsersPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUsersPasswordService = new UpdateUsersPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('it should not be able to update passwords from non-existing users', async () => {
    await expect(
      updateUsersPasswordService.execute({
        userId: 'sadkjashd',
        confirmPassword: '123456',
        oldPassword: '456789',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user password when the old one does not match', async () => {
    const user = await fakeUsersRepository.create({
      email: 'email@email.com',
      name: 'User',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    await expect(
      updateUsersPasswordService.execute({
        userId: user.id,
        confirmPassword: '789456',
        oldPassword: 'wrongPassword',
        password: '789456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user password when the confirmation does not match', async () => {
    const user = await fakeUsersRepository.create({
      email: 'email@email.com',
      name: 'User',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    await expect(
      updateUsersPasswordService.execute({
        userId: user.id,
        confirmPassword: 'passwordConfirmationWrong',
        oldPassword: '123456',
        password: '789456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to hash and update user password', async () => {
    const spyOnHashProviderMethod = jest.spyOn(fakeHashProvider, 'hash');

    const user = await fakeUsersRepository.create({
      email: 'email@email.com',
      name: 'User',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    const updatedUser = await updateUsersPasswordService.execute({
      userId: user.id,
      confirmPassword: '789456',
      oldPassword: '123456',
      password: '789456',
    });

    expect(updatedUser.password).toBe('789456');
    expect(spyOnHashProviderMethod).toHaveBeenCalledWith('789456');
  });
});
