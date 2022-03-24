import { v4 } from 'uuid';

import ICarsSpecificationsRepositoryDTO from '@modules/carsSpecifications/dtos/ICarsSpecificationsRepositoryDTO';
import CarSpecification from '@modules/carsSpecifications/infra/typeorm/entities/CarSpecification';

import ICarsSpecificationsRepository from '../ICarsSpecificationsRepository';

export default class FakeCarsSpecificationsRepository
  implements ICarsSpecificationsRepository
{
  private carsSpecifications: CarSpecification[] = [];

  public async create({
    carId,
    specificationId,
  }: ICarsSpecificationsRepositoryDTO): Promise<CarSpecification> {
    const carSpec = new CarSpecification();

    Object.assign(carSpec, {
      id: v4(),
      car_id: carId,
      specification_id: specificationId,
    });

    this.carsSpecifications.push(carSpec);

    return carSpec;
  }

  public async findDuplicated(
    carId: string,
    specificationId: string,
  ): Promise<CarSpecification | undefined> {
    return this.carsSpecifications.find(
      carSpec =>
        carSpec.car_id === carId &&
        carSpec.specification_id === specificationId,
    );
  }

  public async delete(carSpecification: CarSpecification): Promise<void> {
    const findCarSpecIndex = this.carsSpecifications.findIndex(
      carSpec => carSpec.id === carSpecification.id,
    );

    this.carsSpecifications.splice(findCarSpecIndex, 1);
  }

  public async list(): Promise<CarSpecification[]> {
    return this.carsSpecifications;
  }

  public async findById(
    carSpecId: string,
  ): Promise<CarSpecification | undefined> {
    return this.carsSpecifications.find(carSpec => carSpec.id === carSpecId);
  }
}
