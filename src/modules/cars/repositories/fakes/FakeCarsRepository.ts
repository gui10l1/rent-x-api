import { v4 } from 'uuid';

import ICarsRepositoryDTO from '@modules/cars/dtos/ICarsRepositoryDTO';
import Car from '@modules/cars/infra/typeorm/entities/Cars';

import ICarsRepository from '../ICarsRepository';

export default class FakeCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  public async create(data: ICarsRepositoryDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id: v4(),
      daily_value: data.dailyValue,
      ...data,
    });

    this.cars.push(car);

    return car;
  }

  public async list(): Promise<Car[]> {
    return this.cars;
  }

  public async findById(carId: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === carId);
  }

  public async update(
    carToBeUpdated: Car,
    data: Partial<ICarsRepositoryDTO>,
  ): Promise<Car> {
    const findIndex = this.cars.findIndex(car => car.id === carToBeUpdated.id);

    Object.assign(carToBeUpdated, {
      daily_value: data.dailyValue,
      ...data,
    });

    this.cars[findIndex] = carToBeUpdated;

    return carToBeUpdated;
  }

  public async delete(carToBeDeleted: Car): Promise<void> {
    const findIndex = this.cars.findIndex(car => car.id === carToBeDeleted.id);

    this.cars.splice(findIndex, 1);
  }
}
