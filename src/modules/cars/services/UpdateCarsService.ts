import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICarsRepositoryDTO from '../dtos/ICarsRepositoryDTO';
import Car from '../infra/typeorm/entities/Cars';
import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  carId: string;
  data: Partial<ICarsRepositoryDTO>;
}

@injectable()
export default class UpdateCarsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({ data, carId }: IRequest): Promise<Car> {
    const findCar = await this.carsRepository.findById(carId);

    if (!findCar) {
      throw new AppError(
        'Não é possível atualizar um registro (veículo) que não existe!',
        404,
      );
    }

    if (data.dailyValue && data.dailyValue > 9999.99) {
      throw new AppError('Valor alto demais!');
    }

    return this.carsRepository.update(findCar, data);
  }
}
