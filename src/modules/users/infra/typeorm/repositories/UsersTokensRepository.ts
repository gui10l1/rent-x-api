import { getRepository, Repository } from 'typeorm';

import IUsersTokensRepositoryDTO from '@modules/users/dtos/IUsersTokensRepositoryDTO';
import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

import UserToken from '../entities/UserToken';

export default class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async create(data: IUsersTokensRepositoryDTO): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id: data.userId,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(
    token: string,
    relations?: string[],
  ): Promise<UserToken | undefined> {
    return this.ormRepository.findOne({
      where: { token },
      relations: relations || [],
    });
  }
}
