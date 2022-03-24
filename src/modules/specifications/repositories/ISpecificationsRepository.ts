import ISpecificationsRepositoryDTO from '../dtos/ISpecificationsRepositoryDTO';
import Specification from '../infra/typeorm/entities/Specification';

export default interface ISpecificationsRepository {
  create(data: ISpecificationsRepositoryDTO): Promise<Specification>;

  findById(specificationId: string): Promise<Specification | undefined>;
  findByName(specificationName: string): Promise<Specification | undefined>;

  list(): Promise<Specification[]>;

  update(
    specification: Specification,
    data: Partial<ISpecificationsRepositoryDTO>,
  ): Promise<Specification>;

  delete(specification: Specification): Promise<void>;
}
