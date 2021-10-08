import { addHours, addMinutes } from 'date-fns';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';

import ResetUsersPasswordsService from './ResetUsersPasswordsService';

let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let resetUsersPasswordsService: ResetUsersPasswordsService;

describe('ResetUsersPasswords', () => {
  beforeEach(() => {
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    resetUsersPasswordsService = new ResetUsersPasswordsService(
      fakeUsersTokensRepository,
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should not be able to reset user password using a non-existing token', async () => {
    await expect(
      resetUsersPasswordsService.execute({
        token: 'invalid-token',
        confirmPassword: '123456',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset user password when token is invalid', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const dateWithTwoMoreHours = addHours(new Date(), 2);
      const dateWithTenMoreMinutes = addMinutes(dateWithTwoMoreHours, 10);

      return dateWithTenMoreMinutes.getTime();
    });

    const user = await fakeUsersRepository.create({
      email: 'email@email.com',
      name: 'User Name',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    const userToken = await fakeUsersTokensRepository.create({
      userId: user.id,
    });

    await expect(
      resetUsersPasswordsService.execute({
        confirmPassword: '789456',
        password: '789456',
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset user password when the new password is the same as the old one', async () => {
    const user = await fakeUsersRepository.create({
      email: 'email@email.com',
      name: 'User Name',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    const userToken = await fakeUsersTokensRepository.create({
      userId: user.id,
    });

    jest
      .spyOn(fakeUsersTokensRepository, 'findByToken')
      .mockImplementationOnce(async () => {
        const userTokenMock = new UserToken();

        Object.assign(userTokenMock, {
          id: userToken.id,
          token: userToken.token,
          user_id: userToken.id,
          user,
          created_at: userToken.created_at,
        });

        return userTokenMock;
      });

    await expect(
      resetUsersPasswordsService.execute({
        confirmPassword: '123456',
        password: '123456',
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset user password when the confirmation does not match', async () => {
    const user = await fakeUsersRepository.create({
      email: 'email@email.com',
      name: 'User Name',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    const userToken = await fakeUsersTokensRepository.create({
      userId: user.id,
    });

    jest
      .spyOn(fakeUsersTokensRepository, 'findByToken')
      .mockImplementationOnce(async () => {
        const userTokenMock = new UserToken();

        Object.assign(userTokenMock, {
          id: userToken.id,
          token: userToken.token,
          user_id: userToken.id,
          user,
          created_at: userToken.created_at,
        });

        return userTokenMock;
      });

    await expect(
      resetUsersPasswordsService.execute({
        confirmPassword: 'wrongConfirmation',
        password: '456789',
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset user password', async () => {
    const spyOnUsersRepositoryMethod = jest.spyOn(
      fakeUsersRepository,
      'update',
    );

    const user = await fakeUsersRepository.create({
      email: 'email@email.com',
      name: 'User Name',
      password: '123456',
      profileImage: 'profileImage.png',
    });

    const userToken = await fakeUsersTokensRepository.create({
      userId: user.id,
    });

    jest
      .spyOn(fakeUsersTokensRepository, 'findByToken')
      .mockImplementationOnce(async () => {
        const userTokenMock = new UserToken();

        Object.assign(userTokenMock, {
          id: userToken.id,
          token: userToken.token,
          user_id: userToken.id,
          user,
          created_at: userToken.created_at,
        });

        return userTokenMock;
      });

    await resetUsersPasswordsService.execute({
      confirmPassword: '789456',
      password: '789456',
      token: userToken.token,
    });

    expect(spyOnUsersRepositoryMethod).toHaveBeenCalledWith(user, {
      password: '789456',
    });
  });
});
