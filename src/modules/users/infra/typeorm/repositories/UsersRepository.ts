import { getRepository, Repository } from 'typeorm';

import IUsersRepositoryDTO from '@modules/users/dtos/IUsersRepositoryDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: IUsersRepositoryDTO): Promise<User> {
    const user = this.ormRepository.create({
      profile_image: data.profileImage,
      ...data,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }

  public async findById(userId: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { id: userId },
    });
  }

  public async list(): Promise<User[]> {
    return this.ormRepository.find();
  }

  public async update(
    user: User,
    data: Partial<IUsersRepositoryDTO>,
  ): Promise<User> {
    const updatedUser = this.ormRepository.merge(user, {
      profile_image: data.profileImage,
      ...data,
    });

    await this.ormRepository.save(updatedUser);

    return updatedUser;
  }
}
