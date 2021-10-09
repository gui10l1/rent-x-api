import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  carId: string;
}

@injectable()
export default class DeleteCarsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({ carId }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(carId);

    if (!car) {
      throw new AppError('Veículo não encontrado!', 404);
    }

    await this.carsRepository.delete(car);
  }
}
