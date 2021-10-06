import { v4 } from 'uuid';

import IUsersRepositoryDTO from '@modules/users/dtos/IUsersRepositoryDTO';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: IUsersRepositoryDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      ...data,
      profile_image: data.profileImage,
    });

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async findById(userId: string): Promise<User | undefined> {
    return this.users.find(user => user.id === userId);
  }

  public async list(): Promise<User[]> {
    return this.users;
  }

  public async update(
    user: User,
    data: Partial<IUsersRepositoryDTO>,
  ): Promise<User> {
    const findUserIndex = this.users.findIndex(item => item.id === user.id);

    Object.assign(user, {
      ...data,
      profile_image: data.profileImage,
    });

    this.users[findUserIndex] = user;

    return user;
  }
}
