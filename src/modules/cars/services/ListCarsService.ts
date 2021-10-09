import { inject, injectable } from 'tsyringe';

import Car from '../infra/typeorm/entities/Cars';
import ICarsRepository from '../repositories/ICarsRepository';

@injectable()
export default class ListCarsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute(): Promise<Car[]> {
    return this.carsRepository.list();
  }
}
