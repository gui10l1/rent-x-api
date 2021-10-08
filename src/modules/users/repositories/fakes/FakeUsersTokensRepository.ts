import { v4 } from 'uuid';

import IUsersTokensRepositoryDTO from '@modules/users/dtos/IUsersTokensRepositoryDTO';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import IUsersTokensRepository from '../IUsersTokensRepository';

export default class FakeUsersTokensRepository
  implements IUsersTokensRepository
{
  private usersTokens: UserToken[] = [];

  public async create(data: IUsersTokensRepositoryDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: v4(),
      token: v4(),
      user_id: data.userId,
      created_at: new Date(),
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.usersTokens.find(userToken => userToken.token === token);
  }
}
