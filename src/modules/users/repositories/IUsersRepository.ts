import IUsersRepositoryDTO from '../dtos/IUsersRepositoryDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  create(data: IUsersRepositoryDTO): Promise<User>;

  findByEmail(email: string): Promise<User | undefined>;
  findById(userId: string): Promise<User | undefined>;

  list(): Promise<User[]>;

  update(user: User, data: Partial<IUsersRepositoryDTO>): Promise<User>;
}
