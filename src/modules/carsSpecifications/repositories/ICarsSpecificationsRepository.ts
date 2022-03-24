import ICarsSpecificationsRepositoryDTO from '../dtos/ICarsSpecificationsRepositoryDTO';
import CarSpecification from '../infra/typeorm/entities/CarSpecification';

export default interface ICarsSpecificationsRepository {
  create(data: ICarsSpecificationsRepositoryDTO): Promise<CarSpecification>;

  findDuplicated(
    carId: string,
    specificationId: string,
  ): Promise<CarSpecification | undefined>;

  delete(carSepcification: CarSpecification): Promise<void>;

  list(relations?: string[]): Promise<CarSpecification[]>;

  findById(carSpecId: string): Promise<CarSpecification | undefined>;
}
