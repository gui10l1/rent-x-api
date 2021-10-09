import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICarsRepositoryDTO from '../dtos/ICarsRepositoryDTO';
import Car from '../infra/typeorm/entities/Cars';
import ICarsRepository from '../repositories/ICarsRepository';

@injectable()
export default class CreateCarsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({
    dailyValue,
    ...rest
  }: ICarsRepositoryDTO): Promise<Car> {
    if (dailyValue > 9999.99) {
      throw new AppError('Valor alto demais!');
    }

    return this.carsRepository.create({
      dailyValue,
      ...rest,
    });
  }
}
