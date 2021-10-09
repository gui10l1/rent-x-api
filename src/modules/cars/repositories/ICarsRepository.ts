import ICarsRepositoryDTO from '../dtos/ICarsRepositoryDTO';
import Car from '../infra/typeorm/entities/Cars';

export default interface ICarsRepository {
  create(data: ICarsRepositoryDTO): Promise<Car>;

  findById(carId: string): Promise<Car | undefined>;

  list(relations?: string[]): Promise<Car[]>;

  update(car: Car, data: Partial<ICarsRepositoryDTO>): Promise<Car>;

  delete(carToBeDeleted: Car): Promise<void>;
}
