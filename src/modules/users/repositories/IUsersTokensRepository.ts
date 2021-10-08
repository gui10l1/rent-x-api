import IUsersTokensRepositoryDTO from '../dtos/IUsersTokensRepositoryDTO';
import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUsersTokensRepository {
  create(data: IUsersTokensRepositoryDTO): Promise<UserToken>;

  findByToken(
    token: string,
    relations?: string[],
  ): Promise<UserToken | undefined>;
}
