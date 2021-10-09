import { getRepository, Repository } from 'typeorm';

import ICarsRepositoryDTO from '@modules/cars/dtos/ICarsRepositoryDTO';
import Car from '@modules/cars/infra/typeorm/entities/Cars';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

export default class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  public async create(data: ICarsRepositoryDTO): Promise<Car> {
    const car = this.ormRepository.create({
      daily_value: data.dailyValue,
      ...data,
    });

    await this.ormRepository.save(car);

    return car;
  }

  public async list(): Promise<Car[]> {
    return this.ormRepository.find();
  }

  public async findById(carId: string): Promise<Car | undefined> {
    return this.ormRepository.findOne({
      where: { id: carId },
    });
  }

  public async update(
    carToBeUpdated: Car,
    data: Partial<ICarsRepositoryDTO>,
  ): Promise<Car> {
    const carUpdated = this.ormRepository.merge(carToBeUpdated, {
      daily_value: data.dailyValue,
      ...data,
    });

    await this.ormRepository.save(carUpdated);

    return carToBeUpdated;
  }

  public async delete(carToBeDeleted: Car): Promise<void> {
    await this.ormRepository.remove(carToBeDeleted);
  }
}
