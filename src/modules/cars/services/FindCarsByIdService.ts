import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Car from '../infra/typeorm/entities/Cars';
import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  carId: string;
}

@injectable()
export default class FindCarsByIdService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({ carId }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(carId);

    if (!car) {
      throw new AppError('Veículo não encontrado!', 404);
    }

    return car;
  }
}
