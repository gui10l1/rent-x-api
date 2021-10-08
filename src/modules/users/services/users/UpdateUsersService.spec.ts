import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import UpdateUsersService from './UpdateUsersService';

let fakeUsersRepository: FakeUsersRepository;
let updateUsersService: UpdateUsersService;

describe('UpdateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUsersService = new UpdateUsersService(fakeUsersRepository);
  });

  it('should not be able to update non-existing users', async () => {
    await expect(
      updateUsersService.execute({
        userId: 'asdpoasjdpas',
        email: 'new@email.com',
        name: 'New Name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to duplicate users emails', async () => {
    const userToBeUpdated = await fakeUsersRepository.create({
      email: 'old@email.com',
      name: 'User Name',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    await fakeUsersRepository.create({
      email: 'new@email.com',
      name: 'User Name',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    await expect(
      updateUsersService.execute({
        userId: userToBeUpdated.id,
        email: 'new@email.com',
        name: 'New Name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update users', async () => {
    const userToBeUpdated = await fakeUsersRepository.create({
      email: 'old@email.com',
      name: 'User Name',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    const updatedUser = await updateUsersService.execute({
      email: 'new@email.com',
      name: 'New Name',
      userId: userToBeUpdated.id,
    });

    expect(updatedUser.id).toBe(userToBeUpdated.id);
    expect(userToBeUpdated.email).toBe('new@email.com');
    expect(userToBeUpdated.name).toBe('New Name');
  });
});
